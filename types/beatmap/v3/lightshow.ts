import { IBasicEvent } from './basicEvent.ts';
import { IColorBoostEvent } from './colorBoostEvent.ts';
import { ILightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { ILightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { ILightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { ICustomDataDifficulty } from './custom/difficulty.ts';
import { IBaseItem } from './baseItem.ts';
import { IFxEventBoxGroup } from './fxEventBoxGroup.ts';
import { IFxEventsCollection } from './fxEventsCollection.ts';

export interface ILightshow extends IBaseItem {
   basicBeatmapEvents?: IBasicEvent[];
   colorBoostBeatmapEvents?: IColorBoostEvent[];
   lightColorEventBoxGroups?: ILightColorEventBoxGroup[];
   lightRotationEventBoxGroups?: ILightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups?: ILightTranslationEventBoxGroup[];
   vfxEventBoxGroups?: IFxEventBoxGroup[];
   _fxEventsCollection?: IFxEventsCollection;
   customData?: ICustomDataDifficulty;
}
