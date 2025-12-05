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
   'GridEnvironment',
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
   | 'GreenDayEnvironment'
   | 'GreenDayGrenadeEnvironment'
   | 'TimbalandEnvironment'
   | 'FitBeatEnvironment'
   | 'LinkinParkEnvironment'
   | 'BTSEnvironment'
   | 'KaleidoscopeEnvironment'
   | 'InterscopeEnvironment'
   | 'SkrillexEnvironment'
   | 'BillieEnvironment'
   | 'HalloweenEnvironment'
   | 'GagaEnvironment';

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
   | 'GridEnvironment';

/** List of available 360 environment in base game. */
export type Environment360Name = 'GlassDesertEnvironment' | 'MultiplayerEnvironment';
