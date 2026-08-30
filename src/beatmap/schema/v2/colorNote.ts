import type { INote } from '../../schema/v2/types/note.ts';
import type { IWrapColorNote } from '../wrapper/types/colorNote.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorNote } from '../wrapper/colorNote.ts';
import { NoteColor } from '../shared/types/constants.ts';

/** Serialize beatmap v2 `Color Note` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeColorNote(data: IWrapColorNote): INote {
   return {
      _time: data.time,
      _type: data.color,
      _lineIndex: data.posX,
      _lineLayer: data.posY,
      _cutDirection: data.direction,
      _customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v2 `Color Note` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeColorNote(
   data: INote,
   options?: DeserializationOptions,
): IWrapColorNote {
   return createColorNote({
      time: data._time,
      posX: data._lineIndex,
      posY: data._lineLayer,
      color: [NoteColor.RED, NoteColor.BLUE][data._type ?? 0],
      direction: data._cutDirection,
      customData: data._customData,
   }, options);
}
