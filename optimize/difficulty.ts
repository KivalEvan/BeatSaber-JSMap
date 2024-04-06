import type { IOptimizeOptionsDifficulty } from '../types/bsmap/optimize.ts';
import logger from '../logger.ts';
import { cleanDifficulty as cleanV1Difficulty } from '../beatmap/v1/clean.ts';
import { cleanDifficulty as cleanV2Difficulty } from '../beatmap/v2/clean.ts';
import { cleanDifficulty as cleanV3Difficulty } from '../beatmap/v3/clean.ts';
import { cleanDifficulty as cleanV4Difficulty } from '../beatmap/v4/clean.ts';
import type { ICleanOptions } from '../types/beatmap/shared/clean.ts';
import type { IDifficulty } from '../types/beatmap/v4/difficulty.ts';
import { defaultOptions } from './options.ts';
import { remapDedupe } from './_common.ts';

function tag(name: string): string[] {
   return ['optimize', name];
}

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

   if (version === 4 && opt.deduplicate) {
      logger.tInfo(tag('difficulty'), 'Deduplicating beatmap object data');
      const data = difficulty as IDifficulty;
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
   const clean: (data: any, opt: ICleanOptions) => void = version === 4
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
