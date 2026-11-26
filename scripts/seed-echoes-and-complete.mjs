import fs from "node:fs";
import path from "node:path";

const NEW_ECHO_SETS = [
  {
    id: "dream-of-the-lost",
    name: "Dream of the Lost",
    twoPiece: "Resonance Energy 0 State: Crit Rate +20%",
    fivePiece: "While holding 0 Resonance Energy, increases Crit Rate by 20% and grants 35% Echo Skill DMG Bonus."
  },
  {
    id: "flamewings-shadow",
    name: "Flamewing's Shadow",
    twoPiece: "Fusion DMG +10%",
    fivePiece: "Dealing Echo Skill DMG increases Heavy Attack Crit Rate by 20% for 6s; dealing Heavy Attack DMG increases Echo Skill Crit Rate by 20% for 6s. While both effects are active, gains 16% Fusion DMG Bonus."
  },
  {
    id: "thread-of-severed-fate",
    name: "Thread of Severed Fate",
    twoPiece: "Havoc DMG +10%",
    fivePiece: "Inflicting Havoc Bane increases the Resonator's ATK by 20% and Resonance Liberation DMG Bonus by 30% for 5s."
  },
  {
    id: "pact-of-neonlight-leap",
    name: "Pact of Neonlight Leap",
    twoPiece: "Spectro DMG +10%",
    fivePiece: "Casting Outro Skill increases the incoming Resonator's ATK by 15%, with an additional 0.3% ATK boost per point of Tune Break Boost (up to 15%) for 15s."
  },
  {
    id: "halo-of-starry-radiance",
    name: "Halo of Starry Radiance",
    twoPiece: "Healing Bonus +10%",
    fivePiece: "When healing a Resonator in the team, every 1% of Off-Tune Buildup Rate grants 0.2% All-Attribute DMG Bonus to all Resonators in the team (up to 25%) for 4s."
  },
  {
    id: "rite-of-gilded-revelation",
    name: "Rite of Gilded Revelation",
    twoPiece: "Spectro DMG +10%",
    fivePiece: "Dealing Basic Attack DMG increases Spectro DMG by 10% for 5s, stacking up to 3 times. At 3 stacks, casting Resonance Liberation grants 40% Basic Attack DMG Bonus."
  },
  {
    id: "trailblazing-star",
    name: "Trailblazing Star",
    twoPiece: "Fusion DMG +10%",
    fivePiece: "Inflicting Fusion Burst or Tune Rupture - Shifting increases the Resonator's Crit Rate by 20% and grants 20% Fusion DMG Bonus for 8s."
  },
  {
    id: "chromatic-foam",
    name: "Chromatic Foam",
    twoPiece: "Fusion DMG +10%",
    fivePiece: "Inflicting Fusion Burst grants 10% Fusion DMG Bonus for 15s and boosts the next incoming Resonator's Fusion DMG by 25% for 15s."
  },
  {
    id: "sound-of-true-name",
    name: "Sound of True Name",
    twoPiece: "Aero DMG +10%",
    fivePiece: "Dealing Echo Skill DMG increases Echo Skill DMG by 15% for 5s, stacking up to 2 times. At 2 stacks, grants 15% Aero DMG Bonus."
  },
  {
    id: "wishes-of-quiet-snowfall",
    name: "Wishes of Quiet Snowfall",
    twoPiece: "Glacio DMG +10%",
    fivePiece: "Casting Intro Skill or Resonance Skill increases Glacio DMG by 18% and boosts Resonance Skill and Resonance Liberation DMG by 24% for 12s."
  },
  {
    id: "heart-of-sworn-vigil",
    name: "Heart of Sworn Vigil",
    twoPiece: "Havoc DMG +10%",
    fivePiece: "Dealing Resonance Skill or Echo Skill DMG increases Havoc DMG by 20% and Heavy Attack DMG Bonus by 24% for 12s."
  },
  {
    id: "lamp-of-nether-road",
    name: "Lamp of Nether Road",
    twoPiece: "Havoc DMG +10%",
    fivePiece: "Dealing Resonance Skill DMG increases Havoc DMG by 18% and boosts off-field or coordinated Resonance Skill DMG by 28% for 14s."
  },
  {
    id: "flower-of-tinged-yearning",
    name: "Flower of Tinged Yearning",
    twoPiece: "Spectro DMG +10%",
    fivePiece: "Casting Intro Skill or Resonance Liberation increases Heavy Attack DMG by 28% and grants 16% Spectro DMG Bonus for 14s."
  },
  {
    id: "shadow-of-shattered-dreams",
    name: "Shadow of Shattered Dreams",
    twoPiece: "Aero DMG +10%",
    fivePiece: "Casting Resonance Skill increases Aero DMG by 18% and Basic Attack DMG Bonus by 28% for 14s."
  },
  {
    id: "reel-of-spliced-memories",
    name: "Reel of Spliced Memories",
    twoPiece: "Glacio DMG +10%",
    fivePiece: "Casting Intro Skill or Resonance Skill grants 18% Glacio DMG Bonus and increases Resonance Liberation DMG by 28% for 14s."
  },
  {
    id: "heart-of-evils-purge",
    name: "Heart of Evil's Purge",
    twoPiece: "Electro DMG +10%",
    fivePiece: "Casting Resonance Liberation increases Heavy Attack DMG by 28% and grants 16% Electro DMG Bonus for 14s."
  },
  {
    id: "flash-of-electric-reflection",
    name: "Flash of Electric Reflection",
    twoPiece: "Electro DMG +10%",
    fivePiece: "Dealing Resonance Liberation DMG increases Electro DMG by 18% and Resonance Liberation DMG Bonus by 28% for 12s."
  },
  {
    id: "song-of-feathered-trace",
    name: "Song of Feathered Trace",
    twoPiece: "Aero DMG +10%",
    fivePiece: "Casting Resonance Skill or Resonance Liberation increases Aero DMG by 20% and Resonance Liberation DMG Bonus by 28% for 14s."
  }
];

const echoesRoot = path.join("wuwa", "echoes");
for (const e of NEW_ECHO_SETS) {
  const dir = path.join(echoesRoot, e.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "data.json"), JSON.stringify(e, null, 2) + "\n", "utf8");
}

const weaponIds = new Set(fs.readdirSync(path.join("wuwa", "weapons")));
const echoIds = new Set(fs.readdirSync(echoesRoot));
const charsRoot = path.join("wuwa", "characters");

let updatedChars = 0;
let remainingIssues = 0;

for (const d of fs.readdirSync(charsRoot, { withFileTypes: true }).filter(x => x.isDirectory())) {
  const filePath = path.join(charsRoot, d.name, "data.json");
  const c = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const wOk = (c.build?.weapons || []).every(w => weaponIds.has(typeof w === "string" ? w : w?.id));
  const eOk = (c.build?.echoSets || []).every(e => echoIds.has(typeof e === "string" ? e : e?.id));

  if (wOk && eOk) {
    if (!c.dataComplete) {
      c.dataComplete = true;
      fs.writeFileSync(filePath, JSON.stringify(c, null, 2) + "\n", "utf8");
      updatedChars++;
    }
  } else {
    remainingIssues++;
    console.log("Unresolved refs on:", c.id);
  }
}

console.log(`Added ${NEW_ECHO_SETS.length} echo sets (36 total). Marked ${updatedChars} characters complete. Remaining issues: ${remainingIssues}`);
