import logger from '../../logger.ts';
import { Environment360Name, EnvironmentName } from '../../types/beatmap/shared/environment.ts';
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
import {
   IWrapInfo,
   IWrapInfoAudio,
   IWrapInfoColorScheme,
   IWrapInfoDifficultyAttribute,
   IWrapInfoSong,
} from '../../types/beatmap/wrapper/info.ts';

function tag(name: string): string[] {
   return ['beatmap', 'v1', 'info', name];
}

/** Difficulty beatmap class object. */
export class Info extends WrapInfo<IInfo> {
   readonly version = '1.0.0' as const;

   contentChecksum = '';
   song: IWrapInfoSong = {
      title: '',
      subTitle: '',
      author: '',
   };
   audio: IWrapInfoAudio = {
      checksum: '',
      filename: '',
      duration: 0,
      audioDataFilename: '',
      bpm: 0,
      previewStartTime: 0,
      previewDuration: 0,
   };
   songPreviewFilename = '';

   get songName(): string {
      return this.song.title;
   }
   set songName(value: string) {
      this.song.title = value;
   }
   get songSubName(): string {
      return this.song.subTitle;
   }
   set songSubName(value: string) {
      this.song.subTitle = value;
   }
   get songAuthorName(): string {
      return this.song.author;
   }
   set songAuthorName(value: string) {
      this.song.author = value;
   }

   get songFilename(): string {
      return this.audio.filename;
   }
   set songFilename(value: string) {
      this.audio.filename = value;
   }
   get beatsPerMinute(): number {
      return this.audio.bpm;
   }
   set beatsPerMinute(value: number) {
      this.audio.bpm = value;
   }
   get previewStartTime(): number {
      return this.audio.previewStartTime;
   }
   set previewStartTime(value: number) {
      this.audio.previewStartTime = value;
   }
   get previewDuration(): number {
      return this.audio.previewDuration;
   }
   set previewDuration(value: number) {
      this.audio.previewDuration = value;
   }

   coverImageFilename: string;

   songTimeOffset = 0;
   shuffle = 0;
   shufflePeriod = 0;
   environmentName: EnvironmentName | EnvironmentV3Name;
   allDirectionsEnvironmentName: Environment360Name = 'GlassDesertEnvironment';
   difficulties: InfoDifficulty[];
   environmentNames: never[] = [];
   colorSchemes: never[] = [];

   oneSaber: boolean;
   contributors: IContributor[];
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

      this.difficulties = [];
      data.difficultyLevels?.forEach((d) => {
         this.addMap(d);
      });
      this.songFilename ||= 'song.ogg';

      this.oneSaber = this.difficulties.some(
         (m) => m.characteristic === 'OneSaber',
      );
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
         difficultyLevels: this.listMap().reduce(
            (sets: IInfoDifficulty[], [_, beatmap]) => {
               sets.push(beatmap.toJSON());
               return sets;
            },
            [],
         ),
         oneSaber: this.difficulties.some(
            (m) => m.characteristic === 'OneSaber',
         ),
         contributors: this.contributors,
         customEnvironment: this.customEnvironment,
         customEnvironmentHash: this.customEnvironmentHash,
      };
   }

   get customData(): Record<string, never> {
      return {};
   }
   set customData(_: Record<string, never>) {
      logger.tWarn(
         tag('customData'),
         'Custom data does not exist in beatmap V1',
      );
   }

   addMap(data: Partial<IInfoDifficulty>, mode?: CharacteristicName): this;
   addMap(
      data: Partial<IWrapInfoDifficultyAttribute>,
      mode?: CharacteristicName,
   ): this;
   addMap(
      data: Partial<IInfoDifficulty> & Partial<IWrapInfoDifficultyAttribute>,
      mode?: CharacteristicName,
   ): this {
      data.audioPath ||= this.songFilename;
      this.difficulties.push(new InfoDifficulty(data, mode));
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
   characteristic: CharacteristicName;
   difficulty: DifficultyName;
   filename: LooseAutocomplete<GenericFileName>;
   lightshowFilename = '';
   authors = { mappers: [], lighters: [] };
   njs: number;
   njsOffset: number;
   colorSchemeId = 0;
   environmentId = 0;

   rank: IInfoDifficulty['difficultyRank'];
   audioPath: string;
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
      this.characteristic = mode || 'Standard';
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
      logger.tWarn(
         tag('customData'),
         'Custom data does not exist in beatmap V1',
      );
   }

   copyColorScheme(colorScheme: IWrapInfoColorScheme): this;
   copyColorScheme(id: number, info: IWrapInfo): this;
   copyColorScheme(id: IWrapInfoColorScheme | number, info?: IWrapInfo): this {
      if (typeof id === 'number') {
         if (info!.colorSchemes.length < id) {
            return this;
         }
         const colorScheme = info!.colorSchemes[id];
         return this.copyColorScheme(colorScheme);
      }

      this.colorLeft = Object.entries(id.saberLeftColor).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.colorRight = Object.entries(id.saberRightColor).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.envColorLeft = Object.entries(id.environment0Color).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.envColorRight = Object.entries(id.environment1Color).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.obstacleColor = Object.entries(id.obstaclesColor).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      return this;
   }

   isValid(): boolean {
      throw new Error('Method not implemented.');
   }
}
