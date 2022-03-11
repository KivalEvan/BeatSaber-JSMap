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
import { IBoostEvent, BoostEvent } from './boostEvent.ts';
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
    colorBoostBeatmapEvents: IBoostEvent[];
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
    colorBoostBeatmapEvents: BoostEvent[];
    lightColorEventBoxGroups: LightColorEventBoxGroup[];
    lightRotationEventBoxGroups: LightRotationEventBoxGroup[];
    basicEventTypesWithKeywords: BasicEventTypesWithKeywords;
    useNormalEventsAsCompatibleEvents;
    customData;
    constructor(difficultyData: IDifficultyData) {
        super();
        this.version = difficultyData.version ?? '3.0.0';
        this.bpmEvents =
            difficultyData.bpmEvents?.map((obj) => new BPMEvent(obj)) ?? [];
        this.rotationEvents =
            difficultyData.rotationEvents?.map((obj) => new RotationEvent(obj)) ?? [];
        this.colorNotes =
            difficultyData.colorNotes?.map((obj) => new ColorNote(obj)) ?? [];
        this.bombNotes =
            difficultyData.bombNotes?.map((obj) => new BombNote(obj)) ?? [];
        this.obstacles =
            difficultyData.obstacles?.map((obj) => new Obstacle(obj)) ?? [];
        this.sliders = difficultyData.sliders?.map((obj) => new Slider(obj)) ?? [];
        this.burstSliders =
            difficultyData.burstSliders?.map((obj) => new BurstSlider(obj)) ?? [];
        this.waypoints =
            difficultyData.waypoints?.map((obj) => new Waypoint(obj)) ?? [];
        this.basicBeatmapEvents =
            difficultyData.basicBeatmapEvents?.map((obj) => new BasicEvent(obj)) ?? [];
        this.colorBoostBeatmapEvents =
            difficultyData.colorBoostBeatmapEvents?.map((obj) => new BoostEvent(obj)) ??
            [];
        this.lightColorEventBoxGroups =
            difficultyData.lightColorEventBoxGroups?.map(
                (obj) => new LightColorEventBoxGroup(obj)
            ) ?? [];
        this.lightRotationEventBoxGroups =
            difficultyData.lightRotationEventBoxGroups?.map(
                (obj) => new LightRotationEventBoxGroup(obj)
            ) ?? [];
        this.basicEventTypesWithKeywords = new BasicEventTypesWithKeywords(
            difficultyData.basicEventTypesWithKeywords
        ) ?? { d: [] };
        this.useNormalEventsAsCompatibleEvents =
            difficultyData.useNormalEventsAsCompatibleEvents ?? false;
        this.customData = difficultyData.customData ?? {};
    }

    public toObject(): IDifficultyData {
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
