import type { IBombNote } from './types/bombNote.ts';
import type { IWrapBombNote } from '../wrapper/types/bombNote.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBombNote } from '../wrapper/bombNote.ts';

/** Serialize beatmap v3 `Bomb Note` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBombNote(data: IWrapBombNote): IBombNote {
   return {
      b: data.time,
      x: data.posX,
      y: data.posY,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Bomb Note` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBombNote(
   data: IBombNote,
   options?: DeserializationOptions,
): IWrapBombNote {
   return createBombNote({
      time: data.b,
      posX: data.x,
      posY: data.y,
      customData: data.customData,
   }, options);
}
