/**
 * Patch module for patching erronous data in beatmap.
 *
 * This module is not included as it is very rarely used and unstable.
 * It contains functions to attempt fix and alter beatmap objects that
 * were potentially broken or contain incompatible data.
 *
 * You may try to load beatmap with schema check disabled to be able to use certain patch.
 *
 * @example Patch beatmap data
 * ```ts
 * import { readDifficultyFileData } from '@kvl/bsmap';
 * import { dataCorrection } from '@kvl/bsmap/patch';
 *
 * const beatmap = readDifficultyFileData('path/to/beatmap.dat', { load: { schemaCheck: { enabled: false } } });
 * dataCorrection.beatmap(beatmap);
 * ```
 *
 * @module
 */

export * from './customDataUpdate.ts';
export * from './removeOutsidePlayable.ts';
export * as dataCorrection from './dataCorrection/mod.ts';
