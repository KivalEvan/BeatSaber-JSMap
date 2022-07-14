import { INENote, INEObject } from './types/object.ts';

/** Set fake to object from start to end object. */
export function setFake(objects: INEObject[], bool: boolean): void {
    objects.forEach((o) => {
        if (bool) {
            o.customData.NE_fake = bool;
        }
        if (!bool && typeof o.customData.NE_fake === 'boolean') {
            delete o.customData.NE_fake;
        }
    });
}

/** Set uninteractible to object from start to end object.
 *
 * This is highly-recommended for any non-interactive object to improve performance.
 */
export function setUninteractible(objects: INEObject[], bool: boolean): void {
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
export function setNoteGravity(objects: INENote[], bool: boolean): void {
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
export function setNoteLook(objects: INENote[], bool: boolean): void {
    objects.forEach((o) => {
        if (!bool) {
            o.customData.disableNoteLook = !bool;
        }
        if (bool && typeof o.customData.disableNoteLook === 'boolean') {
            delete o.customData.disableNoteLook;
        }
    });
}
