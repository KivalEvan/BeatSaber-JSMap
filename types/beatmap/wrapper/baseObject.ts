import { IWrapBaseItem } from './baseItem.ts';

export interface IWrapBaseObject extends IWrapBaseItem {
    /** Beat time `<float>` of beatmap object. */
    time: number;

    setTime(value: number): this;
}
