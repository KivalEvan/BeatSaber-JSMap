import type { IColorNoteContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapColorNote } from '../../core/types/colorNote.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
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
