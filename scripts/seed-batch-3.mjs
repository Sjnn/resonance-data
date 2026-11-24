import fs from "node:fs";
import path from "node:path";

const batch3 = [
  {
    id: "cantarella",
    name: "Cantarella",
    element: "Havoc",
    weaponType: "Rectifier",
    rarity: 5,
    roles: ["sub-dps", "sustain"],
    rotationType: "quickswap",
    synergyTags: ["havoc-dmg", "resonance-skill", "coordinated-attack", "healing"],
    stats: { hp: 11600, atk: 400, def: 1100 },
    dataComplete: false,
    build: {
      weapons: ["whispers-of-sirens"],
      echoSets: ["midnight-veil"],
      mainStats: { cost4: "Crit Rate", cost3: "Havoc DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "phrolova",
    name: "Phrolova",
    element: "Havoc",
    weaponType: "Rectifier",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["havoc-dmg", "echo-skill", "resonance-skill"],
    stats: { hp: 10775, atk: 438, def: 1137 },
    dataComplete: false,
    build: {
      weapons: ["lethean-elegy"],
      echoSets: ["dream-of-the-lost", "havoc-eclipse"],
      mainStats: { cost4: "Crit DMG", cost3: "Havoc DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Resonance Skill DMG"]
    }
  },
  {
    id: "augusta",
    name: "Augusta",
    element: "Electro",
    weaponType: "Broadblade",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["electro-dmg", "heavy-attack"],
    stats: { hp: 10300, atk: 462, def: 1112 },
    dataComplete: false,
    build: {
      weapons: ["thunderflare-dominion"],
      echoSets: ["crown-of-valor", "void-thunder"],
      mainStats: { cost4: "Crit DMG", cost3: "Electro DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Heavy Attack DMG"]
    }
  },
  {
    id: "iuno",
    name: "Iuno",
    element: "Aero",
    weaponType: "Gauntlet",
    rarity: 5,
    roles: ["sub-dps", "buffer"],
    rotationType: "quickswap",
    synergyTags: ["aero-dmg", "heavy-attack-amp", "shield"],
    stats: { hp: 10525, atk: 425, def: 1161 },
    dataComplete: false,
    build: {
      weapons: ["moongazers-sigil"],
      echoSets: ["crown-of-valor", "sierra-gale"],
      mainStats: { cost4: "Crit DMG", cost3: "Aero DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "galbrena",
    name: "Galbrena",
    element: "Fusion",
    weaponType: "Pistol",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["fusion-dmg", "echo-skill", "heavy-attack"],
    stats: { hp: 10300, atk: 462, def: 1112 },
    dataComplete: false,
    build: {
      weapons: ["lux-and-umbra"],
      echoSets: ["flamewings-shadow", "flaming-clawprint"],
      mainStats: { cost4: "Crit Rate", cost3: "Fusion DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "qiuyuan",
    name: "Qiuyuan",
    element: "Aero",
    weaponType: "Sword",
    rarity: 5,
    roles: ["sub-dps", "buffer"],
    rotationType: "quickswap",
    synergyTags: ["aero-dmg", "echo-skill-amp", "crit-dmg-buff"],
    stats: { hp: 10775, atk: 412, def: 1186 },
    dataComplete: false,
    build: {
      weapons: ["emerald-sentence"],
      echoSets: ["law-of-harmony", "sierra-gale"],
      mainStats: { cost4: "Crit Rate", cost3: "Aero DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "chisa",
    name: "Chisa",
    element: "Havoc",
    weaponType: "Broadblade",
    rarity: 5,
    roles: ["sub-dps", "debuffer", "sustain"],
    rotationType: "quickswap",
    synergyTags: ["havoc-bane", "def-shred", "healing"],
    stats: { hp: 11200, atk: 388, def: 1150 },
    dataComplete: false,
    build: {
      weapons: ["kumokiri"],
      echoSets: ["thread-of-severed-fate", "havoc-eclipse"],
      mainStats: { cost4: "Crit Rate", cost3: "ATK%", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "buling",
    name: "Buling",
    element: "Electro",
    weaponType: "Rectifier",
    rarity: 4,
    roles: ["sustain", "buffer"],
    rotationType: "quickswap",
    synergyTags: ["healing", "resonance-skill-amp", "electro-flare"],
    stats: { hp: 9800, atk: 312, def: 960 },
    dataComplete: false,
    build: {
      weapons: ["stellar-symphony"],
      echoSets: ["rejuvenating-glow"],
      mainStats: { cost4: "Healing Bonus", cost3: "Energy Regen", cost1: "ATK%" },
      substats: ["Energy Regen", "ATK%", "HP%"]
    }
  },
  {
    id: "lynae",
    name: "Lynae",
    element: "Spectro",
    weaponType: "Pistol",
    rarity: 5,
    roles: ["sub-dps", "buffer"],
    rotationType: "quickswap",
    synergyTags: ["spectro-dmg", "tune-break", "all-dmg-amp"],
    stats: { hp: 10650, atk: 412, def: 1160 },
    dataComplete: false,
    build: {
      weapons: ["spectrum-blaster"],
      echoSets: ["pact-of-neonlight-leap"],
      mainStats: { cost4: "Crit Rate", cost3: "Spectro DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "Energy Regen", "ATK%"]
    }
  },
  {
    id: "mornye",
    name: "Mornye",
    element: "Fusion",
    weaponType: "Broadblade",
    rarity: 5,
    roles: ["sustain", "buffer"],
    rotationType: "quickswap",
    synergyTags: ["healing", "def-scaling", "tune-rupture", "all-dmg-amp"],
    stats: { hp: 11800, atk: 325, def: 1480 },
    dataComplete: false,
    build: {
      weapons: ["starfield-calibrator"],
      echoSets: ["halo-of-starry-radiance"],
      mainStats: { cost4: "Healing Bonus", cost3: "Energy Regen", cost1: "DEF%" },
      substats: ["Energy Regen", "DEF%", "Crit DMG", "HP%"]
    }
  },
  {
    id: "aemeath",
    name: "Aemeath",
    element: "Fusion",
    weaponType: "Sword",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["fusion-dmg", "tune-rupture", "fusion-burst"],
    stats: { hp: 10450, atk: 450, def: 1125 },
    dataComplete: false,
    build: {
      weapons: ["everbright-polestar"],
      echoSets: ["trailblazing-star"],
      mainStats: { cost4: "Crit Rate", cost3: "Fusion DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "luuk-herssen",
    name: "Luuk Herssen",
    element: "Spectro",
    weaponType: "Gauntlet",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["spectro-dmg", "tune-strain", "basic-attack"],
    stats: { hp: 10500, atk: 445, def: 1130 },
    dataComplete: false,
    build: {
      weapons: ["daybreakers-spine"],
      echoSets: ["rite-of-gilded-revelation"],
      mainStats: { cost4: "Crit Rate", cost3: "Spectro DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Basic Attack DMG"]
    }
  },
  {
    id: "sigrika",
    name: "Sigrika",
    element: "Aero",
    weaponType: "Gauntlet",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["aero-dmg", "echo-skill"],
    stats: { hp: 10400, atk: 450, def: 1120 },
    dataComplete: false,
    build: {
      weapons: ["solsworn-ciphers"],
      echoSets: ["sound-of-true-name"],
      mainStats: { cost4: "Crit DMG", cost3: "Energy Regen", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "Energy Regen", "ATK%"]
    }
  },
  {
    id: "hiyuki",
    name: "Hiyuki",
    element: "Glacio",
    weaponType: "Sword",
    rarity: 5,
    roles: ["main-dps"],
    rotationType: "sustained",
    synergyTags: ["glacio-dmg", "glacio-chafe"],
    stats: { hp: 10550, atk: 440, def: 1140 },
    dataComplete: false,
    build: {
      weapons: ["frostburn"],
      echoSets: ["wishes-of-quiet-snowfall"],
      mainStats: { cost4: "Crit Rate", cost3: "Glacio DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  },
  {
    id: "lucilla",
    name: "Lucilla",
    element: "Glacio",
    weaponType: "Rectifier",
    rarity: 5,
    roles: ["sub-dps", "debuffer"],
    rotationType: "quickswap",
    synergyTags: ["glacio-dmg", "glacio-chafe"],
    stats: { hp: 10800, atk: 405, def: 1150 },
    dataComplete: false,
    build: {
      weapons: ["freeze-frame"],
      echoSets: ["wishes-of-quiet-snowfall"],
      mainStats: { cost4: "Crit Rate", cost3: "Glacio DMG", cost1: "ATK%" },
      substats: ["Crit Rate", "Crit DMG", "ATK%", "Energy Regen"]
    }
  }
];

for (const c of batch3) {
  const dir = path.join("wuwa", "characters", c.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "data.json"), JSON.stringify(c, null, 2) + "\n", "utf8");
}
console.log("Seeded Batch 3 (15 characters)");
