// Fails if any component uses a raw colour instead of a DESIGN.md token.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const HEX = /#[0-9a-fA-F]{3,8}\b/;
const RGB = /\brgba?\(/;
const offenders = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.tsx?$/.test(name)) {
      readFileSync(path, "utf8").split("\n").forEach((line, i) => {
        if (HEX.test(line) || RGB.test(line)) offenders.push(`${path}:${i + 1}: ${line.trim()}`);
      });
    }
  }
}

walk(process.argv[2] ?? "components");

if (offenders.length) {
  console.error("Raw colour values found:\n" + offenders.join("\n"));
  process.exit(1);
}
console.log("check-tokens: OK");
