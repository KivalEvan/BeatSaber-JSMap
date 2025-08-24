import type { GetAngleFn, MirrorFn } from '../../schema/shared/types/functions.ts';
import type { IWrapBaseNote } from '../../schema/wrapper/types/baseNote.ts';
import {
   isBlueNoteColor,
   isDouble,
   isRedNoteColor,
   mirrorNoteColor,
   mirrorNoteDirectionHorizontally,
   resolveNoteAngle,
} from '../../helpers/core/baseNote.ts';
import { GridObject } from './gridObject.ts';

/**
 * Base note beatmap object.
 *
 * @abstract
 */
export abstract class BaseNote extends GridObject implements IWrapBaseNote {
   color: IWrapBaseNote['color'] = 0;
   direction: IWrapBaseNote['direction'] = 0;

   setColor(value: this['color']): this {
      this.color = value;
      return this;
   }
   setDirection(value: this['direction']): this {
      this.direction = value;
      return this;
   }

   override mirror(flipColor = true, fn?: MirrorFn<this>): this {
      fn?.(this);
      if (flipColor) this.color = mirrorNoteColor(this.color);
      this.direction = mirrorNoteDirectionHorizontally(this.direction);
      return super.mirror(flipColor);
   }

   /**
    * Check if note is red note.
    * ```ts
    * if (note.isBlue()) {}
    * ```
    */
   isRed(): boolean {
      return isRedNoteColor(this.color);
   }

   /**
    * Check if note is blue note.
    * ```ts
    * if (note.isBlue()) {}
    * ```
    */
   isBlue(): boolean {
      return isBlueNoteColor(this.color);
   }

   /**
    * Get standardised note angle.
    *
    * @example
    * ```ts
    * import type { IBaseNote } from './baseNote.ts';
    * let note!: IBaseNote;
    * const optionalFn = (object: IBaseNote) => object.customData.value;
    * const tailAngle = note.getTailAngle(optionalFn);
    * ```
    *
    * Custom function are used to return any arbitrary data first if value exist, otherwise returns base value.
    */
   getAngle(fn?: GetAngleFn<this>): number {
      return fn?.(this) ?? resolveNoteAngle(this.direction);
   }

   /**
    * Compare current note with the note ahead of it and return if the notes is a double.
    * ```ts
    * if (note.isDouble(otherNote, tol, optionalFn)) {}
    * ```
    */
   isDouble(compareTo: IWrapBaseNote, tolerance = 0.01): boolean {
      return isDouble(this, compareTo, tolerance);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override
         ? super.isValid(fn, override)
         : super.isValid(fn, override) && this.direction >= 0 && this.direction <= 8;
   }
}
