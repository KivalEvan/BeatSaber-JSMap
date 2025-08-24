import type { Member } from '../../../../types/utils.ts';

/** List of available v2 environment in base game. */
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
   'GreenDayEnvironment',
   'GreenDayGrenadeEnvironment',
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
] as const;
export type EnvironmentName = Member<typeof EnvironmentName>;

/** List of available v3 environment in base game. */
export const EnvironmentV3Name = [
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
] as const;
export type EnvironmentV3Name = Member<typeof EnvironmentV3Name>;

/** List of available 360 environment in base game. */
export const Environment360Name = [
   'GlassDesertEnvironment',
   'MultiplayerEnvironment',
] as const;
export type Environment360Name = Member<typeof Environment360Name>;

/** List of all available environment in base game. */
export const EnvironmentAllName = [
   ...EnvironmentName,
   ...EnvironmentV3Name,
   ...Environment360Name,
] as const;
export type EnvironmentAllName = Member<typeof EnvironmentAllName>;
