import type {
   IWrapBasicEvent,
   IWrapBasicEventAttribute,
} from '../../types/beatmap/wrapper/basicEvent.ts';
import type { IWrapBasicEventTypesWithKeywords } from '../../types/beatmap/wrapper/basicEventTypesWithKeywords.ts';
import type {
   IWrapColorBoostEvent,
   IWrapColorBoostEventAttribute,
} from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type {
   IWrapFxEventBoxGroup,
   IWrapFxEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import type {
   IWrapLightColorEventBoxGroup,
   IWrapLightColorEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type {
   IWrapLightRotationEventBoxGroup,
   IWrapLightRotationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import type {
   IWrapLightshow,
   IWrapLightshowAttribute,
} from '../../types/beatmap/wrapper/lightshow.ts';
import type {
   IWrapLightTranslationEventBoxGroup,
   IWrapLightTranslationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type {
   IWrapWaypoint,
   IWrapWaypointAttribute,
} from '../../types/beatmap/wrapper/waypoint.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { sortObjectFn } from '../helpers/sort.ts';
import { BaseItem } from './abstract/baseItem.ts';
import { BasicEvent, createBasicEvent } from './basicEvent.ts';
import {
   BasicEventTypesForKeywords,
   createBasicEventTypesForKeywords,
} from './basicEventTypesForKeywords.ts';
import { ColorBoostEvent, createColorBoostEvent } from './colorBoostEvent.ts';
import { createFxEventBoxGroup, FxEventBoxGroup } from './fxEventBoxGroup.ts';
import {
   createLightColorEventBoxGroup,
   LightColorEventBoxGroup,
} from './lightColorEventBoxGroup.ts';
import {
   createLightRotationEventBoxGroup,
   LightRotationEventBoxGroup,
} from './lightRotationEventBoxGroup.ts';
import {
   createLightTranslationEventBoxGroup,
   LightTranslationEventBoxGroup,
} from './lightTranslationEventBoxGroup.ts';
import { createWaypoint, Waypoint } from './waypoint.ts';

export function createLightshow(
   data: DeepPartial<IWrapLightshowAttribute> = {},
): IWrapLightshowAttribute {
   return {
      waypoints: data.waypoints?.map(createWaypoint) ?? [],
      basicEvents: data.basicEvents?.map(createBasicEvent) ?? [],
      colorBoostEvents: data.colorBoostEvents?.map(createColorBoostEvent) ?? [],
      lightColorEventBoxGroups: data.lightColorEventBoxGroups?.map(createLightColorEventBoxGroup) ??
         [],
      lightRotationEventBoxGroups:
         data.lightRotationEventBoxGroups?.map(createLightRotationEventBoxGroup) ?? [],
      lightTranslationEventBoxGroups:
         data.lightTranslationEventBoxGroups?.map(createLightTranslationEventBoxGroup) ?? [],
      fxEventBoxGroups: data.fxEventBoxGroups?.map(createFxEventBoxGroup) ?? [],
      basicEventTypesWithKeywords: {
         list: (data.basicEventTypesWithKeywords?.list)?.map(createBasicEventTypesForKeywords) ??
            [],
      },
      useNormalEventsAsCompatibleEvents: !!data.useNormalEventsAsCompatibleEvents,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap lightshow.
 */
export class Lightshow extends BaseItem implements IWrapLightshow {
   static defaultValue: IWrapLightshowAttribute = createLightshow();

   static createOne(data: Partial<IWrapLightshowAttribute> = {}): Lightshow {
      return new this(data);
   }
   static create(
      ...data: DeepPartialIgnore<IWrapLightshowAttribute, 'customData'>[]
   ): Lightshow[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(
      data: DeepPartialIgnore<IWrapLightshowAttribute, 'customData'> = {},
   ) {
      super();
      this.waypoints = (data.waypoints ?? Lightshow.defaultValue.waypoints).map(
         (e) => new Waypoint(e),
      );
      this.basicEvents = (
         data.basicEvents ?? Lightshow.defaultValue.basicEvents
      ).map((e) => new BasicEvent(e));
      // shut the fuck up, ts, it's not that deep
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      this.colorBoostEvents = (
         data.colorBoostEvents ?? Lightshow.defaultValue.colorBoostEvents
      ).map((e) => new ColorBoostEvent(e));
      this.lightColorEventBoxGroups = (
         data.lightColorEventBoxGroups ??
            Lightshow.defaultValue.lightColorEventBoxGroups
      ).map((e) => new LightColorEventBoxGroup(e));
      this.lightRotationEventBoxGroups = (
         data.lightRotationEventBoxGroups ??
            Lightshow.defaultValue.lightRotationEventBoxGroups
      ).map((e) => new LightRotationEventBoxGroup(e));
      this.lightTranslationEventBoxGroups = (
         data.lightTranslationEventBoxGroups ??
            Lightshow.defaultValue.lightTranslationEventBoxGroups
      ).map((e) => new LightTranslationEventBoxGroup(e));
      this.fxEventBoxGroups = (
         data.fxEventBoxGroups ?? Lightshow.defaultValue.fxEventBoxGroups
      ).map((e) => new FxEventBoxGroup(e));
      this.basicEventTypesWithKeywords = {
         list: (
            data.basicEventTypesWithKeywords?.list ??
               Lightshow.defaultValue.basicEventTypesWithKeywords.list
         ).map((e) => new BasicEventTypesForKeywords(e)),
      };
      this.useNormalEventsAsCompatibleEvents = !!data.useNormalEventsAsCompatibleEvents;
      this.customData = deepCopy(
         data.customData ?? Lightshow.defaultValue.customData,
      );
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         this.waypoints.every((e) => e.isValid()) &&
         this.basicEvents.every((e) => e.isValid()) &&
         this.colorBoostEvents.every((e) => e.isValid()) &&
         this.lightColorEventBoxGroups.every((e) => e.isValid()) &&
         this.lightRotationEventBoxGroups.every((e) => e.isValid()) &&
         this.lightTranslationEventBoxGroups.every((e) => e.isValid()) &&
         this.fxEventBoxGroups.every((e) => e.isValid()) &&
         this.basicEventTypesWithKeywords.list.every((e) => e.isValid());
   }

   waypoints: IWrapWaypoint[];
   basicEvents: IWrapBasicEvent[];
   colorBoostEvents: IWrapColorBoostEvent[];
   lightColorEventBoxGroups: IWrapLightColorEventBoxGroup[];
   lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroup[];
   fxEventBoxGroups: IWrapFxEventBoxGroup[];
   basicEventTypesWithKeywords: IWrapBasicEventTypesWithKeywords;
   useNormalEventsAsCompatibleEvents: boolean;

   override sort(): this {
      this.waypoints.sort(sortObjectFn);
      this.basicEvents.sort(sortObjectFn);
      this.colorBoostEvents.sort(sortObjectFn);
      this.lightColorEventBoxGroups.sort(sortObjectFn);
      this.lightRotationEventBoxGroups.sort(sortObjectFn);
      this.lightTranslationEventBoxGroups.sort(sortObjectFn);
      this.fxEventBoxGroups.sort(sortObjectFn);

      for (let i = 0; i < this.lightColorEventBoxGroups.length; i++) {
         for (
            let j = 0;
            j < this.lightColorEventBoxGroups[i].boxes.length;
            j++
         ) {
            this.lightColorEventBoxGroups[i].boxes[j].events.sort(sortObjectFn);
         }
      }
      for (let i = 0; i < this.lightRotationEventBoxGroups.length; i++) {
         for (
            let j = 0;
            j < this.lightRotationEventBoxGroups[i].boxes.length;
            j++
         ) {
            this.lightRotationEventBoxGroups[i].boxes[j].events.sort(
               sortObjectFn,
            );
         }
      }
      for (let i = 0; i < this.lightTranslationEventBoxGroups.length; i++) {
         for (
            let j = 0;
            j < this.lightTranslationEventBoxGroups[i].boxes.length;
            j++
         ) {
            this.lightTranslationEventBoxGroups[i].boxes[j].events.sort(
               sortObjectFn,
            );
         }
      }
      for (let i = 0; i < this.fxEventBoxGroups.length; i++) {
         for (let j = 0; j < this.fxEventBoxGroups[i].boxes.length; j++) {
            this.fxEventBoxGroups[i].boxes[j].events.sort(sortObjectFn);
         }
      }

      return this;
   }

   addWaypoints(
      ...data: DeepPartialIgnore<IWrapWaypointAttribute, 'customData'>[]
   ): this {
      for (const d of data) {
         this.waypoints.push(new Waypoint(d));
      }
      return this;
   }
   addBasicEvents(
      ...data: DeepPartialIgnore<IWrapBasicEventAttribute, 'customData'>[]
   ): this {
      for (const d of data) {
         this.basicEvents.push(new BasicEvent(d));
      }
      return this;
   }
   addColorBoostEvents(
      ...data: DeepPartialIgnore<IWrapColorBoostEventAttribute, 'customData'>[]
   ): this {
      for (const d of data) {
         this.colorBoostEvents.push(new ColorBoostEvent(d));
      }
      return this;
   }
   addLightColorEventBoxGroups(
      ...data: DeepPartialIgnore<
         IWrapLightColorEventBoxGroupAttribute,
         'customData'
      >[]
   ): this {
      for (const d of data) {
         this.lightColorEventBoxGroups.push(new LightColorEventBoxGroup(d));
      }
      return this;
   }
   addLightRotationEventBoxGroups(
      ...data: DeepPartialIgnore<
         IWrapLightRotationEventBoxGroupAttribute,
         'customData'
      >[]
   ): this {
      for (const d of data) {
         this.lightRotationEventBoxGroups.push(
            new LightRotationEventBoxGroup(d),
         );
      }
      return this;
   }
   addLightTranslationEventBoxGroups(
      ...data: DeepPartialIgnore<
         IWrapLightTranslationEventBoxGroupAttribute,
         'customData'
      >[]
   ): this {
      for (const d of data) {
         this.lightTranslationEventBoxGroups.push(
            new LightTranslationEventBoxGroup(d),
         );
      }
      return this;
   }
   addFxEventBoxGroups(
      ...data: DeepPartialIgnore<IWrapFxEventBoxGroupAttribute, 'customData'>[]
   ): this {
      for (const d of data) {
         this.fxEventBoxGroups.push(new FxEventBoxGroup(d));
      }
      return this;
   }
}
