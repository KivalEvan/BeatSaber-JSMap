import { PercentPointDefinition, Vector3 } from '../shared/heck.ts';
import { Easings } from '../../easings.ts';
import { ColorArray } from '../../colors.ts';
import { ICustomDataBase } from '../shared/customData.ts';
import {
    ColorPointDefinition,
    EnvironmentMaterial,
    GeometryType,
    LookupMethod,
    ShaderKeywords,
    ShaderType,
} from '../shared/chroma.ts';
import { IHeckCustomEventDataBase } from './heck.ts';
import { LooseAutocomplete } from '../../utils.ts';

/** Chroma Material interface for Environment Enhancement. */
export interface IChromaMaterial {
    shader: LooseAutocomplete<ShaderType | EnvironmentMaterial>;
    /** Overrides default shader keywords. */
    shaderKeywords?: LooseAutocomplete<ShaderKeywords>[];
    collision?: boolean;
    track?: string;
    color?: ColorArray;
}

/** Chroma Geometry interface for Environment Enhancement. */
export interface IChromaGeometry {
    type: GeometryType;
    material: IChromaMaterial | string;
    collision?: boolean;
}

export interface IChromaComponentLightWithID {
    /** `<int>` Assign event type value. */
    type?: number;
    /** `<int>` Assign lightID value. */
    lightID?: number;
}

export interface IChromaComponentBloomFogEnvironment {
    /** `<float>` */
    attenuation?: number;
    /** `<float>` */
    offset?: number;
    /** `<float>` */
    startY?: number;
    /** `<float>` */
    height?: number;
}

export interface IChromaComponentTubeBloomPrePassLight {
    /** `<float>` */
    colorAlphaMultiplier?: number;
    /** `<float>` */
    bloomFogIntensityMultiplier?: number;
}

/** Chroma Component interface for Environment Enhancement. */
export interface IChromaComponent {
    ILightWithId?: IChromaComponentLightWithID;
    BloomFogEnvironment?: IChromaComponentBloomFogEnvironment;
    TubeBloomPrePassLight?: IChromaComponentTubeBloomPrePassLight;
}

/** Chroma interface for Environment Enhancement Base. */
export interface IChromaEnvironmentBase {
    /** Look up environment object name.
     *
     * This grabs every environment objects that match the string.
     * ```ts
     * id: 'Environment.[0]GlowLine' || 'Environment\.\\[\\d+\\]GlowLine$' // Regex example
     * ```
     */
    id?: unknown;
    /** Look-up method to grab the object name.
     *
     * Regex is considered an advanced method and more powerful than other methods.
     */
    lookupMethod?: unknown;
    geometry?: unknown;
    /** Assign track to the object for animation use. */
    track?: string;
    /** Duplicate the object by set amount.
     *
     * **WARNING:** You should always duplicate only one at a time unless you know what you are doing.
     */
    duplicate?: number;
    active?: boolean;
    scale?: Vector3;
    position?: Vector3;
    rotation?: Vector3;
    localPosition?: Vector3;
    localRotation?: Vector3;
    /** Assign light ID for duplicated object. */
    components?: IChromaComponent;
}

/** Chroma interface for Environment Enhancement ID.
 *
 * @extends IChromaEnvironmentBase
 */
export interface IChromaEnvironmentID extends IChromaEnvironmentBase {
    id: string;
    lookupMethod: LookupMethod;
    geometry?: never;
}

/** Chroma interface for Environment Enhancement Geometry.
 *
 * @extends IChromaEnvironmentBase
 */
export interface IChromaEnvironmentGeometry extends IChromaEnvironmentBase {
    id?: never;
    lookupMethod?: never;
    geometry: IChromaGeometry;
}

/** Chroma interface for Environment Enhancement. */
export type IChromaEnvironment = IChromaEnvironmentID | IChromaEnvironmentGeometry;

/** Chroma interface for Beatmap Object Animation Custom Data. */
export interface IChromaAnimation {
    color?: string | ColorPointDefinition[];
}

/** Chroma interface for Beatmap Note Custom Data. */
export interface IChromaNote {
    color?: ColorArray;
    spawnEffect?: boolean;
}

/** Chroma interface for Beatmap Obstacle Custom Data. */
export interface IChromaObstacle {
    color?: ColorArray;
}

/** Chroma interface for Beatmap Event Light Custom Data. */
export interface IChromaEventLight extends ICustomDataBase {
    color?: ColorArray;
    lightID?: number | number[];
    lerpType?: 'HSV' | 'RGB';
    easing?: Easings;
}

/** Chroma interface for Beatmap Event Laser Rotation Custom Data. */
export interface IChromaEventLaser extends ICustomDataBase {
    lockRotation?: boolean;
    speed?: number;
    direction?: number;
}

/** Chroma interface for Beatmap Event Ring Spin Custom Data. */
export interface IChromaEventRing extends ICustomDataBase {
    nameFilter?: string;
    rotation?: number;
    step?: number;
    prop?: number;
    speed?: number;
    direction?: number;
}

/** Chroma interface for Beatmap Event Ring Zoom Custom Data. */
export interface IChromaEventZoom extends ICustomDataBase {
    step?: number;
    speed?: number;
}

/** AnimateComponent interface for Chroma Custom Event. */
export interface IChromaCustomEventDataAnimateTrack extends IHeckCustomEventDataBase {
    color?: string | ColorPointDefinition[];
}

/** AnimateComponent interface for Chroma Custom Event. */
export interface IChromaCustomEventDataAssignPathAnimation extends IHeckCustomEventDataBase {
    color?: string | ColorPointDefinition[];
}

/** AnimateComponent interface for Chroma Custom Event. */
export interface IChromaCustomEventDataAnimateComponent extends IHeckCustomEventDataBase {
    track: string;
    duration: number;
    easing?: string;
    BloomFogEnvironment?: {
        attenuation?: PercentPointDefinition[];
        offset?: PercentPointDefinition[];
        startY?: PercentPointDefinition[];
        height?: PercentPointDefinition[];
    };
    TubeBloomPrePassLight?: {
        colorAlphaMultiplier: PercentPointDefinition[];
        bloomFogIntensityMultiplier: PercentPointDefinition[];
    };
}

/** Chroma Custom Data interface for difficulty custom data. */
export interface IChromaCustomData {
    environment?: IChromaEnvironment[];
    materials?: { [key: string]: IChromaMaterial };
}
