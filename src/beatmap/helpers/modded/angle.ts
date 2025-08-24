import type { ICustomDataNote } from '../../core/types/custom/note.ts';

/**
 * Get direction angle of Noodle Extensions in beatmap v2.
 */
export function getNoodleExtensionsAngleV2<
   T extends { customData: Pick<ICustomDataNote, '_cutDirection'> },
>(data: T): number | null {
   if (data.customData._cutDirection) {
      return data.customData._cutDirection > 0
         ? data.customData._cutDirection % 360
         : 360 + (data.customData._cutDirection % 360);
   }
   return null;
}
