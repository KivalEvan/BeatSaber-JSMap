// had to replace rgb to hsv so this looks incredibly messy
//#region helper function
function normalize(x, min, max) {
    return max - min > 0 ? (x - min) / (max - min) : 0;
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
function randomizeColor(obj, type, color1, color2, t1, t2) {
    let random = 0;
    for (let i = 0, l = obj.length; i < l; i++) {
        if (obj[i]._time > t2) {
            return;
        }
        if (obj[i]._time < t1 || (obj[i]._type !== type && type !== 2)) {
            continue;
        }
        random = Math.random();
        let color = interpolateColor(color1, color2, random);
        obj[i]._customData = { _color: color };
    }
}
//#endregion

const dColorLeft = [0, 0.92, 0.78, 1];
const dColorRight = [203, 0.81, 0.81, 1];
const noirColorLeft = [0, 0, 0.28, 1];
const noirColorRight = [203, 0, 0.62, 1];

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
    notes.forEach((n) => {
        if (n._type === 0) {
            n._customData = { _color: [0, 2, 0] };
        }
        if (n._type === 1) {
            n._customData = { _color: [0, 2, 0] };
        }
        if (n._type === 3) {
            n._cutDirection = 8;
        }
    });
    walls.forEach((w) => {
        if (w._type === 0) {
            w._customData = { _color: [0, 0, 2] };
        }
        if (w._type === 1) {
            w._customData = { _color: [0, 2, 2] };
        }
    });
    //#region note
    setColor(notes, 0, noirColorLeft, 32, 36);
    setColor(notes, 1, noirColorRight, 32, 36);
    setGradientColor(notes, 0, noirColorLeft, dColorLeft, 34, 36);
    setGradientColor(
        notes,
        1,
        noirColorRight,
        multiplyColor(noirColorRight, 1.25),
        34,
        36
    );
    setGradientColor(
        notes,
        0,
        multiplyColor(dColorLeft, 1.5),
        dColorLeft,
        36,
        36 + 1 / 24
    );
    setGradientColor(
        notes,
        1,
        multiplyColor(noirColorRight, 1.5),
        noirColorRight,
        36,
        36 + 1 / 24
    );
    setColor(notes, 0, dColorLeft, 40, 64);
    setColor(notes, 1, noirColorRight, 40, 64);
    setGradientColor(notes, 0, dColorLeft, multiplyColor(dColorLeft, 1.5), 62, 64);
    setGradientColor(
        notes,
        1,
        noirColorRight,
        multiplyColor(noirColorRight, 1.5),
        62,
        64
    );
    setColor(notes, 0, multiplyColor(dColorLeft, 1.5), 67, 68);
    setColor(notes, 1, multiplyColor(noirColorRight, 1.5), 67, 68);
    setColor(notes, 0, dColorLeft, 68, 164);
    setColor(notes, 1, noirColorRight, 68, 164);
    setGradientColor(
        notes,
        1,
        multiplyColor(noirColorRight, 1.25),
        noirColorRight,
        64,
        64 + 1 / 24
    );
    setGradientColor(notes, 0, dColorLeft, multiplyColor(dColorLeft, 0.625), 124, 131);
    setGradientColor(
        notes,
        1,
        noirColorRight,
        multiplyColor(noirColorRight, 0.625),
        124,
        131
    );
    setColor(notes, 0, noirColorLeft, 143, 148);
    setColor(notes, 1, noirColorRight, 143, 148);
    setGradientColor(notes, 0, dColorLeft, multiplyColor(dColorLeft, 1.5), 148, 164);
    setGradientColor(
        notes,
        1,
        noirColorRight,
        multiplyColor(noirColorRight, 1.5),
        148,
        164
    );
    setGradientColor(notes, 0, dColorLeft, noirColorLeft, 164, 164 + 1 / 24);
    setGradientColor(
        notes,
        1,
        multiplyColor(noirColorRight, 1.25),
        noirColorRight,
        164,
        164 + 1 / 24
    );
    setColor(notes, 0, noirColorLeft, 166, 189);
    setColor(notes, 1, noirColorRight, 166, 189);
    setGradientColor(
        notes,
        0,
        noirColorLeft,
        multiplyColor(noirColorLeft, 1.125),
        190,
        192
    );
    setGradientColor(
        notes,
        1,
        noirColorRight,
        multiplyColor(noirColorRight, 1.5),
        190,
        192
    );
    setGradientColor(notes, 0, noirColorLeft, noirColorLeft, 192, 196);
    setGradientColor(
        notes,
        1,
        multiplyColor(noirColorRight, 1.5),
        noirColorRight,
        192,
        196
    );
    setColor(notes, 0, dColorLeft, 196, 260);
    setColor(notes, 1, noirColorRight, 196, 260);
    setGradientColor(notes, 0, dColorLeft, noirColorLeft, 260, 260 + 1 / 24);
    setGradientColor(
        notes,
        1,
        multiplyColor(noirColorRight, 1.5),
        noirColorRight,
        260,
        260 + 1 / 24
    );
    setColor(notes, 0, noirColorLeft, 264, 280);
    setColor(notes, 1, noirColorRight, 264, 280);
    setGradientColor(
        notes,
        0,
        noirColorLeft,
        multiplyColor(noirColorLeft, 1.125),
        280,
        288
    );
    setGradientColor(
        notes,
        1,
        noirColorRight,
        multiplyColor(noirColorRight, 1.5),
        280,
        288
    );
    setColor(notes, 0, noirColorLeft, 288, 290);
    setColor(notes, 1, noirColorRight, 288, 290);
    setGradientColor(
        notes,
        0,
        noirColorLeft,
        multiplyColor(noirColorLeft, 1.125),
        290,
        292
    );
    setGradientColor(
        notes,
        1,
        noirColorRight,
        multiplyColor(noirColorRight, 1.5),
        290,
        292
    );
    setColor(notes, 0, dColorLeft, 292, 388);
    setColor(notes, 1, dColorRight, 292, 388);
    setColor(notes, 0, noirColorLeft, 327.5, 330.5);
    setColor(notes, 1, noirColorRight, 327.5, 330.5);
    setGradientColor(notes, 0, noirColorLeft, dColorLeft, 331, 332);
    setGradientColor(notes, 1, noirColorRight, dColorRight, 331, 332);
    setGradientColor(notes, 0, dColorLeft, dColorLeft, 386, 388);
    setGradientColor(notes, 1, dColorRight, noirColorRight, 386, 388);
    setColor(notes, 0, dColorLeft, 388, 419);
    setColor(notes, 1, noirColorRight, 388, 419);
    setColor(notes, 0, noirColorLeft, 399, 403);
    setColor(notes, 1, noirColorRight, 399, 403);
    setGradientColor(notes, 0, dColorLeft, multiplyColor(dColorLeft, 1.5), 404, 419);
    setGradientColor(
        notes,
        1,
        noirColorRight,
        multiplyColor(noirColorRight, 1.5),
        404,
        419
    );
    setGradientColor(
        notes,
        0,
        multiplyColor(dColorLeft, 1.5),
        dColorLeft,
        419,
        419 + 1 / 24
    );
    setGradientColor(
        notes,
        1,
        multiplyColor(noirColorRight, 1.5),
        noirColorRight,
        419,
        419 + 1 / 24
    );
    //#endregion
    //#region bomb
    setColor(notes, 3, [120, 0, 2], 0, 434);
    randomizeColor(notes, 3, [0, 0, 0.375], [0, 0, 0.75], 33.5, 34);
    setGradientColor(notes, 3, [60, 0, 1], [60, 0, 0.25], 36.5, 38);
    randomizeColor(notes, 3, [0, 0, 0.375], [0, 0, 0.75], 42.5, 43);
    randomizeColor(notes, 3, [0, 0, 0.375], [0, 0, 0.75], 64, 67);
    setGradientColor(notes, 3, [30, 0.875, 1], [45, 0, 0.75], 121.25, 122.25);
    setColor(notes, 3, [0, 0, 0.375], 135, 135);
    setColor(notes, 3, [0, 0, 0.375], 151, 151);
    setGradientColor(notes, 3, [0, 0, 0.375], [0, 0, 0.5], 146, 146.5);
    randomizeColor(notes, 3, [0, 0, 0.375], [30, 0.25, 0.75], 166.5, 170);
    setColor(notes, 3, [0, 0, 0.625], 170, 187);
    setGradientColor(notes, 3, [0, 0, 0.375], [0, 0, 1], 190, 192);
    randomizeColor(notes, 3, [0, 0, 0.375], [0, 0, 0.75], 193, 194);
    setColor(notes, 3, [26, 1, 0.87], 194, 194.5);
    for (let i = 0; i < 8; i++) {
        setGradientColor(
            notes,
            3,
            [0, 0, 0.375],
            [0, 0, 0.5],
            228 + i * 4,
            228.5 + i * 4
        );
    }
    randomizeColor(notes, 3, [0, 0, 0.375], [0, 0, 0.75], 257.5, 258);
    setGradientColor(notes, 3, [300, 0, 0.75], [330, 1, 1], 258.5, 259.25);
    setGradientColor(notes, 3, [330, 1, 1], [400, 1, 1], 259.25, 260 - 1 / 8);
    setGradientColor(notes, 3, [60, 0, 1], [60, 0, 0.25], 260, 263);
    setColor(notes, 3, [0, 0, 0.5], 288, 288);
    setColor(notes, 3, [0, 0, 0.75], 291, 291);
    setColor(notes, 3, [0, 0, 0.5], 322, 324);
    setGradientColor(notes, 3, [0, 0, 0.375], [0, 0, 1], 354, 356);
    setColor(notes, 3, [0, 0, 0.375], 391, 391);
    setGradientColor(notes, 3, [0, 0, 0.375], [0, 0, 0.5], 402, 402.5);
    setColor(notes, 3, [0, 0, 0.375], 407, 407);
    //#endregion
    //#region wall
    const centerWalls = walls.filter((w) => w._lineIndex === 1 || w._lineIndex === 2);
    const crouchWalls = walls.filter((w) => w._type === 1);
    setColor(walls, 2, [0, 0, 0.25], 2, 4);
    randomizeColor(walls, 2, [240, 0, 0.25], [240, 0.25, 0.5], 4, 30);
    setColor(centerWalls, 2, [0, 0, 0.75], 4, 30);
    setGradientColor(walls, 2, [0, 0, 0.25], [0, 0, 0.75], 30, 31);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.625], 36, 36.5);
    randomizeColor(walls, 2, [0, 0, 0.5], [0, 0.75, 1], 36.5, 38);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.375], 44, 45);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.375], 45, 46);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.375], 51, 52);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.375], 53, 54);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.375], 55, 56);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.375], 57, 58);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.625], 58.5, 60);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.375], 60, 62);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.375], 61, 63);
    setColor(walls, 2, [30, 1, 1], 63, 64);
    setColor(walls, 2, [0, 1, 1], 64, 67);
    setGradientColor(walls, 2, [270, 1, 1], [330, 1, 1], 93, 96);
    setColor(walls, 2, [0, 0, 0.375], 128, 128);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 1], 143, 144);
    setColor(walls, 2, [0, 0, 0.375], 144, 145);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.375], 146, 147);
    setGradientColor(walls, 2, [0, 0, 1.5], [0, 0, 0.375], 164, 167);
    randomizeColor(walls, 2, [0, 0, 0.25], [240, 0.25, 0.5], 168, 188);
    setGradientColor(walls, 2, [0, 0, 0.5], [0, 0, 0.25], 192, 192.5);
    setColor(walls, 2, [0, 0, 0.75], 194, 195);
    setGradientColor(walls, 2, [0, 0, 0.5], [0, 0, 0.25], 256, 256.5);
    setGradientColor(walls, 2, [0, 0, 0.75], [0, 0, 0.25], 260, 262);
    setColor(centerWalls, 2, [0, 0, 0.75], 260, 260.75);
    randomizeColor(walls, 2, [0, 0, 0.25], [240, 0.25, 0.5], 262, 280);
    setGradientColor(walls, 2, [0, 0, 0.25], [0, 0, 1], 280, 288);
    setColor(walls, 2, [0, 0, 0.5], 288, 288);
    setGradientColor(walls, 2, [270, 1, 1], [330, 1, 1], 295.5 + 1 / 8, 298.5 + 1 / 8);
    setGradientColor(walls, 2, [270, 1, 1], [330, 1, 1], 295.5, 298.5);
    setGradientColor(walls, 2, [0, 0, 0.5], [0, 0, 0.75], 327.5 + 1 / 8, 330.5 + 1 / 8);
    setGradientColor(
        crouchWalls,
        2,
        [270, 1, 1],
        [330, 1, 1],
        327.5 + 1 / 8,
        330.5 + 1 / 8
    );
    setGradientColor(walls, 2, [0, 0, 0.5], [0, 0, 0.75], 327.5, 330.5);
    setGradientColor(crouchWalls, 2, [270, 1, 1], [330, 1, 1], 327.5, 330.5);
    setGradientColor(walls, 2, [0, 0, 0.5], [0, 0, 0.25], 353.5, 354);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 1], 399, 400);
    setColor(walls, 2, [0, 0, 0.375], 400, 401);
    setGradientColor(walls, 2, [0, 0, 1], [0, 0, 0.375], 402, 403);
    setGradientColor(walls, 2, [0, 0, 1.5], [0, 0, 0.375], 419, 424);
    setColor(walls, 2, [0, 0, 0.25], 424, 434);
    //#endregion
}

module.exports = {
    name: 'werewolf howls',
    params: {},
    run: check,
    errorCheck: false,
};
