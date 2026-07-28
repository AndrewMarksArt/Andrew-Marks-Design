const sharp = require("sharp");
const d = "C:/Users/andre/AppData/Local/Temp/claude/C--Users-andre-Desktop-code/4fa9c74a-5618-4609-9390-5b71bbe43051/scratchpad/kos-shots";
const out = "public/case-studies/knowledge-os";
const names = ["kos-hero-chat","kos-analytics","kos-trust-row","kos-gap-signal","kos-research-panel","kos-branch-converge"];
(async () => {
  for (const n of names) {
    const info = await sharp(`${d}/${n}.png`).webp({ quality: 88 }).toFile(`${out}/${n}.webp`);
    console.log(n, info.width + "x" + info.height, Math.round(info.size / 1024) + "KB");
  }
})();
