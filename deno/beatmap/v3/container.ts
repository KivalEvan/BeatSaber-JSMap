import { EventContainer, NoteContainer } from './types/container.ts';
import { DifficultyData } from './types/difficulty.ts';

/** Get container of color notes, sliders, burst sliders, and bombs.
 * ```ts
 * const noteCountainer = getNoteContainer(difficultyData);
 * ```
 */
export const getNoteContainer = (difficultyData: DifficultyData): NoteContainer => {
    const nc: NoteContainer = [];
    difficultyData.colorNotes.forEach((n) => nc.push({ type: 'note', data: n }));
    difficultyData.sliders.forEach((s) => nc.push({ type: 'slider', data: s }));
    difficultyData.burstSliders.forEach((bs) =>
        nc.push({ type: 'burstSlider', data: bs })
    );
    difficultyData.bombNotes.forEach((b) => nc.push({ type: 'bomb', data: b }));
    return nc.sort((a, b) => a.data.time - b.data.time);
};

/** Get container of basic events and boost events.
 * ```ts
 * const noteCountainer = getNoteContainer(difficultyData);
 * ```
 */
export const getEventContainer = (difficultyData: DifficultyData): EventContainer => {
    const ec: EventContainer = [];
    difficultyData.basicBeatmapEvents.forEach((be) =>
        ec.push({ type: 'basicEvent', data: be })
    );
    difficultyData.colorBoostBeatmapEvents.forEach((b) =>
        ec.push({ type: 'boost', data: b })
    );
    return ec.sort((a, b) => a.data.time - b.data.time);
};
