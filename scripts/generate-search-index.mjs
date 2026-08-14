import { readFile, readdir, writeFile } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const travelFile = new URL("../../travel-map/assets/data.js", import.meta.url);
const wikiRoot = new URL("../../PersonalKnowledgeWiki/", import.meta.url);
const wikiPath = fileURLToPath(wikiRoot);
const output = new URL("../public/search-external.json", import.meta.url);

const clean = (value = "") => value
  .replace(/^---[\s\S]*?---\s*/m, "")
  .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
  .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
  .replace(/<[^>]+>/g, "")
  .replace(/[#>*_`|~-]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

async function collectMarkdown(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (["node_modules", ".git", "assets", "inbox"].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectMarkdown(path));
    else if (entry.isFile() && extname(entry.name) === ".md") files.push(path);
  }
  return files;
}

const items = [];

try {
  const source = await readFile(travelFile, "utf8");
  const visits = source.match(/visits:\s*\[([\s\S]*?)\],\s*wishlist:/)?.[1] ?? "";
  const pattern = /\{\s*name:"([^"]+)",\s*country:"([^"]+)",\s*date:"([^"]+)",[\s\S]*?desc:"([^"]+)"\s*\}/g;
  for (const match of visits.matchAll(pattern)) {
    const [, title, country, date, description] = match;
    items.push({ id: `city-${title}`, type: "城市", title, subtitle: `${country} · ${date}`, description, href: "https://sehuri.github.io/travel-map/#memories", keywords: `${title} ${country} 旅行 城市 足迹 ${description}` });
  }
} catch {}

try {
  const files = await collectMarkdown(wikiPath);
  for (const file of files) {
    const raw = await readFile(file, "utf8");
    const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    const title = frontmatter.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1]
      ?? raw.match(/^#\s+(.+)$/m)?.[1]
      ?? basename(file, ".md").replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/-[a-f0-9]{8,}$/, "");
    if (["Home", "README"].includes(title)) continue;
    const body = raw.replace(/^---[\s\S]*?---\s*/m, "");
    const description = clean(body.split(/\n\s*\n/).find((part) => clean(part) && !part.trim().startsWith("#")) ?? body).slice(0, 150);
    const section = relative(wikiPath, file).split("/")[0];
    items.push({ id: `knowledge-${relative(wikiPath, file)}`, type: "知识", title: clean(title), subtitle: section === "concepts" ? "概念" : section === "topics" ? "主题" : section === "sources" ? "来源收藏" : "知识花园", description, href: "https://sehuri.github.io/Sehuri-knowledge-wiki/", keywords: `${title} ${section} ${description}` });
  }
} catch {}

await writeFile(output, JSON.stringify(items, null, 2) + "\n");
console.log(`Generated ${items.length} external search items.`);
