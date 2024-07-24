/**
 * Beat Saber general-purpose scripting module.
 *
 * This module provides beatmap schema, class object, and various toolings to handle Beat Saber map.
 *
 * `extensions` module is omitted from the main module as it is unstable and contain 3rd-party library.
 *
 * `patch` module is separated as it is non-essential and used to correct issues from existing beatmap.
 *
 * If you wish to only use schema, feel free to import from `types` module directly.
 *
 * @example Quickstart
 * ```ts
 * import { globals, readDifficultyFileSync, writeDifficultyFileSync } from "@kvl/bsmap";
 * globals.directory = '/path/to/map/folder/here'; // implicitly uses cwd if not written
 * const data = readDifficultyFileSync('ExpertStandard.dat', 3);
 * // ... do what you want here with `data`
 * writeDifficultyFileSync(data);
 * ```
 *
 * @module
 */

export * from './beatmap/mod.ts';
export * from './read/mod.ts';
export * from './write/mod.ts';
export * from './fs/mod.ts';
export * from './path/mod.ts';
export { default as logger, Logger } from './logger.ts';
export { default as globals } from './globals.ts';
