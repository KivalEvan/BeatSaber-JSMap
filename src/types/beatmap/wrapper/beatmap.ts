// deno-lint-ignore-file no-explicit-any
import type { LooseAutocomplete } from '../../utils.ts';
import type { ICustomDataBase } from '../shared/custom/customData.ts';
import type { GenericBeatmapFilename, GenericLightshowFilename } from '../shared/filename.ts';
import type { IWrapBaseFile } from './baseFile.ts';
import type { IWrapBaseItem } from './baseItem.ts';
import type { IWrapDifficulty } from './difficulty.ts';
import type { IWrapLightshow } from './lightshow.ts';

/**
 * Wrapper attribute for beatmap data.
 */
export interface IWrapBeatmap extends IWrapBaseItem, IWrapBaseFile<GenericBeatmapFilename> {
   difficulty: IWrapDifficulty;
   lightshow: IWrapLightshow;

   // this honestly feels like hack but i need to figure out best way to handle this
   lightshowFilename: LooseAutocomplete<GenericLightshowFilename>;

   /**
    * This custom data does not contain the actual custom data from difficulty file, rather an arbitrary placement.
    *
    * @deprecated If you need to handle custom data from actual beatmap, use `customData` inside `difficulty` or `lightshow` instead.
    */
   customData: ICustomDataBase;
}

/** Wrapper attribute for subset of beatmap data. */
export type IWrapBeatmapSubset<
   TKey extends keyof IWrapDifficulty | keyof IWrapLightshow,
   TPick extends
      | keyof IWrapDifficulty[Extract<keyof IWrapDifficulty, TKey>]
      | keyof IWrapLightshow[Extract<keyof IWrapLightshow, TKey>] = any,
> =
   & {
      [key in TKey extends keyof IWrapDifficulty ? 'difficulty' : never]: {
         [K in Extract<keyof IWrapDifficulty, TKey>]: Pick<
            Extract<IWrapDifficulty[K], unknown[]>[number],
            Extract<keyof Extract<IWrapDifficulty[K], unknown[]>[number], TPick>
         >[];
      };
   }
   & {
      [key in TKey extends keyof IWrapLightshow ? 'lightshow' : never]: {
         [K in Extract<keyof IWrapLightshow, TKey>]: Pick<
            Extract<IWrapLightshow[K], unknown[]>[number],
            Extract<keyof Extract<IWrapLightshow[K], unknown[]>[number], TPick>
         >[];
      };
   };
