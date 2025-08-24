// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IDifficulty } from './types/difficulty.ts';
import type { IWrapBeatmap } from '../../core/types/beatmap.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBeatmap } from '../../core/beatmap.ts';
import { createDifficulty } from '../../core/difficulty.ts';
import { createLightshow } from '../../core/lightshow.ts';
import { arc } from './arc.ts';
import { bombNote } from './bombNote.ts';
import { chain } from './chain.ts';
import { colorNote } from './colorNote.ts';
import { njsEvent } from './njsEvent.ts';
import { obstacle } from './obstacle.ts';
import { rotationEvent } from './rotationEvent.ts';

type DifficultyDeserializationPolyfills = Pick<
   IWrapBeatmap,
   'filename' | 'lightshowFilename'
>;

/**
 * Schema serialization for v4 `Difficulty`.
 */
export const difficulty: ISchemaContainer<
   IWrapBeatmap,
   IDifficulty,
   Record<string, any>,
   DifficultyDeserializationPolyfills
> = {
   serialize(data) {
      const json: Required<
         Omit<IDifficulty, 'spawnRotations' | 'spawnRotationsData'>
      > = {
         version: '4.1.0',
         colorNotes: [],
         bombNotes: [],
         obstacles: [],
         chains: [],
         arcs: [],
         colorNotesData: [],
         bombNotesData: [],
         obstaclesData: [],
         chainsData: [],
         arcsData: [],
         njsEvents: [],
         njsEventData: [],
         customData: deepCopy(data.difficulty.customData),
      };
      for (
         const jsonObj of data.difficulty.colorNotes.map((x) => {
            return colorNote.serialize(x);
         })
      ) {
         json.colorNotes!.push(jsonObj.object);
         jsonObj.object.i = json.colorNotesData!.length;
         json.colorNotesData!.push(jsonObj.data);
      }
      for (
         const jsonObj of data.difficulty.bombNotes.map((x) => {
            return bombNote.serialize(x);
         })
      ) {
         json.bombNotes!.push(jsonObj.object);
         jsonObj.object.i = json.bombNotesData!.length;
         json.bombNotesData!.push(jsonObj.data);
      }
      for (
         const jsonObj of data.difficulty.obstacles.map((x) => {
            return obstacle.serialize(x);
         })
      ) {
         json.obstacles!.push(jsonObj.object);
         jsonObj.object.i = json.obstaclesData!.length;
         json.obstaclesData!.push(jsonObj.data);
      }
      for (
         const jsonObj of data.difficulty.arcs.map((x) => {
            return arc.serialize(x);
         })
      ) {
         json.arcs!.push(jsonObj.object);
         jsonObj.object.ai = json.arcsData!.length;
         json.arcsData!.push(jsonObj.data);
         jsonObj.object.hi = json.colorNotesData!.length;
         json.colorNotesData!.push(jsonObj.headData);
         jsonObj.object.ti = json.colorNotesData!.length;
         json.colorNotesData!.push(jsonObj.tailData);
      }
      for (
         const jsonObj of data.difficulty.chains.map((x) => {
            return chain.serialize(x);
         })
      ) {
         json.chains!.push(jsonObj.object);
         jsonObj.object.i = json.colorNotesData!.length;
         json.colorNotesData!.push(jsonObj.data);
         jsonObj.object.ci = json.chainsData!.length;
         json.chainsData!.push(jsonObj.chainData);
      }
      for (
         const jsonObj of data.difficulty.njsEvents.map((x) => {
            return njsEvent.serialize(x);
         })
      ) {
         json.njsEvents!.push(jsonObj.object);
         jsonObj.object.i = json.njsEventData!.length;
         json.njsEventData!.push(jsonObj.data);
      }
      return json;
   },
   deserialize(data, options) {
      return createBeatmap({
         version: 4,
         filename: options?.filename,
         lightshowFilename: options?.lightshowFilename,
         difficulty: createDifficulty({
            colorNotes: data.colorNotes?.map((obj) => {
               return colorNote.deserialize({
                  object: obj,
                  data: data.colorNotesData?.[obj?.i ?? 0] ?? {},
               });
            }),
            bombNotes: data.bombNotes?.map((obj) => {
               return bombNote.deserialize({
                  object: obj,
                  data: data.bombNotesData?.[obj?.i ?? 0] ?? {},
               });
            }),
            obstacles: data.obstacles?.map((obj) => {
               return obstacle.deserialize({
                  object: obj,
                  data: data.obstaclesData?.[obj?.i ?? 0] ?? {},
               });
            }),
            arcs: data.arcs?.map((obj) => {
               return arc.deserialize({
                  object: obj,
                  data: data.arcsData?.[obj?.ai ?? 0] ?? {},
                  headData: data.colorNotesData?.[obj?.hi ?? 0] ?? {},
                  tailData: data.colorNotesData?.[obj?.ti ?? 0] ?? {},
               });
            }),
            chains: data.chains?.map((obj) => {
               return chain.deserialize({
                  object: obj,
                  data: data.colorNotesData?.[obj?.i ?? 0] ?? {},
                  chainData: data.chainsData?.[obj?.ci ?? 0] ?? {},
               });
            }),
            rotationEvents: data.spawnRotations?.map((obj) => {
               return rotationEvent.deserialize({
                  object: obj,
                  data: data.spawnRotationsData?.[obj?.i ?? 0] ?? {},
               });
            }),
            njsEvents: data.njsEvents?.map((obj) => {
               return njsEvent.deserialize({
                  object: obj,
                  data: data.njsEventData?.[obj?.i ?? 0] ?? {},
               });
            }),
            customData: data.customData,
         }),
         lightshow: createLightshow(),
      });
   },
};
