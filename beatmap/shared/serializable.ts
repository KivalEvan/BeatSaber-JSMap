// deno-lint-ignore-file no-explicit-any
import type { ISerializable } from '../../types/beatmap/shared/serializable.ts';

export abstract class Serializable<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
> implements ISerializable<T> {
   abstract toSchema(version?: number): { [key: string]: any };
   abstract toJSON(): T;
   serialize(version?: number): string {
      return JSON.stringify(this.toSchema(version));
   }
   clone<U extends this>(): U {
      return new (this.constructor as { new (data: any): U })(this);
   }
}
