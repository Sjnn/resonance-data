import fs from "node:fs";
import path from "node:path";

const WEAPONS_4STAR = [
  // --- Battle Pass (Pioneer Podcast) ---
  {
    id: "stonard",
    name: "Stonard",
    weaponType: "Gauntlets",
    rarity: 4,
    baseAtk: 412,
    subStat: "CRIT Rate",
    subStatValue: "20.2%",
    passive: "Casting Resonance Skill increases the wielder's Resonance Liberation DMG Bonus by 18% for 15s."
  },
  {
    id: "thunderbolt",
    name: "Thunderbolt",
    weaponType: "Pistols",
    rarity: 4,
    baseAtk: 387,
    subStat: "ATK",
    subStatValue: "36.4%",
    passive: "Hitting a target with Basic Attack or Heavy Attack increases Resonance Skill DMG Bonus by 7% for 10s, stacking up to 3 times."
  },
  {
    id: "lumingloss",
    name: "Lumingloss",
    weaponType: "Sword",
    rarity: 4,
    baseAtk: 387,
    subStat: "ATK",
    subStatValue: "36.4%",
    passive: "Casting Resonance Skill increases Basic Attack DMG and Heavy Attack DMG by 20% for 10s, stacking up to 1 time."
  },

  // --- Standard Gacha 4-Star ---
  {
    id: "helios-cleaver",
    name: "Helios Cleaver",
    weaponType: "Broadblade",
    rarity: 4,
    baseAtk: 412,
    subStat: "ATK",
    subStatValue: "30.3%",
    passive: "Within 12s after Resonance Skill is cast, increases ATK by 3% every 2s, stacking up to 4 times."
  },
  {
    id: "dauntless-evernight",
    name: "Dauntless Evernight",
    weaponType: "Broadblade",
    rarity: 4,
    baseAtk: 337,
    subStat: "DEF",
    subStatValue: "61.5%",
    passive: "Casting Intro Skill increases ATK by 8% and DEF by 15% for 15s."
  },
  {
    id: "amity-accord",
    name: "Amity Accord",
    weaponType: "Gauntlets",
    rarity: 4,
    baseAtk: 337,
    subStat: "DEF",
    subStatValue: "61.5%",
    passive: "Casting Intro Skill increases Resonance Liberation DMG Bonus by 20% for 15s."
  },
  {
    id: "undying-flame",
    name: "Undying Flame",
    weaponType: "Pistols",
    rarity: 4,
    baseAtk: 412,
    subStat: "ATK",
    subStatValue: "30.3%",
    passive: "Casting Intro Skill increases Resonance Skill DMG Bonus by 20% for 15s."
  },
  {
    id: "comet-flare",
    name: "Comet Flare",
    weaponType: "Rectifier",
    rarity: 4,
    baseAtk: 412,
    subStat: "HP",
    subStatValue: "30.3%",
    passive: "Hitting a target with Basic Attack or Heavy Attack increases Healing Bonus by 3% for 10s, stacking up to 3 times."
  },
  {
    id: "lunar-cutter",
    name: "Lunar Cutter",
    weaponType: "Sword",
    rarity: 4,
    baseAtk: 412,
    subStat: "ATK",
    subStatValue: "30.3%",
    passive: "Wielder gains 6 stacks of Oath upon entering the battlefield. Dealing DMG consumes 1 stack and increases ATK by 2% for 10s."
  },

  // --- Craftable Series (# Series) ---
  {
    id: "broadblade-41",
    name: "Broadblade#41",
    weaponType: "Broadblade",
    rarity: 4,
    baseAtk: 412,
    subStat: "Energy Regen",
    subStatValue: "32.3%",
    passive: "When the wielder's HP is above 80%, increases ATK by 12%. When HP is below 40%, restores 5% HP when dealing Basic or Heavy Attack DMG."
  },
  {
    id: "gauntlets-21d",
    name: "Gauntlets#21D",
    weaponType: "Gauntlets",
    rarity: 4,
    baseAtk: 387,
    subStat: "Energy Regen",
    subStatValue: "38.8%",
    passive: "When the wielder dashes or dodges, increases ATK by 8% for 8s and increases Dodge Counter DMG by 50%."
  },
  {
    id: "pistols-26",
    name: "Pistols#26",
    weaponType: "Pistols",
    rarity: 4,
    baseAtk: 387,
    subStat: "ATK",
    subStatValue: "36.4%",
    passive: "When the wielder takes no damage, increases ATK by 6% every 5s, stacking up to 2 times."
  },
  {
    id: "rectifier-25",
    name: "Rectifier#25",
    weaponType: "Rectifier",
    rarity: 4,
    baseAtk: 337,
    subStat: "Energy Regen",
    subStatValue: "51.8%",
    passive: "When Resonance Skill is cast, if the wielder's HP is below 60%, restores 5% HP; if above 60%, increases ATK by 12% for 10s."
  },
  {
    id: "sword-18",
    name: "Sword#18",
    weaponType: "Sword",
    rarity: 4,
    baseAtk: 387,
    subStat: "ATK",
    subStatValue: "36.4%",
    passive: "When the wielder's HP drops below 40%, increases Heavy Attack DMG by 18% and restores 5% HP upon dealing Heavy Attack DMG."
  },

  // --- Deep Sky / Black Shores Series ---
  {
    id: "waning-redshift",
    name: "Waning Redshift",
    weaponType: "Broadblade",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Casting Resonance Skill restores 6 Resonance Energy and increases ATK by 10% for 16s."
  },
  {
    id: "celestial-spiral",
    name: "Celestial Spiral",
    weaponType: "Gauntlets",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Casting Resonance Skill restores 6 Resonance Energy and increases ATK by 10% for 16s."
  },
  {
    id: "relativistic-jet",
    name: "Relativistic Jet",
    weaponType: "Pistols",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Casting Resonance Skill restores 6 Resonance Energy and increases ATK by 10% for 16s."
  },
  {
    id: "fusion-accretion",
    name: "Fusion Accretion",
    weaponType: "Rectifier",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Casting Resonance Skill restores 6 Resonance Energy and increases ATK by 10% for 16s."
  },
  {
    id: "scale-slasher",
    name: "Scale: Slasher",
    weaponType: "Sword",
    rarity: 4,
    baseAtk: 337,
    subStat: "Energy Regen",
    subStatValue: "51.8%",
    passive: "Casting Resonance Skill restores 6 Concerto Energy. Can be triggered once every 20s."
  },

  // --- Event & Rinascita Craftable / Quest Series ---
  {
    id: "somnoire-anchor",
    name: "Somnoire Anchor",
    weaponType: "Sword",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Dealing damage to targets increases ATK by 2% and CRIT Rate by 0.6% for 3s, stacking up to 10 times."
  },
  {
    id: "call-of-the-abyss",
    name: "Call of the Abyss",
    weaponType: "Rectifier",
    rarity: 4,
    baseAtk: 337,
    subStat: "Energy Regen",
    subStatValue: "51.8%",
    passive: "Casting Resonance Liberation increases the wielder's Healing Bonus by 16% for 15s."
  },
  {
    id: "fables-of-wisdom",
    name: "Fables of Wisdom",
    weaponType: "Sword",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Dealing damage to enemies with Negative Status effects increases the wielder's ATK by 4% for 10s, stacking up to 4 times."
  },
  {
    id: "oceans-gift",
    name: "Ocean's Gift",
    weaponType: "Rectifier",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Dealing damage to enemies with Spectro Frazzle increases the wielder's Spectro DMG Bonus by 6% for 6s, stacking up to 4 times."
  },
  {
    id: "meditation-on-mercy",
    name: "Meditation on Mercy",
    weaponType: "Broadblade",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Dealing damage to enemies with Negative Status effects increases the wielder's ATK by 4% for 10s, stacking up to 4 times."
  },
  {
    id: "legend-of-drunken-hero",
    name: "Legend of Drunken Hero",
    weaponType: "Gauntlets",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Dealing damage to enemies with Negative Status effects increases the wielder's ATK by 4% for 10s, stacking up to 4 times."
  },
  {
    id: "romance-in-farewell",
    name: "Romance in Farewell",
    weaponType: "Pistols",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Dealing damage to enemies with Negative Status effects increases the wielder's ATK by 4% for 10s, stacking up to 4 times."
  },
  {
    id: "waltz-in-masquerade",
    name: "Waltz in Masquerade",
    weaponType: "Rectifier",
    rarity: 4,
    baseAtk: 462,
    subStat: "ATK",
    subStatValue: "18.2%",
    passive: "Dealing damage to enemies with Negative Status effects increases the wielder's ATK by 4% for 10s, stacking up to 4 times."
  },
  {
    id: "aureate-zenith",
    name: "Aureate Zenith",
    weaponType: "Broadblade",
    rarity: 4,
    baseAtk: 412,
    subStat: "CRIT DMG",
    subStatValue: "40.5%",
    passive: "Casting Resonance Liberation increases ATK by 7.2% and Heavy Attack DMG Bonus by 10.8% for 15s, stacking up to 2 times."
  },
  {
    id: "aether-strike",
    name: "Aether Strike",
    weaponType: "Gauntlets",
    rarity: 4,
    baseAtk: 412,
    subStat: "CRIT DMG",
    subStatValue: "40.5%",
    passive: "Casting Resonance Liberation increases ATK by 7.2% and Resonance Liberation DMG Bonus by 10.8% for 15s, stacking up to 2 times."
  },
  {
    id: "solar-flame",
    name: "Solar Flame",
    weaponType: "Pistols",
    rarity: 4,
    baseAtk: 412,
    subStat: "CRIT Rate",
    subStatValue: "20.2%",
    passive: "Dealing Basic Attack or Heavy Attack DMG increases ATK by 2.2% and Heavy Attack DMG Bonus by 2.2% for 10s, stacking up to 4 times."
  }
];

const weaponsRoot = path.join(process.cwd(), "wuwa", "weapons");
fs.mkdirSync(weaponsRoot, { recursive: true });

for (const w of WEAPONS_4STAR) {
  const dir = path.join(weaponsRoot, w.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "data.json"), JSON.stringify(w, null, 2) + "\n", "utf8");
}

console.log(`Seeded ${WEAPONS_4STAR.length} 4-star weapons into wuwa/weapons/`);
