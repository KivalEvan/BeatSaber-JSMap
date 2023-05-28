import { IGridObject } from './gridObject.ts';
import { ICustomDataNote } from './custom/note.ts';

export interface IBombNote extends IGridObject {
    customData?: ICustomDataNote;
}
