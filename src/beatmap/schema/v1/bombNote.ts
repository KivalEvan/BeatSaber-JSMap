import type { INote } from './types/note.ts';
import type { IWrapBombNote } from '../wrapper/types/bombNote.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { createBombNote } from '../wrapper/bombNote.ts';

/** Serialize beatmap v1 `Bomb Note` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBombNote(data: IWrapBombNote): INote {
   return {
      _time: data.time,
      _lineIndex: data.posX,
      _lineLayer: data.posY,
      _type: 3,
      _cutDirection: data.direction,
   };
}

/** Deserialize schema object into beatmap v1 `Bomb Note` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBombNote(
   data: INote,
   options?: DeserializationOptions,
): IWrapBombNote {
   return createBombNote({
      time: data._time,
      posX: data._lineIndex,
      posY: data._lineLayer,
      direction: data._cutDirection,
   }, options);
}
