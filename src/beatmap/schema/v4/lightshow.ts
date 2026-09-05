import { EventBoxType } from '../shared/types/constants.ts';
import type { IEventBox } from './types/eventBox.ts';
import type { IEventBoxGroup } from './types/eventBoxGroup.ts';
import type { IFxEventFloat } from './types/fxEventFloat.ts';
import type { IIndexFilter } from './types/indexFilter.ts';
import type { ILightColorEvent } from './types/lightColorEvent.ts';
import type { ILightRotationEvent } from './types/lightRotationEvent.ts';
import type { ILightTranslationEvent } from './types/lightTranslationEvent.ts';
import type { ILightshow } from './types/lightshow.ts';
import type { IObject } from './types/object.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';
import type { IWrapFxEventBox } from '../wrapper/types/fxEventBox.ts';
import type { IWrapFxEventBoxGroup } from '../wrapper/types/fxEventBoxGroup.ts';
import type { IWrapFxEventFloat } from '../wrapper/types/fxEventFloat.ts';
import type { IWrapIndexFilter } from '../wrapper/types/indexFilter.ts';
import type { IWrapLightColorEvent } from '../wrapper/types/lightColorEvent.ts';
import type { IWrapLightColorEventBox } from '../wrapper/types/lightColorEventBox.ts';
import type { IWrapLightColorEventBoxGroup } from '../wrapper/types/lightColorEventBoxGroup.ts';
import type { IWrapLightRotationEvent } from '../wrapper/types/lightRotationEvent.ts';
import type { IWrapLightRotationEventBox } from '../wrapper/types/lightRotationEventBox.ts';
import type { IWrapLightRotationEventBoxGroup } from '../wrapper/types/lightRotationEventBoxGroup.ts';
import type { IWrapLightTranslationEvent } from '../wrapper/types/lightTranslationEvent.ts';
import type { IWrapLightTranslationEventBox } from '../wrapper/types/lightTranslationEventBox.ts';
import type { IWrapLightTranslationEventBoxGroup } from '../wrapper/types/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { assembleOwnedBeatmap } from '../wrapper/_ownedBeatmap.ts';
import { copyCustomData } from '../wrapper/copyCustomData.ts';
import {
   deserializeBasicEventTypesWithKeywords,
   serializeBasicEventTypesWithKeywords,
} from '../v3/basicEventTypesWithKeywords.ts';
import { deserializeBasicEvent, serializeBasicEvent } from './basicEvent.ts';
import { deserializeColorBoostEvent, serializeColorBoostEvent } from './colorBoostEvent.ts';
import { serializeIndexFilter } from './indexFilter.ts';
import { lookupIndexed } from './lookup.ts';
import { deserializeWaypoint, serializeWaypoint } from './waypoint.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import type { InferBeatmapDeserializationOptions } from '../shared/types/infer.ts';

function deserializeIndexFilterDirect(
   data: DeepPartial<IIndexFilter>,
   options: DeserializationOptions,
): IWrapIndexFilter {
   return {
      type: data.f ?? 1,
      p0: data.p ?? 0,
      p1: data.t ?? 0,
      reverse: data.r ?? 0,
      chunks: data.c ?? 0,
      random: data.n ?? 0,
      seed: data.s ?? 0,
      limit: data.l ?? 0,
      limitAffectsType: data.d ?? 0,
      customData: copyCustomData(data.customData, options),
   };
}

function deserializeLightColorEventsDirect(
   references: IObject[] | undefined,
   source: ILightColorEvent[] | undefined,
   options: DeserializationOptions,
): IWrapLightColorEvent[] {
   return references?.map((reference) => {
      const event = lookupIndexed(source, reference.i, 'lightColorEvents');
      return {
         time: reference.b ?? 0,
         previous: event.p ?? 0,
         color: event.c ?? 0,
         frequency: event.f ?? 0,
         brightness: event.b ?? 0,
         strobeBrightness: event.sb ?? 0,
         strobeFade: event.sf ?? 0,
         easing: event.e ?? 0,
         customData: copyCustomData(event.customData, options),
      };
   }) ?? [];
}

