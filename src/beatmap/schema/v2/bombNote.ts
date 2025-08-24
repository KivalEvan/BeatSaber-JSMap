import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { INote } from '../../schema/v2/types/note.ts';
import type { IWrapBombNote } from '../wrapper/types/bombNote.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBombNote } from '../wrapper/bombNote.ts';

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
