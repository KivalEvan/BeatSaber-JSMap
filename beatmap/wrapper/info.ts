import { CharacteristicName } from '../../types/beatmap/shared/characteristic.ts';
import { DifficultyName } from '../../types/beatmap/shared/difficulty.ts';
import { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';
import { GenericFileName } from '../../types/beatmap/shared/filename.ts';
import { Version } from '../../types/beatmap/shared/version.ts';
import { IInfoBeatmapAuthors } from '../../types/beatmap/v4/info.ts';
import {
   IWrapInfo,
   IWrapInfoAudio,
   IWrapInfoColorScheme,
   IWrapInfoDifficulty,
   IWrapInfoDifficultyAttribute,
   IWrapInfoSong,
} from '../../types/beatmap/wrapper/info.ts';
import { LooseAutocomplete } from '../../types/utils.ts';
import { CharacteristicOrder } from '../shared/characteristic.ts';
import { DifficultyRanking } from '../shared/difficulty.ts';
import { WrapBaseItem } from './baseItem.ts';

/** Difficulty beatmap class object. */
export abstract class WrapInfo<
   T extends { [P in keyof T]: T[P] },
   TDifficulty extends { [P in keyof TDifficulty]: TDifficulty[P] },
> extends WrapBaseItem<T> implements IWrapInfo<T> {
   private _filename = 'Info.dat';

   abstract readonly version: Version;
   abstract contentChecksum: string;
   abstract song: IWrapInfoSong;
   abstract audio: IWrapInfoAudio;
   abstract songPreviewFilename: string;
   abstract coverImageFilename: string;
   abstract environmentNames: EnvironmentAllName[];
   abstract colorSchemes: IWrapInfoColorScheme[];
   abstract difficulties: IWrapInfoDifficulty[];

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

   sort(): this {
      this.difficulties
         .sort(
            (a, b) => DifficultyRanking[a.difficulty] - DifficultyRanking[b.difficulty],
         )
         .sort(
            (a, b) =>
               (CharacteristicOrder[a.characteristic] || 0) -
               (CharacteristicOrder[b.characteristic] || 0),
         );

      return this;
   }

   abstract addMap(data: Partial<IWrapInfoDifficultyAttribute>): this;

   /**
    * @deprecated just access `difficulties` directly
    */
   listMap(): [CharacteristicName, IWrapInfoDifficulty][] {
      return this.difficulties.map((d) => [d.characteristic, d]);
   }
}

export abstract class WrapInfoDifficulty<T extends { [P in keyof T]: T[P] }> extends WrapBaseItem<T>
   implements IWrapInfoDifficulty<T> {
   abstract characteristic: CharacteristicName;
   abstract difficulty: DifficultyName;
   abstract filename: LooseAutocomplete<GenericFileName>;
   abstract lightshowFilename: LooseAutocomplete<GenericFileName>;
   abstract authors: IInfoBeatmapAuthors;
   abstract njs: number;
   abstract njsOffset: number;
   abstract colorSchemeId: number;
   abstract environmentId: number;

   abstract copyColorScheme(colorScheme: IWrapInfoColorScheme): this;
   abstract copyColorScheme(id: number, info: IWrapInfo): this;
}
