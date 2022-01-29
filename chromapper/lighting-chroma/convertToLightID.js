// convert event to lightID by environment
// will convert it to _floatValue once CM is supported (and use value 4/8 if it's possible)
// require _easings.js

const Easings = require('./_easings.js');

function normalize(x, min, max) {
    return (x - min) / (max - min);
}
function lerp(x, y, a) {
    return x + (y - x) * a;
}
function interpolateColor(colorStart, colorEnd, norm) {
    return colorEnd.map((color, i) => {
        if (colorStart[i] != null) {
            return lerp(colorStart[i], color, norm);
        }
    });
}

const isOn = (ev) => ev._value === 1 || ev._value === 5;
const isFlash = (ev) => ev._value === 2 || ev._value === 6;
const isFade = (ev) => ev._value === 3 || ev._value === 7;

// very readable code :+1:
const environmentMap = {
    'The First': {
        0: Array.from(Array(10), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(12), (_, i) => i + 1),
    },
    Origins: {
        0: Array.from(Array(10), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(12), (_, i) => i + 1),
    },
    Triangle: {
        0: Array.from(Array(8), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(12), (_, i) => i + 1),
    },
    Nice: {
        0: Array.from(Array(10), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(12), (_, i) => i + 1),
    },
    'Big Mirror': {
        0: Array.from(Array(10), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(6), (_, i) => i + 1),
        3: Array.from(Array(6), (_, i) => i + 1),
        4: Array.from(Array(16), (_, i) => i + 1),
    },
    Dragons: {
        0: Array.from(Array(2), (_, i) => i + 1),
        1: Array.from(Array(62), (_, i) => i + 1),
        2: Array.from(Array(5), (_, i) => i + 1),
        3: Array.from(Array(5), (_, i) => i + 1),
        4: Array.from(Array(4), (_, i) => i + 1),
    },
    'K/DA': {
        0: Array.from(Array(6), (_, i) => i + 1),
        1: Array.from(Array(5), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(9), (_, i) => i + 1),
        4: Array.from(Array(80), (_, i) => i + 1),
    },
    Monstercat: {
        0: Array.from(Array(8), (_, i) => i + 1),
        1: Array.from(Array(7), (_, i) => i + 1),
        2: Array.from(Array(5), (_, i) => i + 1),
        3: Array.from(Array(5), (_, i) => i + 1),
        4: Array.from(Array(14), (_, i) => i + 1),
    },
    Panic: {
        0: Array.from(Array(2), (_, i) => i + 1),
        1: Array.from(Array(62), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(6), (_, i) => i + 1),
    },
    Rocket: {
        0: Array.from(Array(11), (_, i) => i + 1),
        1: Array.from(Array(4), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(5), (_, i) => i + 1),
    },
    'Green Day': {
        0: Array.from(Array(16), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(6), (_, i) => i + 1),
        3: Array.from(Array(6), (_, i) => i + 1),
        4: Array.from(Array(3), (_, i) => i + 1),
    },
    'Green Day Grenade': {
        0: Array.from(Array(16), (_, i) => i + 1),
        2: Array.from(Array(6), (_, i) => i + 1),
        3: Array.from(Array(6), (_, i) => i + 1),
        4: Array.from(Array(3), (_, i) => i + 1),
    },
    Timbaland: {
        0: Array.from(Array(20), (_, i) => i + 1),
        1: Array.from(Array(20), (_, i) => i + 1),
        2: Array.from(Array(10), (_, i) => i + 1),
        3: Array.from(Array(14), (_, i) => i + 1),
        4: Array.from(Array(6), (_, i) => i + 1),
    },
    FitBeat: {
        0: Array.from(Array(30), (_, i) => i + 1),
        1: Array.from(Array(30), (_, i) => i + 1),
        2: Array.from(Array(8), (_, i) => i + 1),
        3: Array.from(Array(8), (_, i) => i + 1),
        4: Array.from(Array(2), (_, i) => i + 1),
    },
    'Linkin Park': {
        0: Array.from(Array(2), (_, i) => i + 1),
        1: Array.from(Array(16), (_, i) => i + 1),
        2: Array.from(Array(20), (_, i) => i + 1),
        3: Array.from(Array(20), (_, i) => i + 1),
        4: Array.from(Array(1), (_, i) => i + 1),
    },
    BTS: {
        0: Array.from(Array(1), (_, i) => i + 1),
        1: Array.from(Array(20), (_, i) => i + 1),
        2: Array.from(Array(25), (_, i) => i + 1),
        3: Array.from(Array(25), (_, i) => i + 1),
        4: Array.from(Array(3), (_, i) => i + 1),
    },
    Kaleidoscope: {
        0: Array.from(Array(40), (_, i) => i + 1),
        1: Array.from(Array(40), (_, i) => i + 1),
        2: Array.from(Array(20), (_, i) => i + 1),
        3: Array.from(Array(20), (_, i) => i + 1),
        4: Array.from(Array(80), (_, i) => i + 1),
    },
    Interscope: {
        0: Array.from(Array(3), (_, i) => i + 1),
        1: Array.from(Array(3), (_, i) => i + 1),
        2: Array.from(Array(3), (_, i) => i + 1),
        3: Array.from(Array(3), (_, i) => i + 1),
        4: Array.from(Array(3), (_, i) => i + 1),
        6: Array.from(Array(7), (_, i) => i + 1),
        7: Array.from(Array(7), (_, i) => i + 1),
    },
    Skrillex: {
        0: Array.from(Array(2), (_, i) => i + 1),
        1: Array.from(Array(66), (_, i) => i + 1),
        2: Array.from(Array(23), (_, i) => i + 1),
        3: Array.from(Array(23), (_, i) => i + 1),
        4: Array.from(Array(66), (_, i) => i + 1),
        6: Array.from(Array(24), (_, i) => i + 1),
        7: Array.from(Array(24), (_, i) => i + 1),
    },
    'Glass Desert': {
        0: Array.from(Array(6), (_, i) => i + 1),
        1: Array.from(Array(8), (_, i) => i + 1),
        2: Array.from(Array(10), (_, i) => i + 1),
        3: Array.from(Array(10), (_, i) => i + 1),
    },
};

