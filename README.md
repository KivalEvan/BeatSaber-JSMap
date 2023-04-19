# Beat Saber Deno

General-purpose Beat Saber beatmap scripting library using [Deno](https://deno.land/) with
[TypeScript](https://www.typescriptlang.org/), fully-typed schema and flexible tool designed to ease
scripting development surrounding beatmap while providing high implementation detail regarding the
beatmap. It ensures the safety and correctness of the code unless explicitly stated by the user, and
verify the beatmap integrity.

---

> ⚠️ Work in progress. Breaking changes is to be expected.

---

## Features

- **Zero-dependency:** No third-party library used in main with standard library being an exception.
- **Latest Schema:** Supports both latest beatmap v2 and v3 including conversion.
  - Current schema version is v2.6.0 and v3.2.0 respectively.
- **Partial Creation:** Define beatmap object partially and let default fill the rest of fields.
- **Mod Compatible:** Chroma, Noodle Extensions, and Mapping Extensions is supported out of the box.
  - All helpers and classes surrounding modded is only available in extensions category.
- **Modularity:** All types, functions, and classes are exposed allowing for more functionality.
- **Built-in Utility:** Relevant utilities including math, colour, easings, and more.
- **Validator & Optimiser:** Customisable tool ensuring beatmap schema is valid to the game and
  optimised.

## Prerequisite

- Deno 1.29.1 or latest
- Basic JavaScript or TypeScript knowledge
  - Library is entirely TypeScript, but for common use case you do not need in-depth knowledge.

## Getting Started

To get started, check out the [example folder](./example) for templates you can use and read
[the guide](./example/README.md) for more detail.

The bare minimum example:

```ts
import * as bsmap from 'https://deno.land/x/bsmap@1.3.4/mod.ts';

const data = bsmap.load.difficultySync('ExpertPlusStandard.dat', 3);

// ... code to modify difficulty data

bsmap.save.difficultySync(data);
```

**NOTE:** Recommended to use `https://deno.land/x/bsmap@version/mod.ts` to lock version to ensure
the script works without breaking from newer update. For rolling release, visit
[GitHub Repo](https://github.com/KivalEvan/BeatSaber-Deno) and import raw file directly from there
(`https://raw.githubusercontent.com/KivalEvan/BeatSaber-Deno/main/mod.ts`), you may need to
occasionally add `--reload` tag for latest update.

You may also clone the library and import it locally to make any modification as you wish.

If you are using the script outside of map directory, you can specify the map directory without the
need to explicitly apply `directory` on IO function. This can be any valid directory as long as it
points to directory.

```ts
bsmap.globals.directory = '/PATH/TO/YOUR/BEAT_SABER/MAP_FOLDER/';
```

## Usage

Run the script by running this command in terminal `deno run yourscriptpath.ts`. For more advanced
use, you may do `deno run --allow-read --allow-write --watch yourscriptpath.ts`. If you want to
update to newer version, simply run `deno run --reload yourscriptpath.ts`; Do note that it may break
existing part of your code that utilises the library.

For further explanation over on [Deno Manual](https://deno.land/manual).

**Deno related:** if you are having issue of not being able to retrieve module on import, then
reload or cache the module to fix it. To reload or cache the module, run
`deno cache --reload yourscriptpath.ts` and restart Deno server if necessary. If it still does not
work, change to a different workspace. Deno by nature caches the module upon first execution, and
will never be updated after. This mean you can continue working on the script regardless of
connection and will not break the existing code regardless of newly released update until explicitly
updating it via `--reload` flag or URL version change.

## Contributing

If you wish to contribute, do follow the guidelines. Make pull request for feature
addition/enhancement/fix or create an issue if you encounter error/problem or want an improvement.

### Guidelines

- Use `deno fmt` for standard formatting.
- File names shall use camel case.
- Exported types, interfaces, fields, and functions should accompany with JSDoc comment right above
  its definition.
- Top-level function shall use regular function.
- No third-party dependencies shall be used outside of examples, extensions, and tests. (Exception
  when absolutely necessary is Deno standard library)
- Avoid circular imports.

## Planned

- General clean-up and restructuring (this has grown far larger than I anticipated)
- Write JSDoc on every important bit
- Add more helper for Chroma and Noodle Extensions

## Known Issue

- Instantiating nested object or array depends on the property and does not allow mix-and-match
  - However, it can still process like normally if you choose to ignore the error

## Credits

- [HSV conversion algorithm](https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c)
- [CIE-L\*ab and Delta E2000 algorithm](https://www.easyrgb.com/)
- Uninstaller and Qwasyx (improving it) for note swing detection algorithm
- Top_Cat for math guidance
- Others for helpful feedback & indirect contribution
