// deno-lint-ignore-file no-explicit-any
import type { v1, v2, v3, v4 } from '../mod.ts';
import type { IWrapAudioDataAttribute } from '../wrapper/audioData.ts';
import type { IWrapBeatmapAttribute } from '../wrapper/beatmap.ts';
import type { IWrapInfoAttribute } from '../wrapper/info.ts';
import type { BeatmapFileType } from './schema.ts';

export type InferBeatmapVersion<
   TFileType extends BeatmapFileType,
> = TFileType extends 'info' ? 1 | 2 | 4
   : TFileType extends 'audioData' ? 2 | 4
   : TFileType extends 'difficulty' ? 1 | 2 | 3 | 4
   : TFileType extends 'lightshow' ? 3 | 4
   : number;

export type InferBeatmapAttribute<
   TFileType extends BeatmapFileType,
> = TFileType extends 'info' ? IWrapInfoAttribute
   : TFileType extends 'audioData' ? IWrapAudioDataAttribute
   : TFileType extends 'difficulty' | 'lightshow' ? IWrapBeatmapAttribute
   : Record<string, any>;

type InfoSerialMap = [never, v1.IInfo, v2.IInfo, never, v4.IInfo];
type AudioDataSerialMap = [never, never, v2.IBPMInfo, never, v4.IAudio];
type DifficultySerialMap = [never, v1.IDifficulty, v2.IDifficulty, v3.IDifficulty, v4.IDifficulty];
type LightshowSerialMap = [never, never, never, v3.ILightshow, v4.ILightshow];

export type InferBeatmapSerial<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType> = InferBeatmapVersion<TFileType>,
> = TFileType extends 'info' ? InfoSerialMap[TVersion]
   : TFileType extends 'audioData' ? AudioDataSerialMap[TVersion]
   : TFileType extends 'difficulty' ? DifficultySerialMap[TVersion]
   : TFileType extends 'lightshow' ? LightshowSerialMap[TVersion]
   : Record<string, any>;
