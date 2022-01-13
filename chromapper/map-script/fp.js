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
    for (let i = 0; i < 8; i++) {
        setColor(walls, 2, [180 + 45 * i, 0.75, 0.75], 20 + i * 8, 28 + i * 8);
        setColor(walls, 2, [45 + 75 * i, 0.75, 0.75], 20.75 + i * 8);
        setColor(walls, 2, [45 + 75 * i, 0.75, 0.75], 22.25 + i * 8);
        setColor(walls, 2, [45 + 75 * i, 0.75, 0.75], 23.5 + i * 8);
        setColor(walls, 2, [45 + 75 * i, 0.75, 0.75], 24.25 + i * 8);
        setColor(walls, 2, [45 + 75 * i, 0.75, 0.75], 24.75 + i * 8);
        setColor(walls, 2, [45 + 75 * i, 0.75, 0.75], 26.25 + i * 8);
        setColor(walls, 2, [45 + 75 * i, 0.75, 0.75], 27.5 + i * 8);
    }
    setGradientColor(walls, 2, [0, 0, 0.125], [0, 0, 1], 32, 34);
    setColor(walls, 2, [0, 0, 0], 33.75);
    for (let i = 0; i < 3; i++) {
        setColor(walls, 2, [1080 - 30 * i, 0.75, 0.75], 92 + i * 8, 100 + i * 8);
        setColor(walls, 2, [640 - 75 * i, 0.75, 0.75], 92.75 + i * 8);
        setColor(walls, 2, [640 - 75 * i, 0.75, 0.75], 94.25 + i * 8);
        setColor(walls, 2, [640 - 75 * i, 0.75, 0.75], 95.5 + i * 8);
        setColor(walls, 2, [640 - 75 * i, 0.75, 0.75], 96.25 + i * 8);
        setColor(walls, 2, [640 - 75 * i, 0.75, 0.75], 96.75 + i * 8);
        setColor(walls, 2, [640 - 75 * i, 0.75, 0.75], 98.25 + i * 8);
        setColor(walls, 2, [640 - 75 * i, 0.75, 0.75], 99.5 + i * 8);
    }
    for (let i = 0; i < 3; i++) {
        setColor(walls, 2, [270 - 45 * i, 0.75, 0.75], 132 + i * 8, 140 + i * 8);
        setColor(walls, 2, [405 - 60 * i, 0.75, 0.75], 132.75 + i * 8);
        setColor(walls, 2, [405 - 60 * i, 0.75, 0.75], 134.25 + i * 8);
        setColor(walls, 2, [405 - 60 * i, 0.75, 0.75], 135.5 + i * 8);
        setColor(walls, 2, [405 - 60 * i, 0.75, 0.75], 136.25 + i * 8);
        setColor(walls, 2, [405 - 60 * i, 0.75, 0.75], 136.75 + i * 8);
        setColor(walls, 2, [405 - 60 * i, 0.75, 0.75], 138.25 + i * 8);
        setColor(walls, 2, [405 - 60 * i, 0.75, 0.75], 139.5 + i * 8);
    }
    for (let i = 0; i < 4; i++) {
        setColor(walls, 2, [480 + 45 * i, 0.75, 0.75], 196 + i * 8, 204 + i * 8);
        setColor(walls, 2, [720 + 60 * i, 0.75, 0.75], 196.75 + i * 8);
        setColor(walls, 2, [720 + 60 * i, 0.75, 0.75], 198.25 + i * 8);
        setColor(walls, 2, [720 + 60 * i, 0.75, 0.75], 199.5 + i * 8);
        setColor(walls, 2, [720 + 60 * i, 0.75, 0.75], 200.25 + i * 8);
        setColor(walls, 2, [720 + 60 * i, 0.75, 0.75], 200.75 + i * 8);
        setColor(walls, 2, [720 + 60 * i, 0.75, 0.75], 202.25 + i * 8);
        setColor(walls, 2, [720 + 60 * i, 0.75, 0.75], 203.5 + i * 8);
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 2; j++) {
            setGradientColor(
                notes,
                3,
                [480 + 105 * i, 0.75, 0.75],
                [560 + 105 * i, 0.5, 0.5],
                215 + j * 1.5 + i * (8 + 3 / 8),
                216.5 + j * 1.5 + i * (8 + 3 / 8)
            );
        }
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 2; j++) {
            setGradientColor(
                notes,
                3,
                [360 + 105 * i, 0.75, 0.75],
                [480 + 105 * i, 0.5, 0.5],
                292 + j * 1.5 + i * (8 + 3 / 8),
                293.5 + j * 1.5 + i * (8 + 3 / 8)
            );
        }
    }
    setGradientColor(
        walls,
        2,
        [175, 0.75, 0.75],
        [175 + 360 * 10, 0.75, 0.75],
        452,
        580
    );
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            setGradientColor(
                notes,
                3,
                [240 + 105 * i, 0.75, 0.75],
                [360 + 105 * i, 0.5, 0.5],
                756 + j * 1.5 + i * (8 + 3 / 8),
                757.5 + j * 1.5 + i * (8 + 3 / 8)
            );
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
            setGradientColor(
                notes,
                3,
                [1080 - 105 * i, 0.75, 0.75],
                [960 - 105 * i, 0.5, 0.5],
                772 + j * 1.5 + i * (8 + 3 / 8),
                773.5 + j * 1.5 + i * (8 + 3 / 8)
            );
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
            setGradientColor(
                notes,
                3,
                [1200 + 105 * i, 0.75, 0.75],
                [1080 + 105 * i, 0.5, 0.5],
                804 + j * 1.5 + i * (8 + 3 / 8),
                805.5 + j * 1.5 + i * (8 + 3 / 8)
            );
        }
    }
    setGradientColor(walls, 2, [200, 0.5, 0.5], [240, 0, 0], 1091.5, 1095);
    const sideWalls = walls.filter((w) => w._lineIndex === 0);
    setGradientColor(sideWalls, 2, [200, 0, 1], [240, 0, 0], 1091, 1092);
}

module.exports = {
    name: 'forgotten parser',
    params: {},
    run: check,
    errorCheck: false,
};
