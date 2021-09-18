// Chroma Colour Shift
// hue: [any range] => shift by color wheel (0 -> red, 120 -> green, 240 -> blue, 360 -> red, ...)
// saturation: [0-inf] => saturation percentage
// value: [any range] => add value
// alpha: [any range] => add alpha
// fixed value => set value instead of add
// fixed alpha => set alpha instead of add

// modified version of https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
function RGBAtoHSVA(r, g, b, a = 1) {
    let max, min, d, h, s, v;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    d = max - min;
    s = max === 0 ? 0 : d / max;
    v = max;

    switch (max) {
        case min:
            h = 0;
            break;
        case r:
            h = g - b + d * (g < b ? 6 : 0);
            h /= 6 * d;
            break;
        case g:
            h = b - r + d * 2;
            h /= 6 * d;
            break;
        case b:
            h = r - g + d * 4;
            h /= 6 * d;
            break;
    }
    return [h, s, v, a];
}
function HSVAtoRGBA(hue, saturation, value, alpha) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(hue * 6);
    f = hue * 6 - i;
    p = value * (1 - saturation);
    q = value * (1 - f * saturation);
    t = value * (1 - (1 - f) * saturation);
    switch (i % 6) {
        case 0:
            (r = value), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = value), (b = p);
            break;
        case 2:
            (r = p), (g = value), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = value);
            break;
        case 4:
            (r = t), (g = p), (b = value);
            break;
        case 5:
            (r = value), (g = p), (b = q);
            break;
    }
    return [r, g, b, alpha];
}
function shiftColor(currentColor, shiftHSVA, settings) {
    return HSVAtoRGBA(
        ...RGBAtoHSVA(...currentColor).map((hsva, i) => {
            if (i === 1) {
                return Math.min(Math.max(0, hsva * shiftHSVA[i]), 1);
            }
            if (i === 2 && settings.fixedValue) {
                return shiftHSVA[i];
            }
            if (i === 3 && settings.fixedAlpha) {
                return shiftHSVA[i];
            }
            return hsva + shiftHSVA[i];
        })
    );
}

function shift(
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
    const hsvaShift = [
        global.params[0] >= 0
            ? (global.params[0] / 360) % 1
            : (((global.params[0] % 360) + 360) / 360) % 1,
        global.params[1] / 100,
        global.params[2],
        global.params[3],
    ];
    const settings = {
        fixedValue: global.params[4] > 0,
        fixedAlpha: global.params[5] > 0,
    };
    const objectSelected = [].concat(
        notes.filter((n) => n.selected),
        events.filter((ev) => ev.selected),
        walls.filter((w) => w.selected)
    );
    if (!objectSelected.length) {
        alert('Select any notes, events, or walls with Chroma color');
        return;
    }
    objectSelected.forEach((obj) => {
        if (obj._customData && obj._customData._color) {
            obj._customData._color = shiftColor(
                obj._customData._color,
                hsvaShift,
                settings
            );
        }
        if (obj._customData && obj._customData._lightGradient) {
            obj._customData._lightGradient._startColor = shiftColor(
                obj._customData._lightGradient._startColor,
                hsvaShift,
                settings
            );
            obj._customData._lightGradient._endColor = shiftColor(
                obj._customData._lightGradient._endColor,
                hsvaShift,
                settings
            );
        }
    });
}

module.exports = {
    name: 'Colour Shift',
    params: {
        Hue: 0,
        Saturation: 100,
        Value: 0,
        Alpha: 0,
        'Fixed Value': false,
        'Fixed Alpha': false,
    },
    run: shift,
    errorCheck: false,
};
