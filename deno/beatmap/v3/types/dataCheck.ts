import { BasicEvent } from './basicEvent.ts';
import { BasicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';
import { BasicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import { BombNote } from './bombNote.ts';
import { BoostEvent } from './boostEvent.ts';
import { BPMChangeEvent } from './bpmChange.ts';
import { BurstSlider } from './burstSlider.ts';
import { ColorNote } from './colorNote.ts';
import { DifficultyData } from './difficulty.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightColorBase } from './lightColorBase.ts';
import { LightColorEventBox } from './lightColorEventBox.ts';
import { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { LightRotationBase } from './lightRotationBase.ts';
import { LightRotationEventBox } from './lightRotationEventBox.ts';
import { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { Obstacle } from './obstacle.ts';
import { RotationEvent } from './rotationEvent.ts';
import { Slider } from './slider.ts';
import { Waypoint } from './waypoint.ts';

type Version = `3.${number}.0`;
interface DataCheckBase {
    type: string | string[]; // string array because there'll soon be having to check both
    version: Version;
    optional?: boolean;
}

export interface DataCheckPrimitive extends DataCheckBase {
    type: 'string' | 'number' | 'boolean';
}

export interface DataCheckObject extends DataCheckBase {
    type: 'object' | 'array';
    check: { [key: string]: DataCheck };
}

export type DataCheck = DataCheckPrimitive | DataCheckObject;

export const ColorNoteDataCheck: Readonly<Record<keyof ColorNote, DataCheck>> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    c: {
        type: 'number',
        version: '3.0.0',
    },
    x: {
        type: 'number',
        version: '3.0.0',
    },
    y: {
        type: 'number',
        version: '3.0.0',
    },
    d: {
        type: 'number',
        version: '3.0.0',
    },
    a: {
        type: 'number',
        version: '3.0.0',
    },
    cd: {
        type: 'object',
        version: '3.0.0',
        check: {},
        optional: true,
    },
};

export const BombDataCheck: Readonly<Record<keyof BombNote, DataCheck>> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    x: {
        type: 'number',
        version: '3.0.0',
    },
    y: {
        type: 'number',
        version: '3.0.0',
    },
};

export const SliderDataCheck: Readonly<Record<keyof Slider, DataCheck>> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    c: {
        type: 'number',
        version: '3.0.0',
    },
    x: {
        type: 'number',
        version: '3.0.0',
    },
    y: {
        type: 'number',
        version: '3.0.0',
    },
    d: {
        type: 'number',
        version: '3.0.0',
    },
    mu: {
        type: 'number',
        version: '3.0.0',
    },
    tb: {
        type: 'number',
        version: '3.0.0',
    },
    tx: {
        type: 'number',
        version: '3.0.0',
    },
    ty: {
        type: 'number',
        version: '3.0.0',
    },
    tc: {
        type: 'number',
        version: '3.0.0',
    },
    tmu: {
        type: 'number',
        version: '3.0.0',
    },
    m: {
        type: 'number',
        version: '3.0.0',
    },
};

export const BurstSliderDataCheck: Readonly<Record<keyof BurstSlider, DataCheck>> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    c: {
        type: 'number',
        version: '3.0.0',
    },
    x: {
        type: 'number',
        version: '3.0.0',
    },
    y: {
        type: 'number',
        version: '3.0.0',
    },
    d: {
        type: 'number',
        version: '3.0.0',
    },
    tb: {
        type: 'number',
        version: '3.0.0',
    },
    tx: {
        type: 'number',
        version: '3.0.0',
    },
    ty: {
        type: 'number',
        version: '3.0.0',
    },
    sc: {
        type: 'number',
        version: '3.0.0',
    },
    s: {
        type: 'number',
        version: '3.0.0',
    },
};

