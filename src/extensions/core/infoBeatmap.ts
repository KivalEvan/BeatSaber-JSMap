import type { CharacteristicName } from '../../beatmap/schema/shared/types/characteristic.ts';
import type { DifficultyName } from '../../beatmap/schema/shared/types/difficulty.ts';
import type {
   GenericBeatmapFilename,
   GenericLightshowFilename,
} from '../../beatmap/schema/shared/types/filename.ts';
import type { IInfoBeatmapAuthors } from '../../beatmap/schema/v4/types/info.ts';
import type { IWrapInfoBeatmap } from '../../beatmap/schema/wrapper/types/info.ts';
import type { DeepPartial, LooseAutocomplete } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseItem } from './abstract/baseItem.ts';
import { createInfoBeatmap } from '../../beatmap/schema/wrapper/infoBeatmap.ts';

/**
 * Core beatmap info beatmap.
 */
export class InfoBeatmap extends BaseItem implements IWrapInfoBeatmap {
   static defaultValue: IWrapInfoBeatmap = /* @__PURE__ */ createInfoBeatmap();

   static createOne(data: DeepPartial<IWrapInfoBeatmap> = {}): InfoBeatmap {
      return new this(data);
   }
   static create(
      ...data: DeepPartial<IWrapInfoBeatmap>[]
   ): InfoBeatmap[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapInfoBeatmap> = {}) {
      super();
      this.characteristic = data.characteristic ?? InfoBeatmap.defaultValue.characteristic;
      this.difficulty = data.difficulty ?? InfoBeatmap.defaultValue.difficulty;
      this.filename = data.filename ?? InfoBeatmap.defaultValue.filename;
      this.lightshowFilename = data.lightshowFilename ?? InfoBeatmap.defaultValue.lightshowFilename;
      this.authors = {
         mappers: (data.authors?.mappers ?? InfoBeatmap.defaultValue.authors.mappers).map(
            (e) => e!,
         ),
         lighters: (data.authors?.lighters ?? InfoBeatmap.defaultValue.authors.lighters).map(
            (e) => e!,
         ),
      };
      this.njs = data.njs ?? InfoBeatmap.defaultValue.njs;
      this.njsOffset = data.njsOffset ?? InfoBeatmap.defaultValue.njsOffset;
      this.colorSchemeId = data.colorSchemeId ?? InfoBeatmap.defaultValue.colorSchemeId;
      this.environmentId = data.environmentId ?? InfoBeatmap.defaultValue.environmentId;
      this.customData = deepCopy(data.customData ?? InfoBeatmap.defaultValue.customData);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         this.njs > 0 &&
         this.colorSchemeId >= -1 &&
         this.environmentId >= 0;
   }

   characteristic: CharacteristicName;
   difficulty: DifficultyName;
   filename: LooseAutocomplete<GenericBeatmapFilename>;
   lightshowFilename: LooseAutocomplete<GenericLightshowFilename>;
   authors: IInfoBeatmapAuthors;
   njs: number;
   njsOffset: number;
   colorSchemeId: number;
   environmentId: number;
}
