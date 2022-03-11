import { BeatPerMinute } from '../shared/bpm.ts';
import { getNoteContainer } from './container.ts';
import { DifficultyData } from './types/difficulty.ts';
import { Obstacle } from './types/obstacle.ts';

/** Calculate note per second.
 * ```ts
 * const nps = difficulty.nps(difficultyData, 10);
 * ```
 * ---
 * **Note:** Duration can be either in any time type.
 */
export const nps = (data: DifficultyData, duration: number): number => {
    const notes = getNoteContainer(data).filter((n) => n.type !== 'bomb');
    return duration ? notes.length / duration : 0;
};

/** Calculate the peak by rolling average.
 * ```ts
 * const peakNPS = difficulty.peak(difficultyData, 10, BPM ?? 128);
 * ```
 */
export const peak = (
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
export const getFirstInteractiveTime = (data: DifficultyData): number => {
    const notes = getNoteContainer(data).filter((n) => n.type !== 'bomb');
    let firstNoteTime = Number.MAX_VALUE;
    if (notes.length > 0) {
        firstNoteTime = notes[0].data.time;
    }
    const firstInteractiveObstacleTime = findFirstInteractiveObstacleTime(
        data.obstacles
    );
    return Math.min(firstNoteTime, firstInteractiveObstacleTime);
};

/** Get last interactible object beat time in beatmap.
 * ```ts
 * const lastInteractiveTime = difficulty.getLastInteractiveTime(difficultyData);
 * ```
 */
export const getLastInteractiveTime = (data: DifficultyData): number => {
    const notes = getNoteContainer(data).filter((n) => n.type !== 'bomb');
    let lastNoteTime = 0;
    if (notes.length > 0) {
        lastNoteTime = notes[notes.length - 1].data.time;
    }
    const lastInteractiveObstacleTime = findLastInteractiveObstacleTime(data.obstacles);
    return Math.max(lastNoteTime, lastInteractiveObstacleTime);
};

/** Get first interactible obstacle beat time in beatmap.
 * ```ts
 * const firstInteractiveObstacleTime = difficulty.findFirstInteractiveObstacleTime(obstacles);
 * ```
 */
export const findFirstInteractiveObstacleTime = (obstacles: Obstacle[]): number => {
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
export const findLastInteractiveObstacleTime = (obstacles: Obstacle[]): number => {
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
