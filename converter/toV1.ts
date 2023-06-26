import logger from '../logger.ts';
import { Difficulty as DifficultyV1 } from '../beatmap/v1/difficulty.ts';
import { Difficulty as DifficultyV2 } from '../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../beatmap/v3/difficulty.ts';
import { Note } from '../beatmap/v1/note.ts';
import { Event } from '../beatmap/v1/event.ts';
import { Obstacle } from '../beatmap/v1/obstacle.ts';
import { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';
import { IWrapInfo, IWrapInfoBeatmap } from '../types/beatmap/wrapper/info.ts';
import { Info as InfoV1, InfoBeatmap } from '../beatmap/v1/info.ts';
import { deepCopy } from '../utils/misc.ts';
import { CharacteristicName } from '../types/beatmap/shared/characteristic.ts';

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
   info: IWrapInfo,
   infoDifficulty: IWrapInfoBeatmap,
): DifficultyV1 {
   if (data instanceof DifficultyV1) {
      return data;
   }

   logger.tWarn(tag('toV1'), 'Converting beatmap to v1 may lose certain data!');
   const template = new DifficultyV1();
   template.fileName = data.fileName;

   template.beatsPerMinute = info.beatsPerMinute;
   template.shuffle = info.shuffle;
   template.shufflePeriod = info.shufflePeriod;
   template.noteJumpSpeed = infoDifficulty.njs;
   template.noteJumpStartBeatOffset = infoDifficulty.njsOffset;

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

export function toInfoV1(data: IWrapInfo): InfoV1 {
   if (data instanceof InfoV1) {
      return data;
   }

   const template = new InfoV1();

   template.songName = data.songName;
   template.songSubName = data.songSubName;
   template.songAuthorName = data.songAuthorName;
   template.beatsPerMinute = data.beatsPerMinute;
   template.previewStartTime = data.previewStartTime;
   template.previewDuration = data.previewDuration;
   template.coverImageFilename = data.coverImageFilename;
   template.environmentName = data.environmentName;
   // deno-lint-ignore no-explicit-any
   template.difficultySets = Object.entries(data.difficultySets).reduce(
      (sets: any, [mode, beatmaps]) => {
         sets[mode as CharacteristicName] = beatmaps.map((m) => {
            return new InfoBeatmap({
               difficulty: m.difficulty,
               difficultyRank: m.rank as 1,
               audioPath: data.songFilename,
               jsonPath: m.filename,
               characteristic: mode as 'Standard',
               offset: m.customData?._editorOffset,
               oldOffset: m.customData?._editorOldOffset,
               chromaToggle: 'Off',
               customColors: !!(
                  m.customData?._colorLeft ||
                  m.customData?._colorRight ||
                  m.customData?._envColorLeft ||
                  m.customData?._envColorRight ||
                  m.customData?._obstacleColor
               ),
               difficultyLabel: m.customData?._difficultyLabel,
               colorLeft: deepCopy(m.customData._colorLeft),
               colorRight: deepCopy(m.customData._colorRight),
               envColorLeft: deepCopy(m.customData._envColorLeft),
               envColorRight: deepCopy(m.customData._envColorRight),
               obstacleColor: deepCopy(m.customData._obstacleColor),
            });
         });
         return sets;
      },
      {},
   );
   template.oneSaber = !!data.difficultySets.OneSaber?.length;
   template.contributors = data.customData?._contributors;
   template.customEnvironment = data.customData?._customEnvironment;
   template.customEnvironmentHash = data.customData?._customEnvironmentHash;

   return template;
}
