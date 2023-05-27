import { IWrapEventBox } from '../../types/beatmap/wrapper/eventBox.ts';
import { IWrapEventBoxGroup } from '../../types/beatmap/wrapper/eventBoxGroup.ts';
import { WrapBaseObject } from './baseObject.ts';

/** Base event box group beatmap class object. */
export abstract class WrapEventBoxGroup<
    TGroup extends { [P in keyof TGroup]: TGroup[P] },
    TBox extends { [P in keyof TBox]: TBox[P] },
    TBase extends { [P in keyof TBase]: TBase[P] },
    TFilter extends { [P in keyof TFilter]: TFilter[P] },
> extends WrapBaseObject<TGroup> implements IWrapEventBoxGroup<TGroup> {
    protected _id!: IWrapEventBoxGroup['id'];
    protected _boxes!: IWrapEventBox<TBox, TBase, TFilter>[];

    abstract get id(): IWrapEventBoxGroup['id'];
    abstract set id(value: IWrapEventBoxGroup['id']);
    abstract get boxes(): IWrapEventBox<TBox, TBase, TFilter>[];
    abstract set boxes(value: IWrapEventBox<TBox, TBase, TFilter>[]);

    isValid(): boolean {
        return this.id >= 0 && this.boxes.every((e) => e.isValid());
    }
}
