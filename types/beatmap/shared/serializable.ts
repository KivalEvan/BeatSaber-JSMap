export interface ISerializable<
    T extends Record<keyof T, unknown> | Record<keyof T, unknown>[]
> {
    readonly data: T;
    toJSON(): T;
    serialize(): string;
    clone(): this;
}
