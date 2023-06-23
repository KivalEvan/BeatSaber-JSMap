import logger from '../logger.ts';
import { Difficulty as DifficultyV1 } from '../beatmap/v1/difficulty.ts';
import { Difficulty as DifficultyV2 } from '../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../beatmap/v3/difficulty.ts';
import { Note } from '../beatmap/v1/note.ts';
import { Event } from '../beatmap/v1/event.ts';
import { Obstacle } from '../beatmap/v1/obstacle.ts';
import { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';
import { IInfo, IInfoSetDifficulty } from '../types/beatmap/shared/info.ts';
import { IInfo as IInfoV1 } from '../types/beatmap/v1/info.ts';
import { deepCopy } from '../utils/misc.ts';

function tag(name: string): string[] {
   return ['convert', name];
}

/** Feeling nostalgic?
 * ```ts
 * const converted = convert.toV1(data);
 * ```
 * ---
 * **WARNING:** Guess you should know this legacy version does not have modern features.
 */
export function toV1(
   data: IWrapDifficulty,
   info: IInfo,
   infoDiff: IInfoSetDifficulty,
): DifficultyV1 {
   if (data instanceof DifficultyV1) {
      return data;
   }

   logger.tWarn(tag('toV1'), 'Converting beatmap to v1 may lose certain data!');
   const template = new DifficultyV1();
   template.fileName = data.fileName;

   template.beatsPerMinute = info._beatsPerMinute;
   template.shuffle = info._shuffle;
   template.shufflePeriod = info._shufflePeriod;
   template.noteJumpSpeed = infoDiff._noteJumpMovementSpeed;
   template.noteJumpStartBeatOffset = infoDiff._noteJumpStartBeatOffset;

   if (data instanceof DifficultyV2) {
      template.time = data.customData._time ?? 0;
      template.BPMChanges = data.customData._bpmChanges ?? [];
      template.bookmarks = data.customData._bookmarks ?? [];
   }

   if (data instanceof DifficultyV3) {
      template.time = data.customData.time ?? 0;
      template.BPMChanges = data.customData.BPMChanges?.map((bpmc) => {
         return {
            _time: bpmc.b,
            _bpm: bpmc.m,
            _beatsPerBar: bpmc.p,
            _metronomeOffset: bpmc.o,
         };
      }) ?? [];
      template.bookmarks = data.customData.bookmarks?.map((b) => {
         return { _time: b.b, _name: b.n };
      }) ?? [];
   }

   template.colorNotes = data.colorNotes.map((obj) => new Note(obj));
   template.obstacles = data.obstacles.map((obj) => new Obstacle(obj));
   template.basicEvents = data.basicEvents.map((obj) => new Event(obj));

   return template;
}

export function toInfoV1(data: IInfo): IInfoV1 {
   data = deepCopy(data);
   return {
      songName: data._songName,
      songSubName: data._songSubName,
      authorName: data._songAuthorName,
      beatsPerMinute: data._beatsPerMinute,
      previewStartTime: data._previewStartTime,
      previewDuration: data._previewDuration,
      coverImagePath: data._coverImageFilename,
      environmentName: data._environmentName,
      difficultyLevels: data._difficultyBeatmapSets.flatMap((d) =>
         d._difficultyBeatmaps.map((m) => {
            return {
               difficulty: m._difficulty,
               difficultyRank: m._difficultyRank,
               audioPath: data._songFilename,
               jsonPath: m._beatmapFilename,
               characteristic: d._beatmapCharacteristicName,
               offset: m._customData?._editorOffset,
               oldOffset: m._customData?._editorOldOffset,
               chromaToggle: 'Off',
               customColors: !!(
                  m._customData?.colorLeft ||
                  m._customData?.colorRight ||
                  m._customData?.envColorLeft ||
                  m._customData?.envColorRight ||
                  m._customData?.obstacleColor
               ),
               difficultyLabel: m._customData?._difficultyLabel,
               colorLeft: m._customData?.colorLeft,
               colorRight: m._customData?.colorRight,
               envColorLeft: m._customData?.envColorLeft,
               envColorRight: m._customData?.envColorRight,
               obstacleColor: m._customData?.obstacleColor,
            };
         })
      ),
      oneSaber: data._difficultyBeatmapSets.some(
         (d) => d._beatmapCharacteristicName === 'OneSaber',
      ),
      contributors: data._customData?._contributors,
      customEnvironment: data._customData?._customEnvironment,
      customEnvironmentHash: data._customData?._customEnvironmentHash,
   };
}
