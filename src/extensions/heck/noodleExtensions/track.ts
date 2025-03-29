import type { INEObject } from './types/object.ts';

/**
 * Add track(s) to object(s).
 */
export function addTrack<
   T extends Pick<INEObject, 'customData'>,
>(objects: T[], track: string | string[]): void;
export function addTrack<
   T extends Pick<INEObject, 'customData'>,
>(object: T, track: string | string[]): void;
export function addTrack<
   T extends Pick<INEObject, 'customData'>,
>(objects: T | T[], track: string | string[]): void {
   if (!Array.isArray(objects)) {
      if (typeof track === 'string') {
         if (!objects.customData.track) {
            objects.customData.track = track;
         } else if (Array.isArray(objects.customData.track)) {
            if (!objects.customData.track.includes(track)) {
               objects.customData.track.push(track);
            }
         } else if (objects.customData.track !== track) {
            objects.customData.track = [objects.customData.track, track];
         }
      } else {
         track.forEach((t) => addTrack(objects, t));
      }
      return;
   }
   objects.forEach((obj) => {
      addTrack(obj, track);
   });
}

/**
 * Remove track(s) from object(s).
 */
export function removeTrack<
   T extends Pick<INEObject, 'customData'>,
>(objects: T[], track: string | string[]): void;
export function removeTrack<
   T extends Pick<INEObject, 'customData'>,
>(object: T, track: string | string[]): void;
export function removeTrack<
   T extends Pick<INEObject, 'customData'>,
>(objects: T | T[], track: string | string[]): void {
   if (!Array.isArray(objects)) {
      if (typeof track === 'string') {
         if (!objects.customData.track) {
            return;
         } else if (Array.isArray(objects.customData.track)) {
            if (objects.customData.track.includes(track)) {
               objects.customData.track = objects.customData.track.filter(
                  (t: string) => t !== track,
               );
               if (objects.customData.track.length === 1) {
                  objects.customData.track = objects.customData.track[0];
               }
            }
         } else if (objects.customData.track === track) {
            delete objects.customData.track;
         }
      } else {
         track.forEach((t) => removeTrack(objects, t));
      }
      return;
   }
   objects.forEach((obj) => {
      removeTrack(obj, track);
   });
}
