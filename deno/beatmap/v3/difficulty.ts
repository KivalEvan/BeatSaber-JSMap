import { IDifficultyData } from '../../types/beatmap/v3/difficulty.ts';
import { Serializable } from '../shared/serializable.ts';
import { BasicEvent } from './basicEvent.ts';
import { BasicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import { BombNote } from './bombNote.ts';
import { BPMEvent } from './bpmEvent.ts';
import { BurstSlider } from './burstSlider.ts';
import { ColorBoostEvent } from './colorBoostEvent.ts';
import { ColorNote } from './colorNote.ts';
import { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { Obstacle } from './obstacle.ts';
import { RotationEvent } from './rotationEvent.ts';
import { Slider } from './slider.ts';
import { Waypoint } from './waypoint.ts';
import { BeatPerMinute } from '../shared/bpm.ts';
import { getNoteContainer } from './container.ts';

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
    private constructor(difficultyData: Required<IDifficultyData>) {
        super(difficultyData);
        this.data = difficultyData;
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

    /** Calculate note per second.
     * ```ts
     * const nps = difficulty.nps(difficultyData, 10);
     * ```
     * ---
     * **Note:** Duration can be either in any time type.
     */
    public nps = (data: DifficultyData, duration: number): number => {
        const notes = getNoteContainer(data).filter((n) => n.type !== 'bomb');
        return duration ? notes.length / duration : 0;
    };

    /** Calculate the peak by rolling average.
     * ```ts
     * const peakNPS = difficulty.peak(difficultyData, 10, BPM ?? 128);
     * ```
     */
    public peak = (
        data: DifficultyData,
        beat: number,
        bpm: BeatPerMinute | number
    ): number => {
        let peakNPS = 0;
        let currentSectionStart = 0;
        const bpmV = typeof bpm === 'number' ? bpm : bpm.value;
        const notes = getNoteContainer(data).filter((n) => n.type !== 'bomb');

        for (let i = 0; i < notes.length; i++) {
            while (notes[i].data.time - notes[currentSectionStart].data.time > beat) {
                currentSectionStart++;
            }
            peakNPS = Math.max(
                peakNPS,
                (i - currentSectionStart + 1) / ((beat / bpmV) * 60)
            );
        }

        return peakNPS;
    };

    /** Get first interactible object beat time in beatmap.
     * ```ts
     * const firstInteractiveTime = difficulty.getFirstInteractiveTime(difficultyData);
     * ```
     */
    public getFirstInteractiveTime = (data: DifficultyData): number => {
        const notes = getNoteContainer(data).filter((n) => n.type !== 'bomb');
        let firstNoteTime = Number.MAX_VALUE;
        if (notes.length > 0) {
            firstNoteTime = notes[0].data.time;
        }
        const firstInteractiveObstacleTime = this.findFirstInteractiveObstacleTime(
            data.obstacles
        );
        return Math.min(firstNoteTime, firstInteractiveObstacleTime);
    };

    /** Get last interactible object beat time in beatmap.
     * ```ts
     * const lastInteractiveTime = difficulty.getLastInteractiveTime(difficultyData);
     * ```
     */
    public getLastInteractiveTime = (data: DifficultyData): number => {
        const notes = getNoteContainer(data).filter((n) => n.type !== 'bomb');
        let lastNoteTime = 0;
        if (notes.length > 0) {
            lastNoteTime = notes[notes.length - 1].data.time;
        }
        const lastInteractiveObstacleTime = this.findLastInteractiveObstacleTime(
            data.obstacles
        );
        return Math.max(lastNoteTime, lastInteractiveObstacleTime);
    };

    /** Get first interactible obstacle beat time in beatmap.
     * ```ts
     * const firstInteractiveObstacleTime = difficulty.findFirstInteractiveObstacleTime(obstacles);
     * ```
     */
    public findFirstInteractiveObstacleTime = (obstacles: Obstacle[]): number => {
        for (let i = 0, len = obstacles.length; i < len; i++) {
            if (obstacles[i].isInteractive()) {
                return obstacles[i].time;
            }
        }
        return Number.MAX_VALUE;
    };

    /** Get last interactible obstacle beat time in beatmap.
     * ```ts
     * const lastInteractiveObstacleTime = difficulty.findLastInteractiveObstacleTime(obstacles);
     * ```
     */
    public findLastInteractiveObstacleTime = (obstacles: Obstacle[]): number => {
        let obstacleEnd = 0;
        for (let i = obstacles.length - 1; i >= 0; i--) {
            if (obstacles[i].isInteractive()) {
                obstacleEnd = Math.max(
                    obstacleEnd,
                    obstacles[i].time + obstacles[i].duration
                );
            }
        }
        return obstacleEnd;
    };
}
