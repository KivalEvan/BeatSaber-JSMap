import type { INote } from '../../schema/v2/types/note.ts';
import type { IWrapBombNote } from '../wrapper/types/bombNote.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBombNote } from '../wrapper/bombNote.ts';

/** Serialize beatmap v2 `Bomb Note` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBombNote(data: IWrapBombNote): INote {
   return {
      _time: data.time,
      _type: 3,
      _lineIndex: data.posX,
      _lineLayer: data.posY,
      _cutDirection: data.direction,
      _customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v2 `Bomb Note` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBombNote(data: INote): IWrapBombNote {
   return createBombNote({
      time: data._time,
      posX: data._lineIndex,
      posY: data._lineLayer,
      direction: data._cutDirection,
      customData: data._customData,
   });
}
