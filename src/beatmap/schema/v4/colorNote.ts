import type { IColorNoteContainer } from './types/container.ts';
import type { IWrapColorNote } from '../wrapper/types/colorNote.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorNote } from '../wrapper/colorNote.ts';

/** Serialize beatmap v4 `Color Note` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeColorNote(data: IWrapColorNote): IColorNoteContainer {
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
}

/** Deserialize schema object into beatmap v4 `Color Note` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeColorNote(data: IColorNoteContainer): IWrapColorNote {
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
}
