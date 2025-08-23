import type { StandardSchemaV1 } from '../../deps.ts';
import type { IEntityFactoryBuilder } from '../../types/factory/builder.ts';
import type { Context, Serials } from '../../types/factory/common.ts';
import type { IValidateOptions } from '../../types/factory/options.ts';
import { validateContents } from '../helpers/validator.ts';

interface IEntityFactory<
   TWrapper,
   TSerials extends Serials,
   TSerializeContext,
   TDeserializeContext,
   TValidateContext,
> {
   /** Converts a wrapper entity into its versioned serial form. */
   serialize: <const TVersion extends keyof TSerials>(
      data: TWrapper,
      version: TVersion,
      context: Context<TSerializeContext>,
   ) => TSerials[TVersion];
   /** Converts a versioned serial entity into its wrapper form. */
   deserialize: <const TVersion extends keyof TSerials>(
      data: TSerials[TVersion],
      version: TVersion | null,
      context: Context<TDeserializeContext>,
   ) => TWrapper;
   /** Ensures the provided data matches the schema of the versioned serial entity. */
   validate: <const TVersion extends keyof TSerials>(
      data: TSerials[TVersion],
      version: TVersion,
      context: Context<TValidateContext>,
      options?: Partial<IValidateOptions>,
   ) => void;
}

/**
 * Allows you to architect your own serialization engine for versioned entity types.
 * @param builder The options for the entity factory.
 * @returns A collection of functions that implement the logic for entity processing.
 */
export function createEntityFactory<
   const TWrapper,
   const TSerials extends Serials,
   const TSerializeContext = never,
   const TDeserializeContext = never,
   const TValidateContext = never,
>(
   builder: IEntityFactoryBuilder<
      TWrapper,
      TSerials,
      TSerializeContext,
      TDeserializeContext,
      TValidateContext
   >,
): IEntityFactory<TWrapper, TSerials, TSerializeContext, TDeserializeContext, TValidateContext> {
   const { name, resolveKey, container, validator } = builder;

   return {
      serialize: (data, version, context) => {
         if (!container[version]) {
            throw new Error(`Missing serializer for entity: ${name}/${version.toString()}`);
         }
         return container[version].serialize(data, context);
      },
      deserialize: (data, key, context) => {
         const version = key ?? resolveKey(data);
         if (!container[version]) {
            throw new Error(`Missing deserializer for entity: ${name}/${version.toString()}`);
         }
         return container[version].deserialize(data, context);
      },
      validate: (data, version, context, options) => {
         if (!validator || !validator[version]) {
            throw new Error(`Missing validator for data: ${name}`);
         }
         const schema = validator[version].constructor(context) as StandardSchemaV1<
            TSerials[typeof version]
         >;
         return validateContents(builder, data, schema, options);
      },
   };
}
