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

/** Difficulty beatmap v3 class object. */
export class Difficulty extends WrapDifficulty<Required<IDifficulty>> {
    version: `3.${0 | 1 | 2}.0`;
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
    eventTypesWithKeywords: BasicEventTypesWithKeywords;
    useNormalEventsAsCompatibleEvents;

    constructor(data: Partial<IDifficulty> = {}) {
        super({
            version: '3.2.0',
            bpmEvents: data.bpmEvents ?? [],
            rotationEvents: data.rotationEvents ?? [],
            colorNotes: data.colorNotes ?? [],
            bombNotes: data.bombNotes ?? [],
            obstacles: data.obstacles ?? [],
            sliders: data.sliders ?? [],
            burstSliders: data.burstSliders ?? [],
            waypoints: data.waypoints ?? [],
            basicBeatmapEvents: data.basicBeatmapEvents ?? [],
            colorBoostBeatmapEvents: data.colorBoostBeatmapEvents ?? [],
            lightColorEventBoxGroups: data.lightColorEventBoxGroups ?? [],
            lightRotationEventBoxGroups: data.lightRotationEventBoxGroups ?? [],
            lightTranslationEventBoxGroups: data.lightTranslationEventBoxGroups ?? [],
            basicEventTypesWithKeywords: data.basicEventTypesWithKeywords ?? {
                d: [],
            },
            useNormalEventsAsCompatibleEvents: data.useNormalEventsAsCompatibleEvents ?? false,
            customData: data.customData ?? {},
        });

        this.version = '3.2.0';
        this.bpmEvents = this.data.bpmEvents?.map((obj) => new BPMEvent(obj)) ?? [];
        this.rotationEvents = this.data.rotationEvents?.map((obj) => new RotationEvent(obj)) ?? [];
        this.colorNotes = this.data.colorNotes?.map((obj) => new ColorNote(obj)) ?? [];
        this.bombNotes = this.data.bombNotes?.map((obj) => new BombNote(obj)) ?? [];
        this.obstacles = this.data.obstacles?.map((obj) => new Obstacle(obj)) ?? [];
        this.arcs = this.data.sliders?.map((obj) => new Arc(obj)) ?? [];
        this.chains = this.data.burstSliders?.map((obj) => new Chain(obj)) ?? [];
        this.waypoints = this.data.waypoints?.map((obj) => new Waypoint(obj)) ?? [];
        this.basicEvents = this.data.basicBeatmapEvents?.map((obj) => new BasicEvent(obj)) ?? [];
        this.colorBoostEvents =
            this.data.colorBoostBeatmapEvents?.map((obj) => new ColorBoostEvent(obj)) ?? [];
        this.lightColorEventBoxGroups =
            this.data.lightColorEventBoxGroups?.map((obj) => new LightColorEventBoxGroup(obj)) ??
                [];
        this.lightRotationEventBoxGroups = this.data.lightRotationEventBoxGroups?.map(
            (obj) => new LightRotationEventBoxGroup(obj),
        ) ?? [];
        this.lightTranslationEventBoxGroups = this.data.lightTranslationEventBoxGroups?.map(
            (obj) => new LightTranslationEventBoxGroup(obj),
        ) ?? [];
        this.eventTypesWithKeywords = new BasicEventTypesWithKeywords(
            this.data.basicEventTypesWithKeywords,
        ) ?? {
            d: [],
        };
        this.useNormalEventsAsCompatibleEvents = this.data.useNormalEventsAsCompatibleEvents ??
            false;
        this.customData = this.data.customData ?? {};
    }

    static create(data: Partial<IDifficulty> = {}): Difficulty {
        return new this(data);
    }

    toJSON(): Required<IDifficulty> {
        return {
            version: '3.2.0',
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
            lightRotationEventBoxGroups: this.lightRotationEventBoxGroups.map((obj) =>
                obj.toJSON()
            ),
            lightTranslationEventBoxGroups: this.lightTranslationEventBoxGroups.map((obj) =>
                obj.toJSON()
            ),
            basicEventTypesWithKeywords: this.eventTypesWithKeywords.toJSON(),
            useNormalEventsAsCompatibleEvents: this.useNormalEventsAsCompatibleEvents,
            customData: deepCopy(this.customData),
        };
    }

    get customData(): NonNullable<IDifficulty['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<IDifficulty['customData']>) {
        this.data.customData = value;
    }

    reparse(keepRef?: boolean): void {
        this.colorNotes = this.colorNotes.map((obj) => this.createOrKeep(ColorNote, obj, keepRef));
        this.bombNotes = this.bombNotes.map((obj) => this.createOrKeep(BombNote, obj, keepRef));
        this.arcs = this.arcs.map((obj) => this.createOrKeep(Arc, obj, keepRef));
        this.chains = this.chains.map((obj) => this.createOrKeep(Chain, obj, keepRef));
        this.obstacles = this.obstacles.map((obj) => this.createOrKeep(Obstacle, obj, keepRef));
        this.basicEvents = this.basicEvents.map((obj) =>
            this.createOrKeep(BasicEvent, obj, keepRef)
        );
        this.colorBoostEvents = this.colorBoostEvents.map((obj) =>
            this.createOrKeep(ColorBoostEvent, obj, keepRef)
        );
        this.rotationEvents = this.rotationEvents.map((obj) =>
            this.createOrKeep(RotationEvent, obj, keepRef)
        );
        this.bpmEvents = this.bpmEvents.map((obj) => this.createOrKeep(BPMEvent, obj, keepRef));
        this.waypoints = this.waypoints.map((obj) => this.createOrKeep(Waypoint, obj, keepRef));
        this.eventTypesWithKeywords = new BasicEventTypesWithKeywords(this.eventTypesWithKeywords);
    }

