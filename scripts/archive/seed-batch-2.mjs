import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const DATA = {
  echoes: [
    { id: 'midnight-veil', name: 'Midnight Veil', twoPiece: 'Havoc DMG +10%', fivePiece: 'Triggering Outro Skill deals 480% Havoc DMG to nearby enemies and grants the incoming Resonator 15% Havoc DMG Bonus for 15s.' },
    { id: 'eternal-radiance', name: 'Eternal Radiance', twoPiece: 'Spectro DMG +10%', fivePiece: 'Inflicting Spectro Frazzle increases Crit Rate by 20% for 15s; attacking enemies with 10 stacks grants 15% Spectro DMG Bonus for 15s.' },
    { id: 'gusts-of-welkin', name: 'Gusts of Welkin', twoPiece: 'Aero DMG +10%', fivePiece: 'Inflicting Aero Erosion increases Aero DMG of all party members by 15% and the wearer by an additional 15% for 20s.' },
    { id: 'flaming-clawprint', name: 'Flaming Clawprint', twoPiece: 'Fusion DMG +10%', fivePiece: 'Casting Resonance Liberation increases Fusion DMG of all party members by 15% and the wearer Resonance Liberation DMG by 20% for 35s.' },
    { id: 'crown-of-valor', name: 'Crown of Valor', twoPiece: 'ATK +10%', fivePiece: 'Gaining a Shield increases ATK by 6% and Crit DMG by 4% for 4s, stacking up to 5 times.' },
    { id: 'law-of-harmony', name: 'Law of Harmony', twoPiece: 'Heavy Attack DMG +12%', fivePiece: 'Casting Echo Skill grants 30% Heavy Attack DMG Bonus to the wearer and 4% Echo Skill DMG Bonus to the team, stacking up to 4 times.' }
  ],

  bosses: [
    { id: 'lorelei', name: 'Lorelei', element: 'Havoc', cost: 4, echoSetId: 'midnight-veil', location: 'Atrium of Reflections, Whisperwind Haven' },
    { id: 'dragon-of-dirge', name: 'Dragon of Dirge', element: 'Fusion', cost: 4, echoSetId: 'tidebreaking-courage', location: 'Penitent End, Rinascita' },
    { id: 'nightmare-mourning-aix', name: 'Nightmare: Mourning Aix', element: 'Spectro', cost: 4, echoSetId: 'eternal-radiance', location: 'Penitent End, Rinascita' },
    { id: 'nightmare-tempest-mephis', name: 'Nightmare: Tempest Mephis', element: 'Electro', cost: 4, echoSetId: 'void-thunder', location: 'Thessaleo Fells, Rinascita' },
    { id: 'nightmare-thundering-mephis', name: 'Nightmare: Thundering Mephis', element: 'Electro', cost: 4, echoSetId: 'void-thunder', location: 'Whisperwind Haven, Rinascita' },
    { id: 'nightmare-feilian-beringal', name: 'Nightmare: Feilian Beringal', element: 'Aero', cost: 4, echoSetId: 'sierra-gale', location: 'Hallowed Reach, Rinascita' },
    { id: 'nightmare-inferno-rider', name: 'Nightmare: Inferno Rider', element: 'Fusion', cost: 4, echoSetId: 'molten-rift', location: 'Nimbus Sanctum, Rinascita' },
    { id: 'nightmare-crownless', name: 'Nightmare: Crownless', element: 'Havoc', cost: 4, echoSetId: 'havoc-eclipse', location: 'Thessaleo Fells, Rinascita' },
    { id: 'nightmare-impermanence-heron', name: 'Nightmare: Impermanence Heron', element: 'Havoc', cost: 4, echoSetId: 'midnight-veil', location: 'Nimbus Sanctum, Rinascita' },
    { id: 'fleur-de-lis', name: 'Fleurdelys', element: 'Aero', cost: 4, echoSetId: 'gusts-of-welkin', location: 'Avinoleum, Rinascita (Weekly)' },
    { id: 'kelpie', name: 'Kelpie', element: 'Aero', cost: 4, echoSetId: 'gusts-of-welkin', location: 'Septimont, Rinascita' },
    { id: 'lioness-of-glory', name: 'Lioness of Glory', element: 'Fusion', cost: 4, echoSetId: 'flaming-clawprint', location: 'Septimont, Rinascita' },
    { id: 'fenrico', name: 'Fenrico', element: 'Havoc', cost: 4, echoSetId: 'midnight-veil', location: 'Fabricatorium of the Deep (Weekly)' }
  ],

  weapons: [
    { id: 'tragicomedy', name: 'Tragicomedy', weaponType: 'Gauntlets', rarity: 5, baseAtk: 587, subStat: 'Crit Rate', subStatValue: '24.3%', passive: 'Increases ATK by 12%. Casting Basic Attack or Intro Skill increases Heavy Attack DMG Bonus by 48% for 3s.' },
    { id: 'unflickering-valor', name: 'Unflickering Valor', weaponType: 'Sword', rarity: 5, baseAtk: 412, subStat: 'Energy Regen', subStatValue: '77.0%', passive: 'Increases Crit Rate by 8%. Casting Resonance Liberation increases Basic Attack DMG Bonus by 24% for 10s.' },
    { id: 'luminous-hymn', name: 'Luminous Hymn', weaponType: 'Rectifier', rarity: 5, baseAtk: 500, subStat: 'Crit Rate', subStatValue: '36.0%', passive: 'Increases ATK by 12%. Dealing Basic or Heavy Attack DMG to enemies with Spectro Frazzle boosts DMG and Outro Amplification.' },
    { id: 'blazing-justice', name: 'Blazing Justice', weaponType: 'Gauntlets', rarity: 5, baseAtk: 587, subStat: 'Crit DMG', subStatValue: '48.6%', passive: 'Increases ATK by 12%. Casting Basic Attack ignores 8% DEF and amplifies Spectro Frazzle DMG by 50%.' },
    { id: 'woodland-aria', name: 'Woodland Aria', weaponType: 'Pistols', rarity: 5, baseAtk: 500, subStat: 'Crit Rate', subStatValue: '36.0%', passive: 'Increases ATK by 12%. Inflicting Aero Erosion grants 24% Aero DMG Bonus and reduces enemy Aero RES by 10%.' },
    { id: 'defiers-thorn', name: "Defier's Thorn", weaponType: 'Sword', rarity: 5, baseAtk: 412, subStat: 'HP', subStatValue: '72.2%', passive: 'Increases Max HP by 12%. Casting Intro Skill or Resonance Skill ignores 8% DEF and amplifies Aero Erosion DMG.' },
    { id: 'wildfire-mark', name: 'Wildfire Mark', weaponType: 'Broadblade', rarity: 5, baseAtk: 587, subStat: 'Crit DMG', subStatValue: '48.6%', passive: 'Increases ATK by 12%. Casting Intro Skill or Resonance Liberation increases Resonance Liberation DMG by 24% and team Fusion DMG by 24%.' },
    { id: 'lethean-elegy', name: 'Lethean Elegy', weaponType: 'Rectifier', rarity: 5, baseAtk: 587, subStat: 'Crit Rate', subStatValue: '24.3%', passive: 'Increases ATK by 12%. Dealing Echo Skill DMG increases Resonance Skill DMG by 32% and Echo Skill DMG by 32%, ignoring 8% DEF.' },
    { id: 'bloodpacts-pledge', name: "Bloodpact's Pledge", weaponType: 'Sword', rarity: 5, baseAtk: 587, subStat: 'Energy Regen', subStatValue: '38.8%', passive: 'Providing Healing increases Resonance Skill DMG by 10% and amplifies team Aero DMG by 10%.' },
    { id: 'commando-of-conviction', name: 'Commando of Conviction', weaponType: 'Sword', rarity: 4, baseAtk: 412, subStat: 'ATK', subStatValue: '30.3%', passive: 'When Intro Skill is cast, increases ATK by 15% for 15s.' },
    { id: 'autumntrace', name: 'Autumntrace', weaponType: 'Broadblade', rarity: 4, baseAtk: 412, subStat: 'Crit Rate', subStatValue: '20.2%', passive: 'Increases ATK by 4% upon dealing Basic or Heavy Attack DMG, stacking up to 5 times for 7s.' },
    { id: 'discord', name: 'Discord', weaponType: 'Broadblade', rarity: 4, baseAtk: 337, subStat: 'Energy Regen', subStatValue: '51.8%', passive: 'When Resonance Skill is cast, restores 8 Concerto Energy. Can be triggered once every 20s.' },
    { id: 'cadenza', name: 'Cadenza', weaponType: 'Pistols', rarity: 4, baseAtk: 337, subStat: 'Energy Regen', subStatValue: '51.8%', passive: 'When Resonance Skill is cast, restores 8 Concerto Energy. Can be triggered once every 20s.' },
    { id: 'novaburst', name: 'Novaburst', weaponType: 'Pistols', rarity: 4, baseAtk: 412, subStat: 'ATK', subStatValue: '30.3%', passive: 'When the Resonator dashes or dodges, increases ATK by 4%, stacking up to 3 times for 8s.' },
    { id: 'marcato', name: 'Marcato', weaponType: 'Gauntlets', rarity: 4, baseAtk: 337, subStat: 'Energy Regen', subStatValue: '51.8%', passive: 'When Resonance Skill is cast, restores 8 Concerto Energy. Can be triggered once every 20s.' },
    { id: 'hollow-mirage', name: 'Hollow Mirage', weaponType: 'Gauntlets', rarity: 4, baseAtk: 412, subStat: 'ATK', subStatValue: '36.4%', passive: 'When Resonance Liberation is cast, grants 3 stacks of Iron Armor, each increasing ATK and DEF by 3%.' },
    { id: 'augment', name: 'Augment', weaponType: 'Rectifier', rarity: 4, baseAtk: 412, subStat: 'Crit Rate', subStatValue: '20.2%', passive: 'Casting Resonance Liberation increases the wearer ATK by 15% for 15s.' },
    { id: 'jinzhou-keeper', name: 'Jinzhou Keeper', weaponType: 'Rectifier', rarity: 4, baseAtk: 387, subStat: 'ATK', subStatValue: '36.4%', passive: 'Casting Intro Skill increases the wearer ATK by 8% and HP by 10% for 15s.' }
  ],

  characters: [
    {
      id: 'calcharo',
      name: 'Calcharo',
      element: 'Electro',
      weaponType: 'Broadblade',
      rarity: 5,
      roles: ['main-dps'],
      rotationType: 'sustained',
      synergyTags: ['electro-dmg', 'liberation-dmg'],
      stats: { hp: 10500, atk: 437, def: 1185 },
      dataComplete: true,
      build: {
        weapons: ['lustrous-razor', 'verdant-summit', 'autumntrace'],
        echoSets: ['void-thunder'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Electro DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Resonance Liberation DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'lingyang',
      name: 'Lingyang',
      element: 'Glacio',
      weaponType: 'Gauntlets',
      rarity: 5,
      roles: ['main-dps'],
      rotationType: 'sustained',
      synergyTags: ['glacio-dmg', 'basic-attack'],
      stats: { hp: 10387, atk: 437, def: 1209 },
      dataComplete: true,
      build: {
        weapons: ['veritys-handle', 'abyss-surges', 'hollow-mirage'],
        echoSets: ['freezing-frost', 'lingering-tunes'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Glacio DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Basic Attack DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'roccia',
      name: 'Roccia',
      element: 'Havoc',
      weaponType: 'Gauntlets',
      rarity: 5,
      roles: ['sub-dps', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['havoc-buff', 'basic-attack-buff', 'atk-buff'],
      stats: { hp: 12250, atk: 375, def: 1197 },
      dataComplete: true,
      build: {
        weapons: ['tragicomedy', 'veritys-handle', 'abyss-surges'],
        echoSets: ['midnight-veil', 'moonlit-clouds'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Havoc DMG', cost1: 'ATK%' },
        substats: ['Crit Rate (70%+ target)', 'Crit DMG', 'Heavy Attack DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'brant',
      name: 'Brant',
      element: 'Fusion',
      weaponType: 'Sword',
      rarity: 5,
      roles: ['sub-dps', 'sustain', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['fusion-buff', 'skill-buff', 'healing', 'shield'],
      stats: { hp: 11675, atk: 387, def: 1307 },
      dataComplete: true,
      build: {
        weapons: ['unflickering-valor', 'emerald-of-genesis', 'overture'],
        echoSets: ['tidebreaking-courage', 'molten-rift'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Energy Regen + Fusion DMG', cost1: 'ATK%' },
        substats: ['Energy Regen (250% target)', 'Crit Rate', 'Crit DMG', 'Basic Attack DMG', 'ATK%']
      }
    },
    {
      id: 'phoebe',
      name: 'Phoebe',
      element: 'Spectro',
      weaponType: 'Rectifier',
      rarity: 5,
      roles: ['main-dps', 'sub-dps'],
      rotationType: 'quickswap',
      synergyTags: ['spectro-dmg', 'spectro-buff', 'heavy-attack'],
      stats: { hp: 10825, atk: 412, def: 1258 },
      dataComplete: true,
      build: {
        weapons: ['luminous-hymn', 'stringmaster', 'cosmic-ripples'],
        echoSets: ['eternal-radiance', 'moonlit-clouds'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Spectro DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Heavy Attack DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'zani',
      name: 'Zani',
      element: 'Spectro',
      weaponType: 'Gauntlets',
      rarity: 5,
      roles: ['main-dps'],
      rotationType: 'sustained',
      synergyTags: ['spectro-dmg', 'heavy-attack'],
      stats: { hp: 10775, atk: 437, def: 1136 },
      dataComplete: true,
      build: {
        weapons: ['blazing-justice', 'veritys-handle', 'abyss-surges'],
        echoSets: ['eternal-radiance'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Spectro DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Heavy Attack DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'ciaccona',
      name: 'Ciaccona',
      element: 'Aero',
      weaponType: 'Pistols',
      rarity: 5,
      roles: ['sub-dps', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['aero-buff', 'atk-buff'],
      stats: { hp: 12237, atk: 375, def: 1197 },
      dataComplete: true,
      build: {
        weapons: ['woodland-aria', 'static-mist'],
        echoSets: ['gusts-of-welkin', 'moonlit-clouds'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Aero DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Energy Regen', 'ATK%', 'Resonance Liberation DMG']
      }
    },
    {
      id: 'cartethyia',
      name: 'Cartethyia',
      element: 'Aero',
      weaponType: 'Sword',
      rarity: 5,
      roles: ['main-dps'],
      rotationType: 'sustained',
      synergyTags: ['aero-dmg', 'basic-attack'],
      stats: { hp: 14800, atk: 312, def: 1161 },
      dataComplete: true,
      build: {
        weapons: ['defiers-thorn', 'emerald-of-genesis', 'red-spring'],
        echoSets: ['gusts-of-welkin'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Aero DMG / HP%', cost1: 'HP%' },
        substats: ['Crit Rate', 'Crit DMG', 'HP%', 'Basic Attack DMG', 'Energy Regen']
      }
    },
    {
      id: 'lupa',
      name: 'Lupa',
      element: 'Fusion',
      weaponType: 'Broadblade',
      rarity: 5,
      roles: ['main-dps', 'sub-dps'],
      rotationType: 'quickswap',
      synergyTags: ['fusion-dmg', 'fusion-buff', 'basic-attack-buff'],
      stats: { hp: 11912, atk: 387, def: 1185 },
      dataComplete: true,
      build: {
        weapons: ['wildfire-mark', 'ages-of-harvest', 'lustrous-razor'],
        echoSets: ['flaming-clawprint', 'molten-rift'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Fusion DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Resonance Liberation DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'phrolova',
      name: 'Phrolova',
      element: 'Havoc',
      weaponType: 'Rectifier',
      rarity: 5,
      roles: ['main-dps', 'sub-dps'],
      rotationType: 'quickswap',
      synergyTags: ['havoc-dmg', 'heavy-attack-buff', 'coordinated-attack'],
      stats: { hp: 10775, atk: 437, def: 1136 },
      dataComplete: true,
      build: {
        weapons: ['lethean-elegy', 'stringmaster', 'cosmic-ripples'],
        echoSets: ['midnight-veil', 'havoc-eclipse'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Havoc DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Resonance Skill DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'rover-spectro',
      name: 'Rover (Spectro)',
      element: 'Spectro',
      weaponType: 'Sword',
      rarity: 5,
      roles: ['sub-dps', 'sustain'],
      rotationType: 'quickswap',
      synergyTags: ['spectro-dmg', 'healing'],
      stats: { hp: 11400, atk: 375, def: 1368 },
      dataComplete: true,
      build: {
        weapons: ['emerald-of-genesis', 'blazing-brilliance', 'commando-of-conviction'],
        echoSets: ['eternal-radiance', 'moonlit-clouds'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Spectro DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Energy Regen', 'ATK%', 'Resonance Skill DMG']
      }
    },
    {
      id: 'rover-aero',
      name: 'Rover (Aero)',
      element: 'Aero',
      weaponType: 'Sword',
      rarity: 5,
      roles: ['sub-dps', 'sustain'],
      rotationType: 'quickswap',
      synergyTags: ['aero-buff', 'healing'],
      stats: { hp: 11675, atk: 387, def: 1209 },
      dataComplete: true,
      build: {
        weapons: ['bloodpacts-pledge', 'emerald-of-genesis', 'overture'],
        echoSets: ['rejuvenating-glow', 'gusts-of-welkin'],
        mainStats: { cost4: 'Healing Bonus / Crit Rate', cost3: 'Energy Regen / Aero DMG', cost1: 'ATK%' },
        substats: ['Energy Regen', 'ATK%', 'Crit Rate', 'Crit DMG', 'Resonance Skill DMG']
      }
    },
    {
      id: 'baizhi',
      name: 'Baizhi',
      element: 'Glacio',
      weaponType: 'Rectifier',
      rarity: 4,
      roles: ['sustain', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['universal-buffer', 'healing', 'atk-buff'],
      stats: { hp: 12812, atk: 212, def: 1002 },
      dataComplete: true,
      build: {
        weapons: ['variation', 'stellar-symphony', 'jinzhou-keeper'],
        echoSets: ['rejuvenating-glow'],
        mainStats: { cost4: 'Healing Bonus / HP%', cost3: 'Energy Regen', cost1: 'HP%' },
        substats: ['Energy Regen', 'HP%', 'Flat HP', 'DEF%']
      }
    },
    {
      id: 'chixia',
      name: 'Chixia',
      element: 'Fusion',
      weaponType: 'Pistols',
      rarity: 4,
      roles: ['main-dps'],
      rotationType: 'sustained',
      synergyTags: ['fusion-dmg', 'skill-dmg'],
      stats: { hp: 9087, atk: 300, def: 953 },
      dataComplete: true,
      build: {
        weapons: ['the-last-dance', 'static-mist', 'novaburst'],
        echoSets: ['molten-rift'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Fusion DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Resonance Skill DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'yangyang',
      name: 'Yangyang',
      element: 'Aero',
      weaponType: 'Sword',
      rarity: 4,
      roles: ['sub-dps', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['energy-buff', 'atk-buff'],
      stats: { hp: 10200, atk: 250, def: 1099 },
      dataComplete: true,
      build: {
        weapons: ['emerald-of-genesis', 'overture', 'commando-of-conviction'],
        echoSets: ['moonlit-clouds'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Aero DMG / Energy Regen', cost1: 'ATK%' },
        substats: ['Energy Regen', 'Crit Rate', 'Crit DMG', 'ATK%', 'Resonance Liberation DMG']
      }
    },
    {
      id: 'danjin',
      name: 'Danjin',
      element: 'Havoc',
      weaponType: 'Sword',
      rarity: 4,
      roles: ['main-dps', 'sub-dps'],
      rotationType: 'quickswap',
      synergyTags: ['havoc-dmg', 'havoc-buff', 'heavy-attack'],
      stats: { hp: 9437, atk: 262, def: 1148 },
      dataComplete: true,
      build: {
        weapons: ['blazing-brilliance', 'emerald-of-genesis', 'commando-of-conviction'],
        echoSets: ['havoc-eclipse'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Havoc DMG', cost1: 'ATK%' },
        substats: ['Crit Rate', 'Crit DMG', 'Heavy Attack DMG', 'ATK%', 'Energy Regen']
      }
    },
    {
      id: 'yuanwu',
      name: 'Yuanwu',
      element: 'Electro',
      weaponType: 'Gauntlets',
      rarity: 4,
      roles: ['sub-dps', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['coordinated-attack', 'def-buff'],
      stats: { hp: 8525, atk: 225, def: 1637 },
      dataComplete: true,
      build: {
        weapons: ['marcato', 'abyss-surges'],
        echoSets: ['rejuvenating-glow', 'moonlit-clouds'],
        mainStats: { cost4: 'DEF% / Healing Bonus', cost3: 'DEF% / Energy Regen', cost1: 'DEF%' },
        substats: ['DEF%', 'Energy Regen', 'Flat DEF', 'Crit Rate']
      }
    },
    {
      id: 'taoqi',
      name: 'Taoqi',
      element: 'Havoc',
      weaponType: 'Broadblade',
      rarity: 4,
      roles: ['sustain', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['skill-buff', 'shield', 'healing'],
      stats: { hp: 8950, atk: 225, def: 1564 },
      dataComplete: true,
      build: {
        weapons: ['discord', 'lustrous-razor'],
        echoSets: ['moonlit-clouds'],
        mainStats: { cost4: 'DEF% / Crit Rate', cost3: 'Energy Regen / DEF%', cost1: 'DEF%' },
        substats: ['Energy Regen', 'DEF%', 'Crit Rate', 'Crit DMG']
      }
    },
    {
      id: 'aalto',
      name: 'Aalto',
      element: 'Aero',
      weaponType: 'Pistols',
      rarity: 4,
      roles: ['sub-dps', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['aero-buff', 'atk-buff'],
      stats: { hp: 9850, atk: 262, def: 1075 },
      dataComplete: true,
      build: {
        weapons: ['static-mist', 'cadenza', 'novaburst'],
        echoSets: ['moonlit-clouds', 'sierra-gale'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Aero DMG / Energy Regen', cost1: 'ATK%' },
        substats: ['Energy Regen', 'Crit Rate', 'Crit DMG', 'ATK%', 'Basic Attack DMG']
      }
    },
    {
      id: 'youhu',
      name: 'Youhu',
      element: 'Glacio',
      weaponType: 'Gauntlets',
      rarity: 4,
      roles: ['sustain', 'buffer'],
      rotationType: 'quickswap',
      synergyTags: ['coordinated-attack-buff', 'healing'],
      stats: { hp: 9975, atk: 262, def: 1051 },
      dataComplete: true,
      build: {
        weapons: ['variation', 'marcato', 'abyss-surges'],
        echoSets: ['rejuvenating-glow', 'moonlit-clouds'],
        mainStats: { cost4: 'Healing Bonus / Crit Rate', cost3: 'Energy Regen / ATK%', cost1: 'ATK%' },
        substats: ['Energy Regen', 'ATK%', 'Crit Rate', 'Crit DMG']
      }
    },
    {
      id: 'lumi',
      name: 'Lumi',
      element: 'Electro',
      weaponType: 'Broadblade',
      rarity: 4,
      roles: ['main-dps', 'sub-dps'],
      rotationType: 'quickswap',
      synergyTags: ['skill-buff', 'electro-dmg'],
      stats: { hp: 8500, atk: 337, def: 892 },
      dataComplete: true,
      build: {
        weapons: ['ages-of-harvest', 'lustrous-razor', 'autumntrace'],
        echoSets: ['moonlit-clouds', 'void-thunder'],
        mainStats: { cost4: 'Crit Rate / Crit DMG', cost3: 'Electro DMG / Energy Regen', cost1: 'ATK%' },
        substats: ['Energy Regen', 'Crit Rate', 'Crit DMG', 'Basic Attack DMG', 'ATK%']
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