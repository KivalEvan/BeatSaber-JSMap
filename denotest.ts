import * as bsmap from './deno/beatmap.ts';

const difficulty = bsmap.readMapSync('map.dat');
difficulty._customData?._customEvents?.push({
    _time: 5,
    _type: 'AnimateTrack',
    _data: {
        _track: 'hi',
        _duration: 4,
        _position: [[0, 0, 0, 0, 'easeInOutCubic', 'splineCatmullRom']],
    },
});
