import fs from "node:fs";
import path from "node:path";

const batch3 = [
  // الصق الـ 15 كائن JSON اللي جهزناهم بالرد السابق هون
];

for (const char of batch3) {
  const dir = path.join("wuwa", "characters", char.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "data.json"),
    JSON.stringify(char, null, 2) + "\n",
    "utf8"
  );
  console.log(`Created: ${dir}/data.json`);
}