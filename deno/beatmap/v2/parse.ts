import { DifficultyData } from './types/difficulty.ts';
import { Note } from './types/note.ts';
import { Obstacle } from './types/obstacle.ts';
import { Event } from './types/event.ts';
import { Waypoint } from './types/waypoint.ts';
import { compare } from './version.ts';
import logger from '../../logger.ts';
import { Slider } from './types/slider.ts';

// deno-lint-ignore ban-types
const tag = (func: Function) => {
    return `[v2::parse::${func.name}]`;
};

// FIXME: this is a mess but i dont want to fix it anyway
export const difficulty = (data: DifficultyData): DifficultyData => {
    const { _notes, _obstacles, _events, _waypoints } = data;
    logger.info(tag(difficulty), 'Parsing beatmap difficulty v2.x.x');

    _notes.forEach((obj) => {
        for (const key in obj) {
            const k = key as keyof Note;
            if (obj[k] === null) {
                throw new Error('contain null value in _notes object');
            }
        }
        if (typeof obj._time === 'undefined') {
            throw new Error('missing _time in _notes object');
        }
        if (typeof obj._time !== 'number') {
            throw new Error('invalid type _time in _notes object');
        }
        if (typeof obj._type === 'undefined') {
            throw new Error(`missing _type at ${obj._time} in _notes object`);
        }
        if (typeof obj._type !== 'number') {
            throw new Error(`invalid type _type at ${obj._time} in _notes object`);
        }
        if (typeof obj._cutDirection === 'undefined') {
            throw new Error(`missing _cutDirection at ${obj._time} in _notes object`);
        }
        if (typeof obj._cutDirection !== 'number') {
            throw new Error(
                `invalid type _cutDirection at ${obj._time} in _notes object`
            );
        }
        if (typeof obj._lineIndex === 'undefined') {
            throw new Error(`missing _lineIndex at ${obj._time} in _notes object`);
        }
        if (typeof obj._lineIndex !== 'number') {
            throw new Error(`invalid type _lineIndex at ${obj._time} in _notes object`);
        }
        if (typeof obj._lineLayer === 'undefined') {
            throw new Error(`missing _lineLayer at ${obj._time} in _notes object`);
        }
        if (typeof obj._lineLayer !== 'number') {
            throw new Error(`invalid type _lineLayer at ${obj._time} in _notes object`);
        }
    });

    data._sliders = data._sliders ?? [];
    data._sliders.forEach((obj) => {
        for (const key in obj) {
            const k = key as keyof Slider;
            if (obj[k] === null) {
                throw new Error('contain null value in _sliders object');
            }
        }
        if (typeof obj._headTime === 'undefined') {
            throw new Error('missing _headTime in _sliders object');
        }
        if (typeof obj._headTime !== 'number') {
            throw new Error('invalid type _headTime in _sliders object');
        }
        if (typeof obj._colorType === 'undefined') {
            throw new Error(
                `missing _colorType at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._colorType !== 'number') {
            throw new Error(
                `invalid type _colorType at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._headLineIndex === 'undefined') {
            throw new Error(
                `missing _cutDirection at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._headLineIndex !== 'number') {
            throw new Error(
                `invalid type _headLineIndex at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._headLineLayer === 'undefined') {
            throw new Error(
                `missing _headLineLayer at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._headLineLayer !== 'number') {
            throw new Error(
                `invalid type _headLineLayer at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._headControlPointlengthMultiplier === 'undefined') {
            throw new Error(
                `missing _headControlPointlengthMultiplier at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._headControlPointlengthMultiplier !== 'number') {
            throw new Error(
                `invalid type _headControlPointlengthMultiplier at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._headCutDirection === 'undefined') {
            throw new Error(
                `missing _headCutDirection at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._headCutDirection !== 'number') {
            throw new Error(
                `invalid type _headCutDirection at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._tailTime === 'undefined') {
            throw new Error(`missing _tailTime at ${obj._headTime} in _sliders object`);
        }
        if (typeof obj._tailTime !== 'number') {
            throw new Error(
                `invalid type _tailTime at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._tailLineIndex === 'undefined') {
            throw new Error(
                `missing _tailLineIndex at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._tailLineIndex !== 'number') {
            throw new Error(
                `invalid type _tailLineIndex at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._tailLineLayer === 'undefined') {
            throw new Error(
                `missing _tailLineLayer at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._tailLineLayer !== 'number') {
            throw new Error(
                `invalid type _tailLineLayer at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._tailControlPointLengthMultiplier === 'undefined') {
            throw new Error(
                `missing _tailControlPointLengthMultiplier at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._tailControlPointLengthMultiplier !== 'number') {
            throw new Error(
                `invalid type _tailControlPointLengthMultiplier at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._tailCutDirection === 'undefined') {
            throw new Error(
                `missing _tailCutDirection at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._tailCutDirection !== 'number') {
            throw new Error(
                `invalid type _tailCutDirection at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._sliderMidAnchorMode === 'undefined') {
            throw new Error(
                `missing _sliderMidAnchorMode at ${obj._headTime} in _sliders object`
            );
        }
        if (typeof obj._sliderMidAnchorMode !== 'number') {
            throw new Error(
                `invalid type _sliderMidAnchorMode at ${obj._headTime} in _sliders object`
            );
        }
    });

    _obstacles.forEach((obj) => {
        for (const key in obj) {
            const k = key as keyof Obstacle;
            if (obj[k] === null) {
                throw new Error('contain null value in _obstacles object');
            }
        }
        if (typeof obj._time === 'undefined') {
            throw new Error('missing _time in _obstacles object');
        }
        if (typeof obj._time !== 'number') {
            throw new Error('invalid type _time in _obstacles object');
        }
        if (typeof obj._type === 'undefined') {
            throw new Error(`missing _type at ${obj._time} in _obstacles object`);
        }
        if (typeof obj._type !== 'number') {
            throw new Error(`invalid type _type at ${obj._time} in _obstacles object`);
        }
        if (typeof obj._duration === 'undefined') {
            throw new Error(`missing _duration at ${obj._time} in _obstacles object`);
        }
        if (typeof obj._duration !== 'number') {
            throw new Error(
                `invalid type _duration at ${obj._time} in _obstacles object`
            );
        }
        if (typeof obj._lineIndex === 'undefined') {
            throw new Error(`missing _lineIndex at ${obj._time} in _obstacles object`);
        }
        if (typeof obj._lineIndex !== 'number') {
            throw new Error(
                `invalid type _lineIndex at ${obj._time} in _obstacles object`
            );
        }
        if (typeof obj._width === 'undefined') {
            throw new Error(`missing _width at ${obj._time} in _obstacles object`);
        }
        if (typeof obj._width !== 'number') {
            throw new Error(`invalid type _width at ${obj._time} in _obstacles object`);
        }
        if (data._version !== '2.6.0') {
            obj._height = obj._height ?? 5;
            obj._lineLayer = obj._lineLayer ?? 0;
        } else {
            if (typeof obj._height === 'undefined') {
                throw new Error(`missing _height at ${obj._time} in _obstacles object`);
            }
            if (typeof obj._height !== 'number') {
                throw new Error(
                    `invalid type _height at ${obj._time} in _obstacles object`
                );
            }
            if (typeof obj._lineLayer === 'undefined') {
                throw new Error(
                    `missing _lineLayer at ${obj._time} in _obstacles object`
                );
            }
            if (typeof obj._lineLayer !== 'number') {
                throw new Error(
                    `invalid type _lineLayer at ${obj._time} in _obstacles object`
                );
            }
        }
    });
    let versionBypass = false;
    if (!data._version) {
        logger.warn(tag(difficulty), 'missing version, applying 2.6.0');
        data._version = '2.6.0';
        versionBypass = true;
    }
    if (
        !(versionBypass || compare(data._version, 'difficulty') === 'old') &&
        _events.some((ev) => typeof ev._floatValue === 'undefined')
    ) {
        logger.warn(
            tag(difficulty),
            'Some events missing _floatValue property, adding with default value of 1'
        );
    }
    _events.forEach((obj) => {
        for (const key in obj) {
            const k = key as keyof Event;
            if (obj[k] === null) {
                throw new Error('contain null value in _events object');
            }
        }
        if (typeof obj._time === 'undefined') {
            throw new Error('missing _time in _events object');
        }
        if (typeof obj._time !== 'number') {
            throw new Error('invalid type _time in _events object');
        }
        if (typeof obj._type === 'undefined') {
            throw new Error(`missing _type at ${obj._time} in _events object`);
        }
        if (typeof obj._type !== 'number') {
            throw new Error(`invalid type _type at ${obj._time} in _events object`);
        }
        if (typeof obj._value === 'undefined') {
            throw new Error(`missing _value at ${obj._time} in _events object`);
        }
        if (typeof obj._value !== 'number') {
            throw new Error(`invalid type _value at ${obj._time} in _events object`);
        }
        if (versionBypass || compare(data._version, 'difficulty') === 'old') {
            obj._floatValue = 1;
        } else {
            obj._floatValue = 1;
            if (typeof obj._floatValue === 'undefined') {
                throw new Error(
                    `missing _floatValue at ${obj._time} in _events object`
                );
            }
            if (typeof obj._floatValue !== 'number') {
                throw new Error(
                    `invalid type _floatValue at ${obj._time} in _events object`
                );
            }
        }
    });
    _waypoints?.forEach((obj) => {
        for (const key in obj) {
            const k = key as keyof Waypoint;
            if (obj[k] === null) {
                throw new Error('contain null value in _waypoints object');
            }
        }
    });
    _notes.sort((a, b) => a._time - b._time);
    data._sliders.sort((a, b) => a._headTime - b._headTime);
    _obstacles.sort((a, b) => a._time - b._time);
    _events.sort((a, b) => a._time - b._time);
    _waypoints?.sort((a, b) => a._time - b._time);

    return data;
};
