// require _easings.js

// HSVA Start => [hue,saturation,value,alpha?]
// HSVA End => see how HSV work
// Type: [any range] => -1 to select all type
// Easing

const Easings = require('./_easings.js');

function normalize(x, min, max) {
    return (x - min) / (max - min);
}
function lerp(x, y, a) {
    return x + (y - x) * a;
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
function interpolateColor(hsvaStart, hsvaEnd, norm) {
    return HSVAtoRGBA(...hsvaStart.map((hsva, i) => lerp(hsva, hsvaEnd[i], norm)));
}

const parseHSVA = (hsva) => {
    hsva = hsva.split(',').map((el) => parseFloat(el));
    if (hsva.length > 2) {
        hsva[0] = Math.floor(hsva[0] / 360) + ((hsva[0] / 360) % 1);
        hsva[1] = Math.min(Math.max(0, hsva[1]), 1);
        if (hsva.length === 3) {
            hsva.push(1);
        }
    } else {
        return null;
    }
    return hsva;
};
// because hue cannot be negative
const fixHSVA = (hsva1, hsva2) => {};

function color(
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
    const startHSVA = parseHSVA(global.params[0]);
    const endHSVA = parseHSVA(global.params[1]);
    if (!startHSVA || !endHSVA) {
        alert('invalid HSVA');
        return;
    }
    const selectedType = global.params[2];
    const colorEasing = Easings.func[global.params[3]];

    const objectSelected = []
        .concat(
            notes.filter(
                (n) => n.selected && (selectedType === -1 || n._type === selectedType)
            ),
            events.filter(
                (ev) =>
                    ev.selected && (selectedType === -1 || ev._type === selectedType)
            ),
            walls.filter(
                (w) => w.selected && (selectedType === -1 || w._type === selectedType)
            )
        )
        .sort((a, b) => a._time - b._time);
    if (!objectSelected.length) {
        alert('Select any notes, events, or walls');
        return;
    }
    const startTime = objectSelected[0]._time;
    const endTime = objectSelected[objectSelected.length - 1]._time;

    objectSelected.forEach((obj) => {
        const currentHSVA = interpolateColor(
            startHSVA,
            endHSVA,
            colorEasing(normalize(obj._time, startTime, endTime))
        );
        if (obj._customData) {
            obj._customData._color = currentHSVA;
        } else {
            obj._customData = {
                _color: currentHSVA,
            };
        }
    });
}

module.exports = {
    name: 'Object Gradient HSVA',
    params: {
        'HSVA Start': '360,1,1,1',
        'HSVA End': '240,1,1,1',
        Type: -1,
        Easing: Easings.list,
    },
    run: color,
    errorCheck: false,
};
