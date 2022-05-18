import * as bsmap from '../../deno/mod.ts';
import walls from './walls.ts';
import lights from './lights.ts';

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
        [key: number]: bsmap.v3.ColorNote;
    } = {};
    const possibleBurst: {
        [key: number]: bsmap.v3.ColorNote[];
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
                            d.difficulty === 'Expert' ? -30 : -45,
                            d.difficulty === 'Expert' ? 30 : 45
                        ) * (j % 2 ? 1 : -1);
                }
            }
            if (n.time >= 101 + j * 4) {
                j++;
            }
        }
        if (n.customData?.color) {
            if (n.customData.color[0] === 0) {
                if (possibleBurst[n.color].length) {
                    d.data.colorNotes.splice(i, 1);
                    i--;
                    len--;
                }
                possibleBurst[n.color].push(n);
            }
            if (n.customData.color[0] === 1) {
                if (prevSlider[n.color]) {
                    d.data.addSliders({
                        b: prevSlider[n.color].time,
                        c: prevSlider[n.color].color,
                        x: prevSlider[n.color].posX,
                        y: prevSlider[n.color].posY,
                        d: prevSlider[n.color].direction,
                        mu: !prevSlider[n.color].customData!.spawnEffect
                            ? 0
                            : prevSlider[n.color].customData!.color![2],
                        tb: n.time,
                        tx: n.posX,
                        ty: n.posY,
                        tc: !prevSlider[n.color].customData!.spawnEffect
                            ? prevSlider[n.color].direction
                            : n.direction,
                        tmu: !prevSlider[n.color].customData!.spawnEffect
                            ? 0
                            : prevSlider[n.color].customData!.color![3],
                        m: prevSlider[n.color].customData!.color![1] as 0,
                    });
                }
                delete prevSlider[n.color];
                if (n.customData.color[3] !== 0) {
                    prevSlider[n.color] = n;
                } else {
                    if (n.customData.color[2] !== 0) {
                        let x = n.posX;
                        let y = n.posY;
                        while (x >= 0 && x <= 3 && y >= 0 && y <= 2) {
                            x += bsmap.NoteCutDirectionSpace[n.direction][0];
                            y += bsmap.NoteCutDirectionSpace[n.direction][1];
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
                                tb: n.time + n.customData.color[2],
                                tx: x,
                                ty: y,
                                tc: n.direction,
                                tmu: 0,
                                m: 0,
                            })
                        );
                    }
                    if (!n.customData!.spawnEffect) {
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
                sc: possibleBurst[n.color][0].customData!.color![1],
                s: possibleBurst[n.color][0].customData!.color![2]
                    ? possibleBurst[n.color][0].customData!.color![2]
                    : 1,
            });
            possibleBurst[n.color] = [];
        }
    }
    walls(d.data);
    lights(d.data);
});

bsmap.save.difficultyListSync(difficultyList, {
    path: 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels/Undefined/',
});

console.timeEnd('Runtime');
