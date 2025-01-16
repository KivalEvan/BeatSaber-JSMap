// deno-lint-ignore-file no-explicit-any
import { logger } from '../../logger.ts';
import type { ISchemaCheckOptions } from '../../types/beatmap/options/schema.ts';
import type { BeatmapFileType } from '../../types/beatmap/shared/schema.ts';
import { implicitVersion, retrieveVersion } from '../helpers/version.ts';
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

   const ver = retrieveVersion(data) ?? implicitVersion(type);
   logger.tInfo(
      tag('validateJSON'),
      'Validating beatmap JSON for ' + type + ' with version',
      version,
   );

   switch (type) {
      case 'info': {
         const schema = infoCheckMap[version as keyof typeof infoCheckMap];
         schemaCheck(data, schema, type, ver, opt.throwOn);
         break;
      }
      case 'audioData': {
         const schema = audioSchemaMap[version as keyof typeof audioSchemaMap];
         schemaCheck(data, schema, type, ver, opt.throwOn);
         break;
      }
      case 'difficulty': {
         const schema = difficultyCheckMap[version as keyof typeof difficultyCheckMap];
         schemaCheck(data, schema, type, ver, opt.throwOn);
         break;
      }
      case 'lightshow': {
         const schema = lightshowCheckMap[version as keyof typeof lightshowCheckMap];
         schemaCheck(data, schema, type, ver, opt.throwOn);
         break;
      }
   }

   return data;
}
