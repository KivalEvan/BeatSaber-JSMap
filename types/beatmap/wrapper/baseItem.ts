// deno-lint-ignore-file no-explicit-any
import type { ICustomDataBase } from '../shared/custom/customData.ts';
import type { ISerializable } from '../shared/serializable.ts';

export interface IWrapBaseItemAttribute {
   /**
    * Custom data `<object>` of beatmap object.
    *
    * This has no type-safety for unsupported data.
    */
   customData: ICustomDataBase;
   /**
    * Old data `<object>` of beatmap object.
    *
    * Recommended to not modify or use as this is used to handle old data represented as other attribute.
    */
   _deprData: Record<string, unknown>;
}

export interface IWrapBaseItem<
   T extends Record<string, any> = IWrapBaseItemAttribute,
> extends IWrapBaseItemAttribute, ISerializable<T> {
   setCustomData(value: ICustomDataBase): this;
   resetCustomData(): this;
   removeCustomData(key: string): this;
   addCustomData(object: ICustomDataBase): this;

   /** Allow for advanced custom function. */
   func(fn: (object: this) => void): this;

   /**
    * Check if object is valid in vanilla game.
    * ```ts
    * if (obj.isValid()) {}
    * ```
    */
   isValid(): boolean;

   /**
    * Check if object has Chroma properties.
    * ```ts
    * if (obj.isChroma()) {}
    * ```
    */
   isChroma(): boolean;

   /**
    * Check if object has Noodle Extensions properties.
    * ```ts
    * if (obj.isNoodleExtensions()) {}
    * ```
    */
   isNoodleExtensions(): boolean;

   /**
    * Check if object has Mapping Extensions properties.
    * ```ts
    * if (obj.isMappingExtensions()) {}
    * ```
    */
   isMappingExtensions(): boolean;
}
