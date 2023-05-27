import { IWrapEventTypesForKeywords } from '../../types/beatmap/wrapper/eventTypesForKeywords.ts';
import { IWrapEventTypesWithKeywords } from '../../types/beatmap/wrapper/eventTypesWithKeywords.ts';
import { Serializable } from '../shared/serializable.ts';

/** Basic event types with keywords beatmap class object. */
export abstract class WrapEventTypesWithKeywords<
    T extends { [P in keyof T]: T[P] },
    U extends { [P in keyof U]: U[P] },
> extends Serializable<T> implements IWrapEventTypesWithKeywords<T> {
    protected _list!: IWrapEventTypesForKeywords<U>[];

    abstract get list(): IWrapEventTypesForKeywords<U>[];
    abstract set list(value: IWrapEventTypesForKeywords<U>[]);

    setData(value: IWrapEventTypesForKeywords<U>[]) {
        this.list = value;
        return this;
    }
    abstract addData(value: IWrapEventTypesForKeywords<U>): this;
    removeData(value: string) {
        this.list = this.list.filter((d) => d.keyword !== value);
        return this;
    }
}
