import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const ROOT = process.cwd();
const inputArg = process.argv[2];
const input = inputArg
  ? path.isAbsolute(inputArg)
    ? inputArg
    : path.join(ROOT, inputArg)
  : null;
const outDir = path.join(ROOT, "public");

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function parseHexColor(hex) {
  const clean = hex.replace("#", "").trim();
  if (clean.length !== 6) return { r: 11, g: 11, b: 11, alpha: 1 };
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return { r: 11, g: 11, b: 11, alpha: 1 };
  }
  return { r, g, b, alpha: 1 };
}

async function writePng(sourcePath, name, size) {
  const outPath = path.join(outDir, name);
  const bgHex = process.env.FAVICON_BG || "#0b0b0b";
  const bg = parseHexColor(bgHex);

  const inner = Math.max(1, Math.round(size * 0.78));
  const logoBuf = await sharp(sourcePath)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const left = Math.floor((size - inner) / 2);
  const top = Math.floor((size - inner) / 2);

  const buf = await sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: logoBuf, left, top }])
    .png()
    .toBuffer();
  await fs.writeFile(outPath, buf);
  return { outPath, buf };
}

async function main() {
  await ensureDir(outDir);

  const defaultCandidates = [
    path.join(ROOT, "src", "assets", "logoaba.png"),
    path.join(ROOT, "src", "assets", "logo01.jpg"),
  ];

  const resolvedInput =
    input ??
    (await (async () => {
      for (const candidate of defaultCandidates) {
        try {
          await fs.access(candidate);
          return candidate;
        } catch {
          // try next
        }
      }
      return null;
    })());

  if (!resolvedInput) {
    throw new Error(
      "Nenhuma imagem padrão encontrada.\n" +
        `Tente rodar: npm run generate:favicons -- src/assets/logoaba.png`,
    );
  }

  try {
    await fs.access(resolvedInput);
  } catch {
    throw new Error(
      `Imagem de origem não encontrada: ${resolvedInput}\n` +
        "Dica: rode `npm run generate:favicons -- src/assets/sua-logo.png`",
    );
  }

  const png16 = await writePng(resolvedInput, "favicon-16x16.png", 16);
  const png32 = await writePng(resolvedInput, "favicon-32x32.png", 32);
  await writePng(resolvedInput, "apple-touch-icon.png", 180);

  const icoBuf = await pngToIco([png16.buf, png32.buf]);
  await fs.writeFile(path.join(outDir, "favicon.ico"), icoBuf);

  console.log(
    "Favicons gerados em public/: favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

