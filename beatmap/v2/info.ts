import { EnvironmentAllName, EnvironmentName } from '../../types/beatmap/shared/environment.ts';
import { IInfo, IInfoDifficulty, IInfoSet } from '../../types/beatmap/v2/info.ts';
import { CharacteristicName } from '../../types/beatmap/shared/characteristic.ts';
import { EnvironmentV3Name } from '../../types/beatmap/shared/environment.ts';
import { WrapInfo, WrapInfoDifficulty } from '../wrapper/info.ts';
import { DifficultyName } from '../../types/beatmap/shared/difficulty.ts';
import { LooseAutocomplete } from '../../types/utils.ts';
import { GenericFileName } from '../../types/beatmap/shared/filename.ts';
import { Environment360Name } from '../../types/beatmap/shared/environment.ts';
import { deepCopy, shallowCopy } from '../../utils/misc.ts';
import {
   IWrapInfo,
   IWrapInfoAudio,
   IWrapInfoColorScheme,
   IWrapInfoDifficultyAttribute,
   IWrapInfoSong,
} from '../../types/beatmap/wrapper/info.ts';

/** Difficulty beatmap class object. */
export class Info extends WrapInfo<IInfo> {
   readonly version = '2.1.0' as const;

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
   environmentNames: EnvironmentAllName[];
   colorSchemes: IWrapInfoColorScheme[];
   difficulties: InfoDifficulty[] = [];

   levelAuthorName: string;
   songTimeOffset: number;
   shuffle: number;
   shufflePeriod: number;
   environmentName: EnvironmentName | EnvironmentV3Name;
   allDirectionsEnvironmentName: Environment360Name;

