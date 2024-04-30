import type { IDifficulty } from '../../../types/beatmap/v3/difficulty.ts';
import { basicEvent } from './basicEvent.ts';
import { eventTypesWithKeywords } from './eventTypesWithKeywords.ts';
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

export const difficulty: ISchemaContainer<IWrapBeatmapAttribute, IDifficulty> =
   {
      defaultValue: {
         version: '3.3.0',
         bpmEvents: [],
         rotationEvents: [],
         colorNotes: [],
         bombNotes: [],
         obstacles: [],
         sliders: [],
         burstSliders: [],
         waypoints: [],
         basicBeatmapEvents: [],
         colorBoostBeatmapEvents: [],
         lightColorEventBoxGroups: [],
         lightRotationEventBoxGroups: [],
         lightTranslationEventBoxGroups: [],
         vfxEventBoxGroups: [],
         _fxEventsCollection: { _fl: [], _il: [] },
         basicEventTypesWithKeywords: {
            d: [],
         },
         useNormalEventsAsCompatibleEvents: false,
         customData: {},
      } as Required<IDifficulty>,
      serialize(data: IWrapBeatmapAttribute): Required<IDifficulty> {
         const json: Required<IDifficulty> = {
            version: '3.3.0',
            bpmEvents: data.data.bpmEvents.map(bpmEvent.serialize),
            rotationEvents: data.data.rotationEvents.map(
               rotationEvent.serialize
            ),
            colorNotes: data.data.colorNotes.map(colorNote.serialize),
            bombNotes: data.data.bombNotes.map(bombNote.serialize),
            obstacles: data.data.obstacles.map(obstacle.serialize),
            sliders: data.data.arcs.map(arc.serialize),
            burstSliders: data.data.chains.map(chain.serialize),
            waypoints: data.lightshow.waypoints.map(waypoint.serialize),
            basicBeatmapEvents: data.lightshow.basicEvents.map(
               basicEvent.serialize
            ),
            colorBoostBeatmapEvents: data.lightshow.colorBoostEvents.map(
               colorBoostEvent.serialize
            ),
            lightColorEventBoxGroups:
               data.lightshow.lightColorEventBoxGroups.map(
                  lightColorEventBoxGroup.serialize
               ),
            lightRotationEventBoxGroups:
               data.lightshow.lightRotationEventBoxGroups.map(
                  lightRotationEventBoxGroup.serialize
               ),
            lightTranslationEventBoxGroups:
               data.lightshow.lightTranslationEventBoxGroups.map(
                  lightTranslationEventBoxGroup.serialize
               ),
            vfxEventBoxGroups: [],
            basicEventTypesWithKeywords: eventTypesWithKeywords.serialize(
               data.lightshow.eventTypesWithKeywords
            ),
            _fxEventsCollection: {
               _fl: [],
               _il: [],
            },
            useNormalEventsAsCompatibleEvents:
               data.lightshow.useNormalEventsAsCompatibleEvents,
            customData: deepCopy(data.customData),
         };
         for (const obj of data.fxEventBoxGroups.map(
            fxEventBoxGroup.serialize
         )) {
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
      deserialize(
         data: DeepPartial<IDifficulty> = {}
      ): DeepPartial<IWrapBeatmapAttribute> {
         const d: DeepPartial<IWrapBeatmapAttribute> = {};
         d.bpmEvents = (data.bpmEvents ?? this.defaultValue.bpmEvents).map(
            bpmEvent.deserialize
         );
         d.rotationEvents = (
            data.rotationEvents ?? this.defaultValue.rotationEvents
         ).map(rotationEvent.deserialize);
         d.colorNotes = (data.colorNotes ?? this.defaultValue.colorNotes).map(
            colorNote.deserialize
         );
         d.bombNotes = (data.bombNotes ?? this.defaultValue.bombNotes).map(
            bombNote.deserialize
         );
         d.obstacles = (data.obstacles ?? this.defaultValue.obstacles).map(
            obstacle.deserialize
         );
         d.arcs = (data.sliders ?? this.defaultValue.sliders).map(
            arc.deserialize
         );
         d.chains = (data.burstSliders ?? this.defaultValue.burstSliders).map(
            chain.deserialize
         );
         d.waypoints = (data.waypoints ?? this.defaultValue.waypoints).map(
            waypoint.deserialize
         );
         d.basicEvents = (
            data.basicBeatmapEvents ?? this.defaultValue.basicBeatmapEvents
         ).map(basicEvent.deserialize);
         d.colorBoostEvents = (
            data.colorBoostBeatmapEvents ??
            this.defaultValue.colorBoostBeatmapEvents
         ).map(colorBoostEvent.deserialize);
         d.lightColorEventBoxGroups = (
            data.lightColorEventBoxGroups ??
            this.defaultValue.lightColorEventBoxGroups
         ).map(lightColorEventBoxGroup.deserialize);
         d.lightRotationEventBoxGroups = (
            data.lightRotationEventBoxGroups ??
            this.defaultValue.lightRotationEventBoxGroups
         ).map(lightRotationEventBoxGroup.deserialize);
         d.lightTranslationEventBoxGroups = (
            data.lightTranslationEventBoxGroups ??
            this.defaultValue.lightTranslationEventBoxGroups
         ).map(lightTranslationEventBoxGroup.deserialize);
         d.fxEventBoxGroups = (
            data.vfxEventBoxGroups ?? this.defaultValue.vfxEventBoxGroups
         ).map((obj) =>
            fxEventBoxGroup.deserialize(
               obj,
               data._fxEventsCollection?._fl ??
                  this.defaultValue._fxEventsCollection._fl
            )
         );
         d.eventTypesWithKeywords = eventTypesWithKeywords.deserialize(
            data.basicEventTypesWithKeywords ??
               this.defaultValue.basicEventTypesWithKeywords
         );
         d.useNormalEventsAsCompatibleEvents =
            data.useNormalEventsAsCompatibleEvents ??
            this.defaultValue.useNormalEventsAsCompatibleEvents;
         d.customData = deepCopy(
            data.customData ?? this.defaultValue.customData
         );
         return d;
      },
      isValid(data: IWrapBeatmapAttribute): boolean {
         return (
            data.data.colorNotes.every(colorNote.isValid) &&
            data.data.bombNotes.every(bombNote.isValid) &&
            data.data.arcs.every(arc.isValid) &&
            data.data.chains.every(chain.isValid) &&
            data.data.obstacles.every(obstacle.isValid) &&
            data.lightshow.basicEvents.every(basicEvent.isValid) &&
            data.lightshow.colorBoostEvents.every(colorBoostEvent.isValid) &&
            data.data.rotationEvents.every(rotationEvent.isValid) &&
            data.data.bpmEvents.every(bpmEvent.isValid) &&
            data.lightshow.waypoints.every(waypoint.isValid) &&
            data.lightshow.lightColorEventBoxGroups.every(
               lightColorEventBoxGroup.isValid
            ) &&
            data.lightshow.lightRotationEventBoxGroups.every(
               lightRotationEventBoxGroup.isValid
            ) &&
            data.lightshow.lightTranslationEventBoxGroups.every(
               lightTranslationEventBoxGroup.isValid
            ) &&
            data.lightshow.fxEventBoxGroups.every(fxEventBoxGroup.isValid) &&
            eventTypesWithKeywords.isValid(
               data.lightshow.eventTypesWithKeywords
            )
         );
      },
      isChroma(data: IWrapBeatmapAttribute): boolean {
         return (
            data.data.colorNotes.some(colorNote.isChroma) ||
            data.data.bombNotes.some(bombNote.isChroma) ||
            data.data.arcs.some(arc.isChroma) ||
            data.data.chains.some(chain.isChroma) ||
            data.data.obstacles.some(obstacle.isChroma) ||
            data.lightshow.basicEvents.some(basicEvent.isChroma) ||
            data.lightshow.colorBoostEvents.some(colorBoostEvent.isChroma) ||
            data.data.rotationEvents.some(rotationEvent.isChroma) ||
            data.data.bpmEvents.some(bpmEvent.isChroma) ||
            data.lightshow.waypoints.some(waypoint.isChroma) ||
            data.lightshow.lightColorEventBoxGroups.some(
               lightColorEventBoxGroup.isChroma
            ) ||
            data.lightshow.lightRotationEventBoxGroups.some(
               lightRotationEventBoxGroup.isChroma
            ) ||
            data.lightshow.lightTranslationEventBoxGroups.some(
               lightTranslationEventBoxGroup.isChroma
            ) ||
            data.lightshow.fxEventBoxGroups.some(fxEventBoxGroup.isChroma) ||
            eventTypesWithKeywords.isChroma(
               data.lightshow.eventTypesWithKeywords
            )
         );
      },
      isNoodleExtensions(data: IWrapBeatmapAttribute): boolean {
         return (
            data.data.colorNotes.some(colorNote.isNoodleExtensions) ||
            data.data.bombNotes.some(bombNote.isNoodleExtensions) ||
            data.data.arcs.some(arc.isNoodleExtensions) ||
            data.data.chains.some(chain.isNoodleExtensions) ||
            data.data.obstacles.some(obstacle.isNoodleExtensions) ||
            data.lightshow.basicEvents.some(basicEvent.isNoodleExtensions) ||
            data.lightshow.colorBoostEvents.some(
               colorBoostEvent.isNoodleExtensions
            ) ||
            data.data.rotationEvents.some(rotationEvent.isNoodleExtensions) ||
            data.data.bpmEvents.some(bpmEvent.isNoodleExtensions) ||
            data.lightshow.waypoints.some(waypoint.isNoodleExtensions) ||
            data.lightshow.lightColorEventBoxGroups.some(
               lightColorEventBoxGroup.isNoodleExtensions
            ) ||
            data.lightshow.lightRotationEventBoxGroups.some(
               lightRotationEventBoxGroup.isNoodleExtensions
            ) ||
            data.lightshow.lightTranslationEventBoxGroups.some(
               lightTranslationEventBoxGroup.isNoodleExtensions
            ) ||
            data.lightshow.fxEventBoxGroups.some(
               fxEventBoxGroup.isNoodleExtensions
            ) ||
            eventTypesWithKeywords.isNoodleExtensions(
               data.lightshow.eventTypesWithKeywords
            )
         );
      },
      isMappingExtensions(data: IWrapBeatmapAttribute): boolean {
         return (
            data.data.colorNotes.some(colorNote.isMappingExtensions) ||
            data.data.bombNotes.some(bombNote.isMappingExtensions) ||
            data.data.arcs.some(arc.isMappingExtensions) ||
            data.data.chains.some(chain.isMappingExtensions) ||
            data.data.obstacles.some(obstacle.isMappingExtensions) ||
            data.lightshow.basicEvents.some(basicEvent.isMappingExtensions) ||
            data.lightshow.colorBoostEvents.some(
               colorBoostEvent.isMappingExtensions
            ) ||
            data.data.rotationEvents.some(rotationEvent.isMappingExtensions) ||
            data.data.bpmEvents.some(bpmEvent.isMappingExtensions) ||
            data.lightshow.waypoints.some(waypoint.isMappingExtensions) ||
            data.lightshow.lightColorEventBoxGroups.some(
               lightColorEventBoxGroup.isMappingExtensions
            ) ||
            data.lightshow.lightRotationEventBoxGroups.some(
               lightRotationEventBoxGroup.isMappingExtensions
            ) ||
            data.lightshow.lightTranslationEventBoxGroups.some(
               lightTranslationEventBoxGroup.isMappingExtensions
            ) ||
            data.lightshow.fxEventBoxGroups.some(
               fxEventBoxGroup.isMappingExtensions
            ) ||
            eventTypesWithKeywords.isMappingExtensions(
               data.lightshow.eventTypesWithKeywords
            )
         );
      },
   };