function deserializeLightRotationEventsDirect(
   references: IObject[] | undefined,
   source: ILightRotationEvent[] | undefined,
   options: DeserializationOptions,
): IWrapLightRotationEvent[] {
   return references?.map((reference) => {
      const event = lookupIndexed(source, reference.i, 'lightRotationEvents');
      return {
         time: reference.b ?? 0,
         easing: event.e ?? 0,
         loop: event.l ?? 0,
         direction: event.d ?? 0,
         previous: event.p ?? 0,
         rotation: event.r ?? 0,
         customData: copyCustomData(event.customData, options),
      };
   }) ?? [];
}

function deserializeLightTranslationEventsDirect(
   references: IObject[] | undefined,
   source: ILightTranslationEvent[] | undefined,
   options: DeserializationOptions,
): IWrapLightTranslationEvent[] {
   return references?.map((reference) => {
      const event = lookupIndexed(source, reference.i, 'lightTranslationEvents');
      return {
         time: reference.b ?? 0,
         easing: event.e ?? 0,
         previous: event.p ?? 0,
         translation: event.t ?? 0,
         customData: copyCustomData(event.customData, options),
      };
   }) ?? [];
}

function deserializeFxEventsDirect(
   references: IObject[] | undefined,
   source: IFxEventFloat[] | undefined,
   options: DeserializationOptions,
): IWrapFxEventFloat[] {
   return references?.map((reference) => {
      const event = lookupIndexed(source, reference.i, 'floatFxEvents');
      return {
         time: reference.b ?? 0,
         easing: event.e ?? 0,
         previous: event.p ?? 0,
         value: event.v ?? 0,
         customData: copyCustomData(event.customData, options),
      };
   }) ?? [];
}

function deserializeLightColorEventBoxDirect(
   reference: IEventBox,
   data: ILightshow,
   options: DeserializationOptions,
): IWrapLightColorEventBox {
   const box = lookupIndexed(data.lightColorEventBoxes, reference.e, 'lightColorEventBoxes');
   const filter = lookupIndexed(data.indexFilters, reference.f, 'indexFilters');
   return {
      filter: deserializeIndexFilterDirect(filter, options),
      beatDistribution: box.w ?? 0,
      beatDistributionType: box.d ?? 1,
      brightnessDistribution: box.s ?? 0,
      brightnessDistributionType: box.t ?? 1,
      affectFirst: box.b ?? 0,
      easing: box.e ?? 0,
      events: deserializeLightColorEventsDirect(reference.l, data.lightColorEvents, options),
      customData: copyCustomData(box.customData, options),
   };
}

function deserializeLightRotationEventBoxDirect(
   reference: IEventBox,
   data: ILightshow,
   options: DeserializationOptions,
): IWrapLightRotationEventBox {
   const box = lookupIndexed(data.lightRotationEventBoxes, reference.e, 'lightRotationEventBoxes');
   const filter = lookupIndexed(data.indexFilters, reference.f, 'indexFilters');
   return {
      filter: deserializeIndexFilterDirect(filter, options),
      axis: box.a ?? 0,
      flip: box.f ?? 0,
      beatDistribution: box.w ?? 0,
      beatDistributionType: box.d ?? 1,
      rotationDistribution: box.s ?? 0,
      rotationDistributionType: box.t ?? 1,
      affectFirst: box.b ?? 0,
      easing: box.e ?? 0,
      events: deserializeLightRotationEventsDirect(reference.l, data.lightRotationEvents, options),
      customData: copyCustomData(box.customData, options),
   };
}

function deserializeLightTranslationEventBoxDirect(
   reference: IEventBox,
   data: ILightshow,
   options: DeserializationOptions,
): IWrapLightTranslationEventBox {
   const box = lookupIndexed(
      data.lightTranslationEventBoxes,
      reference.e,
      'lightTranslationEventBoxes',
   );
   const filter = lookupIndexed(data.indexFilters, reference.f, 'indexFilters');
   return {
      filter: deserializeIndexFilterDirect(filter, options),
      axis: box.a ?? 0,
      flip: box.f ?? 0,
      beatDistribution: box.w ?? 0,
      beatDistributionType: box.d ?? 1,
      gapDistribution: box.s ?? 0,
      gapDistributionType: box.t ?? 1,
      affectFirst: box.b ?? 0,
      easing: box.e ?? 0,
      events: deserializeLightTranslationEventsDirect(
         reference.l,
         data.lightTranslationEvents,
         options,
      ),
      customData: copyCustomData(box.customData, options),
   };
}

