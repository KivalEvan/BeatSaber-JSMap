import { Serializable } from '../../shared/types/serializable.ts';

export interface IBaseObject {
    /** Beat time `<float>` of beatmap object. */
    b: number;
}

/** Basic building block of beatmap. */
export abstract class BaseObject<T> extends Serializable<T> {
    private b;
    constructor(baseObject: IBaseObject) {
        super();
        this.b = baseObject.b;
    }

    /** Beat time `<float>` of beatmap object. */
    get time() {
        return this.b;
    }
    set time(value: number) {
        this.b = value;
    }

    setTime(value: number) {
        this.time = value;
        return this;
    }

    // abstract isValid(): boolean;
}
