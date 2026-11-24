// Copies entry.txt (next to this script) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node standard library only. Resolves paths relative to this file, never cwd.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
// Gate check: the entry must be 1-180 characters, not only whitespace.
const entry = readFileSync(join(dir, "entry.txt"), "utf8").trim();
const length = [...entry].length;
if (length < 1 || length > 180) {
  throw new Error(`entry.txt is ${length} characters; must be 1-180`);
}
copyFileSync(join(dir, "entry.txt"), join(outDir, "entry.txt"));
