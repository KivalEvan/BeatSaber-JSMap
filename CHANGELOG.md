# Changelog

## 1.6.0 [2024-02-##]

### Added

- Beatmap Difficulty, Lightshow and Info v4
- Beatmap JSON can now be passed onto `load` instead of just string path
  - Default file name to `LoadJSON.dat`

### Changed

- Major structure change to Info
- Minor structure change to Difficulty
  - FX Float event is now part of event box instead of separated entity
- Several class method now return `this` instead of `void` to allow chaining
- Beatmap version is now read-only
- Internal logic optimised

### Fixed

- Test case not using the new default value
- Removed filter in FX collection construction to avoid potential index error
- New easings being disallowed to use

### Removed

- Info set object/class, no longer available as of v4

## 1.5.3 [2023-12-07]

### Added

- Lattice environment & color scheme
- Add `strobeBrightness` and `strobeFrequency` for v3 light color base
- New v3 easings value

## 1.5.2 [2023-11-07]

### Added

- The Rolling Stones environment & color scheme
- Beatmap v3 lightshow data

### Changed

- Shallow copy on parse
- Proper promise for load/save (maybe)
- Remove sorting for FX base events

### Fixed

- Data check not skipping array check

## 1.5.1 [2023-10-16]

### Added

- Old v2 custom data parsing outside of custom data

### Changed

- Allow parser to accept any `object` record
- Non-array `never` type receives dummy class to avoid null error when using alongside wrapper class
  type

### Fixed

- v3 beatmap not removing default on save (why am I like this?)
- Sorting for v2 beatmap causes script to crash
- Default brightness for light color base not being `0` is inconsistent with the rest

## 1.5.0 [2023-10-12]

Couple of optimization work has been done to further improve memory and time efficiency. This
focuses heavily on speed for faster iteration reason. Overall, it should result in up to 1.6x faster
in general use case.

### Added

- Updated to beatmap v3.3.0
  - FX Event Box Group
  - FX Events Collection
- Linkin Park 2.0 environment & color scheme
- [New SongCore features](https://github.com/Kylemc1413/SongCore/pull/122) (tags, custom
  characteristic label, etc.)
- Predefined beatmap data clean method
  - This handles only the known data to be cleanse which is significantly faster than deep clean
    method
  - This can also avoid sensitive data like BPM Event where floating point must always be precise
- Info color scheme copy
- Ensure alpha for `toColorObject`
- `invLerp`, `remap`, `lerpVector`, `shallowCopy`, and `jsonCopy` utils
- Missing `offsetPosition` and `offsetWorldRotation` property for `AnimateTrack` and
  `AssignPathAnimation`
- Object method comparison now checks for mod type

### Changed

- All beatmap v3 and v2 schema attributes is now optional
- Beatmap v3 now purge all zero value attributes on optimized save (new in 1.32 editor)
  - This strips all zero attributes from the object resulting in up to 5x smaller size
  - Data check now ignores majority of the missing attributes, defaulting to `0` or `false`
  - Older Beat Saber version down to 1.20 can still load the beatmap with no issue
  - Can be applied for beatmap v2 but must be explicitly enabled with `purgeZeros` attributes in
    `optimize`
  - Does not apply to beatmap v1 as it require all attributes to be present
- All default value changed to `0`, `false` or first enum value in attributes
  - Arc multiplier, tail multiplier
  - Chain squish, link count
  - Event float value
  - Obstacle duration, width, height
  - Class static `default` should no longer be touched unless you know what you are doing
- Parsing no longer handle sorting
  - Moved to class method, sorting is done by default on load
- The Weeknd and Panic 2.0 color scheme now shows white color value
- Utils no longer require namespace
  - This should reveal more hidden utilities without the need to import and destructuring `utils`
    namespace
- Beatmap Info structure changed to better fit original structure
  - This also goes for info custom data
- Beatmap optimization tweaked
  - Moved sorting responsibility to saving
- Beatmap `addObject` method now always create new instance
- Custom data color scheme `a` is now optional instead of omitted
- Removed logging from utils, now throws error instead of warn or error
- Clarify `difficultyFromInfo` return type
- `deepCopy` reworked, formerly is now `jsonCopy`
- Converter function renamed for clarity
- Color utils renamed for consistency
  - `HsvaToRgba` to `hsvaToRgba`
  - `RgbaToHsva` to `rgbaToHsva`
  - `interpolateColor` to `lerpColor`
  - And couple others I forgot
- Renamed `translationDistribution` to `gapDistribution`
- Shortened constant `Position#` to `Pos#`

