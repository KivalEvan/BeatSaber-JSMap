import * as bsmap from '../../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Endless Night/';

const info = bsmap.load.infoSync();
const difficultyList = bsmap.load.difficultyFromInfoSync(info);

difficultyList.forEach((d) => {
    if (!bsmap.version.isV3(d.data)) {
        d.data = bsmap.convert.V2toV3(d.data, true);
    }

    const prevSlider: {
        [key: number]: bsmap.v3.ColorNote;
    } = {};
    const possibleBurst: {
        [key: number]: bsmap.v3.ColorNote[];
    } = { 0: [], 1: [] };
    for (let i = 0, len = d.data.colorNotes.length; i < len; i++) {
        const n = d.data.colorNotes[i];
        if (n.direction === 8) {
            n.angleOffset = 45;
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
                    d.data.addSliders({
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
                        d.data.addSliders({
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
                        d.data.colorNotes.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        }
        if (possibleBurst[n.color].length === 2) {
            d.data.addBurstSliders({
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
            });
            possibleBurst[n.color] = [];
        }
    }
    if (possibleBurst[0].length || possibleBurst[1].length) {
        throw Error('what the fuck');
    }

    let isRight = true;
    let justOnce = true;
    const wallDuration = 0.125;
    for (const n of d.data.colorNotes) {
        if ((n.time >= 194 && n.time < 322) || (n.time >= 354 && n.time < 386)) {
            if (
                (n.time >= 197 && n.time < 198) ||
                (n.time >= 201 && n.time < 202) ||
                (n.time >= 206 && n.time < 210) ||
                (n.time >= 213 && n.time < 214) ||
                (n.time >= 217 && n.time < 218) ||
                (n.time >= 222 && n.time < 226) ||
                (n.time >= 229 && n.time < 230) ||
                (n.time >= 233 && n.time < 234) ||
                (n.time >= 238 && n.time < 242) ||
                (n.time >= 245 && n.time < 246) ||
                (n.time >= 249 && n.time < 250) ||
                (n.time >= 254 && n.time < 258) ||
                (n.time >= 197 + 64 && n.time < 198 + 64) ||
                (n.time >= 201 + 64 && n.time < 202 + 64) ||
                (n.time >= 206 + 64 && n.time < 210 + 64) ||
                (n.time >= 213 + 64 && n.time < 214 + 64) ||
                (n.time >= 217 + 64 && n.time < 218 + 64) ||
                (n.time >= 222 + 64 && n.time < 226 + 64) ||
                (n.time >= 229 + 64 && n.time < 230 + 64) ||
                (n.time >= 233 + 64 && n.time < 234 + 64) ||
                (n.time >= 238 + 64 && n.time < 242 + 64) ||
                (n.time >= 245 + 64 && n.time < 246 + 64) ||
                (n.time >= 249 + 64 && n.time < 250 + 64) ||
                (n.time >= 254 + 64 && n.time < 258 + 64) ||
                (n.time >= 197 + 160 && n.time < 198 + 160) ||
                (n.time >= 201 + 160 && n.time < 202 + 160) ||
                (n.time >= 206 + 160 && n.time < 210 + 160) ||
                (n.time >= 213 + 160 && n.time < 214 + 160) ||
                (n.time >= 217 + 160 && n.time < 218 + 160) ||
                (n.time >= 222 + 160 && n.time < 226 + 160)
            ) {
                d.data.addObstacles({
                    b: n.time,
                    d: wallDuration,
                    x: n.posX,
                    y: 0,
                    w: 1,
                    h: -1,
                });
                continue;
            }
            d.data.addBasicBeatmapEvents({ b: 4, et: 4, i: 4, f: 0.5 });
            if (
                justOnce &&
                (n.time === 198 ||
                    n.time === 202 ||
                    n.time === 198 + 16 ||
                    n.time === 202 + 16 ||
                    n.time === 198 + 32 ||
                    n.time === 202 + 32 ||
                    n.time === 198 + 48 ||
                    n.time === 202 + 48 ||
                    n.time === 198 + 64 ||
                    n.time === 202 + 64 ||
                    n.time === 198 + 64 + 16 ||
                    n.time === 202 + 64 + 16 ||
                    n.time === 198 + 64 + 32 ||
                    n.time === 202 + 64 + 32 ||
                    n.time === 198 + 64 + 48 ||
                    n.time === 202 + 64 + 48 ||
                    n.time === 198 + 64 + 64 ||
                    n.time === 202 + 64 + 64 ||
                    n.time === 198 + 160 ||
                    n.time === 202 + 160 ||
                    n.time === 198 + 160 + 16 ||
                    n.time === 202 + 160 + 16 ||
                    n.time === 198 ||
                    n.time === 202 ||
                    n.time === 210 ||
                    n.time === 226 ||
                    n.time === 242 ||
                    n.time === 258 ||
                    n.time === 210 + 64 ||
                    n.time === 226 + 64 ||
                    n.time === 242 + 64 ||
                    n.time === 258 + 64 ||
                    n.time === 210 + 160 ||
                    n.time === 226 + 160)
            ) {
                isRight = !isRight;
                justOnce = false;
            } else {
                justOnce = true;
            }
            d.data.addObstacles({
                b: n.time,
                d: wallDuration,
                x: (isRight ? 4 : -4) + n.posX,
                y: n.posY + 1,
                w: 1,
                h: 1,
            });
        }
    }
    // console.log(d.data.obstacles);
});

bsmap.save.difficultyListSync(difficultyList, {
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/Endless Night/',
});

console.timeEnd('Runtime');