const colorScheme = {
    'Default Custom': {
        _envColorLeft: [0.7529412, 0.1882353, 0.1882353],
        _envColorRight: [0.1882353, 0.5960785, 1],
    },
    'The First': {
        _envColorLeft: [0.85, 0.08499997, 0.08499997],
        _envColorRight: [0.1882353, 0.675294, 1],
    },
    Origins: {
        _envColorLeft: [0.4910995, 0.6862745, 0.7],
        _envColorRight: [0.03844783, 0.6862745, 0.9056604],
    },
    KDA: {
        _envColorLeft: [1, 0.3960785, 0.2431373],
        _envColorRight: [0.7607844, 0.1254902, 0.8666667],
    },
    'Crab Rave': {
        _envColorLeft: [0.134568, 0.756, 0.1557533],
        _envColorRight: [0.05647058, 0.6211764, 0.9],
    },
    Noir: {
        _envColorLeft: [0.4056604, 0.4056604, 0.4056604],
        _envColorRight: [0.6037736, 0.6037736, 0.6037736],
    },
    Rocket: {
        _envColorLeft: [0.9, 0.4866279, 0.3244186],
        _envColorRight: [0.4, 0.7180724, 1],
    },
    'Green Day': {
        _envColorLeft: [0, 0.7137255, 0.6705883],
        _envColorRight: [0.2588235, 0.7843137, 0.01960784],
    },
    Timbaland: {
        _envColorLeft: [0.1, 0.5517647, 1],
        _envColorRight: [0.1, 0.5517647, 1],
    },
    FitBeat: {
        _envColorLeft: [0.8, 0.5594772, 0.5594772],
        _envColorRight: [0.5594772, 0.5594772, 0.8],
    },
    'Linkin Park': {
        _envColorLeft: [0.7529412, 0.672753, 0.5925647],
        _envColorRight: [0.6241197, 0.6890281, 0.709],
    },
    BTS: {
        _envColorLeft: [0.7843137, 0.1254902, 0.5010797],
        _envColorRight: [0.6941177, 0.1254902, 0.8666667],
    },
    Kaleidoscope: {
        _envColorLeft: [0.65882355, 0.1254902, 0.1254902],
        _envColorRight: [0.47058824, 0.47058824, 0.47058824],
    },
    Interscope: {
        _envColorLeft: [0.724254, 0.319804, 0.913725],
        _envColorRight: [0.764706, 0.758971, 0.913725],
    },
    'Glass Desert': {
        _envColorLeft: [0.32222217, 0.6111111, 0.75],
        _envColorRight: [0.03844783, 0.62239975, 0.90566039],
    },
};

