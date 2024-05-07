import type { IOptimizeOptionsDifficulty } from '../../../types/bsmap/optimize.ts';
import logger from '../../../logger.ts';
import { optimizeDifficulty as cleanV1Difficulty } from '../../schema/v1/optimize.ts';
import { optimizeDifficulty as cleanV2Difficulty } from '../../schema/v2/optimize.ts';
import { optimizeDifficulty as cleanV3Difficulty } from '../../schema/v3/optimize.ts';
import { optimizeDifficulty as cleanV4Difficulty } from '../../schema/v4/optimize.ts';
import type { IOptimizeOptions } from '../../../types/beatmap/options/optimize.ts';
import type { IDifficulty as IDifficultyV3 } from '../../../types/beatmap/v3/difficulty.ts';
import type { IDifficulty as IDifficultyV4 } from '../../../types/beatmap/v4/difficulty.ts';
import { defaultOptions } from './options.ts';
import { remapDedupe, tag } from './_common.ts';

export function difficulty(
   // deno-lint-ignore no-explicit-any
   difficulty: Record<string, any>,
   version: number,
   options: IOptimizeOptionsDifficulty = {},
) {
   const opt: Required<IOptimizeOptionsDifficulty> = {
      enabled: options.enabled ?? defaultOptions.difficulty.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.difficulty.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.difficulty.stringTrim,
      purgeZeros: options.purgeZeros ?? defaultOptions.difficulty.purgeZeros,
      deduplicate: options.deduplicate ?? defaultOptions.difficulty.deduplicate,
      throwError: options.throwError ?? defaultOptions.difficulty.throwError,
   };

   logger.tInfo(tag('difficulty'), `Optimising difficulty data`);

   if (version === 3 && opt.deduplicate) {
      logger.tInfo(tag('difficulty'), 'Deduplicating beatmap object data');
      const data = difficulty as IDifficultyV3;
      const [newFloatFxEvents, remapFloatFxEventsIdx] = remapDedupe(
         data._fxEventsCollection!._fl!,
      );

      data.vfxEventBoxGroups?.forEach((d) => {
         d.e?.forEach(
            (e) => (e.l = e.l?.map((i) => remapFloatFxEventsIdx.get(i) || 0) ?? []),
         );
      });

      data._fxEventsCollection!._fl = newFloatFxEvents;
   }

   if (version === 4 && opt.deduplicate) {
      logger.tInfo(tag('difficulty'), 'Deduplicating beatmap object data');
      const data = difficulty as IDifficultyV4;
      const [newNoteColorData, remapColorNoteIdx] = remapDedupe(
         data.colorNotesData,
      );
      const [newBombNoteData, remapBombNoteIdx] = remapDedupe(
         data.bombNotesData,
      );
      const [newObstacleData, remapObstacleIdx] = remapDedupe(
         data.obstaclesData,
      );
      const [newChainData, remapChainIdx] = remapDedupe(data.chainsData);
      const [newArcData, remapArcIdx] = remapDedupe(data.arcsData);
      const [newSRData, remapSRIdx] = remapDedupe(data.spawnRotationsData);

      data.colorNotes.forEach((d) => (d.i = remapColorNoteIdx.get(d.i!)));
      data.bombNotes.forEach((d) => (d.i = remapBombNoteIdx.get(d.i!)));
      data.obstacles.forEach((d) => (d.i = remapObstacleIdx.get(d.i!)));
      data.chains.forEach((d) => {
         d.ci = remapChainIdx.get(d.ci!);
         d.i = remapColorNoteIdx.get(d.i!);
      });
      data.arcs.forEach((d) => {
         d.ai = remapArcIdx.get(d.ai!);
         d.hi = remapColorNoteIdx.get(d.hi!);
         d.ti = remapColorNoteIdx.get(d.ti!);
      });
      data.spawnRotations.forEach((d) => (d.i = remapSRIdx.get(d.i!)));

      data.colorNotesData = newNoteColorData;
      data.bombNotesData = newBombNoteData;
      data.obstaclesData = newObstacleData;
      data.chainsData = newChainData;
      data.arcsData = newArcData;
      data.spawnRotationsData = newSRData;
   }

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: IOptimizeOptions) => void = version === 4
      ? cleanV4Difficulty
      : version === 3
      ? cleanV3Difficulty
      : version === 2
      ? cleanV2Difficulty
      : version === 1
      ? cleanV1Difficulty
      : () => {};
   clean(difficulty, opt);
}
