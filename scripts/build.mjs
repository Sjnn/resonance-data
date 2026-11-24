import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const wuwaDir = path.resolve(rootDir, 'wuwa');
const appReleasePath = path.resolve(rootDir, 'app-release.json');
const datasetPath = path.resolve(wuwaDir, 'dataset.json');
const manifestPath = path.resolve(rootDir, 'manifest.json');

const VALID_ELEMENTS = new Set(['Aero', 'Electro', 'Fusion', 'Glacio', 'Havoc', 'Spectro']);
const VALID_WEAPON_TYPES = new Set(['Broadblade', 'Gauntlets', 'Pistols', 'Rectifier', 'Sword']);
const VALID_RARITIES = new Set([4, 5]);
const VALID_ROLES = new Set(['main-dps', 'sub-dps', 'buffer', 'sustain', 'debuffer']);
const VALID_ROTATION_TYPES = new Set(['sustained', 'quickswap']);
const ICON_EXTENSIONS = ['icon.png', 'icon.webp', 'icon.jpg'];
const REPO_RAW_BASE = 'https://raw.githubusercontent.com/Sjnn/resonance-data/main';

const CATEGORIES = ['characters', 'weapons', 'bosses', 'echoes'];

function validateCommon(category, dir, record, seenIds) {
  if (!record || typeof record !== 'object') {
    throw new Error(`[${category}/${dir}] Record must be a valid JSON object.`);
  }

  // 1. Folder name === record.id
  if (record.id !== dir) {
    throw new Error(
      `[${category}/${dir}] Folder name "${dir}" does not match record id "${record.id}".`
    );
  }

  // 2. Non-empty name
  if (typeof record.name !== 'string' || record.name.trim().length === 0) {
    throw new Error(`[${category}/${dir}] Field "name" must be a non-empty string.`);
  }

  // 3. Unique IDs per category
  if (seenIds.has(record.id)) {
    throw new Error(`[${category}/${dir}] Duplicate ID "${record.id}" found in category "${category}".`);
  }
  seenIds.add(record.id);

  // 4. Element validation (when present or for categories requiring it)
  if (record.element !== undefined) {
    if (!VALID_ELEMENTS.has(record.element)) {
      throw new Error(
        `[${category}/${dir}] Invalid element "${record.element}". Valid elements: ${[...VALID_ELEMENTS].join(', ')}`
      );
    }
  }

  // 5. WeaponType validation (when present or for categories requiring it)
  if (record.weaponType !== undefined) {
    if (!VALID_WEAPON_TYPES.has(record.weaponType)) {
      throw new Error(
        `[${category}/${dir}] Invalid weaponType "${record.weaponType}". Valid weapon types: ${[...VALID_WEAPON_TYPES].join(', ')}`
      );
    }
  }

  // 6. Rarity validation (when present or for categories requiring it)
  if (record.rarity !== undefined) {
    if (!VALID_RARITIES.has(record.rarity)) {
      throw new Error(
        `[${category}/${dir}] Invalid rarity "${record.rarity}". Valid rarities: 4, 5`
      );
    }
  }

  // 7. Roles validation (when present)
  if (record.roles !== undefined) {
    if (!Array.isArray(record.roles) || record.roles.length === 0) {
      throw new Error(`[${category}/${dir}] Field "roles" must be a non-empty array of strings.`);
    }
    for (const role of record.roles) {
      if (!VALID_ROLES.has(role)) {
        throw new Error(
          `[${category}/${dir}] Invalid role "${role}". Valid roles: ${[...VALID_ROLES].join(', ')}`
        );
      }
    }
  }

  // 8. RotationType validation (when present)
  if (record.rotationType !== undefined) {
    if (!VALID_ROTATION_TYPES.has(record.rotationType)) {
      throw new Error(
        `[${category}/${dir}] Invalid rotationType "${record.rotationType}". Valid types: ${[...VALID_ROTATION_TYPES].join(', ')}`
      );
    }
  }
}

function validateCategorySpecific(category, dir, record) {
  if (category === 'characters') {
    if (!record.element) throw new Error(`[characters/${dir}] Missing required field "element".`);
    if (!record.weaponType) throw new Error(`[characters/${dir}] Missing required field "weaponType".`);
    if (record.rarity === undefined) throw new Error(`[characters/${dir}] Missing required field "rarity".`);
    if (!record.roles) throw new Error(`[characters/${dir}] Missing required field "roles".`);
    if (!record.rotationType) throw new Error(`[characters/${dir}] Missing required field "rotationType".`);
  } else if (category === 'weapons') {
    if (!record.weaponType) throw new Error(`[weapons/${dir}] Missing required field "weaponType".`);
    if (record.rarity === undefined) throw new Error(`[weapons/${dir}] Missing required field "rarity".`);
  }
}

