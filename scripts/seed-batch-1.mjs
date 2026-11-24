import fs from "node:fs";
import path from "node:path";

const batch1 = [
  {
    "id": "camellya",
    "name": "Camellya",
    "element": "Havoc",
    "weaponType": "Sword",
    "rarity": 5,
    "roles": [
      "main-dps"
    ],
    "rotationType": "sustained",
    "synergyTags": [
      "havoc-dmg",
      "basic-attack"
    ],
    "stats": {
      "hp": 10325,
      "atk": 450,
      "def": 1161
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "red-spring",
        "emerald-of-genesis"
      ],
      "echoSets": [
        "havoc-eclipse"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Havoc DMG + ATK%",
        "cost1": "ATK%"
      },
      "substats": [
        "Crit Rate",
        "Crit DMG",
        "Basic Attack DMG",
        "ATK%",
        "Energy Regen"
      ]
    }
  },
  {
    "id": "carlotta",
    "name": "Carlotta",
    "element": "Glacio",
    "weaponType": "Pistols",
    "rarity": 5,
    "roles": [
      "main-dps"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "glacio-dmg",
      "skill-dmg"
    ],
    "stats": {
      "hp": 12450,
      "atk": 462,
      "def": 1197
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "the-last-dance",
        "static-mist"
      ],
      "echoSets": [
        "frosty-resolve"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Glacio DMG",
        "cost1": "ATK%"
      },
      "substats": [
        "Crit Rate",
        "Crit DMG",
        "Resonance Skill DMG",
        "ATK%",
        "Energy Regen"
      ]
    }
  },
  {
    "id": "changli",
    "name": "Changli",
    "element": "Fusion",
    "weaponType": "Sword",
    "rarity": 5,
    "roles": [
      "main-dps",
      "sub-dps"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "fusion-dmg",
      "fusion-buff",
      "liberation-buff",
      "skill-dmg"
    ],
    "stats": {
      "hp": 10387,
      "atk": 462,
      "def": 1099
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "blazing-brilliance",
        "emerald-of-genesis"
      ],
      "echoSets": [
        "molten-rift"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Fusion DMG",
        "cost1": "ATK%"
      },
      "substats": [
        "Crit Rate",
        "Crit DMG",
        "Energy Regen",
        "Resonance Skill DMG",
        "ATK%"
      ]
    }
  },
  {
    "id": "encore",
    "name": "Encore",
    "element": "Fusion",
    "weaponType": "Rectifier",
    "rarity": 5,
    "roles": [
      "main-dps"
    ],
    "rotationType": "sustained",
    "synergyTags": [
      "fusion-dmg",
      "basic-attack"
    ],
    "stats": {
      "hp": 10512,
      "atk": 425,
      "def": 1246
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "stringmaster",
        "cosmic-ripples"
      ],
      "echoSets": [
        "molten-rift"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Fusion DMG",
        "cost1": "ATK%"
      },
      "substats": [
        "Crit Rate",
        "Crit DMG",
        "Basic Attack DMG",
        "ATK%",
        "Energy Regen"
      ]
    }
  },
  {
    "id": "jianxin",
    "name": "Jianxin",
    "element": "Aero",
    "weaponType": "Gauntlets",
    "rarity": 5,
    "roles": [
      "sustain",
      "buffer",
      "sub-dps"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "liberation-buff",
      "healing",
      "shield"
    ],
    "stats": {
      "hp": 14112,
      "atk": 337,
      "def": 1124
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "abyss-surges"
      ],
      "echoSets": [
        "moonlit-clouds",
        "rejuvenating-glow"
      ],
      "mainStats": {
        "cost4": "Crit Rate / ATK%",
        "cost3": "Energy Regen / Aero DMG",
        "cost1": "ATK%"
      },
      "substats": [
        "Energy Regen",
        "ATK%",
        "Crit Rate",
        "Crit DMG"
      ]
    }
  },
  {
    "id": "jinhsi",
    "name": "Jinhsi",
    "element": "Spectro",
    "weaponType": "Broadblade",
    "rarity": 5,
    "roles": [
      "main-dps"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "spectro-dmg",
      "skill-dmg"
    ],
    "stats": {
      "hp": 10825,
      "atk": 412,
      "def": 1258
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "ages-of-harvest",
        "lustrous-razor"
      ],
      "echoSets": [
        "celestial-light"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Spectro DMG + ATK%",
        "cost1": "ATK%"
      },
      "substats": [
        "Crit Rate",
        "Crit DMG",
        "Resonance Skill DMG",
        "ATK%",
        "Energy Regen"
      ]
    }
  },
  {
    "id": "jiyan",
    "name": "Jiyan",
    "element": "Aero",
    "weaponType": "Broadblade",
    "rarity": 5,
    "roles": [
      "main-dps"
    ],
    "rotationType": "sustained",
    "synergyTags": [
      "aero-dmg",
      "heavy-attack"
    ],
    "stats": {
      "hp": 10488,
      "atk": 438,
      "def": 1186
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "verdant-summit",
        "lustrous-razor"
      ],
      "echoSets": [
        "sierra-gale"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Aero DMG",
        "cost1": "ATK%"
      },
      "substats": [
        "Crit Rate",
        "Crit DMG",
        "Energy Regen",
        "ATK%",
        "Heavy Attack DMG"
      ]
    }
  },
  {
    "id": "mortefi",
    "name": "Mortefi",
    "element": "Fusion",
    "weaponType": "Pistols",
    "rarity": 4,
    "roles": [
      "sub-dps",
      "buffer"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "heavy-attack-buff",
      "coordinated-attack",
      "atk-buff"
    ],
    "stats": {
      "hp": 10025,
      "atk": 250,
      "def": 1136
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "static-mist"
      ],
      "echoSets": [
        "empyrean-anthem",
        "moonlit-clouds"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Fusion DMG / Energy Regen",
        "cost1": "ATK%"
      },
      "substats": [
        "Energy Regen",
        "Crit Rate",
        "Crit DMG",
        "Resonance Liberation DMG",
        "ATK%"
      ]
    }
  },
  {
    "id": "rover-havoc",
    "name": "Rover (Havoc)",
    "element": "Havoc",
    "weaponType": "Sword",
    "rarity": 5,
    "roles": [
      "main-dps",
      "sub-dps"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "havoc-dmg",
      "liberation-dmg"
    ],
    "stats": {
      "hp": 10825,
      "atk": 412,
      "def": 1258
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "emerald-of-genesis",
        "blazing-brilliance"
      ],
      "echoSets": [
        "havoc-eclipse"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Havoc DMG",
        "cost1": "ATK%"
      },
      "substats": [
        "Crit Rate",
        "Crit DMG",
        "ATK%",
        "Resonance Liberation DMG",
        "Basic Attack DMG"
      ]
    }
  },
  {
    "id": "sanhua",
    "name": "Sanhua",
    "element": "Glacio",
    "weaponType": "Sword",
    "rarity": 4,
    "roles": [
      "sub-dps",
      "buffer"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "basic-attack-buff",
      "atk-buff"
    ],
    "stats": {
      "hp": 10062,
      "atk": 275,
      "def": 937
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "emerald-of-genesis",
        "overture"
      ],
      "echoSets": [
        "moonlit-clouds"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Glacio DMG / Energy Regen",
        "cost1": "ATK%"
      },
      "substats": [
        "Energy Regen",
        "Crit Rate",
        "Crit DMG",
        "ATK%",
        "Resonance Liberation DMG"
      ]
    }
  },
  {
    "id": "shorekeeper",
    "name": "Shorekeeper",
    "element": "Spectro",
    "weaponType": "Rectifier",
    "rarity": 5,
    "roles": [
      "sustain",
      "buffer"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "universal-buffer",
      "healing",
      "crit-buff",
      "atk-buff"
    ],
    "stats": {
      "hp": 16712,
      "atk": 287,
      "def": 1099
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "stellar-symphony",
        "variation"
      ],
      "echoSets": [
        "rejuvenating-glow"
      ],
      "mainStats": {
        "cost4": "Healing Bonus / HP%",
        "cost3": "Energy Regen",
        "cost1": "HP%"
      },
      "substats": [
        "Energy Regen (250% target)",
        "HP%",
        "Crit DMG",
        "Flat HP"
      ]
    }
  },
  {
    "id": "verina",
    "name": "Verina",
    "element": "Spectro",
    "weaponType": "Rectifier",
    "rarity": 5,
    "roles": [
      "sustain",
      "buffer"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "universal-buffer",
      "healing",
      "atk-buff",
      "coordinated-attack"
    ],
    "stats": {
      "hp": 14237,
      "atk": 337,
      "def": 1099
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "variation",
        "cosmic-ripples"
      ],
      "echoSets": [
        "rejuvenating-glow"
      ],
      "mainStats": {
        "cost4": "Healing Bonus / ATK%",
        "cost3": "Energy Regen",
        "cost1": "ATK%"
      },
      "substats": [
        "Energy Regen",
        "ATK%",
        "Flat ATK",
        "HP%"
      ]
    }
  },
  {
    "id": "xiangli-yao",
    "name": "Xiangli Yao",
    "element": "Electro",
    "weaponType": "Gauntlets",
    "rarity": 5,
    "roles": [
      "main-dps"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "electro-dmg",
      "liberation-dmg"
    ],
    "stats": {
      "hp": 10625,
      "atk": 425,
      "def": 1222
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "veritys-handle",
        "abyss-surges"
      ],
      "echoSets": [
        "void-thunder"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Electro DMG",
        "cost1": "ATK%"
      },
      "substats": [
        "Crit Rate",
        "Crit DMG",
        "Resonance Liberation DMG",
        "ATK%",
        "Energy Regen"
      ]
    }
  },
  {
    "id": "yinlin",
    "name": "Yinlin",
    "element": "Electro",
    "weaponType": "Rectifier",
    "rarity": 5,
    "roles": [
      "sub-dps",
      "buffer"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "electro-buff",
      "liberation-buff",
      "coordinated-attack"
    ],
    "stats": {
      "hp": 11000,
      "atk": 400,
      "def": 1283
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "stringmaster",
        "cosmic-ripples"
      ],
      "echoSets": [
        "empyrean-anthem",
        "void-thunder"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Electro DMG",
        "cost1": "ATK%"
      },
      "substats": [
        "Crit Rate",
        "Crit DMG",
        "Energy Regen",
        "Resonance Skill DMG",
        "ATK%"
      ]
    }
  },
  {
    "id": "zhezhi",
    "name": "Zhezhi",
    "element": "Glacio",
    "weaponType": "Rectifier",
    "rarity": 5,
    "roles": [
      "sub-dps",
      "buffer"
    ],
    "rotationType": "quickswap",
    "synergyTags": [
      "glacio-buff",
      "skill-buff",
      "coordinated-attack"
    ],
    "stats": {
      "hp": 12250,
      "atk": 375,
      "def": 1197
    },
    "dataComplete": true,
    "build": {
      "weapons": [
        "rime-draped-sprouts",
        "stringmaster",
        "cosmic-ripples"
      ],
      "echoSets": [
        "empyrean-anthem",
        "moonlit-clouds"
      ],
      "mainStats": {
        "cost4": "Crit Rate / Crit DMG",
        "cost3": "Glacio DMG",
        "cost1": "ATK%"
      },
      "substats": [
        "Crit Rate",
        "Crit DMG",
        "Energy Regen",
        "Basic Attack DMG",
        "ATK%"
      ]
    }
  }
];

for (const c of batch1) {
  const dir = path.join("wuwa", "characters", c.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "data.json"), JSON.stringify(c, null, 2) + "\n", "utf8");
}
console.log("Seeded Batch 1 (" + batch1.length + " characters)");
