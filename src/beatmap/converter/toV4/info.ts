import { getLogger } from '../../../logger.ts';
import type { IWrapInfo } from '../../schema/wrapper/types/info.ts';

function tag(name: string): string[] {
   return ['convert', 'toV4Info', name];
}

/**
 * Convert to beatmap v4.
 * ```ts
 * const converted = toV4Info(data);
 * ```
 *
 * **WARNING:** Custom data may be lost on conversion, as well as other incompatible attributes.
 */
export function toV4Info<T extends IWrapInfo>(
   data: T,
   fromVersion = data.version,
): T {
   const logger = getLogger();

   logger?.tWarn(tag('main'), 'Converting to beatmap v4 may lose certain data!');

   switch (fromVersion) {
      case 1:
         data.environmentNames = [
            data.environmentBase.normal || 'DefaultEnvironment',
         ];
         data.difficulties.forEach((d) => {
            d.environmentId = 0;
         }); /** Falls through */
      case 2:
      case 3: {
         // Legacy info may only name base environments, without an indexed table.
         const environmentCount = data.environmentNames.length;
         const difficulties = data.difficulties;
         for (let difficultyIndex = 0; difficultyIndex < difficulties.length; difficultyIndex++) {
            const difficulty = difficulties[difficultyIndex];
            if (difficulty.environmentId >= 0 && difficulty.environmentId < environmentCount) {
               continue;
            }
            const rotation = difficulty.characteristic === '90Degree' ||
               difficulty.characteristic === '360Degree';
            const environment = rotation
               ? data.environmentBase.allDirections || 'GlassDesertEnvironment'
               : data.environmentBase.normal || 'DefaultEnvironment';
            let index = data.environmentNames.indexOf(environment);
            if (index === -1) {
               index = data.environmentNames.length;
               data.environmentNames = [...data.environmentNames, environment];
            }
            difficulty.environmentId = index;
         }
         data.version = 4;
         break;
      }
      case 4:
         data.version = 4;
         break;
      default:
         logger?.tWarn(
            tag('main'),
            'Unknown version: version not supported; misinput? Returning original data.',
         );
   }

   return data;
}
