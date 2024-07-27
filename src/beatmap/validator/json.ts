// deno-lint-ignore-file no-explicit-any
import { schemaCheck } from './schema.ts';
import { logger } from '../../logger.ts';
import type { ISchemaDeclaration } from '../../types/beatmap/shared/schema.ts';
import {
   audioSchemaMap,
   difficultyCheckMap,
   infoCheckMap,
   lightshowCheckMap,
} from '../mapping/validator.ts';
import { implicitVersion, retrieveVersion } from '../helpers/version.ts';
import type { BeatmapFileType } from '../../types/beatmap/shared/schema.ts';
import type { ISchemaCheckOptions } from '../../types/beatmap/options/schema.ts';

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
   let schemaCheckMap: Record<number, Record<string, ISchemaDeclaration>> = {};
   switch (type) {
      case 'info':
         schemaCheckMap = infoCheckMap;
         break;
      case 'audioData':
         schemaCheckMap = audioSchemaMap;
         break;
      case 'difficulty':
         schemaCheckMap = difficultyCheckMap;
         break;
      case 'lightshow':
         schemaCheckMap = lightshowCheckMap;
         break;
   }

   const ver = retrieveVersion(data) ?? implicitVersion(type);
   logger.tInfo(
      tag('validateJSON'),
      'Validating beatmap JSON for ' + type + ' with version',
      version,
   );
   schemaCheck(data, schemaCheckMap[version], type, ver, opt.throwOn);

   return data;
}
