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

    d.data.basicBeatmapEvents = [];

    const prevSlider: {
        [key: number]: bsmap.types.v3.ColorNote;
    } = {};
    const possibleBurst: {
        [key: number]: bsmap.types.v3.ColorNote[];
    } = { 0: [], 1: [] };
    for (let i = 0, j = 0, len = d.data.colorNotes.length; i < len; i++) {
        const n = d.data.colorNotes[i];
        if (n.direction === 8) {
            n.angleOffset = 45;
        }
        if (d.difficulty === 'ExpertPlus' || d.difficulty === 'Expert') {
            if (n.color === 1 && n.time >= 32 && n.time < 32.75) {
                n.angleOffset = bsmap.utils.lerp(
                    bsmap.utils.normalize(n.time, 32, 32.75),
                    -45,
                    0
                );
            }
            if (n.color === 0 && n.time >= 33 && n.time < 33.75) {
                n.angleOffset = bsmap.utils.lerp(
                    bsmap.utils.normalize(n.time, 33, 33.75),
                    45,
                    0
                );
            }
            if (n.time >= 98 + j * 4 && n.time <= 101 + j * 4) {
                if (n.color === (d.difficulty === 'Expert' ? j + 1 : j) % 2) {
                    n.angleOffset =
                        bsmap.utils.lerp(
                            bsmap.utils.normalize(n.time, 98.25 + j * 4, 100.5 + j * 4),
                            -45,
                            45
                        ) * (j % 2 ? 1 : -1);
                }
            }
            if (n.time >= 101 + j * 4) {
                j++;
            }
        }
        if (n.customData?._color) {
            if (n.customData._color[0] === 0) {
                if (possibleBurst[n.color].length) {
                    d.data.colorNotes.splice(i, 1);
                    i--;
                    len--;
                }
                possibleBurst[n.color].push(n);
            }
            if (n.customData._color[0] === 1) {
                if (prevSlider[n.color]) {
                    d.data.sliders.push(
                        bsmap.v3.Slider.create({
                            b: prevSlider[n.color].time,
                            c: prevSlider[n.color].color,
                            x: prevSlider[n.color].posX,
                            y: prevSlider[n.color].posY,
                            d: prevSlider[n.color].direction,
                            mu: prevSlider[n.color].customData!._disableSpawnEffect
                                ? 0
                                : prevSlider[n.color].customData!._color[2],
                            tb: n.time,
                            tx: n.posX,
                            ty: n.posY,
                            tc: prevSlider[n.color].customData!._disableSpawnEffect
                                ? prevSlider[n.color].direction
                                : n.direction,
                            tmu: prevSlider[n.color].customData!._disableSpawnEffect
                                ? 0
                                : prevSlider[n.color].customData!._color[3],
                            m: prevSlider[n.color].customData!._color[1],
                        })
                    );
                }
                delete prevSlider[n.color];
                if (n.customData._color[3] !== 0) {
                    prevSlider[n.color] = n;
                } else {
                    if (n.customData._color[2] !== 0) {
                        let x = n.posX;
                        let y = n.posY;
                        while (x >= 0 && x <= 3 && y >= 0 && y <= 2) {
                            x += bsmap.v3.NoteCutDirectionSpace[n.direction][0];
                            y += bsmap.v3.NoteCutDirectionSpace[n.direction][1];
                        }
                        x = bsmap.utils.clamp(x, 0, 3);
                        y = bsmap.utils.clamp(y, 0, 2);
                        d.data.sliders.push(
                            bsmap.v3.Slider.create({
                                b: n.time,
                                c: n.color,
                                x: n.posX,
                                y: n.posY,
                                d: n.direction,
                                mu: 0.5,
                                tb: n.time + n.customData._color[2],
                                tx: x,
                                ty: y,
                                tc: n.direction,
                                tmu: 0,
                                m: 0,
                            })
                        );
                    }
                    if (n.customData!._disableSpawnEffect) {
                        d.data.colorNotes.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        }
        if (possibleBurst[n.color].length === 2) {
            d.data.burstSliders.push(
                bsmap.v3.BurstSlider.create({
                    b: possibleBurst[n.color][0].time,
                    c: possibleBurst[n.color][0].color,
                    x: possibleBurst[n.color][0].posX,
                    y: possibleBurst[n.color][0].posY,
                    d: possibleBurst[n.color][0].direction,
                    tb: possibleBurst[n.color][1].time,
                    tx: possibleBurst[n.color][1].posX,
                    ty: possibleBurst[n.color][1].posY,
                    sc: possibleBurst[n.color][0].customData!._color[1],
                    s: possibleBurst[n.color][0].customData!._color[2]
                        ? possibleBurst[n.color][0].customData!._color[2]
                        : 1,
                })
            );
            possibleBurst[n.color] = [];
        }
    }
    if (possibleBurst[0].length || possibleBurst[1].length) {
        throw Error('what the fuck');
    }
    for (let i = 0; i < 8; i++) {
        if (i % 4 > 1) {
            d.data.obstacles.push(
                ...bsmap.v3.Obstacle.create(
                    {
                        b: 2 + i * 4,
                        x: 0,
                        y: 0,
                        d: 1.5,
                        w: 1,
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
                        b: 2.75 + i * 4,
                        x: -4,
                        y: 2,
                        d: 1.5,
                        w: 1,
                        h: 2,
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
                        b: 2 + i * 4,
                        x: 3,
                        y: 0,
                        d: 1.5,
                        w: 1,
                        h: 1,
                    },
                    {
                        b: 2.75 + i * 4,
                        x: 8,
                        y: 2,
                        d: 1.5,
                        w: 1,
                        h: 2,
                    },
                    {
                        b: 2.5 + i * 4,
                        x: 4,
                        y: 2,
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
                    }
                )
            );
        } else {
            d.data.obstacles.push(
                ...bsmap.v3.Obstacle.create(
                    {
                        b: 2 + i * 4,
                        x: -1,
                        y: 0,
                        d: 1.5,
                        w: 1,
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
                        b: 2.75 + i * 4,
                        x: -6,
                        y: 1,
                        d: 1.5,
                        w: 2,
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
                        b: 2 + i * 4,
                        x: 4,
                        y: 0,
                        d: 1.5,
                        w: 1,
                        h: 1,
                    },
                    {
                        b: 2.5 + i * 4,
                        x: 3,
                        y: 2,
                        d: 1.5,
                        w: 1,
                        h: 1,
                    },
                    {
                        b: 2.75 + i * 4,
                        x: 7,
                        y: 1,
                        d: 1.5,
                        w: 2,
                        h: 1,
                    },
                    {
                        b: 3 + i * 4,
                        x: 6,
                        y: 1,
                        d: 1.5,
                        w: 2,
                        h: 1,
                    }
                )
            );
        }
        d.data.lightColorEventBoxGroups.push(
            ...bsmap.v3.LightColorEventBoxGroup.create(
                {
                    b: 2 + i * 4,
                    g: 4,
                    e: [
                        {
                            f: {
                                f: 2,
                                p: 1,
                                t: 1,
                                r: 0,
                            },
                            w: 3,
                            d: 1,
                            r: 0,
                            t: 2,
                            e: [
                                {
                                    b: 0,
                                    i: 1,
                                    c: 0,
                                    s: 0,
                                    f: 0,
                                },
                                {
                                    b: 0.5,
                                    i: 1,
                                    c: 1,
                                    s: 1,
                                    f: 0,
                                },
                                {
                                    b: 2,
                                    i: 1,
                                    c: 1,
                                    s: 1.25,
                                    f: 0,
                                },
                                {
                                    b: 2.5,
                                    i: 1,
                                    c: 0,
                                    s: 0,
                                    f: 0,
                                },
                            ],
                            b: 0,
                        },
                    ],
                },
                {
                    b: 2 + i * 4,
                    g: 5,
                    e: [
                        {
                            f: {
                                f: 2,
                                p: 1,
                                t: 1,
                                r: 0,
                            },
                            w: 3,
                            d: 1,
                            r: 0,
                            t: 2,
                            e: [
                                {
                                    b: 0,
                                    i: 1,
                                    c: 0,
                                    s: 0,
                                    f: 0,
                                },
                                {
                                    b: 0.5,
                                    i: 1,
                                    c: 1,
                                    s: 1,
                                    f: 0,
                                },
                                {
                                    b: 2,
                                    i: 1,
                                    c: 1,
                                    s: 1.25,
                                    f: 0,
                                },
                                {
                                    b: 2.5,
                                    i: 1,
                                    c: 0,
                                    s: 0,
                                    f: 0,
                                },
                            ],
                            b: 0,
                        },
                    ],
                }
            )
        );
    }

    d.data.lightRotationEventBoxGroups.push(
        ...bsmap.v3.LightRotationEventBoxGroup.create(
            {
                b: 2,
                g: 4,
                e: [
                    {
                        f: {
                            f: 2,
                            p: 1,
                            t: 1,
                            r: 0,
                        },
                        w: 0,
                        d: 1,
                        s: -5,
                        t: 2,
                        a: 0,
                        l: [
                            {
                                b: 0,
                                p: 0,
                                e: 0,
                                l: 0,
                                r: 100,
                                o: 1,
                            },
                        ],
                        r: 0,
                        b: 1,
                    },
                ],
            },
            {
                b: 2,
                g: 5,
                e: [
                    {
                        f: {
                            f: 2,
                            p: 1,
                            t: 1,
                            r: 0,
                        },
                        w: 0,
                        d: 1,
                        s: -5,
                        t: 2,
                        a: 0,
                        l: [
                            {
                                b: 0,
                                p: 0,
                                e: 0,
                                l: 0,
                                r: 100,
                                o: 1,
                            },
                        ],
                        r: 0,
                        b: 1,
                    },
                ],
            }
        )
    );
    for (let i = 0; i < 3; i++) {
        d.data.obstacles.push(
            ...bsmap.v3.Obstacle.create(
                {
                    b: 28 + i * 2,
                    x: -4 + i,
                    y: 0 + i,
                    d: 2.5 - i * 0.25,
                    w: 1,
                    h: 5 - i,
                },
                {
                    b: 28 + i * 2,
                    x: 7 - i,
                    y: 0 + i,
                    d: 2.5 - i * 0.25,
                    w: 1,
                    h: 5 - i,
                }
            )
        );
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
            d.data.obstacles.push(
                ...bsmap.v3.Obstacle.create(
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
                )
            );
        }
    }
});

bsmap.save.difficultyListSync(difficultyList, {
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/Undefined/',
});

console.timeEnd('Runtime');
