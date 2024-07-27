# Changelog

## 2.1.0 [2024-08-##]

### Added

- Static method `createOne` for beatmap core
  - As opposed to `create`, this returns instance instead of array of instance.
- Several JSDocs written

### Changed

- Separate exports for `utils` and `types` to entrypoint
- Renamed function in `time` utils for clarification
- Renamed data check to schema declaration
- Updated color scheme
- Moved source files to `src`

### Fixed

- Several undocumented fixes
- Typod from `hass` to `has`

### Removed

- `web` functions from `utils`
- `easing` params from certain function with `alpha` value

## 2.0.2 [2024-07-23]

### Fixed

- Default exports not being exported
- Missing many exports

## 2.0.1 [2024-07-23]

### Fixed

- NPM entrypoint fix, surely

## 2.0.0 [2024-07-23]

### Added

- Collider environment & color scheme
- `read` and `write` module
  - This is to separate loading and saving functionality from including `fs`
- `Beatmap` class object
  - Contains both `Difficulty` and `Lightshow`, separating respective object to supposed category
  - Loading and saving will now use `Beatmap` object rather than individual class above
  - `customData` under `Beatmap` will be placed onto but not replacing existing `customData` object
    in `Difficulty` and `Lightshow` upon save
- Compatibility check on save
- Several beatmap helpers
- Gaussian random using Box-Muller transform utils function

### Changed

- Complete overhaul on beatmap structure
  - Now version agnostic, no need to create from version-specific object
  - This follows much closer to how beatmap is processed in-game than what it is in format
  - Customizable and arbitrary version format
    - For simplicity sake, only counts major version, but not limited to single digit
  - Implicit Mapping Extensions conversion
    - Mapping extensions is not recommended to be used as it is highly dependent on map format and
      the module tries its best to interpret Mapping Extensions as close to plugin beatmap
      processing
- `BeatPerMinute` class renamed to `TimeProcessor`

### Removed

- Several leftover/dead code that could lead to confusion
- Default value and deep copy omitted when deserialize
  - This will instead be done inside `core` beatmap
