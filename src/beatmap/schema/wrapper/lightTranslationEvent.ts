import type { IWrapLightTranslationEvent } from './types/lightTranslationEvent.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createLightTranslationEvent(
   data: Partial<IWrapLightTranslationEvent> = {},
): IWrapLightTranslationEvent {
   return {
      time: data.time ?? 0,
      easing: data.easing ?? 0,
      previous: data.previous ?? 0,
      translation: data.translation ?? 0,
      customData: copyCustomData(data.customData),
   };
}
