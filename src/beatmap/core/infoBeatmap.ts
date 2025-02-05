import type { CharacteristicName } from '../../types/beatmap/shared/characteristic.ts';
import type { DifficultyName } from '../../types/beatmap/shared/difficulty.ts';
import type {
   GenericBeatmapFilename,
   GenericLightshowFilename,
} from '../../types/beatmap/shared/filename.ts';
import type { IInfoBeatmapAuthors } from '../../types/beatmap/v4/info.ts';
import type {
   IWrapInfoBeatmap,
   IWrapInfoBeatmapAttribute,
} from '../../types/beatmap/wrapper/info.ts';
import type { DeepPartial, DeepPartialIgnore, LooseAutocomplete } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseItem } from './abstract/baseItem.ts';

export function createInfoBeatmap(
   data: DeepPartial<IWrapInfoBeatmapAttribute> = {},
): IWrapInfoBeatmapAttribute {
   return {
      characteristic: data.characteristic ?? 'Standard',
      difficulty: data.difficulty ?? 'Easy',
      filename: data.filename ?? 'Unnamed.beatmap.dat',
      lightshowFilename: data.lightshowFilename ?? 'Unnamed.lightshow.dat',
      authors: {
         mappers: data.authors?.mappers ?? [],
         lighters: data.authors?.lighters ?? [],
      },
      njs: data.njs ?? 0,
      njsOffset: data.njsOffset ?? 0,
      colorSchemeId: data.colorSchemeId ?? -1,
      environmentId: data.environmentId ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap info beatmap.
 */
export class InfoBeatmap extends BaseItem implements IWrapInfoBeatmap {
   static defaultValue: IWrapInfoBeatmapAttribute = createInfoBeatmap();

   static createOne(data: Partial<IWrapInfoBeatmapAttribute> = {}): InfoBeatmap {
      return new this(data);
   }
   static create(
      ...data: DeepPartialIgnore<IWrapInfoBeatmapAttribute, 'customData'>[]
   ): InfoBeatmap[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapInfoBeatmapAttribute, 'customData'> = {}) {
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
