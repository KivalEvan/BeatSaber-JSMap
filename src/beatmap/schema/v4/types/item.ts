import type { ICustomDataBase } from '../../shared/types/custom/customData.ts';

/**
 * Base schema for v4 `Item`.
 */
export interface IItem {
   customData?: ICustomDataBase;
}
