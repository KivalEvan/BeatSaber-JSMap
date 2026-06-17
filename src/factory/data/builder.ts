import type { IDataFactoryBuilder } from '../../types/factory/builder.ts';
import type { Context } from '../../types/factory/common.ts';
import type { IValidateOptions } from '../../types/factory/options.ts';
import { validateContents } from '../helpers/validator.ts';

interface IDataFactory<
   TWrapper,
   TSerial,
   TSerializeContext,
   TDeserializeContext,
   TValidateContext,
> {
   /** Converts wrapper data into its serial form. */
   serialize: (
      data: TWrapper,
      context: Context<TSerializeContext>,
   ) => TSerial;
   /** Converts serial data into its wrapper form. */
   deserialize: (
      data: TSerial,
      context: Context<TDeserializeContext>,
   ) => TWrapper;
   /** Ensures the provided data matches the schema of the serial data. */
   validate: (
      data: unknown,
      context: Context<TValidateContext>,
      options?: Partial<IValidateOptions>,
   ) => void;
}

/**
 * Allows you to architect your own serialization engine for arbitrary data types.
 * @param builder The options for the data factory.
 * @returns A collection of functions that implement the logic for data processing.
 */
export function createDataFactory<
   const TWrapper,
   const TSerial,
   const TSerializeContext = never,
   const TDeserializeContext = never,
   const TValidateContext = never,
>(
   builder: IDataFactoryBuilder<
      TWrapper,
      TSerial,
      TSerializeContext,
      TDeserializeContext,
      TValidateContext
   >,
): IDataFactory<TWrapper, TSerial, TSerializeContext, TDeserializeContext, TValidateContext> {
   const { name, container, validator } = builder;

   return {
      serialize: (data, context) => {
         if (!container) {
            throw new Error(`Missing serializer for data: ${name}`);
         }
         return container.serialize(data, context);
      },
      deserialize: (data, context) => {
         if (!container) {
            throw new Error(`Missing deserializer for data: ${name}`);
         }
         return container.deserialize(data, context);
      },
      validate: (data, context, options) => {
         if (!validator) {
            throw new Error(`Missing validator for data: ${name}`);
         }
         const schema = validator.constructor(context);
         return validateContents(builder, data, schema, options);
      },
   };
}
