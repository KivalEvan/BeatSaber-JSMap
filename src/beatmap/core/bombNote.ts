import type { IWrapBombNote } from '../../types/beatmap/wrapper/bombNote.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseNote } from './abstract/baseNote.ts';

export function createBombNote(
   data: DeepPartial<IWrapBombNote> = {},
): IWrapBombNote {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      color: -1,
      direction: data.direction ?? 0,
      laneRotation: data.laneRotation ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap bomb note.
 */
export class BombNote extends BaseNote implements IWrapBombNote {
   static defaultValue: IWrapBombNote = createBombNote();

   static createOne(data: Partial<IWrapBombNote> = {}): BombNote {
      return new this(data);
   }
   static create(...data: Partial<IWrapBombNote>[]): BombNote[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapBombNote> = {}) {
      super();
      this.time = data.time ?? BombNote.defaultValue.time;
      this.posX = data.posX ?? BombNote.defaultValue.posX;
      this.posY = data.posY ?? BombNote.defaultValue.posY;
      this.color = -1;
      this.direction = data.direction ?? BombNote.defaultValue.direction;
      this.laneRotation = data.laneRotation ?? BombNote.defaultValue.laneRotation;
      this.customData = deepCopy(data.customData ?? BombNote.defaultValue.customData);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         this.posX >= 0 &&
         this.posX <= 3 &&
         this.posY >= 0 &&
         this.posY <= 2;
   }
}