export const ObstacleDataCheck: Readonly<Record<keyof Obstacle, DataCheck>> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    x: {
        type: 'number',
        version: '3.0.0',
    },
    y: {
        type: 'number',
        version: '3.0.0',
    },
    d: {
        type: 'number',
        version: '3.0.0',
    },
    w: {
        type: 'number',
        version: '3.0.0',
    },
    h: {
        type: 'number',
        version: '3.0.0',
    },
};

export const BasicEventDataCheck: Readonly<Record<keyof BasicEvent, DataCheck>> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    et: {
        type: 'number',
        version: '3.0.0',
    },
    i: {
        type: 'number',
        version: '3.0.0',
    },
    f: {
        type: 'number',
        version: '3.0.0',
    },
};

export const BPMChangeEventDataCheck: Readonly<
    Record<keyof BPMChangeEvent, DataCheck>
> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    m: {
        type: 'number',
        version: '3.0.0',
    },
};

export const RotationEventDataCheck: Readonly<Record<keyof RotationEvent, DataCheck>> =
    {
        b: {
            type: 'number',
            version: '3.0.0',
        },
        e: {
            type: 'number',
            version: '3.0.0',
        },
        r: {
            type: 'number',
            version: '3.0.0',
        },
    };

export const BoostEventDataCheck: Readonly<Record<keyof BoostEvent, DataCheck>> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    o: {
        type: 'boolean',
        version: '3.0.0',
    },
};

export const IndexFilterDataCheck: Readonly<Record<keyof IndexFilter, DataCheck>> = {
    f: {
        type: 'number',
        version: '3.0.0',
    },
    p: {
        type: 'number',
        version: '3.0.0',
    },
    t: {
        type: 'number',
        version: '3.0.0',
    },
    r: {
        type: 'number',
        version: '3.0.0',
    },
};

export const LightColorBaseDataCheck: Readonly<
    Record<keyof LightColorBase, DataCheck>
> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    i: {
        type: 'number',
        version: '3.0.0',
    },
    c: {
        type: 'number',
        version: '3.0.0',
    },
    s: {
        type: 'number',
        version: '3.0.0',
    },
    f: {
        type: 'number',
        version: '3.0.0',
    },
};

export const LightColorEventBoxDataCheck: Readonly<
    Record<keyof LightColorEventBox, DataCheck>
> = {
    f: {
        type: 'object',
        version: '3.0.0',
        check: IndexFilterDataCheck,
    },
    w: {
        type: 'number',
        version: '3.0.0',
    },
    d: {
        type: 'number',
        version: '3.0.0',
    },
    r: {
        type: 'number',
        version: '3.0.0',
    },
    t: {
        type: 'number',
        version: '3.0.0',
    },
    e: {
        type: 'array',
        version: '3.0.0',
        check: LightColorBaseDataCheck,
    },
    b: {
        type: 'number',
        version: '3.0.0',
    },
};

export const LightColorEventBoxGroupDataCheck: Readonly<
    Record<keyof LightColorEventBoxGroup, DataCheck>
> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    g: {
        type: 'number',
        version: '3.0.0',
    },
    e: {
        type: 'array',
        version: '3.0.0',
        check: LightColorEventBoxDataCheck,
    },
};

export const LightRotationBaseDataCheck: Readonly<
    Record<keyof LightRotationBase, DataCheck>
> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    p: {
        type: 'number',
        version: '3.0.0',
    },
    e: {
        type: 'number',
        version: '3.0.0',
    },
    l: {
        type: 'number',
        version: '3.0.0',
    },
    r: {
        type: 'number',
        version: '3.0.0',
    },
    o: {
        type: 'number',
        version: '3.0.0',
    },
};

export const LightRotationEventBoxDataCheck: Readonly<
    Record<keyof LightRotationEventBox, DataCheck>
