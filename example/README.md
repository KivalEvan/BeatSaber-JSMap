# Guide

The following is a guide on how to use Beat Saber Deno, referred as `bsmap` for simpler term. If you are familiar with basic JavaScript or new to TypeScript, this should be very familiar as it is about what you expect it to do like a regular scripting. This does not cover everything but enough to get good grasp at what it does.

## Examples

You may refer to example script if you need more glimpse on how to use them. Alternatively, check out [my mapping scripts](https://github.com/KivalEvan/BeatSaber-MappingScript) to see how I would use them.

## Importing

Create a `.ts` script file anywhere, be it desktop, map folder, or any dedicated place, and simply add the following on top of the script. No additional file or setup needed, it just works.

```ts
// be sure to check for latest version on 'bsmap@version'
import * as bsmap from 'https://deno.land/x/bsmap@1.2.2/mod.ts';
```

**NOTE:** for first time user, you may need to cache the URL if the error pops up on import. Hover over error and click on quick fix or `CTRL+.` on select. You may also need to initialise Deno workspace if strange error regarding TS URL pops up.

## Namespaces

Due to expansive library, namespace is used to separate functionality on their own area. Object destructuring can be used to obtain certain variables and functions. Helpful tip, use `CTRL+Space` to show list of available variables and functions.

```ts
import { load, save, v3, utils } from 'https://deno.land/x/bsmap@1.2.2/mod.ts';
const { random, deepCopy } = utils;
```

List of available namespaces from root are `load`, `save`, `v2`, `v3`, `utils`, `globals`, `convert`, `optimize`, `logger`, and `types`. Nested namespace is to be expected on an obscure area.

## Loading & Saving

To load & save the beatmap, a function is used to parse, validate, and optimise the respective info and difficulty file.

```ts
const info = load.infoSync(); // not required

const data = load.difficultySync('HardStandard.dat'); // auto convert to v3
const data2 = await load.difficulty('ExpertStandard.dat', 2, { directory: '/somewhere/else' }); // advanced use, use or convert to v2
```

```ts
save.infoSync(info);

save.difficultySync(data);
await save.difficulty(data2, { directory: '/somewhere/else', filePath: 'overrideName.dat' }); // advanced use
```

Difficulty file name is saved directly on difficulty class and can be changed, does not save the file name inside custom data.

```ts
data.fileName = 'ExpertPlusStandard.dat';
```

If you happen to use the script outside of map folder, you can do the following before loading the source folder and saving to target the folder. You may change this anytime whenever necessary.

```ts
globals.directory = './YOUR/MAP/FOLDER/PATH/';
```

**NOTE:** Windows typically uses `\` instead of `/` in path, this actually means escape character in programming and would result in error. You may need to change the slash or escape character.

**NOTE:** Directory and file path will be overridden if explicitly provided in one of the following load and save functions.

## Beatmap Object

All beatmap object is a class object as opposed to regular JSON object. This mean most array and object will only accept class object. This enables extensive method and functionality to be used directly from object. Custom data is always available and require no checking if exist.

### Creation

Each beatmap object including difficulty contain a static method `create` which allows you to instantiate one or more objects. Partial or no data can be used to instantiate an object and will use default value to fill the empty spot. This method always return object(s) in an array with an exception being object that is not placed in array such as difficulty and index filter.

```ts
const notes = v3.ColorNotes.create();
data.colorNotes.push(...notes);
```

Difficulty class has a built-in method that allows instantiating of an object directly and insert into an array. This also allows insertion of an already instantiated object.

```ts
data.addBasicEvents({ et: 3 }, { b: 2, et: 1, i: 3 }, {});
data.addBasicEvents(...events);
```

### Cloning

In modcharting, cloning is often used to create certain effect. This method can be used to clone an existing object without referencing the original.

```ts
const original = v3.ColorNotes.create()[0];
const cloned = original.clone(); // new object with same property as original
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

The library provide constant variables in form of `PascalCase` or `SCREAMING_SNAKE_CASE` that can be used to make your script slightly more readable but it is not necessarily needed.

```ts
const note = v3.ColorNotes.create({
    b: 24,
    c: NoteColor.RED,
    d: NoteDirection.ANY,
    x: PositionX.MIDDLE_LEFT,
    y: PositionY.BOTTOM,
})[0];

data.addBasicEvents({
    b: 10,
    et: EventType.BACK_LASERS,
    i: EventLightValue.WHITE_FADE,
});
```

## Extensions

This module is not available directly from main import as it is heavy, unstable, and make use of third-party library. This provides plentiful of helpers that may be useful for modcharting and many other purposes.

```ts
import * as chroma from 'https://deno.land/x/bsmap@1.2.2/extensions/chroma/mod.ts';
import * as NE from 'https://deno.land/x/bsmap@1.2.2/extensions/NE/mod.ts';
import * as selector from 'https://deno.land/x/bsmap@1.2.2/extensions/selector/mod.ts';
```

If you wish to import all of them, do as following:

```ts
import * as ext from 'https://deno.land/x/bsmap@1.2.2/extensions/mod.ts';
```

## Patch

This module is not included as it is very rarely used and unstable. It contains functions to attempt fix and alter beatmap objects that were potentially broken or contain incompatible data.

```ts
import * as patch from 'https://deno.land/x/bsmap@1.2.2/patch/mod.ts';
```

## Addendum

### Dependency File

If you happen to work on multiple script files or has centralised folder for map scripting, a dependency file can be used.

```ts
// deps.ts
export * from 'https://deno.land/x/bsmap@1.2.2/mod.ts';
export * as ext from 'https://deno.land/x/bsmap@1.2.2/extensions/mod.ts';
```

```ts
// map.ts
import * as bsmap from './deps.ts';
import { v3, types } from './deps.ts';
```

### Typing

Static type is an incredibly powerful tool that can ensure type correctness of an object. This is used extensively in the library and is encouraged to explore further into it by utilising type casting. This is an intermediate knowledge of TypeScript but should be relatively easy to grasp.

```ts
const event = [{ c: 2 }, { b: 0.25, s: 0, i: 1 }] as Partial<types.v3.LightColorBase>[];
data.addLightColorEventBoxGroup({ e: [{ e: event }] });
```

### Logger

Contrary to popular belief, this is simply an output logging that can be controlled by level. This can show and hide logging based on level.

```ts
bsmap.logger.setLevel(5); // completely hidden logging
bsmap.load.difficultySync('Test.dat');

bsmap.logger.setLevel(0); // verbose mode logging
bsmap.load.difficultySync('Test.dat');

bsmap.logger.setLevel(2); // default info logging
```

### Classic Scripting

If you prefer to script the old-fashioned way but would like to keep strong-typed schema, it is possible but you may lose the ability to use certain utilities built around it.

```ts
const difficulty = load.difficultySync('ExpertPlusStandard.dat').toJSON();
const difficultyJSON = JSON.parse(Deno.readTextFileSync('ExpertPlusStandard.dat')) as types.v3.IDifficulty; // unsafe
```
