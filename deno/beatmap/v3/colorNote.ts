import { ColorNote } from './types/colorNote.ts';
import { radToDeg, shortRotDistance } from '../../utils.ts';
import { NoteCutAngle } from './types/constants.ts';

/** Get note and return the Beatwalls' position x and y value in tuple.
 * ```ts
 * const notePos = colorNote.getPosition(note);
 * ```
 */
export const getPosition = (note: ColorNote): [number, number] => {
    // if (note._customData?._position) {
    //     return [note._customData._position[0], note._customData._position[1]];
    // }
    return [
        (note.posX <= -1000
            ? note.posX / 1000
            : note.posX >= 1000
            ? note.posX / 1000
            : note.posX) - 2,
        note.posY <= -1000
            ? note.posY / 1000
            : note.posY >= 1000
            ? note.posY / 1000
            : note.posY,
    ];
};

/** Get note and return standardised note angle.
 * ```ts
 * const noteAngle = colorNote.getAngle(note);
 * ```
 */
export const getAngle = (note: ColorNote): number => {
    return (NoteCutAngle[note.direction] || 0) + note.angleOffset;
};

/** Get two notes and return the distance between two notes.
 * ```ts
 * const noteDistance = colorNote.distance(note1, note2);
 * ```
 */
export const distance = (n1: ColorNote, n2: ColorNote): number => {
    const [nX1, nY1] = getPosition(n1);
    const [nX2, nY2] = getPosition(n2);
    return Math.sqrt(Math.pow(nX2 - nX1, 2) + Math.pow(nY2 - nY1, 2));
};

/** Compare two notes and return if the notes is in vertical alignment.
 * ```ts
 * if (colorNote.isVertical(note1, note2)) {}
 * ```
 */
export const isVertical = (n1: ColorNote, n2: ColorNote): boolean => {
    const [nX1] = getPosition(n1);
    const [nX2] = getPosition(n2);
    const d = nX1 - nX2;
    return d > -0.001 && d < 0.001;
};

/** Compare two notes and return if the notes is in horizontal alignment.
 * ```ts
 * if (colorNote.isHorizontal(note1, note2)) {}
 * ```
 */
export const isHorizontal = (n1: ColorNote, n2: ColorNote): boolean => {
    const [_, nY1] = getPosition(n1);
    const [_2, nY2] = getPosition(n2);
    const d = nY1 - nY2;
    return d > -0.001 && d < 0.001;
};

/** Compare two notes and return if the notes is in diagonal alignment.
 * ```ts
 * if (colorNote.isDiagonal(note1, note2)) {}
 * ```
 */
export const isDiagonal = (n1: ColorNote, n2: ColorNote): boolean => {
    const [nX1, nY1] = getPosition(n1);
    const [nX2, nY2] = getPosition(n2);
    const dX = Math.abs(nX1 - nX2);
    const dY = Math.abs(nY1 - nY2);
    return dX === dY;
};

/** Compare two notes and return if the notes is an inline.
 * ```ts
 * if (colorNote.isInline(note1, note2)) {}
 * ```
 */
export const isInline = (n1: ColorNote, n2: ColorNote, lapping = 0.5): boolean => {
    return distance(n1, n2) <= lapping;
};

/** Compare current note with the note ahead of it and return if the notes is a double.
 * ```ts
 * if (colorNote.isDouble(note, notes, index)) {}
 * ```
 */
export const isDouble = (
    note: ColorNote,
    notes: ColorNote[],
    index: number
): boolean => {
    for (let i = index, len = notes.length; i < len; i++) {
        if (notes[i].time < note.time + 0.01 && notes[i].color !== note.color) {
            return true;
        }
        if (notes[i].time > note.time + 0.01) {
            return false;
        }
    }
    return false;
};

/** Compare two notes and return if the notes is adjacent.
 * ```ts
 * if (colorNote.isAdjacent(note1, note2)) {}
 * ```
 */
export const isAdjacent = (n1: ColorNote, n2: ColorNote): boolean => {
    const d = distance(n1, n2);
    return d > 0.499 && d < 1.001;
};

/** Compare two notes and return if the notes is a window.
 * ```ts
 * if (colorNote.isWindow(note1, note2)) {}
 * ```
 */
export const isWindow = (n1: ColorNote, n2: ColorNote): boolean => {
    return distance(n1, n2) > 1.8;
};

/** Compare two notes and return if the notes is a slanted window.
 * ```ts
 * if (colorNote.isSlantedWindow(note1, note2)) {}
 * ```
 */
export const isSlantedWindow = (n1: ColorNote, n2: ColorNote): boolean => {
    return (
        isWindow(n1, n2) &&
        !isDiagonal(n1, n2) &&
        !isHorizontal(n1, n2) &&
        !isVertical(n1, n2)
    );
};

/** Check if the note intersect on swing path by angle and distance.
 * ```ts
 * if (colorNote.isIntersect(note1, note2, [[20, 1.5]])) {}
 * ```
 */
