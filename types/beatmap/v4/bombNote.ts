import { IGrid } from './grid.ts';
import { ICustomDataNote } from '../v3/custom/note.ts';

export interface IBombNote extends IGrid {
   customData?: ICustomDataNote;
}
