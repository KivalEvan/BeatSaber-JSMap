import { Serializable } from '../../shared/types/serializable.ts';
import { IBPMEvent, BPMEvent } from './bpmEvent.ts';
import { IRotationEvent, RotationEvent } from './rotationEvent.ts';
import { IColorNote, ColorNote } from './colorNote.ts';
import { IBombNote, BombNote } from './bombNote.ts';
import { IObstacle, Obstacle } from './obstacle.ts';
import { ISlider, Slider } from './slider.ts';
import { IBurstSlider, BurstSlider } from './burstSlider.ts';
import { IWaypoint, Waypoint } from './waypoint.ts';
import { IBasicEvent, BasicEvent } from './basicEvent.ts';
import { IColorBoostEvent, ColorBoostEvent } from './colorBoostEvent.ts';
import {
    ILightColorEventBoxGroup,
    LightColorEventBoxGroup,
} from './lightColorEventBoxGroup.ts';
import {
    ILightRotationEventBoxGroup,
    LightRotationEventBoxGroup,
} from './lightRotationEventBoxGroup.ts';
import {
    IBasicEventTypesWithKeywords,
    BasicEventTypesWithKeywords,
} from './basicEventTypesWithKeywords.ts';
import { CustomDataDifficulty } from './customData.ts';

export interface IDifficultyData {
    version: '3.0.0';
    bpmEvents: IBPMEvent[];
    rotationEvents: IRotationEvent[];
    colorNotes: IColorNote[];
    bombNotes: IBombNote[];
    obstacles: IObstacle[];
    sliders: ISlider[];
    burstSliders: IBurstSlider[];
    waypoints: IWaypoint[];
    basicBeatmapEvents: IBasicEvent[];
    colorBoostBeatmapEvents: IColorBoostEvent[];
    lightColorEventBoxGroups: ILightColorEventBoxGroup[];
    lightRotationEventBoxGroups: ILightRotationEventBoxGroup[];
    basicEventTypesWithKeywords: IBasicEventTypesWithKeywords;
    useNormalEventsAsCompatibleEvents: boolean;
    customData?: CustomDataDifficulty;
}

export class DifficultyData extends Serializable<IDifficultyData> {
    version;
    bpmEvents: BPMEvent[];
    rotationEvents: RotationEvent[];
    colorNotes: ColorNote[];
    bombNotes: BombNote[];
    obstacles: Obstacle[];
    sliders: Slider[];
    burstSliders: BurstSlider[];
    waypoints: Waypoint[];
    basicBeatmapEvents: BasicEvent[];
    colorBoostBeatmapEvents: ColorBoostEvent[];
    lightColorEventBoxGroups: LightColorEventBoxGroup[];
    lightRotationEventBoxGroups: LightRotationEventBoxGroup[];
    basicEventTypesWithKeywords: BasicEventTypesWithKeywords;
    useNormalEventsAsCompatibleEvents;
    customData;
    constructor(difficultyData: Required<IDifficultyData>) {
        super();
        this.version = difficultyData.version ?? '3.0.0';
        this.bpmEvents =
            difficultyData.bpmEvents?.map((obj) => BPMEvent.create(obj)) ?? [];
        this.rotationEvents =
            difficultyData.rotationEvents?.map((obj) => RotationEvent.create(obj)) ??
            [];
        this.colorNotes =
            difficultyData.colorNotes?.map((obj) => ColorNote.create(obj)) ?? [];
        this.bombNotes =
            difficultyData.bombNotes?.map((obj) => BombNote.create(obj)) ?? [];
        this.obstacles =
            difficultyData.obstacles?.map((obj) => Obstacle.create(obj)) ?? [];
        this.sliders = difficultyData.sliders?.map((obj) => Slider.create(obj)) ?? [];
        this.burstSliders =
            difficultyData.burstSliders?.map((obj) => BurstSlider.create(obj)) ?? [];
        this.waypoints =
            difficultyData.waypoints?.map((obj) => Waypoint.create(obj)) ?? [];
        this.basicBeatmapEvents =
            difficultyData.basicBeatmapEvents?.map((obj) => BasicEvent.create(obj)) ??
            [];
        this.colorBoostBeatmapEvents =
            difficultyData.colorBoostBeatmapEvents?.map((obj) =>
                ColorBoostEvent.create(obj)
            ) ?? [];
        this.lightColorEventBoxGroups =
            difficultyData.lightColorEventBoxGroups?.map((obj) =>
                LightColorEventBoxGroup.create(obj)
            ) ?? [];
        this.lightRotationEventBoxGroups =
            difficultyData.lightRotationEventBoxGroups?.map((obj) =>
                LightRotationEventBoxGroup.create(obj)
            ) ?? [];
        this.basicEventTypesWithKeywords = BasicEventTypesWithKeywords.create(
            difficultyData.basicEventTypesWithKeywords
        ) ?? { d: [] };
        this.useNormalEventsAsCompatibleEvents =
            difficultyData.useNormalEventsAsCompatibleEvents ?? false;
        this.customData = difficultyData.customData ?? {};
    }

