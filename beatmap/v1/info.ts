import logger from '../../logger.ts';
import { EnvironmentName } from '../../types/beatmap/shared/environment.ts';
import { IInfo, IInfoDifficulty } from '../../types/beatmap/v1/info.ts';
import { CharacteristicName } from '../../types/beatmap/shared/characteristic.ts';
import { EnvironmentV3Name } from '../../types/beatmap/shared/environment.ts';
import { WrapInfo, WrapInfoDifficulty } from '../wrapper/info.ts';
import { DifficultyName } from '../../types/beatmap/shared/difficulty.ts';
import { LooseAutocomplete } from '../../types/utils.ts';
import { GenericFileName } from '../../types/beatmap/shared/filename.ts';
import { IColor } from '../../types/colors.ts';
import { IContributor } from '../../types/beatmap/shared/custom/contributor.ts';
import { deepCopy } from '../../utils/misc.ts';
import { IWrapInfoDifficultyAttribute } from '../../types/beatmap/wrapper/info.ts';

function tag(name: string): string[] {
   return ['beatmap', 'v1', 'info', name];
}

/** Difficulty beatmap class object. */
export class Info extends WrapInfo<IInfo> {
   version = '1.0.0' as const;
   songName: string;
   songSubName: string;
   songAuthorName: string;
   levelAuthorName!: never;
   beatsPerMinute: number;
   shuffle!: never;
   shufflePeriod!: never;
   previewStartTime: number;
   previewDuration: number;
   songFilename: string;
   coverImageFilename: string;
   environmentName: EnvironmentName | EnvironmentV3Name;
   allDirectionsEnvironmentName!: never;
   songTimeOffset!: never;
   difficultySets: { [mode in CharacteristicName]?: InfoDifficulty[] } = {};
   environmentNames: never[] = [];
   colorSchemes: never[] = [];

   oneSaber: boolean;
   contributors?: IContributor[];
   customEnvironment?: string;
   customEnvironmentHash?: string;

   constructor(data: Partial<IInfo> = {}) {
      super();

      this.songName = data.songName ?? 'SongName';
      this.songSubName = data.songSubName ?? '';
      this.songAuthorName = data.authorName ?? 'SongAuthor';
      this.beatsPerMinute = data.beatsPerMinute ?? 120;
      this.previewStartTime = data.previewStartTime ?? 12;
      this.previewDuration = data.previewDuration ?? 10;
      this.coverImageFilename = data.coverImagePath ?? 'cover.jpg';
      this.environmentName = data.environmentName ?? 'DefaultEnvironment';

      data.difficultyLevels?.forEach((d) => {
         this.songFilename ||= d.audioPath;
         const mode = d.characteristic || 'Standard';
         this.difficultySets[mode] ||= [];
         this.difficultySets[mode]!.push(new InfoDifficulty(d));
      });
      this.songFilename ||= 'song.ogg';

      this.oneSaber = !!this.difficultySets.OneSaber?.length;
      this.contributors = deepCopy(data.contributors ?? []);
      this.customEnvironment = data.customEnvironment;
      this.customEnvironmentHash = data.customEnvironmentHash;
   }

   static create(data: Partial<IInfo> = {}): Info {
      return new this(data);
   }

   toJSON(): IInfo {
      return {
         songName: this.songName,
         songSubName: this.songSubName,
         authorName: this.songAuthorName,
         beatsPerMinute: this.beatsPerMinute,
         previewStartTime: this.previewStartTime,
         previewDuration: this.previewDuration,
         coverImagePath: this.coverImageFilename,
         environmentName: this.environmentName,
         difficultyLevels: this.listMap().reduce((sets: IInfoDifficulty[], [_, beatmap]) => {
            sets.push(beatmap.toJSON());
            return sets;
         }, []),
         oneSaber: !!this.difficultySets.OneSaber?.length,
         contributors: this.contributors,
         customEnvironment: this.customEnvironment,
         customEnvironmentHash: this.customEnvironmentHash,
      };
   }

