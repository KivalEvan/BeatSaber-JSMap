# Guide

The following is a guide on how to use Beat Saber JS Map, referred as `bsmap` for simpler term. If
you are familiar with basic JavaScript or new to TypeScript, this should be very familiar as it is
about what you expect it to do like a regular scripting. This does not cover everything but enough
to get good grasp at what it does.

For this guide, I will be using `Deno` as my main workflow. Generally, it should be the same across
any other runtime, only differences is the import.

## Examples

You may refer to example script if you need more glimpse on how to use them. Alternatively, check
out [my mapping scripts](https://github.com/KivalEvan/BeatSaber-MappingScript) to see how I would
use them.

## Importing

Create a `.ts` script file anywhere, be it desktop, map folder, or any dedicated place, and simply
add the following on top of the script. No additional file or setup needed, it just works.

```ts
// be sure to check for latest version on 'bsmap@version'
// for Deno:
import * as bsmap from 'jsr:@kvl/bsmap'; // remove `jsr:` prefix if using `deno add` command

// for anything else:
import * as bsmap from 'bsmap'; // via NPM or import map

// for CJS:
const bsmap = require('bsmap');
```

> [!NOTE]
>
> Removing `jsr:` and using `deno add` or similar introduces import map file, which you may or may
> not want to have if you are working on same directory as beatmap.

## Migration

Read this section before you migrate to version 3.0.0.

### Schema serialization

Schema modules no longer export schema-container objects. The public API no longer exports
`ISchemaContainer` or the version-prefixed `V1...Container`, `V2...Container`, `V3...Container`, and
`V4...Container` aliases.

The v4 data-container types, such as `IV4ColorNoteContainer`, remain available.

Replace container method calls with standalone functions. Import functions from a versioned schema
subpath, or use the version-prefixed aliases from `@kvl/bsmap/schema`.

Before:

```ts
import { V4ColorNoteContainer } from '@kvl/bsmap/schema';

const serial = V4ColorNoteContainer.serialize(note);
const wrapper = V4ColorNoteContainer.deserialize(serial);
```

After:

```ts
import { deserializeV4ColorNote, serializeV4ColorNote } from '@kvl/bsmap/schema';

const serial = serializeV4ColorNote(note);
const wrapper = deserializeV4ColorNote(serial);
```

The old `infoSchemaMap`, `audioDataSchemaMap`, `difficultySchemaMap`, and `lightshowSchemaMap` maps
are replaced by direction-specific maps. Use these exported names:

- Serializer maps: `infoSerializerMap`, `audioDataSerializerMap`, `difficultySerializerMap`, and
  `lightshowSerializerMap`.
- Deserializer maps: `infoDeserializerMap`, `audioDataDeserializerMap`, `difficultyDeserializerMap`,
  and `lightshowDeserializerMap`.

These maps are exported from the root package.

### Number formatting

`formatNumber` is removed. The old helper grouped the integer part of `number.toString()` and kept
the fractional text unchanged.

Use the built-in `Intl.NumberFormat` for grouped output:

```ts
const formatNumber = new Intl.NumberFormat('en-US', {
   maximumFractionDigits: 20,
}).format;

formatNumber(12345678); // '12,345,678'
```

The default formatter rounds to three fractional digits. Set `maximumFractionDigits` when you need
more fractional digits. Select another locale when you need different separators.

### Version lookup

`retrieveVersion` returns the raw version value as `unknown`. It returns the own `_version` value
first, then the own `version` value, and returns `undefined` when neither key exists.

This precedence differs from the old nullish fallback. The old function returned a string or `null`.
The new function keeps `null`, non-string values, and an own `_version` value of `undefined`:

```ts
retrieveVersion({ _version: null, version: '2.0.0' }); // null
retrieveVersion({ _version: 42, version: '2.0.0' }); // 42
retrieveVersion({}); // undefined
```

Validate string values with `parseMajorVersion` before you use the major version:

```ts
const rawVersion = retrieveVersion(json);
if (typeof rawVersion !== 'string') {
   throw new TypeError('Expected a version string');
}

const majorVersion = parseMajorVersion(rawVersion);
if (majorVersion === undefined) {
   throw new Error('Malformed version');
}
```

## Namespaces

Due to expansive library, namespace is used to separate functionality on their own area. Object
destructuring can be used to obtain certain variables and functions. Helpful tip, use `CTRL+Space`
to show list of available variables and functions.

```ts
import { deepCopy, pRandom } from '@kvl/bsmap';
```

List of available namespaces from root are `globals`, `logger`, and `types`. Nested namespace is to
be expected on an obscure area.

## Loading & Saving

To load & save the beatmap, a function is used to parse, validate, and optimise the respective info
and difficulty file.

```ts
const info = readInfoFileSync(); // not required

// undefined version, return base wrapper attribute
// can be either version 1, 2, 3 or 4
// pass it to isV4 or similar function for type predicate
const data = readDifficultyFileSync('HardStandard.dat');

// explicit version, return (and convert to) difficulty version
await readDifficultyFile('ExpertStandard.dat', 2, {
   directory: '/somewhere/else',
}).then(() => {
   /* do something */
}); // advanced use
```

```ts
writeInfoFileSync(info);

writeDifficultyFileSync(data);
await writeDifficultyFile(data2, {
   directory: '/somewhere/else',
   filePath: 'overrideName.dat',
}); // advanced use
```

Difficulty filename is saved directly in beatmap attribute, as with info, lightshow, and any other
writable object, and can be changed.

```ts
data.filename = 'ExpertPlusStandard.dat';
```

If you happen to use the script outside of map folder, you can do the following before loading the
source folder and saving to target the folder. You may change this anytime whenever necessary.

```ts
globals.directory = './YOUR/MAP/FOLDER/PATH/';
```

> [!IMPORTANT]
>
> Directory and file path will be overridden if explicitly provided in one of the following load and
> save functions.

> [!TIP]
>
> **To new coder:** Windows typically uses `\` instead of `/` in path, this actually means escape
> character in programming world and would result in error. You may need to change the slash or
> escape character.

## Beatmap Objects

Use primitive `IWrap*` objects for beatmap data. The `create*` factories create these objects with
default values. Read and load functions already return primitive objects. Do not wrap their results
for normal editing, conversion, saving, patching, or extension use.

### Create and Edit Objects

Import the `wrapper` namespace to create primitive objects. Then assign properties and add objects
to the relevant array.

```ts
import { wrapper } from 'jsr:@kvl/bsmap/schema';

const note: wrapper.IWrapColorNote = wrapper.createColorNote({
   time: 2,
   posX: 1,
   posY: 0,
});
note.direction = 8;
data.difficulty.colorNotes.push(note);

const event = wrapper.createBasicEvent({ time: 2, type: 1, value: 3 });
data.lightshow.basicEvents.push(event);
```

Factories accept partial data and fill omitted fields with defaults. Create each object before you
put it into an array. This prevents accidental reuse of the same object reference.

### Copy Objects

Use `deepCopy` when you need an independent copy, including its custom data.

```ts
const original = wrapper.createColorNote({ time: 1 });
const cloned = deepCopy(original);
cloned.time = original.time + 4;
cloned.direction = 8;
cloned.customData.color = [1, 1, 1];
```

### Optional Class Adapters

Class adapters remain available when you need their methods. Import them from `extensions/core`, not
from the root package or `beatmap/core`.

```ts
import { ColorNote } from 'jsr:@kvl/bsmap/extensions/core';

const note = ColorNote.createOne({ time: 2 });
note.setAngleOffset(15);
data.difficulty.colorNotes.push(note);
```

This is a breaking import-path change. `LightMapper` is not part of `extensions/core`.

## Constants

The library provide constant variables in form of `PascalCase` or `SCREAMING_SNAKE_CASE` that can be
used to make your script slightly more readable but it is not necessarily needed.

```ts
const note = wrapper.createColorNote({
   time: 24,
   color: NoteColor.RED,
   direction: NoteDirection.ANY,
   posX: PositionX.MIDDLE_LEFT,
   posY: PositionY.BOTTOM,
});

data.lightshow.basicEvents.push(
   wrapper.createBasicEvent({
      time: 10,
      type: EventType.BACK_LASERS,
      value: EventLightValue.WHITE_FADE,
   }),
);
```

## Extensions

Extensions provide helpers for modcharting and other tasks through individual package subpaths. The
`heck` subpath includes Chroma, Noodle Extensions, and Vivify helpers.

```ts
import * as heck from '@kvl/bsmap/extensions/heck';
import * as selector from '@kvl/bsmap/extensions/selector';
```

## Patch

This module is not included as it is very rarely used and unstable. It contains functions to attempt
fix and alter beatmap objects that were potentially broken or contain incompatible data.

```ts
import * as patch from '@kvl/bsmap/patch';
```

## Addendum

### Dependency/Modular File

If you happen to work on multiple script files or has centralised folder for map scripting, a
dependency file can be used. Similarly, you can break your script into multiple file for modularity
purpose.

```ts
// deps.ts
export * from '@kvl/bsmap';
export * as heck from '@kvl/bsmap/extensions/heck';
export * as selector from '@kvl/bsmap/extensions/selector';
```

```ts
// map.ts
import * as bsmap from './deps.ts';
import { readDifficultyFileSync, types } from './deps.ts';
```

### Typing

Static type is an incredibly powerful tool that can ensure type correctness of an object. This is
used extensively in the library and is encouraged to explore further into it by utilising type
casting. This is an intermediate knowledge of TypeScript but should be relatively easy to grasp.

```ts
const events = [
   { color: 2 },
   { time: 0.25, brightness: 0, easing: 1 },
] as Partial<types.wrapper.ILightColorEvent>[];
data.lightshow.lightColorEventBoxGroups.push(
   wrapper.createLightColorEventBoxGroup({ boxes: [{ events }] }),
);
```

### Logger

Contrary to popular belief, this is simply an output logging that can be controlled by level. This
can show and hide logging based on level.

```ts
bsmap.setupLogger(new bsmap.Logger());
const logger = getLogger();

logger.setLevel(0); // completely hidden logging
bsmap.readDifficultyFileSync('Test.dat');

logger.setLevel(5); // trace mode logging
bsmap.readDifficultyFileSync('Test.dat');

logger.setLevel(3); // default info logging
```

### Classic Scripting

If you prefer to script the old-fashioned way but would like to keep strong-typed schema, it is
possible but you may lose the ability to use certain utilities built around it.

```ts
// safe way - processed data
const difficultyJSON1 = saveDifficulty<types.v3.IDifficulty>(
   readDifficultyFileSync('ExpertPlusStandard.dat', 3),
   3,
);
// unsafe way - raw data
const difficultyJSON2 = JSON.parse(
   readTextFileSync('ExpertPlusStandard.dat'),
) as types.v3.IDifficulty;
```

### Practices

There is neither correct nor best way to do scripting, but there are several caveats when using this
module especially surrounding data modification with references (Object, Array, etc.). Whichever
approach or paradigm you may use, it is the way it is for broader approach and "unopinionated"
without trying to be too strict on certain standards.

These practices are something you should be aware of, and it should be a second nature once you get
used to it. Not that I am advocating for these practices, but by design the module behave exactly as
you would with vanilla JS/TS scripting, so the skill is transferrable even if you do not agree with
it.

#### Object Data Transferring

If you are unfamiliar with OO programming language, almost everything in this module is an object,
meaning that you may encounter reference issue or different object inheritance behaviour. This mean
that transferring array from one to another place will cause side-effects from mutations (changing
thing in array affects another) or unexpected class behaviour being in the wrong place.

##### Object Referencing

If you plan to modify the object after transferring an object, be aware of reference issue that may
cause side-effect on 2 or more difficulty using the same object. There are advantages with current
behaviour (such as performance), but overall it is very easy to make this mistake. If you perfectly
understood what you are doing, you can ignore this.

```ts
const lightshow = readDifficultyFileSync('Lightshow.dat', 3);
const map = readDifficultyFileSync('ExpertStandard.dat', 3);

// DON'T - 1
map.lightshow.basicEvents = lightshow.lightshow.basicEvents;
map.lightshow.basicEvents.push(wrapper.createBasicEvent({})); // this affects lightshow

// DON'T - 2
map.lightshow.basicEvents = [...lightshow.lightshow.basicEvents];
map.lightshow.basicEvents[0].value = 1; // this also affects lightshow
map.lightshow.basicEvents.push(wrapper.createBasicEvent({})); // lightshow array is unaffected

// DO - 1
map.lightshow.basicEvents = deepCopy(lightshow.lightshow.basicEvents);
```
