# Beat Saber Beatmap Schema

Current schema as of game version 1.37.1.

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

The following only describe the features available within each version schema.

Legend:

- ✅ : Compatible
- ⚠️ : Partial (require interpretation or mods)
- ❌ : Incompatible

### Info

|                            | v4 (4.0.0)              | v2 (2.1.0)                                                   | v1 (1.0.0)            |
| -------------------------- | ----------------------- | ------------------------------------------------------------ | --------------------- |
| Audio Data File            | ✅                      | ⚠️ Exist as BPMInfo.dat; not required                        | ❌                    |
| Audio LUFS                 | ✅                      | ❌                                                           | ❌                    |
| Audio Offset               | ❌                      | ⚠️ Deprecated; buggy feature                                 | ❌                    |
| Audio Shuffle              | ❌                      | ⚠️ Deprecated                                                | ❌                    |
| Song Preview File          | ✅                      | ❌                                                           | ❌                    |
| Base Environment           | ❌                      | ✅                                                           | ⚠️ No 360 environment |
| Environment List           | ✅                      | ✅                                                           | ❌                    |
| Color Scheme List          | ⚠️ Use hex string       | ⚠️ Has toggle override                                       | ❌                    |
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

|                                        | v4 (4.0.0)                   | v3 (3.3.0)               | v2 (2.6.0)                          | v1 (1.5.0)                          |
| -------------------------------------- | ---------------------------- | ------------------------ | ----------------------------------- | ----------------------------------- |
| BPM Event                              | ❌ Uses v4 Audio Data        | ⚠️ Part of basic event\* | ⚠️ Part of basic event\*            | ❌                                  |
| Color Note                             | ✅                           | ✅                       | ⚠️ No angle offset                  | ⚠️ No angle offset                  |
| Bomb Note                              | ⚠️ No direction              | ⚠️ No direction          | ✅                                  | ✅                                  |
| Arc                                    | ✅                           | ✅                       | ⚠️ Unused                           | ❌                                  |
| Chain                                  | ✅                           | ✅                       | ❌                                  | ❌                                  |
| Obstacle                               | ✅                           | ✅                       | ⚠️ No type                          | ⚠️ No type                          |
| Rotation Event                         | ✅                           | ✅                       | ⚠️ Fixed value; part of basic event | ⚠️ Fixed value; part of basic event |
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

|                            | v4 (4.0.0)                            | v2 (2.1.0)                                               | v1 (1.0.0)            |
| -------------------------- | ------------------------------------- | -------------------------------------------------------- | --------------------- |
| Audio Data File            |                                       | ⚠️ Exist as BPMInfo.dat; not required                    | ❌                    |
| Audio LUFS                 |                                       | ❌                                                       | ❌                    |
| Audio Offset               | ❌                                    | ⚠️ Exist; unused                                         | ❌                    |
| Audio Shuffle              | ❌                                    | ⚠️ Exist; unused                                         | ❌                    |
| Song Preview File          |                                       | ❌                                                       | ❌                    |
| Base Environment           | ❌ Uses first instance of environment |                                                          | ⚠️ Ignore missing 360 |
| Environment List           |                                       |                                                          | ❌                    |
| Color Scheme List          | ⚠️ Gracefully convert hex             | ⚠️ Exist toggle override                                 | ❌                    |
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

|                                        | v4 (4.0.0)                   | v3 (3.3.0)                                         | v2 (2.6.0)                                | v1 (1.5.0)                                |
| -------------------------------------- | ---------------------------- | -------------------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| BPM Event                              | ❌ Uses v4 Audio Data        |                                                    |                                           | ❌                                        |
| Color Note                             |                              |                                                    | ⚠️ Reinterpret as modded value            | ⚠️ Reinterpret as modded value            |
| Bomb Note                              | ⚠️ Ignored direction         | ⚠️ Ignored direction                               |                                           | ⚠️ Ignored direction                      |
| Arc                                    |                              |                                                    | ⚠️ Exist; unused                          | ❌                                        |
| Chain                                  |                              |                                                    | ❌                                        | ❌                                        |
| Obstacle                               |                              |                                                    | ⚠️ Pos Y and height interpreted from type | ⚠️ Pos Y and height interpreted from type |
| Rotation Event                         |                              |                                                    | ⚠️ Reinterpret as modded value            | ⚠️ Reinterpret as modded value            |
| Waypoint                               | ❌ All below in v4 Lightshow |                                                    |                                           | ❌                                        |
| Basic Event                            | ❌                           |                                                    |                                           | ⚠️ Default float value of 1               |
| Color Boost Event                      | ❌                           |                                                    |                                           |                                           |
| FX Event Box Group                     | ❌                           |                                                    | ❌                                        | ❌                                        |
| Light Color Event Box Group            | ❌                           | ⚠️ Easing and previous interpreted from transition | ❌                                        | ❌                                        |
| Light Rotation Event Box Group         | ❌                           |                                                    | ❌                                        | ❌                                        |
| Light Translation Event Box Group      | ❌                           |                                                    | ❌                                        | ❌                                        |
| Event Types for Keywords               | ❌                           |                                                    |                                           | ❌                                        |
| Use Normal Events as Compatible Events | ❌                           |                                                    | ❌                                        | ❌                                        |

\* BPM events are not affected nor added by v4 Info/Audio Data

### Lightshow

|                                        | v4 (4.0.0) | v3 (3.x.x) |
| -------------------------------------- | ---------- | ---------- |
| Waypoint                               |            | ❌         |
| Use Normal Events as Compatible Events |            | ❌         |

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
