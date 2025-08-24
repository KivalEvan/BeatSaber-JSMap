import { logger } from '../../../logger.ts';
import type { Environment360Name, EnvironmentName } from '../../schema/shared/types/environment.ts';
import type { IWrapInfo } from '../../core/types/info.ts';
import { is360Environment } from '../../helpers/environment.ts';

function tag(name: string): string[] {
   return ['convert', 'toV2Info', name];
}

/**
 * Convert to beatmap v2.
 * ```ts
 * const converted = toV2Info(data);
 * ```
 *
 * **WARNING:** Chain and other new stuff will be gone!
 */
export function toV2Info<T extends IWrapInfo>(
   data: T,
   fromVersion = data.version,
): T {
   logger.tWarn(tag('main'), 'Converting to beatmap v2 may lose certain data!');

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
         data.environmentBase.allDirections = data.environmentBase.allDirections ||
            (data.environmentNames.find((e) => is360Environment(e)) as Environment360Name) ||
            'DefaultEnvironment';
         data.version = 2;
         break;
      default:
         logger.tWarn(
            tag('main'),
            'Unknown version: version not supported; misinput? Returning original data.',
         );
   }

   return data;
}
