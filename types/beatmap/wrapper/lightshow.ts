// deno-lint-ignore-file no-explicit-any
import { IWrapEvent, IWrapEventAttribute } from './event.ts';
import { IWrapColorBoostEvent, IWrapColorBoostEventAttribute } from './colorBoostEvent.ts';
import {
   IWrapLightColorEventBoxGroup,
   IWrapLightColorEventBoxGroupAttribute,
} from './lightColorEventBoxGroup.ts';
import {
   IWrapLightRotationEventBoxGroup,
   IWrapLightRotationEventBoxGroupAttribute,
} from './lightRotationEventBoxGroup.ts';
import {
   IWrapLightTranslationEventBoxGroup,
   IWrapLightTranslationEventBoxGroupAttribute,
} from './lightTranslationEventBoxGroup.ts';
import { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';
import { DeepPartial, LooseAutocomplete } from '../../utils.ts';
import { GenericFileName } from '../shared/filename.ts';
import { EventContainer } from './container.ts';
import { IWrapFxEventsCollection } from './fxEventsCollection.ts';
import { IWrapFxEventBoxGroup, IWrapFxEventBoxGroupAttribute } from './fxEventBoxGroup.ts';

export interface IWrapLightshowAttribute<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItemAttribute<T> {
   basicEvents: IWrapEvent[];
   colorBoostEvents: IWrapColorBoostEvent[];
   lightColorEventBoxGroups: IWrapLightColorEventBoxGroup[];
   lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroup[];
   fxEventBoxGroups: IWrapFxEventBoxGroup[];
   fxEventsCollection: IWrapFxEventsCollection;

   filename: string;
}

export interface IWrapLightshow<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T>, IWrapLightshowAttribute<T> {
   setFileName(filename: LooseAutocomplete<GenericFileName>): this;

   /** Sort beatmap object(s) accordingly. */
   sort(): this;

   /**
    * Reparse the beatmap to their respective schema class.
    *
    * Used to match the beatmap schema if wrapper mix-and-matched the class.
    * ```ts
    * if (!difficulty.isValid()) {
    *     difficulty.reparse();
    * }
    * ```
    *
    * **NOTE:** This will create a new set of array,
    * `keepRef` allows for already matched object to stay in new array instead of creating new object (this is faster and less memory but can cause reference issue)
    */
   reparse(keepRef?: boolean): this;

   /**
    * Get container of basic events and boost events.
    * ```ts
    * const noteCountainer = getNoteContainer(Difficulty);
    * ```
    */
   getEventContainer(): EventContainer[];

   addBasicEvents(...data: Partial<IWrapEventAttribute>[]): void;
   addColorBoostEvents(...data: Partial<IWrapColorBoostEventAttribute>[]): void;
   addLightColorEventBoxGroups(...data: DeepPartial<IWrapLightColorEventBoxGroupAttribute>[]): void;
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<IWrapLightRotationEventBoxGroupAttribute>[]
   ): void;
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<IWrapLightTranslationEventBoxGroupAttribute>[]
   ): void;
   addFxEventBoxGroups(...data: DeepPartial<IWrapFxEventBoxGroupAttribute>[]): void;
}
