import { ICustomDataBase } from '../shared/customData.ts';

export interface IBaseObject {
    /** Beat time `<float>` of beatmap object. */
    _time: number;
    _customData?: ICustomDataBase;
}
