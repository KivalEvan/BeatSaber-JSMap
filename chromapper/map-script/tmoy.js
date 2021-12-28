// this also went to conversion from rgba to hsva
//#region helper function
function normalize(x, min, max) {
    return (x - min) / (max - min);
}
function lerp(x, y, a) {
    return x + (y - x) * a;
}
function HSVAtoRGBA(hue, saturation, value, alpha = 1) {
    hue = hue / 360;
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
function multiplyColor(cArr, mult = 1) {
    return [...cArr].map((c, i) => {
        if (i === 2) {
            return c * mult;
        }
        return c;
    });
}
function saturateColor(cArr, mult = 1) {
    return [...cArr].map((c, i) => {
        if (i === 1) {
            return c * mult;
        }
        return c;
    });
}

function setColor(obj, type, color, t1, t2) {
    if (!t2) {
        t2 = t1;
    }
    for (let i = 0, l = obj.length; i < l; i++) {
        if (obj[i]._time > t2) {
            return;
        }
        if (obj[i]._time < t1 || (obj[i]._type !== type && type !== 2)) {
            continue;
        }
        obj[i]._customData = { _color: HSVAtoRGBA(...color) };
    }
}
function setGradientColor(obj, type, color1, color2, t1, t2) {
    let norm = 0;
    for (let i = 0, l = obj.length; i < l; i++) {
        if (obj[i]._time > t2) {
            return;
        }
        if (obj[i]._time < t1 || (obj[i]._type !== type && type !== 2)) {
            continue;
        }
        norm = normalize(obj[i]._time, t1, t2);
        let color = interpolateColor(color1, color2, norm);
        obj[i]._customData = { _color: color };
    }
}
//#endregion

function check(
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
    setColor(walls, 2, [0, 0, 1], 6, 8);
    setColor(walls, 2, [0, 0, 1], 134, 136);
    setColor(walls, 2, [0, 0, 1], 262, 264);
    setColor(walls, 2, [0, 0, 0.75], 308, 308);
    setColor(walls, 2, [0, 0, 0.75], 324, 324);
    setColor(walls, 2, [0, 0, 1], 454, 456);
    setColor(walls, 2, [0, 0, 1], 582, 584);
    setColor(walls, 2, [0, 0, 1], 710, 712);

    setColor(walls, 2, [90, 0.675, 0.75], 10, 22);
    setColor(walls, 2, [90, 0.675, 0.75], 138, 150);

    setColor(walls, 2, [180, 0.6875, 0.5], 280, 293);
    setColor(walls, 2, [120, 0.5, 0.625], 294, 306);
    setColor(walls, 2, [180, 0.6875, 0.5], 328, 438);
    setColor(walls, 2, [120, 0.5, 0.625], 358);
    setColor(walls, 2, [120, 0.5, 0.625], 360.5);
    setColor(walls, 2, [120, 0.5, 0.625], 362);
    setColor(walls, 2, [120, 0.5, 0.625], 366);
    setColor(walls, 2, [120, 0.5, 0.625], 368.5);
    setColor(walls, 2, [120, 0.5, 0.625], 370);

    setColor(walls, 2, [120, 0.5, 0.625], 422);
    setColor(walls, 2, [120, 0.5, 0.625], 424.5);
    setColor(walls, 2, [120, 0.5, 0.625], 426);
    setColor(walls, 2, [120, 0.5, 0.625], 430);
    setColor(walls, 2, [120, 0.5, 0.625], 432.5);
    setColor(walls, 2, [120, 0.5, 0.625], 434);

    setColor(walls, 2, [90, 0.675, 0.75], 458, 470);
}

module.exports = {
    name: 'The March of Yui',
    params: {},
    run: check,
    errorCheck: false,
};
