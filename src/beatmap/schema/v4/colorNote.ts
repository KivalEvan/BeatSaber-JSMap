import type { IColorNoteContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Color Note`.
 */
export const colorNote: ISchemaContainer<IWrapColorNoteAttribute, IColorNoteContainer> = {
   serialize(data: IWrapColorNoteAttribute): IColorNoteContainer {
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
      return {
         time: data.object?.b ?? 0,
         laneRotation: data.object?.r ?? 0,
         posX: data.data?.x ?? 0,
         posY: data.data?.y ?? 0,
         color: data.data?.c ?? 0,
         direction: data.data?.d ?? 0,
         angleOffset: data.data?.a ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
