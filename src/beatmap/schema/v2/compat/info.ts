import type { ICompatibilityOptions } from '../../../mapping/types/compatibility.ts';
import type { IWrapInfo } from '../../wrapper/types/info.ts';

/**
 * Check if beatmap info is compatible with v2 `Info` schema.
 */
export function compatInfo<T extends IWrapInfo>(
   _info: T,
   _options: ICompatibilityOptions,
) {}
