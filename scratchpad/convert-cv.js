const sharp = require("sharp");
const d = "C:/Users/andre/AppData/Local/Temp/claude/C--Users-andre-Desktop-code/4fa9c74a-5618-4609-9390-5b71bbe43051/scratchpad/cv-new";
const out = "public/case-studies/chat-vet";
const jobs = [
  ["raw_4.png", "cv-lab-upload-confirm.webp"],
  ["raw_1.png", "cv-lab-results.webp"],
  ["raw_6.png", "cv-discharge-printout.webp"],
];
(async () => {
  for (const [src, dst] of jobs) {
    const info = await sharp(`${d}/${src}`).webp({ quality: 88 }).toFile(`${out}/${dst}`);
    console.log(dst, info.width + "x" + info.height, Math.round(info.size / 1024) + "KB");
  }
})();
