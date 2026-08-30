import type { IColorNote } from './types/colorNote.ts';
import type { IWrapColorNote } from '../wrapper/types/colorNote.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorNote } from '../wrapper/colorNote.ts';

/** Serialize beatmap v3 `Color Note` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeColorNote(data: IWrapColorNote): IColorNote {
   return {
      b: data.time,
      c: data.color,
      x: data.posX,
      y: data.posY,
      d: data.direction,
      a: data.angleOffset,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Color Note` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeColorNote(
   data: IColorNote,
   options?: DeserializationOptions,
): IWrapColorNote {
   return createColorNote({
      time: data.b,
      posX: data.x,
      posY: data.y,
      color: data.c,
      direction: data.d,
      angleOffset: data.a,
      customData: data.customData,
   }, options);
}
