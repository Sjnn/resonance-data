# Resonance Data (`resonance-data`)

A clean, modular, zero-dependency game data repository for the **[Resonance](https://github.com/Sjnn/Resonance/releases/latest)** desktop app.

This repository serves as the single source of truth for game data (such as Wuthering Waves / *WuWa*) and app release versioning. Contributors can author modular entity files independently, and the build pipeline compiles them into validated datasets consumed by the desktop client.

---

## Repository Structure

```text
resonance-data/
├── .github/
│   └── workflows/
│       └── build-data.yml      # CI/CD: validates & builds dataset on push
├── scripts/
│   └── build.mjs               # Zero-dependency Node.js ESM compilation & validation script
├── wuwa/                       # Wuthering Waves game data
│   ├── characters/             # Modular character directories (<id>/data.json)
│   │   └── jiyan/
│   │       ├── data.json
│   │       └── icon.png        # (Optional) Entity icon
│   ├── weapons/                # Modular weapon directories (<id>/data.json)
│   │   └── verdant-summit/
│   │       └── data.json
│   ├── bosses/                 # Modular boss directories (<id>/data.json)
│   │   └── feilian-beringal/
│   │       └── data.json
│   ├── echoes/                 # Modular echo set directories (<id>/data.json)
│   │   └── sierra-gale/
│   │       └── data.json
│   └── dataset.json            # Compiled, unified monolithic dataset (auto-generated)
├── app-release.json            # Desktop app update configuration & minimum version gate
├── manifest.json               # Root index, SHA256 checksums, and entity counts (auto-generated)
├── package.json                # Project scripts
└── README.md
```

---

## App Release Management (`app-release.json`)

The desktop app reads `app-release.json` (also mirrored in `manifest.json`) upon launch to determine if an update is available or required:

```json
{
  "latestVersion": "1.0.0",
  "minSupportedVersion": "1.0.0",
  "releaseUrl": "https://github.com/Sjnn/Resonance/releases/latest",
  "changelog": []
}
```

* **`latestVersion`**: The most recent released version of Resonance.
* **`minSupportedVersion`**: The minimum client version required. Older versions will prompt or require the user to update.
* **`releaseUrl`**: Download destination for the latest release.
* **`changelog`**: Optional list of release notes or version summaries.

---

## Adding New Content

All game content under `wuwa/` is modular. To add an entity, create a subfolder inside the appropriate category named after the entity's slug ID (`kebab-case`).

> [!IMPORTANT]
> The folder name **must match** the `"id"` property in `data.json` exactly.

### 1. Adding a Character

Create `wuwa/characters/<character-id>/data.json`:

```json
{
  "id": "jiyan",
  "name": "Jiyan",
  "element": "Aero",
  "weaponType": "Broadblade",
  "rarity": 5,
  "roles": ["main-dps"],
  "rotationType": "sustained",
  "synergyTags": ["aero-dmg", "heavy-attack"],
  "stats": {
    "hp": 10488,
    "atk": 438,
    "def": 1186
  },
  "dataComplete": true,
  "build": {
    "weapons": ["verdant-summit"],
    "echoSets": ["sierra-gale"],
    "mainStats": {
      "cost4": "Crit Rate / Crit DMG",
      "cost3": "Aero DMG",
      "cost1": "ATK%"
    },
    "substats": ["Crit Rate", "Crit DMG", "Energy Regen", "ATK%", "Heavy Attack DMG"]
  }
}
```

**Allowed Values:**
* **`element`**: `Aero` | `Electro` | `Fusion` | `Glacio` | `Havoc` | `Spectro`
* **`weaponType`**: `Broadblade` | `Gauntlets` | `Pistols` | `Rectifier` | `Sword`
* **`rarity`**: `4` | `5`
* **`roles`**: Array containing any of: `main-dps` | `sub-dps` | `buffer` | `sustain` | `debuffer`
* **`rotationType`**: `sustained` | `quickswap`
* **`build`**: When non-null, this is automatically extracted into the top-level `builds` collection in `wuwa/dataset.json` with `characterId`.

---

### 2. Adding a Weapon

Create `wuwa/weapons/<weapon-id>/data.json`:

```json
{
  "id": "verdant-summit",
  "name": "Verdant Summit",
  "weaponType": "Broadblade",
  "rarity": 5,
  "baseAtk": 587,
  "subStat": "Crit DMG",
  "subStatValue": "48.6%",
  "passive": "Increases Attribute DMG Bonus by 12%. Every time Intro Skill or Resonance Liberation is cast, increases Heavy Attack DMG Bonus by 24%, stacking up to 2 times."
}
```

**Allowed Values:**
* **`weaponType`**: `Broadblade` | `Gauntlets` | `Pistols` | `Rectifier` | `Sword`
* **`rarity`**: `4` | `5`

---

### 3. Adding a Boss

Create `wuwa/bosses/<boss-id>/data.json`:

```json
{
  "id": "feilian-beringal",
  "name": "Feilian Beringal",
  "element": "Aero",
  "cost": 4,
  "echoSetId": "sierra-gale",
  "location": "Giant Banyan, Dim Forest"
}
```

---

### 4. Adding an Echo Set

Create `wuwa/echoes/<echo-set-id>/data.json`:

```json
{
  "id": "sierra-gale",
  "name": "Sierra Gale",
  "twoPiece": "Aero DMG +10%",
  "fivePiece": "Aero DMG +30% for 15s upon using Intro Skill"
}
```

---

### 5. Adding Images / Icons

To attach an icon or image to any entity:
1. Place an image named `icon.png`, `icon.webp`, or `icon.jpg` directly in the entity's directory (for example, `wuwa/characters/jiyan/icon.png`).
2. When `scripts/build.mjs` runs, it detects the file and automatically sets `remoteImageUrl`:
   ```text
   https://raw.githubusercontent.com/Sjnn/resonance-data/main/wuwa/<category>/<id>/<filename>
   ```

---

## Build Pipeline & Local Validation

The repository includes a zero-dependency ESM build script (`scripts/build.mjs`).

### Run the Build:

```bash
node scripts/build.mjs
# or
npm run build
```

### Validation Performed:
1. **Directory vs ID match**: Ensures folder name === `record.id`.
2. **Name validation**: Ensures non-empty `name` string.
3. **Category uniqueness**: Verifies unique IDs across each category.
4. **Enum validation**: Enforces valid `element`, `weaponType`, `rarity`, `roles`, and `rotationType`.
5. **Asset resolution**: Discovers entity icons and generates CDN raw GitHub URLs.
6. **Build extraction**: Collects character build presets into a top-level `builds` collection tagged with `characterId`.
7. **Integrity checksums**: Generates SHA256 checksums of compiled datasets into `manifest.json`.

---

## CI / CD Automation

The repository is configured with a GitHub Actions workflow (`.github/workflows/build-data.yml`):
* Triggers automatically when changes are pushed to `main` impacting any data file, `app-release.json`, or the build script.
* Runs validation and builds `wuwa/dataset.json` and `manifest.json`.
* Commits and pushes the updated dataset back to the branch automatically.
