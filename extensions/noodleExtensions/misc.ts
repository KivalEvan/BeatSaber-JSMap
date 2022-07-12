import { INENote, INEObject } from './types/object.ts';

/** Set uninteractible to object from start to end object. */
export function setUninteractible(objects: INEObject[], bool: boolean): void {
    objects.forEach((o) => {
        if (bool) {
            o.customData.uninteractable = bool;
        }
        if (!bool && typeof o.customData.uninteractable === 'boolean') {
            o.customData.uninteractable = bool;
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
