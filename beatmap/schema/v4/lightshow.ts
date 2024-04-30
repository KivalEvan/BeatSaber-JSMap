import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightshow } from '../../../types/beatmap/v4/lightshow.ts';
import { waypoint } from './waypoint.ts';
import { basicEvent } from './basicEvent.ts';
import { colorBoostEvent } from './colorBoostEvent.ts';
import { lightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { lightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { lightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { fxEventBoxGroup } from './fxEventBoxGroup.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IIndexFilter } from '../../../types/beatmap/v4/indexFilter.ts';
import type { ILightColorEventBox } from '../../../types/beatmap/v4/lightColorEventBox.ts';
import type { ILightRotationEventBox } from '../../../types/beatmap/v4/lightRotationEventBox.ts';
import type { ILightTranslationEventBox } from '../../../types/beatmap/v4/lightTranslationEventBox.ts';
import type { IFxEventBox } from '../../../types/beatmap/v4/fxEventBox.ts';
import type { ILightColorEvent } from '../../../types/beatmap/v4/lightColorEvent.ts';
import type { ILightRotationEvent } from '../../../types/beatmap/v4/lightRotationEvent.ts';
import type { ILightTranslationEvent } from '../../../types/beatmap/v4/lightTranslationEvent.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { IObject } from '../../../types/beatmap/v4/object.ts';
import type { IWrapBeatmapAttribute } from '../../../types/beatmap/wrapper/beatmap.ts';
import type { IFxEventFloat } from '../../../types/beatmap/v4/fxEventFloat.ts';
import { eventTypesWithKeywords } from '../v3/eventTypesWithKeywords.ts';

export const lightshow: ISchemaContainer<IWrapBeatmapAttribute, ILightshow> = {
   defaultValue: {
      version: '4.0.0',
      waypoints: [],
      waypointsData: [],
      basicEvents: [],
      basicEventsData: [],
      colorBoostEvents: [],
      colorBoostEventsData: [],
      eventBoxGroups: [],
      indexFilters: [],
      lightColorEvents: [],
      lightColorEventBoxes: [],
      lightRotationEvents: [],
      lightRotationEventBoxes: [],
      lightTranslationEvents: [],
      lightTranslationEventBoxes: [],
      floatFxEvents: [],
      fxEventBoxes: [],
      basicEventTypesWithKeywords: {
         ...eventTypesWithKeywords.defaultValue,
      },
      useNormalEventsAsCompatibleEvents: false,
      customData: {},
   } as DeepRequiredIgnore<ILightshow, 'customData'>,
   serialize(data: IWrapBeatmapAttribute): ILightshow {
      const json: Required<ILightshow> = {
         version: '4.0.0',
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
         basicEventTypesWithKeywords: eventTypesWithKeywords.serialize(
            data.lightshow.eventTypesWithKeywords
         ),
         useNormalEventsAsCompatibleEvents:
            data.lightshow.useNormalEventsAsCompatibleEvents,
         customData: deepCopy(data.customData),
      };
      for (const jsonObj of data.lightshow.waypoints.map(waypoint.serialize)) {
         json.waypoints.push(jsonObj.object);
         jsonObj.object.i = json.waypointsData.length;
         json.waypointsData.push(jsonObj.data);
      }
      for (const jsonObj of data.lightshow.basicEvents.map(
         basicEvent.serialize
      )) {
         json.basicEvents.push(jsonObj.object);
         jsonObj.object.i = json.basicEventsData.length;
         json.basicEventsData.push(jsonObj.data);
      }
      for (const jsonObj of data.lightshow.colorBoostEvents.map(
         colorBoostEvent.serialize
      )) {
         json.colorBoostEvents.push(jsonObj.object);
         jsonObj.object.i = json.colorBoostEventsData.length;
         json.colorBoostEventsData.push(jsonObj.data);
      }
      for (const obj of data.lightshow.lightColorEventBoxGroups.map(
         lightColorEventBoxGroup.serialize
      )) {
         json.eventBoxGroups.push(obj.object);
         for (const box of obj.boxData) {
            const list: IObject[] = [];
            for (const evt of box.eventData) {
               list.push({
                  b: evt.time,
                  i: json.lightColorEvents.length,
               });
               json.lightColorEvents.push(evt.data);
            }
            obj.object.e!.push({
               e: json.lightColorEventBoxes.length,
               f: json.indexFilters.length,
               l: list,
               customData: {},
            });
            json.lightColorEventBoxes.push(box.data);
            json.indexFilters.push(box.filterData);
         }
      }
      for (const obj of data.lightshow.lightRotationEventBoxGroups.map(
         lightRotationEventBoxGroup.serialize
      )) {
         json.eventBoxGroups.push(obj.object);
         for (const box of obj.boxData) {
            const list: IObject[] = [];
            for (const evt of box.eventData) {
               list.push({
                  b: evt.time,
                  i: json.lightRotationEvents.length,
               });
               json.lightRotationEvents.push(evt.data);
            }
            obj.object.e!.push({
               e: json.lightRotationEventBoxes.length,
               f: json.indexFilters.length,
               l: list,
               customData: {},
            });
            json.lightRotationEventBoxes.push(box.data);
            json.indexFilters.push(box.filterData);
         }
      }
      for (const obj of data.lightshow.lightTranslationEventBoxGroups.map(
         lightTranslationEventBoxGroup.serialize
      )) {
         json.eventBoxGroups.push(obj.object);
         for (const box of obj.boxData) {
            const list: IObject[] = [];
            for (const evt of box.eventData) {
               list.push({
                  b: evt.time,
                  i: json.lightTranslationEvents.length,
               });
               json.lightTranslationEvents.push(evt.data);
            }
            obj.object.e!.push({
               e: json.lightTranslationEventBoxes.length,
               f: json.indexFilters.length,
               l: list,
               customData: {},
            });
            json.lightTranslationEventBoxes.push(box.data);
            json.indexFilters.push(box.filterData);
         }
      }
      for (const obj of data.lightshow.fxEventBoxGroups.map(
         fxEventBoxGroup.serialize
      )) {
         json.eventBoxGroups.push(obj.object);
         for (const box of obj.boxData) {
            const list: IObject[] = [];
            for (const evt of box.eventData) {
               list.push({ b: evt.time, i: json.floatFxEvents.length });
               json.floatFxEvents.push(evt.data);
            }
            obj.object.e!.push({
               e: json.fxEventBoxes.length,
               f: json.indexFilters.length,
               l: list,
               customData: {},
            });
            json.fxEventBoxes.push(box.data);
            json.indexFilters.push(box.filterData);
         }
      }

      return json;
   },
   deserialize(
      data: DeepPartial<ILightshow> = {}
   ): DeepPartial<IWrapBeatmapAttribute> {
      d.waypoints = (data?.waypoints ?? []).map((obj) =>
         waypoint.deserialize({object:obj,data: data?.waypointsData?.[obj?.i || 0]})
      );
      d.basicEvents = (data?.basicEvents ?? []).map((obj) =>
         basicEvent.deserialize({object:obj,data: data?.basicEventsData?.[obj?.i || 0]})
      );
      d.colorBoostEvents = (data?.colorBoostEvents ?? []).map((obj) =>
         colorBoostEvent.deserialize({
            object:obj,
            data:data?.colorBoostEventsData?.[obj?.i || 0]}
         )
      );
      for (const ebg of data?.eventBoxGroups || []) {
         const t = ebg?.t || 0;
         switch (t) {
            case EventBoxType.COLOR:
               d.lightColorEventBoxGroups.push(
                  lightColorEventBoxGroup.deserialize(
                     ebg,
                     data?.lightColorEventBoxes as ILightColorEventBox[],
                     data?.lightColorEvents as ILightColorEvent[],
                     data?.indexFilters as IIndexFilter[]
                  )
               );
               break;
            case EventBoxType.ROTATION:
               d.lightRotationEventBoxGroups.push(
                  lightRotationEventBoxGroup.deserialize(
                     ebg,
                     data?.lightRotationEventBoxes as ILightRotationEventBox[],
                     data?.lightRotationEvents as ILightRotationEvent[],
                     data?.indexFilters as IIndexFilter[]
                  )
               );
               break;
            case EventBoxType.TRANSLATION:
               d.lightTranslationEventBoxGroups.push(
                  lightTranslationEventBoxGroup.deserialize(
                     ebg,
                     data?.lightTranslationEventBoxes as ILightTranslationEventBox[],
                     data?.lightTranslationEvents as ILightTranslationEvent[],
                     data?.indexFilters as IIndexFilter[]
                  )
               );
               break;
            case EventBoxType.FX_FLOAT:
               d.fxEventBoxGroups.push(
                  fxEventBoxGroup.deserialize(
                     ebg,
                     data?.fxEventBoxes as IFxEventBox[],
                     data?.floatFxEvents as IFxEventFloat[],
                     data?.indexFilters as IIndexFilter[]
                  )
               );
               break;
         }
      }
      d.eventTypesWithKeywords = eventTypesWithKeywords.deserialize(
         data?.basicEventTypesWithKeywords ||
            this.defaultValue.basicEventTypesWithKeywords
      );
      d.useNormalEventsAsCompatibleEvents =
         !!data?.useNormalEventsAsCompatibleEvents;
      d.customData = deepCopy(data?.customData ?? {});
      return d;
   },
   isValid(data: IWrapBeatmapAttribute): boolean {
      return (
         data.lightshow.waypoints.every(waypoint.isValid) &&
         data.lightshow.basicEvents.every(basicEvent.isValid) &&
         data.lightshow.colorBoostEvents.every(colorBoostEvent.isValid) &&
         data.lightshow.lightColorEventBoxGroups.every(
            lightColorEventBoxGroup.isValid
         ) &&
         data.lightshow.lightRotationEventBoxGroups.every(
            lightRotationEventBoxGroup.isValid
         ) &&
         data.lightshow.lightTranslationEventBoxGroups.every(
            lightTranslationEventBoxGroup.isValid
         ) &&
         data.lightshow.fxEventBoxGroups.every(fxEventBoxGroup.isValid) &&
         eventTypesWithKeywords.isValid(data.lightshow.eventTypesWithKeywords)
      );
   },
   isChroma(data: IWrapBeatmapAttribute): boolean {
      return (
         data.lightshow.waypoints.some(waypoint.isChroma) ||
         data.lightshow.basicEvents.some(basicEvent.isChroma) ||
         data.lightshow.colorBoostEvents.some(colorBoostEvent.isChroma) ||
         data.lightshow.lightColorEventBoxGroups.some(
            lightColorEventBoxGroup.isChroma
         ) ||
         data.lightshow.lightRotationEventBoxGroups.some(
            lightRotationEventBoxGroup.isChroma
         ) ||
         data.lightshow.lightTranslationEventBoxGroups.some(
            lightTranslationEventBoxGroup.isChroma
         ) ||
         data.lightshow.fxEventBoxGroups.some(fxEventBoxGroup.isChroma) ||
         eventTypesWithKeywords.isChroma(data.lightshow.eventTypesWithKeywords)
      );
   },
   isNoodleExtensions(data: IWrapBeatmapAttribute): boolean {
      return (
         data.lightshow.waypoints.some(waypoint.isNoodleExtensions) ||
         data.lightshow.basicEvents.some(basicEvent.isNoodleExtensions) ||
         data.lightshow.colorBoostEvents.some(colorBoostEvent.isNoodleExtensions) ||
         data.lightshow.lightColorEventBoxGroups.some(
            lightColorEventBoxGroup.isNoodleExtensions
         ) ||
         data.lightshow.lightRotationEventBoxGroups.some(
            lightRotationEventBoxGroup.isNoodleExtensions
         ) ||
         data.lightshow.lightTranslationEventBoxGroups.some(
            lightTranslationEventBoxGroup.isNoodleExtensions
         ) ||
         data.lightshow.fxEventBoxGroups.some(fxEventBoxGroup.isNoodleExtensions) ||
         eventTypesWithKeywords.isNoodleExtensions(data.lightshow.eventTypesWithKeywords)
      );
   },
   isMappingExtensions(data: IWrapBeatmapAttribute): boolean {
      return (
         data.lightshow.waypoints.some(waypoint.isMappingExtensions) ||
         data.lightshow.basicEvents.some(basicEvent.isMappingExtensions) ||
         data.lightshow.colorBoostEvents.some(colorBoostEvent.isMappingExtensions) ||
         data.lightshow.lightColorEventBoxGroups.some(
            lightColorEventBoxGroup.isMappingExtensions
         ) ||
         data.lightshow.lightRotationEventBoxGroups.some(
            lightRotationEventBoxGroup.isMappingExtensions
         ) ||
         data.lightshow.lightTranslationEventBoxGroups.some(
            lightTranslationEventBoxGroup.isMappingExtensions
         ) ||
         data.lightshow.fxEventBoxGroups.some(fxEventBoxGroup.isMappingExtensions) ||
         eventTypesWithKeywords.isMappingExtensions(data.lightshow.eventTypesWithKeywords)
      );
   },
};
