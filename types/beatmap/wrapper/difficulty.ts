import { IWrapBPMEvent } from './bpmEvent.ts';
import { IWrapRotationEvent } from './rotationEvent.ts';
import { IWrapColorNote } from './colorNote.ts';
import { IWrapBombNote } from './bombNote.ts';
import { IWrapObstacle } from './obstacle.ts';
import { IWrapSlider } from './slider.ts';
import { IWrapBurstSlider } from './burstSlider.ts';
import { IWrapWaypoint } from './waypoint.ts';
import { IWrapEvent } from './event.ts';
import { IWrapColorBoostEvent } from './colorBoostEvent.ts';
import { IWrapLightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { IWrapLightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { IWrapLightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { IWrapEventTypesWithKeywords } from './eventTypesWithKeywords.ts';
import { IWrapBaseItem } from './baseItem.ts';
import { Version } from '../shared/version.ts';
import { DeepPartialWrapper, LooseAutocomplete, PartialWrapper } from '../../utils.ts';
import { GenericFileName } from '../shared/info.ts';
import { EventContainer, NoteContainer } from './container.ts';
import { BeatPerMinute } from '../../../beatmap/shared/bpm.ts';

export interface IWrapDifficulty<
    T extends Record<keyof T, unknown> = Record<string, unknown>,
> extends IWrapBaseItem<T> {
    version: Version;
    bpmEvents: IWrapBPMEvent[];
    rotationEvents: IWrapRotationEvent[];
    colorNotes: IWrapColorNote[];
    bombNotes: IWrapBombNote[];
    obstacles: IWrapObstacle[];
    sliders: IWrapSlider[];
    burstSliders: IWrapBurstSlider[];
    waypoints: IWrapWaypoint[];
    basicEvents: IWrapEvent[];
    colorBoostEvents: IWrapColorBoostEvent[];
    lightColorEventBoxGroups: IWrapLightColorEventBoxGroup<
        IWrapLightColorEventBoxGroup['data']
    >[];
    lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup<
        IWrapLightRotationEventBoxGroup['data']
    >[];
    lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroup<
        IWrapLightTranslationEventBoxGroup['data']
    >[];
    eventTypesWithKeywords: IWrapEventTypesWithKeywords<
        IWrapEventTypesWithKeywords['data']
    >;
    useNormalEventsAsCompatibleEvents: boolean;

    fileName: string;
    setFileName(fileName: LooseAutocomplete<GenericFileName>): this;

    /** Calculate note per second.
     * ```ts
     * const nps = difficulty.nps(Difficulty, 10);
     * ```
     * ---
     * **Note:** Duration can be either in any time type.
     */
    nps(duration: number): number;

    /** Calculate the peak by rolling average.
     * ```ts
     * const peakNPS = difficulty.peak(Difficulty, 10, BPM ?? 128);
     * ```
     */
    peak(beat: number, bpm: BeatPerMinute | number): number;

    /** Get first interactible object beat time in beatmap.
     * ```ts
     * const firstInteractiveTime = difficulty.getFirstInteractiveTime(Difficulty);
     * ```
     */
    getFirstInteractiveTime(): number;

    /** Get last interactible object beat time in beatmap.
     * ```ts
     * const lastInteractiveTime = difficulty.getLastInteractiveTime(Difficulty);
     * ```
     */
    getLastInteractiveTime(): number;

    /** Get first interactible obstacle beat time in beatmap.
     * ```ts
     * const firstInteractiveObstacleTime = difficulty.findFirstInteractiveObstacleTime(obstacles);
     * ```
     */
    findFirstInteractiveObstacleTime(): number;

    /** Get last interactible obstacle beat time in beatmap.
     * ```ts
     * const lastInteractiveObstacleTime = difficulty.findLastInteractiveObstacleTime(obstacles);
     * ```
     */
    findLastInteractiveObstacleTime(): number;

    /** Get container of color notes, sliders, burst sliders, and bombs (in order).
     * ```ts
     * const noteCountainer = getNoteContainer(Difficulty);
     * ```
     */
    getNoteContainer(): NoteContainer[];

    /** Get container of basic events and boost events.
     * ```ts
     * const noteCountainer = getNoteContainer(Difficulty);
     * ```
     */
    getEventContainer(): EventContainer[];

    addBPMEvents(...bpmEvents: Partial<IWrapBPMEvent>[]): void;
    addRotationEvents(...rotationEvents: PartialWrapper<IWrapRotationEvent>[]): void;
    addColorNotes(...colorNotes: PartialWrapper<IWrapColorNote>[]): void;
    addBombNotes(...bombNotes: PartialWrapper<IWrapBombNote>[]): void;
    addObstacles(...obstacles: PartialWrapper<IWrapObstacle>[]): void;
    addSliders(...sliders: PartialWrapper<IWrapSlider>[]): void;
    addBurstSliders(...burstSliders: PartialWrapper<IWrapBurstSlider>[]): void;
    addWaypoints(...waypoints: PartialWrapper<IWrapWaypoint>[]): void;
    addBasicEvents(...basicEvents: PartialWrapper<IWrapEvent>[]): void;
    addColorBoostEvents(
        ...colorBoostEvents: PartialWrapper<IWrapColorBoostEvent>[]
    ): void;
    addLightColorEventBoxGroups(
        ...lightColorEBGs: DeepPartialWrapper<IWrapLightColorEventBoxGroup>[]
    ): void;
    addLightRotationEventBoxGroups(
        ...lightRotationEBGs: DeepPartialWrapper<IWrapLightRotationEventBoxGroup>[]
    ): void;
    addLightTranslationEventBoxGroups(
        ...lightTranslationEBGs: DeepPartialWrapper<IWrapLightTranslationEventBoxGroup>[]
    ): void;
}
