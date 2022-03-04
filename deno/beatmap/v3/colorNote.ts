import { ColorNote } from './types/colorNote.ts';
import { radToDeg, shortRotDistance } from '../../utils.ts';
import { LINE_COUNT } from './types/constants.ts';

/** Array index mapped to cut angle corresponding to the `_cutDirection`.
 * ```ts
 * 0 -> 180,
 * 1 -> 0,
 * 2 -> 270,
 * 3 -> 90,
 * 4 -> 225,
 * 5 -> 135,
 * 6 -> 315,
 * 7 -> 45,
 * 8 -> 0
 * ```
 */
export const cutAngle: Readonly<number[]> = [180, 0, 270, 90, 225, 135, 315, 45, 0];

export const flipDirection: Readonly<number[]> = [1, 0, 3, 2, 7, 6, 5, 4, 8];

/** Array index mapped to tuple of `_lineIndex` and `_lineLayer` corresponding to the `_cutDirection`.
 * ```ts
 * 0 -> [0, 1],
 * 1 -> [0, -1],
 * 2 -> [-1, 0],
 * 3 -> [1, 0],
 * 4 -> [-1, 1],
 * 5 -> [1, 1],
 * 6 -> [-1, -1],
 * 7 -> [1, -1],
 * 8 -> [0, 0]
 * ```
 */
export const cutDirectionSpace: { [key: number]: readonly [number, number] } = {
    0: [0, 1],
    1: [0, -1],
    2: [-1, 0],
    3: [1, 0],
    4: [-1, 1],
    5: [1, 1],
    6: [-1, -1],
    7: [1, -1],
    8: [0, 0],
};

/** Mirror color note.
 * ```ts
 * colorNote.mirror(note);
 * colorNote.mirror(noteAry);
 * ```
 */
export const mirror = (note: ColorNote | ColorNote[], flipColor = true) => {
    if (Array.isArray(note)) {
        note.forEach((n) => mirror(n));
        return;
    }
    note.x = LINE_COUNT - 1 - note.x;
    if (flipColor) {
        note.c = ((1 + note.c) % 2) as typeof note.c;
    }
    note.a = 0 - note.a;
    switch (note.d) {
        case 2:
            note.d = 3;
            break;
        case 3:
            note.d = 2;
            break;
        case 6:
            note.d = 7;
            break;
        case 7:
            note.d = 6;
            break;
        case 4:
            note.d = 5;
            break;
        case 5:
            note.d = 4;
            break;
    }
};

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
        (note.x <= -1000 ? note.x / 1000 : note.x >= 1000 ? note.x / 1000 : note.x) - 2,
        note.y <= -1000 ? note.y / 1000 : note.y >= 1000 ? note.y / 1000 : note.y,
    ];
};

/** Get note and return standardised note angle.
 * ```ts
 * const noteAngle = colorNote.getAngle(note);
 * ```
 */