// a fkin abomination that's what this is
export const isIntersect = (
    n1: ColorNote,
    n2: ColorNote,
    angleDistances: [number, number, number?][],
    ahead = false
): [boolean, boolean] => {
    const [nX1, nY1] = getPosition(n1);
    const [nX2, nY2] = getPosition(n2);
    const nA1 = getAngle(n1);
    const nA2 = getAngle(n2);
    const angle = ahead ? 540 : 360;
    let resultN1 = false;
    if (n1.direction !== 8) {
        const a = (radToDeg(Math.atan2(nY1 - nY2, nX1 - nX2)) + 450) % 360;
        for (const [angleRange, maxDistance, offsetT] of angleDistances) {
            const offset = offsetT ?? 0;
            const aS = (nA1 + angle - angleRange + offset) % 360;
            const aE = (nA1 + angle + angleRange + offset) % 360;
            resultN1 =
                (maxDistance >=
                    Math.sqrt(Math.pow(nX1 - nX2, 2) + Math.pow(nY1 - nY2, 2)) &&
                    ((aS < aE && aS <= a && a <= aE) ||
                        (aS >= aE && (a <= aE || a >= aS)))) ||
                resultN1;
            if (resultN1) {
                break;
            }
        }
    }
    let resultN2 = false;
    if (n2.direction !== 8) {
        const a = (radToDeg(Math.atan2(nY2 - nY1, nX2 - nX1)) + 450) % 360;
        for (const [angleRange, maxDistance, offsetT] of angleDistances) {
            const offset = offsetT ?? 0;
            const aS = (nA2 + angle - angleRange + offset) % 360;
            const aE = (nA2 + angle + angleRange + offset) % 360;
            resultN2 =
                (maxDistance >=
                    Math.sqrt(Math.pow(nX1 - nX2, 2) + Math.pow(nY1 - nY2, 2)) &&
                    ((aS < aE && aS <= a && a <= aE) ||
                        (aS >= aE && (a <= aE || a >= aS)))) ||
                resultN2;
            if (resultN2) {
                break;
            }
        }
    }
    return [resultN1, resultN2];
};

// TODO: update with new position/rotation system
export const isEnd = (
    currNote: ColorNote,
    prevNote: ColorNote,
    cd: number
): boolean => {
    // fuck u and ur dot note stack
    if (currNote.direction === 8 && prevNote.direction === 8 && cd !== 8) {
        // if end note on right side
        if (currNote.posX > prevNote.posX) {
            if (cd === 5 || cd === 3 || cd === 7) {
                return true;
            }
        }
        // if end note on left side
        if (currNote.posX < prevNote.posX) {
            if (cd === 6 || cd === 2 || cd === 4) {
                return true;
            }
        }
        // if end note is above
        if (currNote.posY > prevNote.posY) {
            if (cd === 4 || cd === 0 || cd === 5) {
                return true;
            }
        }
        // if end note is below
        if (currNote.posY < prevNote.posY) {
            if (cd === 6 || cd === 1 || cd === 7) {
                return true;
            }
        }
    }
    // if end note on right side
    if (currNote.posX > prevNote.posX) {
        // check if end note is arrowed
        if (
            currNote.direction === 5 ||
            currNote.direction === 3 ||
            currNote.direction === 7
        ) {
            return true;
        }
        // check if end note is dot and start arrow is pointing to it
        if (
            (prevNote.direction === 5 ||
                prevNote.direction === 3 ||
                prevNote.direction === 7) &&
            currNote.direction === 8
        ) {
            return true;
        }
    }
    // if end note on left side
    if (currNote.posX < prevNote.posX) {
        if (
            currNote.direction === 6 ||
            currNote.direction === 2 ||
            currNote.direction === 4
        ) {
            return true;
        }
        if (
            (prevNote.direction === 6 ||
                prevNote.direction === 2 ||
                prevNote.direction === 4) &&
            currNote.direction === 8
        ) {
            return true;
        }
    }
    // if end note is above
    if (currNote.posY > prevNote.posY) {
        if (
            currNote.direction === 4 ||
            currNote.direction === 0 ||
            currNote.direction === 5
        ) {
            return true;
        }
        if (
            (prevNote.direction === 4 ||
                prevNote.direction === 0 ||
                prevNote.direction === 5) &&
            currNote.direction === 8
        ) {
            return true;
        }
    }
    // if end note is below
    if (currNote.posY < prevNote.posY) {
        if (
            currNote.direction === 6 ||
            currNote.direction === 1 ||
            currNote.direction === 7
        ) {
            return true;
        }
        if (
            (prevNote.direction === 6 ||
                prevNote.direction === 1 ||
                prevNote.direction === 7) &&
            currNote.direction === 8
        ) {
            return true;
        }
    }
    return false;
};

