// make.fun entry — "The Excuse That Almost Works"
// Writes one excuse (1-140 chars, at most 20 words) to entry.txt
// in the output directory: the text a gamer sends the boss to skip
// work on GTA 6 launch week.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "Sorry, my dentist moved my filling to Thursday — they said no screens for a day after the anaesthetic.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const text = EXCUSE.trim();
if (text.length < 1 || text.length > 140) {
  throw new Error(`excuse must be 1-140 chars, got ${text.length}`);
}
if (text.includes("\n")) {
  throw new Error("excuse must be a single line");
}
const words = text.split(/\s+/).filter(Boolean);
if (words.length > 20) {
  throw new Error(`excuse must be at most 20 words, got ${words.length}`);
}
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote entry.txt (${text.length} chars, ${words.length} words): ${text}`);
