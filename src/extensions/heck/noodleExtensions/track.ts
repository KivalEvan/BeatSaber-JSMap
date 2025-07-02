import type { INEObject } from './types/object.ts';

function _addTrack(
   currentTrack?: string | (string | null | undefined)[] | null,
   trackToAdd?: string | string[] | null,
): string | string[] | undefined {
   if (!trackToAdd) {
      return typeof currentTrack === 'string'
         ? currentTrack
         : Array.isArray(currentTrack)
         ? (currentTrack.filter((s) => s) as string[])
         : undefined;
   }
   if (typeof trackToAdd === 'string') {
      return _addTrack(currentTrack, [trackToAdd]);
   }
   if (typeof currentTrack === 'string') {
      return [currentTrack, ...trackToAdd];
   }
   if (Array.isArray(currentTrack)) {
      currentTrack.push(...trackToAdd);
      return currentTrack.filter((s) => s) as string[];
   }
   return [...trackToAdd];
}

function _removeTrack(
   currentTrack?: string | (string | null | undefined)[] | null,
   trackToRemove?: string | string[] | null,
): string | string[] | undefined {
   if (!trackToRemove || !currentTrack) {
      return typeof currentTrack === 'string'
         ? currentTrack
         : Array.isArray(currentTrack)
         ? (currentTrack.filter((s) => s) as string[])
         : undefined;
   }
   if (typeof currentTrack === 'string') {
      return currentTrack === trackToRemove ? undefined : currentTrack;
   }
   if (typeof trackToRemove === 'string') {
      return _removeTrack(currentTrack, [trackToRemove]);
   }
   for (const track of trackToRemove) {
      currentTrack.splice(currentTrack.indexOf(track), 1);
   }
   return currentTrack.length ? (currentTrack.filter((s) => s) as string[]) : undefined;
}

/**
 * Add track(s) to object(s).
 */
export function addTrack<T extends { customData?: INEObject['customData'] }>(
   objects: T[],
   track: string | string[] | undefined,
): T[];
export function addTrack<T extends { customData?: INEObject['customData'] }>(
   object: T,
   track: string | string[] | undefined,
): T;
export function addTrack<T extends { customData?: INEObject['customData'] }>(
   objects: T | T[],
   track: string | string[] | undefined,
): T | T[] {
   if (!Array.isArray(objects)) {
      objects.customData ||= {};
      objects.customData.track = _addTrack(objects.customData.track, track);
   } else {
      objects.forEach((obj) => {
         addTrack(obj, track);
      });
   }
   return objects;
}

/**
 * Remove track(s) from object(s).
 */
export function removeTrack<T extends { customData?: INEObject['customData'] }>(
   objects: T[],
   track: string | string[] | undefined,
): T[];
export function removeTrack<T extends { customData?: INEObject['customData'] }>(
   object: T,
   track: string | string[] | undefined,
): T;
export function removeTrack<T extends { customData?: INEObject['customData'] }>(
   objects: T | T[],
   track: string | string[] | undefined,
): T | T[] {
   if (!Array.isArray(objects)) {
      if (objects.customData) {
         objects.customData.track = _removeTrack(
            objects.customData.track,
            track,
         );
      }
   } else {
      objects.forEach((obj) => {
         removeTrack(obj, track);
      });
   }
   return objects;
}
