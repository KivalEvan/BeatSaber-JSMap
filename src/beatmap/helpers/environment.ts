import { TrackDefinitions } from '../misc/environment.ts';
import {
   type Environment360Name,
   type EnvironmentName,
   type EnvironmentV2Name,
   type EnvironmentV3Name,
   EventKind,
   type IBasicTrack,
   type IGroupTrack,
   type ITrackDefinitions,
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
      environment === 'ColdplayEnvironment'
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
   return tracks[type].type === EventKind.None;
}
/** Check if event type is a basic event with "light" controls. */
export function isBasicLightTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === EventKind.Light;
}
/** Check if event type is a basic event with "toggle" controls. */
export function isBasicToggleTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === EventKind.Toggle;
}
/** Check if event type is a basic event with "float value" controls. */
export function isBasicFloatValueTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === EventKind.Float;
}
/** Check if event type is a basic event with "integer value" controls. */
export function isBasicIntValueTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === EventKind.Int;
}
/** Check if event type is a basic event with "character selection" controls. */
export function isBasicBtsTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === EventKind.BTS;
}
/** Check if event type is a basic event with "car selection" controls. */
export function isBasicCarTrack(
   type: number,
   tracks: ITrackDefinitions<IBasicTrack>,
): boolean {
   return tracks[type].type === EventKind.Car;
}

/** Retrieve all basic track definitions for an environment. Optionally supply a renamer fn to append a "name" field to each definition. */
export function getBasicTracksForEnvironment(
   environment: EnvironmentName,
): ITrackDefinitions<IBasicTrack & { id: number }>;
export function getBasicTracksForEnvironment(
   environment: EnvironmentName,
   renamer: (type: number, environment: EnvironmentName) => string | undefined,
): ITrackDefinitions<IBasicTrack & { id: number; name: string | undefined }>;
export function getBasicTracksForEnvironment(
   environment: EnvironmentName,
   renamer?: (type: number, environment: EnvironmentName) => string | undefined,
): ITrackDefinitions<IBasicTrack & { id: number; name: string | undefined }> {
   if (!(environment in TrackDefinitions)) {
      return {};
   }

   const basicTracks = TrackDefinitions[environment][0] as ITrackDefinitions<
      IBasicTrack & { id: number; name: string | undefined }
   >;

   for (const type of Object.keys(basicTracks).map((key) => Number.parseInt(key, 10))) {
      basicTracks[type] = { ...basicTracks[type], id: type };
      if (renamer) basicTracks[type].name = renamer?.(type, environment);
   }

   return basicTracks;
}

/** Retrieve all group track definitions for an environment. Optionally supply a renamer fn to append a "name" field to each definition. */
export function getGroupTracksForEnvironment(
   environment: EnvironmentName,
): ITrackDefinitions<IGroupTrack & { id: number }>;
export function getGroupTracksForEnvironment(
   environment: EnvironmentName,
   renamer: (type: number, environment: EnvironmentName) => string | undefined,
): ITrackDefinitions<IGroupTrack & { id: number; name: string | undefined }>;
export function getGroupTracksForEnvironment(
   environment: EnvironmentName,
   renamer?: (type: number, environment: EnvironmentName) => string | undefined,
): ITrackDefinitions<IGroupTrack & { id: number; name: string | undefined }> {
   if (!(environment in TrackDefinitions)) {
      return {};
   }

   const groupTracks = TrackDefinitions[environment][1] as ITrackDefinitions<
      IGroupTrack & { id: number; name: string | undefined }
   >;

   for (const id of Object.keys(groupTracks).map((key) => Number.parseInt(key, 10))) {
      groupTracks[id] = { ...groupTracks[id], id };
      if (renamer) groupTracks[id].name = renamer?.(id, environment);
   }

   return groupTracks;
}