function deserializeFxEventBoxDirect(
   reference: IEventBox,
   data: ILightshow,
   options: DeserializationOptions,
): IWrapFxEventBox {
   const box = lookupIndexed(data.fxEventBoxes, reference.e, 'fxEventBoxes');
   const filter = lookupIndexed(data.indexFilters, reference.f, 'indexFilters');
   return {
      filter: deserializeIndexFilterDirect(filter, options),
      beatDistribution: box.w ?? 0,
      beatDistributionType: box.d ?? 1,
      fxDistribution: box.s ?? 0,
      fxDistributionType: box.t ?? 1,
      affectFirst: box.b ?? 0,
      easing: box.e ?? 0,
      events: deserializeFxEventsDirect(reference.l, data.floatFxEvents, options),
      customData: copyCustomData(box.customData, options),
   };
}

function deserializeLightColorEventBoxGroupDirect(
   source: IEventBoxGroup,
   data: ILightshow,
   options: DeserializationOptions,
): IWrapLightColorEventBoxGroup {
   return {
      time: source.b ?? 0,
      id: source.g ?? 0,
      boxes:
         source.e?.map((reference) =>
            deserializeLightColorEventBoxDirect(reference, data, options)
         ) ??
            [],
      customData: copyCustomData(source.customData, options),
   };
}

function deserializeLightRotationEventBoxGroupDirect(
   source: IEventBoxGroup,
   data: ILightshow,
   options: DeserializationOptions,
): IWrapLightRotationEventBoxGroup {
   return {
      time: source.b ?? 0,
      id: source.g ?? 0,
      boxes:
         source.e?.map((reference) =>
            deserializeLightRotationEventBoxDirect(reference, data, options)
         ) ??
            [],
      customData: copyCustomData(source.customData, options),
   };
}

function deserializeLightTranslationEventBoxGroupDirect(
   source: IEventBoxGroup,
   data: ILightshow,
   options: DeserializationOptions,
): IWrapLightTranslationEventBoxGroup {
   return {
      time: source.b ?? 0,
      id: source.g ?? 0,
      boxes:
         source.e?.map((reference) =>
            deserializeLightTranslationEventBoxDirect(reference, data, options)
         ) ??
            [],
      customData: copyCustomData(source.customData, options),
   };
}

function deserializeFxEventBoxGroupDirect(
   source: IEventBoxGroup,
   data: ILightshow,
   options: DeserializationOptions,
): IWrapFxEventBoxGroup {
   return {
      time: source.b ?? 0,
      id: source.g ?? 0,
      boxes: source.e?.map((reference) => deserializeFxEventBoxDirect(reference, data, options)) ??
         [],
      customData: copyCustomData(source.customData, options),
   };
}

function appendLightColorEventBoxGroups(
   json: Required<ILightshow>,
   groups: IWrapLightColorEventBoxGroup[],
): void {
   const outputGroups = json.eventBoxGroups;
   const outputBoxes = json.lightColorEventBoxes;
   const outputEvents = json.lightColorEvents;
   const filters = json.indexFilters;
   let boxIndex = outputBoxes.length;
   let eventIndex = outputEvents.length;
   let filterIndex = filters.length;
   for (let i = 0, groupsLength = groups.length; i < groupsLength; i++) {
      const group = groups[i];
      const object: IEventBoxGroup = {
         t: EventBoxType.COLOR,
         b: group.time,
         g: group.id,
         e: [],
         customData: deepCopy(group.customData),
      };
      outputGroups.push(object);

      const boxes = group.boxes;
      for (let j = 0, boxesLength = boxes.length; j < boxesLength; j++) {
         const box = boxes[j];
         const boxData = {
            w: box.beatDistribution,
            d: box.beatDistributionType,
            s: box.brightnessDistribution,
            t: box.brightnessDistributionType,
            b: box.affectFirst,
            e: box.easing,
            customData: deepCopy(box.customData),
         };
         const list: IObject[] = [];
         const events = box.events;
         for (let k = 0, eventsLength = events.length; k < eventsLength; k++) {
            const event = events[k];
            const eventData = {
               p: event.previous,
               c: event.color,
               e: event.easing,
               b: event.brightness,
               f: event.frequency,
               sb: event.strobeBrightness,
               sf: event.strobeFade,
               customData: deepCopy(event.customData),
            };
            list.push({ b: event.time, i: eventIndex++ });
            outputEvents.push(eventData);
         }
         object.e!.push({
            e: boxIndex++,
            f: filterIndex++,
            l: list,
            customData: {},
         });
         outputBoxes.push(boxData);
         filters.push(serializeIndexFilter(box.filter));
      }
   }
}

