import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const REPO_RAW_BASE = 'https://raw.githubusercontent.com/Sjnn/resonance-data/main';
const ROOT = process.cwd();
const GAME_DIR = path.join(ROOT, 'wuwa');
const IMAGE_NAMES = ['icon.png', 'icon.webp', 'icon.jpg', 'avatar.png'];
const SPLASH_NAMES = ['splash.png', 'splash.webp', 'splash.jpg', 'portrait.png', 'portrait.webp'];

const VALID_ELEMENTS = new Set(['Aero', 'Electro', 'Fusion', 'Glacio', 'Havoc', 'Spectro']);
const VALID_WEAPONS = new Set(['Broadblade', 'Gauntlets', 'Pistols', 'Rectifier', 'Sword']);
const VALID_ROLES = new Set(['main-dps', 'sub-dps', 'buffer', 'sustain', 'debuffer']);
const VALID_ROTATIONS = new Set(['sustained', 'quickswap']);

function findEntityImage(entityDir, relativeUrlBase) {
  for (const fileName of IMAGE_NAMES) {
    if (fs.existsSync(path.join(entityDir, fileName))) {
      return `${REPO_RAW_BASE}/${relativeUrlBase}/${fileName}`;
    }
  }
  return undefined;
}

function loadCategoryFolders(category) {
  const categoryDir = path.join(GAME_DIR, category);
  if (!fs.existsSync(categoryDir)) return [];

  const entries = fs.readdirSync(categoryDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  const seenIds = new Set();
  const items = [];

  for (const dir of entries) {
    const entityDir = path.join(categoryDir, dir.name);
    const dataPath = path.join(entityDir, 'data.json');
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Missing data.json inside wuwa/${category}/${dir.name}`);
    }

    const record = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    if (record.id !== dir.name) {
      throw new Error(`Folder name "${dir.name}" does not match id "${record.id}" in wuwa/${category}`);
    }
    if (!record.name || typeof record.name !== 'string') {
      throw new Error(`Missing valid "name" in wuwa/${category}/${dir.name}/data.json`);
    }
    if (seenIds.has(record.id)) {
      throw new Error(`Duplicate id "${record.id}" in ${category}`);
    }
    seenIds.add(record.id);

    const remoteImageUrl = findEntityImage(entityDir, `wuwa/${category}/${dir.name}`);
    if (remoteImageUrl && !record.remoteImageUrl) {
      record.remoteImageUrl = remoteImageUrl;
    }

    items.push(record);
  }

  return items;
}

const rawCharacters = loadCategoryFolders('characters');
const weapons = loadCategoryFolders('weapons');
const bosses = loadCategoryFolders('bosses');
const echoes = loadCategoryFolders('echoes');
const builds = [];

const characters = rawCharacters.map(({ build, ...charData }) => {
  if (charData.dataComplete) {
    if (!VALID_ELEMENTS.has(charData.element)) {
      throw new Error(`Character "${charData.id}" has invalid element: ${charData.element}`);
    }
    if (!VALID_WEAPONS.has(charData.weaponType)) {
      throw new Error(`Character "${charData.id}" has invalid weaponType: ${charData.weaponType}`);
    }
    if (charData.rarity !== 4 && charData.rarity !== 5) {
      throw new Error(`Character "${charData.id}" has invalid rarity: ${charData.rarity}`);
    }
    if (Array.isArray(charData.roles)) {
      for (const r of charData.roles) {
        if (!VALID_ROLES.has(r)) {
          throw new Error(`Character "${charData.id}" has invalid role: ${r}`);
        }
      }
    }
    if (charData.rotationType && !VALID_ROTATIONS.has(charData.rotationType)) {
      throw new Error(`Character "${charData.id}" has invalid rotationType: ${charData.rotationType}`);
    }
  }

  if (build && typeof build === 'object') {
    builds.push({
      characterId: charData.id,
      role: Array.isArray(charData.roles) && charData.roles[0] ? charData.roles[0] : 'main-dps',
      ...build,
    });
  }

  return charData;
});

const now = new Date().toISOString();
const version = now.slice(0, 10).replace(/-/g, '.');

const dataset = {
  schemaVersion: 1,
  version: `synced-${now}`,
  updatedAt: now,
  characters,
  weapons,
  bosses,
  echoes,
  builds,
};

const datasetPath = path.join(GAME_DIR, 'dataset.json');
const datasetJson = JSON.stringify(dataset, null, 2) + '\n';
fs.writeFileSync(datasetPath, datasetJson, 'utf8');

const sha256 = crypto.createHash('sha256').update(datasetJson).digest('hex');

const appReleasePath = path.join(ROOT, 'app-release.json');
const appInfo = fs.existsSync(appReleasePath)
  ? JSON.parse(fs.readFileSync(appReleasePath, 'utf8'))
  : {
      latestVersion: '1.0.0',
      minSupportedVersion: '1.0.0',
      releaseUrl: 'https://github.com/Sjnn/Resonance/releases/latest',
      changelog: [],
    };

const manifest = {
  schemaVersion: 1,
  updatedAt: now,
  app: appInfo,
  games: {
    wuwa: {
      version,
      path: 'wuwa/dataset.json',
      sha256,
      counts: {
        characters: characters.length,
        weapons: weapons.length,
        bosses: bosses.length,
        echoes: echoes.length,
        builds: builds.length,
      },
    },
  },
};

fs.writeFileSync(path.join(ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(`Built wuwa/dataset.json (${characters.length} chars, ${weapons.length} weapons, ${bosses.length} bosses, ${echoes.length} echoes, ${builds.length} builds)`);
console.log(`SHA-256: ${sha256}`);