import { EventBoxType } from '../shared/types/constants.ts';
import type { ILightshow } from './types/lightshow.ts';
import type { IObject } from './types/object.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { assembleOwnedBeatmap } from '../wrapper/_ownedBeatmap.ts';
import {
   deserializeBasicEventTypesWithKeywords,
   serializeBasicEventTypesWithKeywords,
} from '../v3/basicEventTypesWithKeywords.ts';
import { deserializeBasicEvent, serializeBasicEvent } from './basicEvent.ts';
import { deserializeColorBoostEvent, serializeColorBoostEvent } from './colorBoostEvent.ts';
import { deserializeFxEventBoxGroup, serializeFxEventBoxGroup } from './fxEventBoxGroup.ts';
import { lookupIndexed } from './lookup.ts';
import {
   deserializeLightColorEventBoxGroup,
   serializeLightColorEventBoxGroup,
} from './lightColorEventBoxGroup.ts';
import {
   deserializeLightRotationEventBoxGroup,
   serializeLightRotationEventBoxGroup,
} from './lightRotationEventBoxGroup.ts';
import {
   deserializeLightTranslationEventBoxGroup,
   serializeLightTranslationEventBoxGroup,
} from './lightTranslationEventBoxGroup.ts';
import { deserializeWaypoint, serializeWaypoint } from './waypoint.ts';
import type { DeepPartial } from '../../../types/utils.ts';

type LightshowDeserializationPolyfills = Pick<
   IWrapBeatmap,
   'filename' | 'lightshowFilename'
>;

