import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IInfoBeatmap } from './types/info.ts';
import type { IWrapInfoBeatmap } from '../wrapper/types/info.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createInfoBeatmap } from '../wrapper/infoBeatmap.ts';

/**
 * Schema serialization for v4 `Info Beatmap`.
 */
export const infoBeatmap: ISchemaContainer<IWrapInfoBeatmap, IInfoBeatmap> = {
   serialize(data) {
      return {
         characteristic: data.characteristic,
         difficulty: data.difficulty,
         beatmapAuthors: {
            mappers: [...data.authors.mappers],
            lighters: [...data.authors.lighters],
         },
         environmentNameIdx: data.environmentId,
         beatmapColorSchemeIdx: data.colorSchemeId,
         noteJumpMovementSpeed: data.njs,
         noteJumpStartBeatOffset: data.njsOffset,
         lightshowDataFilename: data.lightshowFilename,
         beatmapDataFilename: data.filename,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createInfoBeatmap({
         characteristic: data.characteristic,
         difficulty: data.difficulty,
         authors: {
            mappers: data.beatmapAuthors?.mappers,
            lighters: data.beatmapAuthors?.lighters,
         },
         filename: data.beatmapDataFilename,
         lightshowFilename: data.lightshowDataFilename,
         njs: data.noteJumpMovementSpeed,
         njsOffset: data.noteJumpStartBeatOffset,
         colorSchemeId: data.beatmapColorSchemeIdx,
         environmentId: data.environmentNameIdx,
         customData: data.customData,
      });
   },
};
