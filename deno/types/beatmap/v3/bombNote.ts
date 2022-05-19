import { IBaseNote } from './baseNote.ts';
import { ICustomDataNote } from './customData.ts';

export interface IBombNote extends IBaseNote {
    customData?: ICustomDataNote;
}
