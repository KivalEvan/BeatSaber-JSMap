import * as bsmap from '../deno/mod.ts';

/**
 * Convert chroma note to arc and chain.
 * Scuffed but works
 */
export default (d: bsmap.v3.DifficultyData) => {
    const prevSlider: {
        [key: number]: bsmap.v3.ColorNote;
    } = {};
    const possibleBurst: {
        [key: number]: bsmap.v3.ColorNote[];
    } = { 0: [], 1: [] };
    for (let i = 0, len = d.colorNotes.length; i < len; i++) {
        const n = d.colorNotes[i];
        if (n.direction === 8) {
            n.angleOffset = 45;
        }
        if (n.customData?._color) {
            if (n.customData._color[0] === 0) {
                if (possibleBurst[n.color].length) {
                    d.colorNotes.splice(i, 1);
                    i--;
                    len--;
                }
                possibleBurst[n.color].push(n);
            }
            if (n.customData._color[0] === 1) {
                if (prevSlider[n.color]) {
                    d.addSliders({
                        b: prevSlider[n.color].time,
                        c: prevSlider[n.color].color,
                        x: prevSlider[n.color].posX,
                        y: prevSlider[n.color].posY,
                        d: prevSlider[n.color].direction,
                        mu: prevSlider[n.color].customData!._disableSpawnEffect
                            ? 0
                            : prevSlider[n.color].customData!._color![2],
                        tb: n.time,
                        tx: n.posX,
                        ty: n.posY,
                        tc: prevSlider[n.color].customData!._disableSpawnEffect
                            ? prevSlider[n.color].direction
                            : n.direction,
                        tmu: prevSlider[n.color].customData!._disableSpawnEffect
                            ? 0
                            : prevSlider[n.color].customData!._color![3],
                        m: prevSlider[n.color].customData!._color![1] as 0,
                    });
                }
                delete prevSlider[n.color];
                if (n.customData._color[3] !== 0) {
                    prevSlider[n.color] = n;
                } else {
                    if (n.customData._color[2] !== 0) {
                        let x = n.posX;
                        let y = n.posY;
                        while (x >= 0 && x <= 3 && y >= 0 && y <= 2) {
                            x += bsmap.NoteCutDirectionSpace[n.direction][0];
                            y += bsmap.NoteCutDirectionSpace[n.direction][1];
                        }
                        x = bsmap.utils.clamp(x, 0, 3);
                        y = bsmap.utils.clamp(y, 0, 2);
                        d.addSliders({
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
                        });
                    }
                    if (n.customData!._disableSpawnEffect) {
                        d.colorNotes.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        }
        if (possibleBurst[n.color].length === 2) {
            d.addBurstSliders({
                b: possibleBurst[n.color][0].time,
                c: possibleBurst[n.color][0].color,
                x: possibleBurst[n.color][0].posX,
                y: possibleBurst[n.color][0].posY,
                d: possibleBurst[n.color][0].direction,
                tb: possibleBurst[n.color][1].time,
                tx: possibleBurst[n.color][1].posX,
                ty: possibleBurst[n.color][1].posY,
                sc: possibleBurst[n.color][0].customData!._color![1],
                s: possibleBurst[n.color][0].customData!._color![2]
                    ? possibleBurst[n.color][0].customData!._color![2]
                    : 1,
            });
            possibleBurst[n.color] = [];
        }
    }
    if (possibleBurst[0].length || possibleBurst[1].length) {
        throw Error('what the fuck');
    }
};
