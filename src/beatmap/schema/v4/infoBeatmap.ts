import type { IInfoBeatmap } from './types/info.ts';
import type { IWrapInfoBeatmap } from '../wrapper/types/info.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createInfoBeatmap } from '../wrapper/infoBeatmap.ts';

/** Serialize beatmap v4 `Info Beatmap` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeInfoBeatmap(data: IWrapInfoBeatmap): IInfoBeatmap {
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
}

/** Deserialize schema object into beatmap v4 `Info Beatmap` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeInfoBeatmap(data: IInfoBeatmap): IWrapInfoBeatmap {
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
}
