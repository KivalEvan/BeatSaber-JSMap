import type { IBombNoteContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Bomb Note`.
 */
export const bombNote: ISchemaContainer<IWrapBombNoteAttribute, IBombNoteContainer> = {
   serialize(data) {
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
   },
   deserialize(data) {
      return {
         time: data.object?.b ?? 0,
         laneRotation: data.object?.r ?? 0,
         posX: data.data?.x ?? 0,
         posY: data.data?.y ?? 0,
         color: -1,
         direction: 0,
         customData: data.data?.customData ?? {},
      };
   },
};
