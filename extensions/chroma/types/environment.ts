import { Vector3 } from '../../../types/beatmap/shared/heck.ts';
import { IChromaEnvironmentID } from '../../../types/beatmap/v3/chroma.ts';

export interface IChromaEnvironmentBlock extends IChromaEnvironmentID {
    track?: never;
    duplicate?: never;
    active?: never;
    scale?: Vector3;
    position?: Vector3;
    rotation?: Vector3;
    localPosition?: never;
    localRotation?: never;
    lightID?: never;
}

export interface IChromaEnvironmentPlacement {
    scale?: Vector3;
    position?: Vector3;
    rotation?: Vector3;
    lightID?: number;
}
