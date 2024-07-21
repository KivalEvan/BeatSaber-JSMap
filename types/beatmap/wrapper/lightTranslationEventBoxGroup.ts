import type { IWrapBasicEventBoxGroup, IWrapBasicEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type {
   IWrapLightTranslationEventBox,
   IWrapLightTranslationEventBoxAttribute,
} from './lightTranslationEventBox.ts';

export interface IWrapLightTranslationEventBoxGroupAttribute
   extends IWrapBasicEventBoxGroupAttribute {
   boxes: IWrapLightTranslationEventBoxAttribute[];
}

export interface IWrapLightTranslationEventBoxGroup
   extends IWrapBasicEventBoxGroup, IWrapLightTranslationEventBoxGroupAttribute {
   boxes: IWrapLightTranslationEventBox[];
}
