import type { StandardSchemaV1 } from '../../deps.ts';
import type { Fallback } from '../utils.ts';

/** A map of serial data types to their respective versioned keys. */
export type Serials<T = unknown> = { [key: PropertyKey]: T };

/** The user-defined parameters for a process. Will use a fallback value if the type is `never`. */
export type Context<T> = Fallback<T, null>;

/** A container of functions that handle conversion between wrapper and serial data types. */
export interface DataSerializer<TWrapper, TSerial, TSerializeContext, TDeserializeContext> {
   /**
    * Converts wrapper data into its serial form.
    * @param data The wrapper form of the data.
    * @param context The options for the serializer.
    * @returns The serial form of the data.
    */
   serialize: (data: TWrapper, context: Context<TSerializeContext>) => TSerial;
   /**
    * Converts serial data into its wrapper form.
    * @param data The serial form of the data.
    * @param options The options for the deserializer.
    * @returns The wrapper form of the data.
    */
   deserialize: (data: TSerial, context: Context<TDeserializeContext>) => TWrapper;
}

/** A container of functions that handle serial data validation against a schema. */
export interface DataValidator<TSerial, TValidateContext> {
   /**
    * Create a schema for serial data validation.
    * @param context The options for the validator.
    * @returns A [standard-schema/v1](https://standardschema.dev) compatible schema.
    */
   constructor: (context: Context<TValidateContext>) => StandardSchemaV1<TSerial>;
}
