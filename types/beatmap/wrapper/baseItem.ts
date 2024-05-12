import type { ICustomDataBase } from '../shared/custom/customData.ts';
import type { ICloneable } from '../shared/cloneable.ts';

export interface IWrapBaseItemAttribute {
   /**
    * Custom data `<object>` of beatmap object.
    *
    * This has no type-safety for unsupported data.
    */
   customData: ICustomDataBase;
}

export interface IWrapBaseItem extends ICloneable, IWrapBaseItemAttribute {
   setCustomData(value: this['customData']): this;
   resetCustomData(): this;
   removeCustomData(key: string): this;
   addCustomData(object: this['customData']): this;

   /**
    * Sort beatmap object(s) accordingly.
    *
    * Certain objects may not contain sortable array.
    *
    * Custom function can be provided and will run after base implemention.
    */
   sort(fn?: (object: this) => void): this;

   /** Allow for advanced custom function. */
   func(fn: (object: this) => void): this;

   /**
    * Check if object is valid in vanilla game.
    *
    * @example
    * ```ts
    * if (obj.isValid()) {}
    * ```
    */
   isValid(): boolean;

   /**
    * Check if object has Chroma properties.
    *
    * @example
    * ```ts
    * if (obj.isChroma()) {}
    * ```
    */
   isChroma(): boolean;

   /**
    * Check if object has Noodle Extensions properties.
    *
    * @example
    * ```ts
    * if (obj.isNoodleExtensions()) {}
    * ```
    */
   isNoodleExtensions(): boolean;

   /**
    * Check if object has Mapping Extensions properties.
    *
    * @example
    * ```ts
    * if (obj.isMappingExtensions()) {}
    * ```
    */
   isMappingExtensions(): boolean;
}
