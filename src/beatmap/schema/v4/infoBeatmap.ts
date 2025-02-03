import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IInfoBeatmap } from '../../../types/beatmap/v4/info.ts';
import type { IWrapInfoBeatmapAttribute } from '../../../types/beatmap/wrapper/info.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Info Beatmap`.
 */
export const infoBeatmap: ISchemaContainer<IWrapInfoBeatmapAttribute, IInfoBeatmap> = {
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
      return {
         characteristic: data.characteristic ?? 'Standard',
         difficulty: data.difficulty ?? 'Easy',
         authors: {
            mappers: data.beatmapAuthors?.mappers?.map((s) => s),
            lighters: data.beatmapAuthors?.lighters?.map((s) => s),
         },
         filename: data.beatmapDataFilename ?? 'Easy.beatmap.dat',
         lightshowFilename: data.lightshowDataFilename ?? 'Easy.lightshow.dat',
         njs: data.noteJumpMovementSpeed ?? 0,
         njsOffset: data.noteJumpStartBeatOffset ?? 0,
         colorSchemeId: data.beatmapColorSchemeIdx ?? -1,
         environmentId: data.environmentNameIdx ?? 0,
         customData: data.customData ?? {},
      };
   },
};
