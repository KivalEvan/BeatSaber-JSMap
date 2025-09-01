import type { IEntityFactoryBuilder } from '../../types/factory/builder.ts';
import type { Serials } from '../../types/factory/common.ts';
import { type IEntityLoaderOptions, loadEntityContents } from './loader.ts';
import { type IEntitySaverOptions, saveEntityContents } from './saver.ts';

interface IEntityProcessor<
   TWrapper,
   TSerials extends Serials,
   TSerializeContext,
   TDeserializeContext,
   TValidateContext,
> {
   /**
    * Processes a serial entity into its wrapper form.
    * @param data The serial form of the entity.
    * @param key The versioned key to use for deserialization. If `null`, will resolve the version from the serial entity implicitly.
    * @param options The options for the entity loader, as derived from the factory builder.
    * @returns The wrapper form of the entity.
    */
   loadSync: <
      const TVersion extends keyof TSerials,
      const TCustomWrapper = TWrapper,
      const TCustomSerial = TSerials[TVersion],
   >(
      data: TCustomSerial,
      key: TVersion | null,
      options: IEntityLoaderOptions<
         TWrapper,
         TSerials,
         TVersion,
         TCustomWrapper,
         TCustomSerial,
         TDeserializeContext,
         TValidateContext
      >,
   ) => TCustomWrapper;
   /**
    * Processes wrapper data into its serial form.
    * @param data The wrapper form of the data.
    * @param key The versioned key to use for serialization.
    * @param options The options for the data saver, as derived from the factory builder.
    * @returns The serial form of the data.
    */
   saveSync: <
      const TVersion extends keyof TSerials,
      const TCustomWrapper = TWrapper,
      const TCustomSerial = TSerials[TVersion],
   >(
      data: TCustomWrapper,
      key: TVersion,
      options: IEntitySaverOptions<
         TWrapper,
         TSerials,
         TVersion,
         TCustomWrapper,
         TCustomSerial,
         TSerializeContext,
         TValidateContext
      >,
   ) => TCustomSerial;
}

/**
 * Create a custom serialization processor for versioned entity types.
 * @param builder The top-level configuration for the factory.
 * @returns A collection of loader/saver functions that can be used for integrated entity processing.
 */
export function createEntityProcessor<
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
): IEntityProcessor<TWrapper, TSerials, TSerializeContext, TDeserializeContext, TValidateContext> {
   return {
      loadSync: (data, version, options) => loadEntityContents(builder, data, version, options),
      saveSync: (data, version, options) => saveEntityContents(builder, data, version, options),
   };
}
