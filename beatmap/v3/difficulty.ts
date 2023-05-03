import { IDifficulty } from '../../types/beatmap/v3/difficulty.ts';
import { BasicEvent } from './basicEvent.ts';
import { BasicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import { BombNote } from './bombNote.ts';
import { BPMEvent } from './bpmEvent.ts';
import { BurstSlider } from './burstSlider.ts';
import { ColorBoostEvent } from './colorBoostEvent.ts';
import { ColorNote } from './colorNote.ts';
import { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { LightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { Obstacle } from './obstacle.ts';
import { RotationEvent } from './rotationEvent.ts';
import { Slider } from './slider.ts';
import { Waypoint } from './waypoint.ts';
import { DeepPartial } from '../../types/utils.ts';
import { IBPMEvent } from '../../types/beatmap/v3/bpmEvent.ts';
import { IRotationEvent } from '../../types/beatmap/v3/rotationEvent.ts';
import { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import { IObstacle } from '../../types/beatmap/v3/obstacle.ts';
import { ISlider } from '../../types/beatmap/v3/slider.ts';
import { IBurstSlider } from '../../types/beatmap/v3/burstSlider.ts';
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
import { IWrapBurstSliderAttribute } from '../../types/beatmap/wrapper/burstSlider.ts';
import { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import { IWrapLightColorEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { IWrapLightRotationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';
import { IWrapSliderAttribute } from '../../types/beatmap/wrapper/slider.ts';
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
    sliders: Slider[];
    burstSliders: BurstSlider[];
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
        this.sliders = this.data.sliders?.map((obj) => new Slider(obj)) ?? [];
        this.burstSliders = this.data.burstSliders?.map((obj) => new BurstSlider(obj)) ?? [];
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
            sliders: this.sliders.map((obj) => obj.toJSON()),
            burstSliders: this.burstSliders.map((obj) => obj.toJSON()),
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

    addBPMEvents(...bpmEvents: Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>[]): void;
    addBPMEvents(...bpmEvents: Partial<IBPMEvent>[]): void;
    addBPMEvents(
        ...bpmEvents: (Partial<IBPMEvent> & Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>)[]
    ): void;
    addBPMEvents(
        ...bpmEvents: (Partial<IBPMEvent> & Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>)[]
    ): void {
        this.bpmEvents.push(
            ...bpmEvents.map((obj) => {
                return obj instanceof BPMEvent ? obj : new BPMEvent(obj);
            }),
        );
    }

    addRotationEvents(
        ...rotationEvents: Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>[]
    ): void;
    addRotationEvents(...rotationEvents: Partial<IRotationEvent>[]): void;
    addRotationEvents(
        ...rotationEvents: (
            & Partial<IRotationEvent>
            & Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>
        )[]
    ): void;
    addRotationEvents(
        ...rotationEvents: (
            & Partial<IRotationEvent>
            & Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>
        )[]
    ): void {
        this.rotationEvents.push(
            ...rotationEvents.map((obj) =>
                obj instanceof RotationEvent ? obj : new RotationEvent(obj)
            ),
        );
    }

    addColorNotes(...colorNotes: Partial<IWrapColorNoteAttribute<Required<IColorNote>>>[]): void;
    addColorNotes(...colorNotes: Partial<IColorNote>[]): void;
    addColorNotes(
        ...colorNotes: (
            & Partial<IColorNote>
            & Partial<IWrapColorNoteAttribute<Required<IColorNote>>>
        )[]
    ): void;
    addColorNotes(
        ...colorNotes: (
            & Partial<IColorNote>
            & Partial<IWrapColorNoteAttribute<Required<IColorNote>>>
        )[]
    ): void {
        this.colorNotes.push(
            ...colorNotes.map((obj) => (obj instanceof ColorNote ? obj : new ColorNote(obj))),
        );
    }

    addBombNotes(...bombNotes: Partial<IWrapBombNoteAttribute<Required<IBombNote>>>[]): void;
    addBombNotes(...bombNotes: Partial<IBombNote>[]): void;
    addBombNotes(
        ...bombNotes: (
            & Partial<IBombNote>[]
            & Partial<IWrapBombNoteAttribute<Required<IBombNote>>>
        )[]
    ): void;
    addBombNotes(
        ...bombNotes: (
            & Partial<IBombNote>[]
            & Partial<IWrapBombNoteAttribute<Required<IBombNote>>>
        )[]
    ): void {
        this.bombNotes.push(
            ...bombNotes.map((obj) => (obj instanceof BombNote ? obj : new BombNote(obj))),
        );
    }

    addObstacles(...obstacles: Partial<IWrapObstacleAttribute<Required<IObstacle>>>[]): void;
    addObstacles(...obstacles: Partial<IObstacle>[]): void;
    addObstacles(
        ...obstacles: (Partial<IObstacle> & Partial<IWrapObstacleAttribute<Required<IObstacle>>>)[]
    ): void;
    addObstacles(
        ...obstacles: (Partial<IObstacle> & Partial<IWrapObstacleAttribute<Required<IObstacle>>>)[]
    ): void {
        this.obstacles.push(
            ...obstacles.map((obj) => (obj instanceof Obstacle ? obj : new Obstacle(obj))),
        );
    }

    addSliders(...sliders: Partial<IWrapSliderAttribute<Required<ISlider>>>[]): void;
    addSliders(...sliders: Partial<ISlider>[]): void;
    addSliders(
        ...sliders: (Partial<ISlider> & Partial<IWrapSliderAttribute<Required<ISlider>>>)[]
    ): void;
    addSliders(
        ...sliders: (Partial<ISlider> & Partial<IWrapSliderAttribute<Required<ISlider>>>)[]
    ): void {
        this.sliders.push(...sliders.map((obj) => (obj instanceof Slider ? obj : new Slider(obj))));
    }

    addBurstSliders(
        ...burstSliders: Partial<IWrapBurstSliderAttribute<Required<IBurstSlider>>>[]
    ): void;
    addBurstSliders(...burstSliders: Partial<IBurstSlider>[]): void;
    addBurstSliders(
        ...burstSliders: (
            & Partial<IBurstSlider>
            & Partial<IWrapBurstSliderAttribute<Required<IBurstSlider>>>
        )[]
    ): void;
    addBurstSliders(
        ...burstSliders: (
            & Partial<IBurstSlider>
            & Partial<IWrapBurstSliderAttribute<Required<IBurstSlider>>>
        )[]
    ): void {
        this.burstSliders.push(
            ...burstSliders.map((obj) => (obj instanceof BurstSlider ? obj : new BurstSlider(obj))),
        );
    }

    addWaypoints(...waypoints: Partial<IWrapWaypointAttribute<Required<IWaypoint>>>[]): void;
    addWaypoints(...waypoints: Partial<IWaypoint>[]): void;
    addWaypoints(
        ...waypoints: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<Required<IWaypoint>>>)[]
    ): void;
    addWaypoints(
        ...waypoints: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<Required<IWaypoint>>>)[]
    ): void {
        this.waypoints.push(
            ...waypoints.map((obj) => (obj instanceof Waypoint ? obj : new Waypoint(obj))),
        );
    }

    addBasicEvents(...basicEvents: Partial<IWrapEventAttribute<Required<IBasicEvent>>>[]): void;
    addBasicEvents(...basicEvents: Partial<IBasicEvent>[]): void;
    addBasicEvents(
        ...basicEvents: (
            & Partial<IBasicEvent>[]
            & Partial<IWrapEventAttribute<Required<IBasicEvent>>>
        )[]
    ): void;
    addBasicEvents(
        ...basicEvents: (
            & Partial<IBasicEvent>[]
            & Partial<IWrapEventAttribute<Required<IBasicEvent>>>
        )[]
    ): void {
        this.basicEvents.push(
            ...basicEvents.map((obj) => (obj instanceof BasicEvent ? obj : new BasicEvent(obj))),
        );
    }

    addColorBoostEvents(
        ...colorBoostEvents: Partial<IWrapColorBoostEventAttribute<Required<IColorBoostEvent>>>[]
    ): void;
    addColorBoostEvents(...colorBoostEvents: Partial<IColorBoostEvent>[]): void;
    addColorBoostEvents(
        ...colorBoostEvents: (
            & Partial<IColorBoostEvent>
            & Partial<IWrapColorBoostEventAttribute<Required<IColorBoostEvent>>>
        )[]
    ): void;
    addColorBoostEvents(
        ...colorBoostEvents: (
            & Partial<IColorBoostEvent>
            & Partial<IWrapColorBoostEventAttribute<Required<IColorBoostEvent>>>
        )[]
    ): void {
        this.colorBoostEvents.push(
            ...colorBoostEvents.map((obj) =>
                obj instanceof ColorBoostEvent ? obj : new ColorBoostEvent(obj)
            ),
        );
    }

    addLightColorEventBoxGroups(
        ...lightColorEBGs: DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
                Required<ILightColorEventBoxGroup>,
                Required<ILightColorEventBox>,
                Required<ILightColorBase>,
                Required<IIndexFilter>
            >
        >[]
    ): void;
    addLightColorEventBoxGroups(...lightColorEBGs: DeepPartial<ILightColorEventBoxGroup>[]): void;
    addLightColorEventBoxGroups(
        ...lightColorEBGs: (
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
        ...lightColorEBGs: (
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
            ...lightColorEBGs.map((obj) =>
                obj instanceof LightColorEventBoxGroup ? obj : new LightColorEventBoxGroup(obj)
            ),
        );
    }

    addLightRotationEventBoxGroups(
        ...lightRotationEBGs: DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
                Required<ILightRotationEventBoxGroup>,
                Required<ILightRotationEventBox>,
                Required<ILightRotationBase>,
                Required<IIndexFilter>
            >
        >[]
    ): void;
    addLightRotationEventBoxGroups(
        ...lightRotationEBGs: DeepPartial<ILightRotationEventBoxGroup>[]
    ): void;
    addLightRotationEventBoxGroups(
        ...lightRotationEBGs: (
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
        ...lightRotationEBGs: (
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
            ...lightRotationEBGs.map((obj) =>
                obj instanceof LightRotationEventBoxGroup
                    ? obj
                    : new LightRotationEventBoxGroup(obj)
            ),
        );
    }

    addLightTranslationEventBoxGroups(
        ...lightTranslationEBGs: DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
                Required<ILightTranslationEventBoxGroup>,
                Required<ILightTranslationEventBox>,
                Required<ILightTranslationBase>,
                Required<IIndexFilter>
            >
        >[]
    ): void;
    addLightTranslationEventBoxGroups(
        ...lightTranslationEBGs: DeepPartial<ILightTranslationEventBoxGroup>[]
    ): void;
    addLightTranslationEventBoxGroups(
        ...lightTranslationEBGs: (
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
        ...lightTranslationEBGs: (
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
            ...lightTranslationEBGs.map((obj) =>
                obj instanceof LightTranslationEventBoxGroup
                    ? obj
                    : new LightTranslationEventBoxGroup(obj)
            ),
        );
    }

    isValid(): boolean {
        throw new Error('Method not implemented.');
    }
}
