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

const urColorLeft = [290, 0, 0.3125];
const urColorRight = [90, 0.66, 0.625];
const kaleidoColorLeft = [0, 0.81, 0.75];
const kaleidoColorRight = [0, 0, 0.28125];
const kdaColorLeft = [315, 0.75, 0.75];
const kdaColorRight = [195, 0.75, 0.78125];
// const dColorLeft = [360, 0.92, 0.78];
// const dColorRight = [203, 0.81, 0.81];
const dColorLeft = [290, 0.66, 0.6875];
const dColorRight = [105, 0.6875, 0.66];
const dObstacleColor = [270, 0.75, 0.875];

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
            n._customData = { _color: HSVAtoRGBA(0, 1, 2) };
        }
        if (n._type === 1) {
            n._customData = { _color: HSVAtoRGBA(240, 1, 2) };
        }
        if (n._type === 3) {
            n._customData = { _color: HSVAtoRGBA(120, 1, 2) };
            n._cutDirection = Math.floor(Math.random() * 9);
        }
    });
    walls.forEach((w) => {
        w._customData = { _color: HSVAtoRGBA(60, 1, 2) };
    });
    //#region notes
    setColor(notes, 0, urColorLeft, 5, 66);
    setColor(notes, 1, urColorRight, 5, 66);
    setColor(notes, 0, kdaColorLeft, 70, 85);
    setColor(notes, 1, kdaColorRight, 70, 85);
    setColor(notes, 0, dColorLeft, 86, 999);
    setColor(notes, 1, dColorRight, 86, 999);
    setColor(notes, 0, urColorLeft, 303, 314);
    setColor(notes, 1, urColorRight, 303, 314);
    setColor(notes, 0, urColorLeft, 327, 332);
    setColor(notes, 1, urColorRight, 327, 332);
    setColor(notes, 0, urColorLeft, 387, 393);
    setColor(notes, 1, urColorRight, 387, 393);
    setColor(notes, 0, urColorLeft, 395, 401.5);
    setColor(notes, 1, urColorRight, 395, 401.5);
    setGradientColor(notes, 0, urColorLeft, dColorLeft, 400, 402);
    setColor(notes, 0, urColorLeft, 403, 410);
    setColor(notes, 1, urColorRight, 403, 410);
    setColor(notes, 0, kaleidoColorLeft, 473, 602);
    setColor(notes, 1, kaleidoColorRight, 473, 602);
    setColor(notes, 0, kdaColorLeft, 602, 618);
    setColor(notes, 1, kdaColorRight, 602, 618);
    setColor(notes, 0, urColorLeft, 682, 706);
    setColor(notes, 1, urColorRight, 682, 706);
    //#endregion
    //#region bombs
    randomizeColor(notes, 3, [0, 0, 0.25], [0, 0, 0.5], 5, 70);
    setGradientColor(notes, 3, [0, 0, 0.25], [0, 0, 1], 80, 85);
    setColor(notes, 3, [0, 0, 0.25], 85, 86);
    randomizeColor(notes, 3, [0, 0, 0.25], [0, 0, 0.5], 147, 149);
    randomizeColor(notes, 3, [30, 0, 0.25], [0, 0.25, 0.5], 154, 173);
    setGradientColor(notes, 3, [0, 0, 0.75], [0, 0, 0.25], 180, 182);
    randomizeColor(notes, 3, [0, 0, 0.25], [0, 0, 0.5], 231, 239);
    randomizeColor(notes, 3, [0, 0, 0.375], [0, 0, 0.5], 345, 348);
    setGradientColor(notes, 3, [0, 0, 0.5], [0, 0, 1], 348, 350);
    randomizeColor(notes, 3, [30, 0, 0.25], [0, 0.25, 0.5], 355, 374);
    randomizeColor(notes, 3, [0, 0, 0.375], [0, 0, 0.5], 388, 409);
    randomizeColor(notes, 3, [0, 0, 0.5], [0, 0, 0.625], 394, 395);
    randomizeColor(notes, 3, [0, 0, 0.5], [0, 0, 0.625], 402, 403);
    setColor(notes, 3, [0, 0, 0.375], 410);
    randomizeColor(notes, 3, [0, 0, 0.25], [0, 0, 0.5], 431, 439);
    randomizeColor(notes, 3, [0, 0, 0.25], [0, 0, 1], 469, 473);
    randomizeColor(notes, 3, [0, 1, 0.25], [0, 1, 0.75], 616, 620);
    randomizeColor(notes, 3, [0, 0, 0.25], [0, 0, 0.5], 705, 708);
    randomizeColor(notes, 3, [0, 0, 0.25], [0, 0, 0.5], 748, 777);
    randomizeColor(notes, 3, [0, 0, 0.375], [0, 1, 0.75], 760, 762);
    randomizeColor(notes, 3, [0, 0, 0.25], [0, 0, 1], 830, 840);
    //#endregion
    //#region walls
    randomizeColor(walls, 2, [0, 0, 0.25], [0, 0, 0.75], 65.5, 70);
    setColor(walls, 2, dObstacleColor, 78, 999);
    randomizeColor(walls, 2, [0, 0, 0.5], [0, 0, 0.75], 118, 142);
    randomizeColor(walls, 2, [0, 0, 0.25], [0, 0, 0.5], 206, 220);
    randomizeColor(walls, 2, [0, 0, 0], [0, 0, 0.25], 226, 230);
    setColor(walls, 2, [0, 0, 1], 229.75, 230);
    randomizeColor(walls, 2, [0, 0, 0.25], [0, 0, 0.5], 345, 350);
    setColor(walls, 2, [0, 1, 1], 427, 433);
    setColor(walls, 2, [0, 0, 1], 468, 473);
    randomizeColor(walls, 2, [0, 1, 0.25], [0, 1, 0.75], 473, 545);
    setGradientColor(walls, 2, [0, 1, 0.75], [0, 1, 0], 590, 602);
    randomizeColor(walls, 2, [0, 1, 0.25], [0, 1, 0.75], 616, 620);
    randomizeColor(walls, 2, [0, 0, 0], [0, 0, 0.25], 742, 747);
    randomizeColor(walls, 2, [0, 0, 0.75], [0, 0, 1], 747, 748);
    randomizeColor(walls, 2, [0, 0, 0.5], [0, 0, 0.75], 820, 830);
    randomizeColor(walls, 2, [0, 0.875, 0.875], [0, 1, 1], 870, 900);
    //#endregion
}

module.exports = {
    name: 'Unconscious Requiem',
    params: {},
    run: check,
    errorCheck: false,
};
