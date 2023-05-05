import { IDifficulty } from '../../types/beatmap/v2/difficulty.ts';
import { Note } from './note.ts';
import { Slider } from './slider.ts';
import { Obstacle } from './obstacle.ts';
import { Event } from './event.ts';
import { Waypoint } from './waypoint.ts';
import { SpecialEventsKeywordFilters } from './specialEventsKeywordFilters.ts';
import { deepCopy } from '../../utils/misc.ts';
import { INote } from '../../types/beatmap/v2/note.ts';
import { IObstacle } from '../../types/beatmap/v2/obstacle.ts';
import {
    IEvent,
    IEventBoost,
    IEventBPMChange,
    IEventLaneRotation,
} from '../../types/beatmap/v2/event.ts';
import { IWaypoint } from '../../types/beatmap/v2/waypoint.ts';
import { ISlider } from '../../types/beatmap/v2/slider.ts';
import { WrapDifficulty } from '../wrapper/difficulty.ts';
import logger from '../../logger.ts';
import { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import { IWrapBPMEventAttribute } from '../../types/beatmap/wrapper/bpmEvent.ts';
import { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';
import { IWrapSliderAttribute } from '../../types/beatmap/wrapper/slider.ts';
import { IWrapWaypointAttribute } from '../../types/beatmap/wrapper/waypoint.ts';

/** Difficulty beatmap v2 class object. */
export class Difficulty extends WrapDifficulty<Required<IDifficulty>> {
    version: `2.${0 | 2 | 4 | 5 | 6}.0`;
    bpmEvents: never[] = [];
    rotationEvents: never[] = [];
    colorNotes: Note[];
    bombNotes: never[] = [];
    obstacles: Obstacle[];
    sliders: Slider[];
    burstSliders: never[] = [];
    waypoints: Waypoint[];
    basicEvents: Event[];
    colorBoostEvents: never[] = [];
    lightColorEventBoxGroups: never[] = [];
    lightRotationEventBoxGroups: never[] = [];
    lightTranslationEventBoxGroups: never[] = [];
    eventTypesWithKeywords: SpecialEventsKeywordFilters;
    useNormalEventsAsCompatibleEvents = true;

    constructor(data: Partial<IDifficulty> = {}) {
        super({
            _version: '2.6.0',
            _notes: data?._notes ?? [],
            _sliders: data?._sliders ?? [],
            _obstacles: data?._obstacles ?? [],
            _events: data?._events ?? [],
            _waypoints: data?._waypoints ?? [],
            _specialEventsKeywordFilters: data?._specialEventsKeywordFilters ?? {
                _keywords: [],
            },
            _customData: data?._customData ?? {},
        });

        this.version = '2.6.0';
        this.colorNotes = this.data._notes.map((obj) => new Note(obj));
        this.sliders = this.data._sliders.map((obj) => new Slider(obj));
        this.obstacles = this.data._obstacles.map((obj) => new Obstacle(obj));
        this.basicEvents = this.data._events.map((obj) => new Event(obj));
        this.waypoints = this.data._waypoints.map((obj) => new Waypoint(obj));
        this.eventTypesWithKeywords = new SpecialEventsKeywordFilters(
            this.data._specialEventsKeywordFilters,
        );
        this.customData = this.data._customData;
    }

    static create(data: Partial<IDifficulty> = {}): Difficulty {
        return new this(data);
    }

    toJSON(): Required<IDifficulty> {
        return {
            _version: '2.6.0',
            _notes: this.colorNotes.map((obj) => obj.toJSON()),
            _sliders: this.sliders.map((obj) => obj.toJSON()),
            _obstacles: this.obstacles.map((obj) => obj.toJSON()),
            _events: this.basicEvents.map((obj) => obj.toJSON()),
            _waypoints: this.waypoints.map((obj) => obj.toJSON()),
            _specialEventsKeywordFilters: this.eventTypesWithKeywords.toJSON(),
            _customData: deepCopy(this.customData),
        };
    }

    get customData(): NonNullable<IDifficulty['_customData']> {
        return this.data._customData;
    }
    set customData(value: NonNullable<IDifficulty['_customData']>) {
        this.data._customData = value;
    }

    reparse(keepRef?: boolean): void {
        this.colorNotes = this.colorNotes.map((obj) => this.createOrKeep(Note, obj, keepRef));
        this.obstacles = this.obstacles.map((obj) => this.createOrKeep(Obstacle, obj, keepRef));
        this.basicEvents = this.basicEvents.map((obj) => this.createOrKeep(Event, obj, keepRef));
        this.waypoints = this.waypoints.map((obj) => this.createOrKeep(Waypoint, obj, keepRef));
        this.sliders = this.sliders.map((obj) => this.createOrKeep(Slider, obj, keepRef));
        this.eventTypesWithKeywords = new SpecialEventsKeywordFilters(this.eventTypesWithKeywords);
    }

    addBPMEvents(...events: Partial<IWrapBPMEventAttribute>[]): void;
    addBPMEvents(...events: Partial<IEventBPMChange>[]): void;
    addBPMEvents(
        ...events: (
            & Partial<IEventBPMChange>
            & Partial<IWrapBPMEventAttribute<Required<IEventBPMChange>>>
        )[]
    ): void;
    addBPMEvents(
        ...events: (
            & Partial<IEventBPMChange>
            & Partial<IWrapBPMEventAttribute<Required<IEventBPMChange>>>
        )[]
    ): void {
        this.basicEvents.push(
            ...events.map((obj) => {
                return obj instanceof Event
                    ? obj
                    : new Event({ ...obj, type: 100, value: obj.bpm });
            }),
        );
    }

    addRotationEvents(...events: Partial<IWrapRotationEventAttribute>[]): void;
    addRotationEvents(...events: Partial<IEventLaneRotation>[]): void;
    addRotationEvents(
        ...events: (
            & Partial<IEventLaneRotation>
            & Partial<IWrapRotationEventAttribute<Required<IEventLaneRotation>>>
        )[]
    ): void;
    addRotationEvents(
        ...events: (
            & Partial<IEventLaneRotation>
            & Partial<IWrapRotationEventAttribute<Required<IEventLaneRotation>>>
        )[]
    ): void {
        this.basicEvents.push(
            ...events.map((obj) =>
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

    addColorNotes(...colorNotes: Partial<IWrapColorNoteAttribute<Required<INote>>>[]): void;
    addColorNotes(...colorNotes: Partial<INote>[]): void;
    addColorNotes(
        ...colorNotes: (Partial<INote> & Partial<IWrapColorNoteAttribute<Required<INote>>>)[]
    ): void;
    addColorNotes(
        ...colorNotes: (Partial<INote> & Partial<IWrapColorNoteAttribute<Required<INote>>>)[]
    ): void {
        this.colorNotes.push(
            ...colorNotes.map((obj) => (obj instanceof Note ? obj : new Note(obj))),
        );
    }

    addBombNotes(...notes: Partial<IWrapBombNoteAttribute<Required<INote>>>[]): void;
    addBombNotes(...notes: Partial<INote>[]): void;
    addBombNotes(
        ...notes: (Partial<INote> & Partial<IWrapBombNoteAttribute<Required<INote>>>)[]
    ): void;
    addBombNotes(
        ...notes: (Partial<INote> & Partial<IWrapBombNoteAttribute<Required<INote>>>)[]
    ): void {
        this.colorNotes.push(
            ...notes.map((obj) => (obj instanceof Note ? obj : new Note({ ...obj, type: 3 }))),
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

    addBurstSliders(..._: never[]): void {
        logger.warn('Burst Slider does not exist in beatmap V2');
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

    addBasicEvents(...basicEvents: Partial<IWrapEventAttribute<Required<IEvent>>>[]): void;
    addBasicEvents(...basicEvents: Partial<IEvent>[]): void;
    addBasicEvents(
        ...basicEvents: (Partial<IEvent> & Partial<IWrapEventAttribute<Required<IEvent>>>)[]
    ): void;
    addBasicEvents(
        ...basicEvents: (Partial<IEvent> & Partial<IWrapEventAttribute<Required<IEvent>>>)[]
    ): void {
        this.basicEvents.push(
            ...basicEvents.map((obj) => (obj instanceof Event ? obj : new Event(obj))),
        );
    }

    addColorBoostEvents(
        ...basicEvents: Partial<IWrapColorBoostEventAttribute<Required<IEventBoost>>>[]
    ): void;
    addColorBoostEvents(...basicEvents: Partial<IEventBoost>[]): void;
    addColorBoostEvents(
        ...basicEvents: (
            & Partial<IEventBoost>
            & Partial<IWrapColorBoostEventAttribute<Required<IEventBoost>>>
        )[]
    ): void;
    addColorBoostEvents(
        ...basicEvents: (
            & Partial<IEventBoost>
            & Partial<IWrapColorBoostEventAttribute<Required<IEventBoost>>>
        )[]
    ): void {
        this.basicEvents.push(
            ...basicEvents.map((obj) =>
                obj instanceof Event
                    ? obj
                    : new Event({ ...obj, value: obj.toggle ? 1 : obj._value })
            ),
        );
    }

    addLightColorEventBoxGroups(..._: never[]): void {
        logger.warn('Light Color Event Box Group does not exist in beatmap V2');
    }

    addLightRotationEventBoxGroups(..._: never[]): void {
        logger.warn('Light Rotation Event Box Group does not exist in beatmap V2');
    }

    addLightTranslationEventBoxGroups(..._: never[]): void {
        logger.warn('Light Translation Event Box Group does not exist in beatmap V2');
    }

    isValid(): boolean {
        return (
            this.colorNotes.every((obj) => this.checkClass(Note, obj)) ||
            this.obstacles.every((obj) => this.checkClass(Obstacle, obj)) ||
            this.basicEvents.every((obj) => this.checkClass(Event, obj)) ||
            this.waypoints.every((obj) => this.checkClass(Waypoint, obj)) ||
            this.sliders.every((obj) => this.checkClass(Slider, obj)) ||
            this.eventTypesWithKeywords instanceof SpecialEventsKeywordFilters
        );
    }
}
