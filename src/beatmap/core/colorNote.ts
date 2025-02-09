import type { GetAngleFn, MirrorFn } from '../../types/beatmap/shared/functions.ts';
import type { IWrapColorNote } from '../../types/beatmap/wrapper/colorNote.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { resolveNoteAngle } from '../helpers/core/baseNote.ts';
import { BaseNote } from './abstract/baseNote.ts';

export function createColorNote(
   data: DeepPartial<IWrapColorNote> = {},
): IWrapColorNote {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      color: data.color ?? 0,
      direction: data.direction ?? 0,
      angleOffset: data.angleOffset ?? 0,
      laneRotation: data.laneRotation ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap color note.
 */
export class ColorNote extends BaseNote implements IWrapColorNote {
   static defaultValue: IWrapColorNote = createColorNote();

   static createOne(data: Partial<IWrapColorNote> = {}): ColorNote {
      return new this(data);
   }
   static create(...data: Partial<IWrapColorNote>[]): ColorNote[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapColorNote> = {}) {
      super();
      this.time = data.time ?? ColorNote.defaultValue.time;
      this.posX = data.posX ?? ColorNote.defaultValue.posX;
      this.posY = data.posY ?? ColorNote.defaultValue.posY;
      this.color = data.color ?? ColorNote.defaultValue.color;
      this.direction = data.direction ?? ColorNote.defaultValue.direction;
      this.angleOffset = data.angleOffset ?? ColorNote.defaultValue.angleOffset;
      this.laneRotation = data.laneRotation ?? ColorNote.defaultValue.laneRotation;
      this.customData = deepCopy(data.customData ?? ColorNote.defaultValue.customData);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         this.posX >= 0 &&
         this.posX <= 3 &&
         this.posY >= 0 &&
         this.posY <= 2 &&
         this.direction >= 0 &&
         this.direction <= 8;
   }

   angleOffset: IWrapColorNote['angleOffset'] = 0;

   setAngleOffset(value: this['angleOffset']): this {
      this.angleOffset = value;
      return this;
   }

   override mirror(flipColor = true, fn?: MirrorFn<this>): this {
      fn?.(this);
      return super.mirror(flipColor);
   }

   override getAngle(fn?: GetAngleFn<this>): number {
      return fn?.(this) ?? resolveNoteAngle(this.direction) + this.angleOffset;
   }
}