   get customData(): Record<string, never> {
      return {};
   }
   set customData(_: Record<string, never>) {
      logger.tWarn(tag('customData'), 'Custom data does not exist in beatmap V1');
   }

   addMap(data: Partial<IInfoDifficulty>, characteristic?: CharacteristicName): this;
   addMap(data: Partial<IWrapInfoDifficultyAttribute>, characteristic?: CharacteristicName): this;
   addMap(
      data: Partial<IInfoDifficulty> & Partial<IWrapInfoDifficultyAttribute>,
      characteristic?: CharacteristicName,
   ): this {
      const mode = (characteristic || data.characteristic) ?? 'Standard';
      data.audioPath ||= this.songFilename;

      this.difficultySets[mode] ??= [];
      this.difficultySets[mode]!.push(new InfoDifficulty(data));
      return this;
   }

   listMap(): [CharacteristicName, InfoDifficulty][] {
      return super.listMap() as [CharacteristicName, InfoDifficulty][];
   }

   isValid(): boolean {
      throw new Error('Method not implemented.');
   }
}

export class InfoDifficulty extends WrapInfoDifficulty<IInfoDifficulty> {
   difficulty: DifficultyName;
   rank: IInfoDifficulty['difficultyRank'];
   filename: LooseAutocomplete<GenericFileName>;
   njs: number;
   njsOffset: number;
   colorSchemeId!: never;
   environmentId!: never;

   audioPath: string;
   characteristic: CharacteristicName;

   offset?: number;
   oldOffset?: number;
   chromaToggle?: string;
   customColors?: boolean;
   difficultyLabel?: string;
   colorLeft?: Omit<IColor, 'a'>;
   colorRight?: Omit<IColor, 'a'>;
   envColorLeft?: Omit<IColor, 'a'>;
   envColorRight?: Omit<IColor, 'a'>;
   obstacleColor?: Omit<IColor, 'a'>;

   constructor(
      data: Partial<IInfoDifficulty> = {},
      songFileName?: string,
      mode?: CharacteristicName,
   ) {
      super();

      this.difficulty = data.difficulty ?? 'Easy';
      this.rank = data.difficultyRank ?? 1;
      this.filename = data.jsonPath ?? 'UnnamedFile.dat';
      this.njs = 0;
      this.njsOffset = 0;

      this.audioPath = songFileName ?? 'song.ogg';
      this.characteristic = mode ?? 'Standard';
      this.offset = data.offset;
      this.oldOffset = data.oldOffset;
      this.chromaToggle = data.chromaToggle;
      this.customColors = data.customColors;
      this.difficultyLabel = data.difficultyLabel;
      this.colorLeft = data.colorLeft;
      this.colorRight = data.colorRight;
      this.envColorLeft = data.envColorLeft;
      this.envColorRight = data.envColorRight;
      this.obstacleColor = data.obstacleColor;
   }

   static create(
      data: Partial<IInfoDifficulty> = {},
      songFileName?: string,
      mode?: CharacteristicName,
   ) {
      return new this(data, songFileName, mode);
   }

   toJSON(): IInfoDifficulty {
      return {
         difficulty: this.difficulty,
         difficultyRank: this.rank,
         audioPath: this.audioPath,
         jsonPath: this.filename,
         characteristic: this.characteristic,
         offset: this.offset,
         oldOffset: this.oldOffset,
         chromaToggle: this.chromaToggle,
         customColors: this.customColors,
         difficultyLabel: this.difficultyLabel,
         colorLeft: this.colorLeft,
         colorRight: this.colorRight,
         envColorLeft: this.envColorLeft,
         envColorRight: this.envColorRight,
         obstacleColor: this.obstacleColor,
      };
   }

   get customData(): Record<string, never> {
      return {};
   }
   set customData(_: Record<string, never>) {
      logger.tWarn(tag('customData'), 'Custom data does not exist in beatmap V1');
   }

   isValid(): boolean {
      throw new Error('Method not implemented.');
   }
}
