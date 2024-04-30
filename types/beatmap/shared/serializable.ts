// deno-lint-ignore-file no-explicit-any
export interface ISerializable<T extends { [P in keyof T]: T[P] } = Record<string, any>> {
   /** Convert class object into schema. */
   toSchema(version?: number): { [key: string]: any };
   /** Standard serializer used in JSON.
    *
    * Returns representation of class object in JSON.
    *
    * Use `toSchema` to convert class object into schema.
    */
   toJSON(): T;
   /** Convert class object into serialized string. */
   serialize(version?: number): string;
   /** Clone class object without referencing the original. */
   clone(): this;
}
