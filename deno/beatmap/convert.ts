import * as v2 from './v2/mod.ts';
import * as v3 from './v3/mod.ts';
import logger from '../logger.ts';

// deno-lint-ignore ban-types
const tag = (func: Function) => {
    return `[convert::${func.name}]`;
};

//TODO: convert ME/NE cut direction
export const toV3 = (
    difficultyData: v2.types.DifficultyData,
    skipPrompt?: boolean
): v3.types.DifficultyData => {
    if (!skipPrompt) {
        console.warn(`Converting to v3 may lose custom data`);
        const confirmation = prompt('Proceed with conversion? (y/N): ', 'n');
        if (confirmation![0].toLowerCase() === 'n') {
            throw Error('Conversion to beatmap v3 denied.');
        }
        logger.info(tag(toV3), 'Converting beatmap v2 to v3');
    } else {
        logger.warn(tag(toV3), 'Conversion to v3 may lose custom data');
    }
    const template = v3.template.difficulty();

    difficultyData._notes.forEach((n) => {
        if (v2.note.isBomb(n)) {
            template.bombNotes.push({
                b: n._time,
                x: n._lineIndex,
                y: n._lineLayer,
            });
        }
        if (v2.note.isNote(n)) {
            template.colorNotes.push({
                b: n._time,
                c: n._type as 0 | 1,
                x: n._lineIndex,
                y: n._lineLayer,
                d: Math.max(n._cutDirection, 8) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
                a: 0,
            });
        }
    });

    difficultyData._obstacles.forEach((o) =>
        template.obstacles.push({
            b: o._time,
            x: o._lineIndex,
            y: o._type === 2 ? o._lineLayer : o._type ? 2 : 0,
            d: o._duration,
            w: o._width,
            h: o._type === 2 ? o._height : o._type ? 3 : 5,
        })
    );

    difficultyData._events.forEach((e) =>
        template.basicBeatmapEvents.push({
            b: e._time,
            et: e._type,
            i: e._value,
            f: e._floatValue,
        })
    );

    return template;
};