### Fixed

- Data check not picking up `NaN` value
- Mapping Extensions precision placement X position being incorrect
- Data check should properly skip error
- Couple of accidental mutation fix from utils
- `toHexColor` properly normalize the value outside of 0-1 range

## 1.4.1 [2023-06-30]

### Fixed

- Optimize shouldn't remove info attribute

## 1.4.0 [2023-06-30]

### Added

- Updated to info v2.1.0
- Queen environment & color scheme
- Legacy beatmap v1 (incomplete; contain mixed information)
- Info wrapper class
- Beatmap object class validation
- Tagged log method
  - Prefixed with, `t` followed by capital letter, for consistent tagging style print
  - Non-tagged log will automatically apply `script` tag
  - Able to customise tag print and untagged string

### Changed

- Wrapper class now have their own protected attributes instead of using `data`
- Unspecified difficulty version will now return base wrapper class instead of version specific
  - This means it won't automagically convert v2 map to v3 map when unspecified
- Renamed `slider` and `burstSlider` to `arc` and `chain` respectively
  - This reduce the confusion between internal and common name
  - Schema remained unchanged for obvious reason
- Renamed `fileName` to `filename` for consistency
- Renamed couple of functions and constants
- Allow object class constructor to be used (similar to static `create` but as single object)
- Allow object class `func` to have any arguments
- Changed modded object value method behaviour
- Changed custom data type structure
- Changed type from `Record` to `Object` for known constants
- Updated converter functions
- Updated Heck stuff
- Logger can now be instantiated
- Small refactor for BPM and NJS class
- Recommended Deno version to 1.34.0+
- Only root-level file can contain platform-specific API

### Fixed

- Copy object/array in class object when copying to prevent accidental referenced mutation
- Missing NE and Chroma check
- Missing wrapper and types export
- Chroma gradient event convert properly
- Possible floating-point error in NJS HJD calculation
- Constants should throw TS error if modified (`environment`, `colorScheme`, etc.)

### Removed

- `data` in class object (`Array` and `Object` are never modified and could cause confusing usage)
- Prompting in conversion (this should now be handled by script user)
- `swapPosition` and `swapRotation` in class object (seemingly unnecessary utility)
- `Required` object in concrete class (overall less visual noise)
- Unused optimize option
- FS utility (now uses standard module)

## 1.3.4 [2023-04-19]

### Added

