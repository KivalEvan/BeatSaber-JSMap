import { CharacteristicName } from '../../types/beatmap/shared/characteristic.ts';
import { DifficultyName } from '../../types/beatmap/shared/difficulty.ts';
import {
   Environment360Name,
   EnvironmentName,
   EnvironmentV3Name,
} from '../../types/beatmap/shared/environment.ts';
import { GenericFileName } from '../../types/beatmap/shared/filename.ts';
import { Version } from '../../types/beatmap/shared/version.ts';
import {
   IWrapInfo,
   IWrapInfoDifficulty,
   IWrapInfoDifficultyAttribute,
} from '../../types/beatmap/wrapper/info.ts';
import { LooseAutocomplete } from '../../types/utils.ts';
import { WrapBaseItem } from './baseItem.ts';

/** Difficulty beatmap class object. */
export abstract class WrapInfo<T extends { [P in keyof T]: T[P] }> extends WrapBaseItem<T>
   implements IWrapInfo<T> {
   private _filename = 'Info.dat';

   abstract version: Version;
   abstract songName: string;
   abstract songSubName: string;
   abstract songAuthorName: string;
   abstract levelAuthorName: string;
   abstract beatsPerMinute: number;
   abstract shuffle: number;
   abstract shufflePeriod: number;
   abstract previewStartTime: number;
   abstract previewDuration: number;
   abstract songFilename: string;
   abstract coverImageFilename: string;
   abstract environmentName: EnvironmentName | EnvironmentV3Name;
   abstract allDirectionsEnvironmentName: Environment360Name;
   abstract songTimeOffset: number;
   difficultySets: { [mode in CharacteristicName]?: IWrapInfoDifficulty[] } = {};

   clone<U extends this>(): U {
      return super.clone().setFileName(this.filename) as U;
   }

   set filename(name: LooseAutocomplete<'Info.dat' | 'info.dat'>) {
      this._filename = name.trim();
   }
   get filename(): string {
      return this._filename;
   }

   setFileName(filename: LooseAutocomplete<'Info.dat' | 'info.dat'>) {
      this.filename = filename;
      return this;
   }

   abstract addMap(data: Partial<IWrapInfoDifficultyAttribute>): this;

   listMap(): [CharacteristicName, IWrapInfoDifficulty][] {
      return Object.entries(this.difficultySets).reduce(
         (sets: [CharacteristicName, IWrapInfoDifficulty][], [mode, beatmaps]) => {
            sets.push(
               ...beatmaps.map(
                  (b) =>
                     [mode as CharacteristicName, b] as [CharacteristicName, IWrapInfoDifficulty],
               ),
            );
            return sets;
         },
         [],
      );
   }
}

export abstract class WrapInfoDifficulty<T extends { [P in keyof T]: T[P] }> extends WrapBaseItem<T>
   implements IWrapInfoDifficulty<T> {
   abstract readonly characteristic?: CharacteristicName;
   abstract difficulty: DifficultyName;
   abstract rank: number;
   abstract filename: LooseAutocomplete<GenericFileName>;
   abstract njs: number;
   abstract njsOffset: number;
}
