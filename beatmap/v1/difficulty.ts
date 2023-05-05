import { IDifficulty } from '../../types/beatmap/v1/difficulty.ts';
import { Note } from './note.ts';
import { Obstacle } from './obstacle.ts';
import { Event } from './event.ts';
import { INote } from '../../types/beatmap/v1/note.ts';
import { IObstacle } from '../../types/beatmap/v1/obstacle.ts';
import { IEvent } from '../../types/beatmap/v1/event.ts';
import { WrapDifficulty } from '../wrapper/difficulty.ts';
import logger from '../../logger.ts';
import { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';

/** Difficulty beatmap v1 class object. */
export class Difficulty extends WrapDifficulty<Required<IDifficulty>> {
    version: '1.5.0';
    bpmEvents: never[] = [];
    rotationEvents: never[] = [];
    colorNotes: Note[];
    bombNotes: never[] = [];
    obstacles: Obstacle[];
    sliders: never[] = [];
    burstSliders: never[] = [];
    waypoints: never[] = [];
    basicEvents: Event[];
    colorBoostEvents: never[] = [];
    lightColorEventBoxGroups: never[] = [];
    lightRotationEventBoxGroups: never[] = [];
    lightTranslationEventBoxGroups: never[] = [];
    eventTypesWithKeywords!: never;
    useNormalEventsAsCompatibleEvents = true;

    beatsPerMinute: number;
    beatsPerBar: number;
    shuffle: number;
    shufflePeriod: number;
    noteJumpSpeed: number;
    noteJumpStartBeatOffset: number;
    time: number;
    BPMChanges;
    bookmarks;

    constructor(data: Partial<IDifficulty> = {}) {
        super({
            _version: '1.5.0',
            _beatsPerMinute: data._beatsPerMinute ?? 120,
            _beatsPerBar: data._beatsPerBar ?? 4,
            _shuffle: data._shuffle ?? 0,
            _shufflePeriod: data._shufflePeriod ?? 0.5,
            _noteJumpSpeed: data._noteJumpSpeed ?? 0,
            _noteJumpStartBeatOffset: data._noteJumpStartBeatOffset ?? 0,
            _notes: data._notes ?? [],
            _obstacles: data._obstacles ?? [],
            _events: data._events ?? [],
            _time: data._time ?? 0,
            _BPMChanges: data._BPMChanges ?? [],
            _bookmarks: data._bookmarks ?? [],
        });

        this.version = '1.5.0';
        this.beatsPerMinute = this.data._beatsPerMinute;
        this.beatsPerBar = this.data._beatsPerBar;
        this.shuffle = this.data._shuffle;
        this.shufflePeriod = this.data._shufflePeriod;
        this.noteJumpSpeed = this.data._noteJumpSpeed;
        this.noteJumpStartBeatOffset = this.data._noteJumpStartBeatOffset;
        this.time = this.data._time;
        this.BPMChanges = this.data._BPMChanges;
        this.bookmarks = this.data._bookmarks;
        this.colorNotes = this.data._notes.map((obj) => new Note(obj));
        this.obstacles = this.data._obstacles.map((obj) => new Obstacle(obj));
        this.basicEvents = this.data._events.map((obj) => new Event(obj));
    }

    static create(data: Partial<IDifficulty> = {}): Difficulty {
        return new this(data);
    }

    toJSON(): Required<IDifficulty> {
        return {
            _version: '1.5.0',
            _beatsPerMinute: this.beatsPerMinute,
            _beatsPerBar: this.beatsPerBar,
            _shuffle: this.shuffle,
            _shufflePeriod: this.shufflePeriod,
            _noteJumpSpeed: this.noteJumpSpeed,
            _noteJumpStartBeatOffset: this.noteJumpStartBeatOffset,
            _notes: this.colorNotes.map((obj) => obj.toJSON()),
            _obstacles: this.obstacles.map((obj) => obj.toJSON()),
            _events: this.basicEvents.map((obj) => obj.toJSON()),
            _time: this.time,
            _BPMChanges: this.BPMChanges,
            _bookmarks: this.bookmarks,
        };
    }

    get customData(): Record<string, never> {
        return {};
    }
    set customData(_: Record<string, never>) {
        logger.warn('Custom data does not exist in beatmap V1');
    }

    addBPMEvents(..._: never[]): void {
        logger.warn('BPM Event does not exist in beatmap V1');
    }

    addRotationEvents(...data: Partial<IWrapRotationEventAttribute>[]): void;
    addRotationEvents(...data: Partial<IEvent>[]): void;
    addRotationEvents(
        ...data: (Partial<IEvent> & Partial<IWrapRotationEventAttribute<Required<IEvent>>>)[]
    ): void;
    addRotationEvents(
        ...data: (Partial<IEvent> & Partial<IWrapRotationEventAttribute<Required<IEvent>>>)[]
    ): void {
        this.basicEvents.push(
            ...data.map((obj) =>
                obj instanceof Event ? obj : new Event({
                    ...obj,
                    type: typeof obj.executionTime === 'number'
                        ? obj.executionTime === 0 ? 14 : 15
                        : obj._type,
                })
            ),
        );
        logger.warn('This may not work correctly');
    }

    addColorNotes(...data: Partial<IWrapColorNoteAttribute<Required<INote>>>[]): void;
    addColorNotes(...data: Partial<INote>[]): void;
    addColorNotes(
        ...data: (Partial<INote> & Partial<IWrapColorNoteAttribute<Required<INote>>>)[]
    ): void;
    addColorNotes(
        ...data: (Partial<INote> & Partial<IWrapColorNoteAttribute<Required<INote>>>)[]
    ): void {
        this.colorNotes.push(...data.map((obj) => (obj instanceof Note ? obj : new Note(obj))));
    }

    addBombNotes(...data: Partial<IWrapBombNoteAttribute<Required<INote>>>[]): void;
    addBombNotes(...data: Partial<INote>[]): void;
    addBombNotes(
        ...data: (Partial<INote> & Partial<IWrapBombNoteAttribute<Required<INote>>>)[]
    ): void;
    addBombNotes(
        ...data: (Partial<INote> & Partial<IWrapBombNoteAttribute<Required<INote>>>)[]
    ): void {
        this.colorNotes.push(
            ...data.map((obj) => (obj instanceof Note ? obj : new Note({ ...obj, type: 3 }))),
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

    addSliders(..._: never[]): void {
        logger.warn('Slider does not exist in beatmap V1');
    }

    addBurstSliders(..._: never[]): void {
        logger.warn('Burst Slider does not exist in beatmap V1');
    }

    addWaypoints(..._: never[]): void {
        logger.warn('Waypoint does not exist in beatmap V1');
    }

    addBasicEvents(...data: Partial<IWrapEventAttribute<Required<IEvent>>>[]): void;
    addBasicEvents(...data: Partial<IEvent>[]): void;
    addBasicEvents(
        ...data: (Partial<IEvent> & Partial<IWrapEventAttribute<Required<IEvent>>>)[]
    ): void;
    addBasicEvents(
        ...data: (Partial<IEvent> & Partial<IWrapEventAttribute<Required<IEvent>>>)[]
    ): void {
        this.basicEvents.push(...data.map((obj) => (obj instanceof Event ? obj : new Event(obj))));
    }

    addColorBoostEvents(...data: Partial<IWrapColorBoostEventAttribute<Required<IEvent>>>[]): void;
    addColorBoostEvents(...data: Partial<IEvent>[]): void;
    addColorBoostEvents(
        ...data: (Partial<IEvent> & Partial<IWrapColorBoostEventAttribute<Required<IEvent>>>)[]
    ): void;
    addColorBoostEvents(
        ...data: (Partial<IEvent> & Partial<IWrapColorBoostEventAttribute<Required<IEvent>>>)[]
    ): void {
        this.basicEvents.push(
            ...data.map((obj) =>
                obj instanceof Event
                    ? obj
                    : new Event({ ...obj, value: obj.toggle ? 1 : obj._value })
            ),
        );
    }

    addLightColorEventBoxGroups(..._: never[]): void {
        logger.warn('Light Color Event Box Group does not exist in beatmap V1');
    }

    addLightRotationEventBoxGroups(..._: never[]): void {
        logger.warn('Light Rotation Event Box Group does not exist in beatmap V1');
    }

    addLightTranslationEventBoxGroups(..._: never[]): void {
        logger.warn('Light Translation Event Box Group does not exist in beatmap V1');
    }

    isValid(): boolean {
        throw new Error('Method not implemented.');
    }
}