function appendLightRotationEventBoxGroups(
   json: Required<ILightshow>,
   groups: IWrapLightRotationEventBoxGroup[],
): void {
   const outputGroups = json.eventBoxGroups;
   const outputBoxes = json.lightRotationEventBoxes;
   const outputEvents = json.lightRotationEvents;
   const filters = json.indexFilters;
   let boxIndex = outputBoxes.length;
   let eventIndex = outputEvents.length;
   let filterIndex = filters.length;
   for (let i = 0, groupsLength = groups.length; i < groupsLength; i++) {
      const group = groups[i];
      const object: IEventBoxGroup = {
         t: EventBoxType.ROTATION,
         b: group.time,
         g: group.id,
         e: [],
         customData: deepCopy(group.customData),
      };
      outputGroups.push(object);

      const boxes = group.boxes;
      for (let j = 0, boxesLength = boxes.length; j < boxesLength; j++) {
         const box = boxes[j];
         const boxData = {
            w: box.beatDistribution,
            d: box.beatDistributionType,
            s: box.rotationDistribution,
            t: box.rotationDistributionType,
            b: box.affectFirst,
            e: box.easing,
            a: box.axis,
            f: box.flip,
            customData: deepCopy(box.customData),
         };
         const list: IObject[] = [];
         const events = box.events;
         for (let k = 0, eventsLength = events.length; k < eventsLength; k++) {
            const event = events[k];
            const eventData = {
               p: event.previous,
               l: event.loop,
               e: event.easing,
               r: event.rotation,
               d: event.direction,
               customData: deepCopy(event.customData),
            };
            list.push({ b: event.time, i: eventIndex++ });
            outputEvents.push(eventData);
         }
         object.e!.push({
            e: boxIndex++,
            f: filterIndex++,
            l: list,
            customData: {},
         });
         outputBoxes.push(boxData);
         filters.push(serializeIndexFilter(box.filter));
      }
   }
}

function appendLightTranslationEventBoxGroups(
   json: Required<ILightshow>,
   groups: IWrapLightTranslationEventBoxGroup[],
): void {
   const outputGroups = json.eventBoxGroups;
   const outputBoxes = json.lightTranslationEventBoxes;
   const outputEvents = json.lightTranslationEvents;
   const filters = json.indexFilters;
   let boxIndex = outputBoxes.length;
   let eventIndex = outputEvents.length;
   let filterIndex = filters.length;
   for (let i = 0, groupsLength = groups.length; i < groupsLength; i++) {
      const group = groups[i];
      const object: IEventBoxGroup = {
         t: EventBoxType.TRANSLATION,
         b: group.time,
         g: group.id,
         e: [],
         customData: deepCopy(group.customData),
      };
      outputGroups.push(object);

      const boxes = group.boxes;
      for (let j = 0, boxesLength = boxes.length; j < boxesLength; j++) {
         const box = boxes[j];
         const boxData = {
            w: box.beatDistribution,
            d: box.beatDistributionType,
            s: box.gapDistribution,
            t: box.gapDistributionType,
            b: box.affectFirst,
            e: box.easing,
            a: box.axis,
            f: box.flip,
            customData: deepCopy(box.customData),
         };
         const list: IObject[] = [];
         const events = box.events;
         for (let k = 0, eventsLength = events.length; k < eventsLength; k++) {
            const event = events[k];
            const eventData = {
               p: event.previous,
               e: event.easing,
               t: event.translation,
               customData: deepCopy(event.customData),
            };
            list.push({ b: event.time, i: eventIndex++ });
            outputEvents.push(eventData);
         }
         object.e!.push({
            e: boxIndex++,
            f: filterIndex++,
            l: list,
            customData: {},
         });
         outputBoxes.push(boxData);
         filters.push(serializeIndexFilter(box.filter));
      }
   }
}

