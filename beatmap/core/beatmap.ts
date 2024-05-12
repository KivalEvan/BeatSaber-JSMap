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
import type { DeepPartialIgnore, LooseAutocomplete } from '../../types/utils.ts';
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
import type { GenericFilename } from '../../types/beatmap/shared/filename.ts';

export class Beatmap extends BaseItem implements IWrapBeatmap {
   static defaultValue: IWrapBeatmapAttribute = {
      filename: 'Unnamed.beatmap.dat',
      lightshowFilename: 'Unnamed.lightshow.dat',
      customData: {},

      data: {
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

   static create(...data: DeepPartialIgnore<IWrapBeatmapAttribute, 'customData'>[]): Beatmap[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapBeatmapAttribute, 'customData'> = {}) {
      super();
      this.filename = data.filename ?? Beatmap.defaultValue.filename;
      this.lightshowFilename = data.lightshowFilename ?? Beatmap.defaultValue.lightshowFilename;
      this.data = new Difficulty(data.data ?? Beatmap.defaultValue.data);
      this.lightshow = new Lightshow(
         data.lightshow ?? Beatmap.defaultValue.lightshow,
      );
   }

   isValid(): boolean {
      return this.data.isValid() && this.lightshow.isValid();
   }

   data: IWrapDifficulty;
   lightshow: IWrapLightshow;

   filename: LooseAutocomplete<GenericFilename>;
   lightshowFilename: LooseAutocomplete<GenericFilename>;

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

   setLightshowFilename(filename: LooseAutocomplete<GenericFilename>): this {
      this.lightshowFilename = filename;
      return this;
   }
   setFilename(filename: LooseAutocomplete<GenericFilename>): this {
      this.filename = filename;
      return this;
   }

   sort(fn?: ((object: this) => void)): this {
      this.data.sort();
      this.lightshow.sort();
      return super.sort(fn);
   }

   addBpmEvents(...data: DeepPartialIgnore<IWrapBPMEventAttribute, 'customData'>[]): this {
      this.data.addBpmEvents(...data);
      return this;
   }
   addRotationEvents(
      ...data: DeepPartialIgnore<IWrapRotationEventAttribute, 'customData'>[]
   ): this {
      this.data.addRotationEvents(...data);
      return this;
   }
   addColorNotes(...data: DeepPartialIgnore<IWrapColorNoteAttribute, 'customData'>[]): this {
      this.data.addColorNotes(...data);
      return this;
   }
   addBombNotes(...data: DeepPartialIgnore<IWrapBombNoteAttribute, 'customData'>[]): this {
      this.data.addBombNotes(...data);
      return this;
   }
   addObstacles(...data: DeepPartialIgnore<IWrapObstacleAttribute, 'customData'>[]): this {
      this.data.addObstacles(...data);
      return this;
   }
   addArcs(...data: DeepPartialIgnore<IWrapArcAttribute, 'customData'>[]): this {
      this.data.addArcs(...data);
      return this;
   }
   addChains(...data: DeepPartialIgnore<IWrapChainAttribute, 'customData'>[]): this {
      this.data.addChains(...data);
      return this;
   }
   addWaypoints(...data: DeepPartialIgnore<IWrapWaypointAttribute, 'customData'>[]): this {
      this.lightshow.addWaypoints(...data);
      return this;
   }
   addBasicEvents(...data: DeepPartialIgnore<IWrapEventAttribute, 'customData'>[]): this {
      this.lightshow.addBasicEvents(...data);
      return this;
   }
   addColorBoostEvents(
      ...data: DeepPartialIgnore<IWrapColorBoostEventAttribute, 'customData'>[]
   ): this {
      this.lightshow.addColorBoostEvents(...data);
      return this;
   }
   addLightColorEventBoxGroups(
      ...data: DeepPartialIgnore<IWrapLightColorEventBoxGroupAttribute, 'customData'>[]
   ): this {
      this.lightshow.addLightColorEventBoxGroups(...data);
      return this;
   }
   addLightRotationEventBoxGroups(
      ...data: DeepPartialIgnore<IWrapLightRotationEventBoxGroupAttribute, 'customData'>[]
   ): this {
      this.lightshow.addLightRotationEventBoxGroups(...data);
      return this;
   }
   addLightTranslationEventBoxGroups(
      ...data: DeepPartialIgnore<IWrapLightTranslationEventBoxGroupAttribute, 'customData'>[]
   ): this {
      this.lightshow.addLightTranslationEventBoxGroups(...data);
      return this;
   }
   addFxEventBoxGroups(
      ...data: DeepPartialIgnore<IWrapFxEventBoxGroupAttribute, 'customData'>[]
   ): this {
      this.lightshow.addFxEventBoxGroups(...data);
      return this;
   }
}
