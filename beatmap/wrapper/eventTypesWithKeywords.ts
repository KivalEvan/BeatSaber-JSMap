import { IWrapEventTypesForKeywords } from '../../types/beatmap/wrapper/eventTypesForKeywords.ts';
import { IWrapEventTypesWithKeywords } from '../../types/beatmap/wrapper/eventTypesWithKeywords.ts';
import { Serializable } from '../shared/serializable.ts';

/** Basic event types with keywords beatmap class object. */
export abstract class WrapEventTypesWithKeywords<T extends Record<keyof T, unknown>> extends Serializable<T>
    implements IWrapEventTypesWithKeywords {
    abstract get list(): IWrapEventTypesForKeywords[];
    abstract set list(value: IWrapEventTypesForKeywords[]);

    setData(value: WrapEventTypesWithKeywords<T>['list']) {
        this.list = value;
        return this;
    }
    abstract addData(value: IWrapEventTypesForKeywords): this;
    removeData(value: string) {
        this.list = this.list.filter((d) => d.keyword !== value);
        return this;
    }
}
