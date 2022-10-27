import { IBasicEvent } from '../v3/basicEvent.ts';
import { EnvironmentAllName } from '../shared/environment.ts';
import { IChromaEnvironment } from '../v3/chroma.ts';

export interface EnvironmentJSON {
    /**
     * must be 1.0.0 to work
     */
    version: '1.0.0';
    name: string;
    author: string;
    /**
     * the version of your custom environment
     */
    environmentVersion: `${number}.${number}.${number}`;
    /**
     * the name of the base environment to load
     */
    environmentName: EnvironmentAllName;
    /**
     * unused for now
     */
    description: string;
    features: {
        useChromaEvents?: boolean;
        forceEffectsFilter?: 'NoEffects';
        basicBeatmapEvents?: IBasicEvent[];
    };
    environment: IChromaEnvironment[];
}
