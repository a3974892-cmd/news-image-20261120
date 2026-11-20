// Entry runner for the news-image-20261120 bounty.
//
// The finished front page lives next to this file as entry.png. This script
// only places those exact bytes where the grader looks for them — it never
// opens, decodes, or rewrites the picture, so the file the grader sees is
// bit-for-bit the image I generated.
//
// Usage:  MAKEFUN_OUTPUT_DIR=<dir> node main.ts   (defaults to /output)

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(targetDir, "entry.png");

if (!existsSync(source)) {
  console.error(`entry.png not found next to main.ts: ${source}`);
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);

// Guard against a truncated copy: the output must be exactly the same size.
const copiedBytes = statSync(target).size;
if (copiedBytes !== statSync(source).size) {
  console.error(`copy size mismatch: ${copiedBytes} vs ${statSync(source).size} bytes`);
  process.exit(1);
}
console.log(`copied entry.png -> ${target} (${copiedBytes} bytes)`);
