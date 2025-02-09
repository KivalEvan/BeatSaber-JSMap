import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IColorNote } from '../../../types/beatmap/v3/colorNote.ts';
import type { IWrapColorNote } from '../../../types/beatmap/wrapper/colorNote.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorNote } from '../../core/colorNote.ts';

/**
 * Schema serialization for v3 `Color Note`.
 */
export const colorNote: ISchemaContainer<IWrapColorNote, IColorNote> = {
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
      return createColorNote({
         time: data.b,
         posX: data.x,
         posY: data.y,
         color: data.c,
         direction: data.d,
         angleOffset: data.a,
         customData: data.customData,
      });
   },
};
