// deno-lint-ignore-file no-explicit-any
import type { IWrapEvent, IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import type { IWrapEventTypesWithKeywords } from '../../types/beatmap/wrapper/eventTypesWithKeywords.ts';
import type {
   IWrapBombNote,
   IWrapBombNoteAttribute,
} from '../../types/beatmap/wrapper/bombNote.ts';
import type {
   IWrapBPMEvent,
   IWrapBPMEventAttribute,
} from '../../types/beatmap/wrapper/bpmEvent.ts';
import type { IWrapChain, IWrapChainAttribute } from '../../types/beatmap/wrapper/chain.ts';
import type {
   IWrapColorBoostEvent,
   IWrapColorBoostEventAttribute,
} from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type {
   IWrapColorNote,
   IWrapColorNoteAttribute,
} from '../../types/beatmap/wrapper/colorNote.ts';
import type {
   IWrapLightColorEventBoxGroup,
   IWrapLightColorEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type {
   IWrapLightRotationEventBoxGroup,
   IWrapLightRotationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import type {
   IWrapLightTranslationEventBoxGroup,
   IWrapLightTranslationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type {
   IWrapObstacle,
   IWrapObstacleAttribute,
} from '../../types/beatmap/wrapper/obstacle.ts';
import type {
   IWrapRotationEvent,
   IWrapRotationEventAttribute,
} from '../../types/beatmap/wrapper/rotationEvent.ts';
import type { IWrapArc, IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import type {
   IWrapWaypoint,
   IWrapWaypointAttribute,
} from '../../types/beatmap/wrapper/waypoint.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { BaseItem } from './abstract/baseItem.ts';
import type { IWrapBeatmap, IWrapBeatmapAttribute } from '../../types/beatmap/wrapper/beatmap.ts';
import type {
   IWrapFxEventBoxGroup,
   IWrapFxEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import type { IWrapDifficulty } from '../../types/beatmap/wrapper/difficulty.ts';
import type { IWrapLightshow } from '../../types/beatmap/wrapper/lightshow.ts';
import { Difficulty } from './difficulty.ts';
import { Lightshow } from './lightshow.ts';

export class Beatmap extends BaseItem implements IWrapBeatmap {
   static defaultValue: IWrapBeatmapAttribute = {
      data: {
         filename: 'Unnamed.beatmap.dat',
         bpmEvents: [],
         rotationEvents: [],
         colorNotes: [],
         bombNotes: [],
         obstacles: [],
         arcs: [],
         chains: [],
         customData: {},
      },
      lightshow: {
         filename: 'Unnamed.lightshow.dat',
         waypoints: [],
         basicEvents: [],
         colorBoostEvents: [],
         lightColorEventBoxGroups: [],
         lightRotationEventBoxGroups: [],
         lightTranslationEventBoxGroups: [],
         fxEventBoxGroups: [],
         eventTypesWithKeywords: { list: [] },
         useNormalEventsAsCompatibleEvents: false,
         customData: {},
      },
   };

   static create(...data: DeepPartial<IWrapBeatmapAttribute>[]): Beatmap[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapBeatmapAttribute> = {}) {
      super();
      this.data = new Difficulty(data.data ?? Beatmap.defaultValue.data);
      this.lightshow = new Lightshow(
         data.lightshow ?? Beatmap.defaultValue.lightshow,
      );
   }
   static fromJSON(data: Record<string, any>, version: number): Beatmap {
      return new this({
         data: Difficulty.schema[version]?.deserialize(data.data),
         lightshow: Lightshow.schema[version]?.deserialize(data.lightshow),
      });
   }
   toSchema(version?: number): {
      data: { [key: string]: any };
      lightshow: { [key: string]: any };
   } {
      return {
         data: Difficulty.schema[version || 0]?.serialize(this.data) || {},
         lightshow: Lightshow.schema[version || 0]?.serialize(this.lightshow) || {},
      };
   }
   toJSON(): IWrapBeatmapAttribute {
      return {
         data: this.data.toJSON(),
         lightshow: this.lightshow.toJSON(),
      };
   }
   isValid(): boolean {
      return this.data.isValid() && this.lightshow.isValid();
   }

   data: IWrapDifficulty;
   lightshow: IWrapLightshow;

   get bpmEvents(): IWrapBPMEvent[] {
      return this.data.bpmEvents;
   }
   set bpmEvents(value: this['bpmEvents']) {
      this.data.bpmEvents = value;
   }
   get rotationEvents(): IWrapRotationEvent[] {
      return this.data.rotationEvents;
   }
   set rotationEvents(value: this['rotationEvents']) {
      this.data.rotationEvents = value;
   }
   get colorNotes(): IWrapColorNote[] {
      return this.data.colorNotes;
   }
   set colorNotes(value: this['colorNotes']) {
      this.data.colorNotes = value;
   }
   get bombNotes(): IWrapBombNote[] {
      return this.data.bombNotes;
   }
   set bombNotes(value: this['bombNotes']) {
      this.data.bombNotes = value;
   }
   get obstacles(): IWrapObstacle[] {
      return this.data.obstacles;
   }
   set obstacles(value: this['obstacles']) {
      this.data.obstacles = value;
   }
   get arcs(): IWrapArc[] {
      return this.data.arcs;
   }
   set arcs(value: this['arcs']) {
      this.data.arcs = value;
   }
   get chains(): IWrapChain[] {
      return this.data.chains;
   }
   set chains(value: this['chains']) {
      this.data.chains = value;
   }
   get waypoints(): IWrapWaypoint[] {
      return this.lightshow.waypoints;
   }
   set waypoints(value: this['waypoints']) {
      this.lightshow.waypoints = value;
   }
   get basicEvents(): IWrapEvent[] {
      return this.lightshow.basicEvents;
   }
   set basicEvents(value: this['basicEvents']) {
      this.lightshow.basicEvents = value;
   }
   get colorBoostEvents(): IWrapColorBoostEvent[] {
      return this.lightshow.colorBoostEvents;
   }
   set colorBoostEvents(value: this['colorBoostEvents']) {
      this.lightshow.colorBoostEvents = value;
   }
   get lightColorEventBoxGroups(): IWrapLightColorEventBoxGroup[] {
      return this.lightshow.lightColorEventBoxGroups;
   }
   set lightColorEventBoxGroups(value: this['lightColorEventBoxGroups']) {
      this.lightshow.lightColorEventBoxGroups = value;
   }
   get lightRotationEventBoxGroups(): IWrapLightRotationEventBoxGroup[] {
      return this.lightshow.lightRotationEventBoxGroups;
   }
   set lightRotationEventBoxGroups(value: this['lightRotationEventBoxGroups']) {
      this.lightshow.lightRotationEventBoxGroups = value;
   }
   get lightTranslationEventBoxGroups(): IWrapLightTranslationEventBoxGroup[] {
      return this.lightshow.lightTranslationEventBoxGroups;
   }
   set lightTranslationEventBoxGroups(
      value: this['lightTranslationEventBoxGroups'],
   ) {
      this.lightshow.lightTranslationEventBoxGroups = value;
   }
   get fxEventBoxGroups(): IWrapFxEventBoxGroup[] {
      return this.lightshow.fxEventBoxGroups;
   }
   set fxEventBoxGroups(value: this['fxEventBoxGroups']) {
      this.lightshow.fxEventBoxGroups = value;
   }
   get eventTypesWithKeywords(): IWrapEventTypesWithKeywords {
      return this.lightshow.eventTypesWithKeywords;
   }
   set eventTypesWithKeywords(value: this['eventTypesWithKeywords']) {
      this.lightshow.eventTypesWithKeywords = value;
   }
   get useNormalEventsAsCompatibleEvents(): boolean {
      return this.lightshow.useNormalEventsAsCompatibleEvents;
   }
   set useNormalEventsAsCompatibleEvents(
      value: this['useNormalEventsAsCompatibleEvents'],
   ) {
      this.lightshow.useNormalEventsAsCompatibleEvents = value;
   }

   sort(): this {
      this.data.sort();
      this.lightshow.sort();
      return this;
   }

   addBpmEvents(...data: DeepPartial<IWrapBPMEventAttribute>[]): this {
      this.data.addBpmEvents(...data);
      return this;
   }
   addRotationEvents(
      ...data: DeepPartial<IWrapRotationEventAttribute>[]
   ): this {
      this.data.addRotationEvents(...data);
      return this;
   }
   addColorNotes(...data: DeepPartial<IWrapColorNoteAttribute>[]): this {
      this.data.addColorNotes(...data);
      return this;
   }
   addBombNotes(...data: DeepPartial<IWrapBombNoteAttribute>[]): this {
      this.data.addBombNotes(...data);
      return this;
   }
   addObstacles(...data: DeepPartial<IWrapObstacleAttribute>[]): this {
      this.data.addObstacles(...data);
      return this;
   }
   addArcs(...data: DeepPartial<IWrapArcAttribute>[]): this {
      this.data.addArcs(...data);
      return this;
   }
   addChains(...data: DeepPartial<IWrapChainAttribute>[]): this {
      this.data.addChains(...data);
      return this;
   }
   addWaypoints(...data: DeepPartial<IWrapWaypointAttribute>[]): this {
      this.lightshow.addWaypoints(...data);
      return this;
   }
   addBasicEvents(...data: DeepPartial<IWrapEventAttribute>[]): this {
      this.lightshow.addBasicEvents(...data);
      return this;
   }
   addColorBoostEvents(
      ...data: DeepPartial<IWrapColorBoostEventAttribute>[]
   ): this {
      this.lightshow.addColorBoostEvents(...data);
      return this;
   }
   addLightColorEventBoxGroups(
      ...data: DeepPartial<IWrapLightColorEventBoxGroupAttribute>[]
   ): this {
      this.lightshow.addLightColorEventBoxGroups(...data);
      return this;
   }
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<IWrapLightRotationEventBoxGroupAttribute>[]
   ): this {
      this.lightshow.addLightRotationEventBoxGroups(...data);
      return this;
   }
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<IWrapLightTranslationEventBoxGroupAttribute>[]
   ): this {
      this.lightshow.addLightTranslationEventBoxGroups(...data);
      return this;
   }
   addFxEventBoxGroups(
      ...data: DeepPartial<IWrapFxEventBoxGroupAttribute>[]
   ): this {
      this.lightshow.addFxEventBoxGroups(...data);
      return this;
   }
}
