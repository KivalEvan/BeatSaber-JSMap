import { EnvironmentName } from '../../types/beatmap/shared/environment.ts';
import { IInfo, IInfoSet, IInfoSetDifficulty } from '../../types/beatmap/v2/info.ts';
import { CharacteristicName } from '../../types/beatmap/shared/characteristic.ts';
import { EnvironmentV3Name } from '../../types/beatmap/shared/environment.ts';
import { WrapInfo, WrapInfoBeatmap } from '../wrapper/info.ts';
import { DifficultyName } from '../../types/beatmap/shared/difficulty.ts';
import { LooseAutocomplete } from '../../types/utils.ts';
import { GenericFileName } from '../../types/beatmap/shared/fileName.ts';
import { Environment360Name } from '../../types/mod.ts';
import { deepCopy } from '../../utils/misc.ts';

/** Difficulty beatmap class object. */
export class Info extends WrapInfo<IInfo> {
   version = '2.2.0' as const;
   songName: string;
   songSubName: string;
   songAuthorName: string;
   levelAuthorName!: string;
   beatsPerMinute: number;
   shuffle!: number;
   shufflePeriod!: number;
   previewStartTime: number;
   previewDuration: number;
   songFilename: string;
   coverImageFilename: string;
   environmentName: EnvironmentName | EnvironmentV3Name;
   allDirectionsEnvironmentName!: Environment360Name;
   songTimeOffset!: number;
   difficultySets: { [mode in CharacteristicName]?: InfoBeatmap[] } = {};

   constructor(data: Partial<IInfo> = {}) {
      super();

      this.songName = data._songName ?? 'SongName';
      this.songSubName = data._songSubName ?? '';
      this.songAuthorName = data._songAuthorName ?? 'SongAuthor';
      this.levelAuthorName = data._levelAuthorName ?? '';
      this.beatsPerMinute = data._beatsPerMinute ?? 120;
      this.shuffle = data._shuffle ?? 0;
      this.shufflePeriod = data._shufflePeriod ?? 0.5;
      this.previewStartTime = data._previewStartTime ?? 12;
      this.previewDuration = data._previewDuration ?? 10;
      this.songFilename = data._songFilename ?? 'song.ogg';
      this.coverImageFilename = data._coverImageFilename ?? '';
      this.environmentName = data._environmentName ?? 'DefaultEnvironment';
      this.allDirectionsEnvironmentName = data._allDirectionsEnvironmentName ??
         'GlassDesertEnvironment';
      this.songTimeOffset = data._songTimeOffset ?? 0;
      this.customData = deepCopy(data._customData ?? {});

      data._difficultyBeatmapSets?.forEach((set) => {
         this.difficultySets[set._beatmapCharacteristicName] = set._difficultyBeatmaps.map(
            (beatmap) => new InfoBeatmap(beatmap),
         );
      });
   }

   static create(data: Partial<IInfo> = {}): Info {
      return new this(data);
   }

   toJSON(): IInfo {
      return {
         _version: this.version,
         _songName: this.songName,
         _songSubName: this.songSubName,
         _songAuthorName: this.songAuthorName,
         _levelAuthorName: this.levelAuthorName,
         _beatsPerMinute: this.beatsPerMinute,
         _shuffle: this.shuffle,
         _shufflePeriod: this.shufflePeriod,
         _previewStartTime: this.previewStartTime,
         _previewDuration: this.previewDuration,
         _songFilename: this.songFilename,
         _coverImageFilename: this.coverImageFilename,
         _environmentName: this.environmentName,
         _allDirectionsEnvironmentName: this.allDirectionsEnvironmentName,
         _songTimeOffset: this.songTimeOffset,
         _customData: this.customData,
         _difficultyBeatmapSets: Object.entries(this.difficultySets).reduce(
            (sets, [mode, beatmaps]) => {
               sets.push({
                  _beatmapCharacteristicName: mode as CharacteristicName,
                  _difficultyBeatmaps: beatmaps.map((b) => b.toJSON()),
               });
               return sets;
            },
            [] as IInfoSet[],
         ),
      };
   }

   get customData(): NonNullable<IInfo['_customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IInfo['_customData']>) {
      this._customData = value;
   }

   isValid(): boolean {
      throw new Error('Method not implemented.');
   }
}

export class InfoBeatmap extends WrapInfoBeatmap<IInfoSetDifficulty> {
   difficulty: DifficultyName;
   rank: IInfoSetDifficulty['_difficultyRank'];
   filename: LooseAutocomplete<GenericFileName>;
   njs: number;
   njsOffset: number;

   constructor(data: Partial<IInfoSetDifficulty>) {
      super();

      this.difficulty = data._difficulty ?? 'Easy';
      this.rank = data._difficultyRank ?? 1;
      this.filename = data._beatmapFilename ?? 'UnnamedFile.dat';
      this.njs = data._noteJumpMovementSpeed ?? 0;
      this.njsOffset = data._noteJumpStartBeatOffset ?? 0;
      this.customData = deepCopy(data._customData ?? {});
   }

   static create(data: Partial<IInfoSetDifficulty>) {
      return new this(data);
   }

   toJSON(): IInfoSetDifficulty {
      return {
         _difficulty: this.difficulty,
         _difficultyRank: this.rank,
         _beatmapFilename: this.filename,
         _noteJumpMovementSpeed: this.njs,
         _noteJumpStartBeatOffset: this.njsOffset,
         _customData: this.customData,
      };
   }

   get customData(): NonNullable<IInfoSetDifficulty['_customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IInfoSetDifficulty['_customData']>) {
      this._customData = value;
   }

   isValid(): boolean {
      throw new Error('Method not implemented.');
   }
}
