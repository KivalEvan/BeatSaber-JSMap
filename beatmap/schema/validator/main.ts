// deno-lint-ignore-file no-explicit-any
import { deepCheck } from '../../shared/dataCheck.ts';
import logger from '../../../logger.ts';
import type {
   DataCheck,
   IDataCheckOption,
} from '../../../types/beatmap/shared/dataCheck.ts';
import {
   audioDataCheckMap,
   difficultyCheckMap,
   infoCheckMap,
   lightshowCheckMap,
} from './dataCheckMap.ts';
import { retrieveVersion } from '../../shared/version.ts';

function tag(name: string): string[] {
   return ['validator', name];
}

const defaultOptions: IDataCheckOption = {
   throwOn: {
      unused: false,
      missing: true,
      ignoreOptional: false,
      nullish: true,
      wrongType: true,
      notInt: false,
      notUnsigned: false,
   },
}

export function validateJSON<
   T extends Record<string, any> = Record<string, any>
>(
   data: T,
   type: 'info' | 'audioData' | 'difficulty' | 'lightshow',
   version: number,
   options?: Partial<IDataCheckOption>
): T {
   const opt: Required<IDataCheckOption> = {
      throwOn: {
         ...defaultOptions.throwOn,
         ...options?.throwOn,
      }
   }
   let dataCheckMap: Record<number, Record<string, DataCheck>> = {};
   switch (type) {
      case 'info':
         dataCheckMap = infoCheckMap;
         break;
      case 'audioData':
         dataCheckMap = audioDataCheckMap;
         break;
      case 'difficulty':
         dataCheckMap = difficultyCheckMap;
         break;
      case 'lightshow':
         dataCheckMap = lightshowCheckMap;
         break;
   }

   let ver = retrieveVersion(data);
   if (!ver) {
      switch (type) {
         case 'info':
         case 'difficulty':
            ver = '2.0.0';
            break;
         case 'lightshow':
            ver = '3.0.0';
            break;
         default:
            ver = '4.0.0';
      }
   }
   logger.tInfo(
      tag('validateJSON'),
      'Validating beatmap JSON for ' + type + ' with version ' + version
   );
   deepCheck(data, dataCheckMap[version], type, ver, opt.throwOn);

   return data;
}
