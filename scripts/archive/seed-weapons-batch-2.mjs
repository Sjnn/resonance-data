import fs from "node:fs";
import path from "node:path";

const WEAPONS = [
  {
    id: "whispers-of-sirens",
    name: "Whispers of Sirens",
    weaponType: "Rectifier",
    rarity: 5,
    baseAtk: 500,
    subStat: "CRIT DMG",
    subStatValue: "72.0%",
    passive: "Increases ATK by 12%. Casting Echo Skill grants 1 stack of Gentle Dream (up to 2 stacks), increasing Basic Attack DMG by 40% per stack and ignoring 12% of the target's Havoc RES when hitting with Basic Attacks."
  },
  {
    id: "thunderflare-dominion",
    name: "Thunderflare Dominion",
    weaponType: "Broadblade",
    rarity: 5,
    baseAtk: 675,
    subStat: "CRIT Rate",
    subStatValue: "12.2%",
    passive: "Increases ATK by 12%. Casting Intro Skill or Resonance Skill increases Heavy Attack DMG by 20% and causes Heavy Attacks to ignore 7.2% of target DEF, stacking up to 5 times while shielded."
  },
  {
    id: "moongazers-sigil",
    name: "Moongazer's Sigil",
    weaponType: "Gauntlets",
    rarity: 5,
    baseAtk: 500,
    subStat: "CRIT Rate",
    subStatValue: "36.0%",
    passive: "Increases ATK by 12%. Casting Intro Skill or Resonance Liberation increases Resonance Liberation DMG by 20% and ignores 7.2% of target DEF for 5s when gaining a Shield."
  },
  {
    id: "lux-and-umbra",
    name: "Lux & Umbra",
    weaponType: "Pistols",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT DMG",
    subStatValue: "48.6%",
    passive: "Increases ATK by 12%. Dealing Echo Skill DMG or Heavy Attack DMG amplifies both Heavy Attack DMG and Echo Skill DMG by 20% and ignores 8% of target DEF."
  },
  {
    id: "emerald-sentence",
    name: "Emerald Sentence",
    weaponType: "Sword",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases ATK by 12%. Casting Echo Skill grants 20% Heavy Attack DMG Bonus to the wielder and 20% Echo Skill DMG Amplification to all Resonators in the team for 30s."
  },
  {
    id: "kumokiri",
    name: "Kumokiri",
    weaponType: "Broadblade",
    rarity: 5,
    baseAtk: 500,
    subStat: "CRIT Rate",
    subStatValue: "36.0%",
    passive: "Increases ATK by 12%. Inflicting Negative Status or dealing Resonance Liberation DMG increases Resonance Liberation DMG by 8% (up to 3 stacks) and grants 24% All-Attribute DMG Bonus to team members inflicting Negative Status."
  },
  {
    id: "spectrum-blaster",
    name: "Spectrum Blaster",
    weaponType: "Pistols",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases ATK by 12%. Casting Intro Skill or Basic Attack increases Basic Attack DMG by 36% and boosts All-Attribute DMG of all nearby team members by 8% (stacking up to 3 times)."
  },
  {
    id: "starfield-calibrator",
    name: "Starfield Calibrator",
    weaponType: "Broadblade",
    rarity: 5,
    baseAtk: 413,
    subStat: "Energy Regen",
    subStatValue: "77.0%",
    passive: "Increases DEF by 16%. Casting Resonance Skill restores 8 Concerto Energy and increases CRIT DMG of all nearby Resonators by 20% for 4s when the wielder heals an ally."
  },
  {
    id: "everbright-polestar",
    name: "Everbright Polestar",
    weaponType: "Sword",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases All-Attribute DMG Bonus by 12%. Inflicting Tune Rupture - Shifting or Fusion Burst causes Resonance Liberation DMG to ignore 32% of the target's DEF and 10% of Fusion RES."
  },
  {
    id: "daybreakers-spine",
    name: "Daybreaker's Spine",
    weaponType: "Gauntlets",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases ATK by 12%. Dealing Basic Attack DMG grants 1 stack of Golden Verdict, increasing Basic Attack DMG by 10% (up to 4 stacks) and ignoring 18% of target Spectro RES at max stacks."
  },
  {
    id: "solsworn-ciphers",
    name: "Solsworn Ciphers",
    weaponType: "Gauntlets",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases ATK by 12%. Casting Resonance Skill or Echo Skill increases Echo Skill DMG by 24% and Aero DMG by 16% for 12s."
  },
  {
    id: "frostburn",
    name: "Frostburn",
    weaponType: "Sword",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT DMG",
    subStatValue: "48.6%",
    passive: "Increases ATK by 12%. Dealing Resonance Skill DMG grants 18% Glacio DMG Bonus and increases Resonance Skill DMG by 28% for 12s."
  },
  {
    id: "forged-dwarf-star",
    name: "Forged Dwarf Star",
    weaponType: "Gauntlets",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases ATK by 12%. Casting Resonance Skill restores 6 Concerto Energy and increases Basic Attack DMG and Fusion DMG by 24% for 14s."
  },
  {
    id: "freeze-frame",
    name: "Freeze Frame",
    weaponType: "Rectifier",
    rarity: 5,
    baseAtk: 500,
    subStat: "CRIT DMG",
    subStatValue: "72.0%",
    passive: "Increases ATK by 12%. Casting Resonance Liberation increases Basic Attack DMG and Glacio DMG by 24% and ignores 12% of the target's DEF for 12s."
  },
  {
    id: "lullaby",
    name: "Lullaby",
    weaponType: "Rectifier",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases ATK by 12%. Dealing Resonance Skill DMG increases Havoc DMG by 18% and boosts coordinated or off-field Resonance Skill DMG by 32% for 14s."
  },
  {
    id: "firstlights-herald",
    name: "Firstlight's Herald",
    weaponType: "Broadblade",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases ATK by 12%. Casting Intro Skill or Resonance Liberation increases Heavy Attack DMG by 32% and Spectro DMG by 16% for 14s."
  },
  {
    id: "skull-thrasher",
    name: "Skull Thrasher",
    weaponType: "Gauntlets",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "36.4%",
    passive: "Casting Resonance Skill increases Heavy Attack DMG by 18% and DEF by 15% for 12s."
  },
  {
    id: "spectral-trigger",
    name: "Spectral Trigger",
    weaponType: "Pistols",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases ATK by 12%. Dealing Resonance Liberation DMG increases Electro DMG by 18% and Resonance Liberation DMG by 32% for 12s."
  },
  {
    id: "unspoken-rue",
    name: "Unspoken Rue",
    weaponType: "Rectifier",
    rarity: 5,
    baseAtk: 500,
    subStat: "CRIT DMG",
    subStatValue: "72.0%",
    passive: "Increases ATK by 12%. Casting Echo Skill or Resonance Liberation increases Havoc DMG by 20% and Heavy Attack DMG by 32% for 12s."
  },
  {
    id: "glint-of-clouds",
    name: "Glint of Clouds",
    weaponType: "Sword",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases ATK by 12%. Casting Resonance Skill increases Aero DMG by 18% and Basic Attack DMG by 32% for 14s."
  },
  {
    id: "blooming-jadehaven",
    name: "Blooming Jadehaven",
    weaponType: "Sword",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT DMG",
    subStatValue: "48.6%",
    passive: "Increases ATK by 12%. Casting Intro Skill or Resonance Skill grants 18% Glacio DMG Bonus and increases Resonance Liberation DMG by 32% for 14s."
  },
  {
    id: "thousandfold-deliverance",
    name: "Thousandfold Deliverance",
    weaponType: "Broadblade",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT DMG",
    subStatValue: "48.6%",
    passive: "Increases ATK by 12%. Casting Resonance Liberation increases Heavy Attack DMG by 28% and grants 16% Electro DMG Bonus for 14s."
  },
  {
    id: "azure-oath",
    name: "Azure Oath",
    weaponType: "Sword",
    rarity: 5,
    baseAtk: 587,
    subStat: "CRIT Rate",
    subStatValue: "24.3%",
    passive: "Increases ATK by 12%. Casting Resonance Skill or Resonance Liberation increases Aero DMG by 20% and Resonance Liberation DMG by 32% for 14s."
  }
];

const weaponsRoot = path.join(process.cwd(), "wuwa", "weapons");
fs.mkdirSync(weaponsRoot, { recursive: true });

for (const w of WEAPONS) {
  const dir = path.join(weaponsRoot, w.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "data.json"), JSON.stringify(w, null, 2) + "\n", "utf8");
}

console.log(`Seeded ${WEAPONS.length} weapons into wuwa/weapons/`);
