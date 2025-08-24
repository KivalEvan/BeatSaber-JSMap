import type { IBasicEvent } from '../../v3/types/basicEvent.ts';
import type { EnvironmentAllName } from '../../../schema/shared/types/environment.ts';
import type { IChromaEnvironment, IChromaMaterial } from '../../v3/types/custom/chroma.ts';

export interface IEnvironmentJSON {
   /** must be 1.0.0 to work */
   version: '1.0.0';
   name: string;
   author: string;
   /** the version of your custom environment */
   environmentVersion: `${number}.${number}.${number}`;
   /** the name of the base environment to load */
   environmentName: EnvironmentAllName;
   /** unused for now */
   description: string;
   features: {
      useChromaEvents?: boolean;
      forceEffectsFilter?: 'NoEffects' | 'AllEffects';
      basicBeatmapEvents?: IBasicEvent[];
   };
   environment: IChromaEnvironment[];
   materials?: Record<string, IChromaMaterial>;
}