    addBPMEvents(...data: Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>[]): void;
    addBPMEvents(...data: Partial<IBPMEvent>[]): void;
    addBPMEvents(
        ...data: (Partial<IBPMEvent> & Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>)[]
    ): void;
    addBPMEvents(
        ...data: (Partial<IBPMEvent> & Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>)[]
    ): void {
        this.bpmEvents.push(
            ...data.map((obj) => {
                return obj instanceof BPMEvent ? obj : new BPMEvent(obj);
            }),
        );
    }

    addRotationEvents(
        ...data: Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>[]
    ): void;
    addRotationEvents(...data: Partial<IRotationEvent>[]): void;
    addRotationEvents(
        ...data: (
            & Partial<IRotationEvent>
            & Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>
        )[]
    ): void;
    addRotationEvents(
        ...data: (
            & Partial<IRotationEvent>
            & Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>
        )[]
    ): void {
        this.rotationEvents.push(
            ...data.map((obj) => (obj instanceof RotationEvent ? obj : new RotationEvent(obj))),
        );
    }

    addColorNotes(...data: Partial<IWrapColorNoteAttribute<Required<IColorNote>>>[]): void;
    addColorNotes(...data: Partial<IColorNote>[]): void;
    addColorNotes(
        ...data: (Partial<IColorNote> & Partial<IWrapColorNoteAttribute<Required<IColorNote>>>)[]
    ): void;
    addColorNotes(
        ...data: (Partial<IColorNote> & Partial<IWrapColorNoteAttribute<Required<IColorNote>>>)[]
    ): void {
        this.colorNotes.push(
            ...data.map((obj) => (obj instanceof ColorNote ? obj : new ColorNote(obj))),
        );
    }

    addBombNotes(...data: Partial<IWrapBombNoteAttribute<Required<IBombNote>>>[]): void;
    addBombNotes(...data: Partial<IBombNote>[]): void;
    addBombNotes(
        ...data: (Partial<IBombNote>[] & Partial<IWrapBombNoteAttribute<Required<IBombNote>>>)[]
    ): void;
    addBombNotes(
        ...data: (Partial<IBombNote>[] & Partial<IWrapBombNoteAttribute<Required<IBombNote>>>)[]
    ): void {
        this.bombNotes.push(
            ...data.map((obj) => (obj instanceof BombNote ? obj : new BombNote(obj))),
        );
    }

    addObstacles(...data: Partial<IWrapObstacleAttribute<Required<IObstacle>>>[]): void;
    addObstacles(...data: Partial<IObstacle>[]): void;
    addObstacles(
        ...data: (Partial<IObstacle> & Partial<IWrapObstacleAttribute<Required<IObstacle>>>)[]
    ): void;
    addObstacles(
        ...data: (Partial<IObstacle> & Partial<IWrapObstacleAttribute<Required<IObstacle>>>)[]
    ): void {
        this.obstacles.push(
            ...data.map((obj) => (obj instanceof Obstacle ? obj : new Obstacle(obj))),
        );
    }

    addArcs(...data: Partial<IWrapArcAttribute<Required<IArc>>>[]): void;
    addArcs(...data: Partial<IArc>[]): void;
    addArcs(...data: (Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>>)[]): void;
    addArcs(...data: (Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>>)[]): void {
        this.arcs.push(...data.map((obj) => (obj instanceof Arc ? obj : new Arc(obj))));
    }

    addChains(...data: Partial<IWrapChainAttribute<Required<IChain>>>[]): void;
    addChains(...data: Partial<IChain>[]): void;
    addChains(...data: (Partial<IChain> & Partial<IWrapChainAttribute<Required<IChain>>>)[]): void;
    addChains(...data: (Partial<IChain> & Partial<IWrapChainAttribute<Required<IChain>>>)[]): void {
        this.chains.push(...data.map((obj) => (obj instanceof Chain ? obj : new Chain(obj))));
    }

