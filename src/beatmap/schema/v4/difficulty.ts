import type { IDifficulty } from './types/difficulty.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { assembleOwnedBeatmap } from '../wrapper/_ownedBeatmap.ts';
import { deserializeArc, serializeArc } from './arc.ts';
import { deserializeBombNote, serializeBombNote } from './bombNote.ts';
import { deserializeChain, serializeChain } from './chain.ts';
import { deserializeColorNote, serializeColorNote } from './colorNote.ts';
import { deserializeNJSEvent, serializeNJSEvent } from './njsEvent.ts';
import { lookupIndexed } from './lookup.ts';
import { deserializeObstacle, serializeObstacle } from './obstacle.ts';
import { deserializeRotationEvent } from './rotationEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import type { InferBeatmapDeserializationOptions } from '../shared/types/infer.ts';

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
   const colorNotes = data.difficulty.colorNotes;
   const colorNotesLength = colorNotes.length;
   for (let i = 0; i < colorNotesLength; i++) {
      const jsonObj = serializeColorNote(colorNotes[i]);
      json.colorNotes!.push(jsonObj.object);
      jsonObj.object.i = json.colorNotesData!.length;
      json.colorNotesData!.push(jsonObj.data);
   }
   const bombNotes = data.difficulty.bombNotes;
   const bombNotesLength = bombNotes.length;
   for (let i = 0; i < bombNotesLength; i++) {
      const jsonObj = serializeBombNote(bombNotes[i]);
      json.bombNotes!.push(jsonObj.object);
      jsonObj.object.i = json.bombNotesData!.length;
      json.bombNotesData!.push(jsonObj.data);
   }
   const obstacles = data.difficulty.obstacles;
   const obstaclesLength = obstacles.length;
   for (let i = 0; i < obstaclesLength; i++) {
      const jsonObj = serializeObstacle(obstacles[i]);
      json.obstacles!.push(jsonObj.object);
      jsonObj.object.i = json.obstaclesData!.length;
      json.obstaclesData!.push(jsonObj.data);
   }
   const arcs = data.difficulty.arcs;
   const arcsLength = arcs.length;
   for (let i = 0; i < arcsLength; i++) {
      const jsonObj = serializeArc(arcs[i]);
      json.arcs!.push(jsonObj.object);
      jsonObj.object.ai = json.arcsData!.length;
      json.arcsData!.push(jsonObj.data);
      jsonObj.object.hi = json.colorNotesData!.length;
      json.colorNotesData!.push(jsonObj.headData);
      jsonObj.object.ti = json.colorNotesData!.length;
      json.colorNotesData!.push(jsonObj.tailData);
   }
   const chains = data.difficulty.chains;
   const chainsLength = chains.length;
   for (let i = 0; i < chainsLength; i++) {
      const jsonObj = serializeChain(chains[i]);
      json.chains!.push(jsonObj.object);
      jsonObj.object.i = json.colorNotesData!.length;
      json.colorNotesData!.push(jsonObj.data);
      jsonObj.object.ci = json.chainsData!.length;
      json.chainsData!.push(jsonObj.chainData);
   }
   const njsEvents = data.difficulty.njsEvents;
   const njsEventsLength = njsEvents.length;
   for (let i = 0; i < njsEventsLength; i++) {
      const jsonObj = serializeNJSEvent(njsEvents[i]);
      json.njsEvents!.push(jsonObj.object);
      jsonObj.object.i = json.njsEventData!.length;
      json.njsEventData!.push(jsonObj.data);
   }
   return json;
}

/** Deserialize schema object into beatmap v4 `Difficulty` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills and custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeDifficulty(
   data: IDifficulty,
   options?: InferBeatmapDeserializationOptions<'difficulty', 4>,
): IWrapBeatmap {
   const deserializationOptions: DeserializationOptions = {
      customDataOwnership: options?.customDataOwnership ?? 'copy',
   };
   return assembleOwnedBeatmap({
      version: 4,
      filename: options?.filename,
      lightshowFilename: options?.lightshowFilename,
      difficulty: {
         colorNotes: data.colorNotes?.map((obj) => {
            return deserializeColorNote({
               object: obj,
               data: lookupIndexed(data.colorNotesData, obj?.i, 'colorNotesData'),
            }, deserializationOptions);
         }),
         bombNotes: data.bombNotes?.map((obj) => {
            return deserializeBombNote({
               object: obj,
               data: lookupIndexed(data.bombNotesData, obj?.i, 'bombNotesData'),
            }, deserializationOptions);
         }),
         obstacles: data.obstacles?.map((obj) => {
            return deserializeObstacle({
               object: obj,
               data: lookupIndexed(data.obstaclesData, obj?.i, 'obstaclesData'),
            }, deserializationOptions);
         }),
         arcs: data.arcs?.map((obj) => {
            return deserializeArc({
               object: obj,
               data: lookupIndexed(data.arcsData, obj?.ai, 'arcsData'),
               headData: lookupIndexed(data.colorNotesData, obj?.hi, 'colorNotesData'),
               tailData: lookupIndexed(data.colorNotesData, obj?.ti, 'colorNotesData'),
            }, deserializationOptions);
         }),
         chains: data.chains?.map((obj) => {
            return deserializeChain({
               object: obj,
               data: lookupIndexed(data.colorNotesData, obj?.i, 'colorNotesData'),
               chainData: lookupIndexed(data.chainsData, obj?.ci, 'chainsData'),
            }, deserializationOptions);
         }),
         rotationEvents: data.spawnRotations?.map((obj) => {
            return deserializeRotationEvent({
               object: obj,
               data: lookupIndexed(data.spawnRotationsData, obj?.i, 'spawnRotationsData'),
            }, deserializationOptions);
         }),
         njsEvents: data.njsEvents?.map((obj) => {
            return deserializeNJSEvent({
               object: obj,
               data: lookupIndexed(data.njsEventData, obj?.i, 'njsEventData'),
            }, deserializationOptions);
         }),
         customData: data.customData,
      },
      lightshow: {},
   }, deserializationOptions);
}
