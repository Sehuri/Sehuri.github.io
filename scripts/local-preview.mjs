import http from "node:http";
import { createReadStream, openSync, closeSync } from "node:fs";
import { mkdir, stat, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(scriptPath), "..");
const siteRoot = path.join(projectRoot, "out");
const logDirectory = path.join(projectRoot, ".preview");
const logPath = path.join(logDirectory, "server.log");
const port = 4174;
const service = "shenhuili-local-preview";
const healthURL = `http://127.0.0.1:${port}/_preview/health`;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function health() {
  try {
    const response = await fetch(healthURL, { signal: AbortSignal.timeout(800) });
    if (!response.ok) return null;
    const result = await response.json();
    return result.service === service && result.root === siteRoot ? result : null;
  } catch (error) {
    if (["EPERM", "EACCES"].includes(error.cause?.code ?? error.code)) {
      throw new Error("This process cannot access the local preview port. Run the command in a local terminal.");
    }
    return null;
  }
}

async function serveRequest(request, response) {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, healthURL).pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  if (pathname === "/_preview/health") {
    const body = JSON.stringify({ service, pid: process.pid, root: siteRoot });
    response.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
      "Cache-Control": "no-store",
    });
    response.end(request.method === "HEAD" ? undefined : body);
    return;
  }

  let file = path.resolve(siteRoot, "." + pathname);
  if (file !== siteRoot && !file.startsWith(siteRoot + path.sep)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    let info = await stat(file);
    if (info.isDirectory()) {
      file = path.join(file, "index.html");
      info = await stat(file);
    }
    if (!info.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Type": mime[path.extname(file)] ?? "application/octet-stream",
      "Content-Length": info.size,
      "Cache-Control": path.extname(file) === ".html" ? "no-store" : "public, max-age=60",
      "X-Content-Type-Options": "nosniff",
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(file).on("error", () => response.destroy()).pipe(response);
  } catch {
    const body = "This page was not found.";
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(request.method === "HEAD" ? undefined : body);
  }
}

async function serve() {
  await stat(path.join(siteRoot, "index.html"));
  const servers = [];
  try {
    for (const host of ["127.0.0.1", "::1"]) {
      const server = http.createServer((request, response) => {
        serveRequest(request, response).catch(() => {
          if (!response.headersSent) response.writeHead(500);
          response.end();
        });
      });
      await new Promise((resolve, reject) => {
        server.once("error", reject);
        server.listen({ port, host, ipv6Only: host === "::1" }, resolve);
      });
      servers.push(server);
    }
  } catch (error) {
    for (const server of servers) server.close();
    throw error;
  }
  console.log(`Preview ready on IPv4 and IPv6 loopback, port ${port}, PID ${process.pid}`);
  const stop = () => {
    setTimeout(() => process.exit(0), 1500).unref();
    for (const server of servers) server.close();
  };
  process.on("SIGTERM", stop);
  process.on("SIGINT", stop);
}

async function start() {
  const existing = await health();
  if (existing) {
    console.log(`Preview is already running: http://localhost:${port}/ (PID ${existing.pid})`);
    return;
  }
  await stat(path.join(siteRoot, "index.html"));
  await mkdir(logDirectory, { recursive: true });
  const log = openSync(logPath, "a");
  const child = spawn(process.execPath, [scriptPath, "serve"], {
    cwd: projectRoot,
    detached: true,
    stdio: ["ignore", log, log],
  });
  let spawnError;
  child.on("error", (error) => { spawnError = error; });
  child.unref();
  closeSync(log);
  for (let attempt = 0; attempt < 40; attempt++) {
    if (spawnError) throw spawnError;
    const running = await health();
    if (running) {
      console.log(`Preview started independently: http://localhost:${port}/ (PID ${running.pid})`);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  const tail = (await readFile(logPath, "utf8")).slice(-2000);
  throw new Error(`Preview did not start. See ${logPath}\n${tail}`);
}

const command = process.argv[2] ?? "start";
try {
  if (command === "serve") await serve();
  else if (command === "start") await start();
  else if (command === "status") {
    const running = await health();
    if (!running) { console.log("Preview is stopped."); process.exitCode = 1; }
    else console.log(`Preview is running: http://localhost:${port}/ (PID ${running.pid})`);
  } else if (command === "stop") {
    const running = await health();
    if (running) process.kill(running.pid, "SIGTERM");
    console.log(running ? "Preview stopped." : "Preview is already stopped.");
  } else throw new Error("Use start, status, or stop.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
