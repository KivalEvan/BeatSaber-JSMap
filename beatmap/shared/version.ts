import type { Version } from '../../types/beatmap/shared/version.ts';

export function retrieveVersion(json: Record<string, unknown>): Version | null {
   const ver = json._version ?? json.version;
   if (typeof ver !== 'string') {
      return null;
   }
   return ver as unknown as Version;
}

/** Internal use, compare beatmap version to another. */
export function compareVersion(
   current: Version,
   compareTo: Version,
): -1 | 0 | 1 {
   const verCurrent = getVersionArray(current);
   const verCompareTo = getVersionArray(compareTo);
   for (const num in verCurrent) {
      if (verCurrent[num] < verCompareTo[num]) {
         return -1;
      }
      if (verCurrent[num] > verCompareTo[num]) {
         return 1;
      }
   }
   return 0;
}

function getVersionArray(version: Version): number[] {
   return version
      .split('.')
      .map((el) => parseInt(el));
}
