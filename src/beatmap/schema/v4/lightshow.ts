import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightshow } from '../../../types/beatmap/v4/lightshow.ts';
import type { IObject } from '../../../types/beatmap/v4/object.ts';
import type { IWrapBeatmapAttribute } from '../../../types/beatmap/wrapper/beatmap.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { basicEventTypesWithKeywords } from '../v3/basicEventTypesWithKeywords.ts';
import { basicEvent } from './basicEvent.ts';
import { colorBoostEvent } from './colorBoostEvent.ts';
import { fxEventBoxGroup } from './fxEventBoxGroup.ts';
import { lightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { lightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { lightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { waypoint } from './waypoint.ts';

type LightshowPolyfills = Pick<IWrapBeatmapAttribute, 'filename' | 'lightshowFilename'>;

/**
 * Schema serialization for v4 `Lightshow`.
 */
export const lightshow: ISchemaContainer<
   IWrapBeatmapAttribute,
   ILightshow,
   LightshowPolyfills
> = {
   serialize(data) {
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
         basicEventTypesWithKeywords: basicEventTypesWithKeywords.serialize(
            data.lightshow.basicEventTypesWithKeywords,
         ),
         useNormalEventsAsCompatibleEvents: data.lightshow.useNormalEventsAsCompatibleEvents,
         customData: deepCopy(data.lightshow.customData),
      };
      for (
         const jsonObj of data.lightshow.waypoints.map((x) => {
            return waypoint.serialize(x);
         })
      ) {
         json.waypoints.push(jsonObj.object);
         jsonObj.object.i = json.waypointsData.length;
         json.waypointsData.push(jsonObj.data);
      }
      for (
         const jsonObj of data.lightshow.basicEvents.map((x) => {
            return basicEvent.serialize(x);
         })
      ) {
         json.basicEvents.push(jsonObj.object);
         jsonObj.object.i = json.basicEventsData.length;
         json.basicEventsData.push(jsonObj.data);
      }
      for (
         const jsonObj of data.lightshow.colorBoostEvents.map((x) => {
            return colorBoostEvent.serialize(x);
         })
      ) {
         json.colorBoostEvents.push(jsonObj.object);
         jsonObj.object.i = json.colorBoostEventsData.length;
         json.colorBoostEventsData.push(jsonObj.data);
      }
      for (
         const obj of data.lightshow.lightColorEventBoxGroups.map((x) => {
            return lightColorEventBoxGroup.serialize(x);
         })
      ) {
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
      for (
         const obj of data.lightshow.lightRotationEventBoxGroups.map((x) => {
            return lightRotationEventBoxGroup.serialize(x);
         })
      ) {
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
      for (
         const obj of data.lightshow.lightTranslationEventBoxGroups.map((x) => {
            return lightTranslationEventBoxGroup.serialize(x);
         })
      ) {
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
      for (
         const obj of data.lightshow.fxEventBoxGroups.map((x) => {
            return fxEventBoxGroup.serialize(x);
         })
      ) {
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
   deserialize(data, options) {
      const d: IWrapBeatmapAttribute['lightshow'] = {
         lightColorEventBoxGroups: [],
         lightRotationEventBoxGroups: [],
         lightTranslationEventBoxGroups: [],
         fxEventBoxGroups: [],
         waypoints: data.waypoints?.map((obj) =>
            waypoint.deserialize({
               object: obj,
               data: data.waypointsData?.[obj?.i || 0],
            })
         ) ?? [],
         basicEvents: data.basicEvents?.map((obj) =>
            basicEvent.deserialize({
               object: obj,
               data: data.basicEventsData?.[obj?.i || 0],
            })
         ) ?? [],
         colorBoostEvents: data.colorBoostEvents?.map((obj) =>
            colorBoostEvent.deserialize({
               object: obj,
               data: data.colorBoostEventsData?.[obj?.i || 0],
            })
         ) ?? [],
         basicEventTypesWithKeywords: basicEventTypesWithKeywords.deserialize(
            data.basicEventTypesWithKeywords,
         ),
         useNormalEventsAsCompatibleEvents: !!data.useNormalEventsAsCompatibleEvents,
         customData: data.customData ?? {},
      };
      const indFil = data.indexFilters ?? [];
      const lceb = data.lightColorEventBoxes ?? [];
      const lce = data.lightColorEvents ?? [];
      const lreb = data.lightRotationEventBoxes ?? [];
      const lre = data.lightRotationEvents ?? [];
      const lteb = data.lightTranslationEventBoxes ?? [];
      const lte = data.lightTranslationEvents ?? [];
      const fxb = data.fxEventBoxes ?? [];
      const fx = data.floatFxEvents ?? [];
      for (const ebg of data.eventBoxGroups || []) {
         const t = ebg?.t || 0;
         switch (t) {
            case EventBoxType.COLOR:
               d.lightColorEventBoxGroups.push(
                  lightColorEventBoxGroup.deserialize({
                     object: ebg ?? {},
                     boxData: ebg?.e?.map((e) => ({
                        data: lceb[e.e || 0],
                        filterData: indFil[e.f || 0],
                        eventData: e.l?.map((l) => ({
                           time: l.b ?? 0,
                           data: lce[l.i || 0],
                        })) ?? [],
                     })) ?? [],
                  }),
               );
               break;
            case EventBoxType.ROTATION:
               d.lightRotationEventBoxGroups.push(
                  lightRotationEventBoxGroup.deserialize({
                     object: ebg,
                     boxData: ebg?.e?.map((e) => ({
                        data: lreb[e.e || 0],
                        filterData: indFil[e.f || 0],
                        eventData: e.l?.map((l) => ({
                           time: l.b ?? 0,
                           data: lre[l.i || 0],
                        })) ?? [],
                     })) ?? [],
                  }),
               );
               break;
            case EventBoxType.TRANSLATION:
               d.lightTranslationEventBoxGroups.push(
                  lightTranslationEventBoxGroup.deserialize({
                     object: ebg,
                     boxData: ebg?.e?.map((e) => ({
                        data: lteb[e.e || 0],
                        filterData: indFil[e.f || 0],
                        eventData: e.l?.map((l) => ({
                           time: l.b ?? 0,
                           data: lte[l.i || 0],
                        })) ?? [],
                     })) ?? [],
                  }),
               );
               break;
            case EventBoxType.FX_FLOAT:
               d.fxEventBoxGroups.push(
                  fxEventBoxGroup.deserialize({
                     object: ebg,
                     boxData: ebg?.e?.map((e) => ({
                        data: fxb[e.e || 0],
                        filterData: indFil[e.f || 0],
                        eventData: e.l?.map((l) => ({
                           time: l.b ?? 0,
                           data: fx[l.i || 0],
                        })) ?? [],
                     })) ?? [],
                  }),
               );
               break;
         }
      }
      return {
         version: 4,
         filename: options?.filename ?? 'Easy.beatmap.dat',
         lightshowFilename: options?.filename ?? 'Easy.lightshow.dat',
         difficulty: {
            colorNotes: [],
            bombNotes: [],
            obstacles: [],
            arcs: [],
            chains: [],
            bpmEvents: [],
            rotationEvents: [],
            njsEvents: [],
            customData: {},
         },
         lightshow: d,
         customData: {},
      };
   },
};
