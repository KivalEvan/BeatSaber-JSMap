import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IDifficulty } from '../../../types/beatmap/v4/difficulty.ts';
import type { IWrapBeatmapAttribute } from '../../../types/beatmap/wrapper/beatmap.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { arc } from './arc.ts';
import { bombNote } from './bombNote.ts';
import { chain } from './chain.ts';
import { colorNote } from './colorNote.ts';
import { njsEvent } from './njsEvent.ts';
import { obstacle } from './obstacle.ts';
import { rotationEvent } from './rotationEvent.ts';

type DifficultyPolyfills = Pick<IWrapBeatmapAttribute, 'filename' | 'lightshowFilename'>;

/**
 * Schema serialization for v4 `Difficulty`.
 */
export const difficulty: ISchemaContainer<
   IWrapBeatmapAttribute,
   IDifficulty,
   DifficultyPolyfills
> = {
   serialize(data) {
      const json: Required<IDifficulty> = {
         version: '4.1.0',
         colorNotes: [],
         bombNotes: [],
         obstacles: [],
         chains: [],
         arcs: [],
         spawnRotations: [],
         colorNotesData: [],
         bombNotesData: [],
         obstaclesData: [],
         chainsData: [],
         arcsData: [],
         spawnRotationsData: [],
         njsEvents: [],
         njsEventData: [],
         customData: deepCopy(data.difficulty.customData),
      };
      for (
         const jsonObj of data.difficulty.colorNotes.map((x) => {
            return colorNote.serialize(x);
         })
      ) {
         json.colorNotes.push(jsonObj.object);
         jsonObj.object.i = json.colorNotesData.length;
         json.colorNotesData.push(jsonObj.data);
      }
      for (
         const jsonObj of data.difficulty.bombNotes.map((x) => {
            return bombNote.serialize(x);
         })
      ) {
         json.bombNotes.push(jsonObj.object);
         jsonObj.object.i = json.bombNotesData.length;
         json.bombNotesData.push(jsonObj.data);
      }
      for (
         const jsonObj of data.difficulty.obstacles.map((x) => {
            return obstacle.serialize(x);
         })
      ) {
         json.obstacles.push(jsonObj.object);
         jsonObj.object.i = json.obstaclesData.length;
         json.obstaclesData.push(jsonObj.data);
      }
      for (
         const jsonObj of data.difficulty.arcs.map((x) => {
            return arc.serialize(x);
         })
      ) {
         json.arcs.push(jsonObj.object);
         jsonObj.object.ai = json.arcsData.length;
         json.arcsData.push(jsonObj.data);
         jsonObj.object.hi = json.colorNotesData.length;
         json.colorNotesData.push(jsonObj.headData);
         jsonObj.object.ti = json.colorNotesData.length;
         json.colorNotesData.push(jsonObj.tailData);
      }
      for (
         const jsonObj of data.difficulty.chains.map((x) => {
            return chain.serialize(x);
         })
      ) {
         json.chains.push(jsonObj.object);
         jsonObj.object.i = json.colorNotesData.length;
         json.colorNotesData.push(jsonObj.data);
         jsonObj.object.ci = json.chainsData.length;
         json.chainsData.push(jsonObj.chainData);
      }
      for (
         const jsonObj of data.difficulty.rotationEvents.map((x) => {
            return rotationEvent.serialize(x);
         })
      ) {
         json.spawnRotations.push(jsonObj.object);
         jsonObj.object.i = json.spawnRotationsData.length;
         json.spawnRotationsData.push(jsonObj.data);
      }
      for (
         const jsonObj of data.difficulty.njsEvents.map((x) => {
            return njsEvent.serialize(x);
         })
      ) {
         json.njsEvents.push(jsonObj.object);
         jsonObj.object.i = json.njsEventData.length;
         json.njsEventData.push(jsonObj.data);
      }
      return json;
   },
   deserialize(data, options) {
      return {
         version: 4,
         filename: options?.filename ?? 'Easy.beatmap.dat',
         lightshowFilename: options?.lightshowFilename ?? 'Easy.lightshow.dat',
         difficulty: {
            colorNotes: data.colorNotes?.map((obj) =>
               colorNote.deserialize({
                  object: obj,
                  data: data.colorNotesData?.[obj?.i || 0],
               })
            ) ?? [],
            bombNotes: data.bombNotes?.map((obj) =>
               bombNote.deserialize({
                  object: obj,
                  data: data.bombNotesData?.[obj?.i || 0],
               })
            ) ?? [],
            obstacles: data.obstacles?.map((obj) =>
               obstacle.deserialize({
                  object: obj,
                  data: data.obstaclesData?.[obj?.i || 0],
               })
            ) ?? [],
            arcs: data.arcs?.map((obj) =>
               arc.deserialize({
                  object: obj,
                  data: data.arcsData?.[obj?.ai || 0],
                  headData: data.colorNotesData?.[obj?.hi || 0],
                  tailData: data.colorNotesData?.[obj?.ti || 0],
               })
            ) ?? [],
            chains: data.chains?.map((obj) =>
               chain.deserialize({
                  object: obj,
                  data: data.colorNotesData?.[obj?.i || 0],
                  chainData: data.chainsData?.[obj?.ci || 0],
               })
            ) ?? [],
            rotationEvents: data.spawnRotations?.map((obj) =>
               rotationEvent.deserialize({
                  object: obj,
                  data: data.spawnRotationsData?.[obj?.i || 0] ?? {},
               })
            ) ?? [],
            bpmEvents: [],
            njsEvents: data.njsEvents?.map((obj) =>
               njsEvent.deserialize({
                  object: obj,
                  data: data.njsEventData?.[obj?.i || 0] ?? {},
               })
            ) ?? [],
            customData: data.customData ?? {},
         },
         lightshow: {
            waypoints: [],
            basicEvents: [],
            colorBoostEvents: [],
            lightColorEventBoxGroups: [],
            lightRotationEventBoxGroups: [],
            lightTranslationEventBoxGroups: [],
            fxEventBoxGroups: [],
            basicEventTypesWithKeywords: { list: [] },
            useNormalEventsAsCompatibleEvents: false,
            customData: {},
         },
         customData: {},
      };
   },
};
