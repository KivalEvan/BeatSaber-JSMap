import type { DataSerializer, DataValidator, Serials } from './common.ts';
import type { ILoggerOptions } from './options.ts';

/** The base options shared across all factories. */
export interface IBaseFactoryBuilder {
   /** The name of the data type being processed. */
   name: string;
   /** A shim for implementing logger functionality. */
   logger: (ctx: ILoggerOptions) => {
      trace: (message: string) => void;
      debug: (message: string) => void;
      info: (message: string) => void;
      warn: (message: string) => void;
      error: (message: string) => void;
   };
}

/** The configurations to supply to a data factory implementation. */
export interface IDataFactoryBuilder<
   TWrapper,
   TSerial,
   TSerializeOptions = never,
   TDeserializeOptions = never,
   TValidateOptions = never,
> extends IBaseFactoryBuilder {
   /** The serialization container used in processing workflows. */
   container: DataSerializer<TWrapper, TSerial, TSerializeOptions, TDeserializeOptions>;
   /** The validation container used in processing workflows. */
   validator?: DataValidator<TSerial, TValidateOptions>;
}

/** The configurations to supply to an entity factory implementation. */
export interface IEntityFactoryBuilder<
   TWrapper,
   TSerials extends Serials,
   TSerializeOptions = never,
   TDeserializeOptions = never,
   TValidateOptions = never,
> extends IBaseFactoryBuilder {
   /**
    * Derives the versioned key from a serial entity type.
    * @param data Any serial data type.
    * @returns The versioned key.
    */
   resolveKey: <const TVersion extends keyof TSerials>(data: TSerials[TVersion]) => keyof TSerials;
   /** The serialization container used in processing workflows. */
   container: {
      [TVersion in keyof TSerials]: DataSerializer<
         TWrapper,
         TSerials[TVersion],
         TSerializeOptions,
         TDeserializeOptions
      >;
   };
   /** The validation container used in processing workflows. */
   validator?: NoInfer<
      { [TVersion in keyof TSerials]?: DataValidator<TSerials[TVersion], TValidateOptions> }
   >;
}
