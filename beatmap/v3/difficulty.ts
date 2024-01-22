import { IDifficulty } from '../../types/beatmap/v3/difficulty.ts';
import { BasicEvent } from './basicEvent.ts';
import { BasicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import { BombNote } from './bombNote.ts';
import { BPMEvent } from './bpmEvent.ts';
import { Chain } from './chain.ts';
import { ColorBoostEvent } from './colorBoostEvent.ts';
import { ColorNote } from './colorNote.ts';
import { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { LightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { Obstacle } from './obstacle.ts';
import { RotationEvent } from './rotationEvent.ts';
import { Arc } from './arc.ts';
import { Waypoint } from './waypoint.ts';
import { DeepPartial } from '../../types/utils.ts';
import { IBPMEvent } from '../../types/beatmap/v3/bpmEvent.ts';
import { IRotationEvent } from '../../types/beatmap/v3/rotationEvent.ts';
import { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import { IObstacle } from '../../types/beatmap/v3/obstacle.ts';
import { IArc } from '../../types/beatmap/v3/arc.ts';
import { IChain } from '../../types/beatmap/v3/chain.ts';
import { IWaypoint } from '../../types/beatmap/v3/waypoint.ts';
import { IBasicEvent } from '../../types/beatmap/v3/basicEvent.ts';
import { IColorBoostEvent } from '../../types/beatmap/v3/colorBoostEvent.ts';
import { ILightRotationEventBoxGroup } from '../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import { ILightColorEventBoxGroup } from '../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import { ILightTranslationEventBoxGroup } from '../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapDifficulty } from '../wrapper/difficulty.ts';
import { IWrapBPMEventAttribute } from '../../types/beatmap/wrapper/bpmEvent.ts';
import { IWrapLightTranslationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import { IWrapChainAttribute } from '../../types/beatmap/wrapper/chain.ts';
import { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import { IWrapLightColorEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { IWrapLightRotationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';
import { IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import { IWrapWaypointAttribute } from '../../types/beatmap/wrapper/waypoint.ts';
import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import { ILightColorEvent } from '../../types/beatmap/v3/lightColorEvent.ts';
import { ILightRotationEvent } from '../../types/beatmap/v3/lightRotationEvent.ts';
import { ILightTranslationEvent } from '../../types/beatmap/v3/lightTranslationEvent.ts';
import { IWrapFxEventBoxGroupAttribute } from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import { IFxEventBox } from '../../types/beatmap/v3/fxEventBox.ts';
import { IFxEventBoxGroup } from '../../types/beatmap/v3/fxEventBoxGroup.ts';
import { FxEventBoxGroup } from './fxEventBoxGroup.ts';

/** Difficulty beatmap v3 class object. */
export class Difficulty extends WrapDifficulty<IDifficulty> {
   readonly version = '3.3.0';
   bpmEvents: BPMEvent[];
   rotationEvents: RotationEvent[];
   colorNotes: ColorNote[];
   bombNotes: BombNote[];
   obstacles: Obstacle[];
   arcs: Arc[];
   chains: Chain[];
   waypoints: Waypoint[];
   basicEvents: BasicEvent[];
   colorBoostEvents: ColorBoostEvent[];
   lightColorEventBoxGroups: LightColorEventBoxGroup[];
   lightRotationEventBoxGroups: LightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: LightTranslationEventBoxGroup[];
   fxEventBoxGroups: FxEventBoxGroup[];
   eventTypesWithKeywords: BasicEventTypesWithKeywords;
   useNormalEventsAsCompatibleEvents;

   constructor(data: Partial<IDifficulty> = {}) {
      super();

      this.bpmEvents = (data.bpmEvents ?? []).map((obj) => new BPMEvent(obj));
      this.rotationEvents = (data.rotationEvents ?? []).map(
         (obj) => new RotationEvent(obj),
      );
      this.colorNotes = (data.colorNotes ?? []).map(
         (obj) => new ColorNote(obj),
      );
      this.bombNotes = (data.bombNotes ?? []).map((obj) => new BombNote(obj));
      this.obstacles = (data.obstacles ?? []).map((obj) => new Obstacle(obj));
      this.arcs = (data.sliders ?? []).map((obj) => new Arc(obj));
      this.chains = (data.burstSliders ?? []).map((obj) => new Chain(obj));
      this.waypoints = (data.waypoints ?? []).map((obj) => new Waypoint(obj));
      this.basicEvents = (data.basicBeatmapEvents ?? []).map(
         (obj) => new BasicEvent(obj),
      );
      this.colorBoostEvents = (data.colorBoostBeatmapEvents ?? []).map(
         (obj) => new ColorBoostEvent(obj),
      );
      this.lightColorEventBoxGroups = (data.lightColorEventBoxGroups ?? []).map(
         (obj) => new LightColorEventBoxGroup(obj),
      );
      this.lightRotationEventBoxGroups = (
         data.lightRotationEventBoxGroups ?? []
      ).map((obj) => new LightRotationEventBoxGroup(obj));
      this.lightTranslationEventBoxGroups = (
         data.lightTranslationEventBoxGroups ?? []
      ).map((obj) => new LightTranslationEventBoxGroup(obj));
      this.fxEventBoxGroups = (data.vfxEventBoxGroups ?? []).map(
         (obj) => new FxEventBoxGroup(obj, data._fxEventsCollection?._fl),
      );
      this.eventTypesWithKeywords = new BasicEventTypesWithKeywords(
         data.basicEventTypesWithKeywords ?? {
            d: [],
         },
      );
      this.useNormalEventsAsCompatibleEvents = data.useNormalEventsAsCompatibleEvents ?? false;
      this.customData = deepCopy(data.customData ?? {});
   }

   static create(data: Partial<IDifficulty> = {}): Difficulty {
      return new this(data);
   }

   toJSON(): Required<IDifficulty> {
      const json: Required<IDifficulty> = {
         version: this.version,
         bpmEvents: this.bpmEvents.map((obj) => obj.toJSON()),
         rotationEvents: this.rotationEvents.map((obj) => obj.toJSON()),
         colorNotes: this.colorNotes.map((obj) => obj.toJSON()),
         bombNotes: this.bombNotes.map((obj) => obj.toJSON()),
         obstacles: this.obstacles.map((obj) => obj.toJSON()),
         sliders: this.arcs.map((obj) => obj.toJSON()),
         burstSliders: this.chains.map((obj) => obj.toJSON()),
         waypoints: this.waypoints.map((obj) => obj.toJSON()),
         basicBeatmapEvents: this.basicEvents.map((obj) => obj.toJSON()),
         colorBoostBeatmapEvents: this.colorBoostEvents.map((obj) => obj.toJSON()),
         lightColorEventBoxGroups: this.lightColorEventBoxGroups.map((obj) => obj.toJSON()),
         lightRotationEventBoxGroups: this.lightRotationEventBoxGroups.map(
            (obj) => obj.toJSON(),
         ),
         lightTranslationEventBoxGroups: this.lightTranslationEventBoxGroups.map((obj) =>
            obj.toJSON()
         ),
         vfxEventBoxGroups: [],
         basicEventTypesWithKeywords: this.eventTypesWithKeywords.toJSON(),
         _fxEventsCollection: {
            _fl: [],
            _il: [],
         },
         useNormalEventsAsCompatibleEvents: this.useNormalEventsAsCompatibleEvents,
         customData: deepCopy(this.customData),
      };
      for (const obj of this.fxEventBoxGroups.map((obj) => obj.toJSON())) {
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
   }

   get customData(): NonNullable<IDifficulty['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IDifficulty['customData']>) {
      this._customData = value;
   }

   reparse(keepRef?: boolean): this {
      this.colorNotes = this.colorNotes.map((obj) => this.createOrKeep(ColorNote, obj, keepRef));
      this.bombNotes = this.bombNotes.map((obj) => this.createOrKeep(BombNote, obj, keepRef));
      this.arcs = this.arcs.map((obj) => this.createOrKeep(Arc, obj, keepRef));
      this.chains = this.chains.map((obj) => this.createOrKeep(Chain, obj, keepRef));
      this.obstacles = this.obstacles.map((obj) => this.createOrKeep(Obstacle, obj, keepRef));
      this.basicEvents = this.basicEvents.map((obj) => this.createOrKeep(BasicEvent, obj, keepRef));
      this.colorBoostEvents = this.colorBoostEvents.map((obj) =>
         this.createOrKeep(ColorBoostEvent, obj, keepRef)
      );
      this.rotationEvents = this.rotationEvents.map((obj) =>
         this.createOrKeep(RotationEvent, obj, keepRef)
      );
      this.bpmEvents = this.bpmEvents.map((obj) => this.createOrKeep(BPMEvent, obj, keepRef));
      this.waypoints = this.waypoints.map((obj) => this.createOrKeep(Waypoint, obj, keepRef));
      this.eventTypesWithKeywords = new BasicEventTypesWithKeywords(
         this.eventTypesWithKeywords,
      );

      return this;
   }

   addBpmEvents(...data: Partial<IWrapBPMEventAttribute<IBPMEvent>>[]): this;
   addBpmEvents(...data: Partial<IBPMEvent>[]): this;
   addBpmEvents(
      ...data: (
         & Partial<IBPMEvent>
         & Partial<IWrapBPMEventAttribute<IBPMEvent>>
      )[]
   ): this;
   addBpmEvents(
      ...data: (
         & Partial<IBPMEvent>
         & Partial<IWrapBPMEventAttribute<IBPMEvent>>
      )[]
   ): this {
      for (const obj of data) this.bpmEvents.push(new BPMEvent(obj));
      return this;
   }

   addRotationEvents(
      ...data: Partial<IWrapRotationEventAttribute<IRotationEvent>>[]
   ): this;
   addRotationEvents(...data: Partial<IRotationEvent>[]): this;
   addRotationEvents(
      ...data: (
         & Partial<IRotationEvent>
         & Partial<IWrapRotationEventAttribute<IRotationEvent>>
      )[]
   ): this;
   addRotationEvents(
      ...data: (
         & Partial<IRotationEvent>
         & Partial<IWrapRotationEventAttribute<IRotationEvent>>
      )[]
   ): this {
      for (const obj of data) this.rotationEvents.push(new RotationEvent(obj));
      return this;
   }

   addColorNotes(...data: Partial<IWrapColorNoteAttribute<IColorNote>>[]): this;
   addColorNotes(...data: Partial<IColorNote>[]): this;
   addColorNotes(
      ...data: (
         & Partial<IColorNote>
         & Partial<IWrapColorNoteAttribute<IColorNote>>
      )[]
   ): this;
   addColorNotes(
      ...data: (
         & Partial<IColorNote>
         & Partial<IWrapColorNoteAttribute<IColorNote>>
      )[]
   ): this {
      for (const obj of data) this.colorNotes.push(new ColorNote(obj));
      return this;
   }

   addBombNotes(...data: Partial<IWrapBombNoteAttribute<IBombNote>>[]): this;
   addBombNotes(...data: Partial<IBombNote>[]): this;
   addBombNotes(
      ...data: (
         & Partial<IBombNote>[]
         & Partial<IWrapBombNoteAttribute<IBombNote>>
      )[]
   ): this;
   addBombNotes(
      ...data: (
         & Partial<IBombNote>[]
         & Partial<IWrapBombNoteAttribute<IBombNote>>
      )[]
   ): this {
      for (const obj of data) this.bombNotes.push(new BombNote(obj));
      return this;
   }

   addObstacles(...data: Partial<IWrapObstacleAttribute<IObstacle>>[]): this;
   addObstacles(...data: Partial<IObstacle>[]): this;
   addObstacles(
      ...data: (
         & Partial<IObstacle>
         & Partial<IWrapObstacleAttribute<IObstacle>>
      )[]
   ): this;
   addObstacles(
      ...data: (
         & Partial<IObstacle>
         & Partial<IWrapObstacleAttribute<IObstacle>>
      )[]
   ): this {
      for (const obj of data) this.obstacles.push(new Obstacle(obj));
      return this;
   }

   addArcs(...data: Partial<IWrapArcAttribute<IArc>>[]): this;
   addArcs(...data: Partial<IArc>[]): this;
   addArcs(...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]): this;
   addArcs(
      ...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]
   ): this {
      for (const obj of data) this.arcs.push(new Arc(obj));
      return this;
   }

   addChains(...data: Partial<IWrapChainAttribute<IChain>>[]): this;
   addChains(...data: Partial<IChain>[]): this;
   addChains(
      ...data: (Partial<IChain> & Partial<IWrapChainAttribute<IChain>>)[]
   ): this;
   addChains(
      ...data: (Partial<IChain> & Partial<IWrapChainAttribute<IChain>>)[]
   ): this {
      for (const obj of data) this.chains.push(new Chain(obj));
      return this;
   }

   addWaypoints(...data: Partial<IWrapWaypointAttribute<IWaypoint>>[]): this;
   addWaypoints(...data: Partial<IWaypoint>[]): this;
   addWaypoints(
      ...data: (
         & Partial<IWaypoint>
         & Partial<IWrapWaypointAttribute<IWaypoint>>
      )[]
   ): this;
   addWaypoints(
      ...data: (
         & Partial<IWaypoint>
         & Partial<IWrapWaypointAttribute<IWaypoint>>
      )[]
   ): this {
      for (const obj of data) this.waypoints.push(new Waypoint(obj));
      return this;
   }

   addBasicEvents(...data: Partial<IWrapEventAttribute<IBasicEvent>>[]): this;
   addBasicEvents(...data: Partial<IBasicEvent>[]): this;
   addBasicEvents(
      ...data: (
         & Partial<IBasicEvent>[]
         & Partial<IWrapEventAttribute<IBasicEvent>>
      )[]
   ): this;
   addBasicEvents(
      ...data: (
         & Partial<IBasicEvent>[]
         & Partial<IWrapEventAttribute<IBasicEvent>>
      )[]
   ): this {
      for (const obj of data) this.basicEvents.push(new BasicEvent(obj));
      return this;
   }

   addColorBoostEvents(
      ...data: Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>[]
   ): this;
   addColorBoostEvents(...data: Partial<IColorBoostEvent>[]): this;
   addColorBoostEvents(
      ...data: (
         & Partial<IColorBoostEvent>
         & Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>
      )[]
   ): this;
   addColorBoostEvents(
      ...data: (
         & Partial<IColorBoostEvent>
         & Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>
      )[]
   ): this {
      for (const obj of data) {
         this.colorBoostEvents.push(new ColorBoostEvent(obj));
      }
      return this;
   }

   addLightColorEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightColorEventBoxGroupAttribute<
            ILightColorEventBoxGroup,
            ILightColorEventBox,
            ILightColorEvent,
            IIndexFilter
         >
      >[]
   ): this;
   addLightColorEventBoxGroups(
      ...data: DeepPartial<ILightColorEventBoxGroup>[]
   ): this;
   addLightColorEventBoxGroups(
      ...data: (
         & DeepPartial<ILightColorEventBoxGroup>
         & DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               ILightColorEventBoxGroup,
               ILightColorEventBox,
               ILightColorEvent,
               IIndexFilter
            >
         >
      )[]
   ): this;
   addLightColorEventBoxGroups(
      ...data: (
         & DeepPartial<ILightColorEventBoxGroup>
         & DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               ILightColorEventBoxGroup,
               ILightColorEventBox,
               ILightColorEvent,
               IIndexFilter
            >
         >
      )[]
   ): this {
      for (const obj of data) {
         this.lightColorEventBoxGroups.push(new LightColorEventBoxGroup(obj));
      }
      return this;
   }

   addLightRotationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxGroupAttribute<
            ILightRotationEventBoxGroup,
            ILightRotationEventBox,
            ILightRotationEvent,
            IIndexFilter
         >
      >[]
   ): this;
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<ILightRotationEventBoxGroup>[]
   ): this;
   addLightRotationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightRotationEventBoxGroup>
         & DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               ILightRotationEventBoxGroup,
               ILightRotationEventBox,
               ILightRotationEvent,
               IIndexFilter
            >
         >
      )[]
   ): this;
   addLightRotationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightRotationEventBoxGroup>
         & DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               ILightRotationEventBoxGroup,
               ILightRotationEventBox,
               ILightRotationEvent,
               IIndexFilter
            >
         >
      )[]
   ): this {
      for (const obj of data) {
         this.lightRotationEventBoxGroups.push(
            new LightRotationEventBoxGroup(obj),
         );
      }
      return this;
   }

   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            ILightTranslationEventBoxGroup,
            ILightTranslationEventBox,
            ILightTranslationEvent,
            IIndexFilter
         >
      >[]
   ): this;
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<ILightTranslationEventBoxGroup>[]
   ): this;
   addLightTranslationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightTranslationEventBoxGroup>
         & DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationEvent,
               IIndexFilter
            >
         >
      )[]
   ): this;
   addLightTranslationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightTranslationEventBoxGroup>
         & DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationEvent,
               IIndexFilter
            >
         >
      )[]
   ): this {
      for (const obj of data) {
         this.lightTranslationEventBoxGroups.push(
            new LightTranslationEventBoxGroup(obj),
         );
      }
      return this;
   }

   addFxEventBoxGroups(
      ...data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IFxEventBoxGroup,
            IFxEventBox,
            IIndexFilter
         >
      >[]
   ): this;
   addFxEventBoxGroups(...data: DeepPartial<IFxEventBoxGroup>[]): this;
   addFxEventBoxGroups(
      ...data: (
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IFxEventBoxGroup,
               IFxEventBox,
               IIndexFilter
            >
         >
      )[]
   ): this;
   addFxEventBoxGroups(
      ...data: (
         & DeepPartial<IFxEventBoxGroup>
         & DeepPartial<
            IWrapFxEventBoxGroupAttribute<
               IFxEventBoxGroup,
               IFxEventBox,
               IIndexFilter
            >
         >
      )[]
   ): this {
      for (const obj of data) {
         this.fxEventBoxGroups.push(new FxEventBoxGroup(obj));
      }
      return this;
   }

   isValid(): boolean {
      return (
         this.colorNotes.every((obj) => this.checkClass(ColorNote, obj)) ||
         this.bombNotes.every((obj) => this.checkClass(BombNote, obj)) ||
         this.arcs.every((obj) => this.checkClass(Arc, obj)) ||
         this.chains.every((obj) => this.checkClass(Chain, obj)) ||
         this.obstacles.every((obj) => this.checkClass(Obstacle, obj)) ||
         this.basicEvents.every((obj) => this.checkClass(BasicEvent, obj)) ||
         this.colorBoostEvents.every((obj) => this.checkClass(ColorBoostEvent, obj)) ||
         this.rotationEvents.every((obj) => this.checkClass(RotationEvent, obj)) ||
         this.bpmEvents.every((obj) => this.checkClass(BPMEvent, obj)) ||
         this.waypoints.every((obj) => this.checkClass(Waypoint, obj)) ||
         this.lightColorEventBoxGroups.every((obj) =>
            this.checkClass(LightColorEventBoxGroup, obj)
         ) ||
         this.lightRotationEventBoxGroups.every((obj) =>
            this.checkClass(LightRotationEventBoxGroup, obj)
         ) ||
         this.lightTranslationEventBoxGroups.every((obj) =>
            this.checkClass(LightTranslationEventBoxGroup, obj)
         ) ||
         this.fxEventBoxGroups.every((obj) => this.checkClass(FxEventBoxGroup, obj)) ||
         this.eventTypesWithKeywords instanceof BasicEventTypesWithKeywords
      );
   }
}
