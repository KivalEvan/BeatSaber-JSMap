import type { IGrid } from './grid.ts';
import type { ICustomDataNote } from '../v3/custom/note.ts';

/**
 * Schema for v4 `Bomb Note`.
 */
export interface IBombNote extends IGrid {
   customData?: ICustomDataNote;
}
