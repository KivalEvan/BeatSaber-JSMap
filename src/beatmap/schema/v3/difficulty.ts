// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IDifficulty } from '../../../types/beatmap/v3/difficulty.ts';
import type { IWrapBeatmapAttribute } from '../../../types/beatmap/wrapper/beatmap.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createBeatmap } from '../../core/beatmap.ts';
import { createDifficulty } from '../../core/difficulty.ts';
import { createLightshow } from '../../core/lightshow.ts';
import { FxType } from '../../shared/constants.ts';
import { arc } from './arc.ts';
import { basicEvent } from './basicEvent.ts';
import { basicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import { bombNote } from './bombNote.ts';
import { bpmEvent } from './bpmEvent.ts';
import { chain } from './chain.ts';
import { colorBoostEvent } from './colorBoostEvent.ts';
import { colorNote } from './colorNote.ts';
import { fxEventBoxGroup } from './fxEventBoxGroup.ts';
import { lightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { lightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { lightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { obstacle } from './obstacle.ts';
import { rotationEvent } from './rotationEvent.ts';
import { waypoint } from './waypoint.ts';

type DifficultyDeserializationPolyfills = Pick<
   IWrapBeatmapAttribute,
   'filename' | 'lightshowFilename'
>;

/**
 * Schema serialization for v3 `Difficulty`.
 */
export const difficulty: ISchemaContainer<
   IWrapBeatmapAttribute,
   IDifficulty,
   Record<string, any>,
   DifficultyDeserializationPolyfills
> = {
   serialize(data) {
      const json: Required<IDifficulty> = {
         version: '3.3.0',
         bpmEvents: data.difficulty.bpmEvents.map((x) => {
            return bpmEvent.serialize(x);
         }),
         rotationEvents: data.difficulty.rotationEvents.map((x) => {
            return rotationEvent.serialize(x);
         }),
         colorNotes: data.difficulty.colorNotes.map((x) => {
            return colorNote.serialize(x);
         }),
         bombNotes: data.difficulty.bombNotes.map((x) => {
            return bombNote.serialize(x);
         }),
         obstacles: data.difficulty.obstacles.map((x) => {
            return obstacle.serialize(x);
         }),
         sliders: data.difficulty.arcs.map((x) => {
            return arc.serialize(x);
         }),
         burstSliders: data.difficulty.chains.map((x) => {
            return chain.serialize(x);
         }),
         waypoints: data.lightshow.waypoints.map((x) => {
            return waypoint.serialize(x);
         }),
         basicBeatmapEvents: data.lightshow.basicEvents.map((x) => {
            return basicEvent.serialize(x);
         }),
         colorBoostBeatmapEvents: data.lightshow.colorBoostEvents.map((x) => {
            return colorBoostEvent.serialize(x);
         }),
         lightColorEventBoxGroups: data.lightshow.lightColorEventBoxGroups.map((x) => {
            return lightColorEventBoxGroup.serialize(x);
         }),
         lightRotationEventBoxGroups: data.lightshow.lightRotationEventBoxGroups.map((x) => {
            return lightRotationEventBoxGroup.serialize(x);
         }),
         lightTranslationEventBoxGroups: data.lightshow.lightTranslationEventBoxGroups.map(
            (x) => {
               return lightTranslationEventBoxGroup.serialize(x);
            },
         ),
         vfxEventBoxGroups: [],
         basicEventTypesWithKeywords: basicEventTypesWithKeywords.serialize(
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
            return fxEventBoxGroup.serialize(x);
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
   },
   deserialize(data, options) {
      const fx = data._fxEventsCollection?._fl;
      return createBeatmap({
         version: 3,
         filename: options?.filename,
         lightshowFilename: options?.lightshowFilename,
         difficulty: createDifficulty({
            colorNotes: data.colorNotes?.map((x) => {
               return colorNote.deserialize(x);
            }),
            bombNotes: data.bombNotes?.map((x) => {
               return bombNote.deserialize(x);
            }),
            obstacles: data.obstacles?.map((x) => {
               return obstacle.deserialize(x);
            }),
            arcs: data.sliders?.map((x) => {
               return arc.deserialize(x);
            }),
            chains: data.burstSliders?.map((x) => {
               return chain.deserialize(x);
            }),
            rotationEvents: data.rotationEvents?.map((x) => {
               return rotationEvent.deserialize(x);
            }),
            bpmEvents: data.bpmEvents?.map((x) => {
               return bpmEvent.deserialize(x);
            }),
            customData: data.customData,
         }),
         lightshow: createLightshow({
            waypoints: data.waypoints?.map((x) => {
               return waypoint.deserialize(x);
            }),
            basicEvents: data.basicBeatmapEvents?.map((x) => {
               return basicEvent.deserialize(x);
            }),
            colorBoostEvents: data.colorBoostBeatmapEvents?.map((x) => {
               return colorBoostEvent.deserialize(x);
            }),
            lightColorEventBoxGroups: data.lightColorEventBoxGroups?.map((x) => {
               return lightColorEventBoxGroup.deserialize(x);
            }),
            lightRotationEventBoxGroups: data.lightRotationEventBoxGroups?.map((x) => {
               return lightRotationEventBoxGroup.deserialize(x);
            }),
            lightTranslationEventBoxGroups: data.lightTranslationEventBoxGroups?.map(
               (x) => {
                  return lightTranslationEventBoxGroup.deserialize(x);
               },
            ),
            fxEventBoxGroups: data.vfxEventBoxGroups?.map((obj) =>
               fxEventBoxGroup.deserialize({
                  object: { ...obj, t: FxType.FLOAT },
                  boxData: obj.e?.map((box) => ({
                     data: box,
                     eventData: box.l?.map((idx) => fx![idx]) ?? [],
                  })) ?? [],
               })
            ),
            basicEventTypesWithKeywords: basicEventTypesWithKeywords.deserialize(
               data.basicEventTypesWithKeywords ?? {},
            ),
            useNormalEventsAsCompatibleEvents: data.useNormalEventsAsCompatibleEvents,
         }),
      });
   },
};
