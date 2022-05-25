import * as bsmap from '../../deno/mod.ts';

export default (d: bsmap.v3.DifficultyData) => {
    //#region intro
    d.addColorBoostBeatmapEvents({ b: 0, o: true });
    for (let i = 0; i < 8; i++) {
        const e: Partial<bsmap.types.v3.ILightColorBase>[] = [
            {
                b: 0,
                c: 2,
                s: 1,
            },
            {
                b: 0.0625,
                c: 1,
                s: 0,
                f: 12,
            },
            {
                b: 0.5,
                i: 1,
                c: 0,
                s: 0.75,
            },
            {
                b: 2,
                i: 1,
                c: 0,
                s: 1.25,
            },
            {
                b: 2.5,
                i: 0,
                c: 1,
                s: 1.5,
            },
            {
                b: 2.5625,
                i: 0,
                c: 1,
                s: 0.375,
            },
            {
                b: 2.75,
                i: 1,
                c: 1,
                s: 0,
            },
        ];
        d.addLightColorEventBoxGroups(
            {
                b: 2 + i * 4,
                g: i % 4 === 1 ? 4 + Math.floor(i / 4) * 2 : 6 - Math.floor(i / 4) * 2,
                e: [
                    {
                        w: 3,
                        e,
                    },
                ],
            },
            {
                b: 2 + i * 4,
                g: i % 4 === 1 ? 5 + Math.floor(i / 4) * 2 : 7 - Math.floor(i / 4) * 2,
                e: [
                    {
                        w: 3,
                        e,
                    },
                ],
            }
        );
        d.addLightRotationEventBoxGroups(
            {
                b: 2 + i * 4,
                g: i % 4 === 1 ? 4 + Math.floor(i / 4) * 2 : 6 - Math.floor(i / 4) * 2,
                e: [
                    {
                        s: i % 4 > 1 ? 20 : 30,
                        w: 3.25,
                        l: [
                            {
                                e: -1,
                                r: i % 4 > 1 ? 105 : 180,
                            },
                            {
                                b: 3,
                                e: 2,
                                r: i % 4 > 1 ? 90 : 210,
                            },
                        ],
                    },
                ],
            },
            {
                b: 2 + i * 4,
                g: i % 4 === 1 ? 5 + Math.floor(i / 4) * 2 : 7 - Math.floor(i / 4) * 2,
                e: [
                    {
                        s: i % 4 > 1 ? 20 : 30,
                        w: 3.25,
                        l: [
                            {
                                e: -1,
                                r: i % 4 > 1 ? 105 : 180,
                            },
                            {
                                b: 3,
                                e: 2,
                                r: i % 4 > 1 ? 90 : 210,
                            },
                        ],
                    },
                ],
            }
        );
    }
    d.addLightColorEventBoxGroups(
        {
            b: 30,
            g: 0,
            e: [
                {
                    f: { f: 2, p: 0, t: 2 },
                    w: 1,
                    e: [
                        {
                            c: 2,
                            s: 0,
                            f: 5,
                        },
                        {
                            c: 2,
                            i: 1,
                            b: 3,
                            f: 10,
                        },
                    ],
                },
            ],
        },
        {
            b: 30,
            g: 1,
            e: [
                {
                    f: { f: 2, p: 0, t: 2 },
                    w: 1,
                    e: [
                        {
                            c: 2,
                            s: 0,
                            f: 5,
                        },
                        {
                            c: 2,
                            i: 1,
                            b: 3,
                            f: 10,
                        },
                    ],
                },
            ],
        },
        { b: 34, g: 0, e: [{ e: [{ s: 0 }] }] },
        { b: 34, g: 1, e: [{ e: [{ s: 0 }] }] }
    );
    d.addLightRotationEventBoxGroups(
        {
            b: 30,
            g: 0,
            e: [
                {
                    s: 15,
                    w: 1,
                    l: [
                        {
                            e: -1,
                            r: 180,
                        },
                        {
                            b: 4,
                            e: 3,
                            r: 210,
                        },
                    ],
                },
            ],
        },
        {
            b: 30,
            g: 1,
            e: [
                {
                    s: 15,
                    w: 1,
                    l: [
                        {
                            e: -1,
                            r: 180,
                        },
                        {
                            b: 4,
                            e: 3,
                            r: 210,
                        },
                    ],
                },
            ],
        }
    );
    for (let i = 0; i < 2; i++) {
        for (let t = 0; t < 4; t++) {
            d.addLightColorEventBoxGroups(
                {
                    b: 32 + i,
                    g: t > 1 ? 4 + t : 2 + t,
                    e: [
                        {
                            f: { r: i ? 0 : 1, f: 2, t: 2, p: 1 },
                            w: 0.375,
                            e: [
                                {
                                    b: 0,
                                    c: 2,
                                    s: i ? 1.25 : 0.75,
                                },
                                {
                                    b: 0.1875,
                                    c: 2,
                                    s: i ? 1.25 : 0.75,
                                },
                                {
                                    b: 0.25,
                                    i: 1,
                                    c: 2,
                                    s: 0,
                                },
                            ],
                        },
                    ],
                },
                {
                    b: 32.125 + i,
                    g: 8 + t,
                    e: [
                        {
                            f: {
                                p: 4,
                                t: i,
                            },
                            e: [
                                { b: 0, c: 2, s: 0 },
                                { b: 0.0625, i: 1, c: 2, s: 0.125 },
                                {
                                    b: 0.125,
                                    i: 1,
                                    c: 2,
                                    s: 1.5,
                                },
                                {
                                    b: 0.3125,
                                    c: 2,
                                    i: 1,
                                    s: 0.25,
                                },
                                {
                                    b: 0.375,
                                    c: 2,
                                    s: 0,
                                },
                            ],
                        },
                        {
                            f: {
                                p: 4,
                                t: 1 + i,
                            },
                            e: [
                                { b: 0 + 0.25, c: 2, s: 0 },
                                { b: 0.0625 + 0.25, i: 1, c: 2, s: 0.125 },
                                {
                                    b: 0.125 + 0.25,
                                    i: 1,
                                    c: 2,
                                    s: 1.5,
                                },
                                {
                                    b: 0.3125 + 0.25,
                                    c: 2,
                                    i: 1,
                                    s: 0.25,
                                },
                                {
                                    b: 0.375 + 0.25,
                                    c: 2,
                                    s: 0,
                                },
                            ],
                        },
                        {
                            f: {
                                p: 4,
                                t: 2 + i,
                            },
                            e: [
                                { b: 0 + 0.5, c: 2, s: 0 },
                                { b: 0.0625 + 0.5, i: 1, c: 2, s: 0.125 },
                                {
                                    b: 0.125 + 0.5,
                                    i: 1,
                                    c: 2,
                                    s: 1.5,
                                },
                                {
                                    b: 0.3125 + 0.5,
                                    c: 2,
                                    i: 1,
                                    s: 0.25,
                                },
                                {
                                    b: 0.375 + 0.5,
                                    c: 2,
                                    s: 0,
                                },
                            ],
                        },
                    ],
                }
            );
            d.addLightRotationEventBoxGroups(
                {
                    b: 32 + i,
                    g: 8 + t,
                    e: [
                        {
                            l: [
                                {
                                    e: -1,
                                    p: 0,
                                    r: -90 - 45 * i,
                                },
                            ],
                        },
                    ],
                },
                {
                    b: 32 + i,
                    g: t > 1 ? 4 + t : 2 + t,
                    e: [
                        {
                            f: { r: i ? 0 : 1, f: 2, t: 2, p: 1 },
                            l: [
                                {
                                    e: -1,
                                    p: 0,
                                    r: t > 1 ? 60 - i * 60 : 0 - i * 90,
                                },
                            ],
                        },
                    ],
                }
            );
        }
    }
    //#endregion
    //#region drop flashes
    for (let i = 0; i < 3; i++) {
        d.addLightColorEventBoxGroups(
            {
                b: 34 + i * 32,
                g: 2,
                e: [
                    {
                        f: { r: 1, f: 2, p: 0, t: 2 },
                        w: 2.625,
                        e: [
                            { c: 2, s: 2.5 },
                            { c: 2, b: 0.5, i: 1, s: 1 },
                            { i: 1, b: 2.5, s: 0 },
                        ],
                    },
                ],
            },
            {
                b: 34 + i * 32,
                g: 3,
                e: [
                    {
                        f: { r: 1, f: 2, p: 0, t: 2 },
                        w: 2.625,
                        e: [
                            { c: 2, s: 2.5 },
                            { c: 2, b: 0.5, i: 1, s: 1 },
                            { i: 1, b: 2.5, s: 0 },
                        ],
                    },
                ],
            },
            {
                b: 34 + i * 32,
                g: 8,
                e: [
                    {
                        f: { r: 1, f: 2, p: 0, t: 2 },
                        w: 2.625,
                        e: [
                            { c: 2, s: 2.5 },
                            { c: 2, b: 0.5, i: 1, s: 1 },
                            { i: 1, b: 2.5, s: 0 },
                        ],
                    },
                ],
            },
            {
                b: 34 + i * 32,
                g: 9,
                e: [
                    {
                        f: { r: 1, f: 2, p: 0, t: 2 },
                        w: 2.625,
                        e: [
                            { c: 2, s: 2.5 },
                            { c: 2, b: 0.5, i: 1, s: 1 },
                            { i: 1, b: 2.5, s: 0 },
                        ],
                    },
                ],
            }
        );
        d.addLightRotationEventBoxGroups(
            {
                b: 34 + i * 32,
                g: 2,
                e: [
                    {
                        f: { r: 1, f: 2, p: 0, t: 2 },
                        s: 22.5,
                        l: [
                            { e: -1, r: 270 },
                            { b: 2.5, e: 2, r: 225 + 22.5 },
                        ],
                    },
                ],
            },
            {
                b: 34 + i * 32,
                g: 3,
                e: [
                    {
                        f: { r: 1, f: 2, p: 0, t: 2 },
                        s: 22.5,
                        l: [
                            { e: -1, r: 270 },
                            { b: 2.5, e: 2, r: 225 + 22.5 },
                        ],
                    },
                ],
            },
            {
                b: 34 + i * 32,
                g: 8,
                e: [
                    {
                        f: { r: 1, f: 2, p: 0, t: 2 },
                        s: 22.5,
                        l: [
                            { e: -1, r: 180 },
                            { b: 2.5, e: 2, r: 135 + 22.5 },
                        ],
                    },
                ],
            },
            {
                b: 34 + i * 32,
                g: 9,
                e: [
                    {
                        f: { r: 1, f: 2, p: 0, t: 2 },
                        s: 22.5,
                        l: [
                            { e: -1, r: 180 },
                            { b: 2.5, e: 2, r: 135 + 22.5 },
                        ],
                    },
                ],
            }
        );
    }
    //#endregion
    //#region drum and kick
    for (let t = 34; t < 98; t++) {
        const fltr = { f: 1, p: 2, t: 1, r: 1 } as bsmap.types.v3.IIndexFilter;
        const fltrR = { f: 1, p: 2, t: 1, r: 0 } as bsmap.types.v3.IIndexFilter;
        const e = [
            { c: 2, s: t % 2 ? 1.25 : 1 },
            { b: 0.0625 + 0.03125, c: 2, s: t % 2 ? 1 : 0.75, i: 1 },
            { c: t % 2 ? 0 : 1, b: 0.125, s: 0.75 },
            { b: 0.25, i: 2 },
            { c: t % 2 ? 0 : 1, b: 0.3125 + 0.03125, s: 0.25, i: 1 },
            { c: t % 2 ? 0 : 1, b: 0.375, s: 0 },
        ] as Partial<bsmap.types.v3.ILightColorBase>[];
        const w = t % 2 ? 0.5 : 0.625;
        d.addLightColorEventBoxGroups(
            {
                b: t,
                g: t % 2 ? 14 : 12,
                e: [
                    { f: fltr, e, w },
                    { f: fltrR, e, w },
                ],
            },
            {
                b: t,
                g: t % 2 ? 15 : 13,
                e: [
                    { f: fltr, e, w },
                    { f: fltrR, e, w },
                ],
            }
        );
    }
    for (let t = 98; t < 128; t++) {
        const fltr = {
            f: 1,
            p: t % 2 ? 2 : 8,
            t: t % 2 ? 1 : 4 - ((t - 98) % 16 > 7 ? 2 : 0),
            r: 1,
        } as bsmap.types.v3.IIndexFilter;
        const fltrR = {
            f: 1,
            p: t % 2 ? 2 : 8,
            t: t % 2 ? 1 : 4 - ((t - 98) % 16 > 7 ? 2 : 0),
            r: 0,
        } as bsmap.types.v3.IIndexFilter;
        const e = [
            { c: 2, s: t % 2 ? 1.25 : 1 },
            { b: 0.0625 + 0.03125, c: 2, s: t % 2 ? 1 : 0.75, i: 1 },
            { c: t % 2 ? 0 : 1, b: 0.125, s: 0.75 },
            { b: 0.25, i: 2 },
            { c: t % 2 ? 0 : 1, b: 0.3125 + 0.03125, s: 0.25, i: 1 },
            { c: t % 2 ? 0 : 1, b: 0.375, s: 0 },
        ] as Partial<bsmap.types.v3.ILightColorBase>[];
        const w = t % 2 ? 0.5 : 0;
        d.addLightColorEventBoxGroups(
            {
                b: t,
                g: t % 4 > 1 ? 12 : 14,
                e: [
                    { f: fltr, e, w },
                    { f: fltrR, e, w },
                ],
            },
            {
                b: t,
                g: t % 4 > 1 ? 13 : 15,
                e: [
                    { f: fltr, e, w },
                    { f: fltrR, e, w },
                ],
            }
        );
    }
    {
        const fltr = {
            f: 1,
            p: 2,
            t: 1,
            r: 1,
        } as bsmap.types.v3.IIndexFilter;
        const fltrR = {
            f: 1,
            p: 2,
            t: 1,
            r: 0,
        } as bsmap.types.v3.IIndexFilter;
        d.addLightRotationEventBoxGroups(
            {
                b: 98,
                g: 12,
                e: [
                    {
                        s: 15,
                        f: fltr,
                        a: 1,
                        l: [
                            { e: -1, r: 90 },
                            { b: 16, e: 1, r: 180 },
                            { b: 32, e: 2, r: 90 },
                        ],
                    },
                    {
                        s: -15,
                        f: fltrR,
                        a: 1,
                        l: [
                            { e: -1, r: 90 },
                            { b: 16, e: 1, r: 0 },
                            { b: 32, e: 2, r: 90 },
                        ],
                    },
                    {
                        s: -30,
                        f: fltr,
                        l: [{ p: 1 }, { b: 16, r: 90, e: 1 }, { b: 32, r: 180, e: 2 }],
                    },
                    {
                        s: -30,
                        r: 1,
                        f: fltrR,
                        l: [{ p: 1 }, { b: 16, r: 90, e: 1 }, { b: 32, r: 180, e: 2 }],
                    },
                ],
            },
            {
                b: 98,
                g: 13,
                e: [
                    {
                        s: 15,
                        f: fltr,
                        a: 1,
                        l: [
                            { e: -1, r: 90 },
                            { b: 16, e: 1, r: 180 },
                            { b: 32, e: 2, r: 90 },
                        ],
                    },
                    {
                        s: -15,
                        f: fltrR,
                        a: 1,
                        l: [
                            { e: -1, r: 90 },
                            { b: 16, e: 1, r: 0 },
                            { b: 32, e: 2, r: 90 },
                        ],
                    },
                    {
                        s: -30,
                        f: fltr,
                        l: [{ p: 1 }, { b: 16, r: 90, e: 1 }, { b: 32, r: 180, e: 2 }],
                    },
                    {
                        s: -30,
                        r: 1,
                        f: fltrR,
                        l: [{ p: 1 }, { b: 16, r: 90, e: 1 }, { b: 32, r: 180, e: 2 }],
                    },
                ],
            },
            {
                b: 98,
                g: 14,
                e: [
                    {
                        s: 15,
                        f: fltr,
                        a: 1,
                        l: [
                            { e: -1, r: 90 },
                            { b: 16, e: 1, r: 180 },
                            { b: 32, e: 2, r: 90 },
                        ],
                    },
                    {
                        s: -15,
                        f: fltrR,
                        a: 1,
                        l: [
                            { e: -1, r: 90 },
                            { b: 16, e: 1, r: 0 },
                            { b: 32, e: 2, r: 90 },
                        ],
                    },
                    {
                        s: -30,
                        f: fltr,
                        l: [{ p: 1 }, { b: 16, r: 90, e: 1 }, { b: 32, r: 180, e: 2 }],
                    },
                    {
                        s: -30,
                        r: 1,
                        f: fltrR,
                        l: [{ p: 1 }, { b: 16, r: 90, e: 1 }, { b: 32, r: 180, e: 2 }],
                    },
                ],
            },
            {
                b: 98,
                g: 15,
                e: [
                    {
                        s: 15,
                        f: fltr,
                        a: 1,
                        l: [
                            { e: -1, r: 90 },
                            { b: 16, e: 1, r: 180 },
                            { b: 32, e: 2, r: 90 },
                        ],
                    },
                    {
                        s: -15,
                        f: fltrR,
                        a: 1,
                        l: [
                            { e: -1, r: 90 },
                            { b: 16, e: 1, r: 0 },
                            { b: 32, e: 2, r: 90 },
                        ],
                    },
                    {
                        s: -30,
                        f: fltr,
                        l: [{ p: 1 }, { b: 16, r: 90, e: 1 }, { b: 32, r: 180, e: 2 }],
                    },
                    {
                        s: -30,
                        r: 1,
                        f: fltrR,
                        l: [{ p: 1 }, { b: 16, r: 90, e: 1 }, { b: 32, r: 180, e: 2 }],
                    },
                ],
            }
        );
    }
    //#endregion
    for (let j = 0; j < 16; j++) {
        const time = 34 + j * 4;
        d.addColorBoostBeatmapEvents({ b: time, o: false }, { b: time + 3, o: true });
        for (let i = 0; i < 6; i++) {
            const t = [0.25, 0.5, 0.75, 1.25, 1.5, 1.75];
            const td = t.map((n) => 3 - n);
            const g = [5, 1, 11, 4, 0, 10];
            const r = [135, 75, 195, 135, 75, 195];
            const rEnd = [-15, -15, -30, -15, -15, -30];
            const e = [
                { c: 2 },
                { c: 2, b: 0.125 },
                { b: 0.1875, i: 1 },
                { b: 0.375, c: 1, i: 1, s: 0.75 },
            ] as Partial<bsmap.types.v3.ILightColorBase>[];
            d.addLightColorEventBoxGroups({
                b: time + t[i],
                g: g[i],
                e: [{ e, w: 0.5 }],
            });
            d.addLightRotationEventBoxGroups({
                b: time + t[i],
                g: g[i],
                e: [
                    {
                        s: 60,
                        l: [
                            { r: r[i], e: -1 },
                            { b: td[i], r: r[i] + rEnd[i], e: 2 },
                        ],
                        w: 0.5,
                        r: 1,
                    },
                ],
            });
        }
        d.addLightColorEventBoxGroups(
            {
                b: time + 2.25,
                g: 0,
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            },
            {
                b: time + 2.25,
                g: 1,
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            },
            {
                b: time + 2.5,
                g: 4,
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            },
            {
                b: time + 2.5,
                g: 5,
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            },
            {
                b: time + 2.5,
                g: 10,
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            },
            {
                b: time + 2.5,
                g: 11,
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            }
        );
    }
    //#region outro
    const outroG: number[][] = [
        [5, 1, 11, 4, 0, 10],
        [9, 3, 5, 8, 2, 4],
        [6, 9, 4, 7, 8, 5],
        [7, 2, 9, 6, 3, 8],
        [4, 0, 10, 5, 1, 11],
        [8, 2, 4, 9, 3, 5],
        [7, 8, 5, 6, 9, 4],
        [1, 3, 11, 0, 2, 10],
    ];
    d.addColorBoostBeatmapEvents({ b: 98, o: false });
    for (let j = 0; j < 8; j++) {
        const time = 98 + j * 4;
        const t = [0.25, 0.5, 0.75, 1.25, 1.5, 1.75];
        const g = outroG[j];
        for (let i = 0; i < 6; i++) {
            const e = [
                { c: 2 },
                { c: 2, b: 0.125 },
                { b: 0.1875, i: 1 },
                { b: 0.375, c: 1, i: 1, s: 0.75 },
            ] as Partial<bsmap.types.v3.ILightColorBase>[];
            d.addLightColorEventBoxGroups({
                b: time + t[i],
                g: g[i],
                e: [{ e, w: 0.5 }],
            });
            d.addLightRotationEventBoxGroups({
                b: time + t[i],
                g: g[i],
                e: [
                    { a: 1, l: [{ r: 90, e: -1 }] },
                    { f: { f: 2, p: 0, t: 2 }, l: [{ r: 270, e: -1 }] },
                    { f: { f: 2, p: 1, t: 2 }, l: [{ r: 90, e: -1 }] },
                ],
            });
        }
        if (j === 7) {
            d.addLightColorEventBoxGroups(
                {
                    b: time + 2,
                    g: g[0],
                    e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
                },
                {
                    b: time + 2,
                    g: g[3],
                    e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
                },
                {
                    b: time + 2.25,
                    g: g[1],
                    e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
                },
                {
                    b: time + 2.25,
                    g: g[4],
                    e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
                },
                {
                    b: time + 2.5,
                    g: g[2],
                    e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
                },
                {
                    b: time + 2.5,
                    g: g[5],
                    e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
                }
            );
            continue;
        }
        d.addLightColorEventBoxGroups(
            {
                b: time + 2.25,
                g: g[1],
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            },
            {
                b: time + 2.25,
                g: g[4],
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            },
            {
                b: time + 2.5,
                g: g[0],
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            },
            {
                b: time + 2.5,
                g: g[2],
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            },
            {
                b: time + 2.5,
                g: g[3],
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            },
            {
                b: time + 2.5,
                g: g[5],
                e: [{ e: [{ c: 2 }, { b: 0.0625, s: 0 }], w: 0.25 }],
            }
        );
    }
    //#endregion
};
