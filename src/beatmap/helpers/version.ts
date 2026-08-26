// deno-lint-ignore-file no-explicit-any
import type { BeatmapFileType } from '../schema/shared/types/schema.ts';
import type { Version } from '../schema/shared/types/version.ts';

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

/**
 * Get beatmap version from JSON.
 *
 * @returns `undefined` when no version key is present. Otherwise, the raw version
 * value is returned without validation. Callers must check that it is a well-formed
 * version string with `parseMajorVersion` before use.
 */
export function retrieveVersion<T extends Record<string, any>>(
   json: T,
): unknown {
   if (Object.hasOwn(json, '_version')) return json._version;
   if (Object.hasOwn(json, 'version')) return json.version;
   return undefined;
}

// matches `System.Version` grammar: two to four dot-separated unsigned decimal parts
const versionPattern = /^\d+(?:\.\d+){1,3}$/;

/** Maximum accepted part value; each part must fit a signed 32-bit nonnegative integer. */
const maxPartValue = 2147483647;

/**
 * Parse a beatmap version string into its major version number.
 *
 * Mirrors the game's version handling: malformed strings are rejected instead of truncated.
 *
 * ```ts
 * parseMajorVersion('2.6.0'); // 2
 * parseMajorVersion('2'); // undefined
 * parseMajorVersion('2147483648.0'); // undefined
 * parseMajorVersion('2junk'); // undefined
 * ```
 *
 * @returns Major version number, or `undefined` if the string is malformed
 */
export function parseMajorVersion(version: string): number | undefined {
   if (!versionPattern.test(version)) {
      return undefined;
   }
   const parts = version.split('.');
   if (
      parts.some((part) => {
         const significantDigits = part.replace(/^0+/, '') || '0';
         return significantDigits.length > 10 || Number(significantDigits) > maxPartValue;
      })
   ) {
      return undefined;
   }
   return parseInt(parts[0], 10);
}

/**
 * Check if the beatmap file type supports the given major schema version.
 *
 * Supported versions follow each file type's schema availability:
 * info supports v1/v2/v4, audio data supports v2/v4,
 * difficulty supports v1/v2/v3/v4, and lightshow supports v3/v4.
 *
 * @param type Beatmap file type
 * @param major Major version number; must be an integer
 */
export function isSupportedMajorVersion(
   type: BeatmapFileType,
   major: number,
): boolean {
   if (!Number.isInteger(major)) {
      return false;
   }
   switch (type) {
      case 'info':
         return major === 1 || major === 2 || major === 4;
      case 'audioData':
         return major === 2 || major === 4;
      case 'difficulty':
         return major >= 1 && major <= 4;
      case 'lightshow':
         return major === 3 || major === 4;
   }
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
