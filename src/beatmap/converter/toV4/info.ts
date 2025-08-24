import { logger } from '../../../logger.ts';
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
   logger.tWarn(tag('main'), 'Converting to beatmap v4 may lose certain data!');

   switch (fromVersion) {
      case 1:
         data.environmentNames = [
            data.environmentBase.normal || 'DefaultEnvironment',
         ];
         data.difficulties.forEach((d) => {
            d.environmentId = 0;
         }); /** Falls through */
      case 2:
      case 3:
      case 4:
         data.version = 4;
         break;
      default:
         logger.tWarn(
            tag('main'),
            'Unknown version: version not supported; misinput? Returning original data.',
         );
   }

   return data;
}
