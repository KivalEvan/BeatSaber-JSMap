// deno-lint-ignore-file no-explicit-any
import type { BeatmapFileType } from '../../types/beatmap/shared/schema.ts';
import type { Version } from '../../types/beatmap/shared/version.ts';

/**
 * Get implicit version based on beatmap type.
 *
 * The implicit version is used when the version is not specified
 * in the beatmap due to certain issues related within time period.
 */
export function implicitVersion(type: BeatmapFileType): Version {
   switch (type) {
      case 'info':
      case 'difficulty':
         return '2.0.0';
      case 'lightshow':
         return '3.0.0';
      default:
         return '4.0.0';
   }
}

/** Get beatmap version from JSON. */
export function retrieveVersion<T extends Record<string, any>>(
   json: T,
): Version | null {
   const ver = json._version ?? json.version;
   if (typeof ver !== 'string') {
      return null;
   }
   return ver as unknown as Version;
}

/**
 * Compare version between two versions.
 *
 * @returns -1 if current version is lower, 1 if higher, 0 if equal
 */
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
   return version.split('.').map((el) => parseInt(el));
}
