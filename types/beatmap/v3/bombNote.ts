import { IGridObject } from './gridObject.ts';
import { ICustomDataNote } from './customData.ts';

export interface IBombNote extends IGridObject {
    customData?: ICustomDataNote;
}
