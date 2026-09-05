import type { IDifficulty } from './types/difficulty.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { assembleOwnedBeatmap } from '../wrapper/_ownedBeatmap.ts';
import { deserializeArc, serializeArc } from './arc.ts';
import { deserializeBasicEvent, serializeBasicEvent } from './basicEvent.ts';
import {
   deserializeBasicEventTypesWithKeywords,
   serializeBasicEventTypesWithKeywords,
} from './basicEventTypesWithKeywords.ts';
import { deserializeBombNote, serializeBombNote } from './bombNote.ts';
import { deserializeBPMEvent, serializeBPMEvent } from './bpmEvent.ts';
import { deserializeChain, serializeChain } from './chain.ts';
import { deserializeColorBoostEvent, serializeColorBoostEvent } from './colorBoostEvent.ts';
import { deserializeColorNote, serializeColorNote } from './colorNote.ts';
import {
   deserializeDirectFxEventBoxGroup,
   deserializeDirectLightColorEventBoxGroup,
   deserializeDirectLightRotationEventBoxGroup,
   deserializeDirectLightTranslationEventBoxGroup,
} from './_directEventBoxes.ts';
import { serializeFxEventBoxGroup } from './fxEventBoxGroup.ts';
import { serializeLightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { serializeLightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { serializeLightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { deserializeObstacle, serializeObstacle } from './obstacle.ts';
import { deserializeRotationEvent, serializeRotationEvent } from './rotationEvent.ts';
import { deserializeWaypoint, serializeWaypoint } from './waypoint.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import type { InferBeatmapDeserializationOptions } from '../shared/types/infer.ts';

/** Serialize beatmap v3 `Difficulty` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeDifficulty(data: IWrapBeatmap): IDifficulty {
   const json: Required<IDifficulty> = {
      version: '3.3.0',
      bpmEvents: data.difficulty.bpmEvents.map((x) => {
         return serializeBPMEvent(x);
      }),
      rotationEvents: data.difficulty.rotationEvents.map((x) => {
         return serializeRotationEvent(x);
      }),
      colorNotes: data.difficulty.colorNotes.map((x) => {
         return serializeColorNote(x);
      }),
      bombNotes: data.difficulty.bombNotes.map((x) => {
         return serializeBombNote(x);
      }),
      obstacles: data.difficulty.obstacles.map((x) => {
         return serializeObstacle(x);
      }),
      sliders: data.difficulty.arcs.map((x) => {
         return serializeArc(x);
      }),
      burstSliders: data.difficulty.chains.map((x) => {
         return serializeChain(x);
      }),
      waypoints: data.lightshow.waypoints.map((x) => {
         return serializeWaypoint(x);
      }),
      basicBeatmapEvents: data.lightshow.basicEvents.map((x) => {
         return serializeBasicEvent(x);
      }),
      colorBoostBeatmapEvents: data.lightshow.colorBoostEvents.map((x) => {
         return serializeColorBoostEvent(x);
      }),
      lightColorEventBoxGroups: data.lightshow.lightColorEventBoxGroups.map((x) => {
         return serializeLightColorEventBoxGroup(x);
      }),
      lightRotationEventBoxGroups: data.lightshow.lightRotationEventBoxGroups.map((x) => {
         return serializeLightRotationEventBoxGroup(x);
      }),
      lightTranslationEventBoxGroups: data.lightshow.lightTranslationEventBoxGroups.map(
         (x) => {
            return serializeLightTranslationEventBoxGroup(x);
         },
      ),
      vfxEventBoxGroups: [],
      basicEventTypesWithKeywords: serializeBasicEventTypesWithKeywords(
         data.lightshow.basicEventTypesWithKeywords,
      ),
      _fxEventsCollection: {
         _fl: [],
         _il: [],
      },
      useNormalEventsAsCompatibleEvents: data.lightshow.useNormalEventsAsCompatibleEvents,
      customData: deepCopy(data.difficulty.customData),
   };
   for (
      const obj of data.lightshow.fxEventBoxGroups.map((x) => {
         return serializeFxEventBoxGroup(x);
      })
   ) {
      json.vfxEventBoxGroups.push(obj.object);
      for (const box of obj.boxData) {
         obj.object.e!.push(box.data);
         for (const evt of box.eventData) {
            box.data.l!.push(json._fxEventsCollection._fl!.length);
            json._fxEventsCollection._fl!.push(evt);
         }
      }
   }
   return json;
}

/** Deserialize schema object into beatmap v3 `Difficulty` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills and custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeDifficulty(
   data: IDifficulty,
   options?: InferBeatmapDeserializationOptions<'difficulty', 3>,
): IWrapBeatmap {
   const deserializationOptions: DeserializationOptions = {
      customDataOwnership: options?.customDataOwnership ?? 'copy',
   };
   const fx = data._fxEventsCollection?._fl;
   return assembleOwnedBeatmap({
      version: 3,
      filename: options?.filename,
      lightshowFilename: options?.lightshowFilename,
      difficulty: {
         colorNotes: data.colorNotes?.map((x) => {
            return deserializeColorNote(x, deserializationOptions);
         }),
         bombNotes: data.bombNotes?.map((x) => {
            return deserializeBombNote(x, deserializationOptions);
         }),
         obstacles: data.obstacles?.map((x) => {
            return deserializeObstacle(x, deserializationOptions);
         }),
         arcs: data.sliders?.map((x) => {
            return deserializeArc(x, deserializationOptions);
         }),
         chains: data.burstSliders?.map((x) => {
            return deserializeChain(x, deserializationOptions);
         }),
         rotationEvents: data.rotationEvents?.map((x) => {
            return deserializeRotationEvent(x, deserializationOptions);
         }),
         bpmEvents: data.bpmEvents?.map((x) => {
            return deserializeBPMEvent(x, deserializationOptions);
         }),
         customData: data.customData,
      },
      lightshow: {
         waypoints: data.waypoints?.map((x) => {
            return deserializeWaypoint(x, deserializationOptions);
         }),
         basicEvents: data.basicBeatmapEvents?.map((x) => {
            return deserializeBasicEvent(x, deserializationOptions);
         }),
         colorBoostEvents: data.colorBoostBeatmapEvents?.map((x) => {
            return deserializeColorBoostEvent(x, deserializationOptions);
         }),
         lightColorEventBoxGroups: data.lightColorEventBoxGroups?.map((x) => {
            return deserializeDirectLightColorEventBoxGroup(x, deserializationOptions);
         }),
         lightRotationEventBoxGroups: data.lightRotationEventBoxGroups?.map((x) => {
            return deserializeDirectLightRotationEventBoxGroup(x, deserializationOptions);
         }),
         lightTranslationEventBoxGroups: data.lightTranslationEventBoxGroups?.map(
            (x) => {
               return deserializeDirectLightTranslationEventBoxGroup(x, deserializationOptions);
            },
         ),
         fxEventBoxGroups: data.vfxEventBoxGroups?.map((obj) => {
            return deserializeDirectFxEventBoxGroup(obj, fx, deserializationOptions);
         }),
         basicEventTypesWithKeywords: deserializeBasicEventTypesWithKeywords(
            data.basicEventTypesWithKeywords ?? {},
            deserializationOptions,
         ),
         useNormalEventsAsCompatibleEvents: data.useNormalEventsAsCompatibleEvents,
      },
   }, deserializationOptions);
}
