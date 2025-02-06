import type { IColorNoteContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapColorNote } from '../../../types/beatmap/wrapper/colorNote.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createColorNote } from '../../core/colorNote.ts';

/**
 * Schema serialization for v4 `Color Note`.
 */
export const colorNote: ISchemaContainer<IWrapColorNote, IColorNoteContainer> = {
   serialize(data) {
      return {
         object: {
            b: data.time,
            i: 0,
            r: data.laneRotation,
            customData: {},
         },
         data: {
            c: data.color,
            x: data.posX,
            y: data.posY,
            d: data.direction,
            a: data.angleOffset,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(data) {
      return createColorNote({
         time: data.object?.b,
         laneRotation: data.object?.r,
         posX: data.data?.x,
         posY: data.data?.y,
         color: data.data?.c,
         direction: data.data?.d,
         angleOffset: data.data?.a,
         customData: data.data?.customData,
      });
   },
};
