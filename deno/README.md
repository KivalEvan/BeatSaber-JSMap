# Beat Saber Deno

General-purpose Beat Saber scripting library, complete with type-check,
auto-completion, and suggestions.

## Features

-   **Zero-dependency:** No external library used and no bloated file in the working folder.
-   **Mod Compatible:** Chroma, Noodle Extensions, and Mapping Extensions is supported out of the box.

## Getting Started

To get started, check the `example` folder for template you can use.

The bare minimum example:

```ts
import * as bsmap from 'https://raw.githubusercontent.com/KivalEvan/BeatSaber-MappingScript/main/deno/mod.ts';

const data = bsmap.load.difficultySync('ExpertPlusStandard.dat');
bsmap.save.difficultySync(data, 'ExpertPlusStandard.dat');
```

If you are using the script outside of map directory, you can specify the map directory without the need to explicitly apply on IO function. This can be any valid path as long as it points to directory.

```ts
bsmap.settings.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/YOUR_MAP_FOLDER/';
```

## Usage

Run the script by using this command in terminal
`deno run --allow-read --allow-write --watch yourscriptpath.ts`. Alternatively,
if you're adventurous, you can run unsafe using `-A` flag which allows all
permissions and enables features similar to Node.js.

For further flag explanation:

-   `--allow-read` allows script to read file.
-   `--allow-write` allows script to write file.
-   `--watch` run the script for every changes made (typically upon saving).

If you're having issue of not being able to retrieve module on import, cache the
module to fix it. To cache or reload the module, run
`deno cache --reload yourscriptpath.ts` and restart Deno server if necessary.

## Tips

-   You can find all properties from an object with autocomplete suggestions `CTRL+Space`.
