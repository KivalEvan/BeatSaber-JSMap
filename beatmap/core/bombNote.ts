// deno-lint-ignore-file no-explicit-any
import { GridObject } from './abstract/gridObject.ts';
import type {
   IWrapBombNote,
   IWrapBombNoteAttribute,
} from '../../types/beatmap/wrapper/bombNote.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../utils/misc.ts';

export class BombNote extends GridObject implements IWrapBombNote {
   static schema: Record<number, ISchemaContainer<IWrapBombNoteAttribute>> = {};
   static defaultValue: IWrapBombNoteAttribute = {
      time: 0,
      posX: 0,
      posY: 0,
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
      this.laneRotation = data.laneRotation ?? BombNote.defaultValue.laneRotation;
      this.customData = deepCopy(data.customData ?? BombNote.defaultValue.customData);
   }
   static fromJSON(data: Record<string, any>, version: number): BombNote {
      return new this(BombNote.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (BombNote.schema[version || 0]?.serialize(this) || this.toJSON()) as T;
   }
   toJSON(): IWrapBombNoteAttribute {
      return {
         time: this.time,
         posX: this.posX,
         posY: this.posY,
         laneRotation: this.laneRotation,
         customData: deepCopy(this.customData),
      };
   }

   isMappingExtensions(): boolean {
      return this.posX > 3 || this.posX < 0 || this.posY > 2 || this.posY < 0;
   }

   isValid(): boolean {
      return !this.isMappingExtensions();
   }
}
