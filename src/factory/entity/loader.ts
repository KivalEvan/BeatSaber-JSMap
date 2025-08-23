import type { MirrorFn } from '../../types/beatmap/shared/functions.ts';
import type { IEntityFactoryBuilder } from '../../types/factory/builder.ts';
import type { Context, Serials } from '../../types/factory/common.ts';
import type { IValidateOptions } from '../../types/factory/options.ts';
import { createEntityFactory } from './builder.ts';

/** The options to pass to the entity loader. */
export interface IEntityLoaderOptions<
   TWrapper,
   TSerials extends Serials,
   TVersion extends keyof TSerials,
   TCustomWrapper,
   TCustomSerial,
   TDeserializeContext,
   TValidateContext,
> {
   /** The context to pass to the entity deserializer. */
   context: Context<TDeserializeContext>;
   /** The configuration for the serial validator. If left undefined, validation will not be run. */
   validator?: {
      /** The context to pass to the serial validator. */
      context: Context<TValidateContext>;
      /** The options for the serial validator. */
      options?: Partial<IValidateOptions>;
   };
   /** Perform any side-effects or transformations to the serial entity before being processed. */
   preprocess?: [
      ((data: TCustomSerial, key: TVersion | null) => TSerials[TVersion]),
      ...MirrorFn<TSerials[TVersion]>[],
   ];
   /** Perform any side-effects or transformations to the wrapper entity after being processed. */
   postprocess?: [
      ...MirrorFn<TWrapper>[],
      ((data: TWrapper, key: TVersion | null) => TCustomWrapper),
   ];
}

/**
 * A processor that converts any versioned serial entity into its wrapper form.
 * @param builder The top-level configuration for the entity factory.
 * @param data The serial form of the entity.
 * @param key The versioned key to use for deserialization. If `null`, will resolve the version from the serial entity implicitly.
 * @param loader The options for the entity loader.
 * @returns The wrapper form of the entity.
 */
export function loadEntityContents<
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
   data: TCustomSerial,
   key: TVersion | null,
   loader: IEntityLoaderOptions<
      TWrapper,
      TSerials,
      TVersion,
      TCustomWrapper,
      TCustomSerial,
      TDeserializeContext,
      TValidateContext
   >,
): TCustomWrapper {
   const { name, logger, resolveKey } = builder;
   const log = logger({ tags: [name, 'loader'] });
   const { deserialize, validate } = createEntityFactory(builder);

   const [pretransformer, ...preprocesses] = loader.preprocess ?? [];

   let serial = pretransformer ? pretransformer(data, key) : data as unknown as TSerials[TVersion];

   for (const [i, fn] of preprocesses.entries()) {
      log.info('Running preprocess function #' + (i + 1));
      serial = fn(serial);
   }

   const implicitKey: TVersion = key ?? resolveKey(serial) as TVersion;

   if (loader.validator) {
      validate(serial, implicitKey, loader.validator.context, loader.validator.options);
   }

   let wrapper = deserialize(serial, implicitKey, loader.context);

   const [posttransformer, ...postprocesses] = [...loader.postprocess ?? []].reverse() as [
      (data: TWrapper, key: TVersion | null) => TCustomWrapper,
      ...MirrorFn<TWrapper>[],
   ];

   for (const [i, fn] of postprocesses.entries()) {
      log.info('Running postprocess function #' + (i + 1));
      wrapper = fn(wrapper);
   }

   const result = posttransformer
      ? posttransformer(wrapper, key)
      : wrapper as unknown as TCustomWrapper;

   return result;
}
