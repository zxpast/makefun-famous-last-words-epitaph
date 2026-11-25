// Famous Last Words: The Funniest Epitaph — one-line entry.
// Node 22, stdlib only, deterministic, no network.
// Writes exactly one line (no trailing newline) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

function outputPath(): string {
  return join(OUT_DIR, "entry.txt");
}

// A dying wish, spoken in the first person, with the twist landing on the
// very last words: the dead man asked for his ashes in a coffee tin —
// a concrete, vivid image — and the people who buried him honoured the
// letter of the wish while insulting its spirit. "They used decaf" is the
// new information that flips the setup: not just any coffee tin, the cheap,
// joyless one. Three concrete nouns (ashes, coffee tin, decaf) collide;
// the narrator is the butt of the joke (self-own); nothing is explained.
// Setup:punchline is 9 words to 3 words (3:1).
const LINE = "I asked for my ashes in a coffee tin. They used decaf.";

// Gate guard: the sealed scorer accepts 1-150 UTF-8 chars, not only whitespace.
// Count the code points once, then reuse the count in the guard.
function assertValidLine(line: string): void {
  const len = [...line].length;
  const withinLimits = len >= 1 && len <= 150;
  const singleLine = !line.includes("\n");
  if (!withinLimits || !line.trim() || !singleLine) {
    throw new Error("entry line violates the 1-150 char single-line gate");
  }
}

assertValidLine(LINE);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(outputPath(), LINE, "utf8");
