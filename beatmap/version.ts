// deno-lint-ignore-file no-explicit-any
import { IDifficulty as IV1Difficulty } from '../types/beatmap/v1/difficulty.ts';
import { IDifficulty as IV2Difficulty } from '../types/beatmap/v2/difficulty.ts';
import { IDifficulty as IV3Difficulty } from '../types/beatmap/v3/difficulty.ts';
import { IDifficulty as IV4Difficulty } from '../types/beatmap/v4/difficulty.ts';
import { Difficulty as V1Difficulty } from './v1/difficulty.ts';
import { Difficulty as V2Difficulty } from './v2/difficulty.ts';
import { Difficulty as V3Difficulty } from './v3/difficulty.ts';
import { Difficulty as V4Difficulty } from './v4/difficulty.ts';
import { WrapDifficulty } from './wrapper/difficulty.ts';

export function isV1(
   data: WrapDifficulty<Record<string, any>>,
): data is V1Difficulty;
export function isV1(data: { [key: string]: any }): data is IV1Difficulty;
export function isV1(data: unknown) {
   return (
      data instanceof V1Difficulty ||
      (typeof data === 'object' &&
         data != null &&
         '_version' in data &&
         typeof data._version === 'string' &&
         data._version.startsWith('1'))
   );
}

export function isV2(
   data: WrapDifficulty<Record<string, any>>,
): data is V2Difficulty;
export function isV2(data: { [key: string]: any }): data is IV2Difficulty;
export function isV2(data: unknown) {
   return (
      data instanceof V2Difficulty ||
      (typeof data === 'object' &&
         data != null &&
         '_version' in data &&
         typeof data._version === 'string' &&
         data._version.startsWith('2'))
   );
}

export function isV3(
   data: WrapDifficulty<Record<string, any>>,
): data is V3Difficulty;
export function isV3(data: { [key: string]: any }): data is IV3Difficulty;
export function isV3(data: unknown) {
   return (
      data instanceof V3Difficulty ||
      (typeof data === 'object' &&
         data != null &&
         'version' in data &&
         typeof data.version === 'string' &&
         data.version.startsWith('3'))
   );
}

export function isV4(
   data: WrapDifficulty<Record<string, any>>,
): data is V4Difficulty;
export function isV4(data: { [key: string]: any }): data is IV4Difficulty;
export function isV4(data: unknown) {
   return (
      data instanceof V4Difficulty ||
      (typeof data === 'object' &&
         data != null &&
         'version' in data &&
         typeof data.version === 'string' &&
         data.version.startsWith('4'))
   );
}
