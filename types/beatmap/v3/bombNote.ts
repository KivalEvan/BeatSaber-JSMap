import { IGridObject } from './gridObject.ts';
import { ICustomDataNote } from './custom/customData.ts';

export interface IBombNote extends IGridObject {
    customData?: ICustomDataNote;
}
