import { BeatmapObject } from '../../beatmap/v2/object.ts';
import { IBaseObject as IBaseObjectV2 } from '../../types/beatmap/v2/object.ts';
import { BaseObject } from '../../beatmap/v3/baseObject.ts';
import { IBaseObject } from '../../types/beatmap/v3/baseObject.ts';
import { BeatPerMinute } from '../../beatmap/shared/bpm.ts';
import { settings } from './settings.ts';

/** Return objects at given time, adjusted by BPM change if provided.
 * ```ts
 * const notesHere = at(notes, 42);
 * console.log(...notesHere);
 * ```
 */
export function at<T extends BaseObject<IBaseObject> | BeatmapObject<IBaseObjectV2>>(
    objects: T[],
    times: number | number[],
    bpm?: BeatPerMinute | null,
): T[] {
    bpm = bpm ?? settings.BPM;
    if (Array.isArray(times)) {
        return objects.filter((o) => times.some((time) => (bpm ? bpm.adjustTime(o.time) === time : o.time === time)));
    }
    return objects.filter((o) => (bpm ? bpm.adjustTime(o.time) === times : o.time === times));
}

/** Return objects at given time range, adjusted by BPM change if provided.
 * ```ts
 * const notesRange = between(notes, 42, 69);
 * console.log(...notesRange);
 * ```
 */
export function between<T extends BaseObject<IBaseObject> | BeatmapObject<IBaseObjectV2>>(
    objects: T[],
    from: number,
    to: number,
    bpm?: BeatPerMinute | null,
): T[] {
    bpm = bpm ?? settings.BPM;
    return objects.filter((o) =>
        bpm ? bpm.adjustTime(o.time) >= from && bpm.adjustTime(o.time) <= to : o.time >= from && o.time <= to
    );
}
