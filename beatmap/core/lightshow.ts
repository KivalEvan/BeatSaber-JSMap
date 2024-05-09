// deno-lint-ignore-file no-explicit-any
import type { IWrapEvent, IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import type { IWrapEventTypesWithKeywords } from '../../types/beatmap/wrapper/eventTypesWithKeywords.ts';
import type {
   IWrapColorBoostEvent,
   IWrapColorBoostEventAttribute,
} from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type {
   IWrapLightColorEventBoxGroup,
   IWrapLightColorEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type {
   IWrapLightRotationEventBoxGroup,
   IWrapLightRotationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import type {
   IWrapLightTranslationEventBoxGroup,
   IWrapLightTranslationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type {
   IWrapWaypoint,
   IWrapWaypointAttribute,
} from '../../types/beatmap/wrapper/waypoint.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { BaseItem } from './abstract/baseItem.ts';
import type {
   IWrapLightshow,
   IWrapLightshowAttribute,
} from '../../types/beatmap/wrapper/lightshow.ts';
import type {
   IWrapFxEventBoxGroup,
   IWrapFxEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import { sortObjectFn } from '../shared/helpers.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { Waypoint } from './waypoint.ts';
import { BasicEvent } from './event.ts';
import { ColorBoostEvent } from './colorBoostEvent.ts';
import { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { LightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { FxEventBoxGroup } from './fxEventBoxGroup.ts';
import { EventTypesForKeywords } from './eventTypesForKeywords.ts';
import { deepCopy } from '../../utils/misc.ts';

export class Lightshow extends BaseItem implements IWrapLightshow {
   static schema: Record<number, ISchemaContainer<IWrapLightshowAttribute>> = {};
   static defaultValue: IWrapLightshowAttribute = {
      waypoints: [],
      basicEvents: [],
      colorBoostEvents: [],
      lightColorEventBoxGroups: [],
      lightRotationEventBoxGroups: [],
      lightTranslationEventBoxGroups: [],
      fxEventBoxGroups: [],
      eventTypesWithKeywords: { list: [] },
      useNormalEventsAsCompatibleEvents: false,
      customData: {},
   };

   static create(...data: DeepPartial<IWrapLightshowAttribute>[]): Lightshow[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapLightshowAttribute> = {}) {
      super();
      this.waypoints = (data.waypoints ?? Lightshow.defaultValue.waypoints).map(
         (e) => new Waypoint(e),
      );
      this.basicEvents = (
         data.basicEvents ?? Lightshow.defaultValue.basicEvents
      ).map((e) => new BasicEvent(e));
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
      this.eventTypesWithKeywords = {
         list: (
            data.eventTypesWithKeywords?.list ??
               Lightshow.defaultValue.eventTypesWithKeywords.list
         ).map((e) => new EventTypesForKeywords(e)),
      };
      this.useNormalEventsAsCompatibleEvents = !!data.useNormalEventsAsCompatibleEvents;
      this.customData = deepCopy(
         data.customData ?? Lightshow.defaultValue.customData,
      );
   }
   static fromJSON(data: { [key: string]: any }, version: number): Lightshow {
      return new this(Lightshow.schema[version]?.deserialize(data));
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (Lightshow.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapLightshowAttribute {
      return {
         waypoints: this.waypoints.map((e) => e.toJSON()),
         basicEvents: this.basicEvents.map((e) => e.toJSON()),
         colorBoostEvents: this.colorBoostEvents.map((e) => e.toJSON()),
         lightColorEventBoxGroups: this.lightColorEventBoxGroups.map((e) => e.toJSON()),
         lightRotationEventBoxGroups: this.lightRotationEventBoxGroups.map(
            (e) => e.toJSON(),
         ),
         lightTranslationEventBoxGroups: this.lightTranslationEventBoxGroups.map((e) => e.toJSON()),
         fxEventBoxGroups: this.fxEventBoxGroups.map((e) => e.toJSON()),
         eventTypesWithKeywords: {
            list: this.eventTypesWithKeywords.list.map((e) => e.toJSON()),
         },
         useNormalEventsAsCompatibleEvents: this.useNormalEventsAsCompatibleEvents,
         customData: deepCopy(this.customData),
      };
   }
   isValid(): boolean {
      return true;
   }

   waypoints: IWrapWaypoint[];
   basicEvents: IWrapEvent[];
   colorBoostEvents: IWrapColorBoostEvent[];
   lightColorEventBoxGroups: IWrapLightColorEventBoxGroup[];
   lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroup[];
   fxEventBoxGroups: IWrapFxEventBoxGroup[];
   eventTypesWithKeywords: IWrapEventTypesWithKeywords;
   useNormalEventsAsCompatibleEvents: boolean;

   sort(): this {
      this.waypoints.sort(sortObjectFn);
      this.basicEvents.sort(sortObjectFn);
      this.colorBoostEvents.sort(sortObjectFn);
      this.lightColorEventBoxGroups.sort(sortObjectFn);
      this.lightRotationEventBoxGroups.sort(sortObjectFn);
      this.lightTranslationEventBoxGroups.sort(sortObjectFn);
      this.fxEventBoxGroups.sort(sortObjectFn);

      this.lightColorEventBoxGroups.forEach((gr) =>
         gr.boxes.forEach((bx) => bx.events.sort(sortObjectFn))
      );
      this.lightRotationEventBoxGroups.forEach((gr) =>
         gr.boxes.forEach((bx) => bx.events.sort(sortObjectFn))
      );
      this.lightTranslationEventBoxGroups.forEach((gr) =>
         gr.boxes.forEach((bx) => bx.events.sort(sortObjectFn))
      );
      this.fxEventBoxGroups.forEach((gr) => gr.boxes.forEach((bx) => bx.events.sort(sortObjectFn)));

      return this;
   }

   addWaypoints(...data: DeepPartial<IWrapWaypointAttribute>[]): this {
      for (const d of data) {
         this.waypoints.push(new Waypoint(d));
      }
      return this;
   }
   addBasicEvents(...data: DeepPartial<IWrapEventAttribute>[]): this {
      for (const d of data) {
         this.basicEvents.push(new BasicEvent(d));
      }
      return this;
   }
   addColorBoostEvents(
      ...data: DeepPartial<IWrapColorBoostEventAttribute>[]
   ): this {
      for (const d of data) {
         this.colorBoostEvents.push(new ColorBoostEvent(d));
      }
      return this;
   }
   addLightColorEventBoxGroups(
      ...data: DeepPartial<IWrapLightColorEventBoxGroupAttribute>[]
   ): this {
      for (const d of data) {
         this.lightColorEventBoxGroups.push(new LightColorEventBoxGroup(d));
      }
      return this;
   }
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<IWrapLightRotationEventBoxGroupAttribute>[]
   ): this {
      for (const d of data) {
         this.lightRotationEventBoxGroups.push(new LightRotationEventBoxGroup(d));
      }
      return this;
   }
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<IWrapLightTranslationEventBoxGroupAttribute>[]
   ): this {
      for (const d of data) {
         this.lightTranslationEventBoxGroups.push(new LightTranslationEventBoxGroup(d));
      }
      return this;
   }
   addFxEventBoxGroups(
      ...data: DeepPartial<IWrapFxEventBoxGroupAttribute>[]
   ): this {
      for (const d of data) {
         this.fxEventBoxGroups.push(new FxEventBoxGroup(d));
      }
      return this;
   }
}
