import { IWrapBaseItem } from '../../types/beatmap/wrapper/baseItem.ts';
import { _ObtainCustomData } from '../../types/utils.ts';
import { Serializable } from '../shared/serializable.ts';

/** Basic building block of beatmap object. */
export abstract class WrapBaseItem<T extends { [P in keyof T]: T[P] }> extends Serializable<T>
    implements IWrapBaseItem<T> {
    protected _customData!: _ObtainCustomData<T>;

    abstract get customData(): _ObtainCustomData<T>;
    abstract set customData(value: _ObtainCustomData<T>);

    setCustomData(value: _ObtainCustomData<T>): this {
        this.customData = value;
        return this;
    }
    resetCustomData() {
        this.customData = {} as _ObtainCustomData<T>;
        return this;
    }
    removeCustomData(key: string | string[]) {
        if (typeof key === 'string') {
            delete this.customData[key];
        } else {
            key.forEach((k) => delete this.customData[k]);
        }
        return this;
    }
    addCustomData(object: _ObtainCustomData<T>): this {
        this.customData = { ...this.customData, object };
        return this;
    }

    func(fn: (object: this) => void) {
        fn(this);
        return this;
    }

    abstract isValid(): boolean;

    isChroma(): boolean {
        return false;
    }

    isNoodleExtensions(): boolean {
        return false;
    }

    isMappingExtensions(): boolean {
        return false;
    }
}
