import type { MirrorFn } from '../../types/beatmap/shared/functions.ts';
import type { IDataFactoryBuilder } from '../../types/factory/builder.ts';
import type { Context } from '../../types/factory/common.ts';
import type { IValidateOptions } from '../../types/factory/options.ts';
import { createDataFactory } from './builder.ts';

/** The options to pass to the data saver. */
export interface IDataSaverOptions<
   TWrapper,
   TSerial,
   TCustomWrapper,
   TCustomSerial,
   TSerializeContext,
   TValidateContext,
> {
   /** The context to pass to the data serializer. */
   context: Context<TSerializeContext>;
   /** The configuration for the serial validator. If left undefined, validation will not be run. */
   validator?: {
      /** The context to pass to the serial validator. */
      context: Context<TValidateContext>;
      /** The options for the serial validator. */
      options?: Partial<IValidateOptions>;
   };
   /** Perform any side-effects or transformations to the wrapper data before being processed. */
   preprocess?: [((data: TCustomWrapper) => TWrapper), ...MirrorFn<TWrapper>[]];
   /** Perform any side-effects or transformations to the serial data after being processed. */
   postprocess?: [...MirrorFn<TSerial>[], ((data: TSerial) => TCustomSerial)];
}

/**
 * A processor that converts any wrapper data into its serial form.
 * @param builder The top-level configuration for the data factory.
 * @param data The serial form of the data.
 * @param saver The options for the data saver.
 * @returns The wrapper form of the data.
 */
export function saveDataContents<
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
   data: TCustomWrapper,
   saver: IDataSaverOptions<
      TWrapper,
      TSerial,
      TCustomWrapper,
      TCustomSerial,
      TSerializeContext,
      TValidateContext
   >,
): TCustomSerial {
   const { name, logger } = builder;
   const log = logger({ tags: [name, 'saver'] });
   const { serialize, validate } = createDataFactory(builder);

   const [pretransformer, ...preprocesses] = saver.preprocess ?? [];

   let wrapper = pretransformer ? pretransformer(data) : data as unknown as TWrapper;

   for (const [i, fn] of preprocesses.entries()) {
      log.info('Running preprocess function #' + (i + 1));
      wrapper = fn(wrapper);
   }

   let serial = serialize(wrapper, saver.context);

   if (saver.validator) {
      validate(serial, saver.validator.context, saver.validator.options);
   }

   const [posttransformer, ...postprocesses] = [...saver.postprocess ?? []].reverse() as [
      (data: TSerial) => TCustomSerial,
      ...MirrorFn<TSerial>[],
   ];

   for (const [i, fn] of postprocesses.entries()) {
      log.info('Running postprocess function #' + (i + 1));
      serial = fn(serial);
   }

   const result = posttransformer ? posttransformer(serial) : wrapper as unknown as TCustomSerial;

   return result;
}
