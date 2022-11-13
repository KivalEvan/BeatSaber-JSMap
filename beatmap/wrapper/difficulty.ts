import { IWrapEvent } from '../../types/beatmap/wrapper/event.ts';
import { IWrapEventTypesWithKeywords } from '../../types/beatmap/wrapper/eventTypesWithKeywords.ts';
import { IWrapBombNote } from '../../types/beatmap/wrapper/bombNote.ts';
import { IWrapBPMEvent } from '../../types/beatmap/wrapper/bpmEvent.ts';
import { IWrapBurstSlider } from '../../types/beatmap/wrapper/burstSlider.ts';
import { IWrapColorBoostEvent } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { IWrapColorNote } from '../../types/beatmap/wrapper/colorNote.ts';
import { IWrapLightColorEventBoxGroup } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { IWrapLightRotationEventBoxGroup } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import { IWrapLightTranslationEventBoxGroup } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import { IWrapObstacle } from '../../types/beatmap/wrapper/obstacle.ts';
import { IWrapRotationEvent } from '../../types/beatmap/wrapper/rotationEvent.ts';
import { IWrapSlider } from '../../types/beatmap/wrapper/slider.ts';
import { IWrapWaypoint } from '../../types/beatmap/wrapper/waypoint.ts';
import { BeatPerMinute } from '../shared/bpm.ts';
import { DeepPartialWrapper, LooseAutocomplete, ObtainCustomData, PartialWrapper } from '../../types/utils.ts';
import { GenericFileName } from '../../types/beatmap/shared/info.ts';
import { EventContainer, NoteContainer } from '../../types/beatmap/wrapper/container.ts';
import { Version } from '../../types/beatmap/shared/version.ts';
import { WrapBaseItem } from './baseItem.ts';
import { IWrapDifficulty } from '../../types/beatmap/wrapper/difficulty.ts';

