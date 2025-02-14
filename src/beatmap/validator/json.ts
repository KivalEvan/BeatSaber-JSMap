// deno-lint-ignore-file no-explicit-any
import type { StandardSchemaV1 } from '../../deps.ts';
import { logger } from '../../logger.ts';
import type { ISchemaCheckOptions } from '../../types/beatmap/options/schema.ts';
import type { BeatmapFileType } from '../../types/beatmap/shared/schema.ts';
import {
   audioSchemaMap,
   difficultyCheckMap,
   infoCheckMap,
   lightshowCheckMap,
} from '../mapping/validator.ts';
import { schemaCheck } from './schema.ts';

function tag(name: string): string[] {
   return ['validator', name];
}

const defaultOptions: ISchemaCheckOptions = {
   enabled: true,
   throwOn: {
      unused: false,
      missing: true,
      ignoreOptional: false,
      nullish: true,
      wrongType: true,
      notInt: false,
      notUnsigned: false,
   },
};

/**
 * Validate the beatmap JSON data against the schema.
 */
export function validateJSON<T extends Record<string, any> = Record<string, any>>(
   type: BeatmapFileType,
   data: T,
   version: number,
   options?: Partial<ISchemaCheckOptions>,
): T {
   const opt: Required<ISchemaCheckOptions> = {
      enabled: options?.enabled ?? defaultOptions.enabled,
      throwOn: {
         ...defaultOptions.throwOn,
         ...options?.throwOn,
      },
   };

   logger.tInfo(
      tag('validateJSON'),
      'Validating beatmap JSON for ' + type + ' with version',
      version,
   );

   let schema: StandardSchemaV1;
   switch (type) {
      case 'info': {
         schema = infoCheckMap[version as keyof typeof infoCheckMap];
         break;
      }
      case 'audioData': {
         schema = audioSchemaMap[version as keyof typeof audioSchemaMap];
         break;
      }
      case 'difficulty': {
         schema = difficultyCheckMap[version as keyof typeof difficultyCheckMap];
         break;
      }
      case 'lightshow': {
         schema = lightshowCheckMap[version as keyof typeof lightshowCheckMap];
         break;
      }
   }
   schemaCheck(data, schema, type, undefined, opt.throwOn);

   return data;
}
