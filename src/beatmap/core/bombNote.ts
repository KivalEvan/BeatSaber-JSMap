import type {
   IWrapBombNote,
   IWrapBombNoteAttribute,
} from '../../types/beatmap/wrapper/bombNote.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseNote } from './abstract/baseNote.ts';

/**
 * Core beatmap bomb note.
 */
export class BombNote extends BaseNote implements IWrapBombNote {
   static defaultValue: IWrapBombNoteAttribute = {
      time: 0,
      posX: 0,
      posY: 0,
      color: -1,
      direction: 0,
      laneRotation: 0,
      customData: {},
   };

   static createOne(data: Partial<IWrapBombNoteAttribute> = {}): BombNote {
      return new this(data);
   }
   static create(...data: Partial<IWrapBombNoteAttribute>[]): BombNote[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapBombNoteAttribute> = {}) {
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
