import { IBasicEvent } from './types/basicEvent.ts';
import { BasicEventTypesWithKeywords } from './types/basicEventTypesWithKeywords.ts';
import { IBombNote } from './types/bombNote.ts';
import { IBoostEvent } from './types/boostEvent.ts';
import { IBPMEvent } from './types/bpmEvent.ts';
import { IBurstSlider } from './types/burstSlider.ts';
import { IColorNote } from './types/colorNote.ts';
import { IDifficultyData } from './types/difficulty.ts';
import { ILightColorBase } from './types/lightColorBase.ts';
import { ILightColorEventBox } from './types/lightColorEventBox.ts';
import { ILightColorEventBoxGroup } from './types/lightColorEventBoxGroup.ts';
import { ILightRotationBase } from './types/lightRotationBase.ts';
import { ILightRotationEventBox } from './types/lightRotationEventBox.ts';
import { ILightRotationEventBoxGroup } from './types/lightRotationEventBoxGroup.ts';
import { IObstacle } from './types/obstacle.ts';
import { IRotationEvent } from './types/rotationEvent.ts';
import { ISlider } from './types/slider.ts';
import { IWaypoint } from './types/waypoint.ts';

export const difficulty = (): IDifficultyData => {
    return {
        version: '3.0.0',
        bpmEvents: [],
        rotationEvents: [],
        colorNotes: [],
        bombNotes: [],
        obstacles: [],
        sliders: [],
        burstSliders: [],
        waypoints: [],
        basicBeatmapEvents: [],
        colorBoostBeatmapEvents: [],
        lightColorEventBoxGroups: [],
        lightRotationEventBoxGroups: [],
        basicEventTypesWithKeywords: { d: [] },
        useNormalEventsAsCompatibleEvents: false,
    };
};

export const colorNote = (): IColorNote => {
    return {
        b: 0,
        c: 0,
        x: 0,
        y: 0,
        d: 0,
        a: 0,
    };
};

export const bomb = (): IBombNote => {
    return {
        b: 0,
        x: 0,
        y: 0,
    };
};

export const sliders = (): ISlider => {
    return {
        b: 0,
        c: 0,
        x: 0,
        y: 0,
        d: 0,
        mu: 1,
        tb: 0,
        tx: 0,
        ty: 0,
        tc: 0,
        tmu: 1,
        m: 0,
    };
};

export const burstSliders = (): IBurstSlider => {
    return {
        b: 0,
        c: 0,
        x: 0,
        y: 0,
        d: 0,
        tb: 0,
        tx: 0,
        ty: 0,
        sc: 1,
        s: 1,
    };
};

export const obstacle = (): IObstacle => {
    return {
        b: 0,
        x: 0,
        y: 0,
        d: 1,
        w: 1,
        h: 1,
    };
};

export const basicEvent = (): IBasicEvent => {
    return {
        b: 0,
        et: 0,
        i: 0,
        f: 1,
    };
};

export const bpmEvent = (): IBPMEvent => {
    return {
        b: 0,
        m: 120,
    };
};

export const rotationEvent = (): IRotationEvent => {
    return {
        b: 0,
        e: 0,
        r: 0,
    };
};

export const boostEvent = (): IBoostEvent => {
    return {
        b: 0,
        o: false,
    };
};

export const lightColor = (): ILightColorBase => {
    return {
        b: 0,
        i: 0,
        c: 0,
        s: 1,
        f: 0,
    };
};

export const lightColorEventBox = (): ILightColorEventBox => {
    return {
        f: {
            f: 1,
            p: 1,
            t: 1,
            r: 0,
        },
        w: 0,
        d: 1,
        r: 1,
        t: 1,
        b: 0,
        e: [],
    };
};

export const lightColorEventBoxGroup = (): ILightColorEventBoxGroup => {
    return {
        b: 0,
        g: 0,
        e: [],
    };
};

export const lightRotation = (): ILightRotationBase => {
    return {
        b: 0,
        p: 0,
        e: 0,
        l: 0,
        r: 0,
        o: 0,
    };
};

export const lightRotationEventBox = (): ILightRotationEventBox => {
    return {
        f: {
            f: 1,
            p: 1,
            t: 1,
            r: 0,
        },
        w: 0,
        d: 1,
        s: 0,
        t: 1,
        a: 0,
        r: 0,
        b: 0,
        l: [],
    };
};

export const lightRotationEventBoxGroup = (): ILightRotationEventBoxGroup => {
    return {
        b: 0,
        g: 0,
        e: [],
    };
};

export const waypoint = (): IWaypoint => {
    return {
        b: 0,
        x: 0,
        y: 0,
        d: 0,
    };
};
