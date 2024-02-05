import { ILightRotationEventContainer } from '../../types/beatmap/container/v4.ts';
import { ILightRotationEvent } from '../../types/beatmap/v4/lightRotationEvent.ts';
import { IWrapLightRotationEventAttribute } from '../../types/beatmap/wrapper/lightRotationEvent.ts';
import { DeepRequiredIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightRotationEvent } from '../wrapper/lightRotationEvent.ts';

/** Light rotation event beatmap v4 class object. */
export class LightRotationEvent extends WrapLightRotationEvent<ILightRotationEventContainer> {
   static default: DeepRequiredIgnore<
      ILightRotationEventContainer,
      'customData'
   > = {
      data: {
         p: 0,
         e: 0,
         l: 0,
         r: 0,
         d: 0,
         customData: {},
      },
      time: 0,
   };

   constructor();
   constructor(
      data: Partial<
         IWrapLightRotationEventAttribute<ILightRotationEventContainer>
      >,
   );
   constructor(data: Partial<ILightRotationEvent>, time?: number);
   constructor(
      data:
         & Partial<ILightRotationEvent>
         & Partial<
            IWrapLightRotationEventAttribute<ILightRotationEventContainer>
         >,
      time?: number,
   );
   constructor(
      data:
         & Partial<ILightRotationEvent>
         & Partial<
            IWrapLightRotationEventAttribute<ILightRotationEventContainer>
         > = {},
      time?: number,
   ) {
      super();

      this._time = time ?? data.time ?? LightRotationEvent.default.time;
      this._previous = data.p ?? data.previous ?? LightRotationEvent.default.data.p;
      this._easing = data.e ?? data.easing ?? LightRotationEvent.default.data.e;
      this._loop = data.l ?? data.loop ?? LightRotationEvent.default.data.l;
      this._rotation = data.r ?? data.rotation ?? LightRotationEvent.default.data.r;
      this._direction = data.d ?? data.direction ?? LightRotationEvent.default.data.d;
      this._customData = deepCopy(
         data.customData ?? LightRotationEvent.default.data.customData,
      );
   }

   static create(): LightRotationEvent[];
   static create(
      ...data: Partial<
         IWrapLightRotationEventAttribute<ILightRotationEventContainer>
      >[]
   ): LightRotationEvent[];
   static create(
      ...data: Partial<
         IWrapLightRotationEventAttribute<ILightRotationEventContainer>
      >[]
   ): LightRotationEvent[] {
      const result: LightRotationEvent[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightRotationEventContainer> {
      return {
         data: {
            p: this.previous,
            l: this.loop,
            e: this.easing,
            r: this.rotation,
            d: this.direction,
            customData: deepCopy(this.customData),
         },
         time: this.time,
      };
   }

   get customData(): NonNullable<ILightRotationEvent['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightRotationEvent['customData']>) {
      this._customData = value;
   }
}