export const getAngle = (note: ColorNote): number => {
    return (cutAngle[note.d] || 0) + note.a;
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
        if (notes[i].b < note.b + 0.01 && notes[i].c !== note.c) {
            return true;
        }
        if (notes[i].b > note.b + 0.01) {
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
    if (n1.d !== 8) {
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
    if (n2.d !== 8) {
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
    if (currNote.d === 8 && prevNote.d === 8 && cd !== 8) {
        // if end note on right side
        if (currNote.x > prevNote.x) {
            if (cd === 5 || cd === 3 || cd === 7) {
                return true;
            }
        }
        // if end note on left side
        if (currNote.x < prevNote.x) {
            if (cd === 6 || cd === 2 || cd === 4) {
                return true;
            }
        }
        // if end note is above
        if (currNote.y > prevNote.y) {
            if (cd === 4 || cd === 0 || cd === 5) {
                return true;
            }
        }
        // if end note is below
        if (currNote.y < prevNote.y) {
            if (cd === 6 || cd === 1 || cd === 7) {
                return true;
            }
        }
    }
    // if end note on right side
    if (currNote.x > prevNote.x) {
        // check if end note is arrowed
        if (currNote.d === 5 || currNote.d === 3 || currNote.d === 7) {
            return true;
        }
        // check if end note is dot and start arrow is pointing to it
        if (
            (prevNote.d === 5 || prevNote.d === 3 || prevNote.d === 7) &&
            currNote.d === 8
        ) {
            return true;
        }
    }
    // if end note on left side
    if (currNote.x < prevNote.x) {
        if (currNote.d === 6 || currNote.d === 2 || currNote.d === 4) {
            return true;
        }
        if (
            (prevNote.d === 6 || prevNote.d === 2 || prevNote.d === 4) &&
            currNote.d === 8
        ) {
            return true;
        }
    }
    // if end note is above
    if (currNote.y > prevNote.y) {
        if (currNote.d === 4 || currNote.d === 0 || currNote.d === 5) {
            return true;
        }
        if (
            (prevNote.d === 4 || prevNote.d === 0 || prevNote.d === 5) &&
            currNote.d === 8
        ) {
            return true;
        }
    }
    // if end note is below
    if (currNote.y < prevNote.y) {
        if (currNote.d === 6 || currNote.d === 1 || currNote.d === 7) {
            return true;
        }
        if (
            (prevNote.d === 6 || prevNote.d === 1 || prevNote.d === 7) &&
            currNote.d === 8
        ) {
            return true;
        }
    }
    return false;
};

// TODO: update with new position/rotation system
export const predictDirection = (currNote: ColorNote, prevNote: ColorNote): number => {
    if (isEnd(currNote, prevNote, 8)) {
        return currNote.d === 8 ? prevNote.d : currNote.d;
    }
    if (currNote.d !== 8) {
        return currNote.d;
    }
    if (currNote.b > prevNote.b) {
        // if end note on right side
        if (currNote.x > prevNote.x) {
            if (isHorizontal(currNote, prevNote)) {
                return 3;
            }
        }
        // if end note on left side
        if (currNote.x < prevNote.x) {
            if (isHorizontal(currNote, prevNote)) {
                return 2;
            }
        }
        // if end note is above
        if (currNote.y > prevNote.y) {
            if (isVertical(currNote, prevNote)) {
                return 0;
            }
            if (currNote.x > prevNote.x) {
                return 5;
            }
            if (currNote.x < prevNote.x) {
                return 4;
            }
        }
        // if end note is below
        if (currNote.y < prevNote.y) {
            if (isVertical(currNote, prevNote)) {
                return 1;
            }
            if (currNote.x > prevNote.x) {
                return 7;
            }
            if (currNote.x < prevNote.x) {
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
    return note.x > 3 || note.x < 0 || note.y > 2 || note.y < 0;
};

/** Check if note has a valid cut direction.
 * ```ts
 * if (colorNote.isValidDirection(note)) {}
 * ```
 */
export const isValidDirection = (note: ColorNote): boolean => {
    return note.d >= 0 && note.d <= 8;
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
 * const indexCount = colorNote.countX(notes, 0);
 * ```
 */
export const countX = (notes: ColorNote[], i: number): number => {
    return notes.filter((n) => n.x === i).length;
};

/** Count number of specified line layer in a given array and return a counted number of line layer.
 * ```ts
 * const layerCount = colorNote.countY(notes, 0);
 * ```
 */
export const countY = (notes: ColorNote[], l: number): number => {
    return notes.filter((n) => n.y === l).length;
};

/** Count number of specified line index and line layer in a given array and return a counted number of line index and line layer.
 * ```ts
 * const indexLayerCount = colorNote.countXY(notes, 0, 0);
 * ```
 */
export const countXY = (notes: ColorNote[], i: number, l: number): number => {
    return notes.filter((n) => n.x === i && n.y === l).length;
};

/** Count number of specified `_cutDirection` in a given array and return a counted number of `_cutDirection`.
 * ```ts
 * const cdCount = colorNote.countDirection(notes, 0);
 * ```
 */
export const countDirection = (notes: ColorNote[], cd: number): number => {
    return notes.filter((n) => n.d === cd).length;
};

/** Count number of specified angle in a given array and return a counted number of angle.
 * ```ts
 * const angleCount = colorNote.countAngle(notes, 0);
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
        if (n1.d === 8) {
            return false;
        }
        nA1 = getAngle(n1);
    }
    if (typeof n2 === 'number') {
        nA2 = n2;
    } else {
        if (n2.d === 8) {
            return false;
        }
        nA2 = getAngle(n2);
    }
    return equal
        ? shortRotDistance(nA1, nA2, 360) <= angleTol
        : shortRotDistance(nA1, nA2, 360) >= angleTol;
};
