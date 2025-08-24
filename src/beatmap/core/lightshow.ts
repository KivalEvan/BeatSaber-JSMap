import type { IWrapBasicEvent } from '../schema/wrapper/types/basicEvent.ts';
import type { IWrapColorBoostEvent } from '../schema/wrapper/types/colorBoostEvent.ts';
import type { IWrapFxEventBoxGroup } from '../schema/wrapper/types/fxEventBoxGroup.ts';
import type { IWrapLightColorEventBoxGroup } from '../schema/wrapper/types/lightColorEventBoxGroup.ts';
import type { IWrapLightRotationEventBoxGroup } from '../schema/wrapper/types/lightRotationEventBoxGroup.ts';
import type { IWrapLightshow } from '../schema/wrapper/types/lightshow.ts';
import type { IWrapLightTranslationEventBoxGroup } from '../schema/wrapper/types/lightTranslationEventBoxGroup.ts';
import type { IWrapWaypoint } from '../schema/wrapper/types/waypoint.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { sortObjectFn } from '../helpers/sort.ts';
import { BaseItem } from './abstract/baseItem.ts';
import type { BaseObject } from './abstract/baseObject.ts';
import { BasicEvent } from './basicEvent.ts';
import { BasicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';
import { ColorBoostEvent } from './colorBoostEvent.ts';
import { FxEventBoxGroup } from './fxEventBoxGroup.ts';
import { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { LightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { Waypoint } from './waypoint.ts';
import { createLightshow } from '../schema/wrapper/lightshow.ts';

/**
 * Core beatmap lightshow.
 */
export class Lightshow extends BaseItem implements IWrapLightshow {
   static defaultValue: IWrapLightshow = createLightshow();

   waypoints: Waypoint[];
   basicEvents: BasicEvent[];
   colorBoostEvents: ColorBoostEvent[];
   lightColorEventBoxGroups: LightColorEventBoxGroup[];
   lightRotationEventBoxGroups: LightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: LightTranslationEventBoxGroup[];
   fxEventBoxGroups: FxEventBoxGroup[];
   basicEventTypesWithKeywords: {
      list: BasicEventTypesForKeywords[];
   };
   useNormalEventsAsCompatibleEvents: boolean;

   static createOne(data: DeepPartial<IWrapLightshow> = {}): Lightshow {
      return new this(data);
   }
   static create(...data: DeepPartial<IWrapLightshow>[]): Lightshow[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapLightshow> = {}) {
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

   override reconcile(): this {
      this.waypoints = reconcileClassObject(this.waypoints, Waypoint);
      this.basicEvents = reconcileClassObject(this.basicEvents, BasicEvent);
      this.colorBoostEvents = reconcileClassObject(
         this.colorBoostEvents,
         ColorBoostEvent,
      );
      this.lightColorEventBoxGroups = reconcileClassObject(
         this.lightColorEventBoxGroups,
         LightColorEventBoxGroup,
      );
      this.lightRotationEventBoxGroups = reconcileClassObject(
         this.lightRotationEventBoxGroups,
         LightRotationEventBoxGroup,
      );
      this.lightTranslationEventBoxGroups = reconcileClassObject(
         this.lightTranslationEventBoxGroups,
         LightTranslationEventBoxGroup,
      );
      this.fxEventBoxGroups = reconcileClassObject(
         this.fxEventBoxGroups,
         FxEventBoxGroup,
      );
      this.basicEventTypesWithKeywords.list = reconcileClassObject(
         this.basicEventTypesWithKeywords.list,
         BasicEventTypesForKeywords,
      );
      return this;
   }

   override isValid(
      fn?: (object: this) => boolean,
      override?: boolean,
   ): boolean {
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

   allObjects(): BaseObject[] {
      return [
         ...this.waypoints,
         ...this.basicEvents,
         ...this.colorBoostEvents,
         ...this.lightColorEventBoxGroups,
         ...this.lightRotationEventBoxGroups,
         ...this.lightTranslationEventBoxGroups,
         ...this.fxEventBoxGroups,
      ];
   }

   addWaypoints(...data: DeepPartial<IWrapWaypoint>[]): this {
      for (const d of data) {
         this.waypoints.push(new Waypoint(d));
      }
      return this;
   }
   addBasicEvents(...data: DeepPartial<IWrapBasicEvent>[]): this {
      for (const d of data) {
         this.basicEvents.push(new BasicEvent(d));
      }
      return this;
   }
   addColorBoostEvents(...data: DeepPartial<IWrapColorBoostEvent>[]): this {
      for (const d of data) {
         this.colorBoostEvents.push(new ColorBoostEvent(d));
      }
      return this;
   }
   addLightColorEventBoxGroups(
      ...data: DeepPartial<IWrapLightColorEventBoxGroup>[]
   ): this {
      for (const d of data) {
         this.lightColorEventBoxGroups.push(new LightColorEventBoxGroup(d));
      }
      return this;
   }
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<IWrapLightRotationEventBoxGroup>[]
   ): this {
      for (const d of data) {
         this.lightRotationEventBoxGroups.push(
            new LightRotationEventBoxGroup(d),
         );
      }
      return this;
   }
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<IWrapLightTranslationEventBoxGroup>[]
   ): this {
      for (const d of data) {
         this.lightTranslationEventBoxGroups.push(
            new LightTranslationEventBoxGroup(d),
         );
      }
      return this;
   }
   addFxEventBoxGroups(...data: DeepPartial<IWrapFxEventBoxGroup>[]): this {
      for (const d of data) {
         this.fxEventBoxGroups.push(new FxEventBoxGroup(d));
      }
      return this;
   }
}
