# Beat Saber Deno

General-purpose Beat Saber beatmap scripting module using [Deno](https://deno.land/) with
[TypeScript](https://www.typescriptlang.org/), fully-typed schema and flexible tool designed to ease
scripting development surrounding beatmap.

---

> ⚠️ Work in progress. Breaking changes is to be expected. To be honest, would've started with v0.x
> but it was usable and complete from the start with more features added on top.

---

## Features

- **Zero-dependency:** No third-party module used in main with standard module being an exception.
- **Latest Schema:** Supports all official schema including modded.
  - Current schema version is v1.5.0, v2.6.0 and v3.2.0.
- **Wrapper Attribute:** Readable and cross-version class attribute for seamless version
  transferring.
- **Partial Creation:** Define beatmap object partially and let default fill the rest of fields.
- **Mod Compatible:** Chroma, Cinema, Noodle Extensions, and Mapping Extensions is supported out of
  the box.
  - All helpers and classes (excluding method) around modded is only available in extensions
    category.
- **Modularity:** Import only what you need, be it classes, functions, and types.
- **Built-in Utility:** Relevant utilities including math, colour, easings, and more.
- **Validator & Optimiser:** Customisable tool ensuring beatmap schema is valid to the game and
  optimised.

## Prerequisite

- Deno 1.34.0 or latest
- Basic JavaScript or TypeScript knowledge
  - Module is entirely TypeScript, but for common use case you do not need in-depth knowledge.

## Getting Started

To get started, check out the [example folder](./example) for templates you can use and read
[the guide](./example/README.md) for more detail.

The bare minimum example:

```ts
import * as bsmap from 'https://deno.land/x/bsmap@1.4.0/mod.ts';

const data = bsmap.load.difficultySync('ExpertPlusStandard.dat', 3);

// ... code to modify difficulty data

bsmap.save.difficultySync(data);
```

**NOTE:** Recommended to use `https://deno.land/x/bsmap@version/mod.ts` to lock version to ensure
the script works without breaking from newer update. For rolling release, visit
[GitHub Repo](https://github.com/KivalEvan/BeatSaber-Deno) and import raw file directly from there
(`https://raw.githubusercontent.com/KivalEvan/BeatSaber-Deno/main/mod.ts`), you may need to
occasionally add `--reload` tag for latest update.

You may also clone the module and import it locally to make any modification as you wish.

If you are using the script outside of map directory, you can specify the map directory without the
need to explicitly apply `directory` on IO function. This can be any valid directory as long as it
points to directory.

```ts
bsmap.globals.directory = '/PATH/TO/YOUR/BEAT_SABER/MAP_FOLDER/';
```

## Usage

Run the script by running this command in terminal `deno run yourscriptpath.ts`. For more advanced
use, you may do `deno run --allow-read --allow-write --watch yourscriptpath.ts` to automatically
allow for read and write while watching for change in script.

For further explanation, see [Deno Manual](https://deno.land/manual).

**To first timer:** Make sure to initialise Deno workspace before using the script. If you encounter
import error, you can ignore and run the (empty) script then it will automatically fetch the URL for
you. Alternatively, `Alt+.` on the error message may reveal fix problem solution. If you are having
issue of not being able to retrieve module, then cache or reload the module to fix it. To reload or
cache the module, run `deno cache --reload yourscriptpath.ts` and restart Deno server if necessary.
If it still does not work, change to a different workspace.

If you are using GitHub version and want to update to newer version, simply run
`deno run --reload yourscriptpath.ts`; do note that it may break existing part of your code that
utilises the module.

## Contributing

If you wish to contribute, do follow the guidelines. Make pull request for feature
addition/enhancement/fix or create an issue if you encounter error/problem or want an improvement.

### Guidelines

- Use `deno fmt` for standard formatting.
  - Do not change `deno.json` configuration.
- File names shall use camel case.
- Exported types, interfaces, fields, and functions should be accompanied by JSDoc comment right
  above its definition.
  - Function/method should provide usage example.
- Top-level function shall use regular function.
- No third-party dependencies shall be used outside of examples, extensions, and tests. (Exception
  when absolutely necessary is Deno standard module)
- Avoid circular imports.

## Planned

- General clean-up and restructuring (this has grown far larger than I anticipated)
- Write JSDoc on every important bit
- Add more helper for Chroma and Noodle Extensions
- Observable/decorator for class array

## Known Issue

- Instantiating nested object or array depends on the property and does not allow mix-and-match
  - However, it can still process like normally if you choose to ignore the error
- Info `addMap` method is incomplete

## Credits

- [HSV conversion algorithm](https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c)
- [CIE-L\*ab and Delta E2000 algorithm](https://www.easyrgb.com/)
- Uninstaller and Qwasyx (improving it) for note swing detection algorithm
- Top_Cat for math guidance
- Others for helpful feedback & indirect contribution
