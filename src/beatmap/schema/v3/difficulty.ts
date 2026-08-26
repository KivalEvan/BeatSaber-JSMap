import type { IDifficulty } from './types/difficulty.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBeatmap } from '../wrapper/beatmap.ts';
import { FxType } from '../shared/types/constants.ts';
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
import { deserializeFxEventBoxGroup, serializeFxEventBoxGroup } from './fxEventBoxGroup.ts';
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
import { deserializeObstacle, serializeObstacle } from './obstacle.ts';
import { deserializeRotationEvent, serializeRotationEvent } from './rotationEvent.ts';
import { deserializeWaypoint, serializeWaypoint } from './waypoint.ts';
import { resolveIndexed } from '../shared/lookup.ts';
import type { DeepPartial } from '../../../types/utils.ts';

type DifficultyDeserializationPolyfills = Pick<
   IWrapBeatmap,
   'filename' | 'lightshowFilename'
>;

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
 * @param options Deserialization polyfills.
 * @returns The unwrapped beatmap object.
 */
export function deserializeDifficulty(
   data: IDifficulty,
   options?: DeepPartial<DifficultyDeserializationPolyfills>,
): IWrapBeatmap {
   const fx = data._fxEventsCollection?._fl;
   return createBeatmap({
      version: 3,
      filename: options?.filename,
      lightshowFilename: options?.lightshowFilename,
      difficulty: {
         colorNotes: data.colorNotes?.map((x) => {
            return deserializeColorNote(x);
         }),
         bombNotes: data.bombNotes?.map((x) => {
            return deserializeBombNote(x);
         }),
         obstacles: data.obstacles?.map((x) => {
            return deserializeObstacle(x);
         }),
         arcs: data.sliders?.map((x) => {
            return deserializeArc(x);
         }),
         chains: data.burstSliders?.map((x) => {
            return deserializeChain(x);
         }),
         rotationEvents: data.rotationEvents?.map((x) => {
            return deserializeRotationEvent(x);
         }),
         bpmEvents: data.bpmEvents?.map((x) => {
            return deserializeBPMEvent(x);
         }),
         customData: data.customData,
      },
      lightshow: {
         waypoints: data.waypoints?.map((x) => {
            return deserializeWaypoint(x);
         }),
         basicEvents: data.basicBeatmapEvents?.map((x) => {
            return deserializeBasicEvent(x);
         }),
         colorBoostEvents: data.colorBoostBeatmapEvents?.map((x) => {
            return deserializeColorBoostEvent(x);
         }),
         lightColorEventBoxGroups: data.lightColorEventBoxGroups?.map((x) => {
            return deserializeLightColorEventBoxGroup(x);
         }),
         lightRotationEventBoxGroups: data.lightRotationEventBoxGroups?.map((x) => {
            return deserializeLightRotationEventBoxGroup(x);
         }),
         lightTranslationEventBoxGroups: data.lightTranslationEventBoxGroups?.map(
            (x) => {
               return deserializeLightTranslationEventBoxGroup(x);
            },
         ),
         fxEventBoxGroups: data.vfxEventBoxGroups?.map((obj) =>
            deserializeFxEventBoxGroup({
               object: { ...obj, t: FxType.FLOAT },
               boxData: obj.e?.map((box) => ({
                  data: box,
                  eventData: box.l?.map((idx) => {
                     return resolveIndexed(fx, idx, '_fxEventsCollection._fl');
                  }) ?? [],
               })) ?? [],
            })
         ),
         basicEventTypesWithKeywords: deserializeBasicEventTypesWithKeywords(
            data.basicEventTypesWithKeywords ?? {},
         ),
         useNormalEventsAsCompatibleEvents: data.useNormalEventsAsCompatibleEvents,
      },
   });
}
