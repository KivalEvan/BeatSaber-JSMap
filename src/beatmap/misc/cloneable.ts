// deno-lint-ignore-file no-explicit-any
import type { ICloneable } from '../schema/shared/types/cloneable.ts';

/**
 * Abstract class to clone class object.
 *
 * Must contain constructor parameter that reference itself.
 * Otherwise override the clone method.
 */
export abstract class Cloneable implements ICloneable {
   clone<U extends this>(): U {
      return new (this.constructor as { new (data: any): U })(this);
   }
}
