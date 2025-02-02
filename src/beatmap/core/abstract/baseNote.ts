import type { GetAngleFn, MirrorFn } from '../../../types/beatmap/shared/functions.ts';
import type { IWrapBaseNote } from '../../../types/beatmap/wrapper/baseNote.ts';
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

   isRed(): boolean {
      return isRedNoteColor(this.color);
   }

   isBlue(): boolean {
      return isBlueNoteColor(this.color);
   }

   getAngle(fn?: GetAngleFn<this>): number {
      return fn?.(this) ?? resolveNoteAngle(this.direction);
   }

   isDouble(compareTo: IWrapBaseNote, tolerance = 0.01): boolean {
      return isDouble(this, compareTo, tolerance);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override
         ? super.isValid(fn, override)
         : super.isValid(fn, override) && this.direction >= 0 && this.direction <= 8;
   }
}
