import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IColorNote } from '../../../types/beatmap/v3/colorNote.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `Color Note`.
 */
export const colorNote: ISchemaContainer<IWrapColorNoteAttribute, IColorNote> = {
   serialize(data) {
      return {
         b: data.time,
         c: data.color,
         x: data.posX,
         y: data.posY,
         d: data.direction,
         a: data.angleOffset,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         laneRotation: 0,
         posX: data.x ?? 0,
         posY: data.y ?? 0,
         color: data.c ?? 0,
         direction: data.d ?? 0,
         angleOffset: data.a ?? 0,
         customData: data.customData ?? {},
      };
   },
};
