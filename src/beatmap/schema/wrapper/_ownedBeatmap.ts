import type { IWrapBeatmap } from './types/beatmap.ts';
import type { IWrapDifficulty } from './types/difficulty.ts';
import type { IWrapLightshow } from './types/lightshow.ts';
import { copyCustomData } from './copyCustomData.ts';

type OwnedBeatmapData =
   & Partial<Omit<IWrapBeatmap, 'difficulty' | 'lightshow'>>
   & {
      difficulty?: Partial<IWrapDifficulty>;
      lightshow?: Partial<IWrapLightshow>;
   };

export function assembleOwnedBeatmap(data: OwnedBeatmapData): IWrapBeatmap {
   const version = data.version ?? -1;
   const filename = data.filename ?? 'Unnamed.beatmap.dat';
   const lightshowFilename = data.lightshowFilename ?? 'Unnamed.lightshow.dat';
   const difficulty = data.difficulty ?? {};
   const wrappedDifficulty: IWrapDifficulty = {
      bpmEvents: difficulty.bpmEvents ?? [],
      rotationEvents: difficulty.rotationEvents ?? [],
      colorNotes: difficulty.colorNotes ?? [],
      bombNotes: difficulty.bombNotes ?? [],
      obstacles: difficulty.obstacles ?? [],
      arcs: difficulty.arcs ?? [],
      chains: difficulty.chains ?? [],
      njsEvents: difficulty.njsEvents ?? [],
      customData: copyCustomData(difficulty.customData),
   };
   const lightshow = data.lightshow ?? {};
   const wrappedLightshow: IWrapLightshow = {
      waypoints: lightshow.waypoints ?? [],
      basicEvents: lightshow.basicEvents ?? [],
      colorBoostEvents: lightshow.colorBoostEvents ?? [],
      lightColorEventBoxGroups: lightshow.lightColorEventBoxGroups ?? [],
      lightRotationEventBoxGroups: lightshow.lightRotationEventBoxGroups ?? [],
      lightTranslationEventBoxGroups: lightshow.lightTranslationEventBoxGroups ?? [],
      fxEventBoxGroups: lightshow.fxEventBoxGroups ?? [],
      basicEventTypesWithKeywords: {
         list: lightshow.basicEventTypesWithKeywords?.list ?? [],
      },
      useNormalEventsAsCompatibleEvents: !!lightshow.useNormalEventsAsCompatibleEvents,
      customData: copyCustomData(lightshow.customData),
   };

   return {
      version,
      filename,
      lightshowFilename,
      difficulty: wrappedDifficulty,
      lightshow: wrappedLightshow,
      customData: copyCustomData(data.customData),
   };
}
