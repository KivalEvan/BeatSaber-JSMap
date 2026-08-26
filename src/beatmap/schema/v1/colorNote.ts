import type { INote } from './types/note.ts';
import type { IWrapColorNote } from '../wrapper/types/colorNote.ts';
import { createColorNote } from '../wrapper/colorNote.ts';
import { NoteColor } from '../shared/types/constants.ts';

/** Serialize beatmap v1 `Color Note` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeColorNote(data: IWrapColorNote): INote {
   return {
      _time: data.time,
      _lineIndex: data.posX,
      _lineLayer: data.posY,
      _type: data.color,
      _cutDirection: data.direction,
   };
}

/** Deserialize schema object into beatmap v1 `Color Note` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeColorNote(data: INote): IWrapColorNote {
   return createColorNote({
      time: data._time,
      posX: data._lineIndex,
      posY: data._lineLayer,
      color: [NoteColor.RED, NoteColor.BLUE][data._type ?? 0],
      direction: data._cutDirection,
   });
}
