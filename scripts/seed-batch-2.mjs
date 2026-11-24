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
    { id: 'lioness-of-glory', name: 'Lioness