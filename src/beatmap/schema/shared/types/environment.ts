import type { Member } from '../../../../types/utils.ts';

/** List of all available environment in base game. */
export const EnvironmentName = [
   'DefaultEnvironment',
   'OriginsEnvironment',
   'TriangleEnvironment',
   'NiceEnvironment',
   'BigMirrorEnvironment',
   'DragonsEnvironment',
   'KDAEnvironment',
   'MonstercatEnvironment',
   'CrabRaveEnvironment',
   'PanicEnvironment',
   'RocketEnvironment',
   'GreenDayGrenadeEnvironment',
   'GreenDayEnvironment',
   'TimbalandEnvironment',
   'FitBeatEnvironment',
   'LinkinParkEnvironment',
   'BTSEnvironment',
   'KaleidoscopeEnvironment',
   'InterscopeEnvironment',
   'SkrillexEnvironment',
   'BillieEnvironment',
   'HalloweenEnvironment',
   'GagaEnvironment',
   'WeaveEnvironment',
   'PyroEnvironment',
   'EDMEnvironment',
   'TheSecondEnvironment',
   'LizzoEnvironment',
   'TheWeekndEnvironment',
   'RockMixtapeEnvironment',
   'Dragons2Environment',
   'Panic2Environment',
   'QueenEnvironment',
   'LinkinPark2Environment',
   'TheRollingStonesEnvironment',
   'LatticeEnvironment',
   'DaftPunkEnvironment',
   'HipHopEnvironment',
   'ColliderEnvironment',
   'BritneyEnvironment',
   'Monstercat2Environment',
   'MetallicaEnvironment',
   'Halloween2Environment',
   'GridEnvironment',
   'ColdplayEnvironment',
   'GlassDesertEnvironment',
   'MultiplayerEnvironment',
] as const;
export type EnvironmentName = Member<typeof EnvironmentName>;

/** List of available v2 environment in base game. */
export type EnvironmentV2Name =
   | 'DefaultEnvironment'
   | 'OriginsEnvironment'
   | 'TriangleEnvironment'
   | 'NiceEnvironment'
   | 'BigMirrorEnvironment'
   | 'DragonsEnvironment'
   | 'KDAEnvironment'
   | 'MonstercatEnvironment'
   | 'CrabRaveEnvironment'
   | 'PanicEnvironment'
   | 'RocketEnvironment'
   | 'GreenDayGrenadeEnvironment'
   | 'GreenDayEnvironment'
   | 'TimbalandEnvironment'
   | 'FitBeatEnvironment'
   | 'LinkinParkEnvironment'
   | 'BTSEnvironment'
   | 'KaleidoscopeEnvironment'
   | 'InterscopeEnvironment'
   | 'SkrillexEnvironment'
   | 'BillieEnvironment'
   | 'HalloweenEnvironment'
   | 'GagaEnvironment'
   | 'Halloween2Environment';

/** List of available v3 environment in base game. */
export type EnvironmentV3Name =
   | 'WeaveEnvironment'
   | 'PyroEnvironment'
   | 'EDMEnvironment'
   | 'TheSecondEnvironment'
   | 'LizzoEnvironment'
   | 'TheWeekndEnvironment'
   | 'RockMixtapeEnvironment'
   | 'Dragons2Environment'
   | 'Panic2Environment'
   | 'QueenEnvironment'
   | 'LinkinPark2Environment'
   | 'TheRollingStonesEnvironment'
   | 'LatticeEnvironment'
   | 'DaftPunkEnvironment'
   | 'HipHopEnvironment'
   | 'ColliderEnvironment'
   | 'BritneyEnvironment'
   | 'Monstercat2Environment'
   | 'MetallicaEnvironment'
   | 'GridEnvironment'
   | 'ColdplayEnvironment';

/** List of available 360 environment in base game. */
export type Environment360Name =
   | 'GlassDesertEnvironment'
   | 'MultiplayerEnvironment';

/** Map of event types to their respective track definitions. */
export interface ITrackDefinitions<T> {
   [key: number]: T;
}

/** List of all available types for basic event tracks. */
export const EventKind = {
   None: -1,
   Light: 0,
   Toggle: 1,
   Float: 3,
   Int: 4,
   BTS: 5,
   Car: 6,
};
export type EventKind = Member<typeof EventKind>;

/** Metadata for basic event track. */
export interface IBasicTrack {
   type: EventKind;
}

/** Metadata for event box group track. */
export interface IGroupTrack {
   count: number;
   color: boolean;
   rotation: readonly [x: boolean, y: boolean, z: boolean];
   translation: readonly [x: boolean, y: boolean, z: boolean];
   fx: boolean;
}
