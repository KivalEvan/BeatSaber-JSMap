import type {
   Environment360Name,
   EnvironmentName,
   EnvironmentV2Name,
   EnvironmentV3Name,
   IBasicTrack,
   ITrackDefinitions,
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
      environment === 'GagaEnvironment' ||
      environment === 'Halloween2Environment'
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
      environment === 'ColliderEnvironment' ||
      environment === 'BritneyEnvironment' ||
      environment === 'Monstercat2Environment' ||
      environment === 'MetallicaEnvironment' ||
      environment === 'GridEnvironment' ||
      environment === 'ColdplayEnvironment' ||
      environment === 'ProdigyEnvironment'
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

/** Check if event type is a basic event with no special controls. */
export function isBasicNoneTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === -1;
}
/** Check if event type is a basic event with "light" controls. */
export function isBasicLightTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === 0;
}
/** Check if event type is a basic event with "toggle" controls. */
export function isBasicToggleTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === 1;
}
/** Check if event type is a basic event with "float value" controls. */
export function isBasicFloatValueTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === 3;
}
/** Check if event type is a basic event with "integer value" controls. */
export function isBasicIntValueTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === 4;
}
/** Check if event type is a basic event with "character selection" controls. */
export function isBasicBtsTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === 5;
}
/** Check if event type is a basic event with "car selection" controls. */
export function isBasicCarTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === 6;
}
