import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IDifficulty } from '../../../types/beatmap/v4/difficulty.ts';
import { bombNote } from './bombNote.ts';
import { chain } from './chain.ts';
import { colorNote } from './colorNote.ts';
import { obstacle } from './obstacle.ts';
import { arc } from './arc.ts';
import { rotationEvent } from './rotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapBeatmapAttribute } from '../../../types/beatmap/wrapper/beatmap.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';

const defaultValue = {
   version: '4.0.0',
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
   customData: {},
} as DeepRequiredIgnore<IDifficulty, 'customData'>;
export const difficulty: ISchemaContainer<IWrapBeatmapAttribute, IDifficulty> = {
   defaultValue,
   serialize(data: IWrapBeatmapAttribute): IDifficulty {
      const json: Required<IDifficulty> = {
         version: '4.0.0',
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
         customData: deepCopy(data.data.customData),
      };
      for (const jsonObj of data.data.colorNotes.map(colorNote.serialize)) {
         json.colorNotes.push(jsonObj.object);
         jsonObj.object.i = json.colorNotesData.length;
         json.colorNotesData.push(jsonObj.data);
      }
      for (const jsonObj of data.data.bombNotes.map(bombNote.serialize)) {
         json.bombNotes.push(jsonObj.object);
         jsonObj.object.i = json.bombNotesData.length;
         json.bombNotesData.push(jsonObj.data);
      }
      for (const jsonObj of data.data.obstacles.map(obstacle.serialize)) {
         json.obstacles.push(jsonObj.object);
         jsonObj.object.i = json.obstaclesData.length;
         json.obstaclesData.push(jsonObj.data);
      }
      for (const jsonObj of data.data.arcs.map(arc.serialize)) {
         json.arcs.push(jsonObj.object);
         jsonObj.object.ai = json.arcsData.length;
         json.arcsData.push(jsonObj.data);
         jsonObj.object.hi = json.colorNotesData.length;
         json.colorNotesData.push(jsonObj.headData);
         jsonObj.object.ti = json.colorNotesData.length;
         json.colorNotesData.push(jsonObj.tailData);
      }
      for (const jsonObj of data.data.chains.map(chain.serialize)) {
         json.chains.push(jsonObj.object);
         jsonObj.object.i = json.colorNotesData.length;
         json.colorNotesData.push(jsonObj.data);
         jsonObj.object.ci = json.chainsData.length;
         json.chainsData.push(jsonObj.chainData);
      }
      for (
         const jsonObj of data.data.rotationEvents.map(
            rotationEvent.serialize,
         )
      ) {
         json.spawnRotations.push(jsonObj.object);
         jsonObj.object.i = json.spawnRotationsData.length;
         json.spawnRotationsData.push(jsonObj.data);
      }
      return json;
   },
   deserialize(
      data: DeepPartial<IDifficulty> = {},
   ): DeepPartial<IWrapBeatmapAttribute> {
      return {
         version: 4,
         data: {
            colorNotes: (
               data?.colorNotes ?? defaultValue.colorNotes
            ).map((obj) =>
               colorNote.deserialize({
                  object: obj,
                  data: data?.colorNotesData?.[obj?.i || 0],
               })
            ),
            bombNotes: (data?.bombNotes ?? defaultValue.bombNotes).map(
               (obj) =>
                  bombNote.deserialize({
                     object: obj,
                     data: data?.bombNotesData?.[obj?.i || 0],
                  }),
            ),
            obstacles: (data?.obstacles ?? defaultValue.obstacles).map(
               (obj) =>
                  obstacle.deserialize({
                     object: obj,
                     data: data?.obstaclesData?.[obj?.i || 0],
                  }),
            ),
            arcs: (data?.arcs ?? defaultValue.arcs).map((obj) =>
               arc.deserialize({
                  object: obj,
                  data: data?.arcsData?.[obj?.ai || 0],
                  headData: data?.colorNotesData?.[obj?.hi || 0],
                  tailData: data?.colorNotesData?.[obj?.ti || 0],
               })
            ),
            chains: (data?.chains ?? defaultValue.chains).map((obj) =>
               chain.deserialize({
                  object: obj,
                  data: data?.colorNotesData?.[obj?.i || 0],
                  chainData: data?.chainsData?.[obj?.ci || 0],
               })
            ),
            rotationEvents: (
               data?.spawnRotations ?? defaultValue.spawnRotations
            ).map((obj) =>
               rotationEvent.deserialize({
                  object: obj,
                  data: data?.spawnRotationsData?.[obj?.i || 0],
               })
            ),
            customData: deepCopy(
               data?.customData ?? defaultValue.customData,
            ),
         },
      };
   },
   isValid(data: IWrapBeatmapAttribute): boolean {
      return (
         data.data.colorNotes.every(colorNote.isValid) &&
         data.data.bombNotes.every(bombNote.isValid) &&
         data.data.arcs.every(arc.isValid) &&
         data.data.chains.every(chain.isValid) &&
         data.data.obstacles.every(obstacle.isValid) &&
         data.data.rotationEvents.every(rotationEvent.isValid)
      );
   },
   isChroma: function (data: IWrapBeatmapAttribute): boolean {
      return (
         data.data.colorNotes.some(colorNote.isChroma) ||
         data.data.bombNotes.some(bombNote.isChroma) ||
         data.data.arcs.some(arc.isChroma) ||
         data.data.chains.some(chain.isChroma) ||
         data.data.obstacles.some(obstacle.isChroma) ||
         data.data.rotationEvents.some(rotationEvent.isChroma)
      );
   },
   isNoodleExtensions: function (data: IWrapBeatmapAttribute): boolean {
      return (
         data.data.colorNotes.some(colorNote.isNoodleExtensions) ||
         data.data.bombNotes.some(bombNote.isNoodleExtensions) ||
         data.data.arcs.some(arc.isNoodleExtensions) ||
         data.data.chains.some(chain.isNoodleExtensions) ||
         data.data.obstacles.some(obstacle.isNoodleExtensions) ||
         data.data.rotationEvents.some(rotationEvent.isNoodleExtensions)
      );
   },
   isMappingExtensions: function (data: IWrapBeatmapAttribute): boolean {
      return (
         data.data.colorNotes.some(colorNote.isMappingExtensions) ||
         data.data.bombNotes.some(bombNote.isMappingExtensions) ||
         data.data.arcs.some(arc.isMappingExtensions) ||
         data.data.chains.some(chain.isMappingExtensions) ||
         data.data.obstacles.some(obstacle.isMappingExtensions) ||
         data.data.rotationEvents.some(rotationEvent.isMappingExtensions)
      );
   },
};
