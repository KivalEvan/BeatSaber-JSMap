# Beat Saber Beatmap Schema

Current schema as of game version 1.42.0.

> [!NOTE]
>
> Work-In-Progress: Will be further expanded.

## Introduction

The purpose of this document is to inform the user of the module the implementation detail of Beat
Saber Beatmap to better understand the use of the module. For further detail, visit
[BSMG Wiki page here](https://bsmg.wiki/mapping/map-format.html).

The module takes an effort to follow closely to features presented from the game and to be as
version agnostic. It uses singular core model, which means no version specific object is needed but
may require explicit instruction from the user on handling version specific task. Both `Difficulty`
and `Lightshow` exist in `Beatmap` as unification process.

## Version and Conversion

Versioning only exist within `Info`, `AudioData`, and `Beatmap`. By default, instantiating without
version will default to `-1` which prevents any save to be processed. You may set version to any
arbitrary version so long the module supports it or customised to be available. You may also use
conversion helper to handle version specific task including custom data, otherwise it will proceed
to save as version without any further context.

As certain beatmap schema groups object differently between version, the module takes an approach to
separate and group the object accordingly. It also takes an effort to interpret and convert any
non-vanilla value to and from modded value upon serialisation and deserialisation for compatibility
reason. This may cause issue for beatmap that uses invalid data value or abuses the quirk of the
game. However, if you find anything that are not supposed to break or modified when using this
module, please do report them.

Upon save, certain data may be stripped or added than what was originally available within the core
model. This is important to note as each version of the schema may only hold certain data that are
compatible.

## Notables

### General

- Environment does not require any version and can be loaded in any info and beatmap version
  - Only beatmap version has to be compatible in order to fully light in said environment
- Missing environment (old game version or mistyped name) will always default to
  `DefaultEnvironment`
- v3 environment can be lit with v2 beatmap so long the environment has available basic event

### v2 Info

- Able to load v2 and v3 beatmap
- Unable to load v4 beatmap as it rely on v4 audio data which is present in v4 info.
  - `BPMInfo.dat` is not read for this case.

### v4 Info

- Able to load v2 and v3 beatmap, alongside with the lightshow content without the need to provide
  `BeatmapLightshowFile`
  - v4 beatmap may also load without lightshow file but will show empty/static light

## Differences

The following tables describe schema features and the module's support classification.

Legend:

- ✅ : Compatible
- ⚠️ : Partial (require interpretation or mods)
- ❌ : Unavailable or unsupported

### Info

|                            | v4 (4.0.1)              | v2 (2.1.0)                                                   | v1 (1.0.0)            |
| -------------------------- | ----------------------- | ------------------------------------------------------------ | --------------------- |
| Audio Data File            | ✅                      | ⚠️ Exist as BPMInfo.dat; not required                        | ❌                    |
| Audio LUFS                 | ✅                      | ❌                                                           | ❌                    |
| Audio Offset               | ❌                      | ⚠️ Deprecated; buggy feature                                 | ❌                    |
| Audio Shuffle              | ❌                      | ⚠️ Deprecated                                                | ❌                    |
| Song Preview File          | ✅                      | ❌                                                           | ❌                    |
| Base Environment           | ❌                      | ✅                                                           | ⚠️ No 360 environment |
| Environment List           | ✅                      | ✅                                                           | ❌                    |
| Color Scheme List          | ⚠️ Use hex string       | ⚠️ Has singular toggle override                              | ❌                    |
| Beatmap Level Author       | ✅                      | ⚠️ Singular string, exist on root; apply to all difficulties | ❌                    |
| Beatmap Characteristic     | ✅                      | ⚠️ Grouped                                                   | ✅                    |
| Beatmap Environment Index  | ✅                      | ✅                                                           | ❌                    |
| Beatmap Color Scheme Index | ✅                      | ✅                                                           | ❌                    |
| Beatmap Lightshow File     | ✅ Only with v4 Beatmap | ❌                                                           | ❌                    |

### Audio Data

|                | v4 (4.0.0) | v2 (2.0.0) |
| -------------- | ---------- | ---------- |
| Audio Checksum | ✅         | ❌         |
| LUFS           | ✅         | ❌         |

### Difficulty

|                                        | v4 (4.1.0)                   | v3 (3.3.0)               | v2 (2.6.0)                          | v1 (1.5.0)                          |
| -------------------------------------- | ---------------------------- | ------------------------ | ----------------------------------- | ----------------------------------- |
| BPM Event                              | ❌ Uses v4 Audio Data        | ✅\*                     | ⚠️ Part of basic event\*            | ❌                                  |
| Color Note                             | ✅                           | ✅                       | ⚠️ No angle offset                  | ⚠️ No angle offset                  |
| Bomb Note                              | ⚠️ No direction              | ⚠️ No direction          | ✅                                  | ✅                                  |
| Arc                                    | ✅                           | ✅                       | ⚠️ Supported unofficially           | ❌                                  |
| Chain                                  | ✅                           | ✅                       | ❌                                  | ❌                                  |
| Obstacle                               | ✅                           | ⚠️ Vanilla only up to 2y | ⚠️ Fixed full/crouch wall types     | ⚠️ No type                          |
| Rotation Event                         | ❌ Use object lanes          | ✅                       | ⚠️ Fixed value; part of basic event | ⚠️ Fixed value; part of basic event |
| NJS Event                              | ✅                           | ❌                       | ❌                                  | ❌                                  |
| Waypoint                               | ❌ All below in v4 Lightshow | ✅                       | ✅                                  | ❌                                  |
| Basic Event                            | ❌                           | ✅                       | ✅                                  | ⚠️ No float value                   |
| Color Boost Event                      | ❌                           | ✅                       | ⚠️ Part of basic event              | ⚠️ Part of basic event              |
| FX Event Box Group                     | ❌                           | ✅                       | ❌                                  | ❌                                  |
| Light Color Event Box Group            | ❌                           | ⚠️ No transition         | ❌                                  | ❌                                  |
| Light Rotation Event Box Group         | ❌                           | ✅                       | ❌                                  | ❌                                  |
| Light Translation Event Box Group      | ❌                           | ✅                       | ❌                                  | ❌                                  |
| Event Types for Keywords               | ❌                           | ✅                       | ✅                                  | ❌                                  |
| Use Normal Events as Compatible Events | ❌                           | ✅                       | ❌                                  | ❌                                  |

\* BPM events are not affected nor added by v4 Info/Audio Data

### Lightshow

|                                        | v4 (4.0.0) | v3 (3.x.x) |
| -------------------------------------- | ---------- | ---------- |
| Waypoint                               | ✅         | ❌         |
| Use Normal Events as Compatible Events | ✅         | ❌         |

## Handlings

How module currently handles the differences, especially for deserialisation, conversion and
serialisation.

Legend:

- Empty : Nothing
- ⚠️ : Restructured/Renamed
- ❌ : Removed/Ignored

### Info

|                            | v4 (4.0.1)                            | v2 (2.1.0)                                               | v1 (1.0.0)            |
| -------------------------- | ------------------------------------- | -------------------------------------------------------- | --------------------- |
| Audio Data File            |                                       | ⚠️ Exist as BPMInfo.dat; not required                    | ❌                    |
| Audio LUFS                 |                                       | ❌                                                       | ❌                    |
| Audio Offset               | ❌                                    | ⚠️ Exist; unused                                         | ❌                    |
| Audio Shuffle              | ❌                                    | ⚠️ Exist; unused                                         | ❌                    |
| Song Preview File          |                                       | ❌                                                       | ❌                    |
| Base Environment           | ❌ Uses first instance of environment |                                                          | ⚠️ Ignore missing 360 |
| Environment List           |                                       |                                                          | ❌                    |
| Color Scheme List          | ⚠️ Gracefully convert hex             | ⚠️ Assume every override is enabled/disabled             | ❌                    |
| Beatmap Level Author       |                                       | ⚠️ Exist only in Mapper Level Author, separated by comma | ❌                    |
| Beatmap Characteristic     |                                       | ⚠️ Separated on deserialise, grouped on serialise        |                       |
| Beatmap Environment Index  |                                       |                                                          | ❌                    |
| Beatmap Color Scheme Index |                                       |                                                          | ❌                    |
| Beatmap Lightshow File     |                                       | ❌                                                       | ❌                    |

### Audio Data

|                | v4 (4.0.0) | v2 (2.0.0) |
| -------------- | ---------- | ---------- |
| Audio Checksum |            | ❌         |
| LUFS           |            | ❌         |

### Difficulty

|                                        | v4 (4.1.0)                   | v3 (3.3.0)                                         | v2 (2.6.0)                               | v1 (1.5.0)                                |
| -------------------------------------- | ---------------------------- | -------------------------------------------------- | ---------------------------------------- | ----------------------------------------- |
| BPM Event                              | ❌ Uses v4 Audio Data        |                                                    |                                          | ❌                                        |
| Color Note                             |                              |                                                    | ⚠️ Reinterpret as modded value           | ⚠️ Reinterpret as modded value            |
| Bomb Note                              | ⚠️ Ignored direction         | ⚠️ Ignored direction                               |                                          | ⚠️ Ignored direction                      |
| Arc                                    |                              |                                                    | ⚠️ Preserves `_sliders` data             | ❌                                        |
| Chain                                  |                              |                                                    | ❌                                       | ❌                                        |
| Obstacle                               |                              |                                                    | ⚠️ Fixed wall types or modded dimensions | ⚠️ Pos Y and height interpreted from type |
| Rotation Event                         | ⚠️ Optional legacy cleanup   |                                                    | ⚠️ Reinterpret as modded value           | ⚠️ Reinterpret as modded value            |
| Waypoint                               | ❌ All below in v4 Lightshow |                                                    |                                          | ❌                                        |
| NJS Event                              |                              | ❌                                                 | ❌                                       | ❌                                        |
| Basic Event                            | ❌                           |                                                    |                                          | ⚠️ Default float value of 1               |
| Color Boost Event                      | ❌                           |                                                    |                                          |                                           |
| FX Event Box Group                     | ❌                           |                                                    | ❌                                       | ❌                                        |
| Light Color Event Box Group            | ❌                           | ⚠️ Easing and previous interpreted from transition | ❌                                       | ❌                                        |
| Light Rotation Event Box Group         | ❌                           |                                                    | ❌                                       | ❌                                        |
| Light Translation Event Box Group      | ❌                           |                                                    | ❌                                       | ❌                                        |
| Event Types for Keywords               | ❌                           |                                                    |                                          | ❌                                        |
| Use Normal Events as Compatible Events | ❌                           |                                                    | ❌                                       | ❌                                        |

\* BPM events are not affected nor added by v4 Info/Audio Data

### Lightshow

|                                        | v4 (4.0.0) | v3 (3.x.x) |
| -------------------------------------- | ---------- | ---------- |
| Waypoint                               |            | ❌         |
| Use Normal Events as Compatible Events |            | ❌         |

## Conversion limits

The [BSMG map-format reference](https://bsmg.wiki/mapping/map-format.html) defines the vanilla
formats. Mod custom data follows the relevant mod specification.

v2 arcs are classified as supported unofficially because their intended format support is unclear,
even though the game can run them. Loading, saving, and conversion still preserve v2.6.0 `_sliders`
data. Data preservation does not guarantee supported gameplay.

Native v2 walls use `_type: 0` for full-height walls or `_type: 1` for crouch walls. Custom vertical
bounds require Mapping Extensions' packed `_type` encoding. v2 has no native type-2 wall or obstacle
`_lineLayer` and `_height` fields.

The wiki's v2.6.0 free-wall example does not match Beat Saber 1.45.1's v2 loader.

v4 rotation events are completely unsupported. Do not add `spawnRotations` or `spawnRotationsData`
to v4 beatmaps. Use per-object lane rotations instead.

The library keeps these fields only for optional cleanup of older maps that incorrectly used them.
Cleanup can transfer event-only data into object rotations when saving as v4.1. Arc and chain heads
and tails use their respective beats. This is not a v4 gameplay feature or a required migration.

For this legacy cleanup, execution time comes from `spawnRotationsData.t`, not the library's former
`e` spelling. Cleanup rejects legacy events mixed with nonzero native object lanes because no
precedence is defined. The game ignores the legacy tables. Current-v4 conversion preserves existing
endpoint lanes and NJS events.

v4 → v2/v3 conversion preserves existing absolute rotation overrides. It assigns unequal slider
endpoints to the global timeline. Conflicting notes and equal-ended sliders use per-object
overrides, including zero when the timeline is nonzero. Full-turn differences represent the same
orientation. Arc and waypoint overrides retain the correct field name through v2 round trips.

Conversion rejects competing required endpoint angles or shared metadata that cannot hold different
per-object overrides. It does not split shared custom-data references or silently change a tail. In
v2 conversion, the existing mod-data conversion runs before rotation validation. A failed call does
not guarantee rollback of the entire wrapper.

Downgrading arbitrary note angles uses Noodle Extensions or Mapping Extensions syntax. The caller
must add the required mod to Info metadata. Difficulty conversion does not receive the Info file.
Track animation conversion distinguishes note offsets from environment, parent, and player
transforms. It converts transform positions between v2 lane units and v3 meters. Dynamic position
modifiers, mixed note/transform track arrays, and independent transform/offset properties can
require manual conversion and produce explicit errors. Shared actor tracks and parent/player
composition remain unverified in the game.

Versionless v1 Info uses its legacy field names for format detection. Its `oneSaber` flag supplies
the characteristic only when a difficulty does not specify one. Legacy audio filenames and editor
BPM markers survive supported conversions. Difficulty BPM and NJS defaults still require explicit
serializer polyfills when saving v1. v1 support does not imply current game support.

## Unused

The followings are removed or not used in the game:

- v1
  - Info
    - No longer supported since the introduction of v2
  - Difficulty
    - No longer supported since the introduction of v2
- v3
  - Lightshow
    - Exist in game binary; unused
