import type {
   GenericBeatmapFilename,
   GenericLightshowFilename,
} from '../../types/beatmap/shared/filename.ts';
import type { IWrapArc } from '../../types/beatmap/wrapper/arc.ts';
import type { IWrapBasicEvent } from '../../types/beatmap/wrapper/basicEvent.ts';
import type { IWrapBeatmap } from '../../types/beatmap/wrapper/beatmap.ts';
import type { IWrapBombNote } from '../../types/beatmap/wrapper/bombNote.ts';
import type { IWrapBPMEvent } from '../../types/beatmap/wrapper/bpmEvent.ts';
import type { IWrapChain } from '../../types/beatmap/wrapper/chain.ts';
import type { IWrapColorBoostEvent } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type { IWrapColorNote } from '../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapFxEventBoxGroup } from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import type { IWrapLightColorEventBoxGroup } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type { IWrapLightRotationEventBoxGroup } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import type { IWrapLightTranslationEventBoxGroup } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type { IWrapNJSEvent } from '../../types/beatmap/wrapper/njsEvent.ts';
import type { IWrapObstacle } from '../../types/beatmap/wrapper/obstacle.ts';
import type { IWrapRotationEvent } from '../../types/beatmap/wrapper/rotationEvent.ts';
import type { IWrapWaypoint } from '../../types/beatmap/wrapper/waypoint.ts';
import type { DeepPartial, LooseAutocomplete } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseItem } from './abstract/baseItem.ts';
import type { Arc } from './arc.ts';
import type { BasicEvent } from './basicEvent.ts';
import type { BombNote } from './bombNote.ts';
import type { BPMEvent } from './bpmEvent.ts';
import type { Chain } from './chain.ts';
import type { ColorBoostEvent } from './colorBoostEvent.ts';
import type { ColorNote } from './colorNote.ts';
import { createDifficulty, Difficulty } from './difficulty.ts';
import type { FxEventBoxGroup } from './fxEventBoxGroup.ts';
import type { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import type { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { createLightshow, Lightshow } from './lightshow.ts';
import type { LightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import type { NJSEvent } from './njsEvent.ts';
import type { Obstacle } from './obstacle.ts';
import type { RotationEvent } from './rotationEvent.ts';
import type { Waypoint } from './waypoint.ts';

export function createBeatmap(data: DeepPartial<IWrapBeatmap> = {}): IWrapBeatmap {
   return {
      version: data.version ?? -1,
      filename: data.filename ?? 'Unnamed.beatmap.dat',
      lightshowFilename: data.lightshowFilename ?? 'Unnamed.lightshow.dat',
      difficulty: createDifficulty(data.difficulty),
      lightshow: createLightshow(data.lightshow),
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap container.
 *
 * Contains `Difficulty` and `Lightshow`.
 * This object is writable into 2 files.
 * Both may be combined given schema.
 *
 * **WARN:** Do not use `customData` for anything related to either `difficulty` or `lightshow`,
 * access them directly from `difficulty` and `lightshow` if you wish to modify them.
 * This object exists solely for arbitrary data.
 */
export class Beatmap extends BaseItem implements IWrapBeatmap {
   static defaultValue: IWrapBeatmap = createBeatmap();

   static createOne(data: DeepPartial<IWrapBeatmap> = {}): Beatmap {
      return new this(data);
   }
   static create(
      ...data: DeepPartial<IWrapBeatmap>[]
   ): Beatmap[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapBeatmap> = {}) {
      super();
      this.version = data.version ?? Beatmap.defaultValue.version;
      this.filename = data.filename ?? Beatmap.defaultValue.filename;
      this.lightshowFilename = data.lightshowFilename ?? Beatmap.defaultValue.lightshowFilename;
      this.difficulty = new Difficulty(
         data.difficulty ?? Beatmap.defaultValue.difficulty,
      );
      this.lightshow = new Lightshow(
         data.lightshow ?? Beatmap.defaultValue.lightshow,
      );
   }

   override isValid(
      fn?: (object: this) => boolean,
      _override?: boolean,
   ): boolean {
      return super.isValid(fn);
   }

   version: number;
   difficulty: Difficulty;
   lightshow: Lightshow;

   filename: LooseAutocomplete<GenericBeatmapFilename>;
   lightshowFilename: LooseAutocomplete<GenericLightshowFilename>;

   get bpmEvents(): BPMEvent[] {
      return this.difficulty.bpmEvents;
   }
   set bpmEvents(value: this['bpmEvents']) {
      this.difficulty.bpmEvents = value;
   }
   get rotationEvents(): RotationEvent[] {
      return this.difficulty.rotationEvents;
   }
   set rotationEvents(value: this['rotationEvents']) {
      this.difficulty.rotationEvents = value;
   }
   get colorNotes(): ColorNote[] {
      return this.difficulty.colorNotes;
   }
   set colorNotes(value: this['colorNotes']) {
      this.difficulty.colorNotes = value;
   }
   get bombNotes(): BombNote[] {
      return this.difficulty.bombNotes;
   }
   set bombNotes(value: this['bombNotes']) {
      this.difficulty.bombNotes = value;
   }
   get obstacles(): Obstacle[] {
      return this.difficulty.obstacles;
   }
   set obstacles(value: this['obstacles']) {
      this.difficulty.obstacles = value;
   }
   get arcs(): Arc[] {
      return this.difficulty.arcs;
   }
   set arcs(value: this['arcs']) {
      this.difficulty.arcs = value;
   }
   get chains(): Chain[] {
      return this.difficulty.chains;
   }
   set chains(value: this['chains']) {
      this.difficulty.chains = value;
   }
   get njsEvents(): NJSEvent[] {
      return this.difficulty.njsEvents;
   }
   set njsEvents(value: this['njsEvents']) {
      this.difficulty.njsEvents = value;
   }
   get waypoints(): Waypoint[] {
      return this.lightshow.waypoints;
   }
   set waypoints(value: this['waypoints']) {
      this.lightshow.waypoints = value;
   }
   get basicEvents(): BasicEvent[] {
      return this.lightshow.basicEvents;
   }
   set basicEvents(value: this['basicEvents']) {
      this.lightshow.basicEvents = value;
   }
   get colorBoostEvents(): ColorBoostEvent[] {
      return this.lightshow.colorBoostEvents;
   }
   set colorBoostEvents(value: this['colorBoostEvents']) {
      this.lightshow.colorBoostEvents = value;
   }
   get lightColorEventBoxGroups(): LightColorEventBoxGroup[] {
      return this.lightshow.lightColorEventBoxGroups;
   }
   set lightColorEventBoxGroups(value: this['lightColorEventBoxGroups']) {
      this.lightshow.lightColorEventBoxGroups = value;
   }
   get lightRotationEventBoxGroups(): LightRotationEventBoxGroup[] {
      return this.lightshow.lightRotationEventBoxGroups;
   }
   set lightRotationEventBoxGroups(value: this['lightRotationEventBoxGroups']) {
      this.lightshow.lightRotationEventBoxGroups = value;
   }
   get lightTranslationEventBoxGroups(): LightTranslationEventBoxGroup[] {
      return this.lightshow.lightTranslationEventBoxGroups;
   }
   set lightTranslationEventBoxGroups(
      value: this['lightTranslationEventBoxGroups'],
   ) {
      this.lightshow.lightTranslationEventBoxGroups = value;
   }
   get fxEventBoxGroups(): FxEventBoxGroup[] {
      return this.lightshow.fxEventBoxGroups;
   }
   set fxEventBoxGroups(value: this['fxEventBoxGroups']) {
      this.lightshow.fxEventBoxGroups = value;
   }
   get basicEventTypesWithKeywords(): Lightshow['basicEventTypesWithKeywords'] {
      return this.lightshow.basicEventTypesWithKeywords;
   }
   set basicEventTypesWithKeywords(value: this['basicEventTypesWithKeywords']) {
      this.lightshow.basicEventTypesWithKeywords = value;
   }
   get useNormalEventsAsCompatibleEvents(): boolean {
      return this.lightshow.useNormalEventsAsCompatibleEvents;
   }
   set useNormalEventsAsCompatibleEvents(
      value: this['useNormalEventsAsCompatibleEvents'],
   ) {
      this.lightshow.useNormalEventsAsCompatibleEvents = value;
   }

   setFilename(filename: LooseAutocomplete<GenericBeatmapFilename>): this {
      this.filename = filename;
      return this;
   }
   setLightshowFilename(
      filename: LooseAutocomplete<GenericLightshowFilename>,
   ): this {
      this.lightshowFilename = filename;
      return this;
   }
   setVersion(version: number): this {
      this.version = version;
      return this;
   }

   override sort(fn?: (object: this) => void): this {
      this.difficulty.sort();
      this.lightshow.sort();
      return super.sort(fn);
   }

   addBpmEvents(...data: DeepPartial<IWrapBPMEvent>[]): this {
      this.difficulty.addBpmEvents(...data);
      return this;
   }
   addRotationEvents(
      ...data: DeepPartial<IWrapRotationEvent>[]
   ): this {
      this.difficulty.addRotationEvents(...data);
      return this;
   }
   addColorNotes(...data: DeepPartial<IWrapColorNote>[]): this {
      this.difficulty.addColorNotes(...data);
      return this;
   }
   addBombNotes(...data: DeepPartial<IWrapBombNote>[]): this {
      this.difficulty.addBombNotes(...data);
      return this;
   }
   addObstacles(...data: DeepPartial<IWrapObstacle>[]): this {
      this.difficulty.addObstacles(...data);
      return this;
   }
   addArcs(...data: DeepPartial<IWrapArc>[]): this {
      this.difficulty.addArcs(...data);
      return this;
   }
   addChains(...data: DeepPartial<IWrapChain>[]): this {
      this.difficulty.addChains(...data);
      return this;
   }
   addNjsEvents(...data: DeepPartial<IWrapNJSEvent>[]): this {
      this.difficulty.addNjsEvents(...data);
      return this;
   }
   addWaypoints(...data: DeepPartial<IWrapWaypoint>[]): this {
      this.lightshow.addWaypoints(...data);
      return this;
   }
   addBasicEvents(
      ...data: DeepPartial<IWrapBasicEvent>[]
   ): this {
      this.lightshow.addBasicEvents(...data);
      return this;
   }
   addColorBoostEvents(
      ...data: DeepPartial<IWrapColorBoostEvent>[]
   ): this {
      this.lightshow.addColorBoostEvents(...data);
      return this;
   }
   addLightColorEventBoxGroups(
      ...data: DeepPartial<IWrapLightColorEventBoxGroup>[]
   ): this {
      this.lightshow.addLightColorEventBoxGroups(...data);
      return this;
   }
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<IWrapLightRotationEventBoxGroup>[]
   ): this {
      this.lightshow.addLightRotationEventBoxGroups(...data);
      return this;
   }
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<IWrapLightTranslationEventBoxGroup>[]
   ): this {
      this.lightshow.addLightTranslationEventBoxGroups(...data);
      return this;
   }
   addFxEventBoxGroups(
      ...data: DeepPartial<IWrapFxEventBoxGroup>[]
   ): this {
      this.lightshow.addFxEventBoxGroups(...data);
      return this;
   }
}
