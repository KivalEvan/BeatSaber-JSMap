// hue: [0-inf] => set color hue (0 -> red, 120 -> green, 240 -> blue, 360 -> red, ...)
// saturation: [0-1] => color saturation
// value: [any range] => color value (higher is brighter)
// alpha: [any range] => color alpha
// select type: [any range] => -1 to select all type

// you can change easings here
// visit https://easings.net/ for more info
// you may need to understand built in Math function
const colorEasing = (x) => x;

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

function color(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const startHSVA = [
        Math.floor(global.params[0] / 360) + ((global.params[0] / 360) % 1),
        Math.min(Math.max(0, global.params[1]), 1),
        global.params[2],
        global.params[3],
    ];
    const endHSVA = [
        Math.floor(global.params[4] / 360) + ((global.params[4] / 360) % 1),
        Math.min(Math.max(0, global.params[5]), 1),
        global.params[6],
        global.params[7],
    ];
    const selectedType = global.params[8];

    const objectSelected = []
        .concat(
            notes.filter((n) => n.selected && (selectedType === -1 || n._type === selectedType)),
            events.filter(
                (ev) => ev.selected && (selectedType === -1 || ev._type === selectedType)
            ),
            walls.filter((w) => w.selected && (selectedType === -1 || w._type === selectedType))
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
        'start H': 360,
        'start S': 1,
        'start V': 1,
        'start A': 1,
        'end H': 240,
        'end S': 1,
        'end V': 1,
        'end A': 1,
        'select type': 0,
    },
    run: color,
};
