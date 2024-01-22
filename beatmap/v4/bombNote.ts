import { IBombNote } from '../../types/beatmap/v4/bombNote.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapBombNote } from '../wrapper/bombNote.ts';
import { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import { isVector3 } from '../../utils/vector.ts';
import { IBombNoteContainer } from '../../types/beatmap/v4/container.ts';
import { DeepRequiredIgnore } from '../../types/utils.ts';
import { IObjectLane } from '../../types/beatmap/v4/object.ts';

/** Bomb note beatmap v4 class object. */
export class BombNote extends WrapBombNote<IBombNoteContainer> {
   static default: DeepRequiredIgnore<IBombNoteContainer, 'customData'> = {
      object: {
         b: 0,
         i: 0,
         r: 0,
         customData: {},
      },
      data: {
         x: 0,
         y: 0,
         customData: {},
      },
   };

   constructor();
   constructor(object: Partial<IWrapBombNoteAttribute<IBombNoteContainer>>);
   constructor(object: Partial<IObjectLane>, data?: Partial<IBombNote>);
   constructor(
      object:
         & Partial<IObjectLane>
         & Partial<IWrapBombNoteAttribute<IBombNoteContainer>>,
      data?: Partial<IBombNote>,
   );
   constructor(
      object:
         & Partial<IObjectLane>
         & Partial<IWrapBombNoteAttribute<IBombNoteContainer>> = {},
      data: Partial<IBombNote> = {},
   ) {
      super();

      this._time = object.b ?? object.time ?? BombNote.default.object.b;
      this._laneRotation = object.r ?? object.laneRotation ?? BombNote.default.object.r;
      this._posX = data.x ?? object.posX ?? BombNote.default.data.x;
      this._posY = data.y ?? object.posY ?? BombNote.default.data.y;
      this._customData = deepCopy(
         object.customData ?? BombNote.default.data.customData,
      );
   }

   static create(): BombNote[];
   static create(
      ...data: Partial<IWrapBombNoteAttribute<IBombNoteContainer>>[]
   ): BombNote[];
   static create(
      ...data: Partial<IWrapBombNoteAttribute<IBombNoteContainer>>[]
   ): BombNote[] {
      const result: BombNote[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<IBombNoteContainer> {
      return {
         object: {
            b: this.time,
            i: 0,
            r: this.laneRotation,
            customData: {},
         },
         data: {
            x: this.posX,
            y: this.posY,
            customData: deepCopy(this.customData),
         },
      };
   }

   get customData(): NonNullable<IBombNote['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IBombNote['customData']>) {
      this._customData = value;
   }

   mirror(_?: boolean, flipNoodle?: boolean) {
      if (flipNoodle) {
         if (this.customData.coordinates) {
            this.customData.coordinates[0] = -1 - this.customData.coordinates[0];
         }
         if (this.customData.flip) {
            this.customData.flip[0] = -1 - this.customData.flip[0];
         }
         if (this.customData.animation) {
            if (Array.isArray(this.customData.animation.definitePosition)) {
               if (isVector3(this.customData.animation.definitePosition)) {
                  this.customData.animation.definitePosition[0] = -this.customData.animation
                     .definitePosition[0];
               } else {
                  this.customData.animation.definitePosition.forEach((dp) => {
                     dp[0] = -dp[0];
                  });
               }
            }
            if (Array.isArray(this.customData.animation.offsetPosition)) {
               if (isVector3(this.customData.animation.offsetPosition)) {
                  this.customData.animation.offsetPosition[0] = -this.customData.animation
                     .offsetPosition[0];
               } else {
                  this.customData.animation.offsetPosition.forEach((op) => {
                     op[0] = -op[0];
                  });
               }
            }
         }
      }
      return super.mirror();
   }

   isChroma(): boolean {
      return (
         Array.isArray(this.customData.color) ||
         typeof this.customData.spawnEffect === 'boolean' ||
         typeof this.customData.disableDebris === 'boolean'
      );
   }

   isNoodleExtensions(): boolean {
      return (
         Array.isArray(this.customData.animation) ||
         typeof this.customData.disableNoteGravity === 'boolean' ||
         typeof this.customData.disableNoteLook === 'boolean' ||
         typeof this.customData.disableBadCutDirection === 'boolean' ||
         typeof this.customData.disableBadCutSaberType === 'boolean' ||
         typeof this.customData.disableBadCutSpeed === 'boolean' ||
         Array.isArray(this.customData.flip) ||
         typeof this.customData.uninteractable === 'boolean' ||
         Array.isArray(this.customData.localRotation) ||
         typeof this.customData.noteJumpMovementSpeed === 'number' ||
         typeof this.customData.noteJumpStartBeatOffset === 'number' ||
         Array.isArray(this.customData.coordinates) ||
         Array.isArray(this.customData.worldRotation) ||
         typeof this.customData.worldRotation === 'number' ||
         typeof this.customData.link === 'string'
      );
   }
}
