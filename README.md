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

- **Zero-dependency:** No dependency, run on any platform.
- **Latest Schema:** Supports all official schema including modded.
  - Current schema version is v4.0.0, v3.3.0, v2.6.0, v1.5.0.
  - Backport minor version is not supported but can be done through custom postproccessing.
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

- Deno 1.40.0 or latest
- Basic JavaScript or TypeScript knowledge
  - Module is entirely TypeScript, but for common use case you do not need in-depth knowledge.

## Getting Started

To get started, simply create a `.ts` file anywhere, preferably inside map folder for simpler setup,
import the module and arbitrary code, then run the script. That's it, no installation needed. Do
check out the [example folder](./example) for templates you can use and read
[the guide](./example/README.md) for more detail.

The bare minimum example:

```ts
// ./Beat Saber/Beat_Saber Data/CustomWIPLevels/MAP_FOLDER/script.ts
import * as bsmap from 'https://deno.land/x/bsmap@2.0.0/mod.ts';

const data = bsmap.load.beatmapSync('ExpertPlusStandard.dat', 4);

// ... code to modify difficulty data

bsmap.save.beatmapSync(data);
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
- Interfaces that are exposed to user must use `I` prefix to indicate interface rather than
  instantiable object.

#### Coding

- Top-level function shall use regular function
- No third-party dependencies shall be used outside of examples, extensions, and tests (Exception
  when absolutely necessary is Deno standard module)
- Avoid circular imports

## Planned

- V2 rewrite plan
  - Strip `Deno` and other vendor specific, shim when necessary (compatibility at all cost)
    - Loading and saving should only take in `string` or `JSON` instead of reading/writing file
  - Restructure such that user does not need to worry about version specific case nor needing
    specific object version for specific structure
    - This may require tedious amount of revision
- NPM and JSR release
- General clean-up and restructuring (this has grown far larger than I anticipated)
- Write JSDoc on every important bit
- Add more helper for Chroma and Noodle Extensions
- Proper data optimisation approach while not sacrificing speed in the process

## Known Issue

- Using wrapper type to handle/modify data, while contain guard rail, can lead to unexpected result
  - This can only be a problem when dealing with multiple beatmap version at once
- Beatmap across different version contain different behaviour which can be confusing for anyone
  unfamiliar with beatmap structure
  - This can cause issue when handling multiple version of the map at the same time within the same
    body
  - Example being:
    - `v2` having both bomb note and color note in color note array as opposed to `v3` being
      separated
    - `v2` and `v3` having different attribute to handle pos Y & height, type, etc.
    - `v2` and `v3` custom position has different scaling, etc.
    - `v3` and `v4` light attribute behaviour change
  - May need documentation on the difference across version

## Credits & References

- [HSV conversion algorithm](https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c)
- [CIE-L\*ab and Delta E2000 algorithm](https://www.easyrgb.com/)
- Uninstaller and [Qwasyx](https://github.com/Qwasyx/) (improving it) for note swing detection
  algorithm
- [Top_Cat](https://github.com/Top-Cat/) for math guidance
- Others for helpful feedback & indirect contribution