function appendFxEventBoxGroups(
   json: Required<ILightshow>,
   groups: IWrapFxEventBoxGroup[],
): void {
   const outputGroups = json.eventBoxGroups;
   const outputBoxes = json.fxEventBoxes;
   const outputEvents = json.floatFxEvents;
   const filters = json.indexFilters;
   let boxIndex = outputBoxes.length;
   let eventIndex = outputEvents.length;
   let filterIndex = filters.length;
   for (let i = 0, groupsLength = groups.length; i < groupsLength; i++) {
      const group = groups[i];
      const object: IEventBoxGroup = {
         t: EventBoxType.FX_FLOAT,
         b: group.time,
         g: group.id,
         e: [],
         customData: deepCopy(group.customData),
      };
      outputGroups.push(object);

      const boxes = group.boxes;
      for (let j = 0, boxesLength = boxes.length; j < boxesLength; j++) {
         const box = boxes[j];
         const boxData = {
            w: box.beatDistribution,
            d: box.beatDistributionType,
            s: box.fxDistribution,
            t: box.fxDistributionType,
            b: box.affectFirst,
            e: box.easing,
            customData: deepCopy(box.customData),
         };
         const list: IObject[] = [];
         const events = box.events;
         for (let k = 0, eventsLength = events.length; k < eventsLength; k++) {
            const event = events[k];
            const eventData = {
               p: event.previous,
               e: event.easing,
               v: event.value,
               customData: deepCopy(event.customData),
            };
            list.push({ b: event.time, i: eventIndex++ });
            outputEvents.push(eventData);
         }
         object.e!.push({
            e: boxIndex++,
            f: filterIndex++,
            l: list,
            customData: {},
         });
         outputBoxes.push(boxData);
         filters.push(serializeIndexFilter(box.filter));
      }
   }
}

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
   appendLightColorEventBoxGroups(json, data.lightshow.lightColorEventBoxGroups);
   appendLightRotationEventBoxGroups(json, data.lightshow.lightRotationEventBoxGroups);
   appendLightTranslationEventBoxGroups(json, data.lightshow.lightTranslationEventBoxGroups);
   appendFxEventBoxGroups(json, data.lightshow.fxEventBoxGroups);

   return json;
}

/** Deserialize schema object into beatmap v4 `Lightshow` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills and custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightshow(
   data: ILightshow,
   options?: InferBeatmapDeserializationOptions<'lightshow', 4>,
): IWrapBeatmap {
   const deserializationOptions: DeserializationOptions = {
      customDataOwnership: options?.customDataOwnership ?? 'copy',
   };
   const lightshow: IWrapBeatmap['lightshow'] = {
      waypoints: data.waypoints?.map((obj) =>
         deserializeWaypoint({
            object: obj,
            data: lookupIndexed(data.waypointsData, obj?.i, 'waypointsData'),
         }, deserializationOptions)
      ) ?? [],
      basicEvents: data.basicEvents?.map((obj) =>
         deserializeBasicEvent({
            object: obj,
            data: lookupIndexed(data.basicEventsData, obj?.i, 'basicEventsData'),
         }, deserializationOptions)
      ) ?? [],
      colorBoostEvents: data.colorBoostEvents?.map((obj) =>
         deserializeColorBoostEvent({
            object: obj,
            data: lookupIndexed(
               data.colorBoostEventsData,
               obj?.i,
               'colorBoostEventsData',
            ),
         }, deserializationOptions)
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
   for (const eventBoxGroup of data.eventBoxGroups || []) {
      const eventBoxType = eventBoxGroup?.t || 0;
      switch (eventBoxType) {
         case EventBoxType.COLOR:
            lightshow.lightColorEventBoxGroups.push(
               deserializeLightColorEventBoxGroupDirect(
                  eventBoxGroup ?? {},
                  data,
                  deserializationOptions,
               ),
            );
            break;
         case EventBoxType.ROTATION:
            lightshow.lightRotationEventBoxGroups.push(
               deserializeLightRotationEventBoxGroupDirect(
                  eventBoxGroup ?? {},
                  data,
                  deserializationOptions,
               ),
            );
            break;
         case EventBoxType.TRANSLATION:
            lightshow.lightTranslationEventBoxGroups.push(
               deserializeLightTranslationEventBoxGroupDirect(
                  eventBoxGroup ?? {},
                  data,
                  deserializationOptions,
               ),
            );
            break;
         case EventBoxType.FX_FLOAT:
            lightshow.fxEventBoxGroups.push(
               deserializeFxEventBoxGroupDirect(eventBoxGroup ?? {}, data, deserializationOptions),
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
   }, deserializationOptions);
}
