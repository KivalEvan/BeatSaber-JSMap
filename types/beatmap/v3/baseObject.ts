import { ICustomDataBase } from '../shared/customData.ts';

export interface IBaseObject {
    /** Beat time `<float>` of beatmap object. */
    b: number;
    customData?: ICustomDataBase;
}
