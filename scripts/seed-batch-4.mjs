import fs from "node:fs";
import path from "node:path";

const batch4 = [
  {
    id: "denia",
    name: "Denia",
    element: "Fusion",
    weaponType: "Rectifier",
    rarity: 5,
    roles: ["sub-dps"],
    rotationType: "quickswap",
    synergyTags: ["fusion-dmg", "fusion-burst"],
    stats: { hp: 10650, atk: 412, def: 1150 },
    dataComplete: false,
    build: {
      weapons: ["forged-dwarf-star"],
      echoSets: ["chromatic-foam"],
      mainStats: { cost4: "Crit Rate", cost3: "Fusion DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "lily",
    name: "Lily",
    element: "Spectro",
    weaponType: "Pistol",
    rarity: 5,
    roles: ["sustain", "buffer"],
    rotationType: "quickswap",
    synergyTags: ["healing", "unison", "hp-scaling"],
    stats: { hp: 12100, atk: 330, def: 1180 },
    dataComplete: false,
    build: {
      weapons: ["lullaby"],
      echoSets: ["flower-of-tinged-yearning"],
      mainStats: { cost4: "Healing Bonus", cost3: "Energy Regen", cost1: "HP%" },
      substats: ["Energy Regen", "HP%", "Crit DMG"]
    }
  },
  {
    id: "lucy",
    name: "Lucy",
    element: "Spectro",
    weaponType: "Pistol",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["spectro-dmg", "heavy-attack"],
    stats: { hp: 10350, atk: 455, def: 1115 },
    dataComplete: false,
    build: {
      weapons: ["spectral-trigger"],
      echoSets: ["shadow-of-shattered-dreams", "rite-of-gilded-revelation", "reel-of-spliced-memories"],
      mainStats: { cost4: "Crit Rate", cost3: "Spectro DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "Heavy Attack DMG", "ATK%"]
    }
  },
  {
    id: "rebecca",
    name: "Rebecca",
    element: "Electro",
    weaponType: "Pistol",
    rarity: 5,
    roles: ["sub-dps", "buffer"],
    rotationType: "quickswap",
    synergyTags: ["electro-dmg", "heavy-attack-amp"],
    stats: { hp: 10700, atk: 415, def: 1145 },
    dataComplete: false,
    build: {
      weapons: ["skull-thrasher"],
      echoSets: ["shadow-of-shattered-dreams", "void-thunder", "reel-of-spliced-memories"],
      mainStats: { cost4: "Crit Rate", cost3: "Electro DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "Energy Regen", "ATK%"]
    }
  },
  {
    id: "qingxiao",
    name: "Qingxiao",
    element: "Aero",
    weaponType: "Sword",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["aero-dmg", "tune-strain"],
    stats: { hp: 10450, atk: 450, def: 1125 },
    dataComplete: false,
    build: {
      weapons: ["glint-of-clouds"],
      echoSets: ["heart-of-evils-purge"],
      mainStats: { cost4: "Crit Rate", cost3: "Aero DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "yangyang-xuanling",
    name: "Yangyang Xuanling",
    element: "Havoc",
    weaponType: "Sword",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["havoc-dmg", "havoc-bane"],
    stats: { hp: 10500, atk: 445, def: 1135 },
    dataComplete: false,
    build: {
      weapons: ["azure-oath"],
      echoSets: ["song-of-feathered-trace"],
      mainStats: { cost4: "Crit Rate", cost3: "Havoc DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "suisui",
    name: "Suisui",
    element: "Glacio",
    weaponType: "Rectifier",
    rarity: 5,
    roles: ["sustain", "buffer", "debuffer"],
    rotationType: "quickswap",
    synergyTags: ["healing", "negative-status", "hp-scaling"],
    stats: { hp: 12000, atk: 335, def: 1170 },
    dataComplete: false,
    build: {
      weapons: ["firstlights-herald"],
      echoSets: ["song-of-feathered-trace"],
      mainStats: { cost4: "Healing Bonus", cost3: "Energy Regen", cost1: "HP%" },
      substats: ["Energy Regen", "HP%", "ATK%"]
    }
  },
  {
    id: "suoming",
    name: "Suoming",
    element: "Electro",
    weaponType: "Sword",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["electro-dmg", "unison"],
    stats: { hp: 10400, atk: 455, def: 1120 },
    dataComplete: false,
    build: {
      weapons: ["unspoken-rue"],
      echoSets: ["heart-of-sworn-vigil"],
      mainStats: { cost4: "Crit DMG", cost3: "Electro DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "hsin",
    name: "Hsin",
    element: "Electro",
    weaponType: "Rectifier",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["electro-dmg", "electro-flare", "unison"],
    stats: { hp: 10350, atk: 460, def: 1110 },
    dataComplete: false,
    build: {
      weapons: ["blooming-jadehaven"],
      echoSets: ["heart-of-sworn-vigil"],
      mainStats: { cost4: "Crit DMG", cost3: "Electro DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "jingran",
    name: "Jingran",
    element: "Fusion",
    weaponType: "Broadblade",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["fusion-dmg", "heavy-attack", "hp-scaling"],
    stats: { hp: 12400, atk: 360, def: 1140 },
    dataComplete: false,
    build: {
      weapons: ["thousandfold-deliverance"],
      echoSets: ["lamp-of-nether-road"],
      mainStats: { cost4: "Crit DMG", cost3: null, cost1: "HP%" },
      substats: ["Crit Rate", "Crit DMG", "HP%", "Heavy Attack DMG"]
    }
  },
  {
    id: "rover-electro",
    name: "Rover (Electro)",
    element: "Electro",
    weaponType: "Sword",
    rarity: 5,
    roles: ["sub-dps"],
    rotationType: "quickswap",
    synergyTags: ["electro-dmg", "electro-flare"],
    stats: { hp: 10800, atk: 375, def: 1145 },
    dataComplete: false,
    build: {
      weapons: ["blazing-brilliance"],
      echoSets: ["flash-of-electric-reflection"],
      mainStats: { cost4: "Crit Rate", cost3: "Electro DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  }
];

for (const c of batch4) {
  const dir = path.join("wuwa", "characters", c.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "data.json"), JSON.stringify(c, null, 2) + "\n", "utf8");
}
console.log("Seeded Batch 4 (11 characters)");