- Panic 2.0 environment & color scheme
- Missing export for types ([@Fernthedev](https://github.com/Fernthedev))

### Changed

- Interactive time condition changed
  - Arc is ignored and bomb should no longer be ignored (no idea why this was)
- Moved `track` from NE to Heck
- Updated Chroma and NE check on beatmap object

## 1.3.3 [2023-03-04]

### Added

- Dragons 2.0 environment & color scheme
- Wrapper attribute interface separated (this should result in consistent and better developing
  experience)

### Fixed

- Event box constructor should no longer attempt to fix beat distribution value for step and offset
  type filter

## 1.3.2 - Hotfix [2023-02-22]

### Fixed

- Gradient conversion used wrong event class

## 1.3.1 [2023-02-22]

### Added

- Data check can now check for array of primitives
- Converts boost and lane rotation event from basic events to their respective arrays
- Temporary v2 event conversion to v3 event in beatmap v3 parsing

### Changed

- Updated custom data schema
- Data checks now performed after optimisation
- Difficulty related function now uses wrapper instead of concrete object
- Renamed save option attributes from `optimise` to `optimize`

### Fixed

- Data check throwing error for array of primitives
- Fixed optimisation removing required attributes

### Removed

- `_lineLayer` and `_height` from v2 obstacle (it never existed in the first place)

## 1.3.0 [2022-12-31]

### Added

- The Weeknd and Rock Mixtape environment & color scheme
- Wrapper class/interface
  - Write properties instantiation in more readable syntax
  - Able to instantiate object from existing class object (copy)
  - Mix-and-match is possible but will prioritise wrapper property
- External file interface
  - Currently supported `BPM Info`, `Cinema`, `Chroma`
- Zip extension
- Couple more utilities
  - Pseudorandom number generator (global or instanced)
  - Vector helpers
  - Color from helpers (various of input to return color array)
  - Array pick random
- Experimental Deno standard library usage
- Test coverage

### Changed

- Updated to beatmap v3.2.0
- Structural change
  - Custom data type moved to their dedicated folder to separate main and custom schema (main schema
    uses custom schema for custom data)
- Renamed `basicBeatmapEvents` and `colorBoostBeatmapEvents` to `basicEvents` and `colorBoostEvents`
- Beatmap v2 field rename (JSON remains the same)
- Improved function overloading and auto-completion
- Renamed couple of function to be camel/pascal case including acronyms (JS API left untouched)
- Array utilties now uses template

### Fixed

- Obstacle not correctly check for interactive in specific case
- Loose-autocomplete type incorrectly throw error when passed to primitive
- Couple of utils fixed from testing

## 1.2.2 [2022-10-07]

### Added

- Lizzo environment & color scheme
- Beatmap auto-fixer script
- Data and custom data correction patch
- Remove outside playable patch
- Library version

### Changed

- Updated to beatmap v3.1.0
- v2 Note and v2 Slider `cutDirection` shortened to `direction` to match v3 consistency
- Disallow both class object and object to be added in the same parameter for difficulty add object
  (this makes for less confusing autocomplete)
- Updated SPS info

### Fixed

- Convert To V3 script now actually ask for miscellaneous conversion
- Data check option now actually respect option
- Deleted stray `_preciseSpeed` custom data on conversion
- Autocomplete no longer includes object class property in add/creation
- JSDoc typo error

## 1.2.1 [2022-08-18]

### Added

- v3 BPM change support to `BeatPerMinute` class
- Custom data patching for v2 and v3

### Changed

- Conversion now keeps unknown custom data
- `NoteCutAngle` renamed to `NoteDirectionAngle`
- v2 Waypoints is now optional
- Updated Heck
- Couple of clean-up

### Fixed

- LightMapper default brightness now set to 1
- Object callback no longer warn undefined

## 1.2.0 [2022-08-02]

### Added

- Chroma geometry, material and component
  - This contains breaking changes to existing v3 Chroma
- More utilities standard, Chroma, and Noodle Extensions
  - LightMapper -> v3 lighting system for v2 light
  - EnvironmentGrab -> utility to write environment game object in regex and string form
- Configurable data check
  - Checks on save
- Object mirroring now use & change custom data
- Object get position/angle can use & return custom data value
- Object function callback method for more advanced use
- Color function can infer hex string as RGBA color
- Color function can take color object and uses them accordingly
  - Depend on use case, this will always convert to RGBA for ease of development
- Loose autocomplete

### Changed

- `path` is now called `directory` to avoid confusion
- Easings is now independent to beatmap
  - Easings can be retrieved from `utils`
- Beatmap V3 to V2 conversion now converts customData back
  - Attempts to fix position for environment track
- Beatmap object create will now always return array
- Types structure changes
- Renamed class `DifficultyData` to `Difficulty`
- Renamed method `toObject` to `toJSON` for JS built-in functionality
- All constructor is now protected instead of private

### Fixed

- Negative hue no longer result null value
- Obstacle mirroring now accounts for width
- `RgbaToHsva` hue returning normalised hue value instead
- `directory` potentially no longer prefix file name instead of going into folder
- `where` function does not filter correctly with exclude

## 1.1.1 [2022-06-19]

### Added

- Selector extension `where` function

### Changed

- v2 event floatValue and v2 obstacle lineLayer & height is now optional
- Class object data is now exposed (not recommended for modification purpose)
- Several changes to extensions

### Fixed

- Example is broken
- Sometimes error would come randomly

## 1.1.0 [2022-06-16]

### Added

- The Second environment and color scheme
- Environment class for Chroma extensions

### Changed

- Top-level functions use regular function instead of arrow function
- V2 objects use `pos` instead of `line`
- Slider create default multiplier from `0.5` to `1` and mid anchor to `0`
- Default options is now nested
- Cleaned up JSDoc

### Fixed

- Bookmark type file somehow ended up in class folder

## 1.0.4 [2022-06-14]

### Fixed

- `time` instead of `type` for custom events

## 1.0.3 [2022-06-13]

### Fixed

- Difficulty file name not being saved

## 1.0.2 [2022-06-12]

### Added

- Selector extension
  - Select object at time and between time
- Class object clone method

### Changed

- Custom data will now always exist in class object context
- Heck settings setter now allow for any valid field

### Fixed

- Several extensions fixed

## 1.0.1 [2022-06-11]

### Added

- File name saved to difficulty class object
  - Saving difficulty will prioritise file name from explicit option `filePath`, class object, info,
    and default value

### Changed

- Point definitions v2 to v3 conversion

### Removed

- `filename` field removed from difficulty list interface due to redundancy (`settings` field
  already provided file name)

## 1.0.0 - First stable release [2022-06-07]