function convert(
    cursor,
    notes,
    events,
    walls,
    _,
    global,
    data,
    customEvents,
    bpmChanges
) {
    const environmentName = global.params[0];
    const convertType = {
        0: global.params[1],
        1: global.params[2],
        2: global.params[3],
        3: global.params[4],
        4: global.params[5],
        6: global.params[6],
        7: global.params[7],
        10: global.params[8],
        11: global.params[9],
    };

    const fadeEnabled = global.params[10];
    const fadeDuration = Math.max(global.params[11], 0.1);
    const fadeStep = 1 / (Math.max(global.params[12], 10) / 1000);
    const fadeBrightness = Math.max(global.params[13], 1);
    const fadeEasing = Easings.func[global.params[14]];
    const fixNoChroma = global.params[15];
    const schemeName = global.params[16];

    const songBPM = data.songBPM;

    const timeFromFade = (songBPM * fadeDuration) / 60;
    const maxStep = Math.floor(timeFromFade * fadeStep);

    const typeIncluded = Object.keys(environmentMap[environmentName])
        .filter((t) => convertType[t])
        .map((t) => parseInt(t));

    let eventSelected = events.filter((e) => e.selected);
    if (!eventSelected.length) {
        eventSelected = events;
    }
    eventSelected = eventSelected.filter((e) => typeIncluded.includes(e._type));

    for (let i = 0, len = eventSelected.length; i < len; i++) {
        if (
            !typeIncluded.includes(eventSelected[i]._type) ||
            (eventSelected[i]._customData && eventSelected[i]._customData._lightID) ||
            (eventSelected[i]._customData &&
                eventSelected[i]._customData._lightGradient)
        ) {
            continue;
        }
        if (eventSelected[i]._customData) {
            // eventSelected[i]._customData = JSON.parse(
            //     JSON.stringify(eventSelected[i]._customData).replace(
            //         /}$/,
            //         ',"_lightID":'
            //     ) +
            //         JSON.stringify(
            //             environmentMap[environmentName][eventSelected[i]._type]
            //         ) +
            //         '}'
            // );
            eventSelected[i]._customData._lightID =
                environmentMap[environmentName][eventSelected[i]._type];
        } else {
            eventSelected[i]._customData = {
                _lightID: environmentMap[environmentName][eventSelected[i]._type],
            };
        }
        if (eventSelected[i]._value === 0 || isOn(eventSelected[i])) {
            continue;
        }
        let wasFlash;
        if (isFlash(eventSelected[i])) {
            wasFlash = true;
            eventSelected[i]._value = eventSelected[i]._value === 2 ? 1 : 5;
        }
        if (isFade(eventSelected[i])) {
            eventSelected[i]._value = eventSelected[i]._value === 3 ? 1 : 5;
        }
        if (!fadeEnabled) {
            continue;
        }
        let finalTime = null;
        for (let j = i + 1; j < len; j++) {
            if (eventSelected[i]._time + timeFromFade < eventSelected[j]._time) {
                finalTime = eventSelected[i]._time + timeFromFade;
                break;
            }
            if (eventSelected[i]._type !== eventSelected[j]._type) {
                continue;
            }
            finalTime = Math.min(
                eventSelected[i]._time + timeFromFade,
                eventSelected[j]._time
            );
            break;
        }
        if (finalTime === null) {
            finalTime = eventSelected[i]._time + timeFromFade;
        }
        const maxCount = Math.floor((finalTime - eventSelected[i]._time) * fadeStep);
        let originalColor = eventSelected[i]._customData._color;
        if (!originalColor) {
            if (fixNoChroma) {
                originalColor = [
                    ...colorScheme[schemeName][
                        eventSelected[i]._value === 1
                            ? '_envColorRight'
                            : '_envColorLeft'
                    ],
                ];
            } else {
                continue;
            }
        }
        if (originalColor.length < 4) {
            originalColor.push(fadeBrightness);
        }
        eventSelected[i]._customData._color = originalColor;
        for (let j = 1; j <= maxCount; j++) {
            let currentColor = [...originalColor];
            currentColor[3] = Math.max(
                lerp(fadeBrightness, 0, fadeEasing(normalize(j, 0, maxStep))),
                0
            );
            const temp = JSON.parse(JSON.stringify(eventSelected[i]));
            temp._time += j / fadeStep;
            temp._customData._color = currentColor;
            let stoprightthere;
            if (currentColor[3] < 1 && wasFlash) {
                currentColor[3] = 1;
                stoprightthere = true;
            }
            if (currentColor[3] < 1 && !stoprightthere) {
                for (let k = 0; k < 3; k++) {
                    currentColor[k] = Math.max(
                        lerp(currentColor[k], 0, 1 - currentColor[3]),
                        0
                    );
                }
            }
            if (currentColor[3] <= 0) {
                currentColor[3] = 0;
                stoprightthere = true;
            }
            events.push(temp);
            if (stoprightthere) {
                break;
            }
        }
    }
}

module.exports = {
    name: 'Convert Environment LightID',
    params: {
        Environment: Object.keys(environmentMap),
        'Type 0': false,
        'Type 1': false,
        'Type 2': false,
        'Type 3': false,
        'Type 4': false,
        'Type 6': false,
        'Type 7': false,
        'Type 10': false,
        'Type 11': false,
        'Convert Fade': false,
        'Fade Duration': 1.5,
        'Fade Step (ms)': 30,
        'Fade Brightness': 1.12,
        'Fade Easings': Easings.list,
        'Fix No Chroma': false,
        'Color Scheme': Object.keys(colorScheme),
    },
    run: convert,
    errorCheck: false,
};
