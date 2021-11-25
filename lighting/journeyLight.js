'use strict';

const fs = require('fs');

const INPUT_FILE = 'NormalLightshow.dat';
const OUTPUT_FILE = 'Lightshow.dat';

let difficulty = JSON.parse(fs.readFileSync(INPUT_FILE));
let _events = difficulty._events;
difficulty._version = '2.5.0';

const isLight = (t) => {
    return t >= 0 && t <= 4;
};

_events.forEach((e) => {
    e._floatValue = 1;
    if (isLight(e._type)) {
        e._floatValue = e._value ? 1 : 0;
    }
    if (e._customData?._color) {
        if (e._value !== 0) {
            e._value = e._customData._color[0] ? (e._value <= 4 ? 4 : 8) : e._value;
        }
        e._floatValue = e._customData._color[3] ?? 1;
    }
    delete e._customData;
});

function normalize(x, min, max) {
    return (x - min) / (max - min);
}

function lerp(x, y, a) {
    return x + (y - x) * a;
}

const easings = {
    Linear: (x) => x,
    InQuad: (x) => x * x,
    OutQuad: (x) => x * (2 - x),
    InOutQuad: (x) => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x),
    InCubic: (x) => x * x * x,
    OutCubic: (x) => --x * x * x + 1,
    InOutCubic: (x) =>
        x < 0.5 ? 4 * x * x * x : (x - 1) * (2 * x - 2) * (2 * x - 2) + 1,
    InQuart: (x) => x * x * x * x,
    OutQuart: (x) => 1 - --x * x * x * x,
    InOutQuart: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - 8 * --x * x * x * x),
    InQuint: (x) => x * x * x * x * x,
    OutQuint: (x) => 1 - --x * x * x * x * x,
    InOutQuint: (x) =>
        x < 0.5 ? 16 * x * x * x * x * x : 1 + 16 * --x * x * x * x * x,
};

function setFloat(t1, t2, n, type) {
    if (t2 < t1) {
        throw new Error(`t1 ${t1} starts after t2 ${t2}`);
    }
    for (let i = 0; i < _events.length; i++) {
        if (_events[i]._time > t2) {
            break;
        }
        if (
            !isLight(_events[i]._type) ||
            _events[i]._time < t1 ||
            (type != null && _events[i]._type !== type)
        ) {
            continue;
        }
        _events[i]._floatValue = n;
    }
}

function gradientFloat(t1, t2, n1, n2, type, ease = 'Linear') {
    if (t2 < t1) {
        throw new Error(`t1 ${t1} starts after t2 ${t2}`);
    }
    let norm = 0;
    for (let i = 0; i < _events.length; i++) {
        if (_events[i]._time > t2) {
            break;
        }
        if (
            !isLight(_events[i]._type) ||
            _events[i]._time < t1 ||
            (type != null && _events[i]._type !== type)
        ) {
            continue;
        }
        norm = easings[ease](normalize(_events[i]._time, t1, t2));
        _events[i]._floatValue = lerp(n1, n2, norm);
    }
}

function randomizeFloat(t1, t2, min, max, type) {
    if (t2 < t1) {
        throw new Error(`t1 ${t1} starts after t2 ${t2}`);
    }
    max = Math.max(min, max);
    for (let i = 0; i < _events.length; i++) {
        if (_events[i]._time > t2) {
            break;
        }
        if (
            !isLight(_events[i]._type) ||
            _events[i]._time < t1 ||
            (type != null && _events[i]._type !== type)
        ) {
            continue;
        }
        _events[i]._floatValue = min + Math.random() * (max - min);
    }
}

