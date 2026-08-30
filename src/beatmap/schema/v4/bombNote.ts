import type { IBombNoteContainer } from './types/container.ts';
import type { IWrapBombNote } from '../wrapper/types/bombNote.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBombNote } from '../wrapper/bombNote.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';

/** Serialize beatmap v4 `Bomb Note` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBombNote(data: IWrapBombNote): IBombNoteContainer {
   return {
      object: {
         b: data.time,
         i: 0,
         r: data.laneRotation,
         customData: {},
      },
      data: {
         x: data.posX,
         y: data.posY,
         customData: deepCopy(data.customData),
      },
   };
}

/** Deserialize schema object into beatmap v4 `Bomb Note` object.
 * @param data The serialized schema object.
 * @param options The custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBombNote(
   data: IBombNoteContainer,
   options?: DeserializationOptions,
): IWrapBombNote {
   return createBombNote({
      time: data.object?.b,
      laneRotation: data.object?.r,
      posX: data.data?.x,
      posY: data.data?.y,
      customData: data.data?.customData,
   }, options);
}
