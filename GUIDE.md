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

// undefined version, return base wrapper class
// can be either version 1, 2, 3 or 4
// pass it to isV4 or similar function for type predicate
// or use `instanceof` operator
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

Difficulty filename is saved directly in beatmap class, as with info, lightshow, and any other
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

## Beatmap Object

All beatmap object is a class object as opposed to regular JSON object. This mean most array and
object will only accept class object. This enables extensive method and functionality to be used
directly from class object. Custom data is always available and require no checking if exist.

### Creation

Each beatmap object including difficulty can be constructed using regular constructor or using
static method `create` which allows you to instantiate one or more objects. Partial or no data can
be used to instantiate an object and will use default value to fill the empty spot. This method
always return object(s) in an array with an exception being object that is not placed in array such
as difficulty and index filter. Alternatively, if you prefer just a single object instantiation, you
may use constructor method.

```ts
const bomb = BombNote.create(); // [bombData]
const event = new BasicEvent(); // eventData
const notes = ColorNote.create(
   {},
   {
      time: 2,
      posX: 1,
      posY: 0,
   },
); // [noteData1, noteData2]
data.colorNotes.push(...notes);
```

Difficulty class has a built-in method that allows instantiating of an object directly and insert
into an array. This creates a new object instead of reusing existing object.

```ts
data.addBasicEvents({ time: 2, type: 1, value: 3 }, {});
data.addBasicEvents(...events);
```

### Cloning

In modcharting, cloning is often used to create certain effect. This method can be used to clone an
existing object without referencing the original.

```ts
const original = ColorNote.create()[0];
const cloned = original.clone(); // new object with same property as original without reference
```

### Method Chaining

One liner or method chaining can be proven powerful in certain case scenarios.

```ts
const clones = notes.map((n) =>
   n
      .clone()
      .setTime(n.time + 4)
      .setDirection(8)
      .addCustomData({ color: [1, 1, 1] })
);
```

## Constants

The library provide constant variables in form of `PascalCase` or `SCREAMING_SNAKE_CASE` that can be
used to make your script slightly more readable but it is not necessarily needed.

```ts
const note = new ColorNote({
   time: 24,
   color: NoteColor.RED,
   direction: NoteDirection.ANY,
   posX: PositionX.MIDDLE_LEFT,
   posY: PositionY.BOTTOM,
});

data.addBasicEvents({
   time: 10,
   type: EventType.BACK_LASERS,
   value: EventLightValue.WHITE_FADE,
});
```

## Extensions

This module is not available directly from main import as it is heavy, unstable, and make use of
third-party library. This provides plentiful of helpers that may be useful for modcharting and many
other purposes.

```ts
import { chroma, ne, selector } from '@kvl/bsmap/extensions';
```

If you wish to import all of them, do as following:

```ts
import * as ext from '@kvl/bsmap/extensions';
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
export * as ext from '@kvl/bsmap/extensions';
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
data.addLightColorEventBoxGroup({ boxes: [{ events: events }] });
```

### Logger

Contrary to popular belief, this is simply an output logging that can be controlled by level. This
can show and hide logging based on level.

```ts
bsmap.logger.setLevel(5); // completely hidden logging
bsmap.readDifficultyFileSync('Test.dat');

bsmap.logger.setLevel(0); // verbose mode logging
bsmap.readDifficultyFileSync('Test.dat');

bsmap.logger.setLevel(2); // default info logging
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
map.basicEvents = lightshow.basicEvents;
map.addBasicEvents({}); // this affects lightshow array

// DON'T - 2
map.basicEvents = [...lightshow.basicEvents];
map.basicEvents[0].value = 1; // this also affects lightshow
map.addBasicEvents({}); // however, lightshow array is unaffected

// DO - 1
map.basicEvents = lightshow.basicEvents.map((e) => e.clone()); // this correctly copies the class object

// DO - 2
map.addBasicEvents(...lightshow.basicEvents);
```
