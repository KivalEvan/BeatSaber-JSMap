// deno-lint-ignore ban-types
export abstract class Serializable<T extends Object> {
    abstract toObject(): T;

    serialize() {
        return JSON.stringify(this.toObject());
    }
}