/** Difficulty beatmap class object. */
export abstract class WrapDifficulty<T extends Record<keyof T, unknown>> extends WrapBaseItem<T>
    implements IWrapDifficulty<T> {
    private _fileName = 'UnnamedDifficulty.dat';

    abstract version: Version;
    abstract bpmEvents: IWrapBPMEvent[];
    abstract rotationEvents: IWrapRotationEvent[];
    abstract colorNotes: IWrapColorNote[];
    abstract bombNotes: IWrapBombNote[];
    abstract obstacles: IWrapObstacle[];
    abstract sliders: IWrapSlider[];
    abstract burstSliders: IWrapBurstSlider[];
    abstract waypoints: IWrapWaypoint[];
    abstract basicEvents: IWrapEvent[];
    abstract colorBoostEvents: IWrapColorBoostEvent[];
    abstract lightColorEventBoxGroups: IWrapLightColorEventBoxGroup[];
    abstract lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup[];
    abstract lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroup[];
    abstract eventTypesWithKeywords: IWrapEventTypesWithKeywords;
    abstract useNormalEventsAsCompatibleEvents: boolean;
    abstract customData: ObtainCustomData<T>;

    clone<U extends this>(): U {
        return super.clone().setFileName(this.fileName) as U;
    }

    set fileName(name: LooseAutocomplete<GenericFileName>) {
        this._fileName = name.trim();
    }
    get fileName(): string {
        return this._fileName;
    }

    setFileName(fileName: LooseAutocomplete<GenericFileName>) {
        this.fileName = fileName;
        return this;
    }

    nps(duration: number): number {
        const notes = this.getNoteContainer().filter((n) => n.type !== 'bomb');
        return duration ? notes.length / duration : 0;
    }

    peak(beat: number, bpm: BeatPerMinute | number): number {
        let peakNPS = 0;
        let currentSectionStart = 0;
        bpm = typeof bpm === 'number' ? BeatPerMinute.create(bpm) : bpm;
        const notes = this.getNoteContainer().filter((n) => n.type !== 'bomb');

        for (let i = 0; i < notes.length; i++) {
            while (notes[i].data.time - notes[currentSectionStart].data.time > beat) {
                currentSectionStart++;
            }
            peakNPS = Math.max(
                peakNPS,
                (i - currentSectionStart + 1) / bpm.toRealTime(beat),
            );
        }

        return peakNPS;
    }

    getFirstInteractiveTime(): number {
        const notes = this.getNoteContainer().filter((n) => n.type !== 'bomb');
        let firstNoteTime = Number.MAX_VALUE;
        if (notes.length > 0) {
            firstNoteTime = notes[0].data.time;
        }
        const firstInteractiveObstacleTime = this.findFirstInteractiveObstacleTime();
        return Math.min(firstNoteTime, firstInteractiveObstacleTime);
    }

    getLastInteractiveTime(): number {
        const notes = this.getNoteContainer().filter((n) => n.type !== 'bomb');
        let lastNoteTime = 0;
        if (notes.length > 0) {
            lastNoteTime = notes[notes.length - 1].data.time;
        }
        const lastInteractiveObstacleTime = this.findLastInteractiveObstacleTime();
        return Math.max(lastNoteTime, lastInteractiveObstacleTime);
    }

    findFirstInteractiveObstacleTime(): number {
        for (let i = 0, len = this.obstacles.length; i < len; i++) {
            if (this.obstacles[i].isInteractive()) {
                return this.obstacles[i].time;
            }
        }
        return Number.MAX_VALUE;
    }

    findLastInteractiveObstacleTime(): number {
        let obstacleEnd = 0;
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            if (this.obstacles[i].isInteractive()) {
                obstacleEnd = Math.max(
                    obstacleEnd,
                    this.obstacles[i].time + this.obstacles[i].duration,
                );
            }
        }
        return obstacleEnd;
    }

    getNoteContainer(): NoteContainer[] {
        const nc: NoteContainer[] = [];
        this.colorNotes.forEach((n) => nc.push({ type: 'note', data: n }));
        this.sliders.forEach((s) => nc.push({ type: 'slider', data: s }));
        this.burstSliders.forEach((bs) => nc.push({ type: 'burstSlider', data: bs }));
        this.bombNotes.forEach((b) => nc.push({ type: 'bomb', data: b }));
        return nc.sort((a, b) => a.data.time - b.data.time);
    }

    getEventContainer(): EventContainer[] {
        const ec: EventContainer[] = [];
        this.basicEvents.forEach((be) => ec.push({ type: 'basicEvent', data: be }));
        this.colorBoostEvents.forEach((b) => ec.push({ type: 'boost', data: b }));
        return ec.sort((a, b) => a.data.time - b.data.time);
    }

    abstract addBPMEvents(...bpmEvents: PartialWrapper<IWrapBPMEvent>[]): void;
    abstract addRotationEvents(
        ...rotationEvents: PartialWrapper<IWrapRotationEvent>[]
    ): void;
    abstract addColorNotes(...colorNotes: PartialWrapper<IWrapColorNote>[]): void;
    abstract addBombNotes(...bombNotes: PartialWrapper<IWrapBombNote>[]): void;
    abstract addObstacles(...obstacles: PartialWrapper<IWrapObstacle>[]): void;
    abstract addSliders(...sliders: PartialWrapper<IWrapSlider>[]): void;
    abstract addBurstSliders(...burstSliders: PartialWrapper<IWrapBurstSlider>[]): void;
    abstract addWaypoints(...waypoints: PartialWrapper<IWrapWaypoint>[]): void;
    abstract addBasicEvents(...basicEvents: PartialWrapper<IWrapEvent>[]): void;
    abstract addColorBoostEvents(
        ...colorBoostEvents: PartialWrapper<IWrapColorBoostEvent>[]
    ): void;
    abstract addLightColorEventBoxGroups(
        ...lightColorEBGs: DeepPartialWrapper<IWrapLightColorEventBoxGroup>[]
    ): void;
    abstract addLightRotationEventBoxGroups(
        ...lightRotationEBGs: DeepPartialWrapper<IWrapLightRotationEventBoxGroup>[]
    ): void;
    abstract addLightTranslationEventBoxGroups(
        ...lightTranslationEBGs: DeepPartialWrapper<IWrapLightTranslationEventBoxGroup>[]
    ): void;
}