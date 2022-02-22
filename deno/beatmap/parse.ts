import { InfoData } from './types/info.ts';
import { CharacteristicOrder } from './types/characteristic.ts';
import { DifficultyData, DifficultyRank } from './types/difficulty.ts';
import { Note } from './types/note.ts';
import { Obstacle } from './types/obstacle.ts';
import { Event } from './types/event.ts';
import { Waypoint } from './types/waypoint.ts';
import { compare } from './version.ts';

// TODO: more error check
// TODO: contemplate whether to make pure function or keep as is
export const info = (mapInfo: InfoData): InfoData => {
    mapInfo._difficultyBeatmapSets.sort(
        (a, b) =>
            CharacteristicOrder[a._beatmapCharacteristicName] -
            CharacteristicOrder[b._beatmapCharacteristicName]
    );
    mapInfo._difficultyBeatmapSets.forEach((mode) => {
        let num = 0;
        mode._difficultyBeatmaps.forEach((a) => {
            if (a._difficultyRank - num <= 0) {
                console.error(a._difficulty + ' is unordered');
            }
            if (DifficultyRank[a._difficulty] !== a._difficultyRank) {
                console.error(a._difficulty + ' has invalid rank');
            }
            num = a._difficultyRank;
        });
        mode._difficultyBeatmaps.sort((a, b) => a._difficultyRank - b._difficultyRank);
    });

    return mapInfo;
};

// FIXME: need more elegant solution
// FIXME: floatValue is optional to certain condition
// FIXME: handle floatvalue
export const difficulty = (difficultyData: DifficultyData): DifficultyData => {
    const { _notes, _obstacles, _events, _waypoints } = difficultyData;

    let versionBypass = false;
    if (!difficultyData._version) {
        console.error('missing version, applying 2.5.0');
        difficultyData._version = '2.5.0';
        versionBypass = true;
    }
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
    });
    if (
        !(versionBypass || compare(difficultyData._version, 'difficulty') === 'old') &&
        _events.some((ev) => typeof ev._floatValue === 'undefined')
    ) {
        console.error(
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
        if (versionBypass || compare(difficultyData._version, 'difficulty') === 'old') {
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
    _obstacles.sort((a, b) => a._time - b._time);
    _events.sort((a, b) => a._time - b._time);
    _waypoints?.sort((a, b) => a._time - b._time);

    return difficultyData;
};