    addWaypoints(...data: Partial<IWrapWaypointAttribute<Required<IWaypoint>>>[]): void;
    addWaypoints(...data: Partial<IWaypoint>[]): void;
    addWaypoints(
        ...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<Required<IWaypoint>>>)[]
    ): void;
    addWaypoints(
        ...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<Required<IWaypoint>>>)[]
    ): void {
        this.waypoints.push(
            ...data.map((obj) => (obj instanceof Waypoint ? obj : new Waypoint(obj))),
        );
    }

    addBasicEvents(...data: Partial<IWrapEventAttribute<Required<IBasicEvent>>>[]): void;
    addBasicEvents(...data: Partial<IBasicEvent>[]): void;
    addBasicEvents(
        ...data: (Partial<IBasicEvent>[] & Partial<IWrapEventAttribute<Required<IBasicEvent>>>)[]
    ): void;
    addBasicEvents(
        ...data: (Partial<IBasicEvent>[] & Partial<IWrapEventAttribute<Required<IBasicEvent>>>)[]
    ): void {
        this.basicEvents.push(
            ...data.map((obj) => (obj instanceof BasicEvent ? obj : new BasicEvent(obj))),
        );
    }

    addColorBoostEvents(
        ...data: Partial<IWrapColorBoostEventAttribute<Required<IColorBoostEvent>>>[]
    ): void;
    addColorBoostEvents(...data: Partial<IColorBoostEvent>[]): void;
    addColorBoostEvents(
        ...data: (
            & Partial<IColorBoostEvent>
            & Partial<IWrapColorBoostEventAttribute<Required<IColorBoostEvent>>>
        )[]
    ): void;
    addColorBoostEvents(
        ...data: (
            & Partial<IColorBoostEvent>
            & Partial<IWrapColorBoostEventAttribute<Required<IColorBoostEvent>>>
        )[]
    ): void {
        this.colorBoostEvents.push(
            ...data.map((obj) => (obj instanceof ColorBoostEvent ? obj : new ColorBoostEvent(obj))),
        );
    }

    addLightColorEventBoxGroups(
        ...data: DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
                Required<ILightColorEventBoxGroup>,
                Required<ILightColorEventBox>,
                Required<ILightColorBase>,
                Required<IIndexFilter>
            >
        >[]
    ): void;
    addLightColorEventBoxGroups(...data: DeepPartial<ILightColorEventBoxGroup>[]): void;
    addLightColorEventBoxGroups(
        ...data: (
            & DeepPartial<ILightColorEventBoxGroup>
            & DeepPartial<
                IWrapLightColorEventBoxGroupAttribute<
                    Required<ILightColorEventBoxGroup>,
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): void;
    addLightColorEventBoxGroups(
        ...data: (
            & DeepPartial<ILightColorEventBoxGroup>
            & DeepPartial<
                IWrapLightColorEventBoxGroupAttribute<
                    Required<ILightColorEventBoxGroup>,
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): void {
        this.lightColorEventBoxGroups.push(
            ...data.map((obj) =>
                obj instanceof LightColorEventBoxGroup ? obj : new LightColorEventBoxGroup(obj)
            ),
        );
    }

    addLightRotationEventBoxGroups(
        ...data: DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
                Required<ILightRotationEventBoxGroup>,
                Required<ILightRotationEventBox>,
                Required<ILightRotationBase>,
                Required<IIndexFilter>
            >
        >[]
    ): void;
    addLightRotationEventBoxGroups(...data: DeepPartial<ILightRotationEventBoxGroup>[]): void;
    addLightRotationEventBoxGroups(
        ...data: (
            & DeepPartial<ILightRotationEventBoxGroup>
            & DeepPartial<
                IWrapLightRotationEventBoxGroupAttribute<
                    Required<ILightRotationEventBoxGroup>,
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): void;
    addLightRotationEventBoxGroups(
        ...data: (
            & DeepPartial<ILightRotationEventBoxGroup>
            & DeepPartial<
                IWrapLightRotationEventBoxGroupAttribute<
                    Required<ILightRotationEventBoxGroup>,
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): void {
        this.lightRotationEventBoxGroups.push(
            ...data.map((obj) =>
                obj instanceof LightRotationEventBoxGroup
                    ? obj
                    : new LightRotationEventBoxGroup(obj)
            ),
        );
    }

    addLightTranslationEventBoxGroups(
        ...data: DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
                Required<ILightTranslationEventBoxGroup>,
                Required<ILightTranslationEventBox>,
                Required<ILightTranslationBase>,
                Required<IIndexFilter>
            >
        >[]
    ): void;
    addLightTranslationEventBoxGroups(...data: DeepPartial<ILightTranslationEventBoxGroup>[]): void;
    addLightTranslationEventBoxGroups(
        ...data: (
            & DeepPartial<ILightTranslationEventBoxGroup>
            & DeepPartial<
                IWrapLightTranslationEventBoxGroupAttribute<
                    Required<ILightTranslationEventBoxGroup>,
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): void;
    addLightTranslationEventBoxGroups(
        ...data: (
            & DeepPartial<ILightTranslationEventBoxGroup>
            & DeepPartial<
                IWrapLightTranslationEventBoxGroupAttribute<
                    Required<ILightTranslationEventBoxGroup>,
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): void {
        this.lightTranslationEventBoxGroups.push(
            ...data.map((obj) =>
                obj instanceof LightTranslationEventBoxGroup
                    ? obj
                    : new LightTranslationEventBoxGroup(obj)
            ),
        );
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
            this.eventTypesWithKeywords instanceof BasicEventTypesWithKeywords
        );
    }
}
