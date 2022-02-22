# Beat Saber Deno

General-purpose Beat Saber scripting library, complete with type-check, auto-completion, and suggestions.

## Features

-   **Zero-dependency:** No external library used and no bloated file in the working folder.
-   **Mod Compatible:** Chroma, Noodle Extensions, and Mapping Extensions is supported out of the box.

## Prerequisite

-   Deno 1.19.0
-   Basic JavaScript or TypeScript knowledge

## Getting Started

To get started, check out the [example folder](https://github.com/KivalEvan/BeatSaber-MappingScript/tree/main/deno/example) for templates you can use.
Deno by nature caches the module upon first execution, and will never be updated after. This mean you can continue working on the script regardless of connection and will not break the existing code regardless of newly released update until explicitly updating it.

The bare minimum example:

```ts
import * as bsmap from 'https://raw.githubusercontent.com/KivalEvan/BeatSaber-MappingScript/main/deno/mod.ts';

const data = bsmap.load.difficultySync('ExpertPlusStandard.dat');
bsmap.save.difficultySync(data, 'ExpertPlusStandard.dat');
```

If you are using the script outside of map directory, you can specify the map directory without the need to explicitly apply on IO function. This can be any valid path as long as it points to directory.

```ts
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/YOUR_MAP_FOLDER/';
```

## Usage

Run the script by running this command in terminal `deno run yourscriptpath.ts`.  
For more advanced use, you may do `deno run --allow-read --allow-write --watch yourscriptpath.ts`.

For further explanation over on [Deno Manual](https://deno.land/manual).

If you're having issue of not being able to retrieve module on import, cache the module to fix it. To cache or reload the module, run `deno cache --reload yourscriptpath.ts` and restart Deno server if necessary.

## Beginner Tips

-   You can find all properties from an object with autocomplete suggestions `CTRL+Space`.
