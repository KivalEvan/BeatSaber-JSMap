// deno-lint-ignore-file no-explicit-any
import { NoteDirectionAngle } from '../shared/constants.ts';
import type {
   IWrapColorNote,
   IWrapColorNoteAttribute,
} from '../../types/beatmap/wrapper/colorNote.ts';
import { BaseNote } from './abstract/baseNote.ts';
import type { ModType } from '../../types/beatmap/shared/modCheck.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../utils/misc.ts';

export class ColorNote extends BaseNote implements IWrapColorNote {
   static schema: Record<number, ISchemaContainer<IWrapColorNoteAttribute>> = {};
   static defaultValue: IWrapColorNoteAttribute = {
      time: 0,
      posX: 0,
      posY: 0,
      color: 0,
      direction: 0,
      angleOffset: 0,
      laneRotation: 0,
      customData: {},
   };

   static create(...data: Partial<IWrapColorNoteAttribute>[]): ColorNote[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapColorNoteAttribute> = {}) {
      super();
      this.time = data.time ?? ColorNote.defaultValue.time;
      this.posX = data.posX ?? ColorNote.defaultValue.posX;
      this.posY = data.posY ?? ColorNote.defaultValue.posY;
      this.color = data.color ?? ColorNote.defaultValue.color;
      this.direction = data.direction ?? ColorNote.defaultValue.direction;
      this.angleOffset = data.angleOffset ?? ColorNote.defaultValue.angleOffset;
      this.laneRotation = data.laneRotation ?? ColorNote.defaultValue.laneRotation;
      this.customData = deepCopy(
         data.customData ?? ColorNote.defaultValue.customData,
      );
   }
   static fromJSON(data: { [key: string]: any }, version: number): ColorNote {
      return new this(ColorNote.schema[version]?.deserialize(data));
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (ColorNote.schema[version || 0]?.serialize(this) || this.toJSON()) as T;
   }
   toJSON(): IWrapColorNoteAttribute {
      return {
         time: this.time,
         posX: this.posX,
         posY: this.posY,
         color: this.color,
         direction: this.direction,
         angleOffset: this.angleOffset,
         laneRotation: this.laneRotation,
         customData: deepCopy(this.customData),
      };
   }

   angleOffset: IWrapColorNote['angleOffset'] = 0;

   setAngleOffset(value: this['angleOffset']): this {
      this.angleOffset = value;
      return this;
   }

   mirror(flipColor = true, _flipNoodle?: boolean): this {
      return super.mirror(flipColor);
   }

   getAngle(_type?: ModType): number {
      return (
         (NoteDirectionAngle[
            this.direction as keyof typeof NoteDirectionAngle
         ] || 0) + this.angleOffset
      );
   }

   isMappingExtensions(): boolean {
      return (
         this.posX > 3 ||
         this.posX < 0 ||
         this.posY > 2 ||
         this.posY < 0 ||
         (this.direction >= 1000 && this.direction <= 1360) ||
         (this.direction >= 2000 && this.direction <= 2360)
      );
   }
}
