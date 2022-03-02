import * as v2 from './v2/mod.ts';
import * as v3 from './v3/mod.ts';
import logger from '../logger.ts';
import { clamp } from '../utils.ts';

// deno-lint-ignore ban-types
const tag = (func: Function) => {
    return `[convert::${func.name}]`;
};

/** Convert beatmap v2 to beatmap v3, you are encouraged to convert to make full use of new beatmap features.
 * ```ts
 * const newData = convert.V2toV3(oldData);
 * ```
 * ---
 * **WARNING:** Custom data will be lost on conversion, as well as other incompatible property.
 */
export const V2toV3 = (
    difficultyData: v2.types.DifficultyData,
    skipPrompt?: boolean
): v3.types.DifficultyData => {
    if (!skipPrompt) {
        console.warn(`Converting beatmap v2 to v3 may lose certain data!`);
        const confirmation = prompt('Proceed with conversion? (Y/N):', 'n');
        if (confirmation![0].toLowerCase() !== 'y') {
            throw Error('Conversion to beatmap v3 denied.');
        }
        logger.info(tag(V2toV3), 'Converting beatmap v2 to v3');
    } else {
        logger.warn(tag(V2toV3), 'Conversion beatmap v2 to v3 may lose certain data');
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
            let a = 0;
            if (typeof n._customData?._cutDirection === 'number') {
                a =
                    n._customData._cutDirection > 0
                        ? n._customData._cutDirection % 360
                        : 360 + (n._customData._cutDirection % 360);
            }
            if (n._cutDirection >= 1000) {
                a = Math.abs(((n._cutDirection % 1000) % 360) - 360);
            }
            template.colorNotes.push({
                b: n._time,
                c: n._type as 0 | 1,
                x: n._lineIndex,
                y: n._lineLayer,
                d:
                    n._cutDirection >= 1000 ||
                    typeof n._customData?._cutDirection === 'number'
                        ? n._cutDirection === 8
                            ? 8
                            : 1
                        : (clamp(
                              n._cutDirection,
                              0,
                              8
                          ) as typeof template.colorNotes[number]['d']),
                a: a,
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

    difficultyData._events.forEach((e) => {
        template.basicBeatmapEvents.push({
            b: e._time,
            et: e._type,
            i: e._value,
            f: e._floatValue,
        });
    });

    difficultyData._waypoints.forEach((w) => {
        template.waypoints.push({
            b: w._time,
            x: w._lineIndex,
            y: w._lineLayer,
            d: w._offsetDirection,
        });
    });

    difficultyData._sliders.forEach((s) =>
        template.sliders.push({
            c: s._colorType,
            b: s._headTime,
            x: s._headLineIndex,
            y: s._headLineLayer,
            d: s._headCutDirection,
            mu: s._headControlPointlengthMultiplier,
            tb: s._tailTime,
            tx: s._tailLineIndex,
            ty: s._tailLineLayer,
            tc: s._tailCutDirection,
            tmu: s._tailControlPointLengthMultiplier,
            m: s._sliderMidAnchorMode,
        })
    );

    if (difficultyData._customData) {
        template.customData = {
            t: difficultyData._customData?._time,
            bm: difficultyData._customData?._bookmarks?.map((bm) => {
                return { t: bm._time, n: bm._name, c: bm._color };
            }),
        };
    }
    template.useNormalEventsAsCompatibleEvents = true;

    return template;
};

/** In case you need to go back, who knows why.
 * ```ts
 * const oldData = convert.V3toV2(newData);
 * ```
 * ---
 * **WARNING:** Burst slider and other new stuff will be gone!
 */
export const V3toV2 = (
    difficultyData: v3.types.DifficultyData,
    skipPrompt?: boolean
): v2.types.DifficultyData => {
    if (!skipPrompt) {
        console.warn(`Converting beatmap v3 to v2 may lose certain data!`);
        const confirmation = prompt('Proceed with conversion? (Y/N):', 'n');
        if (confirmation![0].toLowerCase() !== 'y') {
            throw Error('Conversion to beatmap v2 denied.');
        }
        logger.info(tag(V3toV2), 'Converting beatmap v3 to v2');
    } else {
        logger.warn(tag(V3toV2), 'Conversion beatmap v3 to v2 may lose certain data');
    }
    const template = v2.template.difficulty();

    difficultyData.colorNotes.forEach((n) =>
        template._notes.push({
            _time: n.b,
            _lineIndex: n.x,
            _lineLayer: n.y,
            _type: n.c,
            _cutDirection: n.d,
        })
    );

    difficultyData.bombNotes.forEach((n) =>
        template._notes.push({
            _time: n.b,
            _lineIndex: n.x,
            _lineLayer: n.y,
            _type: 3,
            _cutDirection: 0,
        })
    );

    difficultyData.obstacles.forEach((o) => {
        if (o.y === 0 && o.h === 5) {
            template._obstacles.push({
                _time: o.b,
                _lineIndex: o.x,
                _lineLayer: 0,
                _type: 0,
                _duration: o.d,
                _width: o.w,
                _height: o.h,
            });
        } else if (o.y === 2 && o.h === 3) {
            template._obstacles.push({
                _time: o.b,
                _lineIndex: o.x,
                _lineLayer: 0,
                _type: 1,
                _duration: o.d,
                _width: o.w,
                _height: o.h,
            });
        } else {
            template._obstacles.push({
                _time: o.b,
                _lineIndex: o.x,
                _lineLayer: o.y,
                _type: 2,
                _duration: o.d,
                _width: o.w,
                _height: o.h,
            });
        }
    });

    difficultyData.basicBeatmapEvents.forEach((e) =>
        template._events.push({
            _time: e.b,
            _type: e.et,
            _value: e.i,
            _floatValue: e.f,
        })
    );

    difficultyData.sliders.forEach((s) =>
        template._sliders.push({
            _colorType: s.c,
            _headTime: s.b,
            _headLineIndex: s.x,
            _headLineLayer: s.y,
            _headControlPointlengthMultiplier: s.mu,
            _headCutDirection: s.c,
            _tailTime: s.tb,
            _tailLineIndex: s.tx,
            _tailLineLayer: s.ty,
            _tailControlPointLengthMultiplier: s.tmu,
            _tailCutDirection: s.c,
            _sliderMidAnchorMode: s.m,
        })
    );

    return template;
};