/** Serialize beatmap v4 `Lightshow` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightshow(data: IWrapBeatmap): ILightshow {
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
      basicEventTypesWithKeywords: serializeBasicEventTypesWithKeywords(
         data.lightshow.basicEventTypesWithKeywords,
      ),
      useNormalEventsAsCompatibleEvents: data.lightshow.useNormalEventsAsCompatibleEvents,
      customData: deepCopy(data.lightshow.customData),
   };
   const waypoints = data.lightshow.waypoints;
   const waypointsLength = waypoints.length;
   for (let i = 0; i < waypointsLength; i++) {
      const jsonObj = serializeWaypoint(waypoints[i]);
      json.waypoints.push(jsonObj.object);
      jsonObj.object.i = json.waypointsData.length;
      json.waypointsData.push(jsonObj.data);
   }
   const basicEvents = data.lightshow.basicEvents;
   const basicEventsLength = basicEvents.length;
   for (let i = 0; i < basicEventsLength; i++) {
      const jsonObj = serializeBasicEvent(basicEvents[i]);
      json.basicEvents.push(jsonObj.object);
      jsonObj.object.i = json.basicEventsData.length;
      json.basicEventsData.push(jsonObj.data);
   }
   const colorBoostEvents = data.lightshow.colorBoostEvents;
   const colorBoostEventsLength = colorBoostEvents.length;
   for (let i = 0; i < colorBoostEventsLength; i++) {
      const jsonObj = serializeColorBoostEvent(colorBoostEvents[i]);
      json.colorBoostEvents.push(jsonObj.object);
      jsonObj.object.i = json.colorBoostEventsData.length;
      json.colorBoostEventsData.push(jsonObj.data);
   }
   const lightColorEventBoxGroups = data.lightshow.lightColorEventBoxGroups;
   const lightColorEventBoxGroupsLength = lightColorEventBoxGroups.length;
   for (let i = 0; i < lightColorEventBoxGroupsLength; i++) {
      const obj = serializeLightColorEventBoxGroup(lightColorEventBoxGroups[i]);
      json.eventBoxGroups.push(obj.object);
      const boxData = obj.boxData;
      const boxDataLength = boxData.length;
      for (let j = 0; j < boxDataLength; j++) {
         const box = boxData[j];
         const list: IObject[] = [];
         const eventData = box.eventData;
         const eventDataLength = eventData.length;
         for (let k = 0; k < eventDataLength; k++) {
            const evt = eventData[k];
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
   const lightRotationEventBoxGroups = data.lightshow.lightRotationEventBoxGroups;
   const lightRotationEventBoxGroupsLength = lightRotationEventBoxGroups.length;
   for (let i = 0; i < lightRotationEventBoxGroupsLength; i++) {
      const obj = serializeLightRotationEventBoxGroup(lightRotationEventBoxGroups[i]);
      json.eventBoxGroups.push(obj.object);
      const boxData = obj.boxData;
      const boxDataLength = boxData.length;
      for (let j = 0; j < boxDataLength; j++) {
         const box = boxData[j];
         const list: IObject[] = [];
         const eventData = box.eventData;
         const eventDataLength = eventData.length;
         for (let k = 0; k < eventDataLength; k++) {
            const evt = eventData[k];
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
   const lightTranslationEventBoxGroups = data.lightshow.lightTranslationEventBoxGroups;
   const lightTranslationEventBoxGroupsLength = lightTranslationEventBoxGroups.length;
   for (let i = 0; i < lightTranslationEventBoxGroupsLength; i++) {
      const obj = serializeLightTranslationEventBoxGroup(lightTranslationEventBoxGroups[i]);
      json.eventBoxGroups.push(obj.object);
      const boxData = obj.boxData;
      const boxDataLength = boxData.length;
      for (let j = 0; j < boxDataLength; j++) {
         const box = boxData[j];
         const list: IObject[] = [];
         const eventData = box.eventData;
         const eventDataLength = eventData.length;
         for (let k = 0; k < eventDataLength; k++) {
            const evt = eventData[k];
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
   const fxEventBoxGroups = data.lightshow.fxEventBoxGroups;
   const fxEventBoxGroupsLength = fxEventBoxGroups.length;
   for (let i = 0; i < fxEventBoxGroupsLength; i++) {
      const obj = serializeFxEventBoxGroup(fxEventBoxGroups[i]);
      json.eventBoxGroups.push(obj.object);
      const boxData = obj.boxData;
      const boxDataLength = boxData.length;
      for (let j = 0; j < boxDataLength; j++) {
         const box = boxData[j];
         const list: IObject[] = [];
         const eventData = box.eventData;
         const eventDataLength = eventData.length;
         for (let k = 0; k < eventDataLength; k++) {
            const evt = eventData[k];
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
}

/** Deserialize schema object into beatmap v4 `Lightshow` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightshow(
   data: ILightshow,
   options?: DeepPartial<LightshowDeserializationPolyfills>,
): IWrapBeatmap {
   const lightshow: IWrapBeatmap['lightshow'] = {
      waypoints: data.waypoints?.map((obj) =>
         deserializeWaypoint({
            object: obj,
            data: lookupIndexed(data.waypointsData, obj?.i, 'waypointsData'),
         })
      ) ?? [],
      basicEvents: data.basicEvents?.map((obj) =>
         deserializeBasicEvent({
            object: obj,
            data: lookupIndexed(data.basicEventsData, obj?.i, 'basicEventsData'),
         })
      ) ?? [],
      colorBoostEvents: data.colorBoostEvents?.map((obj) =>
         deserializeColorBoostEvent({
            object: obj,
            data: lookupIndexed(
               data.colorBoostEventsData,
               obj?.i,
               'colorBoostEventsData',
            ),
         })
      ) ?? [],
      basicEventTypesWithKeywords: deserializeBasicEventTypesWithKeywords(
         data.basicEventTypesWithKeywords ?? {},
      ),
      useNormalEventsAsCompatibleEvents: !!data.useNormalEventsAsCompatibleEvents,
      customData: data.customData ?? {},
      fxEventBoxGroups: [],
      lightColorEventBoxGroups: [],
      lightRotationEventBoxGroups: [],
      lightTranslationEventBoxGroups: [],
   };
   for (const ebg of data.eventBoxGroups || []) {
      const t = ebg?.t || 0;
      switch (t) {
         case EventBoxType.COLOR:
            lightshow.lightColorEventBoxGroups.push(
               deserializeLightColorEventBoxGroup({
                  object: ebg ?? {},
                  boxData: ebg?.e?.map((e) => ({
                     data: lookupIndexed(data.lightColorEventBoxes, e?.e, 'lightColorEventBoxes'),
                     filterData: lookupIndexed(data.indexFilters, e?.f, 'indexFilters'),
                     eventData: e.l?.map((l) => ({
                        time: l.b ?? 0,
                        data: lookupIndexed(data.lightColorEvents, l?.i, 'lightColorEvents'),
                     })) ?? [],
                  })) ?? [],
               }),
            );
            break;
         case EventBoxType.ROTATION:
            lightshow.lightRotationEventBoxGroups.push(
               deserializeLightRotationEventBoxGroup({
                  object: ebg,
                  boxData: ebg?.e?.map((e) => ({
                     data: lookupIndexed(
                        data.lightRotationEventBoxes,
                        e?.e,
                        'lightRotationEventBoxes',
                     ),
                     filterData: lookupIndexed(data.indexFilters, e?.f, 'indexFilters'),
                     eventData: e.l?.map((l) => ({
                        time: l.b ?? 0,
                        data: lookupIndexed(data.lightRotationEvents, l?.i, 'lightRotationEvents'),
                     })) ?? [],
                  })) ?? [],
               }),
            );
            break;
         case EventBoxType.TRANSLATION:
            lightshow.lightTranslationEventBoxGroups.push(
               deserializeLightTranslationEventBoxGroup({
                  object: ebg,
                  boxData: ebg?.e?.map((e) => ({
                     data: lookupIndexed(
                        data.lightTranslationEventBoxes,
                        e?.e,
                        'lightTranslationEventBoxes',
                     ),
                     filterData: lookupIndexed(data.indexFilters, e?.f, 'indexFilters'),
                     eventData: e.l?.map((l) => ({
                        time: l.b ?? 0,
                        data: lookupIndexed(
                           data.lightTranslationEvents,
                           l?.i,
                           'lightTranslationEvents',
                        ),
                     })) ?? [],
                  })) ?? [],
               }),
            );
            break;
         case EventBoxType.FX_FLOAT:
            lightshow.fxEventBoxGroups.push(
               deserializeFxEventBoxGroup({
                  object: ebg,
                  boxData: ebg?.e?.map((e) => ({
                     data: lookupIndexed(data.fxEventBoxes, e?.e, 'fxEventBoxes'),
                     filterData: lookupIndexed(data.indexFilters, e?.f, 'indexFilters'),
                     eventData: e.l?.map((l) => ({
                        time: l.b ?? 0,
                        data: lookupIndexed(data.floatFxEvents, l?.i, 'floatFxEvents'),
                     })) ?? [],
                  })) ?? [],
               }),
            );
            break;
      }
   }
   return assembleOwnedBeatmap({
      version: 4,
      filename: options?.filename,
      lightshowFilename: options?.lightshowFilename,
      difficulty: {},
      lightshow: lightshow,
   });
}
