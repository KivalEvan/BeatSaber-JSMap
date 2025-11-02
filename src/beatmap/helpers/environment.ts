import type {
   Environment360Name,
   EnvironmentName,
   EnvironmentV2Name,
   EnvironmentV3Name,
} from '../schema/shared/types/environment.ts';

/** Check if environment is v2 environment. */
export function isV2Environment(
   environment: EnvironmentName,
): environment is EnvironmentV2Name {
   return (
      environment === 'DefaultEnvironment' ||
      environment === 'OriginsEnvironment' ||
      environment === 'TriangleEnvironment' ||
      environment === 'NiceEnvironment' ||
      environment === 'BigMirrorEnvironment' ||
      environment === 'DragonsEnvironment' ||
      environment === 'KDAEnvironment' ||
      environment === 'MonstercatEnvironment' ||
      environment === 'CrabRaveEnvironment' ||
      environment === 'PanicEnvironment' ||
      environment === 'RocketEnvironment' ||
      environment === 'GreenDayEnvironment' ||
      environment === 'GreenDayGrenadeEnvironment' ||
      environment === 'TimbalandEnvironment' ||
      environment === 'FitBeatEnvironment' ||
      environment === 'LinkinParkEnvironment' ||
      environment === 'BTSEnvironment' ||
      environment === 'KaleidoscopeEnvironment' ||
      environment === 'InterscopeEnvironment' ||
      environment === 'SkrillexEnvironment' ||
      environment === 'BillieEnvironment' ||
      environment === 'HalloweenEnvironment' ||
      environment === 'GagaEnvironment'
   );
}
/** Check if environment is v3 environment. */
export function isV3Environment(
   environment: EnvironmentName,
): environment is EnvironmentV3Name {
   return (
      environment === 'WeaveEnvironment' ||
      environment === 'PyroEnvironment' ||
      environment === 'EDMEnvironment' ||
      environment === 'TheSecondEnvironment' ||
      environment === 'LizzoEnvironment' ||
      environment === 'TheWeekndEnvironment' ||
      environment === 'RockMixtapeEnvironment' ||
      environment === 'Dragons2Environment' ||
      environment === 'Panic2Environment' ||
      environment === 'QueenEnvironment' ||
      environment === 'LinkinPark2Environment' ||
      environment === 'TheRollingStonesEnvironment' ||
      environment === 'LatticeEnvironment' ||
      environment === 'DaftPunkEnvironment' ||
      environment === 'HipHopEnvironment' ||
      environment === 'ColliderEnvironment'
   );
}
/** Check if environment is 360 environment. */
export function is360Environment(
   environment: EnvironmentName,
): environment is Environment360Name {
   return (
      environment === 'GlassDesertEnvironment' ||
      environment === 'MultiplayerEnvironment'
   );
}
