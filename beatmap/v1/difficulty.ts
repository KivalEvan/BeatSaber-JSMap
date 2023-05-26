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

function tag(name: string): string[] {
    return ['beatmap', 'v1', 'difficulty', name];
}

/** Difficulty beatmap v1 class object. */
export class Difficulty extends WrapDifficulty<Required<IDifficulty>> {
    version: '1.5.0';
    bpmEvents: never[] = [];
    rotationEvents: never[] = [];
    colorNotes: Note[];
    bombNotes: never[] = [];
    obstacles: Obstacle[];
    arcs: never[] = [];
    chains: never[] = [];
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
        super();

        this.version = '1.5.0';
        this.beatsPerMinute = data._beatsPerMinute ?? 120;
        this.beatsPerBar = data._beatsPerBar ?? 4;
        this.shuffle = data._shuffle ?? 0;
        this.shufflePeriod = data._shufflePeriod ?? 0;
        this.noteJumpSpeed = data._noteJumpSpeed ?? 0;
        this.noteJumpStartBeatOffset = data._noteJumpStartBeatOffset ?? 0;
        this.colorNotes = (data._notes ?? []).map((obj) => new Note(obj));
        this.obstacles = (data._obstacles ?? []).map((obj) => new Obstacle(obj));
        this.basicEvents = (data._events ?? []).map((obj) => new Event(obj));
        this.time = data._time ?? 0;
        this.BPMChanges = data._BPMChanges ?? [];
        this.bookmarks = data._bookmarks ?? [];
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
        logger.tWarn(tag('customData'), 'Custom data does not exist in beatmap V1');
    }

    reparse(keepRef?: boolean): void {
        this.colorNotes = this.colorNotes.map((obj) => this.createOrKeep(Note, obj, keepRef));
        this.obstacles = this.obstacles.map((obj) => this.createOrKeep(Obstacle, obj, keepRef));
        this.basicEvents = this.basicEvents.map((obj) => this.createOrKeep(Event, obj, keepRef));
    }

    addBPMEvents(..._: never[]): void {
        logger.tWarn(tag('addBPMEvents'), 'BPM Event does not exist in beatmap V1');
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
        logger.tWarn(tag('addRotationEvents'), 'This may not work correctly');
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

    addArcs(..._: never[]): void {
        logger.tWarn(tag('addArcs'), 'Arc does not exist in beatmap V1');
    }

    addChains(..._: never[]): void {
        logger.tWarn(tag('addChains'), 'Chain does not exist in beatmap V1');
    }

    addWaypoints(..._: never[]): void {
        logger.tWarn(tag('addWaypoints'), 'Waypoint does not exist in beatmap V1');
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
        logger.tWarn(
            tag('addLightColorEventBoxGroups'),
            'Light Color Event Box Group does not exist in beatmap V1',
        );
    }

    addLightRotationEventBoxGroups(..._: never[]): void {
        logger.tWarn(
            tag('addLightRotationEventBoxGroups'),
            'Light Rotation Event Box Group does not exist in beatmap V1',
        );
    }

    addLightTranslationEventBoxGroups(..._: never[]): void {
        logger.tWarn(
            tag('addLightTranslationEventBoxGroups'),
            'Light Translation Event Box Group does not exist in beatmap V1',
        );
    }

    isValid(): boolean {
        return (
            this.colorNotes.every((obj) => this.checkClass(Note, obj)) ||
            this.obstacles.every((obj) => this.checkClass(Obstacle, obj)) ||
            this.basicEvents.every((obj) => this.checkClass(Event, obj))
        );
    }
}
