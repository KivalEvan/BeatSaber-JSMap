// deno-lint-ignore-file no-explicit-any
import type { IWrapWaypoint, IWrapWaypointAttribute } from './waypoint.ts';
import type { IWrapEvent, IWrapEventAttribute } from './event.ts';
import type { IWrapColorBoostEvent, IWrapColorBoostEventAttribute } from './colorBoostEvent.ts';
import type {
   IWrapLightColorEventBoxGroup,
   IWrapLightColorEventBoxGroupAttribute,
} from './lightColorEventBoxGroup.ts';
import type {
   IWrapLightRotationEventBoxGroup,
   IWrapLightRotationEventBoxGroupAttribute,
} from './lightRotationEventBoxGroup.ts';
import type {
   IWrapLightTranslationEventBoxGroup,
   IWrapLightTranslationEventBoxGroupAttribute,
} from './lightTranslationEventBoxGroup.ts';
import type {
   IWrapEventTypesWithKeywords,
   IWrapEventTypesWithKeywordsAttribute,
} from './eventTypesWithKeywords.ts';
import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';
import type { DeepPartial, LooseAutocomplete } from '../../utils.ts';
import type { GenericFilename } from '../shared/filename.ts';
import type { IWrapFxEventBoxGroup, IWrapFxEventBoxGroupAttribute } from './fxEventBoxGroup.ts';
import type { IFileInfo } from '../shared/filename.ts';
import type { ICustomDataDifficulty } from './custom/difficulty.ts';

export interface IWrapLightshowAttribute extends IWrapBaseItemAttribute, IFileInfo {
   waypoints: IWrapWaypointAttribute[];
   basicEvents: IWrapEventAttribute[];
   colorBoostEvents: IWrapColorBoostEventAttribute[];
   lightColorEventBoxGroups: IWrapLightColorEventBoxGroupAttribute[];
   lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroupAttribute[];
   lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroupAttribute[];
   fxEventBoxGroups: IWrapFxEventBoxGroupAttribute[];
   eventTypesWithKeywords: IWrapEventTypesWithKeywordsAttribute;
   useNormalEventsAsCompatibleEvents: boolean;
   customData: ICustomDataDifficulty;
}

export interface IWrapLightshow<
   T extends Record<string, any> = IWrapLightshowAttribute,
> extends Omit<IWrapBaseItem<T>, 'customData'>, IWrapLightshowAttribute {
   waypoints: IWrapWaypoint[];
   basicEvents: IWrapEvent[];
   colorBoostEvents: IWrapColorBoostEvent[];
   lightColorEventBoxGroups: IWrapLightColorEventBoxGroup[];
   lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroup[];
   fxEventBoxGroups: IWrapFxEventBoxGroup[];
   eventTypesWithKeywords: IWrapEventTypesWithKeywords;

   setFilename(filename: LooseAutocomplete<GenericFilename>): this;

   setCustomData(object: T['customData']): this;
   addCustomData(object: T['customData']): this;

   /** Sort beatmap object(s) accordingly. */
   sort(): this;

   addWaypoints(...data: Partial<IWrapWaypointAttribute>[]): this;
   addBasicEvents(...data: Partial<IWrapEventAttribute>[]): this;
   addColorBoostEvents(...data: Partial<IWrapColorBoostEventAttribute>[]): this;
   addLightColorEventBoxGroups(
      ...data: DeepPartial<IWrapLightColorEventBoxGroupAttribute>[]
   ): this;
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<IWrapLightRotationEventBoxGroupAttribute>[]
   ): this;
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<IWrapLightTranslationEventBoxGroupAttribute>[]
   ): this;
   addFxEventBoxGroups(
      ...data: DeepPartial<IWrapFxEventBoxGroupAttribute>[]
   ): this;
}
