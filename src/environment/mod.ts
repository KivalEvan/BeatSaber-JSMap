/**
 * Environment track data module.
 *
 * This module contains environment name rename mappings and basic/group lightshow
 * track definitions for each environment, with lookup helpers.
 *
 * Separated from the main module as the definition tables are large and rarely used.
 * Import from `@kvl/bsmap/environment` to access these explicitly.
 *
 * @module
 */

export {
   BasicTrackDefinitions,
   EnvironmentRename,
   GroupTrackDefinitions,
} from '../beatmap/misc/environment.ts';
import { BasicTrackDefinitions, GroupTrackDefinitions } from '../beatmap/misc/environment.ts';
import { hasOwn } from '../utils/misc/hasOwn.ts';
import type {
   EnvironmentName,
   IBasicTrack,
   IGroupTrack,
   ITrackDefinitions,
} from '../beatmap/schema/shared/types/environment.ts';

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
): ITrackDefinitions<IBasicTrack & { id: number; name?: string }> {
   if (!hasOwn(BasicTrackDefinitions, environment)) {
      return {};
   }

   const basicTracks: ITrackDefinitions<IBasicTrack & { id: number; name?: string }> = {};
   const definitions = BasicTrackDefinitions[environment];

   for (const type of Object.keys(definitions).map((key) => Number.parseInt(key, 10))) {
      basicTracks[type] = { ...definitions[type], id: type };
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
): ITrackDefinitions<IGroupTrack & { id: number; name?: string }> {
   if (!hasOwn(GroupTrackDefinitions, environment)) {
      return {};
   }

   const groupTracks: ITrackDefinitions<IGroupTrack & { id: number; name?: string }> = {};
   const definitions = GroupTrackDefinitions[environment];

   for (const id of Object.keys(definitions).map((key) => Number.parseInt(key, 10))) {
      const definition = definitions[id];
      groupTracks[id] = {
         ...definition,
         rotation: [...definition.rotation],
         translation: [...definition.translation],
         id,
      };
      if (renamer) groupTracks[id].name = renamer?.(id, environment);
   }

   return groupTracks;
}
