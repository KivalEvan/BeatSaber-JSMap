import type {
   Environment360Name,
   EnvironmentAllName,
   EnvironmentName,
   EnvironmentV3Name,
} from '../../types/beatmap/shared/environment.ts';
import type {
   IWrapInfo,
   IWrapInfoAudio,
   IWrapInfoBeatmap,
   IWrapInfoColorScheme,
   IWrapInfoSong,
} from '../../types/beatmap/wrapper/info.ts';
import type { DeepPartial, DeepPartialIgnore, LooseAutocomplete } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { CharacteristicOrder } from '../shared/characteristic.ts';
import { DifficultyRanking } from '../shared/difficulty.ts';
import { BaseItem } from './abstract/baseItem.ts';
import { createInfoBeatmap, InfoBeatmap } from './infoBeatmap.ts';

export function createInfo(data: DeepPartial<IWrapInfo> = {}): IWrapInfo {
   return {
      version: data.version ?? -1,
      filename: data.filename ?? 'Info.dat',
      song: {
         title: data.song?.title ?? 'Untitled',
         subTitle: data.song?.subTitle ?? '',
         author: data.song?.author ?? 'NoAuthor',
      },
      audio: {
         filename: data.audio?.filename ?? 'song.ogg',
         duration: data.audio?.duration ?? 0,
         audioDataFilename: data.audio?.audioDataFilename ?? 'AudioData.dat',
         bpm: data.audio?.bpm ?? 120,
         lufs: data.audio?.lufs ?? 0,
         previewStartTime: data.audio?.previewStartTime ?? 0,
         previewDuration: data.audio?.previewDuration ?? 0,
         audioOffset: data.audio?.audioOffset ?? 0,
         shuffle: data.audio?.shuffle ?? 0,
         shufflePeriod: data.audio?.shufflePeriod ?? 0.5,
      },
      songPreviewFilename: data.songPreviewFilename ?? 'song.ogg',
      coverImageFilename: data.coverImageFilename ?? 'cover.jpg',
      environmentBase: {
         normal: data.environmentBase?.normal ?? null,
         allDirections: data.environmentBase?.allDirections ?? null,
      },
      environmentNames: data.environmentNames ?? [],
      colorSchemes: data.colorSchemes?.map((e) => {
         const cs: IWrapInfoColorScheme = {
            name: e!.name ?? '',
            overrideLights: e!.overrideLights ?? false,
            overrideNotes: e!.overrideNotes ?? false,
            saberLeftColor: {
               r: e!.saberLeftColor?.r ?? 0,
               g: e!.saberLeftColor?.g ?? 0,
               b: e!.saberLeftColor?.b ?? 0,
               a: e!.saberLeftColor?.a ?? 0,
            },
            saberRightColor: {
               r: e!.saberRightColor?.r ?? 0,
               g: e!.saberRightColor?.g ?? 0,
               b: e!.saberRightColor?.b ?? 0,
               a: e!.saberRightColor?.a ?? 0,
            },
            environment0Color: {
               r: e!.environment0Color?.r ?? 0,
               g: e!.environment0Color?.g ?? 0,
               b: e!.environment0Color?.b ?? 0,
               a: e!.environment0Color?.a ?? 0,
            },
            environment1Color: {
               r: e!.environment1Color?.r ?? 0,
               g: e!.environment1Color?.g ?? 0,
               b: e!.environment1Color?.b ?? 0,
               a: e!.environment1Color?.a ?? 0,
            },
            environment0ColorBoost: {
               r: e!.environment0ColorBoost?.r ?? 0,
               g: e!.environment0ColorBoost?.g ?? 0,
               b: e!.environment0ColorBoost?.b ?? 0,
               a: e!.environment0ColorBoost?.a ?? 0,
            },
            environment1ColorBoost: {
               r: e!.environment1ColorBoost?.r ?? 0,
               g: e!.environment1ColorBoost?.g ?? 0,
               b: e!.environment1ColorBoost?.b ?? 0,
               a: e!.environment1ColorBoost?.a ?? 0,
            },
            obstaclesColor: {
               r: e!.obstaclesColor?.r ?? 0,
               g: e!.obstaclesColor?.g ?? 0,
               b: e!.obstaclesColor?.b ?? 0,
               a: e!.obstaclesColor?.a ?? 0,
            },
         };
         if (e!.environmentWColor) {
            cs.environmentWColor = {
               r: e!.environmentWColor?.r ?? 0,
               g: e!.environmentWColor?.g ?? 0,
               b: e!.environmentWColor?.b ?? 0,
               a: e!.environmentWColor?.a ?? 0,
            };
         }
         if (e!.environmentWColorBoost) {
            cs.environmentWColorBoost = {
               r: e!.environmentWColorBoost?.r ?? 0,
               g: e!.environmentWColorBoost?.g ?? 0,
               b: e!.environmentWColorBoost?.b ?? 0,
               a: e!.environmentWColorBoost?.a ?? 0,
            };
         }
         return cs;
      }) ?? [],
      difficulties: data.difficulties?.map(createInfoBeatmap) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap info.
 *
 * This object is writable into file.
 */
export class Info extends BaseItem implements IWrapInfo {
   static defaultValue: IWrapInfo = createInfo();

   static createOne(data: Partial<IWrapInfo> = {}): Info {
      return new this(data);
   }
   static create(
      ...data: DeepPartialIgnore<IWrapInfo, 'customData'>[]
   ): Info[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapInfo, 'customData'> = {}) {
      super();
      this.version = data.version ?? Info.defaultValue.version;
      this.filename = data.filename ?? Info.defaultValue.filename;

      this.song = {
         title: data.song?.title ?? Info.defaultValue.song.title,
         subTitle: data.song?.subTitle ?? Info.defaultValue.song.subTitle,
         author: data.song?.author ?? Info.defaultValue.song.author,
      };
      this.audio = {
         filename: data.audio?.filename ?? Info.defaultValue.audio.filename,
         duration: data.audio?.duration ?? Info.defaultValue.audio.duration,
         audioDataFilename: data.audio?.audioDataFilename ??
            Info.defaultValue.audio.audioDataFilename,
         bpm: data.audio?.bpm ?? Info.defaultValue.audio.bpm,
         lufs: data.audio?.lufs ?? Info.defaultValue.audio.lufs,
         previewStartTime: data.audio?.previewStartTime ??
            Info.defaultValue.audio.previewStartTime,
         previewDuration: data.audio?.previewDuration ??
            Info.defaultValue.audio.previewDuration,
         audioOffset: data.audio?.audioOffset ?? Info.defaultValue.audio.audioOffset,
         shuffle: data.audio?.shuffle ?? Info.defaultValue.audio.shuffle,
         shufflePeriod: data.audio?.shufflePeriod ?? Info.defaultValue.audio.shufflePeriod,
      };
      this.songPreviewFilename = data.songPreviewFilename ?? Info.defaultValue.songPreviewFilename;
      this.coverImageFilename = data.coverImageFilename ?? Info.defaultValue.coverImageFilename;
      this.environmentBase = {
         normal: data.environmentBase?.normal ??
            Info.defaultValue.environmentBase.normal,
         allDirections: data.environmentBase?.allDirections ??
            Info.defaultValue.environmentBase.allDirections,
      };
      this.environmentNames = (
         data.environmentNames ?? Info.defaultValue.environmentNames
      ).map((e) => e!);
      this.colorSchemes = (
         data.colorSchemes ?? Info.defaultValue.colorSchemes
      ).map((e) => {
         const cs: IWrapInfoColorScheme = {
            name: e!.name || '',
            overrideLights: e!.overrideLights || false,
            overrideNotes: e!.overrideNotes || false,
            saberLeftColor: {
               r: e!.saberLeftColor?.r || 0,
               g: e!.saberLeftColor?.g || 0,
               b: e!.saberLeftColor?.b || 0,
               a: e!.saberLeftColor?.a || 0,
            },
            saberRightColor: {
               r: e!.saberRightColor?.r || 0,
               g: e!.saberRightColor?.g || 0,
               b: e!.saberRightColor?.b || 0,
               a: e!.saberRightColor?.a || 0,
            },
            environment0Color: {
               r: e!.environment0Color?.r || 0,
               g: e!.environment0Color?.g || 0,
               b: e!.environment0Color?.b || 0,
               a: e!.environment0Color?.a || 0,
            },
            environment1Color: {
               r: e!.environment1Color?.r || 0,
               g: e!.environment1Color?.g || 0,
               b: e!.environment1Color?.b || 0,
               a: e!.environment1Color?.a || 0,
            },
            environment0ColorBoost: {
               r: e!.environment0ColorBoost?.r || 0,
               g: e!.environment0ColorBoost?.g || 0,
               b: e!.environment0ColorBoost?.b || 0,
               a: e!.environment0ColorBoost?.a || 0,
            },
            environment1ColorBoost: {
               r: e!.environment1ColorBoost?.r || 0,
               g: e!.environment1ColorBoost?.g || 0,
               b: e!.environment1ColorBoost?.b || 0,
               a: e!.environment1ColorBoost?.a || 0,
            },
            obstaclesColor: {
               r: e!.obstaclesColor?.r || 0,
               g: e!.obstaclesColor?.g || 0,
               b: e!.obstaclesColor?.b || 0,
               a: e!.obstaclesColor?.a || 0,
            },
         };
         if (e!.environmentWColor) {
            cs.environmentWColor = {
               r: e!.environmentWColor?.r || 0,
               g: e!.environmentWColor?.g || 0,
               b: e!.environmentWColor?.b || 0,
               a: e!.environmentWColor?.a || 0,
            };
         }
         if (e!.environmentWColorBoost) {
            cs.environmentWColorBoost = {
               r: e!.environmentWColorBoost?.r || 0,
               g: e!.environmentWColorBoost?.g || 0,
               b: e!.environmentWColorBoost?.b || 0,
               a: e!.environmentWColorBoost?.a || 0,
            };
         }
         return cs;
      });
      this.difficulties = (
         data.difficulties ?? Info.defaultValue.difficulties
      ).map((e) => new InfoBeatmap(e));
      this.customData = deepCopy(
         data.customData ?? Info.defaultValue.customData,
      );
   }

   override isValid(
      fn?: (object: this) => boolean,
      override?: boolean,
   ): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         this.audio.filename !== '' &&
         this.audio.duration > 0 &&
         this.audio.previewDuration > 0 &&
         this.audio.previewStartTime > 0 &&
         this.audio.audioOffset >= 0 &&
         this.difficulties.every((e) => e.isValid());
   }

   version: number;
   filename: LooseAutocomplete<'Info.dat' | 'info.dat'>;

   song: IWrapInfoSong;
   audio: IWrapInfoAudio;
   songPreviewFilename: string;
   coverImageFilename: string;
   environmentBase: {
      normal: EnvironmentName | EnvironmentV3Name | null;
      allDirections: Environment360Name | null;
   };
   environmentNames: EnvironmentAllName[];
   colorSchemes: IWrapInfoColorScheme[];
   difficulties: InfoBeatmap[];

   override clone<U extends this>(): U {
      return super.clone().setFilename(this.filename) as U;
   }

   setFilename(filename: LooseAutocomplete<'Info.dat' | 'info.dat'>): this {
      this.filename = filename;
      return this;
   }
   setVersion(version: number): this {
      this.version = version;
      return this;
   }

   /** Sort beatmap object(s) accordingly. */
   override sort(): this {
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

   addMap(
      data: DeepPartialIgnore<IWrapInfoBeatmap, 'customData'>,
   ): this {
      this.difficulties.push(new InfoBeatmap(data));
      return this;
   }
}
