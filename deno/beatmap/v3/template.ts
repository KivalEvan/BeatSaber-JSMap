import { BasicEvent } from './types/basicEvent.ts';
import { BombNote } from './types/bombNote.ts';
import { BoostEvent } from './types/boostEvent.ts';
import { BPMChangeEvent } from './types/bpmChange.ts';
import { BurstSlider } from './types/burstSlider.ts';
import { ColorNote } from './types/colorNote.ts';
import { DifficultyData } from './types/difficulty.ts';
import { LightColorBase } from './types/lightColorBase.ts';
import { LightColorEventBox } from './types/lightColorEventBox.ts';
import { LightColorEventBoxGroup } from './types/lightColorEventBoxGroup.ts';
import { LightRotationBase } from './types/lightRotationBase.ts';
import { LightRotationEventBox } from './types/lightRotationEventBox.ts';
import { LightRotationEventBoxGroup } from './types/lightRotationEventBoxGroup.ts';
import { Obstacle } from './types/obstacle.ts';
import { RotationEvent } from './types/rotationEvent.ts';
import { Slider } from './types/slider.ts';
import { Waypoint } from './types/waypoint.ts';

export const difficulty = (): DifficultyData => {
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

export const colorNote = (): ColorNote => {
    return {
        b: 0,
        c: 0,
        x: 0,
        y: 0,
        d: 0,
        a: 0,
    };
};

export const bomb = (): BombNote => {
    return {
        b: 0,
        x: 0,
        y: 0,
    };
};

export const sliders = (): Slider => {
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

export const burstSliders = (): BurstSlider => {
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

export const obstacle = (): Obstacle => {
    return {
        b: 0,
        x: 0,
        y: 0,
        d: 1,
        w: 1,
        h: 1,
    };
};

export const basicEvent = (): BasicEvent => {
    return {
        b: 0,
        et: 0,
        i: 0,
        f: 1,
    };
};

export const bpmEvent = (): BPMChangeEvent => {
    return {
        b: 0,
        m: 120,
    };
};

export const rotationEvent = (): RotationEvent => {
    return {
        b: 0,
        e: 0,
        r: 0,
    };
};

export const boostEvent = (): BoostEvent => {
    return {
        b: 0,
        o: false,
    };
};

export const lightColor = (): LightColorBase => {
    return {
        b: 0,
        i: 0,
        c: 0,
        s: 0,
        f: 0,
    };
};

export const lightColorEventBox = (): LightColorEventBox => {
    return {
        f: {
            f: 1,
            p: 0,
            t: 0,
            r: 0,
        },
        w: 0,
        d: 1,
        r: 0,
        t: 1,
        e: [],
        b: 0,
    };
};

export const lightColorEventBoxGroup = (): LightColorEventBoxGroup => {
    return {
        b: 0,
        g: 0,
        e: [],
    };
};

export const lightRotation = (): LightRotationBase => {
    return {
        b: 0,
        p: 0,
        e: 0,
        l: 0,
        r: 0,
        o: 0,
    };
};

export const lightRotationEventBox = (): LightRotationEventBox => {
    return {
        f: {
            f: 1,
            p: 0,
            t: 0,
            r: 0,
        },
        w: 0,
        d: 1,
        s: 0,
        t: 1,
        a: 0,
        l: [],
        r: 0,
        b: 0,
    };
};

export const lightRotationEventBoxGroup = (): LightRotationEventBoxGroup => {
    return {
        b: 0,
        g: 0,
        e: [],
    };
};

export const waypoint = (): Waypoint => {
    return {
        b: 0,
        x: 0,
        y: 0,
        d: 0,
    };
};
