// very readable code :+1:

import { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';

export const LightIDList: Record<
    EnvironmentAllName,
    Readonly<{ [key: number]: ReadonlyArray<number> }>
> = {
    DefaultEnvironment: {
        0: Array.from(Array(10), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(12), (_, i) => i + 1),
    },
    OriginsEnvironment: {
        0: Array.from(Array(10), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(12), (_, i) => i + 1),
    },
    TriangleEnvironment: {
        0: Array.from(Array(8), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(12), (_, i) => i + 1),
    },
    NiceEnvironment: {
        0: Array.from(Array(10), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(12), (_, i) => i + 1),
    },
    BigMirrorEnvironment: {
        0: Array.from(Array(10), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(6), (_, i) => i + 1),
        3: Array.from(Array(6), (_, i) => i + 1),
        4: Array.from(Array(16), (_, i) => i + 1),
    },
    DragonsEnvironment: {
        0: Array.from(Array(2), (_, i) => i + 1),
        1: Array.from(Array(62), (_, i) => i + 1),
        2: Array.from(Array(5), (_, i) => i + 1),
        3: Array.from(Array(5), (_, i) => i + 1),
        4: Array.from(Array(4), (_, i) => i + 1),
    },
    KDAEnvironment: {
        0: Array.from(Array(6), (_, i) => i + 1),
        1: Array.from(Array(5), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(9), (_, i) => i + 1),
        4: Array.from(Array(80), (_, i) => i + 1),
    },
    MonstercatEnvironment: {
        0: Array.from(Array(8), (_, i) => i + 1),
        1: Array.from(Array(7), (_, i) => i + 1),
        2: Array.from(Array(5), (_, i) => i + 1),
        3: Array.from(Array(5), (_, i) => i + 1),
        4: Array.from(Array(14), (_, i) => i + 1),
    },
    CrabRaveEnvironment: {
        0: Array.from(Array(8), (_, i) => i + 1),
        1: Array.from(Array(7), (_, i) => i + 1),
        2: Array.from(Array(5), (_, i) => i + 1),
        3: Array.from(Array(5), (_, i) => i + 1),
        4: Array.from(Array(14), (_, i) => i + 1),
    },
    PanicEnvironment: {
        0: Array.from(Array(2), (_, i) => i + 1),
        1: Array.from(Array(62), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(6), (_, i) => i + 1),
    },
    RocketEnvironment: {
        0: Array.from(Array(11), (_, i) => i + 1),
        1: Array.from(Array(4), (_, i) => i + 1),
        2: Array.from(Array(7), (_, i) => i + 1),
        3: Array.from(Array(7), (_, i) => i + 1),
        4: Array.from(Array(5), (_, i) => i + 1),
    },
    GreenDayEnvironment: {
        0: Array.from(Array(16), (_, i) => i + 1),
        1: Array.from(Array(60), (_, i) => i + 1),
        2: Array.from(Array(6), (_, i) => i + 1),
        3: Array.from(Array(6), (_, i) => i + 1),
        4: Array.from(Array(3), (_, i) => i + 1),
    },
    GreenDayGrenadeEnvironment: {
        0: Array.from(Array(16), (_, i) => i + 1),
        2: Array.from(Array(6), (_, i) => i + 1),
        3: Array.from(Array(6), (_, i) => i + 1),
        4: Array.from(Array(3), (_, i) => i + 1),
    },
    TimbalandEnvironment: {
        0: Array.from(Array(20), (_, i) => i + 1),
        1: Array.from(Array(20), (_, i) => i + 1),
        2: Array.from(Array(10), (_, i) => i + 1),
        3: Array.from(Array(14), (_, i) => i + 1),
        4: Array.from(Array(6), (_, i) => i + 1),
    },
    FitBeatEnvironment: {
        0: Array.from(Array(30), (_, i) => i + 1),
        1: Array.from(Array(30), (_, i) => i + 1),
        2: Array.from(Array(8), (_, i) => i + 1),
        3: Array.from(Array(8), (_, i) => i + 1),
        4: Array.from(Array(2), (_, i) => i + 1),
    },
    LinkinParkEnvironment: {
        0: Array.from(Array(2), (_, i) => i + 1),
        1: Array.from(Array(16), (_, i) => i + 1),
        2: Array.from(Array(20), (_, i) => i + 1),
        3: Array.from(Array(20), (_, i) => i + 1),
        4: Array.from(Array(1), (_, i) => i + 1),
    },
    BTSEnvironment: {
        0: Array.from(Array(1), (_, i) => i + 1),
        1: Array.from(Array(20), (_, i) => i + 1),
        2: Array.from(Array(25), (_, i) => i + 1),
        3: Array.from(Array(25), (_, i) => i + 1),
        4: Array.from(Array(3), (_, i) => i + 1),
    },
    KaleidoscopeEnvironment: {
        0: Array.from(Array(40), (_, i) => i + 1),
        1: Array.from(Array(40), (_, i) => i + 1),
        2: Array.from(Array(20), (_, i) => i + 1),
        3: Array.from(Array(20), (_, i) => i + 1),
        4: Array.from(Array(80), (_, i) => i + 1),
    },
    InterscopeEnvironment: {
        0: Array.from(Array(3), (_, i) => i + 1),
        1: Array.from(Array(3), (_, i) => i + 1),
        2: Array.from(Array(3), (_, i) => i + 1),
        3: Array.from(Array(3), (_, i) => i + 1),
        4: Array.from(Array(3), (_, i) => i + 1),
        6: Array.from(Array(7), (_, i) => i + 1),
        7: Array.from(Array(7), (_, i) => i + 1),
    },
    SkrillexEnvironment: {
        0: Array.from(Array(2), (_, i) => i + 1),
        1: Array.from(Array(66), (_, i) => i + 1),
        2: Array.from(Array(23), (_, i) => i + 1),
        3: Array.from(Array(23), (_, i) => i + 1),
        4: Array.from(Array(66), (_, i) => i + 1),
        6: Array.from(Array(24), (_, i) => i + 1),
        7: Array.from(Array(24), (_, i) => i + 1),
    },
    //FIXME: Billie, Halloween and Gaga is incorrect
    BillieEnvironment: {},
    HalloweenEnvironment: {},
    // FIXME: unknown
    GagaEnvironment: {},
    WeaveEnvironment: {},
    // FIXME: unknown
    PyroEnvironment: {},
    // FIXME: unknown
    EDMEnvironment: {},
    // FIXME: unknown
    TheSecondEnvironment: {},
    // FIXME: unknown
    LizzoEnvironment: {},
    // FIXME: unknown
    TheWeekndEnvironment: {},
    // FIXME: unknown
    RockMixtapeEnvironment: {},
    Dragons2Environment: {},
    Panic2Environment: {},
    GlassDesertEnvironment: {
        0: Array.from(Array(6), (_, i) => i + 1),
        1: Array.from(Array(8), (_, i) => i + 1),
        2: Array.from(Array(10), (_, i) => i + 1),
        3: Array.from(Array(10), (_, i) => i + 1),
    },
} as const;
