# Beat Saber Deno

General-purpose Beat Saber beatmap scripting module using [Deno](https://deno.land/) with
[TypeScript](https://www.typescriptlang.org/), fully-typed schema and flexible tool to ease
scripting development surrounding beatmap.

It is designed to be simple and familiar with traditional scripting with barely hidden layer of
abstraction. It is optimised for speed with minimal compromise allowing for faster work iteration.

> [!WARNING]
>
> API changes, structural changes, or game updates that require restructuring may result in breaking
> changes in future update. Many work has been placed in order to minimise the breakage on minor
> version update.

## Features

- **Zero-dependency:** No third-party module used in main with standard module being an exception.
- **Latest Schema:** Supports all official schema including modded.
  - Current schema version is v1.5.0, v2.6.0, v3.3.0 and v4.0.0.
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
  optimised for storage.

## Prerequisite

- Deno 1.34.0 or latest
- Basic JavaScript or TypeScript knowledge
  - Module is entirely TypeScript, but for common use case you do not need in-depth knowledge.

## Getting Started

To get started, simply create a `.ts` file anywhere, preferably inside map folder for simpler setup,
and import the module. That's it, no installation needed. Do check out the
[example folder](./example) for templates you can use and read [the guide](./example/README.md) for
more detail.

The bare minimum example:

```ts
// ./Beat Saber/Beat_Saber Data/CustomWIPLevels/MAP_FOLDER/script.ts
import * as bsmap from 'https://deno.land/x/bsmap@1.6.0/mod.ts';

const data = bsmap.load.difficultySync('ExpertPlusStandard.dat', 4);

// ... code to modify difficulty data

bsmap.save.difficultySync(data);
```

> [!TIP]
>
> Recommended to lock version to ensure the script works without breaking from newer update. For
> rolling release, visit [GitHub Repo](https://github.com/KivalEvan/BeatSaber-Deno) and import raw
> file directly from there
> (`https://raw.githubusercontent.com/KivalEvan/BeatSaber-Deno/main/mod.ts`), you may need to
> occasionally add `--reload` tag for latest update.

You may also clone the module to store and import locally, and make any modification as you wish.

If you are using the script outside of map directory, you can specify the map directory without the
need to explicitly apply `directory` on IO function. This can be any valid directory as long as it
points to directory.

```ts
bsmap.globals.directory = '/PATH/TO/YOUR/BEAT_SABER/MAP_FOLDER/';
```

## Usage

Run the script by running this command in terminal `deno run yourscriptpath.ts`. For more advanced
use, you may do, as an example, `deno run --allow-read --allow-write --watch yourscriptpath.ts` to
automatically allow for read and write while watching for change in script.

For further explanation, see [Deno Manual](https://deno.land/manual).

> [!NOTE]
>
> **For first timer:** Make sure to initialise Deno workspace before using the script. If you
> encounter import error, you can ignore and run the (empty) script then it will automatically fetch
> the URL for you. Alternatively, `Alt+.` on the error message may reveal fix problem solution. If
> you are having issue of not being able to retrieve module, then cache or reload the module to fix
> it. To reload or cache the module, run `deno cache --reload yourscriptpath.ts` and restart Deno
> server if necessary. If it still does not work, change to a different workspace.

If you are using GitHub version and want to update to newer version, simply run
`deno run --reload yourscriptpath.ts`; do note that it may break existing part of your code that
utilises the module.

## Contributing

If you wish to contribute, do follow the guidelines. Make pull request for feature
addition/enhancement/fix or create an issue if you encounter error/problem or want an improvement.

### Guidelines

#### Styling & Documentation

- Use `deno fmt` for standard formatting
  - Do not change `deno.json` configuration
- File names shall use camel case
- Exported types, interfaces, fields, and functions should be accompanied by JSDoc comment right
  above its definition
  - Function/method should provide usage example

#### Coding

- Top-level function shall use regular function
- No third-party dependencies shall be used outside of examples, extensions, and tests (Exception
  when absolutely necessary is Deno standard module)
- Avoid circular imports

## Planned

- General clean-up and restructuring (this has grown far larger than I anticipated)
- Write JSDoc on every important bit
- Add more helper for Chroma and Noodle Extensions
- Observable/decorator for class array (might lead to performance loss)
- Proper data optimisation approach

## Known Issue

- Using wrapper type to handle/modify data, while contain guard rail, can lead to unexpected result
  - This can only be a problem when dealing with multiple beatmap version at once
- Info `addMap` method is incomplete

## Credits

- [HSV conversion algorithm](https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c)
- [CIE-L\*ab and Delta E2000 algorithm](https://www.easyrgb.com/)
- Uninstaller and Qwasyx (improving it) for note swing detection algorithm
- Top_Cat for math guidance
- Others for helpful feedback & indirect contribution

## Maintainer Note

While it is true if I'm concerned about speed, I should just use other languages. But I'm also
concerned about constant iteration and accessibility for everyone, and that beatmap file is in JSON
format with optional props makes this far easier to handle than any other languages without any
weird syntax/method to learn. Memory is the least part of the problem here, at least within the
context of map scripting, it is a fair tradeoff. This makes the language the best choice for the
job. I may look into JavaScript conversion to further reduce compilation time on cold start.
