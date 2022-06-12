import { deepCopy } from '../../utils/misc.ts';

// deno-lint-ignore ban-types
export abstract class Serializable<T extends Object> {
    protected data: Required<T>;
    constructor(data: Required<T>) {
        this.data = data;
    }

    abstract toObject(): T;

    /** Convert class object into serialized string. */
    serialize() {
        return JSON.stringify(this.toObject());
    }

    /** Clone class object without referencing the original. */
    clone<U extends this>(): U {
        const cloned = new (this.constructor as { new (): U })();
        cloned.data = deepCopy(this.data);
        return cloned;
    }
}
