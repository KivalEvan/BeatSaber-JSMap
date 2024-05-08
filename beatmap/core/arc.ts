// deno-lint-ignore-file no-explicit-any
import { BaseSlider } from './abstract/baseSlider.ts';
import { NoteDirectionAngle } from '../shared/constants.ts';
import type { IWrapArc, IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import type { ModType } from '../../types/beatmap/shared/modCheck.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../utils/misc.ts';
import { arc as v2Arc } from '../schema/v2/arc.ts';
// import { arc as v3Arc } from '../schema/v3/arc.ts';
// import { arc as v4Arc } from '../schema/v4/arc.ts';

export class Arc extends BaseSlider implements IWrapArc {
   static schema: Record<number, ISchemaContainer<IWrapArcAttribute>> = {
      2: v2Arc,
      // 3: v3Arc,
      // 4: v4Arc,
   };
   static defaultValue: IWrapArcAttribute = {
      time: 0,
      posX: 0,
      posY: 0,
      color: 0,
      direction: 0,
      lengthMultiplier: 0,
      tailTime: 0,
      tailPosX: 0,
      tailPosY: 0,
      tailDirection: 0,
      tailLengthMultiplier: 0,
      midAnchor: 0,
      laneRotation: 0,
      tailLaneRotation: 0,
      customData: {},
   };

   static create(...data: Partial<IWrapArcAttribute>[]): Arc[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapArcAttribute> = {}) {
      super();
      this.time = data.time ?? Arc.defaultValue.time;
      this.posX = data.posX ?? Arc.defaultValue.posX;
      this.posY = data.posY ?? Arc.defaultValue.posY;
      this.color = data.color ?? Arc.defaultValue.color;
      this.direction = data.direction ?? Arc.defaultValue.direction;
      this.lengthMultiplier = data.lengthMultiplier ?? Arc.defaultValue.lengthMultiplier;
      this.tailTime = data.tailTime ?? Arc.defaultValue.tailTime;
      this.tailPosX = data.tailPosX ?? Arc.defaultValue.tailPosX;
      this.tailPosY = data.tailPosY ?? Arc.defaultValue.tailPosY;
      this.tailDirection = data.tailDirection ?? Arc.defaultValue.tailDirection;
      this.tailLengthMultiplier = data.tailLengthMultiplier ??
         Arc.defaultValue.tailLengthMultiplier;
      this.midAnchor = data.midAnchor ?? Arc.defaultValue.midAnchor;
      this.laneRotation = data.laneRotation ?? Arc.defaultValue.laneRotation;
      this.tailLaneRotation = data.tailLaneRotation ?? Arc.defaultValue.tailLaneRotation;
      this.customData = deepCopy(data.customData ?? Arc.defaultValue.customData);
   }
   static fromJSON(data: Record<string, any>, version: number): Arc {
      return new this(Arc.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (Arc.schema[version || 0]?.serialize(this) || this.toJSON()) as T;
   }
   toJSON(): IWrapArcAttribute {
      return {
         time: this.time,
         posX: this.posX,
         posY: this.posY,
         color: this.color,
         direction: this.direction,
         lengthMultiplier: this.lengthMultiplier,
         tailTime: this.tailTime,
         tailPosX: this.tailPosX,
         tailPosY: this.tailPosY,
         tailDirection: this.tailDirection,
         tailLengthMultiplier: this.tailLengthMultiplier,
         midAnchor: this.midAnchor,
         laneRotation: this.laneRotation,
         tailLaneRotation: this.tailLaneRotation,
         customData: deepCopy(this.customData),
      };
   }

   lengthMultiplier: IWrapArc['lengthMultiplier'];
   tailLengthMultiplier: IWrapArc['tailLengthMultiplier'];
   tailDirection: IWrapArc['tailDirection'];
   midAnchor: IWrapArc['midAnchor'];

   setLengthMultiplier(value: this['lengthMultiplier']): this {
      this.lengthMultiplier = value;
      return this;
   }
   setTailLengthMultiplier(value: this['tailLengthMultiplier']): this {
      this.tailLengthMultiplier = value;
      return this;
   }
   setTailDirection(value: this['tailDirection']): this {
      this.tailDirection = value;
      return this;
   }
   setMidAnchor(value: this['midAnchor']): this {
      this.midAnchor = value;
      return this;
   }

   mirror(flipColor = true, _flipNoodle?: boolean): this {
      switch (this.tailDirection) {
         case 2:
            this.tailDirection = 3;
            break;
         case 3:
            this.tailDirection = 2;
            break;
         case 6:
            this.tailDirection = 7;
            break;
         case 7:
            this.tailDirection = 6;
            break;
         case 4:
            this.tailDirection = 5;
            break;
         case 5:
            this.tailDirection = 4;
            break;
      }
      if (this.midAnchor) {
         this.midAnchor = this.midAnchor === 1 ? 2 : 1;
      }
      return super.mirror(flipColor);
   }

   getTailAngle(_type?: ModType): number {
      return (
         NoteDirectionAngle[
            this.tailDirection as keyof typeof NoteDirectionAngle
         ] || 0
      );
   }

   isMappingExtensions(): boolean {
      return (
         this.posY > 2 ||
         this.posY < 0 ||
         this.posX <= -1000 ||
         this.posX >= 1000 ||
         (this.direction >= 1000 && this.direction <= 1360) ||
         (this.tailDirection >= 1000 && this.tailDirection <= 1360)
      );
   }

   isValid(): boolean {
      return !(
         this.isMappingExtensions() ||
         this.isInverse() ||
         this.posX < 0 ||
         this.posX > 3 ||
         this.tailPosX < 0 ||
         this.tailPosX > 3 ||
         (this.posX === this.tailPosX &&
            this.posY === this.tailPosY &&
            this.time === this.tailTime)
      );
   }
}
