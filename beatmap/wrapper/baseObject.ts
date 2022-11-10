import { IWrapBaseObject } from '../../types/beatmap/wrapper/baseObject.ts';
import { WrapBaseItem } from './baseItem.ts';

/** Basic building block of beatmap object. */
export abstract class WrapBaseObject<T extends Record<keyof T, unknown>> extends WrapBaseItem<T>
    implements IWrapBaseObject<T> {
    abstract get time(): IWrapBaseObject['time'];
    abstract set time(value: IWrapBaseObject['time']);

    setTime(value: number) {
        this.time = value;
        return this;
    }
}
