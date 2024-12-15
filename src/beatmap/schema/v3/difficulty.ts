import type { IDifficulty } from '../../../types/beatmap/v3/difficulty.ts';
import { basicEvent } from './basicEvent.ts';
import { basicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import { bombNote } from './bombNote.ts';
import { bpmEvent } from './bpmEvent.ts';
import { chain } from './chain.ts';
import { colorBoostEvent } from './colorBoostEvent.ts';
import { colorNote } from './colorNote.ts';
import { lightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { lightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { lightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { obstacle } from './obstacle.ts';
import { rotationEvent } from './rotationEvent.ts';
import { arc } from './arc.ts';
import { waypoint } from './waypoint.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { fxEventBoxGroup } from './fxEventBoxGroup.ts';
import type { IWrapBeatmapAttribute } from '../../../types/beatmap/wrapper/beatmap.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';

/**
 * Schema serialization for v3 `Difficulty`.
 */
export const difficulty: ISchemaContainer<IWrapBeatmapAttribute, IDifficulty> = {
   serialize(data: IWrapBeatmapAttribute): Required<IDifficulty> {
      const json: Required<IDifficulty> = {
         version: '3.3.0',
         bpmEvents: data.difficulty.bpmEvents.map(bpmEvent.serialize),
         rotationEvents: data.difficulty.rotationEvents.map(
            rotationEvent.serialize,
         ),
         colorNotes: data.difficulty.colorNotes.map(colorNote.serialize),
         bombNotes: data.difficulty.bombNotes.map(bombNote.serialize),
         obstacles: data.difficulty.obstacles.map(obstacle.serialize),
         sliders: data.difficulty.arcs.map(arc.serialize),
         burstSliders: data.difficulty.chains.map(chain.serialize),
         waypoints: data.lightshow.waypoints.map(waypoint.serialize),
         basicBeatmapEvents: data.lightshow.basicEvents.map(
            basicEvent.serialize,
         ),
         colorBoostBeatmapEvents: data.lightshow.colorBoostEvents.map(
            colorBoostEvent.serialize,
         ),
         lightColorEventBoxGroups: data.lightshow.lightColorEventBoxGroups.map(
            lightColorEventBoxGroup.serialize,
         ),
         lightRotationEventBoxGroups: data.lightshow.lightRotationEventBoxGroups.map(
            lightRotationEventBoxGroup.serialize,
         ),
         lightTranslationEventBoxGroups: data.lightshow.lightTranslationEventBoxGroups.map(
            lightTranslationEventBoxGroup.serialize,
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
         const obj of data.lightshow.fxEventBoxGroups.map(
            fxEventBoxGroup.serialize,
         )
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
   deserialize: function (
      data: DeepPartial<IDifficulty> = {},
   ): DeepPartial<IWrapBeatmapAttribute> {
      const d: DeepPartial<IWrapBeatmapAttribute> = {
         version: 3,
         difficulty: {},
         lightshow: {},
      };
      d.difficulty!.bpmEvents = data.bpmEvents?.map(bpmEvent.deserialize);
      d.difficulty!.rotationEvents = data.rotationEvents?.map(
         rotationEvent.deserialize,
      );
      d.difficulty!.colorNotes = data.colorNotes?.map(colorNote.deserialize);
      d.difficulty!.bombNotes = data.bombNotes?.map(bombNote.deserialize);
      d.difficulty!.obstacles = data.obstacles?.map(obstacle.deserialize);
      d.difficulty!.arcs = data.sliders?.map(arc.deserialize);
      d.difficulty!.chains = data.burstSliders?.map(chain.deserialize);
      d.lightshow!.waypoints = data.waypoints?.map(waypoint.deserialize);
      d.lightshow!.basicEvents = data.basicBeatmapEvents?.map(
         basicEvent.deserialize,
      );
      d.lightshow!.colorBoostEvents = data.colorBoostBeatmapEvents?.map(
         colorBoostEvent.deserialize,
      );
      d.lightshow!.lightColorEventBoxGroups = data.lightColorEventBoxGroups?.map(
         lightColorEventBoxGroup.deserialize,
      );
      d.lightshow!.lightRotationEventBoxGroups = data.lightRotationEventBoxGroups?.map(
         lightRotationEventBoxGroup.deserialize,
      );
      d.lightshow!.lightTranslationEventBoxGroups = data.lightTranslationEventBoxGroups?.map(
         lightTranslationEventBoxGroup.deserialize,
      );
      const fx = data._fxEventsCollection?._fl;
      d.lightshow!.fxEventBoxGroups = data.vfxEventBoxGroups?.map((obj) =>
         fxEventBoxGroup.deserialize({
            object: obj,
            boxData: obj.e?.map((box) => ({
               data: box,
               eventData: box.l?.map((idx) => fx![idx]),
            })),
         })
      );
      d.lightshow!.basicEventTypesWithKeywords = basicEventTypesWithKeywords.deserialize(
         data.basicEventTypesWithKeywords,
      );
      d.lightshow!.useNormalEventsAsCompatibleEvents = data.useNormalEventsAsCompatibleEvents;
      d.difficulty!.customData = data.customData;
      return d;
   },
};
