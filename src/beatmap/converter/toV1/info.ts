import { logger } from '../../../logger.ts';
import type { EnvironmentName } from '../../../types/beatmap/shared/environment.ts';
import type { IWrapInfoAttribute } from '../../../types/beatmap/wrapper/info.ts';
import { is360Environment } from '../../helpers/environment.ts';

function tag(name: string): string[] {
   return ['convert', 'toV1Info', name];
}

/**
 * Feeling nostalgic?
 * ```ts
 * const converted = toV1Info(data);
 * ```
 *
 * **WARNING:** Guess you should know this legacy version does not have modern features.
 */
export function toV1Info<T extends IWrapInfoAttribute>(
   data: T,
   fromVersion = data.version,
): T {
   logger.tWarn(tag('main'), 'Converting to beatmap v1 may lose certain data!');

   switch (fromVersion) {
      case 1:
      case 2:
      case 3:
      case 4:
         data.environmentBase.normal = data.environmentBase.normal ||
            (data.environmentNames.find(
               (e) => !is360Environment(e),
            ) as EnvironmentName) ||
            'DefaultEnvironment';
         data.version = 1;
         break;
      default:
         logger.tWarn(
            tag('main'),
            'Unknown version: version not supported; misinput? Returning original data.',
         );
   }

   return data;
}
