# Beat Saber JS Map

General-purpose Beat Saber beatmap scripting library with
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

- **Latest Schema:** Supports all latest official schema including modded features.
  - Supported version: v4.1.0, v3.3.0, v2.6.0, v1.5.0.
- **Version-agnostic Wrapper:** Readable and cross-version core allows for seamless version
  transferring.
- **Partial Creation:** Define beatmap object partially and let default fill the rest of fields.
- **Mod Compatible:** Chroma, Cinema, Noodle Extensions, and Mapping Extensions is supported out of
  the box.
  - Helpers are available in main for essentials such as getting modded position.
  - Class method may contain function parameter to access any arbitrary data.
- **Tree-shakeable:** Modularity approach minimise build size.
- **Built-in Utility:** Relevant utilities including math, colour, easings, and more.
- **Validator & Optimiser:** Customisable tool ensuring beatmap schema is valid to the game and
  optimised for storage.

## Prerequisite

- Any **TypeScript** supported runtime/transpiler
  - **Deno**
  - **Bun**
  - **Node.js**
  - **Vite**
- Basic JavaScript or TypeScript knowledge
  - Module is entirely TypeScript, but for common use case you do not need an in-depth knowledge.

## Getting Started

Before you start, you may want to understand how Beat Saber stores the
[beatmap data here](./BEATMAP.md).

