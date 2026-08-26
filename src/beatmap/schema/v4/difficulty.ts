import type { IDifficulty } from './types/difficulty.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBeatmap } from '../wrapper/beatmap.ts';
import { deserializeArc, serializeArc } from './arc.ts';
import { deserializeBombNote, serializeBombNote } from './bombNote.ts';
import { deserializeChain, serializeChain } from './chain.ts';
import { deserializeColorNote, serializeColorNote } from './colorNote.ts';
import { deserializeNJSEvent, serializeNJSEvent } from './njsEvent.ts';
import { lookupIndexed } from './lookup.ts';
import { deserializeObstacle, serializeObstacle } from './obstacle.ts';
import { deserializeRotationEvent } from './rotationEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';

type DifficultyDeserializationPolyfills = Pick<
   IWrapBeatmap,
   'filename' | 'lightshowFilename'
>;

/** Serialize beatmap v4 `Difficulty` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeDifficulty(data: IWrapBeatmap): IDifficulty {
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
         return serializeColorNote(x);
      })
   ) {
      json.colorNotes!.push(jsonObj.object);
      jsonObj.object.i = json.colorNotesData!.length;
      json.colorNotesData!.push(jsonObj.data);
   }
   for (
      const jsonObj of data.difficulty.bombNotes.map((x) => {
         return serializeBombNote(x);
      })
   ) {
      json.bombNotes!.push(jsonObj.object);
      jsonObj.object.i = json.bombNotesData!.length;
      json.bombNotesData!.push(jsonObj.data);
   }
   for (
      const jsonObj of data.difficulty.obstacles.map((x) => {
         return serializeObstacle(x);
      })
   ) {
      json.obstacles!.push(jsonObj.object);
      jsonObj.object.i = json.obstaclesData!.length;
      json.obstaclesData!.push(jsonObj.data);
   }
   for (
      const jsonObj of data.difficulty.arcs.map((x) => {
         return serializeArc(x);
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
         return serializeChain(x);
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
         return serializeNJSEvent(x);
      })
   ) {
      json.njsEvents!.push(jsonObj.object);
      jsonObj.object.i = json.njsEventData!.length;
      json.njsEventData!.push(jsonObj.data);
   }
   return json;
}

/** Deserialize schema object into beatmap v4 `Difficulty` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills.
 * @returns The unwrapped beatmap object.
 */
export function deserializeDifficulty(
   data: IDifficulty,
   options?: DeepPartial<DifficultyDeserializationPolyfills>,
): IWrapBeatmap {
   return createBeatmap({
      version: 4,
      filename: options?.filename,
      lightshowFilename: options?.lightshowFilename,
      difficulty: {
         colorNotes: data.colorNotes?.map((obj) => {
            return deserializeColorNote({
               object: obj,
               data: lookupIndexed(data.colorNotesData, obj?.i, 'colorNotesData'),
            });
         }),
         bombNotes: data.bombNotes?.map((obj) => {
            return deserializeBombNote({
               object: obj,
               data: lookupIndexed(data.bombNotesData, obj?.i, 'bombNotesData'),
            });
         }),
         obstacles: data.obstacles?.map((obj) => {
            return deserializeObstacle({
               object: obj,
               data: lookupIndexed(data.obstaclesData, obj?.i, 'obstaclesData'),
            });
         }),
         arcs: data.arcs?.map((obj) => {
            return deserializeArc({
               object: obj,
               data: lookupIndexed(data.arcsData, obj?.ai, 'arcsData'),
               headData: lookupIndexed(data.colorNotesData, obj?.hi, 'colorNotesData'),
               tailData: lookupIndexed(data.colorNotesData, obj?.ti, 'colorNotesData'),
            });
         }),
         chains: data.chains?.map((obj) => {
            return deserializeChain({
               object: obj,
               data: lookupIndexed(data.colorNotesData, obj?.i, 'colorNotesData'),
               chainData: lookupIndexed(data.chainsData, obj?.ci, 'chainsData'),
            });
         }),
         rotationEvents: data.spawnRotations?.map((obj) => {
            return deserializeRotationEvent({
               object: obj,
               data: lookupIndexed(data.spawnRotationsData, obj?.i, 'spawnRotationsData'),
            });
         }),
         njsEvents: data.njsEvents?.map((obj) => {
            return deserializeNJSEvent({
               object: obj,
               data: lookupIndexed(data.njsEventData, obj?.i, 'njsEventData'),
            });
         }),
         customData: data.customData,
      },
      lightshow: {},
   });
}
