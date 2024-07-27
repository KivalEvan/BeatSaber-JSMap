import type { IChromaNote } from './types/colors.ts';

/** Enable look for note from start to end. */
export function setSpawnEffect(objects: IChromaNote[], bool: boolean): void {
   objects.forEach((o) => {
      o.customData.spawnEffect = bool;
   });
}