function resolveIconUrl(category, dir, entityFolder) {
  for (const filename of ICON_EXTENSIONS) {
    const iconFilePath = path.join(entityFolder, filename);
    if (fs.existsSync(iconFilePath)) {
      return `${REPO_RAW_BASE}/wuwa/${category}/${dir}/${filename}`;
    }
  }
  return null;
}

function build() {
  console.log('--- Resonance Data Builder ---');

  if (!fs.existsSync(appReleasePath)) {
    throw new Error(`Missing app-release.json at: ${appReleasePath}`);
  }

  const appRelease = JSON.parse(fs.readFileSync(appReleasePath, 'utf8'));
  const version = appRelease.latestVersion || '1.0.0';
  const updatedAt = new Date().toISOString();

  const dataset = {
    schemaVersion: 1,
    version,
    updatedAt,
    characters: [],
    weapons: [],
    bosses: [],
    echoes: [],
    builds: [],
  };

  for (const category of CATEGORIES) {
    const categoryFolder = path.join(wuwaDir, category);
    if (!fs.existsSync(categoryFolder)) {
      console.warn(`[Warning] Category folder does not exist: ${categoryFolder}`);
      continue;
    }

    const seenIds = new Set();
    const entries = fs.readdirSync(categoryFolder, { withFileTypes: true });
    const subdirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

    for (const dir of subdirs) {
      const entityFolder = path.join(categoryFolder, dir);
      const dataJsonPath = path.join(entityFolder, 'data.json');

      if (!fs.existsSync(dataJsonPath)) {
        throw new Error(`Missing data.json for ${category}/${dir}`);
      }

      let record;
      try {
        record = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
      } catch (err) {
        throw new Error(`Failed to parse JSON in ${category}/${dir}/data.json: ${err.message}`);
      }

      validateCommon(category, dir, record, seenIds);
      validateCategorySpecific(category, dir, record);

      const remoteImageUrl = resolveIconUrl(category, dir, entityFolder);
      if (remoteImageUrl) {
        record.remoteImageUrl = remoteImageUrl;
      }

      // Extract build if character has one
      if (category === 'characters' && record.build != null && typeof record.build === 'object') {
        dataset.builds.push({
          characterId: record.id,
          ...record.build,
        });
      }

      dataset[category].push(record);
    }
  }

  // Ensure wuwa directory exists
  if (!fs.existsSync(wuwaDir)) {
    fs.mkdirSync(wuwaDir, { recursive: true });
  }

  // Write wuwa/dataset.json
  const datasetJsonString = JSON.stringify(dataset, null, 2) + '\n';
  fs.writeFileSync(datasetPath, datasetJsonString, 'utf8');
  console.log(`Successfully generated: wuwa/dataset.json`);

  // Calculate SHA256 of wuwa/dataset.json
  const sha256 = crypto.createHash('sha256').update(datasetJsonString, 'utf8').digest('hex');

  // Build manifest.json
  const manifest = {
    schemaVersion: 1,
    updatedAt,
    app: appRelease,
    games: {
      wuwa: {
        version: dataset.version,
        path: 'wuwa/dataset.json',
        sha256,
        counts: {
          characters: dataset.characters.length,
          weapons: dataset.weapons.length,
          bosses: dataset.bosses.length,
          echoes: dataset.echoes.length,
          builds: dataset.builds.length,
        },
      },
    },
  };

  const manifestJsonString = JSON.stringify(manifest, null, 2) + '\n';
  fs.writeFileSync(manifestPath, manifestJsonString, 'utf8');
  console.log(`Successfully generated: manifest.json`);

  console.log('Summary:');
  console.log(`  Characters: ${dataset.characters.length}`);
  console.log(`  Weapons:    ${dataset.weapons.length}`);
  console.log(`  Bosses:     ${dataset.bosses.length}`);
  console.log(`  Echoes:     ${dataset.echoes.length}`);
  console.log(`  Builds:     ${dataset.builds.length}`);
  console.log(`  SHA256:     ${sha256}`);
  console.log('--- Build Finished Successfully ---');
}

build();
