import { IInfoSettingsCustomData } from './heck.ts';

export type LookupMethod = 'Regex' | 'Exact' | 'Contains' | 'StartsWith' | 'EndsWith';

export type GeometryType = 'SPHERE' | 'CAPSULE' | 'CYLINDER' | 'CUBE' | 'PLANE' | 'QUAD' | 'TRIANGLE';

export type GeometryShaderPreset = 'LIGHT_BOX' | 'STANDARD' | 'NO_SHADE';

export const chromaName = 'Chroma';

/** Chroma interface for Difficulty Info Custom Data. */
export interface IChromaInfoCustomData extends IInfoSettingsCustomData {
    _settings?: {
        _chroma?: {
            _disableChromaEvents?: boolean;
            _disableEnvironmentEnhancements?: boolean;
            _forceZenModeWall?: boolean;
        };
    };
    _environmentalRemoval?: string[];
}
