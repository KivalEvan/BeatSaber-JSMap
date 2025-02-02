import type { INEObject } from './types/object.ts';

/**
 * Set uninteractible to object from start to end object.
 *
 * This is highly-recommended for any non-interactive object to improve performance.
 */
export function setUninteractible<T extends INEObject>(objects: T[], bool: boolean): void {
   objects.forEach((o) => {
      if (bool) {
         o.customData.uninteractable = bool;
      }
      if (!bool && typeof o.customData.uninteractable === 'boolean') {
         delete o.customData.uninteractable;
      }
   });
}

/** Enable gravity for note from start to end. */
export function setNoteGravity<T extends INEObject>(objects: T[], bool: boolean): void {
   objects.forEach((o) => {
      if (!bool) {
         o.customData.disableNoteGravity = !bool;
      }
      if (bool && typeof o.customData.disableNoteGravity === 'boolean') {
         delete o.customData.disableNoteGravity;
      }
   });
}

/** Enable look for note from start to end. */
export function setNoteLook<T extends INEObject>(objects: T[], bool: boolean): void {
   objects.forEach((o) => {
      if (!bool) {
         o.customData.disableNoteLook = !bool;
      }
      if (bool && typeof o.customData.disableNoteLook === 'boolean') {
         delete o.customData.disableNoteLook;
      }
   });
}
