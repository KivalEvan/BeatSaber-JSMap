# Beat Saber Deno

General-purpose Beat Saber scripting library, complete with type-check, auto-completion, and suggestions.

## Features

- **Zero-dependency:** No external library used and no bloated file in the working folder.
- **Mod Compatible:** Chroma, Noodle Extensions, and Mapping Extensions is supported out of the box.
- **Modularity:** All types, classes and functions are exposed allowing extendability for plugins.

## Prerequisite

- Deno 1.21.0 or latest
- Basic JavaScript or TypeScript knowledge
  - Library is entirely TypeScript, but for common use case you do not need in-depth knowledge.

## Important Update

`load.difficultyLegacy('difficulty.dat')` is removed in favour of `load.difficulty('difficulty.dat', 2)`. This will also
automatically convert map to a specific version when the loaded data is not the correct version. Loading beatmap v3 will
proceed as normally, but recommended to specify `3` as new beatmap version may exist in the future.

## Getting Started

To get started, check out the [example folder](./example) for templates you can use. Deno by nature caches the module
upon first execution, and will never be updated after. This mean you can continue working on the script regardless of
connection and will not break the existing code regardless of newly released update until explicitly updating it via
`--reload` flag.

The bare minimum example:

```ts
import * as bsmap from 'https://raw.githubusercontent.com/KivalEvan/BeatSaber-MappingScript/deno/mod.ts';

const data = bsmap.load.difficultySync('ExpertPlusStandard.dat');
bsmap.save.difficultySync(data, 'ExpertPlusStandard.dat');
```

You may also clone the library and import it locally, and make any modification as you wish.

If you are using the script outside of map directory, you can specify the map directory without the need to explicitly
apply on IO function. This can be any valid path as long as it points to directory.

```ts
bsmap.globals.path = 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/YOUR_MAP_FOLDER/';
```

## Usage

Run the script by running this command in terminal `deno run yourscriptpath.ts`. For more advanced use, you may do
`deno run --allow-read --allow-write --watch yourscriptpath.ts`. If you want to update to newer version, simply run
`deno run --reload yourscriptpath.ts`; Do note that it may break existing part of your code that utilises the library.

For further explanation over on [Deno Manual](https://deno.land/manual).

Deno related: if you're having issue of not being able to retrieve module on import, reload or cache the module to fix
it. To reload or cache the module, run `deno cache --reload yourscriptpath.ts` and restart Deno server if necessary. If
it still does not work, change to a different workspace.

## Beginner Tips

- You can find all properties from an object with autocomplete suggestions `CTRL+Space`.

## Planned

- Strip some of the features as plugin/extension allowing for modular and lightweight system
- Add more helper for Chroma and Noodle Extensions
- Overload function for less function clutter (but more complex)
- Bundle script
