import * as bsmap from '../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Undefined/';

const info = bsmap.load.infoSync();
const difficultyList = bsmap.load.difficultyFromInfoSync(info);

difficultyList.forEach((d) => {
    if (!bsmap.version.isV3(d.data)) {
        d.data = bsmap.convert.V2toV3(d.data, true);
    }

    const prevSlider: {
        [key: number]: bsmap.types.v3.ColorNote;
    } = {};
    const possibleBurst: {
        [key: number]: bsmap.types.v3.ColorNote[];
    } = { 0: [], 1: [] };
    for (let i = 0, j = 0, len = d.data.colorNotes.length; i < len; i++) {
        const n = d.data.colorNotes[i];
        if (n.d === 8) {
            n.a = 45;
        }
        if (d.difficulty === 'ExpertPlus') {
            if (n.c === 1 && n.b >= 32 && n.b < 32.75) {
                n.a = bsmap.utils.lerp(bsmap.utils.normalize(n.b, 32, 32.75), -45, 0);
            }
            if (n.c === 0 && n.b >= 33 && n.b < 33.75) {
                n.a = bsmap.utils.lerp(bsmap.utils.normalize(n.b, 33, 33.75), 45, 0);
            }
            if (n.b >= 98 + j * 4 && n.b <= 101 + j * 4) {
                if (n.c === j % 2) {
                    n.a =
                        bsmap.utils.lerp(
                            bsmap.utils.normalize(n.b, 98.25 + j * 4, 100.5 + j * 4),
                            -45,
                            45
                        ) * (j % 2 ? 1 : -1);
                }
            }
            if (n.b >= 101 + j * 4) {
                j++;
            }
        }
        if (n.cd?._color) {
            if (n.cd._color[0] === 0) {
                if (possibleBurst[n.c].length) {
                    d.data.colorNotes.splice(i, 1);
                    i--;
                    len--;
                }
                possibleBurst[n.c].push(n);
            }
            if (n.cd._color[0] === 1) {
                if (prevSlider[n.c]) {
                    d.data.sliders.push({
                        b: prevSlider[n.c].b,
                        c: prevSlider[n.c].c,
                        x: prevSlider[n.c].x,
                        y: prevSlider[n.c].y,
                        d: prevSlider[n.c].d,
                        mu: prevSlider[n.c].cd!._disableSpawnEffect
                            ? 0
                            : prevSlider[n.c].cd!._color[2],
                        tb: n.b,
                        tx: n.x,
                        ty: n.y,
                        tc: prevSlider[n.c].cd!._disableSpawnEffect
                            ? prevSlider[n.c].d
                            : n.d,
                        tmu: prevSlider[n.c].cd!._disableSpawnEffect
                            ? 0
                            : prevSlider[n.c].cd!._color[3],
                        m: prevSlider[n.c].cd!._color[1],
                    });
                }
                delete prevSlider[n.c];
                if (n.cd._color[3] !== 0) {
                    prevSlider[n.c] = n;
                } else {
                    if (n.cd._color[2] !== 0) {
                        let x = n.x;
                        let y = n.y;
                        while (x >= 0 && x <= 3 && y >= 0 && y <= 2) {
                            x += bsmap.v3.colorNote.cutDirectionSpace[n.d][0];
                            y += bsmap.v3.colorNote.cutDirectionSpace[n.d][1];
                        }
                        x = bsmap.utils.clamp(x, 0, 3);
                        y = bsmap.utils.clamp(y, 0, 2);
                        d.data.sliders.push({
                            b: n.b,
                            c: n.c,
                            x: n.x,
                            y: n.y,
                            d: n.d,
                            mu: 0.5,
                            tb: n.b + n.cd._color[2],
                            tx: x,
                            ty: y,
                            tc: n.d,
                            tmu: 0,
                            m: 0,
                        });
                    }
                    if (n.cd!._disableSpawnEffect) {
                        d.data.colorNotes.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        }
        if (possibleBurst[n.c].length === 2) {
            d.data.burstSliders.push({
                b: possibleBurst[n.c][0].b,
                c: possibleBurst[n.c][0].c,
                x: possibleBurst[n.c][0].x,
                y: possibleBurst[n.c][0].y,
                d: possibleBurst[n.c][0].d,
                tb: possibleBurst[n.c][1].b,
                tx: possibleBurst[n.c][1].x,
                ty: possibleBurst[n.c][1].y,
                sc: possibleBurst[n.c][0].cd!._color[1],
                s: possibleBurst[n.c][0].cd!._color[2]
                    ? possibleBurst[n.c][0].cd!._color[2]
                    : 1,
            });
            possibleBurst[n.c] = [];
        }
    }
    if (possibleBurst[0].length || possibleBurst[1].length) {
        throw Error('what the fuck');
    }
    for (let i = 0; i < 8; i++) {
        if (i % 4 > 1) {
            d.data.obstacles.push(
                {
                    b: 2 + i * 4,
                    x: 0,
                    y: 0,
                    d: 1.5,
                    w: 1,
                    h: 1,
                },
                {
                    b: 3 + i * 4,
                    x: -3,
                    y: 1,
                    d: 1.5,
                    w: 2,
                    h: 1,
                },
                {
                    b: 2.5 + i * 4,
                    x: -1,
                    y: 2,
                    d: 1.5,
                    w: 1,
                    h: 1,
                },
                {
                    b: 2 + i * 4,
                    x: 3,
                    y: 0,
                    d: 1.5,
                    w: 1,
                    h: 1,
                },
                {
                    b: 3 + i * 4,
                    x: 6,
                    y: 1,
                    d: 1.5,
                    w: 2,
                    h: 1,
                },
                {
                    b: 2.5 + i * 4,
                    x: 4,
                    y: 2,
                    d: 1.5,
                    w: 1,
                    h: 1,
                }
            );
        } else {
            d.data.obstacles.push(
                {
                    b: 2 + i * 4,
                    x: -1,
                    y: 0,
                    d: 1.5,
                    w: 1,
                    h: 1,
                },
                {
                    b: 3 + i * 4,
                    x: -3,
                    y: 1,
                    d: 1.5,
                    w: 2,
                    h: 1,
                },
                {
                    b: 2.5 + i * 4,
                    x: 0,
                    y: 2,
                    d: 1.5,
                    w: 1,
                    h: 1,
                },
                {
                    b: 2 + i * 4,
                    x: 4,
                    y: 0,
                    d: 1.5,
                    w: 1,
                    h: 1,
                },
                {
                    b: 3 + i * 4,
                    x: 6,
                    y: 1,
                    d: 1.5,
                    w: 2,
                    h: 1,
                },
                {
                    b: 2.5 + i * 4,
                    x: 3,
                    y: 2,
                    d: 1.5,
                    w: 1,
                    h: 1,
                }
            );
        }
    }

    for (let i = 0; i < 3; i++) {
        d.data.obstacles.push(
            {
                b: 28 + i * 2,
                x: -4 + i,
                y: 0,
                d: 2.5 - i * 0.25,
                w: 1,
                h: 5,
            },
            {
                b: 28 + i * 2,
                x: 7 - i,
                y: 0,
                d: 2.5 - i * 0.25,
                w: 1,
                h: 5,
            }
        );
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
            d.data.obstacles.push(
                {
                    b: 37 + i * 16 + j * 4,
                    x: -2 + j,
                    y: 1 - j,
                    d: 1,
                    w: 1,
                    h: 3 + j * 2,
                },
                {
                    b: 37 + i * 16 + j * 4,
                    x: 5 - j,
                    y: 1 - j,
                    d: 1,
                    w: 1,
                    h: 3 + j * 2,
                }
            );
        }
    }
});

bsmap.save.difficultyListSync(difficultyList, {
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/Undefined/',
});

console.timeEnd('Runtime');
