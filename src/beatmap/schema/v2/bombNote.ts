import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { INote } from '../../../types/beatmap/v2/note.ts';
import type { IWrapBombNote } from '../../../types/beatmap/wrapper/bombNote.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBombNote } from '../../core/bombNote.ts';

/**
 * Schema serialization for v2 `Bomb Note`.
 */
export const bombNote: ISchemaContainer<IWrapBombNote, INote> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: 3,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _cutDirection: data.direction,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createBombNote({
         time: data._time,
         posX: data._lineIndex,
         posY: data._lineLayer,
         direction: data._cutDirection,
         customData: data._customData,
      });
   },
};
