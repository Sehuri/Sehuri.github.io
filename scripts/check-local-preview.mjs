const origins = ["http://localhost:4174", "http://127.0.0.1:4174", "http://[::1]:4174"];
for (const origin of origins) {
  const response = await fetch(origin + "/", { signal: AbortSignal.timeout(3000) });
  const html = await response.text();
  if (response.status !== 200 || !html.includes("garden-entrance")) {
    throw new Error("The homepage did not load at " + origin);
  }
  console.log(origin + " returned 200 with the completed homepage.");
  if (origin.includes("127.0.0.1")) {
    const paths = [...new Set([...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+)"/g)].map((match) => match[1]))];
    if (!paths.some((value) => value.endsWith(".css")) || !paths.some((value) => value.endsWith(".js"))) {
      throw new Error("The exported homepage is missing its CSS or JavaScript.");
    }
    for (const assetPath of paths) {
      const asset = await fetch(origin + assetPath, { method: "HEAD" });
      if (asset.status !== 200) throw new Error("Missing exported asset: " + assetPath);
    }
    const absent = await fetch(origin + "/nonexistent-preview-page");
    const post = await fetch(origin + "/", { method: "POST" });
    if (absent.status !== 404 || post.status !== 405) throw new Error("Unexpected static-server response.");
    console.log(paths.length + " stylesheet/script links returned 200; missing pages return 404; writes return 405.");
  }
}
