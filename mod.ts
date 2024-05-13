/**
 * Beat Saber general-purpose scripting module.
 *
 * This module provides beatmap schema, class object, and various toolings to handle Beat Saber map.
 *
 * @example Quickstart
 * ```ts
 * import { globals, readDifficultyFileSync, writeDifficultyFileSync } from "https://deno.land/x/bsmap@2.0.0/mod.ts";
 * globals.directory = '/path/to/map/folder/here'; // implicitly uses cwd if not written
 * const data = readDifficultyFileSync('ExpertStandard.dat', 3);
 * // ... do what you want here with `data`
 * writeDifficultyFileSync(data);
 * ```
 *
 * `extensions` module is omitted from the main module as it is unstable and contain 3rd-party library.
 *
 * `patch` module is separated as it is non-essential and used to correct issues from existing beatmap.
 *
 * If you wish to only use schema, feel free to import `types` directly.
 *
 * @module
 */

export * from './beatmap/mod.ts';
export * from './read/mod.ts';
export * from './write/mod.ts';
export * from './utils/mod.ts';
export * from './fs/mod.ts';
export * as types from './types/mod.ts';
export { default as logger, Logger } from './logger.ts';
export { default as globals } from './globals.ts';
