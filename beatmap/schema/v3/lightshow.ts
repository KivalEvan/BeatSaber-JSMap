import type { ILightshow } from '../../../types/beatmap/v3/lightshow.ts';
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

export const lightshow: ISchemaContainer<IWrapBeatmapAttribute, ILightshow> = {
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
   } as Required<ILightshow>,
   serialize(data: IWrapBeatmapAttribute): ILightshow {
      const json: ILightshow = {
         basicBeatmapEvents: data.lightshow.basicEvents.map(
            basicEvent.serialize
         ),
         colorBoostBeatmapEvents: data.lightshow.colorBoostEvents.map(
            colorBoostEvent.serialize
         ),
         lightColorEventBoxGroups: data.lightshow.lightColorEventBoxGroups.map(
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
      for (const obj of data.fxEventBoxGroups.map(fxEventBoxGroup.serialize)) {
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
      data: DeepPartial<ILightshow> = {}
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
      d.arcs = (data.sliders ?? this.defaultValue.sliders).map(arc.deserialize);
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
         fxEventBoxGroup.deserialize({
            object: obj,
            eventData:
               data._fxEventsCollection?._fl ??
               this.defaultValue._fxEventsCollection._fl,
         })
      );
      d.eventTypesWithKeywords = eventTypesWithKeywords.deserialize(
         data.basicEventTypesWithKeywords ??
            this.defaultValue.basicEventTypesWithKeywords
      );
      d.useNormalEventsAsCompatibleEvents =
         data.useNormalEventsAsCompatibleEvents ??
         this.defaultValue.useNormalEventsAsCompatibleEvents;
      d.customData = deepCopy(data.customData ?? this.defaultValue.customData);
      return d;
   },
   isValid(data: IWrapBeatmapAttribute): boolean {
      return (
         data.lightshow.basicEvents.every(basicEvent.isValid) &&
         data.lightshow.colorBoostEvents.every(colorBoostEvent.isValid) &&
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
         eventTypesWithKeywords.isValid(data.lightshow.eventTypesWithKeywords)
      );
   },
   isChroma(data: IWrapBeatmapAttribute): boolean {
      return (
         data.lightshow.basicEvents.some(basicEvent.isChroma) ||
         data.lightshow.colorBoostEvents.some(colorBoostEvent.isChroma) ||
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
         eventTypesWithKeywords.isChroma(data.lightshow.eventTypesWithKeywords)
      );
   },
   isNoodleExtensions(data: IWrapBeatmapAttribute): boolean {
      return (
         data.lightshow.basicEvents.some(basicEvent.isNoodleExtensions) ||
         data.lightshow.colorBoostEvents.some(
            colorBoostEvent.isNoodleExtensions
         ) ||
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
         data.lightshow.basicEvents.some(basicEvent.isMappingExtensions) ||
         data.lightshow.colorBoostEvents.some(
            colorBoostEvent.isMappingExtensions
         ) ||
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
