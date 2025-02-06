import type { IBombNoteContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createBombNote } from '../../core/bombNote.ts';

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
      return createBombNote({
         time: data.object?.b,
         laneRotation: data.object?.r,
         posX: data.data?.x,
         posY: data.data?.y,
         customData: data.data?.customData,
      });
   },
};
