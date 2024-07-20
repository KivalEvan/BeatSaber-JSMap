# Beat Saber Beatmap Schema

Current schema as of game version 1.37.1.

> [!NOTE] Work-In-Progress: Will be further expanded.

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
non-vanilla value to and from Mapping Extensions value upon serialisation and deserialisation for
compatibility reason. This may cause issue for beatmap that uses invalid data value or abuses the
quirk of the game. However, if you find anything that are not supposed to break or modified when
using this module, please do report them.

## Differences

The following only describe the features available within each version schema.

Legend:

- ✅ : Compatible
- ⚠️ : Partial (require interpretation or mods)
- ❌ : Incompatible

### Info

|                            | v4 (4.0.0)              | v2 (2.1.0)                                                  | v1 (1.0.0)           |
| -------------------------- | ----------------------- | ----------------------------------------------------------- | -------------------- |
| Audio Data File            | ✅                      | ⚠️ Exist as BPMInfo.dat; not required                        | ❌                   |
| Audio LUFS                 | ✅                      | ❌                                                          | ❌                   |
| Audio Offset               | ❌                      | ⚠️ Deprecated; buggy feature                                 | ❌                   |
| Audio Shuffle              | ❌                      | ⚠️ Deprecated                                                | ❌                   |
| Song Preview File          | ✅                      | ❌                                                          | ❌                   |
| Base Environment           | ❌                      | ✅                                                          | ⚠️ No 360 environment |
| Environment List           | ✅                      | ✅                                                          | ❌                   |
| Color Scheme List          | ✅                      | ⚠️ Has toggle override                                       | ❌                   |
| Beatmap Level Author       | ✅                      | ⚠️ Singular string, exist on root; apply to all difficulties | ❌                   |
| Beatmap Characteristic     | ✅                      | ⚠️ Grouped                                                   | ✅                   |
| Beatmap Environment Index  | ✅                      | ✅                                                          | ❌                   |
| Beatmap Color Scheme Index | ✅                      | ✅                                                          | ❌                   |
| Beatmap Lightshow File     | ✅ Only with v4 Beatmap | ❌                                                          | ❌                   |

### Audio Data

|                | v4 (4.0.0) | v2 (2.0.0) |
| -------------- | ---------- | ---------- |
| Audio Checksum | ✅         | ❌         |
| LUFS           | ✅         | ❌         |

### Difficulty

|                                        | v4 (4.0.0)                   | v3 (3.3.0) | v2 (2.6.0)                               | v1 (1.5.0)                               |
| -------------------------------------- | ---------------------------- | ---------- | ---------------------------------------- | ---------------------------------------- |
| BPM Event                              | ❌ Uses v4 Audio Data        | ✅\*       | ✅\*                                     | ❌                                       |
| Color Note                             | ✅                           | ✅         | ⚠️ No angle offset                        | ⚠️ No angle offset                        |
| Bomb Note                              | ✅                           | ✅         | ⚠️ Has direction                          | ⚠️ Has direction                          |
| Arc                                    | ✅                           | ✅         | ❌ Exist but not used                    | ❌                                       |
| Chain                                  | ✅                           | ✅         | ❌                                       | ❌                                       |
| Obstacle                               | ✅                           | ✅         | ⚠️ Pos Y and height interpreted from type | ⚠️ Pos Y and height interpreted from type |
| Rotation Event                         | ✅                           | ✅         | ⚠️ Fixed value                            | ⚠️ Fixed value                            |
| Waypoint                               | ❌ All below in v4 Lightshow | ✅         | ✅                                       | ❌                                       |
| Basic Event                            | ❌                           | ✅         | ✅                                       | ⚠️ No float value                         |
| Color Boost Event                      | ❌                           | ✅         | ✅                                       | ✅                                       |
| FX Event Box Group                     | ❌                           | ✅         | ❌                                       | ❌                                       |
| Light Color Event Box Group            | ❌                           | ✅         | ❌                                       | ❌                                       |
| Light Rotation Event Box Group         | ❌                           | ✅         | ❌                                       | ❌                                       |
| Light Translation Event Box Group      | ❌                           | ✅         | ❌                                       | ❌                                       |
| Event Types for Keywords               | ❌                           | ✅         | ✅                                       | ❌                                       |
| Use Normal Events as Compatible Events | ❌                           | ✅         | ❌                                       | ❌                                       |

\* BPM event are not affected nor added by v4 Info/Audio Data

### Lightshow

|                                        | v4 (4.0.0) | v3 (3.x.x) |
| -------------------------------------- | ---------- | ---------- |
| Waypoint                               | ✅         | ❌         |
| Use Normal Events as Compatible Events | ✅         | ❌         |

## Unused

The following are removed or not used:

- v1
  - Info
    - No longer supported since the introduction of v2
  - Difficulty
    - No longer supported since the introduction of v2
- v3
  - Lightshow
    - Exist in game binary; unused
