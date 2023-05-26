import { ISerializable } from '../../types/beatmap/shared/serializable.ts';

export abstract class Serializable<T extends Record<keyof T, unknown> | Record<keyof T, unknown>[]>
    implements ISerializable<T> {
    abstract toJSON(): T;
    serialize() {
        return JSON.stringify(this.toJSON());
    }
    clone<U extends this>(): U {
        return new (this.constructor as { new (data: T): U })(this.toJSON());
    }
}
