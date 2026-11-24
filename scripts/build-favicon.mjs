import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Package the existing brand mark as a circular, transparent browser icon.
// Keep the actual logo artwork unchanged, matching rounded-full in the UI.
const source = new URL("../public/app/gcl-logo.jpeg", import.meta.url);
const size = 64;
const png = await sharp(await readFile(source))
  .resize(size, size)
  .composite([{
    input: Buffer.from(`<svg width="${size}" height="${size}"><circle cx="32" cy="32" r="32" fill="white"/></svg>`),
    blend: "dest-in",
  }])
  .png()
  .toBuffer();

// ICO supports a PNG payload; a single 64px image stays sharp in browser tabs.
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = size;
header[7] = size;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(new URL("../app/favicon.ico", import.meta.url), Buffer.concat([header, png]));
