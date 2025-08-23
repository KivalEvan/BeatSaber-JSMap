import type { IDataFactoryBuilder } from '../../types/factory/builder.ts';
import { type IDataLoaderOptions, loadDataContents } from './loader.ts';
import { type IDataSaverOptions, saveDataContents } from './saver.ts';

interface IDataProcessor<
   TWrapper,
   TSerial,
   TSerializeContext,
   TDeserializeContext,
   TValidateContext,
> {
   /**
    * Processes serial data into its wrapper form.
    * @param data The serial form of the data.
    * @param options The options for the data loader, as derived from the factory builder.
    * @returns The wrapper form of the data.
    */
   loadSync: <const TCustomWrapper = TWrapper, const TCustomSerial = TSerial>(
      data: TCustomSerial,
      options: IDataLoaderOptions<
         TWrapper,
         TSerial,
         TCustomWrapper,
         TCustomSerial,
         TDeserializeContext,
         TValidateContext
      >,
   ) => TCustomWrapper;
   /**
    * Processes wrapper data into its serial form.
    * @param data The wrapper form of the data.
    * @param options The options for the data saver, as derived from the factory builder.
    * @returns The serial form of the data.
    */
   saveSync: <const TCustomWrapper = TWrapper, const TCustomSerial = TSerial>(
      data: TCustomWrapper,
      options: IDataSaverOptions<
         TWrapper,
         TSerial,
         TCustomWrapper,
         TCustomSerial,
         TSerializeContext,
         TValidateContext
      >,
   ) => TCustomSerial;
}

/**
 * Create a custom serialization processor for arbitrary data types.
 * @param builder The top-level configuration for the factory.
 * @returns A collection of loader/saver functions that can be used for integrated data processing.
 */
export function createDataProcessor<
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
): IDataProcessor<TWrapper, TSerial, TSerializeContext, TDeserializeContext, TValidateContext> {
   return {
      loadSync: (data, options) => loadDataContents(builder, data, options),
      saveSync: (data, options) => saveDataContents(builder, data, options),
   };
}
