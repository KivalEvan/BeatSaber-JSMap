import { ILightRotationEvent } from '../../types/beatmap/v3/lightRotationEvent.ts';
import { IWrapLightRotationEventAttribute } from '../../types/beatmap/wrapper/lightRotationEvent.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightRotationEvent } from '../wrapper/lightRotationEvent.ts';

/** Light rotation base beatmap v3 class object. */
export class LightRotationBase extends WrapLightRotationEvent<ILightRotationEvent> {
   static default: Required<ILightRotationEvent> = {
      b: 0,
      p: 0,
      e: 0,
      l: 0,
      r: 0,
      o: 0,
      customData: {},
   };

   constructor();
   constructor(data: Partial<IWrapLightRotationEventAttribute<ILightRotationEvent>>);
   constructor(data: Partial<ILightRotationEvent>);
   constructor(
      data:
         & Partial<ILightRotationEvent>
         & Partial<IWrapLightRotationEventAttribute<ILightRotationEvent>>,
   );
   constructor(
      data:
         & Partial<ILightRotationEvent>
         & Partial<IWrapLightRotationEventAttribute<ILightRotationEvent>> = {},
   ) {
      super();

      this._time = data.b ?? data.time ?? LightRotationBase.default.b;
      this._easing = data.e ?? data.easing ?? LightRotationBase.default.e;
      this._loop = data.l ?? data.loop ?? LightRotationBase.default.l;
      this._direction = data.o ?? data.direction ?? LightRotationBase.default.o;
      this._previous = data.p ?? data.previous ?? LightRotationBase.default.p;
      this._rotation = data.r ?? data.rotation ?? LightRotationBase.default.r;
      this._customData = deepCopy(data.customData ?? LightRotationBase.default.customData);
   }

   static create(): LightRotationBase[];
   static create(
      ...data: Partial<IWrapLightRotationEventAttribute<ILightRotationEvent>>[]
   ): LightRotationBase[];
   static create(...data: Partial<ILightRotationEvent>[]): LightRotationBase[];
   static create(
      ...data: (
         & Partial<ILightRotationEvent>
         & Partial<IWrapLightRotationEventAttribute<ILightRotationEvent>>
      )[]
   ): LightRotationBase[];
   static create(
      ...data: (
         & Partial<ILightRotationEvent>
         & Partial<IWrapLightRotationEventAttribute<ILightRotationEvent>>
      )[]
   ): LightRotationBase[] {
      const result: LightRotationBase[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightRotationEvent> {
      return {
         b: this.time,
         e: this.easing,
         l: this.loop,
         o: this.direction,
         p: this.previous,
         r: this.rotation,
         customData: deepCopy(this.customData),
      };
   }

   get customData(): NonNullable<ILightRotationEvent['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightRotationEvent['customData']>) {
      this._customData = value;
   }
}
