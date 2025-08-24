import { logger } from '../../../../logger.ts';
import type { ICompatibilityOptions } from '../../../mapping/types/compatibility.ts';
import type { IWrapBeatmap } from '../../wrapper/types/beatmap.ts';
import {
   hasMappingExtensionsArc,
   hasMappingExtensionsBombNote,
   hasMappingExtensionsChain,
   hasMappingExtensionsNote,
   hasMappingExtensionsObstacleV3,
} from '../../../helpers/modded/has.ts';
import { tag } from './_common.ts';

/**
 * Checks if beatmap data is compatible with v4 `Difficulty` schema.
 */
export function compatDifficulty<T extends IWrapBeatmap>(
   bm: T,
   options: ICompatibilityOptions,
) {
   const hasME = bm.difficulty.colorNotes.some(hasMappingExtensionsNote) ||
      bm.difficulty.bombNotes.some(hasMappingExtensionsBombNote) ||
      bm.difficulty.arcs.some(hasMappingExtensionsArc) ||
      bm.difficulty.chains.some(hasMappingExtensionsChain) ||
      bm.difficulty.obstacles.some(hasMappingExtensionsObstacleV3);

   if (hasME) {
      if (options.throwOn.mappingExtensions) {
         throw new Error('Beatmap contain Mapping Extensions value');
      } else {
         logger.tWarn(
            tag('compatDifficulty'),
            'Beatmap contain Mapping Extensions value and require Mapping Extensions mod to function!',
         );
      }
   }
}
