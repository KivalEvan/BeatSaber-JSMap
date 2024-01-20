import { round } from '../../utils/math.ts';
import { ICleanOptions } from '../../types/beatmap/shared/clean.ts';
import { IInfo } from '../../types/beatmap/v4/info.ts';
import { IDifficulty } from '../../types/beatmap/v4/difficulty.ts';
import { deepClean, purgeZeros } from '../shared/clean.ts';

// deno-lint-ignore no-explicit-any
export function cleanDifficulty(data: Record<string, any> | IDifficulty, options: ICleanOptions) {
}

// deno-lint-ignore no-explicit-any
export function cleanInfo(data: Record<string, any> | IInfo, options: ICleanOptions) {
}
