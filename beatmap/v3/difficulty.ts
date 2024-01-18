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
import { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import { ILightRotationBase } from '../../types/beatmap/v3/lightRotationBase.ts';
import { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';
import { IWrapFxEventBoxGroupAttribute } from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import { IFxEventBox } from '../../types/beatmap/v3/fxEventBox.ts';
import { IFxEventBoxGroup } from '../../types/beatmap/v3/fxEventBoxGroup.ts';
import { FxEventBoxGroup } from './fxEventBoxGroup.ts';
import { FxEventsCollection } from './fxEventsCollection.ts';

/** Difficulty beatmap v3 class object. */
export class Difficulty extends WrapDifficulty<IDifficulty> {
   version: Required<IDifficulty>['version'];
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
   fxEventsCollection: FxEventsCollection;
   useNormalEventsAsCompatibleEvents;

   constructor(data: Partial<IDifficulty> = {}) {
      super();
      let temp;

      this.version = '3.3.0';

      temp = data.bpmEvents ?? [];
      this.bpmEvents = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.bpmEvents[i] = new BPMEvent(temp[i]);
      }

      temp = data.rotationEvents ?? [];
      this.rotationEvents = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.rotationEvents[i] = new RotationEvent(temp[i]);
      }

      temp = data.colorNotes ?? [];
      this.colorNotes = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.colorNotes[i] = new ColorNote(temp[i]);
      }

      temp = data.bombNotes ?? [];
      this.bombNotes = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.bombNotes[i] = new BombNote(temp[i]);
      }

      temp = data.obstacles ?? [];
      this.obstacles = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.obstacles[i] = new Obstacle(temp[i]);
      }

      temp = data.sliders ?? [];
      this.arcs = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) this.arcs[i] = new Arc(temp[i]);

      temp = data.burstSliders ?? [];
      this.chains = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) this.chains[i] = new Chain(temp[i]);

      temp = data.waypoints ?? [];
      this.waypoints = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.waypoints[i] = new Waypoint(temp[i]);
      }

      temp = data.basicBeatmapEvents ?? [];
      this.basicEvents = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.basicEvents[i] = new BasicEvent(temp[i]);
      }

      temp = data.colorBoostBeatmapEvents ?? [];
      this.colorBoostEvents = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.colorBoostEvents[i] = new ColorBoostEvent(temp[i]);
      }

      temp = data.lightColorEventBoxGroups ?? [];
      this.lightColorEventBoxGroups = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.lightColorEventBoxGroups[i] = new LightColorEventBoxGroup(
            temp[i],
         );
      }

      temp = data.lightRotationEventBoxGroups ?? [];
      this.lightRotationEventBoxGroups = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.lightRotationEventBoxGroups[i] = new LightRotationEventBoxGroup(
            temp[i],
         );
      }

      temp = data.lightTranslationEventBoxGroups ?? [];
      this.lightTranslationEventBoxGroups = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.lightTranslationEventBoxGroups[i] = new LightTranslationEventBoxGroup(temp[i]);
      }

      temp = data.vfxEventBoxGroups ?? [];
      this.fxEventBoxGroups = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.fxEventBoxGroups[i] = new FxEventBoxGroup(temp[i]);
      }

      this.eventTypesWithKeywords = new BasicEventTypesWithKeywords(
         data.basicEventTypesWithKeywords ?? {
            d: [],
         },
      );

      this.fxEventsCollection = new FxEventsCollection(
         data._fxEventsCollection ?? {
            _fl: [],
            _il: [],
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
         bpmEvents: new Array(this.bpmEvents.length),
         rotationEvents: new Array(this.rotationEvents.length),
         colorNotes: new Array(this.colorNotes.length),
         bombNotes: new Array(this.bombNotes.length),
         obstacles: new Array(this.obstacles.length),
         sliders: new Array(this.arcs.length),
         burstSliders: new Array(this.chains.length),
         waypoints: new Array(this.waypoints.length),
         basicBeatmapEvents: new Array(this.basicEvents.length),
         colorBoostBeatmapEvents: new Array(this.colorBoostEvents.length),
         lightColorEventBoxGroups: new Array(
            this.lightColorEventBoxGroups.length,
         ),
         lightRotationEventBoxGroups: new Array(
            this.lightRotationEventBoxGroups.length,
         ),
         lightTranslationEventBoxGroups: new Array(
            this.lightTranslationEventBoxGroups.length,
         ),
         vfxEventBoxGroups: new Array(this.fxEventBoxGroups.length),
         basicEventTypesWithKeywords: this.eventTypesWithKeywords.toJSON(),
         _fxEventsCollection: this.fxEventsCollection.toJSON(),
         useNormalEventsAsCompatibleEvents: this.useNormalEventsAsCompatibleEvents,
         customData: deepCopy(this.customData),
      };
      for (let i = 0; i < this.bpmEvents.length; i++) {
         json.bpmEvents[i] = this.bpmEvents[i].toJSON();
      }
      for (let i = 0; i < this.rotationEvents.length; i++) {
         json.rotationEvents[i] = this.rotationEvents[i].toJSON();
      }
      for (let i = 0; i < this.colorNotes.length; i++) {
         json.colorNotes[i] = this.colorNotes[i].toJSON();
      }
      for (let i = 0; i < this.bombNotes.length; i++) {
         json.bombNotes[i] = this.bombNotes[i].toJSON();
      }
      for (let i = 0; i < this.obstacles.length; i++) {
         json.obstacles[i] = this.obstacles[i].toJSON();
      }
      for (let i = 0; i < this.arcs.length; i++) {
         json.sliders[i] = this.arcs[i].toJSON();
      }
      for (let i = 0; i < this.chains.length; i++) {
         json.burstSliders[i] = this.chains[i].toJSON();
      }
      for (let i = 0; i < this.waypoints.length; i++) {
         json.waypoints[i] = this.waypoints[i].toJSON();
      }
      for (let i = 0; i < this.basicEvents.length; i++) {
         json.basicBeatmapEvents[i] = this.basicEvents[i].toJSON();
      }
      for (let i = 0; i < this.colorBoostEvents.length; i++) {
         json.colorBoostBeatmapEvents[i] = this.colorBoostEvents[i].toJSON();
      }
      for (let i = 0; i < this.lightColorEventBoxGroups.length; i++) {
         json.lightColorEventBoxGroups[i] = this.lightColorEventBoxGroups[i].toJSON();
      }
      for (let i = 0; i < this.lightRotationEventBoxGroups.length; i++) {
         json.lightRotationEventBoxGroups[i] = this.lightRotationEventBoxGroups[i].toJSON();
      }
      for (let i = 0; i < this.lightTranslationEventBoxGroups.length; i++) {
         json.lightTranslationEventBoxGroups[i] = this.lightTranslationEventBoxGroups[i].toJSON();
      }
      for (let i = 0; i < this.fxEventBoxGroups.length; i++) {
         json.vfxEventBoxGroups[i] = this.fxEventBoxGroups[i].toJSON();
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
      for (let i = 0; i < this.colorNotes.length; i++) {
         this.colorNotes[i] = this.createOrKeep(
            ColorNote,
            this.colorNotes[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.bombNotes.length; i++) {
         this.bombNotes[i] = this.createOrKeep(
            BombNote,
            this.bombNotes[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.arcs.length; i++) {
         this.arcs[i] = this.createOrKeep(Arc, this.arcs[i], keepRef);
      }
      for (let i = 0; i < this.chains.length; i++) {
         this.chains[i] = this.createOrKeep(Chain, this.chains[i], keepRef);
      }
      for (let i = 0; i < this.obstacles.length; i++) {
         this.obstacles[i] = this.createOrKeep(
            Obstacle,
            this.obstacles[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.waypoints.length; i++) {
         this.waypoints[i] = this.createOrKeep(
            Waypoint,
            this.waypoints[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.basicEvents.length; i++) {
         this.basicEvents[i] = this.createOrKeep(
            BasicEvent,
            this.basicEvents[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.colorBoostEvents.length; i++) {
         this.colorBoostEvents[i] = this.createOrKeep(
            ColorBoostEvent,
            this.colorBoostEvents[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.rotationEvents.length; i++) {
         this.rotationEvents[i] = this.createOrKeep(
            RotationEvent,
            this.rotationEvents[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.bpmEvents.length; i++) {
         this.bpmEvents[i] = this.createOrKeep(
            BPMEvent,
            this.bpmEvents[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.lightColorEventBoxGroups.length; i++) {
         this.lightColorEventBoxGroups[i] = this.createOrKeep(
            LightColorEventBoxGroup,
            this.lightColorEventBoxGroups[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.lightRotationEventBoxGroups.length; i++) {
         this.lightRotationEventBoxGroups[i] = this.createOrKeep(
            LightRotationEventBoxGroup,
            this.lightRotationEventBoxGroups[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.lightTranslationEventBoxGroups.length; i++) {
         this.lightTranslationEventBoxGroups[i] = this.createOrKeep(
            LightTranslationEventBoxGroup,
            this.lightTranslationEventBoxGroups[i],
            keepRef,
         );
      }
      for (let i = 0; i < this.fxEventBoxGroups.length; i++) {
         this.fxEventBoxGroups[i] = this.createOrKeep(
            FxEventBoxGroup,
            this.fxEventBoxGroups[i],
            keepRef,
         );
      }
      this.eventTypesWithKeywords = new BasicEventTypesWithKeywords(
         this.eventTypesWithKeywords,
      );
      this.fxEventsCollection = new FxEventsCollection(this.fxEventsCollection);

      return this;
   }

   addBpmEvents(...data: Partial<IWrapBPMEventAttribute<IBPMEvent>>[]): void;
   addBpmEvents(...data: Partial<IBPMEvent>[]): void;
   addBpmEvents(
      ...data: (
         & Partial<IBPMEvent>
         & Partial<IWrapBPMEventAttribute<IBPMEvent>>
      )[]
   ): void;
   addBpmEvents(
      ...data: (
         & Partial<IBPMEvent>
         & Partial<IWrapBPMEventAttribute<IBPMEvent>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.bpmEvents.push(new BPMEvent(data[i]));
      }
   }

   addRotationEvents(
      ...data: Partial<IWrapRotationEventAttribute<IRotationEvent>>[]
   ): void;
   addRotationEvents(...data: Partial<IRotationEvent>[]): void;
   addRotationEvents(
      ...data: (
         & Partial<IRotationEvent>
         & Partial<IWrapRotationEventAttribute<IRotationEvent>>
      )[]
   ): void;
   addRotationEvents(
      ...data: (
         & Partial<IRotationEvent>
         & Partial<IWrapRotationEventAttribute<IRotationEvent>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.rotationEvents.push(new RotationEvent(data[i]));
      }
   }

   addColorNotes(...data: Partial<IWrapColorNoteAttribute<IColorNote>>[]): void;
   addColorNotes(...data: Partial<IColorNote>[]): void;
   addColorNotes(
      ...data: (
         & Partial<IColorNote>
         & Partial<IWrapColorNoteAttribute<IColorNote>>
      )[]
   ): void;
   addColorNotes(
      ...data: (
         & Partial<IColorNote>
         & Partial<IWrapColorNoteAttribute<IColorNote>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.colorNotes.push(new ColorNote(data[i]));
      }
   }

   addBombNotes(...data: Partial<IWrapBombNoteAttribute<IBombNote>>[]): void;
   addBombNotes(...data: Partial<IBombNote>[]): void;
   addBombNotes(
      ...data: (
         & Partial<IBombNote>[]
         & Partial<IWrapBombNoteAttribute<IBombNote>>
      )[]
   ): void;
   addBombNotes(
      ...data: (
         & Partial<IBombNote>[]
         & Partial<IWrapBombNoteAttribute<IBombNote>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.bombNotes.push(new BombNote(data[i]));
      }
   }

   addObstacles(...data: Partial<IWrapObstacleAttribute<IObstacle>>[]): void;
   addObstacles(...data: Partial<IObstacle>[]): void;
   addObstacles(
      ...data: (
         & Partial<IObstacle>
         & Partial<IWrapObstacleAttribute<IObstacle>>
      )[]
   ): void;
   addObstacles(
      ...data: (
         & Partial<IObstacle>
         & Partial<IWrapObstacleAttribute<IObstacle>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.obstacles.push(new Obstacle(data[i]));
      }
   }

   addArcs(...data: Partial<IWrapArcAttribute<IArc>>[]): void;
   addArcs(...data: Partial<IArc>[]): void;
   addArcs(...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]): void;
   addArcs(
      ...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]
   ): void {
      for (let i = 0; i < data.length; i++) this.arcs.push(new Arc(data[i]));
   }

   addChains(...data: Partial<IWrapChainAttribute<IChain>>[]): void;
   addChains(...data: Partial<IChain>[]): void;
   addChains(
      ...data: (Partial<IChain> & Partial<IWrapChainAttribute<IChain>>)[]
   ): void;
   addChains(
      ...data: (Partial<IChain> & Partial<IWrapChainAttribute<IChain>>)[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.chains.push(new Chain(data[i]));
      }
   }

   addWaypoints(...data: Partial<IWrapWaypointAttribute<IWaypoint>>[]): void;
   addWaypoints(...data: Partial<IWaypoint>[]): void;
   addWaypoints(
      ...data: (
         & Partial<IWaypoint>
         & Partial<IWrapWaypointAttribute<IWaypoint>>
      )[]
   ): void;
   addWaypoints(
      ...data: (
         & Partial<IWaypoint>
         & Partial<IWrapWaypointAttribute<IWaypoint>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.waypoints.push(new Waypoint(data[i]));
      }
   }

   addBasicEvents(...data: Partial<IWrapEventAttribute<IBasicEvent>>[]): void;
   addBasicEvents(...data: Partial<IBasicEvent>[]): void;
   addBasicEvents(
      ...data: (
         & Partial<IBasicEvent>[]
         & Partial<IWrapEventAttribute<IBasicEvent>>
      )[]
   ): void;
   addBasicEvents(
      ...data: (
         & Partial<IBasicEvent>[]
         & Partial<IWrapEventAttribute<IBasicEvent>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.basicEvents.push(new BasicEvent(data[i]));
      }
   }

   addColorBoostEvents(
      ...data: Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>[]
   ): void;
   addColorBoostEvents(...data: Partial<IColorBoostEvent>[]): void;
   addColorBoostEvents(
      ...data: (
         & Partial<IColorBoostEvent>
         & Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>
      )[]
   ): void;
   addColorBoostEvents(
      ...data: (
         & Partial<IColorBoostEvent>
         & Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.colorBoostEvents.push(new ColorBoostEvent(data[i]));
      }
   }

   addLightColorEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightColorEventBoxGroupAttribute<
            ILightColorEventBoxGroup,
            ILightColorEventBox,
            ILightColorBase,
            IIndexFilter
         >
      >[]
   ): void;
   addLightColorEventBoxGroups(
      ...data: DeepPartial<ILightColorEventBoxGroup>[]
   ): void;
   addLightColorEventBoxGroups(
      ...data: (
         & DeepPartial<ILightColorEventBoxGroup>
         & DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               ILightColorEventBoxGroup,
               ILightColorEventBox,
               ILightColorBase,
               IIndexFilter
            >
         >
      )[]
   ): void;
   addLightColorEventBoxGroups(
      ...data: (
         & DeepPartial<ILightColorEventBoxGroup>
         & DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               ILightColorEventBoxGroup,
               ILightColorEventBox,
               ILightColorBase,
               IIndexFilter
            >
         >
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.lightColorEventBoxGroups.push(
            new LightColorEventBoxGroup(data[i]),
         );
      }
   }

   addLightRotationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxGroupAttribute<
            ILightRotationEventBoxGroup,
            ILightRotationEventBox,
            ILightRotationBase,
            IIndexFilter
         >
      >[]
   ): void;
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<ILightRotationEventBoxGroup>[]
   ): void;
   addLightRotationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightRotationEventBoxGroup>
         & DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               ILightRotationEventBoxGroup,
               ILightRotationEventBox,
               ILightRotationBase,
               IIndexFilter
            >
         >
      )[]
   ): void;
   addLightRotationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightRotationEventBoxGroup>
         & DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               ILightRotationEventBoxGroup,
               ILightRotationEventBox,
               ILightRotationBase,
               IIndexFilter
            >
         >
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.lightRotationEventBoxGroups.push(
            new LightRotationEventBoxGroup(data[i]),
         );
      }
   }

   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            ILightTranslationEventBoxGroup,
            ILightTranslationEventBox,
            ILightTranslationBase,
            IIndexFilter
         >
      >[]
   ): void;
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<ILightTranslationEventBoxGroup>[]
   ): void;
   addLightTranslationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightTranslationEventBoxGroup>
         & DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >
      )[]
   ): void;
   addLightTranslationEventBoxGroups(
      ...data: (
         & DeepPartial<ILightTranslationEventBoxGroup>
         & DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.lightTranslationEventBoxGroups.push(
            new LightTranslationEventBoxGroup(data[i]),
         );
      }
   }

   addFxEventBoxGroups(
      ...data: DeepPartial<
         IWrapFxEventBoxGroupAttribute<
            IFxEventBoxGroup,
            IFxEventBox,
            IIndexFilter
         >
      >[]
   ): void;
   addFxEventBoxGroups(...data: DeepPartial<IFxEventBoxGroup>[]): void;
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
   ): void;
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
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.fxEventBoxGroups.push(new FxEventBoxGroup(data[i]));
      }
   }

   isValid(): boolean {
      for (let i = 0; i < this.colorNotes.length; i++) {
         if (!this.checkClass(ColorNote, this.colorNotes[i])) return false;
      }
      for (let i = 0; i < this.bombNotes.length; i++) {
         if (!this.checkClass(BombNote, this.bombNotes[i])) return false;
      }
      for (let i = 0; i < this.arcs.length; i++) {
         if (!this.checkClass(Arc, this.arcs[i])) return false;
      }
      for (let i = 0; i < this.chains.length; i++) {
         if (!this.checkClass(Chain, this.chains[i])) return false;
      }
      for (let i = 0; i < this.obstacles.length; i++) {
         if (!this.checkClass(Obstacle, this.obstacles[i])) return false;
      }
      for (let i = 0; i < this.basicEvents.length; i++) {
         if (!this.checkClass(BasicEvent, this.basicEvents[i])) return false;
      }
      for (let i = 0; i < this.colorBoostEvents.length; i++) {
         if (!this.checkClass(ColorBoostEvent, this.colorBoostEvents[i])) {
            return false;
         }
      }
      for (let i = 0; i < this.rotationEvents.length; i++) {
         if (!this.checkClass(RotationEvent, this.rotationEvents[i])) {
            return false;
         }
      }
      for (let i = 0; i < this.bpmEvents.length; i++) {
         if (!this.checkClass(BPMEvent, this.bpmEvents[i])) return false;
      }
      for (let i = 0; i < this.waypoints.length; i++) {
         if (!this.checkClass(Waypoint, this.waypoints[i])) return false;
      }
      for (let i = 0; i < this.lightColorEventBoxGroups.length; i++) {
         if (
            !this.checkClass(
               LightColorEventBoxGroup,
               this.lightColorEventBoxGroups[i],
            )
         ) {
            return false;
         }
      }
      for (let i = 0; i < this.lightRotationEventBoxGroups.length; i++) {
         if (
            !this.checkClass(
               LightRotationEventBoxGroup,
               this.lightRotationEventBoxGroups[i],
            )
         ) {
            return false;
         }
      }
      for (let i = 0; i < this.lightTranslationEventBoxGroups.length; i++) {
         if (
            !this.checkClass(
               LightTranslationEventBoxGroup,
               this.lightTranslationEventBoxGroups[i],
            )
         ) {
            return false;
         }
      }
      for (let i = 0; i < this.fxEventBoxGroups.length; i++) {
         if (!this.checkClass(FxEventBoxGroup, this.fxEventBoxGroups[i])) {
            return false;
         }
      }
      return (
         this.eventTypesWithKeywords instanceof BasicEventTypesWithKeywords &&
         this.fxEventsCollection instanceof FxEventsCollection
      );
   }
}
