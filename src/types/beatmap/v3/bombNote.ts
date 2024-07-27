import type { IGridObject } from './gridObject.ts';
import type { ICustomDataNote } from './custom/note.ts';

/**
 * Schema for v3 `Bomb Note`.
 */
export interface IBombNote extends IGridObject {
   customData?: ICustomDataNote;
}