> = {
    f: {
        type: 'object',
        version: '3.0.0',
        check: IndexFilterDataCheck,
    },
    w: {
        type: 'number',
        version: '3.0.0',
    },
    d: {
        type: 'number',
        version: '3.0.0',
    },
    s: {
        type: 'number',
        version: '3.0.0',
    },
    t: {
        type: 'number',
        version: '3.0.0',
    },
    a: {
        type: 'number',
        version: '3.0.0',
    },
    l: {
        type: 'array',
        version: '3.0.0',
        check: LightRotationBaseDataCheck,
    },
    r: {
        type: 'number',
        version: '3.0.0',
    },
    b: {
        type: 'number',
        version: '3.0.0',
    },
};

export const LightRotationEventBoxGroupDataCheck: Readonly<
    Record<keyof LightRotationEventBoxGroup, DataCheck>
> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    g: {
        type: 'number',
        version: '3.0.0',
    },
    e: {
        type: 'array',
        version: '3.0.0',
        check: LightRotationEventBoxDataCheck,
    },
};

export const BasicEventTypesForKeywordsDataCheck: Readonly<
    Record<keyof BasicEventTypesForKeywords, DataCheck>
> = {
    k: {
        type: 'string',
        version: '3.0.0',
    },
    e: {
        type: 'number',
        version: '3.0.0',
    },
};

export const BasicEventTypesWithKeywordsDataCheck: Readonly<
    Record<keyof BasicEventTypesWithKeywords, DataCheck>
> = {
    d: {
        type: 'array',
        version: '3.0.0',
        check: BasicEventTypesForKeywordsDataCheck,
        optional: true,
    },
};

export const WaypointDataCheck: Readonly<Record<keyof Waypoint, DataCheck>> = {
    b: {
        type: 'number',
        version: '3.0.0',
    },
    d: {
        type: 'number',
        version: '3.0.0',
    },
    x: {
        type: 'number',
        version: '3.0.0',
    },
    y: {
        type: 'number',
        version: '3.0.0',
    },
};

export const DifficultyDataCheck: Readonly<Record<keyof DifficultyData, DataCheck>> = {
    version: {
        type: 'string',
        version: '3.0.0',
    },
    bpmEvents: {
        type: 'array',
        version: '3.0.0',
        check: BPMChangeEventDataCheck,
    },
    rotationEvents: {
        type: 'array',
        version: '3.0.0',
        check: RotationEventDataCheck,
    },
    colorNotes: {
        type: 'array',
        version: '3.0.0',
        check: ColorNoteDataCheck,
    },
    bombNotes: {
        type: 'array',
        version: '3.0.0',
        check: BombDataCheck,
    },
    obstacles: {
        type: 'array',
        version: '3.0.0',
        check: ObstacleDataCheck,
    },
    sliders: {
        type: 'array',
        version: '3.0.0',
        check: SliderDataCheck,
    },
    burstSliders: {
        type: 'array',
        version: '3.0.0',
        check: BurstSliderDataCheck,
    },
    waypoints: {
        type: 'array',
        version: '3.0.0',
        check: WaypointDataCheck,
    },
    basicBeatmapEvents: {
        type: 'array',
        version: '3.0.0',
        check: BasicEventDataCheck,
    },
    colorBoostBeatmapEvents: {
        type: 'array',
        version: '3.0.0',
        check: BoostEventDataCheck,
    },
    lightColorEventBoxGroups: {
        type: 'array',
        version: '3.0.0',
        check: LightColorEventBoxGroupDataCheck,
    },
    lightRotationEventBoxGroups: {
        type: 'array',
        version: '3.0.0',
        check: LightRotationEventBoxGroupDataCheck,
    },
    basicEventTypesWithKeywords: {
        type: 'object',
        version: '3.0.0',
        check: BasicEventTypesWithKeywordsDataCheck,
    },
    useNormalEventsAsCompatibleEvents: {
        type: 'boolean',
        version: '3.0.0',
    },
    customData: {
        type: 'object',
        version: '3.0.0',
        optional: true,
        check: {},
    },
};
