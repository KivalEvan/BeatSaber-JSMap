export interface ISerializable<T extends Record<keyof T, unknown> | Record<keyof T, unknown>[]> {
    /** Standard serializer used in JSON. */
    // deno-lint-ignore no-explicit-any
    toJSON(): Record<string, any>;
    /** Convert class object into serialized string. */
    serialize(): string;
    /** Clone class object without referencing the original. */
    clone(): this;
}