//#region Vagueness
//#region intro
for (let i = 0; i < 3; i++) {
    let offset = i * 64;
    gradientFloat(6 + offset - (!i ? 1 / 16 : 0), 16 + offset, 1.2, 0.125, 1);
    gradientFloat(6 + offset - (!i ? 1 / 16 : 0), 12 + offset, 1.2, 0, 4, 'InQuad');
    if (i !== 2) {
        gradientFloat(38 + offset, 40 + offset, 0.75, 0.125, 4, 'OutQuad');
    }
}
gradientFloat(150, 151.999, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(176, 177.875, 0.75, 0.125, 4, 'InQuad');
gradientFloat(182, 184, 0.875, 0.1875, 4, 'InQuad');
gradientFloat(187.5, 188.5, 0.5, 0.0625, 4, 'InQuad');
gradientFloat(191.5, 192.5, 0.75, 0.125, 4, 'InQuad');
gradientFloat(193.5, 195.5, 1, 0.25, 4, 'InQuad');
gradientFloat(198, 198.999, 1, 0, 4);
//#endregion

for (let i = 0; i < 24; i++) {
    let offset = i * 2;
    gradientFloat(199 + offset, 199.999 + offset, 1, 0.125, 4, 'OutQuad');
}
setFloat(213.5, 214, 0.5, 4);
gradientFloat(214, 214.999, 1, 0, 4);
gradientFloat(226.5, 227, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(227.5, 228.5, 1, 0.125, 4, 'OutQuad');
setFloat(229.5, 230, 0.5, 4);
gradientFloat(230, 230.999, 1, 0, 4);
gradientFloat(242.5, 243, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(243.5, 244.5, 1, 0.125, 4, 'OutQuad');
setFloat(245.5, 246, 0.5, 4);
gradientFloat(246, 246.999, 1, 0, 4);
gradientFloat(257.5, 259, 1.2, 0.125, 4);
randomizeFloat(258, 261.999, 0.125, 0.3125, 0);
gradientFloat(259, 262.999, 0.125, 1, 1, 'OutQuad');
gradientFloat(259, 262.999, 0.125, 1, 4, 'OutQuad');
//#endregion

//#region JOURNEY
//#region intro
gradientFloat(262, 270, 1.375, 0.125, 1, 'OutQuad');
gradientFloat(262, 264, 1.375, 1, 4, 'OutQuad');
gradientFloat(270, 274, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(274, 278, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(277, 277.999, 1, 0.25, 2, 'OutQuad');
gradientFloat(277, 277.999, 1, 0.25, 3, 'OutQuad');
gradientFloat(278, 286, 1.375, 0.125, 1, 'OutQuad');
gradientFloat(278, 280, 1.2, 1, 4, 'OutQuad');
gradientFloat(286, 290, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(290, 294, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(294, 296, 1.25, 0.25, 1, 'OutQuad');
gradientFloat(294, 296, 1.2, 1, 4, 'OutQuad');
gradientFloat(296, 310, 0.25, 1.2, 1);
gradientFloat(306, 310, 0.125, 1, 4);
gradientFloat(310, 310.999, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(311.5, 312.499, 1.2, 0.125, 1, 'OutQuad');
gradientFloat(311.5, 312.5, 1.25, 0.75, 4);
gradientFloat(313, 313.999, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(314.5, 315.499, 1.2, 0.125, 1, 'OutQuad');
gradientFloat(314.5, 315.5, 1.25, 0.75, 4);
gradientFloat(317, 317.999, 1, 2, 4, 'OutQuad');
//#endregion

//#region lyric
gradientFloat(326, 326.999, 1.125, 0.375, 4);
gradientFloat(342, 342.999, 1.125, 0.375, 4);
gradientFloat(358, 358.999, 1.125, 0.375, 4);
gradientFloat(374, 374.999, 1.125, 0.375, 4);
gradientFloat(385.5, 387.25, 1.25, 0.25, 2, 'InQuad');
gradientFloat(385.5, 387.25, 1.25, 0.25, 3, 'InQuad');
gradientFloat(387.5, 390, 1.25, 0.0625, 2, 'InQuad');
gradientFloat(387.5, 390, 1.25, 0.0625, 3, 'InQuad');
//#endregion

//#region pre-build 1
gradientFloat(406, 407.5, 1.125, 0.375, 1);
gradientFloat(407.5, 412, 1, 0.25, 1);
gradientFloat(418.5, 421, 0.125, 0.5, 1);
gradientFloat(418.5, 421, 0.125, 0.5, 4);
setFloat(421, 421, 0.875, 4);
//#endregion

//#region build 1
gradientFloat(422, 424, 1.25, 0.25, 1, 'OutQuad');
gradientFloat(422, 424, 1.375, 1, 4, 'InQuad');
gradientFloat(424, 438, 0.25, 1.2, 1);
gradientFloat(430, 438, 0.0625, 1, 4);
gradientFloat(438, 438.999, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(439.5, 440.499, 1.2, 0.125, 1, 'OutQuad');
gradientFloat(439.5, 440.5, 1.25, 0.75, 4);
gradientFloat(441, 441.999, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(442.5, 443.499, 1.2, 0.125, 1, 'OutQuad');
gradientFloat(442.5, 443.5, 1.25, 0.75, 4);
gradientFloat(443.5, 444.5, 0.25, 0.75, 1);
gradientFloat(446, 447, 1.25, 0.125, 4, 'InQuad');
gradientFloat(447, 449.5, 0.125, 1, 1, 'OutQuad');
gradientFloat(447, 449.5, 0.125, 1, 4, 'OutQuad');
gradientFloat(449.5, 450, 1, 0.25, 2, 'InQuad');
gradientFloat(449.5, 450, 1, 0.25, 3, 'InQuad');
//#endregion

//#region chorus 1
gradientFloat(454, 455.5, 1.5, 1, 0, 'OutQuad');
gradientFloat(454, 456, 1.25, 0.25, 1, 'OutQuad');
gradientFloat(454, 454.999, 1.375, 0.25, 4);
for (let i = 0; i < 28; i++) {
    let offset = i * 2;
    gradientFloat(455 + offset, 455.999 + offset, 1, 0.125, 4, 'OutQuad');
}
gradientFloat(457.5, 459, 1.125, 1, 0, 'OutQuad');
gradientFloat(466.5, 467, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(467.5, 468.5, 1, 0.125, 4, 'OutQuad');
setFloat(469.5, 470, 0.5, 4);
gradientFloat(470, 471.5, 1.375, 1, 0, 'OutQuad');
gradientFloat(470, 470.999, 1.2, 0.125, 4);
for (let i = 0; i < 4; i++) {
    let offset = i * 2;
    gradientFloat(471 + offset, 472.999 + offset, 1.125, 0, 4);
}
gradientFloat(473.5, 475, 1.125, 1, 0, 'OutQuad');
gradientFloat(479.5, 482, 1.125, 0.75, 2);
gradientFloat(479.5, 482, 1.125, 0.75, 3);
gradientFloat(481.5, 483.5, 1, 0, 0);
gradientFloat(481.5, 482, 0.75, 0.25, 1);
gradientFloat(481.5, 482, 0.75, 0.25, 4);
setFloat(482.5, 484, 0.75, 2);
setFloat(482.5, 484, 0.75, 3);
gradientFloat(483, 484, 1, 0.25, 4);
gradientFloat(484.5, 485.999, 0.75, 1.2, 2);
gradientFloat(484.5, 485.999, 0.75, 1.2, 3);
gradientFloat(484.5, 485.999, 1, 0, 1);
gradientFloat(484.5, 485.999, 1, 0, 4);
gradientFloat(486, 487.5, 1.375, 1, 0, 'OutQuad');
gradientFloat(486, 486.999, 1.2, 0.125, 4);
gradientFloat(489.5, 491, 1.125, 1, 0, 'OutQuad');
gradientFloat(498.5, 499, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(499.5, 500.5, 1, 0.125, 4, 'OutQuad');
setFloat(501.5, 502, 0.5, 4);
gradientFloat(502, 503.5, 1.375, 1, 0, 'OutQuad');
for (let i = 0; i < 3; i++) {
    let offset = i * 2;
    gradientFloat(503 + offset, 504.999 + offset, 1.125, 0, 4);
}
gradientFloat(505.5, 507, 1.125, 1, 0, 'OutQuad');
//#endregion

//#region lyrci 2
gradientFloat(521.5, 522.5, 0.75, 0, 4, 'OutQuad');
gradientFloat(522.5, 523.5, 0.75, 0, 4, 'OutQuad');
gradientFloat(529.5, 530.5, 0.75, 0, 4, 'OutQuad');
gradientFloat(530.5, 531.5, 0.75, 0, 4, 'OutQuad');
gradientFloat(531.5, 533.5, 1, 0, 4, 'InQuad');
gradientFloat(537.5, 538.5, 0.75, 0, 4, 'OutQuad');
gradientFloat(538.5, 539.5, 0.75, 0, 4, 'OutQuad');
gradientFloat(545.5, 546.5, 0.75, 0, 4, 'OutQuad');
gradientFloat(546.5, 547.5, 0.75, 0, 4, 'OutQuad');
gradientFloat(550, 550.999, 1.125, 0.375, 4);
gradientFloat(566, 566.999, 1.125, 0.375, 4);
//#endregion

//#region pre-build 2
gradientFloat(596, 597, 0.125, 0.5, 1);
gradientFloat(596, 597, 0.125, 0.5, 4);
setFloat(597, 597, 0.875, 4);
gradientFloat(598, 599.5, 1.125, 0.375, 1);
gradientFloat(599.5, 604, 1, 0.25, 1);
gradientFloat(612, 613.5, 1, 0.25, 1);
gradientFloat(612, 613.5, 1, 0.25, 4);
//#endregion

//#region build 2
gradientFloat(614, 616, 1.5, 0.25, 1, 'OutQuad');
gradientFloat(614, 615, 1.375, 1, 2, 'InQuad');
gradientFloat(614, 615, 1.375, 1, 3, 'InQuad');
gradientFloat(614, 616, 1.375, 1, 4, 'InQuad');
gradientFloat(616, 630, 0.25, 1.2, 1);
gradientFloat(630, 630.999, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(631.5, 632.499, 1.2, 0.125, 1, 'OutQuad');
gradientFloat(631.5, 632.5, 1.25, 0.75, 4);
gradientFloat(633, 633.999, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(634.5, 635.499, 1.2, 0.125, 1, 'OutQuad');
gradientFloat(634.5, 635.5, 1.25, 0.75, 4);
gradientFloat(635.5, 636.5, 0.25, 0.75, 1);
gradientFloat(638, 639, 1.25, 0.125, 4, 'InQuad');
gradientFloat(639, 641.5, 0.125, 1, 1, 'OutQuad');
gradientFloat(639, 641.5, 0.125, 1, 4, 'OutQuad');
gradientFloat(641.5, 642, 1, 0.25, 2, 'InQuad');
gradientFloat(641.5, 642, 1, 0.25, 3, 'InQuad');
//#endregion

//#region chorus 2
gradientFloat(646, 647.5, 1.5, 1, 0, 'OutQuad');
gradientFloat(646, 648, 1.25, 0.25, 1, 'OutQuad');
gradientFloat(646, 646.999, 1.375, 0.25, 4);
for (let i = 0; i < 28; i++) {
    let offset = i * 2;
    gradientFloat(647 + offset, 647.999 + offset, 1, 0.125, 4, 'OutQuad');
}
gradientFloat(649.5, 651, 1.125, 1, 0, 'OutQuad');
gradientFloat(658.5, 659, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(659.5, 660.5, 1, 0.125, 4, 'OutQuad');
setFloat(661.5, 662, 0.5, 4);
gradientFloat(662, 663.5, 1.375, 1, 0, 'OutQuad');
gradientFloat(662, 662.999, 1.2, 0.125, 4);
for (let i = 0; i < 4; i++) {
    let offset = i * 2;
    gradientFloat(663 + offset, 664.999 + offset, 1.125, 0, 4);
}
gradientFloat(665.5, 667, 1.125, 1, 0, 'OutQuad');
gradientFloat(671.5, 674, 1.125, 0.75, 2);
gradientFloat(671.5, 674, 1.125, 0.75, 3);
gradientFloat(673.5, 675.5, 1, 0, 0);
gradientFloat(673.5, 674, 0.75, 0.25, 1);
gradientFloat(673.5, 674, 0.75, 0.25, 4);
setFloat(674.5, 676, 0.75, 2);
setFloat(674.5, 676, 0.75, 3);
gradientFloat(675, 676, 1, 0.25, 4);
gradientFloat(676.5, 677.999, 1, 0, 1);
gradientFloat(676.5, 677.999, 0.75, 1.2, 2);
gradientFloat(676.5, 677.999, 0.75, 1.2, 3);
gradientFloat(676.5, 677.999, 1, 0, 4);
gradientFloat(678, 679.5, 1.375, 1, 0, 'OutQuad');
gradientFloat(678, 678.999, 1.2, 0.125, 4);
gradientFloat(681.5, 683, 1.125, 1, 0, 'OutQuad');
gradientFloat(690.5, 691, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(691.5, 692.5, 1, 0.125, 4, 'OutQuad');
setFloat(693.5, 694, 0.5, 4);
gradientFloat(694, 695.5, 1.375, 1, 0, 'OutQuad');
for (let i = 0; i < 3; i++) {
    let offset = i * 2;
    gradientFloat(695 + offset, 696.999 + offset, 1.125, 0, 4);
}
gradientFloat(697.5, 699, 1.125, 1, 0, 'OutQuad');
//#endregion

//#region bridge
gradientFloat(710, 710.499, 1.25, 0.25, 1, 'OutQuad');
gradientFloat(710, 710.999, 1.375, 0.25, 4);
for (let i = 0; i < 7; i++) {
    let offset = i * 2;
    gradientFloat(711 + offset, 711.999 + offset, 1, 0.125, 4, 'OutQuad');
}
gradientFloat(726, 726.999, 1.375, 0.25, 4);
for (let i = 0; i < 5; i++) {
    let offset = i * 2;
    gradientFloat(727 + offset, 727.999 + offset, 1, 0.125, 4, 'OutQuad');
}
gradientFloat(734, 734.999, 1.2, 0.125, 4);
gradientFloat(737.5, 738.499, 1.125, 0.375, 4);
gradientFloat(739.5, 740.499, 1, 0.125, 4);
for (let i = 0; i < 7; i++) {
    let offset = i * 2;
    gradientFloat(741 + offset, 741.999 + offset, 1, 0.125, 4, 'OutQuad');
}
setFloat(741.5, 741.999, 0.5, 4);
gradientFloat(742, 742.999, 1.375, 0.25, 4);
gradientFloat(752, 752.999, 1.2, 0.125, 4);
gradientFloat(754.5, 755.499, 1.2, 0.375, 4);
for (let i = 0; i < 6; i++) {
    let offset = i * 2;
    gradientFloat(757 + offset, 757.999 + offset, 1, 0.125, 4, 'OutQuad');
}
setFloat(757.5, 757.999, 0.5, 4);
gradientFloat(758, 758.999, 1.375, 0.25, 4);
gradientFloat(766, 766.999, 1, 0, 1);
gradientFloat(769.5, 770, 0.75, 0.25, 1);
gradientFloat(769.5, 770, 0.75, 0.25, 4);
gradientFloat(770, 771.5, 0.25, 1, 1, 'InQuad');
gradientFloat(770, 771.5, 0.25, 1, 4, 'InQuad');
gradientFloat(772.5, 773.999, 0.375, 1, 1);
gradientFloat(772.5, 773.999, 0.375, 1, 4);
gradientFloat(774, 776, 1.25, 1, 1);
gradientFloat(774, 776, 1.375, 1, 4);
gradientFloat(778.5, 779, 1, 0.125, 4, 'OutQuad');
gradientFloat(784.5, 785, 1, 0.125, 4, 'OutQuad');
gradientFloat(787.5, 788, 1, 0.125, 4, 'OutQuad');
gradientFloat(790, 792, 1.375, 1, 4);
gradientFloat(791.5, 792.5, 1.125, 0.125, 4, 'InQuad');
gradientFloat(793.5, 794.5, 1.125, 0.125, 4, 'InQuad');
gradientFloat(795.5, 796.5, 1.125, 0.125, 4, 'InQuad');
gradientFloat(806, 806.999, 1.2, 0.25, 4);
for (let i = 0; i < 4; i++) {
    let offset = i * 2;
    gradientFloat(807 + offset, 807.999 + offset, 1, 0.125, 4, 'OutQuad');
}
gradientFloat(815, 815.999, 1.2, 0.25, 4);
gradientFloat(816, 816.999, 1, 0.125, 4, 'OutQuad');
gradientFloat(817, 817.999, 1.2, 0.25, 4);
gradientFloat(819, 819.999, 1, 0.125, 4, 'OutQuad');
setFloat(819.5, 820, 0.75, 4);
gradientFloat(821, 821.999, 1, 0.125, 4, 'OutQuad');
gradientFloat(822, 822.999, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(823.5, 824.499, 1.2, 0.125, 1, 'OutQuad');
gradientFloat(823.5, 824.5, 1.25, 0.75, 4);
gradientFloat(825, 825.999, 1.375, 0.25, 1, 'OutQuad');
gradientFloat(826.5, 827.499, 1.2, 0.125, 1, 'OutQuad');
gradientFloat(826.5, 827.5, 1.25, 0.75, 4);
gradientFloat(827.5, 828.5, 0.25, 0.75, 1);
gradientFloat(828, 829, 0.75, 0.125, 4);
gradientFloat(829, 830, 1.125, 0.125, 1, 'InQuad');
gradientFloat(829, 830, 1, 0.25, 4);
gradientFloat(830, 831, 1.25, 0.125, 4, 'InQuad');
gradientFloat(831, 833.5, 0.125, 1, 1, 'OutQuad');
gradientFloat(831, 833.5, 0.125, 1, 4, 'OutQuad');
gradientFloat(833.5, 836, 1.375, 1, 2);
gradientFloat(833.5, 836, 1.375, 1, 3);
gradientFloat(833.5, 834.5, 1, 0.125, 4, 'OutQuad');
gradientFloat(836, 838, 1, 0, 2, 'InQuad');
gradientFloat(836, 838, 1, 0, 3, 'InQuad');
//#endregion

//#region calm
gradientFloat(868, 870, 0.75, 0.125, 2, 'OutQuad');
gradientFloat(870, 884, 1.25, 0.25, 2, 'OutQuad');
gradientFloat(870, 878, 1.25, 0.75, 3, 'OutQuad');
gradientFloat(878, 886, 1.125, 0.5, 3, 'OutQuad');
gradientFloat(885, 885.999, 1, 0.125, 4, 'OutQuad');
gradientFloat(886, 894, 1.25, 0.75, 2, 'OutQuad');
gradientFloat(886, 894, 1.25, 0.75, 3, 'OutQuad');
gradientFloat(893, 893.999, 1, 0.125, 4, 'OutQuad');
gradientFloat(894, 896, 0.75, 0.125, 2);
gradientFloat(894, 896, 0.75, 0.125, 3);
//#endregion

//#region chorus finale
gradientFloat(902, 903.5, 1.5, 1, 0, 'OutQuad');
gradientFloat(902, 904, 1.25, 0.25, 1, 'OutQuad');
gradientFloat(902, 902.999, 1.375, 0.25, 4);
for (let i = 0; i < 28; i++) {
    let offset = i * 2;
    gradientFloat(903 + offset, 903.999 + offset, 1, 0.125, 4, 'OutQuad');
}
gradientFloat(905.5, 907, 1.125, 1, 0, 'OutQuad');
gradientFloat(914.5, 915, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(915.5, 916.5, 1, 0.125, 4, 'OutQuad');
setFloat(917.5, 918, 0.5, 4);
gradientFloat(918, 919.5, 1.375, 1, 0, 'OutQuad');
gradientFloat(918, 918.999, 1.2, 0.125, 4);
for (let i = 0; i < 4; i++) {
    let offset = i * 2;
    gradientFloat(919 + offset, 920.999 + offset, 1.125, 0, 4);
}
gradientFloat(921.5, 923, 1.125, 1, 0, 'OutQuad');
gradientFloat(927.5, 930, 1.125, 0.75, 2);
gradientFloat(927.5, 930, 1.125, 0.75, 3);
gradientFloat(929.5, 931.5, 1, 0, 0);
gradientFloat(929.5, 930, 0.75, 0.25, 1);
gradientFloat(929.5, 930, 0.75, 0.25, 4);
setFloat(930.5, 932, 0.75, 2);
setFloat(930.5, 932, 0.75, 3);
gradientFloat(931, 932, 1, 0.25, 4);
gradientFloat(932.5, 933.999, 1, 0, 1);
gradientFloat(932.5, 933.999, 0.75, 1.2, 2);
gradientFloat(932.5, 933.999, 0.75, 1.2, 3);
gradientFloat(932.5, 933.999, 1, 0, 4);
gradientFloat(934, 935.5, 1.375, 1, 0, 'OutQuad');
gradientFloat(934, 934.999, 1.2, 0.125, 4);
gradientFloat(937.5, 939, 1.125, 1, 0, 'OutQuad');
gradientFloat(946.5, 947, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(947.5, 948.5, 1, 0.125, 4, 'OutQuad');
setFloat(949.5, 950, 0.5, 4);
gradientFloat(950, 951.5, 1.375, 1, 0, 'OutQuad');
for (let i = 0; i < 3; i++) {
    let offset = i * 2;
    gradientFloat(951 + offset, 952.999 + offset, 1.125, 0, 4);
}
gradientFloat(953.5, 955, 1.125, 1, 0, 'OutQuad');
gradientFloat(962.5, 964.75, 0.5, 1.25, 1);
gradientFloat(962.5, 964.75, 0.5, 1.25, 2);
gradientFloat(962.5, 964.75, 0.5, 1.25, 3);
setFloat(963, 963.5, 0.375, 1);
//#endregion

//#region ending
gradientFloat(966, 968, 1.25, 0.25, 1, 'OutQuad');
gradientFloat(966, 966.999, 1.375, 0.25, 4);
for (let i = 0; i < 28; i++) {
    let offset = i * 2;
    gradientFloat(967 + offset, 967.999 + offset, 1, 0.125, 4, 'OutQuad');
}
gradientFloat(978.5, 979, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(979.5, 980.5, 1, 0.125, 4, 'OutQuad');
setFloat(981.5, 982, 0.5, 4);
gradientFloat(982, 982.999, 1.2, 0.125, 4);
for (let i = 0; i < 4; i++) {
    let offset = i * 2;
    gradientFloat(983 + offset, 984.999 + offset, 1.125, 0, 4);
}
gradientFloat(991.5, 994, 1.125, 0.75, 2);
gradientFloat(991.5, 994, 1.125, 0.75, 3);
gradientFloat(993.5, 994, 0.75, 0.5, 1);
gradientFloat(993.5, 994, 0.75, 0.5, 4);
setFloat(994.5, 996, 0.75, 2);
setFloat(994.5, 996, 0.75, 3);
gradientFloat(995, 996, 1, 0.25, 4);
gradientFloat(996.5, 997.999, 1, 0, 1);
gradientFloat(996.5, 997.999, 0.75, 1.2, 2);
gradientFloat(996.5, 997.999, 0.75, 1.2, 3);
gradientFloat(996.5, 997.999, 1, 0, 4);
gradientFloat(998, 998.999, 1.2, 0.125, 4);
gradientFloat(1010.5, 1011, 0.75, 0.125, 4, 'OutQuad');
gradientFloat(1011.5, 1012, 1, 0.5, 4, 'OutQuad');
gradientFloat(1014, 1014.999, 1.2, 0.125, 4);
gradientFloat(1023, 1023.999, 1, 0.125, 4, 'OutQuad');
gradientFloat(1023.5, 1024, 1.125, 0.25, 4);
gradientFloat(1025.5, 1027, 1.25, 0.25, 1, 'OutQuad');
gradientFloat(1025.5, 1027, 1.375, 0, 4);
gradientFloat(1029, 1029.999, 1, 0.125, 4, 'OutQuad');
gradientFloat(1030, 1031.5, 1.25, 0.25, 1, 'OutQuad');
gradientFloat(1030, 1034.999, 1.125, 0, 2, 'InQuad');
gradientFloat(1030, 1034.999, 1.125, 0, 3, 'InQuad');
gradientFloat(1030, 1031.5, 1.375, 0, 4);
gradientFloat(1034, 1035, 1.25, 0.125, 4, 'InQuad');
gradientFloat(1035, 1037.5, 0.125, 1, 1, 'OutQuad');
gradientFloat(1035, 1037.5, 0.125, 1, 4, 'OutQuad');
gradientFloat(1037.5, 1039, 1.25, 0, 2, 'InQuad');
gradientFloat(1037.5, 1039, 1.25, 0, 3, 'InQuad');
gradientFloat(1037.5, 1038, 1, 0.5, 4, 'OutQuad');
//#endregion
//#endregion

_events.forEach((e) => {
    if (isLight(e._type)) {
        e._floatValue = e._value ? e._floatValue : 0;
    }
});

// save file
const precision = 4;
const jsonP = Math.pow(10, precision);
const sortP = Math.pow(10, 2);
function deeperDaddy(obj) {
    if (obj) {
        for (const key in obj) {
            if (obj[key] == null || JSON.stringify(obj[key]) === '{}') {
                delete obj[key];
            } else if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
                deeperDaddy(obj[key]);
            } else if (typeof obj[key] === 'number') {
                obj[key] = parseFloat(
                    Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP
                );
            }
        }
    }
}
deeperDaddy(difficulty);
difficulty._notes.sort(
    (a, b) =>
        parseFloat(Math.round((a._time + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._time + Number.EPSILON) * sortP) / sortP) ||
        parseFloat(Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) ||
        parseFloat(Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP)
);
difficulty._obstacles.sort((a, b) => a._time - b._time);
difficulty._events.sort((a, b) => a._time - b._time);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(difficulty, null));

console.log(
    `gradient event: ${
        difficulty._events.filter(
            (e) => isLight(e._type) && (e._value === 4 || e._value === 8)
        ).length
    }`
);
