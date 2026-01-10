import type { MirrorFn } from '../../types/beatmap/shared/functions.ts';
import type { IEntityFactoryBuilder } from '../../types/factory/builder.ts';
import type { Context, Serials } from '../../types/factory/common.ts';
import type { IValidateOptions } from '../../types/factory/options.ts';
import { createEntityFactory } from './builder.ts';

/** The options to pass to the entity saver. */
export interface IEntitySaverOptions<
   TWrapper,
   TSerials extends Serials,
   TVersion extends keyof TSerials,
   TCustomWrapper,
   TCustomSerial,
   TSerializeContext,
   TValidateContext,
> {
   /** The context to pass to the entity serializer. */
   context: Context<TSerializeContext>;
   /** The configuration for the serial validator. If left undefined, validation will not be run. */
   validator?: {
      /** The context to pass to the serial validator. */
      context: Context<TValidateContext>;
      /** The options for the serial validator. */
      options?: Partial<IValidateOptions>;
   };
   /** Perform any side-effects or transformations to the wrapper entity before being processed. */
   preprocess?: [
      ((data: TCustomWrapper, version: TVersion) => TWrapper),
      ...MirrorFn<TWrapper>[],
   ];
   /** Perform any side-effects or transformations to the serial entity after being processed. */
   postprocess?: [
      ...MirrorFn<TSerials[TVersion]>[],
      ((data: TSerials[TVersion], version: TVersion) => TCustomSerial),
   ];
}

/**
 * A processor that converts any wrapper entity into its versioned serial form.
 * @param builder The top-level configuration for the entity factory.
 * @param data The wrapper form of the entity.
 * @param key The versioned key to use for serialization.
 * @param saver The options for the entity saver.
 * @returns The serial form of the entity.
 */
export function saveEntityContents<
   const TWrapper,
   const TSerials extends Serials,
   const TVersion extends keyof TSerials,
   const TCustomWrapper = TWrapper,
   const TCustomSerial = TSerials[TVersion],
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
   data: TCustomWrapper,
   key: TVersion,
   saver: IEntitySaverOptions<
      TWrapper,
      TSerials,
      TVersion,
      TCustomWrapper,
      TCustomSerial,
      TSerializeContext,
      TValidateContext
   >,
): TCustomSerial {
   const { name, logger } = builder;
   const log = logger({ tags: [name, 'saver'] });
   const { serialize, validate } = createEntityFactory(builder);

   const [pretransformer, ...preprocesses] = saver.preprocess ?? [];

   let wrapper = pretransformer ? pretransformer(data, key) : data as unknown as TWrapper;

   for (const [i, fn] of preprocesses.entries()) {
      log.info('Running preprocess function #' + (i + 1));
      wrapper = fn(wrapper);
   }

   let serial = serialize(wrapper, key, saver.context);

   if (saver.validator) {
      validate(serial, key, saver.validator.context, saver.validator.options);
   }

   const [posttransformer, ...postprocesses] = [...saver.postprocess ?? []].reverse() as [
      (data: TSerials[TVersion], version: TVersion) => TCustomSerial,
      ...MirrorFn<TSerials[TVersion]>[],
   ];

   for (const [i, fn] of postprocesses.entries()) {
      log.info('Running postprocess function #' + (i + 1));
      serial = fn(serial);
   }

   const result = posttransformer
      ? posttransformer(serial, key)
      : serial as unknown as TCustomSerial;

   return result;
}
