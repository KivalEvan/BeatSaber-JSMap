import { ILightshow } from '../../types/beatmap/v4/lightshow.ts';
import { Waypoint } from './waypoint.ts';
import { BasicEvent } from './basicEvent.ts';
import { ColorBoostEvent } from './colorBoostEvent.ts';
import { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { LightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { FxEventBoxGroup } from './fxEventBoxGroup.ts';
import { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightshow } from '../wrapper/lightshow.ts';
import { IWrapLightTranslationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import { IWrapLightColorEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { IWrapLightRotationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import { IIndexFilter } from '../../types/beatmap/v4/indexFilter.ts';
import { ILightColorEventBox } from '../../types/beatmap/v4/lightColorEventBox.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v4/lightRotationEventBox.ts';
import { ILightTranslationEventBox } from '../../types/beatmap/v4/lightTranslationEventBox.ts';
import { IWrapFxEventBoxGroupAttribute } from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import { IFxEventBox } from '../../types/beatmap/v4/fxEventBox.ts';
import { IWrapWaypointAttribute } from '../../types/beatmap/wrapper/waypoint.ts';
import { BasicEventTypesWithKeywords } from '../v3/basicEventTypesWithKeywords.ts';
import { ILightColorEvent } from '../../types/beatmap/v4/lightColorEvent.ts';
import { ILightRotationEvent } from '../../types/beatmap/v4/lightRotationEvent.ts';
import { ILightTranslationEvent } from '../../types/beatmap/v4/lightTranslationEvent.ts';
import { IEventBoxGroup } from '../../types/beatmap/v4/eventBoxGroup.ts';
import {
   IBasicEventContainer,
   IColorBoostEventContainer,
   IWaypointContainer,
} from '../../types/beatmap/v4/container.ts';
import { EventBoxType } from '../../types/beatmap/shared/constants.ts';
import { IObject } from '../../types/beatmap/v4/object.ts';

/** Lightshow beatmap v4 class object. */
export class Lightshow extends WrapLightshow<ILightshow> {
   readonly version = '4.0.0';

   waypoints: Waypoint[];
   basicEvents: BasicEvent[];
   colorBoostEvents: ColorBoostEvent[];
   lightColorEventBoxGroups: LightColorEventBoxGroup[] = [];
   lightRotationEventBoxGroups: LightRotationEventBoxGroup[] = [];
   lightTranslationEventBoxGroups: LightTranslationEventBoxGroup[] = [];
   fxEventBoxGroups: FxEventBoxGroup[] = [];
   eventTypesWithKeywords: BasicEventTypesWithKeywords;
   useNormalEventsAsCompatibleEvents: boolean;

   constructor(data: Partial<ILightshow> = {}) {
      super();

      this.waypoints = (data.content?.waypoints ?? []).map(
         (obj) => new Waypoint(obj),
      );
      this.basicEvents = (data.content?.basicEvents ?? []).map(
         (obj) => new BasicEvent(obj, data.content?.basicEventsData[obj.i || 0]),
      );
      this.colorBoostEvents = (data.content?.colorBoostEvents ?? []).map(
         (obj) =>
            new ColorBoostEvent(
               obj,
               data.content?.colorBoostEventsData[obj.i || 0],
            ),
      );
      for (const ebg of data.content?.eventBoxGroups || []) {
         switch (ebg.t) {
            case EventBoxType.COLOR:
               this.lightColorEventBoxGroups.push(
                  new LightColorEventBoxGroup(
                     ebg,
                     data.content?.lightColorEventBoxes,
                     data.content?.lightColorEvents,
                     data.content?.indexFilters,
                  ),
               );
               break;
            case EventBoxType.ROTATION:
               this.lightRotationEventBoxGroups.push(
                  new LightRotationEventBoxGroup(
                     ebg,
                     data.content?.lightRotationEventBoxes,
                     data.content?.lightRotationEvents,
                     data.content?.indexFilters,
                  ),
               );
               break;
            case EventBoxType.TRANSLATION:
               this.lightTranslationEventBoxGroups.push(
                  new LightTranslationEventBoxGroup(
                     ebg,
                     data.content?.lightTranslationEventBoxes,
                     data.content?.lightTranslationEvents,
                     data.content?.indexFilters,
                  ),
               );
               break;
            case EventBoxType.FX_FLOAT:
               this.fxEventBoxGroups.push(
                  new FxEventBoxGroup(
                     ebg,
                     data.content?.fxEventBoxes,
                     data.content?.floatFxEvents,
                     data.content?.indexFilters,
                  ),
               );
               break;
         }
      }
      this.eventTypesWithKeywords = new BasicEventTypesWithKeywords(
         data.content?.basicEventTypesWithKeywords || {},
      );
      this.useNormalEventsAsCompatibleEvents = !!data.content?.useNormalEventsAsCompatibleEvents;
      this.customData = deepCopy(data.content?.customData ?? {});
   }

   static create(data: Partial<ILightshow> = {}): Lightshow {
      return new this(data);
   }

   toJSON(): Required<ILightshow> {
      const json: Required<ILightshow> = {
         version: this.version,
         contentChecksum: '',
         content: {
            waypoints: [],
            waypointsData: [],
            basicEvents: [],
            basicEventsData: [],
            colorBoostEvents: [],
            colorBoostEventsData: [],
            eventBoxGroups: [],
            indexFilters: [],
            lightColorEventBoxes: [],
            lightColorEvents: [],
            lightRotationEventBoxes: [],
            lightRotationEvents: [],
            lightTranslationEventBoxes: [],
            lightTranslationEvents: [],
            fxEventBoxes: [],
            floatFxEvents: [],
            basicEventTypesWithKeywords: this.eventTypesWithKeywords.toJSON(),
            useNormalEventsAsCompatibleEvents: this.useNormalEventsAsCompatibleEvents,
            customData: deepCopy(this.customData),
         },
      };
      for (const obj of this.waypoints) {
         const jsonObj = obj.toJSON();
         json.content.waypoints.push(jsonObj.object);
         jsonObj.object.i = json.content.waypointsData.length;
         json.content.waypointsData.push(jsonObj.data);
      }
      for (const obj of this.basicEvents) {
         const jsonObj = obj.toJSON();
         json.content.basicEvents.push(jsonObj.object);
         jsonObj.object.i = json.content.basicEventsData.length;
         json.content.basicEventsData.push(jsonObj.data);
      }
      for (const obj of this.colorBoostEvents) {
         const jsonObj = obj.toJSON();
         json.content.colorBoostEvents.push(jsonObj.object);
         jsonObj.object.i = json.content.colorBoostEventsData.length;
         json.content.colorBoostEventsData.push(jsonObj.data);
      }
      for (const obj of this.lightColorEventBoxGroups.map((obj) => obj.toJSON())) {
         json.content.eventBoxGroups.push(obj.object);
         for (const box of obj.boxData) {
            const list: IObject[] = [];
            for (const evt of box.eventData) {
               list.push({
                  b: evt.time,
                  i: json.content.lightColorEvents.length,
               });
               json.content.lightColorEvents.push(evt.data);
            }
            obj.object.e!.push({
               i: json.content.lightColorEventBoxes.length,
               f: json.content.indexFilters.length,
               l: list,
            });
            json.content.lightColorEventBoxes.push(box.data);
            json.content.indexFilters.push(box.filterData);
         }
      }
      for (const obj of this.lightRotationEventBoxGroups.map((obj) => obj.toJSON())) {
         json.content.eventBoxGroups.push(obj.object);
         for (const box of obj.boxData) {
            const list: IObject[] = [];
            for (const evt of box.eventData) {
               list.push({
                  b: evt.time,
                  i: json.content.lightRotationEvents.length,
               });
               json.content.lightRotationEvents.push(evt.data);
            }
            obj.object.e!.push({
               i: json.content.lightRotationEventBoxes.length,
               f: json.content.indexFilters.length,
               l: list,
            });
            json.content.lightRotationEventBoxes.push(box.data);
            json.content.indexFilters.push(box.filterData);
         }
      }
      for (const obj of this.lightTranslationEventBoxGroups.map((obj) => obj.toJSON())) {
         json.content.eventBoxGroups.push(obj.object);
         for (const box of obj.boxData) {
            const list: IObject[] = [];
            for (const evt of box.eventData) {
               list.push({
                  b: evt.time,
                  i: json.content.lightTranslationEvents.length,
               });
               json.content.lightTranslationEvents.push(evt.data);
            }
            obj.object.e!.push({
               i: json.content.lightTranslationEventBoxes.length,
               f: json.content.indexFilters.length,
               l: list,
            });
            json.content.lightTranslationEventBoxes.push(box.data);
            json.content.indexFilters.push(box.filterData);
         }
      }
      for (const obj of this.fxEventBoxGroups.map((obj) => obj.toJSON())) {
         json.content.eventBoxGroups.push(obj.object);
         for (const box of obj.boxData) {
            const list: IObject[] = [];
            for (const evt of box.eventData) {
               list.push({ b: evt.time, i: json.content.floatFxEvents.length });
               json.content.floatFxEvents.push(evt.data);
            }
            obj.object.e!.push({
               i: json.content.fxEventBoxes.length,
               f: json.content.indexFilters.length,
               l: list,
            });
            json.content.fxEventBoxes.push(box.data);
            json.content.indexFilters.push(box.filterData);
         }
      }

      return json;
   }

   get customData(): NonNullable<ILightshow['content']['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightshow['content']['customData']>) {
      this._customData = value;
   }

   reparse(keepRef?: boolean): this {
      this.basicEvents = this.basicEvents.map((obj) => this.createOrKeep(BasicEvent, obj, keepRef));
      this.colorBoostEvents = this.colorBoostEvents.map((obj) =>
         this.createOrKeep(ColorBoostEvent, obj, keepRef)
      );

      return this;
   }

   addWaypoints(
      ...data: Partial<IWrapWaypointAttribute<IWaypointContainer>>[]
   ): this;
   addWaypoints(
      ...data: Partial<IWrapEventAttribute<IWaypointContainer>>[]
   ): this {
      for (const obj of data) this.waypoints.push(new Waypoint(obj));
      return this;
   }

   addBasicEvents(
      ...data: Partial<IWrapEventAttribute<IBasicEventContainer>>[]
   ): this;
   addBasicEvents(
      ...data: Partial<IWrapEventAttribute<IBasicEventContainer>>[]
   ): this {
      for (const obj of data) this.basicEvents.push(new BasicEvent(obj));
      return this;
   }

   addColorBoostEvents(
      ...data: Partial<
         IWrapColorBoostEventAttribute<IColorBoostEventContainer>
      >[]
   ): this;
   addColorBoostEvents(
      ...data: Partial<
         IWrapColorBoostEventAttribute<IColorBoostEventContainer>
      >[]
   ): this {
      for (const obj of data) {
         this.colorBoostEvents.push(new ColorBoostEvent(obj));
      }
      return this;
   }

   addLightColorEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightColorEventBoxGroupAttribute<
            IEventBoxGroup,
            ILightColorEventBox,
            ILightColorEvent,
            IIndexFilter
         >
      >[]
   ): this;
   addLightColorEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightColorEventBoxGroupAttribute<
            IEventBoxGroup,
            ILightColorEventBox,
            ILightColorEvent,
            IIndexFilter
         >
      >[]
   ): this {
      for (const obj of data) {
         this.lightColorEventBoxGroups.push(new LightColorEventBoxGroup(obj));
      }
      return this;
   }

   addLightRotationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxGroupAttribute<
            IEventBoxGroup,
            ILightRotationEventBox,
            ILightRotationEvent,
            IIndexFilter
         >
      >[]
   ): this;
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxGroupAttribute<
            IEventBoxGroup,
            ILightRotationEventBox,
            ILightRotationEvent,
            IIndexFilter
         >
      >[]
   ): this {
      for (const obj of data) {
         this.lightRotationEventBoxGroups.push(
            new LightRotationEventBoxGroup(obj),
         );
      }
      return this;
   }

   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            IEventBoxGroup,
            ILightTranslationEventBox,
            ILightTranslationEvent,
            IIndexFilter
         >
      >[]
   ): this;
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            IEventBoxGroup,
            ILightTranslationEventBox,
            ILightTranslationEvent,
            IIndexFilter
         >
      >[]
   ): this {
      for (const obj of data) {
         this.lightTranslationEventBoxGroups.push(
            new LightTranslationEventBoxGroup(obj),
         );
      }
      return this;
   }

   addFxEventBoxGroups(
      ...data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IEventBoxGroup,
            IFxEventBox,
            IIndexFilter
         >
      >[]
   ): this;
   addFxEventBoxGroups(
      ...data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IEventBoxGroup,
            IFxEventBox,
            IIndexFilter
         >
      >[]
   ): this {
      for (const obj of data) {
         this.fxEventBoxGroups.push(new FxEventBoxGroup(obj));
      }
      return this;
   }

   isValid(): boolean {
      return (
         this.waypoints.every((obj) => this.checkClass(Waypoint, obj)) ||
         this.basicEvents.every((obj) => this.checkClass(BasicEvent, obj)) ||
         this.colorBoostEvents.every((obj) => this.checkClass(ColorBoostEvent, obj)) ||
         this.lightColorEventBoxGroups.every((obj) =>
            this.checkClass(LightColorEventBoxGroup, obj)
         ) ||
         this.lightRotationEventBoxGroups.every((obj) =>
            this.checkClass(LightRotationEventBoxGroup, obj)
         ) ||
         this.lightTranslationEventBoxGroups.every((obj) =>
            this.checkClass(LightTranslationEventBoxGroup, obj)
         ) ||
         this.fxEventBoxGroups.every((obj) => this.checkClass(FxEventBoxGroup, obj)) ||
         this.eventTypesWithKeywords instanceof BasicEventTypesWithKeywords
      );
   }
}
