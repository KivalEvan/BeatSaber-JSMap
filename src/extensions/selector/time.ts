import type { TimeProcessor } from '../../beatmap/helpers/timeProcessor.ts';
import type { IWrapBaseObjectAttribute } from '../../types/beatmap/wrapper/baseObject.ts';
import { settings } from './settings.ts';

/**
 * Return objects at given time, adjusted by BPM change if provided.
 * ```ts
 * const notesHere = at(notes, 42);
 * console.log(...notesHere);
 * ```
 */
export function at<
   T extends Pick<IWrapBaseObjectAttribute, 'time'>,
>(objects: T[], times: number | number[], bpm?: TimeProcessor | null): T[] {
   bpm = bpm ?? settings.timeProcessor;
   if (Array.isArray(times)) {
      return objects.filter((o) =>
         times.some((time) => (bpm ? bpm.adjustTime(o.time) === time : o.time === time))
      );
   }
   return objects.filter((o) => (bpm ? bpm.adjustTime(o.time) === times : o.time === times));
}

/**
 * Return objects at given time range, adjusted by BPM change if provided.
 * ```ts
 * const notesRange = between(notes, 42, 69);
 * console.log(...notesRange);
 * ```
 */
export function between<
   T extends Pick<IWrapBaseObjectAttribute, 'time'>,
>(objects: T[], from: number, to: number, bpm?: TimeProcessor | null): T[] {
   bpm = bpm ?? settings.timeProcessor;
   return objects.filter((o) =>
      bpm
         ? bpm.adjustTime(o.time) >= from && bpm.adjustTime(o.time) <= to
         : o.time >= from && o.time <= to
   );
}

/**
 * Return objects before specified time, adjusted by BPM change if provided.
 * ```ts
 * const notesBefore = before(notes, 42);
 * console.log(...notesBefore);
 * ```
 */
export function before<
   T extends Pick<IWrapBaseObjectAttribute, 'time'>,
>(objects: T[], before: number, bpm?: TimeProcessor | null): T[] {
   bpm = bpm ?? settings.timeProcessor;
   return objects.filter((o) => (bpm ? bpm.adjustTime(o.time) > before : o.time > before));
}

/**
 * Return objects after specified time, adjusted by BPM change if provided.
 * ```ts
 * const notesAfter = after(notes, 69);
 * console.log(...notesAfter);
 * ```
 */
export function after<
   T extends Pick<IWrapBaseObjectAttribute, 'time'>,
>(objects: T[], after: number, bpm?: TimeProcessor | null): T[] {
   bpm = bpm ?? settings.timeProcessor;
   return objects.filter((o) => (bpm ? bpm.adjustTime(o.time) > after : o.time > after));
}
