import * as bsmap from '../../deno/mod.ts';

export default (d: bsmap.v3.DifficultyData) => {
    for (let i = 0; i < 8; i++) {
        if (i % 4 > 1) {
            d.addObstacles(
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
                },
            );
        } else {
            d.addObstacles(
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
                },
            );
        }
    }
    for (let i = 0; i < 3; i++) {
        d.addObstacles(
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
            },
        );
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
            d.addObstacles(
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
                },
            );
        }
    }
};
