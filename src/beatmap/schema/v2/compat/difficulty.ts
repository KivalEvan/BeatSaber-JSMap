import { logger } from '../../../../logger.ts';
import type { ICompatibilityOptions } from '../../../../types/beatmap/options/compatibility.ts';
import type { IWrapBeatmapAttribute } from '../../../../types/beatmap/wrapper/beatmap.ts';
import {
   hasMappingExtensionsBombNote,
   hasMappingExtensionsNote,
   hasMappingExtensionsObstacleV2,
   hasMappingExtensionsRotationV2,
} from '../../../helpers/modded/has.ts';
import { tag } from './_common.ts';

/**
 * Checks if beatmap data is compatible with v2 `Difficulty` schema.
 */
export function compatDifficulty<T extends IWrapBeatmapAttribute>(
   bm: T,
   options: ICompatibilityOptions,
) {
   const hasIncompat = !!bm.difficulty.arcs.length ||
      !!bm.lightshow.lightColorEventBoxGroups.length ||
      !!bm.lightshow.lightRotationEventBoxGroups.length ||
      !!bm.lightshow.lightTranslationEventBoxGroups.length ||
      !!bm.lightshow.fxEventBoxGroups.length;

   if (hasIncompat) {
      if (options.throwOn.incompatibleObject) {
         throw new Error('Beatmap is not compatible with v2');
      } else {
         logger.tWarn(
            tag('compatDifficulty'),
            'Beatmap is not compatible with v2, certain data may be lost!',
         );
      }
   }

   const hasME = bm.difficulty.colorNotes.some(hasMappingExtensionsNote) ||
      bm.difficulty.bombNotes.some(hasMappingExtensionsBombNote) ||
      bm.difficulty.obstacles.some(hasMappingExtensionsObstacleV2) ||
      bm.difficulty.rotationEvents.some(hasMappingExtensionsRotationV2);

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