You may get this package from [NPM](https://www.npmjs.com/package/bsmap) or
[JSR](https://jsr.io/@kvl/bsmap) using respective package manager.

For utility, schema, type-only, or core consumers, prefer a narrow subpath. Utility consumers can
use `utils/math`, `utils/colors`, or `utils/misc` for one category, or `utils` for all utilities.
These imports exclude the root filesystem and I/O graph. Use a versioned schema subpath when only
one version is required.

#### JSR subpaths

```ts
import { clamp } from 'jsr:@kvl/bsmap/utils';
import { lerp } from 'jsr:@kvl/bsmap/utils/math';
import { colorFrom } from 'jsr:@kvl/bsmap/utils/colors';
import { formatNumber } from 'jsr:@kvl/bsmap/utils/misc';
import { ColorNoteSchema } from 'jsr:@kvl/bsmap/schema/v3';
import type { Vector3 } from 'jsr:@kvl/bsmap/types';
import { ColorNote } from 'jsr:@kvl/bsmap/beatmap/core';
```

#### NPM subpaths

```ts
import { clamp } from 'bsmap/utils';
import { lerp } from 'bsmap/utils/math';
import { colorFrom } from 'bsmap/utils/colors';
import { formatNumber } from 'bsmap/utils/misc';
import { ColorNoteSchema } from 'bsmap/schema/v3';
import type { Vector3 } from 'bsmap/types';
import { ColorNote } from 'bsmap/beatmap/core';
```

ESM bundlers tree-shake unused exports from narrow imports. CommonJS barrels load all exports
eagerly, so CommonJS consumers should use the narrowest subpath. The library does not use lazy
loading for synchronous schema or I/O APIs because lazy loading would make these APIs asynchronous.

To get scripting, simply create a `.ts` file anywhere, preferably inside map folder for simpler
setup, import module via module specifier or package manager, and then run the script. That's it. Do
check out the [the guide](./GUIDE.md) for usage detail.

### Importing/Runtime

This is for beginner on how to import library and use the script. Importing `bsmap` into script file
can be done in various ways, it is recommended that you run the command in the same folder as the
script file.

#### Deno

```ts
// Choose one of the four ways, prioritise top to bottom
import * as bsmap from 'jsr:@kvl/bsmap';
import * as bsmap from '@kvl/bsmap'; // via `deno add bsmap`
import * as bsmap from 'npm:bsmap';
import * as bsmap from 'bsmap'; // if previously used NPM `package.json` exist

// Run command: `deno run script.ts`
```

#### Bun

```ts
// via `bun add bsmap`
import * as bsmap from 'bsmap';

// Run command: `bun script.ts`
```

#### Node.js & Browser NPM (ESM)

```ts
// via `npm install bsmap`
import * as bsmap from 'bsmap';

// Run command: `ts-node script.ts`
// Refer below for browser
```

#### Node.js NPM (CJS)

```ts
// via `npm install bsmap`
const bsmap = require('bsmap');

// Run command: `ts-node script.ts`
```

Once you've imported the library, you can try the bare minimum example:

```ts
const data = bsmap.readDifficultyFileSync('ExpertPlus.beatmap.dat', 4);
// ... arbitrary code
bsmap.writeDifficultyFileSync(data, 4);
```

You may also clone the library to store and import locally, and make any modification as you wish.

If you are using the script outside of the map directory, you can specify the map directory without
the need to explicitly apply `directory` on IO function. This can be any valid directory as long as
it points to directory. If directory is explicitly written in IO function, then that will instead be
prioritised.

```ts
// you should always use absolute path for this,
// otherwise it will try to resolve path with your CWD
bsmap.globals.directory = '/PATH/TO/YOUR/BEAT_SABER/MAP_FOLDER/';
```

### Runtime

Module uses respective vendor API for filesystem and path functionality to handle `read` and `write`
module, currently supporting Deno, Bun, and Node.js. This may also work on other runtime given that
`node:` built-in module is available on import, otherwise you may be required to provide the
following `fs` and `path` functionality in the `shims` module.

For JSR, import the default shims and their contracts from the public subpath:

```ts
import { fs, type IShimsFileSystem, type IShimsPath, path } from '@kvl/bsmap/shims';
```

For NPM, use the equivalent package subpath:

```ts
import { fs, type IShimsFileSystem, type IShimsPath, path } from 'bsmap/shims';
```

Environment data moved to its own subpath. Change imports as follows:

```ts
// Before
import { EnvironmentRename } from '@kvl/bsmap';
// After
import { EnvironmentRename } from '@kvl/bsmap/environment';
```

For NPM, import the same data from `bsmap/environment`.

If a runtime does not provide the required vendor APIs, create complete `IShimsFileSystem` and
`IShimsPath` objects and copy their methods onto the exported shims with `Object.assign`. The
interface expansion is a breaking change for custom shims. Add `rename`, `renameSync`, `unlink`,
`unlinkSync`, `dirname`, and `join` during migration. The filesystem contract has these eight
methods:

- `readTextFile(path)` returns a promise and rejects when the path is missing.
- `readTextFileSync(path)` returns text and throws when the path is missing.
- `writeTextFile(path, content)` returns a promise and creates or truncates the file.
- `writeTextFileSync(path, content)` creates or truncates the file synchronously.
- `rename(oldPath, newPath)` returns a promise and atomically replaces the destination.
- `renameSync(oldPath, newPath)` atomically replaces the destination synchronously.
- `unlink(path)` returns a promise and rejects when the path is missing.
- `unlinkSync(path)` removes the file and throws when the path is missing.

The asynchronous methods `readTextFile`, `writeTextFile`, `rename`, and `unlink` return promises.
The file-write adapter converts synchronous throws from custom asynchronous methods into rejected
promises. The synchronous methods return or throw synchronously. The path contract has these four
methods:

- `resolve(...pathSegments)`
- `basename(path, suffix?)`
- `dirname(path)`
- `join(...pathSegments)`

Path methods follow `node:path` semantics. The four filesystem methods with no `Sync` suffix use
promises; the other four do not. Browser builds that never use filesystem IO can ignore these shims.

File writers first create a temporary file in the destination directory and then rename it over the
destination. The temporary basename is bounded and does not include the destination basename or Web
Crypto: `bsmap.<4 base36 digits>.<8 base36 digits>.tmp` (23 characters). The adjacent path keeps the
temporary file on the same filesystem, which is required for atomic rename. Temporary names are
unique only within one module instance in one execution context. All destinations in one directory
share that name space. Different module instances or execution contexts can collide, which can fail
a write or publish the wrong temporary content.

Rename makes the replacement visible in one step. Readers see the old file or the complete new file,
not partial content. The new path uses the temporary file's inode and creation permissions, so the
old inode and mode are not preserved. A destination symlink is replaced as a link, and a source
symlink moves as a link. This provides atomic visibility, not crash durability. `unlink` removes one
file and must reject a directory without removing it. The Deno adapter requires read and write
permissions. It runs `lstat`, rejects directories, and then runs `remove`. A path replacement
between these calls remains a race.

### Browser

As it is written in TypeScript, you may need transpiler such as `tsc` or `vite` that will compile
down to single JavaScript file to be able to be used on browser, depending on build option down to
ES5 support.

Typical browser do not have filesystem functionality and thus `read` and `write` module may not work
as expected. You may use `load` and `save` which can read from web input.

## Development

[Deno](https://deno.com/) is used for development, simply install and setup workspace, no other
setup is required to get started as it provides necessary toolchain.

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
- No dependencies shall be used outside of examples, extensions, and tests
  - Vendor dependency is allowed so long it gracefully handles every platform possible
- Prefer `types` over concrete type for parameter/return type
  - Use generic if necessary
- Use ESM
  - Avoid circular imports
  - Avoid URL imports
  - Avoid default export
  - Prefer `node:` built-in import if needed

## Planned

- Write JSDoc on every important bit
- Separate class method to own function
- Add more helper for Chroma and Noodle Extensions

## Known Issue

- As beatmap module here is version agnostic, certain data such as bomb direction, info set custom
  data, etc. are either renamed, restructured or unavailable.
  - Certain beatmap version do not contain certain information in schema and are therefore not
    present in-game.

## Credits & References

- [HSV conversion algorithm](https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c)
- [CIE-L\*ab and Delta E2000 algorithm](https://www.easyrgb.com/)
- Uninstaller and [Qwasyx](https://github.com/Qwasyx/) (improving it) for note swing detection
  algorithm [OfficialMECH](https://github.com/officialMECH) for improving and maintaining codebase
- [Top_Cat](https://github.com/Top-Cat/) for math guidance
- Others for helpful feedback & indirect contribution
