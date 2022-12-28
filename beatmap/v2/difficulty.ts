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
import { IWrapColorBoostEvent } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { PartialWrapper } from '../../types/utils.ts';
import { IWrapBombNote } from '../../types/beatmap/wrapper/bombNote.ts';
import { IWrapBPMEvent } from '../../types/beatmap/wrapper/bpmEvent.ts';
import { IWrapColorNote } from '../../types/beatmap/wrapper/colorNote.ts';
import { IWrapEvent } from '../../types/beatmap/wrapper/event.ts';
import { IWrapObstacle } from '../../types/beatmap/wrapper/obstacle.ts';
import { IWrapRotationEvent } from '../../types/beatmap/wrapper/rotationEvent.ts';
import { IWrapSlider } from '../../types/beatmap/wrapper/slider.ts';
import { IWrapWaypoint } from '../../types/beatmap/wrapper/waypoint.ts';

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
    protected constructor(data: Required<IDifficulty>) {
        super(data);
        this.version = '2.6.0';
        this.colorNotes = data._notes.map((obj) => Note.create(obj)[0]);
        this.sliders = data._sliders.map((obj) => Slider.create(obj)[0]);
        this.obstacles = data._obstacles.map((obj) => Obstacle.create(obj)[0]);
        this.basicEvents = data._events.map((obj) => Event.create(obj)[0]);
        this.waypoints = data._waypoints.map((obj) => Waypoint.create(obj)[0]);
        this.eventTypesWithKeywords = SpecialEventsKeywordFilters.create(
            data._specialEventsKeywordFilters,
        );
        this.customData = data._customData;
    }

    static create(data: Partial<IDifficulty> = {}): Difficulty {
        return new this({
            _version: '2.6.0',
            _notes: data._notes ?? [],
            _sliders: data._sliders ?? [],
            _obstacles: data._obstacles ?? [],
            _events: data._events ?? [],
            _waypoints: data._waypoints ?? [],
            _specialEventsKeywordFilters: data._specialEventsKeywordFilters ?? {
                _keywords: [],
            },
            _customData: data._customData ?? {},
        });
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

    addBPMEvents(...events: PartialWrapper<IWrapBPMEvent>[]): void;
    addBPMEvents(...events: Partial<IEventBPMChange>[]): void;
    addBPMEvents(
        ...events: (
            & Partial<IEventBPMChange>
            & PartialWrapper<IWrapBPMEvent<Required<IEventBPMChange>>>
        )[]
    ): void;
    addBPMEvents(
        ...events: (
            & Partial<IEventBPMChange>
            & PartialWrapper<IWrapBPMEvent<Required<IEventBPMChange>>>
        )[]
    ): void {
        this.basicEvents.push(
            ...events.map((bpme) => {
                return bpme instanceof Event
                    ? bpme
                    : Event.create({ ...bpme, type: 100, value: bpme.bpm })[0];
            }),
        );
    }

    addRotationEvents(...events: PartialWrapper<IWrapRotationEvent>[]): void;
    addRotationEvents(...events: Partial<IEventLaneRotation>[]): void;
    addRotationEvents(
        ...events: (
            & Partial<IEventLaneRotation>
            & PartialWrapper<IWrapRotationEvent<Required<IEventLaneRotation>>>
        )[]
    ): void;
    addRotationEvents(
        ...events: (
            & Partial<IEventLaneRotation>
            & PartialWrapper<IWrapRotationEvent<Required<IEventLaneRotation>>>
        )[]
    ): void {
        this.basicEvents.push(
            ...events.map((re) =>
                re instanceof Event ? re : Event.create({
                    ...re,
                    type: typeof re.executionTime === 'number'
                        ? re.executionTime === 0 ? 14 : 15
                        : re._type,
                })[0]
            ),
        );
        logger.warn('This may not work correctly');
    }

    addColorNotes(
        ...colorNotes: PartialWrapper<IWrapColorNote<Required<INote>>>[]
    ): void;
    addColorNotes(...colorNotes: Partial<INote>[]): void;
    addColorNotes(
        ...colorNotes: (
            & Partial<INote>
            & PartialWrapper<IWrapColorNote<Required<INote>>>
        )[]
    ): void;
    addColorNotes(
        ...colorNotes: (
            & Partial<INote>
            & PartialWrapper<IWrapColorNote<Required<INote>>>
        )[]
    ): void {
        this.colorNotes.push(
            ...colorNotes.map((
                cn,
            ) => (cn instanceof Note ? cn : Note.create(cn)[0])),
        );
    }

    addBombNotes(
        ...notes: PartialWrapper<IWrapBombNote<Required<INote>>>[]
    ): void;
    addBombNotes(...notes: Partial<INote>[]): void;
    addBombNotes(
        ...notes: (Partial<INote> & PartialWrapper<IWrapBombNote<Required<INote>>>)[]
    ): void;
    addBombNotes(
        ...notes: (Partial<INote> & PartialWrapper<IWrapBombNote<Required<INote>>>)[]
    ): void {
        this.colorNotes.push(
            ...notes.map((bn) => bn instanceof Note ? bn : Note.create({ ...bn, type: 3 })[0]),
        );
    }

    addObstacles(
        ...obstacles: PartialWrapper<IWrapObstacle<Required<IObstacle>>>[]
    ): void;
    addObstacles(...obstacles: Partial<IObstacle>[]): void;
    addObstacles(
        ...obstacles: (
            & Partial<IObstacle>
            & PartialWrapper<IWrapObstacle<Required<IObstacle>>>
        )[]
    ): void;
    addObstacles(
        ...obstacles: (
            & Partial<IObstacle>
            & PartialWrapper<IWrapObstacle<Required<IObstacle>>>
        )[]
    ): void {
        this.obstacles.push(
            ...obstacles.map((
                o,
            ) => (o instanceof Obstacle ? o : Obstacle.create(o)[0])),
        );
    }

    addSliders(
        ...sliders: PartialWrapper<IWrapSlider<Required<ISlider>>>[]
    ): void;
    addSliders(...sliders: Partial<ISlider>[]): void;
    addSliders(
        ...sliders: (
            & Partial<ISlider>
            & PartialWrapper<IWrapSlider<Required<ISlider>>>
        )[]
    ): void;
    addSliders(
        ...sliders: (
            & Partial<ISlider>
            & PartialWrapper<IWrapSlider<Required<ISlider>>>
        )[]
    ): void {
        this.sliders.push(
            ...sliders.map((
                s,
            ) => (s instanceof Slider ? s : Slider.create(s)[0])),
        );
    }

    addBurstSliders(..._: never[]): void {
        logger.warn('Burst Slider does not exist in beatmap V2');
    }

    addWaypoints(
        ...waypoints: PartialWrapper<IWrapWaypoint<Required<IWaypoint>>>[]
    ): void;
    addWaypoints(...waypoints: Partial<IWaypoint>[]): void;
    addWaypoints(
        ...waypoints: (
            & Partial<IWaypoint>
            & PartialWrapper<IWrapWaypoint<Required<IWaypoint>>>
        )[]
    ): void;
    addWaypoints(
        ...waypoints: (
            & Partial<IWaypoint>
            & PartialWrapper<IWrapWaypoint<Required<IWaypoint>>>
        )[]
    ): void {
        this.waypoints.push(
            ...waypoints.map((
                w,
            ) => (w instanceof Waypoint ? w : Waypoint.create(w)[0])),
        );
    }

    addBasicEvents(
        ...basicEvents: PartialWrapper<IWrapEvent<Required<IEvent>>>[]
    ): void;
    addBasicEvents(...basicEvents: Partial<IEvent>[]): void;
    addBasicEvents(
        ...basicEvents: (
            & Partial<IEvent>
            & PartialWrapper<IWrapEvent<Required<IEvent>>>
        )[]
    ): void;
    addBasicEvents(
        ...basicEvents: (
            & Partial<IEvent>
            & PartialWrapper<IWrapEvent<Required<IEvent>>>
        )[]
    ): void {
        this.basicEvents.push(
            ...basicEvents.map((
                be,
            ) => (be instanceof Event ? be : Event.create(be)[0])),
        );
    }

    addColorBoostEvents(
        ...basicEvents: PartialWrapper<
            IWrapColorBoostEvent<Required<IEventBoost>>
        >[]
    ): void;
    addColorBoostEvents(...basicEvents: Partial<IEventBoost>[]): void;
    addColorBoostEvents(
        ...basicEvents: (
            & Partial<IEventBoost>
            & PartialWrapper<IWrapColorBoostEvent<Required<IEventBoost>>>
        )[]
    ): void;
    addColorBoostEvents(
        ...basicEvents: (
            & Partial<IEventBoost>
            & PartialWrapper<IWrapColorBoostEvent<Required<IEventBoost>>>
        )[]
    ): void {
        this.basicEvents.push(
            ...basicEvents.map((e) =>
                e instanceof Event ? e : Event.create({ ...e, value: e.toggle ? 1 : e._value })[0]
            ),
        );
    }

    addLightColorEventBoxGroups(..._: never[]): void {
        logger.warn('Light Color Event Box Group does not exist in beatmap V2');
    }

    addLightRotationEventBoxGroups(..._: never[]): void {
        logger.warn(
            'Light Rotation Event Box Group does not exist in beatmap V2',
        );
    }

    addLightTranslationEventBoxGroups(..._: never[]): void {
        logger.warn(
            'Light Translation Event Box Group does not exist in beatmap V2',
        );
    }

    isValid(): boolean {
        throw new Error('Method not implemented.');
    }
}