   constructor(data: Partial<IInfo> = {}) {
      super();

      this.songName = data._songName ?? 'SongName';
      this.songSubName = data._songSubName ?? '';
      this.songAuthorName = data._songAuthorName ?? 'SongAuthor';
      this.levelAuthorName = data._levelAuthorName ?? '';
      this.beatsPerMinute = data._beatsPerMinute ?? 120;
      this.songTimeOffset = data._songTimeOffset ?? 0;
      this.shuffle = data._shuffle ?? 0;
      this.shufflePeriod = data._shufflePeriod ?? 0.5;
      this.previewStartTime = data._previewStartTime ?? 12;
      this.previewDuration = data._previewDuration ?? 10;
      this.songFilename = data._songFilename ?? 'song.ogg';
      this.coverImageFilename = data._coverImageFilename ?? '';
      this.environmentName = data._environmentName ?? 'DefaultEnvironment';
      this.allDirectionsEnvironmentName = data._allDirectionsEnvironmentName ??
         'GlassDesertEnvironment';
      this.environmentNames = data._environmentNames?.map((e) => e) ?? [];
      this.colorSchemes = data._colorSchemes?.map((e) => {
         const scheme: IWrapInfoColorScheme = {
            useOverride: !!e.useOverride,
            name: e.colorScheme?.colorSchemeId || '',
            saberLeftColor: {
               r: e.colorScheme?.saberAColor?.r || 0,
               g: e.colorScheme?.saberAColor?.g || 0,
               b: e.colorScheme?.saberAColor?.b || 0,
               a: e.colorScheme?.saberAColor?.a || 0,
            },
            saberRightColor: {
               r: e.colorScheme?.saberBColor?.r || 0,
               g: e.colorScheme?.saberBColor?.g || 0,
               b: e.colorScheme?.saberBColor?.b || 0,
               a: e.colorScheme?.saberBColor?.a || 0,
            },
            environment0Color: {
               r: e.colorScheme?.environmentColor0?.r || 0,
               g: e.colorScheme?.environmentColor0?.g || 0,
               b: e.colorScheme?.environmentColor0?.b || 0,
               a: e.colorScheme?.environmentColor0?.a || 0,
            },
            environment1Color: {
               r: e.colorScheme?.environmentColor1?.r || 0,
               g: e.colorScheme?.environmentColor1?.g || 0,
               b: e.colorScheme?.environmentColor1?.b || 0,
               a: e.colorScheme?.environmentColor1?.a || 0,
            },
            obstaclesColor: {
               r: e.colorScheme?.obstaclesColor?.r || 0,
               g: e.colorScheme?.obstaclesColor?.g || 0,
               b: e.colorScheme?.obstaclesColor?.b || 0,
               a: e.colorScheme?.obstaclesColor?.a || 0,
            },
            environment0ColorBoost: {
               r: e.colorScheme?.environmentColor0Boost?.r || 0,
               g: e.colorScheme?.environmentColor0Boost?.g || 0,
               b: e.colorScheme?.environmentColor0Boost?.b || 0,
               a: e.colorScheme?.environmentColor0Boost?.a || 0,
            },
            environment1ColorBoost: {
               r: e.colorScheme?.environmentColor1Boost?.r || 0,
               g: e.colorScheme?.environmentColor1Boost?.g || 0,
               b: e.colorScheme?.environmentColor1Boost?.b || 0,
               a: e.colorScheme?.environmentColor1Boost?.a || 0,
            },
         };
         if (e.colorScheme?.environmentColorW) {
            scheme.environmentWColor = {
               r: e.colorScheme?.environmentColorW?.r || 0,
               g: e.colorScheme?.environmentColorW?.g || 0,
               b: e.colorScheme?.environmentColorW?.b || 0,
               a: e.colorScheme?.environmentColorW?.a || 0,
            };
         }
         if (e.colorScheme?.environmentColorWBoost) {
            scheme.environmentWColorBoost = {
               r: e.colorScheme?.environmentColorWBoost?.r || 0,
               g: e.colorScheme?.environmentColorWBoost?.g || 0,
               b: e.colorScheme?.environmentColorWBoost?.b || 0,
               a: e.colorScheme?.environmentColorWBoost?.a || 0,
            };
         }
         return scheme;
      }) ?? [];
      this.customData = deepCopy(data._customData ?? {});

      data._difficultyBeatmapSets?.forEach((set) => {
         set._difficultyBeatmaps?.forEach((d) =>
            this.difficulties.push(
               new InfoDifficulty(d, set._beatmapCharacteristicName),
            )
         );
      });
   }

   static create(data: Partial<IInfo> = {}): Info {
      return new this(data);
   }

   toJSON(): Required<IInfo> {
      return {
         _version: this.version,
         _songName: this.songName,
         _songSubName: this.songSubName,
         _songAuthorName: this.songAuthorName,
         _levelAuthorName: this.levelAuthorName,
         _beatsPerMinute: this.beatsPerMinute,
         _songTimeOffset: this.songTimeOffset,
         _shuffle: this.shuffle,
         _shufflePeriod: this.shufflePeriod,
         _previewStartTime: this.previewStartTime,
         _previewDuration: this.previewDuration,
         _songFilename: this.songFilename,
         _coverImageFilename: this.coverImageFilename,
         _environmentName: this.environmentName,
         _allDirectionsEnvironmentName: this.allDirectionsEnvironmentName,
         _environmentNames: this.environmentNames.map((e) => e),
         _colorSchemes: this.colorSchemes.map((e) => {
            const cs: Required<IInfo>['_colorSchemes'][number] = {
               useOverride: e.useOverride,
               colorScheme: {
                  colorSchemeId: e.name,
                  saberAColor: shallowCopy(e.saberLeftColor),
                  saberBColor: shallowCopy(e.saberRightColor),
                  environmentColor0: shallowCopy(e.environment0Color),
                  environmentColor1: shallowCopy(e.environment1Color),
                  obstaclesColor: shallowCopy(e.obstaclesColor),
                  environmentColor0Boost: shallowCopy(e.environment0ColorBoost),
                  environmentColor1Boost: shallowCopy(e.environment1ColorBoost),
               },
            };
            if (e.environmentWColor) {
               cs.colorScheme!.environmentColorW = shallowCopy(
                  e.environmentWColor,
               );
            }
            if (e.environmentWColorBoost) {
               cs.colorScheme!.environmentColorWBoost = shallowCopy(
                  e.environmentWColorBoost,
               );
            }
            return cs;
         }),
         _customData: deepCopy(this.customData),
         _difficultyBeatmapSets: this.difficulties.reduce((set, d) => {
            let found = set.find(
               (s) => s._beatmapCharacteristicName === d.characteristic,
            );
            if (!found) {
               found = {
                  _beatmapCharacteristicName: d.characteristic,
                  _difficultyBeatmaps: [],
               };
               set.push(found);
            }
            found._difficultyBeatmaps!.push(d.toJSON());
            return set;
         }, [] as IInfoSet[]),
      };
   }

