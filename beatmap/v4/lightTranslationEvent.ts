import { ILightTranslationEventContainer } from '../../types/beatmap/v4/container.ts';
import { ILightTranslationEvent } from '../../types/beatmap/v4/lightTranslationEvent.ts';
import { IWrapLightTranslationEventAttribute } from '../../types/beatmap/wrapper/lightTranslationEvent.ts';
import { DeepRequiredIgnore } from '../../types/mod.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightTranslationEvent } from '../wrapper/lightTranslationEvent.ts';

/** Light translation event beatmap v4 class object. */
export class LightTranslationEvent
   extends WrapLightTranslationEvent<ILightTranslationEventContainer> {
   static default: DeepRequiredIgnore<
      ILightTranslationEventContainer,
      'customData'
   > = {
      data: { p: 0, e: 0, t: 0, customData: {} },
      time: 0,
   };

   constructor();
   constructor(
      data: Partial<
         IWrapLightTranslationEventAttribute<ILightTranslationEventContainer>
      >,
   );
   constructor(data: Partial<ILightTranslationEvent>, time?: number);
   constructor(
      data:
         & Partial<ILightTranslationEvent>
         & Partial<
            IWrapLightTranslationEventAttribute<ILightTranslationEventContainer>
         >,
      time?: number,
   );
   constructor(
      data:
         & Partial<ILightTranslationEvent>
         & Partial<
            IWrapLightTranslationEventAttribute<ILightTranslationEventContainer>
         > = {},
      time?: number,
   ) {
      super();

      this._time = time ?? data.time ?? 0;
      this._previous = data.p ?? data.previous ?? LightTranslationEvent.default.data.p;
      this._easing = data.e ?? data.easing ?? LightTranslationEvent.default.data.e;
      this._translation = data.t ?? data.translation ?? LightTranslationEvent.default.data.t;
      this._customData = deepCopy(
         data.customData ?? LightTranslationEvent.default.data.customData,
      );
   }

   static create(): LightTranslationEvent[];
   static create(
      ...data: Partial<
         IWrapLightTranslationEventAttribute<ILightTranslationEvent>
      >[]
   ): LightTranslationEvent[];
   static create(
      ...data: Partial<
         IWrapLightTranslationEventAttribute<ILightTranslationEvent>
      >[]
   ): LightTranslationEvent[] {
      const result: LightTranslationEvent[] = data.map((obj) => new this(obj));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): Required<ILightTranslationEventContainer> {
      return {
         data: {
            p: this.previous,
            e: this.easing,
            t: this.translation,
            customData: deepCopy(this.customData),
         },
         time: this.time,
      };
   }

   get customData(): NonNullable<ILightTranslationEvent['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightTranslationEvent['customData']>) {
      this._customData = value;
   }
}
