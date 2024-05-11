import type {
   IWrapBombNote,
   IWrapBombNoteAttribute,
} from '../../types/beatmap/wrapper/bombNote.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseNote } from './abstract/baseNote.ts';

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
      this.customData = deepCopy(
         data.customData ?? BombNote.defaultValue.customData,
      );
   }

   isMappingExtensions(): boolean {
      return this.posX > 3 || this.posX < 0 || this.posY > 2 || this.posY < 0;
   }

   isValid(): boolean {
      return !this.isMappingExtensions();
   }
}