   get customData(): NonNullable<IInfo['_customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IInfo['_customData']>) {
      this._customData = value;
   }

   addMap(data: Partial<IInfoDifficulty>, mode?: CharacteristicName): this;
   addMap(
      data: Partial<IWrapInfoDifficultyAttribute>,
      mode?: CharacteristicName,
   ): this;
   addMap(
      data: Partial<IWrapInfoDifficultyAttribute> & Partial<IInfoDifficulty>,
      mode?: CharacteristicName,
   ): this {
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
   colorSchemeId: number;
   environmentId: number;

   rank: Required<IInfoDifficulty>['_difficultyRank'];

   constructor(
      data: Partial<IInfoDifficulty>,
      mode: CharacteristicName = 'Standard',
   ) {
      super();

      this.characteristic = mode;
      this.difficulty = data._difficulty ?? 'Easy';
      this.rank = data._difficultyRank ?? 1;
      this.filename = data._beatmapFilename ?? 'UnnamedFile.dat';
      this.njs = data._noteJumpMovementSpeed ?? 0;
      this.njsOffset = data._noteJumpStartBeatOffset ?? 0;
      this.colorSchemeId = data._beatmapColorSchemeIdx ?? 0;
      this.environmentId = data._environmentNameIdx ?? 0;
      this.customData = deepCopy(data._customData ?? {});
   }

   static create(data: Partial<IInfoDifficulty>) {
      return new this(data);
   }

   toJSON(): Required<IInfoDifficulty> {
      return {
         _difficulty: this.difficulty,
         _difficultyRank: this.rank,
         _beatmapFilename: this.filename,
         _noteJumpMovementSpeed: this.njs,
         _noteJumpStartBeatOffset: this.njsOffset,
         _beatmapColorSchemeIdx: this.colorSchemeId,
         _environmentNameIdx: this.environmentId,
         _customData: deepCopy(this.customData),
      };
   }

   get customData(): NonNullable<IInfoDifficulty['_customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IInfoDifficulty['_customData']>) {
      this._customData = value;
   }

   copyColorScheme(id: number, info: IWrapInfo): this;
   copyColorScheme(colorScheme: IWrapInfoColorScheme): this;
   copyColorScheme(id: IWrapInfoColorScheme | number, info?: IWrapInfo): this {
      if (typeof id === 'number') {
         if (info!.colorSchemes.length < id) {
            return this;
         }
         const colorScheme = info!.colorSchemes[id];
         return this.copyColorScheme(colorScheme);
      }

      this.customData._colorLeft = Object.entries(id.saberLeftColor).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._colorRight = Object.entries(id.saberRightColor).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._envColorLeft = Object.entries(
         id.environment0Color,
      ).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._envColorRight = Object.entries(
         id.environment1Color,
      ).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._envColorLeftBoost = Object.entries(
         id.environment0ColorBoost,
      ).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._envColorRightBoost = Object.entries(
         id.environment1ColorBoost,
      ).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._obstacleColor = Object.entries(id.obstaclesColor).reduce(
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
