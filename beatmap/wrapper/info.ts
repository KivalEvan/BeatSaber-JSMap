import { CharacteristicName } from '../../types/beatmap/shared/characteristic.ts';
import { DifficultyName } from '../../types/beatmap/shared/difficulty.ts';
import {
   Environment360Name,
   EnvironmentName,
   EnvironmentV3Name,
} from '../../types/beatmap/shared/environment.ts';
import { GenericFileName } from '../../types/beatmap/shared/fileName.ts';
import { Version } from '../../types/beatmap/shared/version.ts';
import { IWrapInfo, IWrapInfoBeatmap } from '../../types/beatmap/wrapper/info.ts';
import { LooseAutocomplete } from '../../types/utils.ts';
import { WrapBaseItem } from './baseItem.ts';

/** Difficulty beatmap class object. */
export abstract class WrapInfo<T extends { [P in keyof T]: T[P] }> extends WrapBaseItem<T>
   implements IWrapInfo<T> {
   private _fileName = 'Info.dat';

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
   difficultySets: { [mode in CharacteristicName]?: IWrapInfoBeatmap[] } = {};

   clone<U extends this>(): U {
      return super.clone().setFileName(this.fileName) as U;
   }

   set fileName(name: LooseAutocomplete<'Info.dat' | 'info.dat'>) {
      this._fileName = name.trim();
   }
   get fileName(): string {
      return this._fileName;
   }

   setFileName(fileName: LooseAutocomplete<'Info.dat' | 'info.dat'>) {
      this.fileName = fileName;
      return this;
   }
}

export abstract class WrapInfoBeatmap<T extends { [P in keyof T]: T[P] }> extends WrapBaseItem<T>
   implements IWrapInfoBeatmap<T> {
   abstract difficulty: DifficultyName;
   abstract rank: number;
   abstract filename: LooseAutocomplete<GenericFileName>;
   abstract njs: number;
   abstract njsOffset: number;
}
