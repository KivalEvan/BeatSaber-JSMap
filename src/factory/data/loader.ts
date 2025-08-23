import type { MirrorFn } from '../../types/beatmap/shared/functions.ts';
import type { IDataFactoryBuilder } from '../../types/factory/builder.ts';
import type { Context } from '../../types/factory/common.ts';
import type { IValidateOptions } from '../../types/factory/options.ts';
import { createDataFactory } from './builder.ts';

/** The options to pass to the data loader. */
export interface IDataLoaderOptions<
   TWrapper,
   TSerial,
   TCustomWrapper,
   TCustomSerial,
   TDeserializeContext,
   TValidateContext,
> {
   /** The context to pass to the data deserializer. */
   context: Context<TDeserializeContext>;
   /** The configuration for the serial validator. If left undefined, validation will not be run. */
   validator?: {
      /** The context to pass to the serial validator. */
      context: Context<TValidateContext>;
      /** The options for the serial validator. */
      options?: Partial<IValidateOptions>;
   };
   /** Perform any side-effects or transformations to the serial data before being processed. */
   preprocess?: [((data: TCustomSerial) => TSerial), ...MirrorFn<TSerial>[]];
   /** Perform any side-effects or transformations to the wrapper data after being processed. */
   postprocess?: [...MirrorFn<TWrapper>[], ((data: TWrapper) => TCustomWrapper)];
}

/**
 * A processor that converts any serial data into its wrapper form.
 * @param builder The top-level configuration for the data factory.
 * @param data The wrapper form of the data.
 * @param loader The options for the data loader.
 * @returns The serial form of the data.
 */
export function loadDataContents<
   const TWrapper,
   const TSerial,
   const TCustomWrapper = TWrapper,
   const TCustomSerial = TSerial,
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
   data: TCustomSerial,
   loader: IDataLoaderOptions<
      TWrapper,
      TSerial,
      TCustomWrapper,
      TCustomSerial,
      TDeserializeContext,
      TValidateContext
   >,
): TCustomWrapper {
   const { name, logger } = builder;
   const log = logger({ tags: [name, 'loader'] });
   const { deserialize, validate } = createDataFactory(builder);

   const [pretransformer, ...preprocesses] = loader.preprocess ?? [];

   let serial = pretransformer ? pretransformer(data) : data as unknown as TSerial;

   for (const [i, fn] of preprocesses.entries()) {
      log.info('Running preprocess function #' + (i + 1));
      serial = fn(serial);
   }

   if (loader.validator) {
      validate(serial, loader.validator.context, loader.validator.options);
   }

   let wrapper = deserialize(serial, loader.context);

   const [posttransformer, ...postprocesses] = [...loader.postprocess ?? []].reverse() as [
      (data: TWrapper) => TCustomWrapper,
      ...MirrorFn<TWrapper>[],
   ];

   for (const [i, fn] of postprocesses.entries()) {
      log.info('Running postprocess function #' + (i + 1));
      wrapper = fn(wrapper);
   }

   const result = posttransformer ? posttransformer(wrapper) : wrapper as unknown as TCustomWrapper;

   return result;
}
