import type { ICustomDataBase } from '../shared/custom/customData.ts';

/**
 * Base schema for v3 `Item`.
 */
export interface IBaseItem {
   customData?: ICustomDataBase;
}
