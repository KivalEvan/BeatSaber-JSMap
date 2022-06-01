import * as bsmap from '../../deno/mod.ts';
import { idOffsetType0, idOffsetType4, roadCount, roadRepeat } from './environment.ts';

export const convertLight = (
    d: bsmap.v2.DifficultyData,
    environment: bsmap.types.EnvironmentAllName
) => {
    const events = d.events;
    const newEvents = [];

    // default color (for no chroma)
    const colorScheme = bsmap.ColorScheme[bsmap.EnvironmentSchemeName[environment]];
    const defaultLeftLight: bsmap.types.ColorArray = [
        colorScheme._envColorLeft!.r,
        colorScheme._envColorLeft!.g,
        colorScheme._envColorLeft!.b,
    ];
    const defaultRightLight: bsmap.types.ColorArray = [
        colorScheme._envColorRight!.r,
        colorScheme._envColorRight!.g,
        colorScheme._envColorRight!.b,
    ];

    //#region lighting
    // convert chroma 1 to chroma 2
    const oldChromaColorConvert = (rgb: number): bsmap.types.ColorArray => {
        rgb = rgb - 2000000000;
        let red = (rgb >> 16) & 0x0ff;
        let green = (rgb >> 8) & 0x0ff;
        let blue = rgb & 0x0ff;
        return [red / 255, green / 255, blue / 255];
    };
    const currentColor: { [key: number]: bsmap.types.ColorArray | null } = {};
    for (const ev of events) {
        let noChromaColor = false;
        if (ev.value >= 2000000000) {
            currentColor[ev.type] = oldChromaColorConvert(
                ev.value
            ) as bsmap.types.ColorArray;
        }
        if (!currentColor[ev.type]) {
            noChromaColor = true;
            currentColor[ev.type] =
                ev.value >= 1 && ev.value <= 3 ? defaultRightLight : defaultLeftLight;
        }
        if (ev.value === 4) {
            ev.value = 0;
        }
        if (ev.value !== 0 && !(ev.value >= 2000000000)) {
            if (ev.customData && !ev.customData._color) {
                ev.customData = { _color: currentColor[ev.type] };
            }
            if (!ev.customData) {
                ev.customData = { _color: currentColor[ev.type] };
            }
        }
        if (!(ev.value >= 2000000000)) {
            newEvents.push(ev);
            if (noChromaColor) {
                currentColor[ev.type] = null;
            }
        }
    }

    let tempID = [];
    for (let i = 0; i < roadRepeat; i++) {
        for (let j = 0; j < 2; j++) {
            tempID.push(idOffsetType4 + j + i * roadCount * 2);
        }
    }

    const switchType: { [key: number]: number } = {
        0: 0,
        4: 4,
        5: 4,
        6: 4,
        7: 4,
        10: 4,
        11: 4,
        14: 0,
        15: 0,
    };
    const typeLightIDMap: { [key: number]: number[] } = {
        0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        4: [11, 12, 13, 14, 15, 16],
        5: tempID,
        6: tempID.map((val) => val + 2),
        7: tempID.map((val) => val + 4),
        10: tempID.map((val) => val + 6),
        11: tempID.map((val) => val + 8),
        14: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
            (val) => val + idOffsetType0 - 1
        ),
        15: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
            (val) => val + idOffsetType0 - 1
        ),
    };

    const ignoreConversion = [1, 2, 3, 8, 9, 12, 13];

    for (const ev of newEvents) {
        if (ignoreConversion.includes(ev.type)) {
            continue;
        }
        if (
            (ev.type === 5 ||
                ev.type === 6 ||
                ev.type === 7 ||
                ev.type === 10 ||
                ev.type === 11) &&
            ev.customData!._color
        ) {
            ev.customData!._color = ev.customData!._color.map(
                (n: number) => (n * 1) / 10
            );
            ev.floatValue = 10;
        }
        ev.customData!._lightID = typeLightIDMap[ev.type];
        ev.type = switchType[ev.type];
    }

    d.events = newEvents;
    //#endregion
};
