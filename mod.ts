/**
 * Beat Saber general-purpose scripting library.
 *
 * This library provides beatmap schema, class object, and various toolings to handle Beat Saber map.
 * ```ts
 * import { globals, load, save } from "https://deno.land/x/bsmap@1.5.0/mod.ts";
 * globals.directory = '/path/to/map/folder/here'; // uses cwd if not stated
 * const diff = load.difficultySync('ExpertStandard.dat', 3);
 * // ... do what you want here with `diff`
 * save.difficultySync(diff);
 * ```
 *
 * `globals` module only affects the root-level script and the script being run in the current process.
 *
 * `extensions` module is omitted from the main module as it is unstable and contain 3rd-party library.
 *
 * @module
 */

export * from './beatmap/mod.ts';
export * as types from './types/mod.ts';
export * as convert from './converter/mod.ts';
export * as load from './load.ts';
export * as save from './save.ts';
export * as optimize from './optimize.ts';
export * from './utils/mod.ts';
export { default as logger, Logger } from './logger.ts';
export { default as globals } from './globals.ts';
