import type { IWrapBaseItem } from '../../../types/beatmap/wrapper/baseItem.ts';
import { Cloneable } from '../../shared/cloneable.ts';

/**
 * Basic building block of beatmap item.
 *
 * Items contains basic information and utilities.
 *
 * @abstract
 */
export abstract class BaseItem extends Cloneable implements IWrapBaseItem {
   customData: IWrapBaseItem['customData'] = {};

   setCustomData(value: this['customData']): this {
      this.customData = value;
      return this;
   }
   resetCustomData(): this {
      this.customData = {};
      return this;
   }
   removeCustomData(key: string | string[]): this {
      if (typeof key === 'string') {
         delete this.customData[key];
      } else {
         key.forEach((k) => delete this.customData[k]);
      }
      return this;
   }
   addCustomData(object: this['customData']): this {
      for (const k in object) {
         this.customData[k] = object[k];
      }
      return this;
   }

   /**
    * Sort beatmap object(s) accordingly.
    *
    * Certain objects may not contain sortable array.
    *
    * Custom function can be provided and will run after base implemention.
    */
   sort(fn?: (object: this) => void): this {
      fn?.(this);
      return this;
   }

   /** Allow for advanced custom function. */
   perform(fn: (object: this) => void): this {
      fn(this);
      return this;
   }

   /**
    * Check if object is valid in vanilla game.
    * This may also allow for value outside of intended value as long as it does not cause
    * weird, inconsistent behaviour or unable to load the map.
    *
    * However, this validity may not be applicable to older version of the game or schema.
    *
    * Override allow for custom function to take over rather than run alongside.
    *
    * @example
    * ```ts
    * if (!obj.isValid(optionalFn)) {}
    * ```
    */
   isValid(fn?: (object: this) => boolean, _override?: boolean): boolean {
      return fn ? !!fn(this) : true;
   }

   /**
    * Check an object given a custom function.
    *
    * @example
    * ```ts
    * if (obj.check(hasChromaFn)) {}
    * ```
    */
   check(fn?: (object: this) => boolean): boolean {
      return fn ? !!fn(this) : false;
   }
}
