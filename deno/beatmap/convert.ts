import * as v2 from './v2/mod.ts';
import * as v3 from './v3/mod.ts';
import * as types from './types.ts';
import logger from '../logger.ts';
import { clamp } from '../utils.ts';
import { difficulty as parseDifficultyV2 } from './v2/parse.ts';

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
    data: types.v2.DifficultyData,
    skipPrompt?: boolean
): types.v3.DifficultyData => {
    if (!skipPrompt) {
        console.warn('Converting beatmap v2 to v3 may lose certain data!');
        const confirmation = prompt('Proceed with conversion? (Y/N):', 'n');
        if (confirmation![0].toLowerCase() !== 'y') {
            throw Error('Conversion to beatmap v3 denied.');
        }
        logger.info(tag(V2toV3), 'Converting beatmap v2 to v3');
    } else {
        logger.warn(tag(V2toV3), 'Converting beatmap v2 to v3 may lose certain data!');
    }
    const template = v3.DifficultyData.create();

    data._notes.forEach((n) => {
        if (v2.note.isBomb(n)) {
            template.bombNotes.push(
                v3.BombNote.create({
                    b: n._time,
                    x: n._lineIndex,
                    y: n._lineLayer,
                })
            );
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
            template.colorNotes.push(
                v3.ColorNote.create({
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
                    cd: n._customData ?? {},
                })
            );
        }
    });

    data._obstacles.forEach((o) =>
        template.obstacles.push(
            v3.Obstacle.create({
                b: o._time,
                x: o._lineIndex,
                y: o._type === 2 ? o._lineLayer : o._type ? 2 : 0,
                d: o._duration,
                w: o._width,
                h: o._type === 2 ? o._height : o._type ? 3 : 5,
            })
        )
    );

    data._events.forEach((e) => {
        if (v2.event.isColorBoost(e)) {
            template.colorBoostBeatmapEvents.push(
                v3.ColorBoostEvent.create({
                    b: e._time,
                    o: e._value ? true : false,
                })
            );
        } else if (v2.event.isLaneRotationEvent(e)) {
            template.rotationEvents.push(
                v3.RotationEvent.create({
                    b: e._time,
                    e: e._type === 14 ? 0 : 1,
                    r:
                        typeof e._customData?._rotation === 'number'
                            ? e._customData._rotation
                            : e._value >= 1000
                            ? (e._value - 1360) % 360
                            : types.v2.EventLaneRotation[e._value] ?? 0,
                })
            );
        } else if (v2.event.isBPMChangeEvent(e)) {
            template.bpmEvents.push(
                v3.BPMEvent.create({
                    b: e._time,
                    m: e._floatValue,
                })
            );
        } else {
            template.basicBeatmapEvents.push(
                v3.BasicEvent.create({
                    b: e._time,
                    et: e._type,
                    i: e._value,
                    f: e._floatValue,
                    cd: {
                        c: (e as types.v2.EventLight)._customData?._color,
                        lid: (e as types.v2.EventLight)._customData?._lightID,
                        pid: (e as types.v2.EventLight)._customData?._propID,
                        lg: {
                            sc: (e as types.v2.EventLight)._customData?._lightGradient
                                ?._startColor,
                            ec: (e as types.v2.EventLight)._customData?._lightGradient
                                ?._endColor,
                            d: (e as types.v2.EventLight)._customData?._lightGradient
                                ?._duration,
                            e: (e as types.v2.EventLight)._customData?._lightGradient
                                ?._easing,
                        },
                    },
                })
            );
        }
    });

    data._waypoints.forEach((w) => {
        template.waypoints.push(
            v3.Waypoint.create({
                b: w._time,
                x: w._lineIndex,
                y: w._lineLayer,
                d: w._offsetDirection,
            })
        );
    });

    data._sliders.forEach((s) =>
        template.sliders.push(
            v3.Slider.create({
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
        )
    );

    template.basicEventTypesWithKeywords = v3.BasicEventTypesWithKeywords.create({
        d:
            data._specialEventsKeywordFilters?._keywords?.map((k) => {
                return { k: k._keyword, e: k._specialEvents };
            }) ?? [],
    });

    if (data._customData) {
        template.customData = {
            t: data._customData?._time,
            bm: data._customData?._bookmarks?.map((bm) => {
                return { b: bm._time, n: bm._name, c: bm._color };
            }),
        };
    }

    return template;
};

/** In case you need to go back, who knows why.
 * ```ts
 * const oldData = convert.V3toV2(newData);
 * ```
 * ---
 * **WARNING:** Burst slider and other new stuff will be gone!
 * This feature won't be supported in the near future.
 */
export const V3toV2 = (
    data: types.v3.DifficultyData,
    skipPrompt?: boolean
): types.v2.DifficultyData => {
    if (!skipPrompt) {
        console.warn('Converting beatmap v3 to v2 may lose certain data!');
        const confirmation = prompt('Proceed with conversion? (Y/N):', 'n');
        if (confirmation![0].toLowerCase() !== 'y') {
            throw Error('Conversion to beatmap v2 denied.');
        }
        logger.info(tag(V3toV2), 'Converting beatmap v3 to v2');
    } else {
        logger.warn(tag(V3toV2), 'Converting beatmap v3 to v2 may lose certain data!');
    }
    const template = v2.template.difficulty();

    data.colorNotes.forEach((n) =>
        template._notes.push({
            _time: n.time,
            _lineIndex: n.posX,
            _lineLayer: n.posY,
            _type: n.color,
            _cutDirection: n.direction,
        })
    );

    data.bombNotes.forEach((n) =>
        template._notes.push({
            _time: n.time,
            _lineIndex: n.posX,
            _lineLayer: n.posY,
            _type: 3,
            _cutDirection: 0,
        })
    );

    data.obstacles.forEach((o) => {
        if (o.posY === 0 && o.height === 5) {
            template._obstacles.push({
                _time: o.time,
                _lineIndex: o.posX,
                _lineLayer: 0,
                _type: 0,
                _duration: o.duration,
                _width: o.width,
                _height: o.height,
            });
        } else if (o.posY === 2 && o.height === 3) {
            template._obstacles.push({
                _time: o.time,
                _lineIndex: o.posX,
                _lineLayer: 0,
                _type: 1,
                _duration: o.duration,
                _width: o.width,
                _height: o.height,
            });
        } else {
            template._obstacles.push({
                _time: o.time,
                _lineIndex: o.posX,
                _lineLayer: o.posY,
                _type: 2,
                _duration: o.duration,
                _width: o.width,
                _height: o.height,
            });
        }
    });

    data.basicBeatmapEvents.forEach((be) => {
        template._events.push({
            _time: be.time,
            _type: be.type as 8, // hackish way to just accept any other event
            _value: be.value,
            _floatValue: be.floatValue,
        });
    });

    data.colorBoostBeatmapEvents.forEach((b) =>
        template._events.push({
            _time: b.time,
            _type: 5,
            _value: b.toggle ? 1 : 0,
            _floatValue: 1,
        })
    );

    data.rotationEvents.forEach((lr) =>
        template._events.push({
            _time: lr.time,
            _type: lr.executionTime ? 14 : 15,
            _value:
                Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15) < 6
                    ? Math.max(Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15), 3)
                    : Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15) - 2,
            _floatValue: 1,
        })
    );

    data.bpmEvents.forEach((bpm) =>
        template._events.push({
            _time: bpm.time,
            _type: 100,
            _value: 1,
            _floatValue: bpm.bpm,
        })
    );

    data.sliders.forEach((s) =>
        template._sliders.push({
            _colorType: s.color,
            _headTime: s.time,
            _headLineIndex: s.posX,
            _headLineLayer: s.posY,
            _headControlPointlengthMultiplier: s.lengthMultiplier,
            _headCutDirection: s.color,
            _tailTime: s.tailTime,
            _tailLineIndex: s.tailPosX,
            _tailLineLayer: s.tailPosY,
            _tailControlPointLengthMultiplier: s.tailLengthMultiplier,
            _tailCutDirection: s.color,
            _sliderMidAnchorMode: s.midAnchor,
        })
    );

    data.waypoints.forEach((w) =>
        template._waypoints.push({
            _time: w.time,
            _lineIndex: w.posX,
            _lineLayer: w.posY,
            _offsetDirection: w.direction,
        })
    );

    template._specialEventsKeywordFilters = {
        _keywords:
            data.basicEventTypesWithKeywords.data.map((d) => {
                return { _keyword: d.keyword, _specialEvents: d.events };
            }) ?? [],
    };

    return parseDifficultyV2(template);
};
