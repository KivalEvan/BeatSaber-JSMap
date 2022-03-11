export abstract class Serializable<T> {
    abstract toObject(): T;

    serialize() {
        return JSON.stringify(this.toObject());
    }
}