// TODO: update with new position/rotation system
export const predictDirection = (currNote: ColorNote, prevNote: ColorNote): number => {
    if (isEnd(currNote, prevNote, 8)) {
        return currNote.direction === 8 ? prevNote.direction : currNote.direction;
    }
    if (currNote.direction !== 8) {
        return currNote.direction;
    }
    if (currNote.time > prevNote.time) {
        // if end note on right side
        if (currNote.posX > prevNote.posX) {
            if (isHorizontal(currNote, prevNote)) {
                return 3;
            }
        }
        // if end note on left side
        if (currNote.posX < prevNote.posX) {
            if (isHorizontal(currNote, prevNote)) {
                return 2;
            }
        }
        // if end note is above
        if (currNote.posY > prevNote.posY) {
            if (isVertical(currNote, prevNote)) {
                return 0;
            }
            if (currNote.posX > prevNote.posX) {
                return 5;
            }
            if (currNote.posX < prevNote.posX) {
                return 4;
            }
        }
        // if end note is below
        if (currNote.posY < prevNote.posY) {
            if (isVertical(currNote, prevNote)) {
                return 1;
            }
            if (currNote.posX > prevNote.posX) {
                return 7;
            }
            if (currNote.posX < prevNote.posX) {
                return 6;
            }
        }
    }
    return 8;
};

/** Check if note has Mapping Extensions properties.
 * ```ts
 * if (colorNote.hasMappingExtensions(note)) {}
 * ```
 */
export const hasMappingExtensions = (note: ColorNote): boolean => {
    return note.posX > 3 || note.posX < 0 || note.posY > 2 || note.posY < 0;
};

/** Check if note has a valid cut direction.
 * ```ts
 * if (colorNote.isValidDirection(note)) {}
 * ```
 */
export const isValidDirection = (note: ColorNote): boolean => {
    return note.direction >= 0 && note.direction <= 8;
};

/** Check if note is a valid, vanilla note.
 * ```ts
 * if (colorNote.isValid(note)) {}
 * ```
 */
export const isValid = (note: ColorNote): boolean => {
    return !hasMappingExtensions(note) && isValidDirection(note);
};

/** Count number of specified line index in a given array and return a counted number of line index.
 * ```ts
 * const indexCount = colorNote.colorountX(notes, 0);
 * ```
 */
export const countX = (notes: ColorNote[], i: number): number => {
    return notes.filter((n) => n.posX === i).length;
};

/** Count number of specified line layer in a given array and return a counted number of line layer.
 * ```ts
 * const layerCount = colorNote.colorountY(notes, 0);
 * ```
 */
export const countY = (notes: ColorNote[], l: number): number => {
    return notes.filter((n) => n.posY === l).length;
};

/** Count number of specified line index and line layer in a given array and return a counted number of line index and line layer.
 * ```ts
 * const indexLayerCount = colorNote.colorountXY(notes, 0, 0);
 * ```
 */
export const countXY = (notes: ColorNote[], i: number, l: number): number => {
    return notes.filter((n) => n.posX === i && n.posY === l).length;
};

/** Count number of specified `_cutDirection` in a given array and return a counted number of `_cutDirection`.
 * ```ts
 * const cdCount = colorNote.colorountDirection(notes, 0);
 * ```
 */
export const countDirection = (notes: ColorNote[], cd: number): number => {
    return notes.filter((n) => n.direction === cd).length;
};

/** Count number of specified angle in a given array and return a counted number of angle.
 * ```ts
 * const angleCount = colorNote.colorountAngle(notes, 0);
 * ```
 */
export const countAngle = (notes: ColorNote[], angle: number): number => {
    return notes.filter((n) => getAngle(n) === angle).length;
};

/** Check the angle equality of the two notes.
 * @param {(ColorNote|number|null)} n1 - First beatmap note, note `_cutDirection`, or null value
 * @param {(ColorNote|number|null)} n2 - Second beatmap note, note `_cutDirection`, or null value
 * @param {number} angleTol - Angle tolerance
 * @param {boolean} equal - If it should check inner or outer angle
 * @returns {boolean} If condition is met
 */
export const checkDirection = (
    n1: ColorNote | number | null,
    n2: ColorNote | number | null,
    angleTol: number,
    equal: boolean
): boolean => {
    let nA1!: number;
    let nA2!: number;
    if (n1 === null || n2 === null) {
        return false;
    }
    if (typeof n1 === 'number') {
        nA1 = n1;
    } else {
        if (n1.direction === 8) {
            return false;
        }
        nA1 = getAngle(n1);
    }
    if (typeof n2 === 'number') {
        nA2 = n2;
    } else {
        if (n2.direction === 8) {
            return false;
        }
        nA2 = getAngle(n2);
    }
    return equal
        ? shortRotDistance(nA1, nA2, 360) <= angleTol
        : shortRotDistance(nA1, nA2, 360) >= angleTol;
};
