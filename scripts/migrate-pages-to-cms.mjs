import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

const PROJECT_ROOT = process.cwd();
const SOURCE_DIR = path.join(PROJECT_ROOT, "Website");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "site", "pages");

const FORCE = process.argv.includes("--force");

const SKIP_DIRS = new Set(["assets", "dist", "_validation"]);
const SKIP_FILES = new Set([
  "index.mega.backup.html",
  "Branchenspezifische Lösungen ｜ SecureKern GmbH (2_9_2026 5：33：14 PM).html",
]);

function escapeFrontMatter(value) {
  const str = String(value ?? "").replace(/\r?\n/g, " ").trim();
  return str.replace(/"/g, '\\"');
}

function decodeHtmlEntities(input) {
  const str = String(input ?? "");
  const named = {
    "&amp;": "&",
    "&quot;": "\"",
    "&#39;": "'",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " ",
  };

  return str
    .replace(/&(amp|quot|lt|gt|nbsp|#39);/g, (m) => named[m] ?? m)
    .replace(/&#(x[0-9a-fA-F]+|\d+);/g, (m, code) => {
      try {
        if (code[0] === "x" || code[0] === "X") {
          return String.fromCodePoint(parseInt(code.slice(1), 16));
        }
        return String.fromCodePoint(parseInt(code, 10));
      } catch {
        return m;
      }
    });
}

function extractTag(html, regex) {
  const match = html.match(regex);
  return match?.[1]?.trim() ?? "";
}

function extractMain(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (main) return main.trim();

  // Fallback: body minus header/footer (best-effort)
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  if (!body) return "";

  let cleaned = body;
  cleaned = cleaned.replace(/<header\b[\s\S]*?<\/header>/i, "");
  cleaned = cleaned.replace(/<footer\b[\s\S]*?<\/footer>/i, "");
  cleaned = cleaned.replace(/<script\b[\s\S]*?<\/script>/gi, "");
  return cleaned.trim();
}

async function findHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      files.push(...(await findHtmlFiles(fullPath)));
      continue;
    }

    if (!entry.isFile()) continue;
    if (!entry.name.toLowerCase().endsWith(".html")) continue;
    if (SKIP_FILES.has(entry.name)) continue;
    files.push(fullPath);
  }

  return files;
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const htmlFiles = await findHtmlFiles(SOURCE_DIR);

  let written = 0;
  let skippedExisting = 0;

  for (const inputPath of htmlFiles) {
    const relFromWebsite = path.relative(SOURCE_DIR, inputPath);
    const relForPermalink = relFromWebsite.split(path.sep).join("/");
    const outRel = relFromWebsite.replace(/\.html$/i, ".md");
    const outPath = path.join(OUTPUT_DIR, outRel);

    if (!FORCE && existsSync(outPath)) {
      skippedExisting += 1;
      continue;
    }

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    const html = await fs.readFile(inputPath, "utf8");

    const fileName = path.basename(inputPath);
    const titleRaw = extractTag(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i) || fileName;
    const description = extractTag(
      html,
      /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
    );

    const content = extractMain(html);
    const permalink = `/${relForPermalink}`;

    const title = decodeHtmlEntities(titleRaw);
    const descriptionDecoded = decodeHtmlEntities(description);

    const frontMatter = [
      "---",
      "layout: layouts/base.njk",
      `title: "${escapeFrontMatter(title)}"`,
      descriptionDecoded
        ? `description: "${escapeFrontMatter(descriptionDecoded)}"`
        : "description: \"\"",
      `permalink: "${permalink}"`,
      "---",
      "",
    ].join("\n");

    await fs.writeFile(outPath, `${frontMatter}${content}\n`, "utf8");
    written += 1;
  }

  console.log(
    `Migrated ${written} pages into ${path.relative(PROJECT_ROOT, OUTPUT_DIR)}${
      skippedExisting ? ` (skipped ${skippedExisting} existing)` : ""
    }${FORCE ? " (force overwrite enabled)" : ""}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
