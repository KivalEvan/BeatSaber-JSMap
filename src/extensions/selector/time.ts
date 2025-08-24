import type { TimeProcessor } from '../../beatmap/helpers/timeProcessor.ts';
import type { IWrapBaseObject } from '../../beatmap/schema/wrapper/types/baseObject.ts';
import { settings } from './settings.ts';

/**
 * Return objects at given time, adjusted by BPM change if provided.
 * ```ts
 * const notesHere = at(notes, 42);
 * console.log(...notesHere);
 * ```
 */
export function at<T extends Pick<IWrapBaseObject, 'time'>>(
   objects: T[],
   times: number | number[],
   timeProc?: TimeProcessor | null,
): T[] {
   timeProc = timeProc ?? settings.timeProcessor;
   if (Array.isArray(times)) {
      return objects.filter((o) =>
         times.some((time) => timeProc ? timeProc.adjustTime(o.time) === time : o.time === time)
      );
   }
   return objects.filter((o) =>
      timeProc ? timeProc.adjustTime(o.time) === times : o.time === times
   );
}

/**
 * Return objects at given time range, adjusted by BPM change if provided.
 * ```ts
 * const notesRange = between(notes, 42, 69);
 * console.log(...notesRange);
 * ```
 */
export function between<T extends Pick<IWrapBaseObject, 'time'>>(
   objects: T[],
   from: number,
   to: number,
   timeProc?: TimeProcessor | null,
): T[] {
   timeProc = timeProc ?? settings.timeProcessor;
   return objects.filter((o) =>
      timeProc
         ? timeProc.adjustTime(o.time) >= from &&
            timeProc.adjustTime(o.time) <= to
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
export function before<T extends Pick<IWrapBaseObject, 'time'>>(
   objects: T[],
   before: number,
   timeProc?: TimeProcessor | null,
): T[] {
   timeProc = timeProc ?? settings.timeProcessor;
   return objects.filter((o) => timeProc ? timeProc.adjustTime(o.time) < before : o.time < before);
}

/**
 * Return objects after specified time, adjusted by BPM change if provided.
 * ```ts
 * const notesAfter = after(notes, 69);
 * console.log(...notesAfter);
 * ```
 */
export function after<T extends Pick<IWrapBaseObject, 'time'>>(
   objects: T[],
   after: number,
   timeProc?: TimeProcessor | null,
): T[] {
   timeProc = timeProc ?? settings.timeProcessor;
   return objects.filter((o) => timeProc ? timeProc.adjustTime(o.time) > after : o.time > after);
}
