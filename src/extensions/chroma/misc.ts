import type { IChromaNote } from './types/colors.ts';

/** Enable look for note from start to end. */
export function setSpawnEffect<T extends IChromaNote>(objects: T[], bool: boolean): void {
   objects.forEach((o) => {
      o.customData.spawnEffect = bool;
   });
}
