import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const DATA = {
  echoes: [
    { id: 'sierra-gale', name: 'Sierra Gale', twoPiece: 'Aero DMG +10%', fivePiece: 'Aero DMG +30% for 15s upon using Intro Skill.' },
    { id: 'freezing-frost', name: 'Freezing Frost', twoPiece: 'Glacio DMG +10%', fivePiece: 'Glacio DMG +10% after releasing Basic Attack or Heavy Attack, stacking up to 3 times for 15s.' },
    { id: 'molten-rift', name: 'Molten Rift', twoPiece: 'Fusion DMG +10%', fivePiece: 'Fusion DMG +30% for 15s after releasing Resonance Skill.' },
    { id: 'void-thunder', name: 'Void Thunder', twoPiece: 'Electro DMG +10%', fivePiece: 'Electro DMG +15% after releasing Heavy Attack or Resonance Skill, stacking up to 2 times for 15s.' },
    { id: 'celestial-light', name: 'Celestial Light', twoPiece: 'Spectro DMG +10%', fivePiece: 'Spectro DMG +30% for 15s after releasing Intro Skill.' },
    { id: 'havoc-eclipse', name: 'Havoc Eclipse', twoPiece: 'Havoc DMG +10%', fivePiece: 'Havoc DMG +7.5% after releasing Basic Attack or Heavy Attack, stacking up to 4 times for 15s.' },
    { id: 'rejuvenating-glow', name: 'Rejuvenating Glow', twoPiece: 'Healing Bonus +10%', fivePiece: 'Increases the ATK of all party members by 15% for 30s upon healing allies.' },
    { id: 'moonlit-clouds', name: 'Moonlit Clouds', twoPiece: 'Energy Regen +10%', fivePiece: 'After using Outro Skill, increases the ATK of the next Resonator by 22.5% for 15s.' },
    { id: 'lingering-tunes', name: 'Lingering Tunes', twoPiece: 'ATK +10%', fivePiece: 'While on the field, ATK increases by 5% every 1.5s, up to 4 stacks. Outro Skill DMG increases by 60%.' },
    { id: 'frosty-resolve', name: 'Frosty Resolve', twoPiece: 'Resonance Skill DMG +12%', fivePiece: 'Casting Resonance Skill grants 22.5% Glacio DMG Bonus for 15s; casting Resonance Liberation increases Skill DMG by 18%, stacking up to 2 times.' },
    { id: 'empyrean-anthem', name: 'Empyrean Anthem', twoPiece: 'Energy Regen +10%', fivePiece: 'Increases Coordinated Attack DMG by 80%. Upon a critical hit of Coordinated Attack, increases active Resonator ATK by 20% for 4s.' },
    { id: 'tidebreaking-courage', name: 'Tidebreaking Courage', twoPiece: 'Energy Regen +10%', fivePiece: 'Increases ATK by 15%. Reaching 250% Energy Regen increases all Attribute DMG by 30%.' }
  ],

  bosses: [
    { id: 'feilian-beringal', name: 'Feilian Beringal', element: 'Aero', cost: 4, echoSetId: 'sierra-gale', location: 'Giant Banyan, Dim Forest' },
    { id: 'lampylumen-myriad', name: 'Lampylumen Myriad', element: 'Glacio', cost: 4, echoSetId: 'freezing-frost', location: "Tiger's Maw Mine" },
    { id: 'inferno-rider', name: 'Inferno Rider', element: 'Fusion', cost: 4, echoSetId: 'molten-rift', location: 'Sea of Flames, Port City of Guixu' },
    { id: 'tempest-mephis', name: 'Tempest Mephis', element: 'Electro', cost: 4, echoSetId: 'void-thunder', location: 'Central Plains' },
    { id: 'thundering-mephis', name: 'Thundering Mephis', element: 'Electro', cost: 4, echoSetId: 'void-thunder', location: 'Desorock Highland' },
    { id: 'mourning-aix', name: 'Mourning Aix', element: 'Spectro', cost: 4, echoSetId: 'celestial-light', location: "Fallen Grave, Whining Aix's Mire" },
    { id: 'crownless', name: 'Crownless', element: 'Havoc', cost: 4, echoSetId: 'havoc-eclipse', location: 'Gorges of Spirits' },
    { id: 'dreamless', name: 'Dreamless', element: 'Havoc', cost: 4, echoSetId: 'havoc-eclipse', location: 'Norfall Barrens (Weekly)' },
    { id: 'bell-borne-geochelone', name: 'Bell-Borne Geochelone', element: 'Glacio', cost: 4, echoSetId: 'rejuvenating-glow', location: 'Tolling Stream, Gorges of Spirits' },
    { id: 'impermanence-heron', name: 'Impermanence Heron', element: 'Havoc', cost: 4, echoSetId: 'moonlit-clouds', location: 'Distribution Center, Desorock Highland' },
    { id: 'mech-abomination', name: 'Mech Abomination', element: 'Electro', cost: 4, echoSetId: 'lingering-tunes', location: "Court of Savantae Ruins, Whining Aix's Mire" },
    { id: 'jue', name: 'Jué', element: 'Spectro', cost: 4, echoSetId: 'celestial-light', location: 'Mt. Firmament (Weekly)' },
    { id: 'fallacy-of-no-return', name: 'Fallacy of No Return', element: 'Spectro', cost: 4, echoSetId: 'rejuvenating-glow', location: "Tethys' Deep, The Black Shores" },
    { id: 'sentry-construct', name: 'Sentry Construct', element: 'Glacio', cost: 4, echoSetId: 'frosty-resolve', location: 'Averardo Vault, Rinascita' },
    { id: 'hecate', name: 'Hecate', element: 'Havoc', cost: 4, echoSetId: 'empyrean-anthem', location: 'Rinascita (Weekly)' }
  ],

  weapons: [
    { id: 'verdant-summit', name: 'Verdant Summit', weaponType: 'Broadblade', rarity: 5, baseAtk: 587, subStat: 'Crit DMG', subStatValue: '48.6%', passive: 'Increases Attribute DMG Bonus by 12%. Casting Intro Skill or Resonance Liberation increases Heavy Attack DMG Bonus by 24%, stacking up to 2 times.' },
    { id: 'ages-of-harvest', name: 'Ages of Harvest', weaponType: 'Broadblade', rarity: 5, baseAtk: 587, subStat: 'Crit Rate', subStatValue: '24.3%', passive: 'Grants 12% Attribute DMG Bonus. Casting Intro Skill or Resonance Skill boosts Resonance Skill DMG up to 48%.' },
    { id: 'lustrous-razor', name: 'Lustrous Razor', weaponType: 'Broadblade', rarity: 5, baseAtk: 587, subStat: 'ATK', subStatValue: '36.4%', passive: 'Increases Energy Regen by 12.8%. Casting Resonance Skill increases Resonance Liberation DMG Bonus by 7%, stacking up to 3 times.' },
    { id: 'blazing-brilliance', name: 'Blazing Brilliance', weaponType: 'Sword', rarity: 5, baseAtk: 587, subStat: 'Crit DMG', subStatValue: '48.6%', passive: 'Increases ATK by 12%. Dealing damage grants stacks that increase Resonance Skill DMG by up to 56%.' },
    { id: 'red-spring', name: 'Red Spring', weaponType: 'Sword', rarity: 5, baseAtk: 587, subStat: 'Crit Rate', subStatValue: '24.3%', passive: 'Increases ATK by 12%. Dealing Basic Attack DMG increases Basic Attack DMG Bonus by up to 50%.' },
    { id: 'emerald-of-genesis', name: 'Emerald of Genesis', weaponType: 'Sword', rarity: 5, baseAtk: 587, subStat: 'Crit Rate', subStatValue: '24.3%', passive: 'Increases Energy Regen by 12.8%. Casting Resonance Skill increases ATK by 6%, stacking up to 2 times.' },
    { id: 'stringmaster', name: 'Stringmaster', weaponType: 'Rectifier', rarity: 5, baseAtk: 500, subStat: 'Crit Rate', subStatValue: '36.0%', passive: 'Increases All-Attribute DMG Bonus by 12%. Dealing Resonance Skill DMG increases ATK by 12%, stacking up to 2 times, doubled when off-field.' },
    { id: 'stellar-symphony', name: 'Stellar Symphony', weaponType: 'Rectifier', rarity: 5, baseAtk: 412, subStat: 'Energy Regen', subStatValue: '77.0%', passive: 'Increases HP by 12%. Restores Concerto Energy when casting Resonance Liberation and increases all nearby allies ATK by 14% when healing.' },
    { id: 'rime-draped-sprouts', name: 'Rime-Draped Sprouts', weaponType: 'Rectifier', rarity: 5, baseAtk: 500, subStat: 'Crit DMG', subStatValue: '72.0%', passive: 'Increases ATK by 12%. Casting Resonance Skill increases Basic Attack DMG Bonus by 12% up to 3 stacks, persisting off-field.' },
    { id: 'cosmic-ripples', name: 'Cosmic Ripples', weaponType: 'Rectifier', rarity: 5, baseAtk: 500, subStat: 'ATK', subStatValue: '54.0%', passive: 'Increases Energy Regen by 12.8%. Dealing Basic Attack DMG increases Basic Attack DMG Bonus by 3.2%, stacking up to 5 times.' },
    { id: 'veritys-handle', name: "Verity's Handle", weaponType: 'Gauntlets', rarity: 5, baseAtk: 587, subStat: 'Crit Rate', subStatValue: '24.3%', passive: 'Increases All-Attribute DMG Bonus by 12%. Casting Resonance Liberation increases Resonance Liberation DMG Bonus by 48% for 8s.' },
    { id: 'abyss-surges', name: 'Abyss Surges', weaponType: 'Gauntlets', rarity: 5, baseAtk: 587, subStat: 'ATK', subStatValue: '36.4%', passive: 'Increases Energy Regen by 12.8%. Hitting with Resonance Skill increases Basic Attack DMG by 10% and vice versa.' },
    { id: 'the-last-dance', name: 'The Last Dance', weaponType: 'Pistols', rarity: 5, baseAtk: 500, subStat: 'Crit DMG', subStatValue: '72.0%', passive: 'Increases ATK by 12%. Casting Intro Skill or Resonance Liberation increases Resonance Skill DMG Bonus by 48% for 5s.' },
    { id: 'static-mist', name: 'Static Mist', weaponType: 'Pistols', rarity: 5, baseAtk: 587, subStat: 'Crit Rate', subStatValue: '24.3%', passive: 'Increases Energy Regen by 12.8%. Casting Outro Skill increases the incoming Resonator ATK by 10%, stacking once.' },
    { id: 'variation', name: 'Variation', weaponType: 'Rectifier', rarity: 4, baseAtk: 337, subStat: 'Energy Regen', subStatValue: '51.8%', passive: 'When Resonance Skill is cast, restores 8 Concerto Energy. Can be triggered once every 20s.' },
    { id: 'overture', name: 'Overture', weaponType: 'Sword', rarity: 4, baseAtk: 337, subStat: 'Energy Regen', subStatValue: '51.8%', passive: 'When Resonance Skill is cast, restores 8 Concerto Energy. Can be triggered once every 20s.' }
  ],

  characters: [
    {
      id: 'jiyan',
      name: 'Jiyan',
      element: 'Aero',
      weaponType: 'Broadblade',
      rarity: 5,
      roles: ['main-dps'],
      rotationType: 'sustained',
      synergyTags: ['aero-dmg', 'heavy-attack'],
      stats: { hp: 10488, atk: 438, def: 1186 },
      dataComplete: true,
      build: {
        weapons: ['verdant-summit', 'lustrous-razor'],
        echoSets: ['sierra-gale'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Aero DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Energy Regen', 'ATK%', 'Heavy Attack DMG']
      }
    },
    {
      id: 'jinhsi',
      name: 'Jinhsi',
      element: 'Spectro',
      weaponType: 'Broadblade',
      rarity: 5,
      roles: ['main-dps'],
      rotationType: 'quickswap',
      synergyTags: ['spectro-dmg', 'skill-dmg'],
      stats: { hp: 10825, atk: 412, def: 1258 },
      dataComplete: true,
      build: {
        weapons: ['ages-of-harvest', 'lustrous-razor'],
        echoSets: ['celestial-light'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Spectro DMG + ATK%', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Resonance Skill DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'camellya',
      name: 'Camellya',
      element: 'Havoc',
      weaponType: 'Sword',
      rarity: 5,
      roles: ['main-dps'],
      rotationType: 'sustained',
      synergyTags: ['havoc-dmg', 'basic-attack'],
      stats: { hp: 10325, atk: 450, def: 1161 },
      dataComplete: true,
      build: {
        weapons: ['red-spring', 'emerald-of-genesis'],
        echoSets: ['havoc-eclipse'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Havoc DMG + ATK%', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Basic Attack DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'changli',
      name: 'Changli',
      element: 'Fusion',
      weaponType: 'Sword',
      rarity: 5,
      roles: ['main-dps', 'sub-dps'],
      rotationType: 'quickswap',
      synergyTags: ['fusion-dmg', 'fusion-buff', 'liberation-buff', 'skill-dmg'],
      stats: { hp: 10387, atk: 462, def: 1099 },
      dataComplete: true,
      build: {
        weapons: ['blazing-brilliance', 'emerald-of-genesis'],
        echoSets: ['molten-rift'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Fusion DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Energy Regen', 'Resonance Skill DMG', 'ATK%']
      }
    },
    {
      id: 'carlotta',
      name: 'Carlotta',
      element: 'Glacio',
      weaponType: 'Pistols',
      rarity: 5,
      roles: ['main-dps'],
      rotationType: 'quickswap',
      synergyTags: ['glacio-dmg', 'skill-dmg'],
      stats: { hp: 12450, atk: 462, def: 1197 },
      dataComplete: true,
      build: {
        weapons: ['the-last-dance', 'static-mist'],
        echoSets: ['frosty-resolve'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Glacio DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Resonance Skill DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'xiangli-yao',
      name: 'Xiangli Yao',
      element: 'Electro',
      weaponType: 'Gauntlets',
      rarity: 5,
      roles: ['main-dps'],
      rotationType: 'quickswap',
      synergyTags: ['electro-dmg', 'liberation-dmg'],
      stats: { hp: 10625, atk: 425, def: 1222 },
      dataComplete: true,
      build: {
        weapons: ['veritys-handle', 'abyss-surges'],
        echoSets: ['void-thunder'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Electro DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Resonance Liberation DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'shorekeeper',
      name: 'Shorekeeper',
      element: 'Spectro',
      weaponType: 'Rectifier',
      rarity: 5,
      roles: ['sustain', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['universal-buffer', 'healing', 'crit-buff', 'atk-buff'],
      stats: { hp: 16712, atk: 287, def: 1099 },
      dataComplete: true,
      build: {
        weapons: ['stellar-symphony', 'variation'],
        echoSets: ['rejuvenating-glow'],
        mainStats: { cost4: 'Healing Bonus / HP%', cost3: 'Energy Regen', cost1: 'HP%' },
        substats: ['Energy Regen (250% target)', 'HP%', 'Crit DMG', 'Flat HP']
      }
    },
    {
      id: 'verina',
      name: 'Verina',
      element: 'Spectro',
      weaponType: 'Rectifier',
      rarity: 5,
      roles: ['sustain', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['universal-buffer', 'healing', 'atk-buff', 'coordinated-attack'],
      stats: { hp: 14237, atk: 337, def: 1099 },
      dataComplete: true,
      build: {
        weapons: ['variation', 'cosmic-ripples'],
        echoSets: ['rejuvenating-glow'],
        mainStats: { cost4: 'Healing Bonus / ATK%', cost3: 'Energy Regen', cost1: 'ATK%' },
        substats: ['Energy Regen', 'ATK%', 'Flat ATK', 'HP%']
      }
    },
    {
      id: 'zhezhi',
      name: 'Zhezhi',
      element: 'Glacio',
      weaponType: 'Rectifier',
      rarity: 5,
      roles: ['sub-dps', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['glacio-buff', 'skill-buff', 'coordinated-attack'],
      stats: { hp: 12250, atk: 375, def: 1197 },
      dataComplete: true,
      build: {
        weapons: ['rime-draped-sprouts', 'stringmaster', 'cosmic-ripples'],
        echoSets: ['empyrean-anthem', 'moonlit-clouds'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Glacio DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Energy Regen', 'Basic Attack DMG', 'ATK%']
      }
    },
    {
      id: 'yinlin',
      name: 'Yinlin',
      element: 'Electro',
      weaponType: 'Rectifier',
      rarity: 5,
      roles: ['sub-dps', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['electro-buff', 'liberation-buff', 'coordinated-attack'],
      stats: { hp: 11000, atk: 400, def: 1283 },
      dataComplete: true,
      build: {
        weapons: ['stringmaster', 'cosmic-ripples'],
        echoSets: ['empyrean-anthem', 'void-thunder'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Electro DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Energy Regen', 'Resonance Skill DMG', 'ATK%']
      }
    },
    {
      id: 'sanhua',
      name: 'Sanhua',
      element: 'Glacio',
      weaponType: 'Sword',
      rarity: 4,
      roles: ['sub-dps', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['basic-attack-buff', 'atk-buff'],
      stats: { hp: 10062, atk: 275, def: 937 },
      dataComplete: true,
      build: {
        weapons: ['emerald-of-genesis', 'overture'],
        echoSets: ['moonlit-clouds'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Glacio DMG / Energy Regen', cost1: 'ATK%' },
        substats: ['Energy Regen', 'Crit Rate', 'Crit DMG', 'ATK%', 'Resonance Liberation DMG']
      }
    },
    {
      id: 'mortefi',
      name: 'Mortefi',
      element: 'Fusion',
      weaponType: 'Pistols',
      rarity: 4,
      roles: ['sub-dps', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['heavy-attack-buff', 'coordinated-attack', 'atk-buff'],
      stats: { hp: 10025, atk: 250, def: 1136 },
      dataComplete: true,
      build: {
        weapons: ['static-mist'],
        echoSets: ['empyrean-anthem', 'moonlit-clouds'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Fusion DMG / Energy Regen', cost1: 'ATK%' },
        substats: ['Energy Regen', 'Crit Rate', 'Crit DMG', 'Resonance Liberation DMG', 'ATK%']
      }
    },
    {
      id: 'rover-havoc',
      name: 'Rover (Havoc)',
      element: 'Havoc',
      weaponType: 'Sword',
      rarity: 5,
      roles: ['main-dps', 'sub-dps'],
      rotationType: 'quickswap',
      synergyTags: ['havoc-dmg', 'liberation-dmg'],
      stats: { hp: 10825, atk: 412, def: 1258 },
      dataComplete: true,
      build: {
        weapons: ['emerald-of-genesis', 'blazing-brilliance'],
        echoSets: ['havoc-eclipse'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Havoc DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'ATK%', 'Resonance Liberation DMG', 'Basic Attack DMG']
      }
    },
    {
      id: 'encore',
      name: 'Encore',
      element: 'Fusion',
      weaponType: 'Rectifier',
      rarity: 5,
      roles: ['main-dps'],
      rotationType: 'sustained',
      synergyTags: ['fusion-dmg', 'basic-attack'],
      stats: { hp: 10512, atk: 425, def: 1246 },
      dataComplete: true,
      build: {
        weapons: ['stringmaster', 'cosmic-ripples'],
        echoSets: ['molten-rift'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Fusion DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Basic Attack DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'jianxin',
      name: 'Jianxin',
      element: 'Aero',
      weaponType: 'Gauntlets',
      rarity: 5,
      roles: ['sustain', 'buffer', 'sub-dps'],
      rotationType: 'quickswap',
      synergyTags: ['liberation-buff', 'healing', 'shield'],
      stats: { hp: 14112, atk: 337, def: 1124 },
      dataComplete: true,
      build: {
        weapons: ['abyss-surges'],
        echoSets: ['moonlit-clouds', 'rejuvenating-glow'],
        mainStats: { cost4: 'Crit Rate / ATK%', cost3: 'Energy Regen / Aero DMG', cost1: 'ATK%' },
        substats: ['Energy Regen', 'ATK%', 'Crit Rate', 'Crit DMG']
      }
    }
  ]
};

for (const [category, items] of Object.entries(DATA)) {
  for (const item of items) {
    const dir = path.join(ROOT, 'wuwa', category, item.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify(item, null, 2) + '\n', 'utf8');
  }
  console.log(`Created ${items.length} ${category} folders.`);
}