    static create(difficultyData: Partial<IDifficultyData> = {}): DifficultyData {
        return new DifficultyData({
            version: difficultyData.version || '3.0.0',
            bpmEvents: difficultyData.bpmEvents ?? [],
            rotationEvents: difficultyData.rotationEvents ?? [],
            colorNotes: difficultyData.colorNotes ?? [],
            bombNotes: difficultyData.bombNotes ?? [],
            obstacles: difficultyData.obstacles ?? [],
            sliders: difficultyData.sliders ?? [],
            burstSliders: difficultyData.burstSliders ?? [],
            waypoints: difficultyData.waypoints ?? [],
            basicBeatmapEvents: difficultyData.basicBeatmapEvents ?? [],
            colorBoostBeatmapEvents: difficultyData.colorBoostBeatmapEvents ?? [],
            lightColorEventBoxGroups: difficultyData.lightColorEventBoxGroups ?? [],
            lightRotationEventBoxGroups:
                difficultyData.lightRotationEventBoxGroups ?? [],
            basicEventTypesWithKeywords: difficultyData.basicEventTypesWithKeywords ?? {
                d: [],
            },
            useNormalEventsAsCompatibleEvents:
                difficultyData.useNormalEventsAsCompatibleEvents ?? false,
            customData: difficultyData.customData ?? {},
        });
    }

    toObject(): IDifficultyData {
        return {
            version: this.version || '3.0.0',
            bpmEvents: this.bpmEvents.map((obj) => obj.toObject()),
            rotationEvents: this.rotationEvents.map((obj) => obj.toObject()),
            colorNotes: this.colorNotes.map((obj) => obj.toObject()),
            bombNotes: this.bombNotes.map((obj) => obj.toObject()),
            obstacles: this.obstacles.map((obj) => obj.toObject()),
            sliders: this.sliders.map((obj) => obj.toObject()),
            burstSliders: this.burstSliders.map((obj) => obj.toObject()),
            waypoints: this.waypoints.map((obj) => obj.toObject()),
            basicBeatmapEvents: this.basicBeatmapEvents.map((obj) => obj.toObject()),
            colorBoostBeatmapEvents: this.colorBoostBeatmapEvents.map((obj) =>
                obj.toObject()
            ),
            lightColorEventBoxGroups: this.lightColorEventBoxGroups.map((obj) =>
                obj.toObject()
            ),
            lightRotationEventBoxGroups: this.lightRotationEventBoxGroups.map((obj) =>
                obj.toObject()
            ),
            basicEventTypesWithKeywords: this.basicEventTypesWithKeywords.toObject(),
            useNormalEventsAsCompatibleEvents: this.useNormalEventsAsCompatibleEvents,
            customData: this.customData ?? {},
        };
    }
}
