# Changelog

## 2.0.0 [2024-06-##]

### Added

- `read` and `write` module
  - This require user to supply `fs` function from respective vendor in order to function, throws
    error if not presented
    - For example, you may use `Node.js`, `Deno`, `Bun` or `Browser`, all of which have completely
      different implementation and is incompatible with one another, which can be an issue to
      support.
    - In certain case, you may want to create a wrapper to get around compatibility or any other
      reason.
    - In the future, the module may be able to shim automatically but not guaranteed.
  - This is to separate loading and saving functionality from including `fs`
- `Beatmap` class object
  - Contains both `Difficulty` and `Lightshow`, separating respective object to supposed category
  - Loading and saving will now use `Beatmap` object rather than individual class above
  - `customData` under `Beatmap` will be placed onto but not replacing existing `customData` object
    in `Difficulty` and `Lightshow` upon save
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

- Ability to read/write files from load/save function
  - The file data should be supplied by respective vendor (Node.js, Deno, Bun, Browser, etc.)
  - This is done to allow compatibility on every platform
- Several leftover/dead code that could lead to confusion
