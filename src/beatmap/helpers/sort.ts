import type { INote } from '../schema/v2/types/note.ts';
import type { IBaseObject as IV2BaseObject } from '../schema/v2/types/object.ts';
import type { IBaseObject as IV3BaseObject } from '../schema/v3/types/baseObject.ts';
import type { IGridObject } from '../schema/v3/types/gridObject.ts';
import type { IWrapBaseObject } from '../schema/wrapper/types/baseObject.ts';
import type { IWrapGridObject } from '../schema/wrapper/types/gridObject.ts';
import type { Vector2 } from '../../types/vector.ts';

/**
 * Pass this to wrapper object array `sort` function as an argument.
 *
 * ```ts
 * data.basicEvents.sort(sortObjectFn);
 * ```
 */
export function sortObjectFn<T extends Pick<IWrapBaseObject, 'time'>>(a: T, b: T): number {
   return a.time - b.time;
}

/**
 * Pass this to wrapper note type array `sort` function as an argument.
 *
 * ```ts
 * data.chains.sort(sortNoteFn);
 * ```
 */
export function sortNoteFn<
   T extends Pick<IWrapGridObject, 'time' | 'posX' | 'posY' | 'customData'>,
>(a: T, b: T): number {
   if (Array.isArray(a.customData.coordinates) && Array.isArray(b.customData.coordinates)) {
      return (
         a.time - b.time ||
         (a.customData.coordinates as Vector2)[0] - (b.customData.coordinates as Vector2)[0] ||
         (a.customData.coordinates as Vector2)[1] - (b.customData.coordinates as Vector2)[1]
      );
   }
   if (Array.isArray(a.customData._position) && Array.isArray(b.customData._position)) {
      return (
         a.time - b.time ||
         (a.customData._position as Vector2)[0] - (b.customData._position as Vector2)[0] ||
         (a.customData._position as Vector2)[1] - (b.customData._position as Vector2)[1]
      );
   }
   return a.time - b.time || a.posX - b.posX || a.posY - b.posY;
}

/**
 * Pass this to schema v1 or v2 object array `sort` function as an argument.
 *
 * ```ts
 * data._events.sort(sortV2ObjectFn);
 * ```
 */
export function sortV2ObjectFn<T extends Pick<IV2BaseObject, '_time'>>(a: T, b: T): number {
   return a._time! - b._time!;
}

/**
 * Pass this to schema v1 or v2 note type array `sort` function as an argument.
 *
 * ```ts
 * data._notes.sort(sortV2NoteFn);
 * ```
 */
export function sortV2NoteFn<
   T extends Pick<INote, '_time' | '_lineIndex' | '_lineLayer' | '_customData'>,
>(a: T, b: T): number {
   if (Array.isArray(a._customData?._position) && Array.isArray(b._customData?._position)) {
      return (
         a._time! - b._time! ||
         (a._customData!._position as Vector2)[0] - (b._customData!._position as Vector2)[0] ||
         (a._customData!._position as Vector2)[1] - (b._customData!._position as Vector2)[1]
      );
   }
   return a._time! - b._time! || a._lineIndex! - b._lineLayer! || a._lineIndex! - b._lineLayer!;
}

/**
 * Pass this to schema v3 object array `sort` function as an argument.
 *
 * ```ts
 * data.basicBeatmapEvents.sort(sortV3ObjectFn);
 * ```
 */
export function sortV3ObjectFn<T extends Pick<IV3BaseObject, 'b'>>(a: T, b: T): number {
   return a.b! - b.b!;
}

/**
 * Pass this to schema v3 note type array `sort` function as an argument.
 *
 * ```ts
 * data.arcs.sort(sortV3NoteFn);
 * ```
 */
export function sortV3NoteFn<
   T extends Pick<IGridObject, 'b' | 'x' | 'y' | 'customData'>,
>(a: T, b: T): number {
   if (Array.isArray(a.customData?.coordinates) && Array.isArray(b.customData?.coordinates)) {
      return (
         a.b! - b.b! ||
         (a.customData!.coordinates as Vector2)[0] - (b.customData!.coordinates as Vector2)[0] ||
         (a.customData!.coordinates as Vector2)[1] - (b.customData!.coordinates as Vector2)[1]
      );
   }
   return a.b! - b.b! || a.x! - b.x! || a.y! - b.y!;
}
