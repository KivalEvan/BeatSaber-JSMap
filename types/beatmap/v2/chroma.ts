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

/** Chroma Material Base interface for Environment Enhancement. */
export interface IChromaMaterialBase {
    _shader: ShaderType | EnvironmentMaterial;
    /** Overrides default shader keywords. */
    _shaderKeywords?: string[];
    _collision?: boolean;
    _track?: string;
    _color?: ColorArray;
}

/** Chroma Material Standard interface for Environment Enhancement.
 * @extends IChromaMaterialBase
 */
export interface IChromaMaterialStandard extends IChromaMaterialBase {
    _shader: 'Standard';
    /** Default shader keywords preset:
     * ```ts
     * ["DIFFUSE", "ENABLE_DIFFUSE", "ENABLE_FOG", "ENABLE_HEIGHT_FOG", "ENABLE_SPECULAR", "FOG",
     *  "HEIGHT_FOG", "REFLECTION_PROBE_BOX_PROJECTION", "SPECULAR", "_EMISSION",
     *  "_ENABLE_FOG_TINT", "_RIMLIGHT_NONE"]
     * ```
     * Overrides default shader keywords.
     */
    _shaderKeywords?: ShaderKeywords[];
}

/** Chroma Material Opaque interface for Environment Enhancement.
 * @extends IChromaMaterialBase
 */
export interface IChromaMaterialOpaque extends IChromaMaterialBase {
    _shader: 'OpaqueLight';
    /** Default shader keywords preset:
     * ```ts
     * ["DIFFUSE", "ENABLE_BLUE_NOISE", "ENABLE_DIFFUSE", "ENABLE_HEIGHT_FOG", "ENABLE_LIGHTNING", "USE_COLOR_FOG"]
     * ```
     * Overrides default shader keywords.
     */
    _shaderKeywords?: ShaderKeywords[];
}

/** Chroma Material Transparent interface for Environment Enhancement.
 * @extends IChromaMaterialBase
 */
export interface IChromaMaterialTransparent extends IChromaMaterialBase {
    _shader: 'TransparentLight';
    /** Default shader keywords preset:
     * ```ts
     * ["ENABLE_HEIGHT_FOG", "MULTIPLY_COLOR_WITH_ALPHA", "_ENABLE_MAIN_EFFECT_WHITE_BOOST"]
     * ```
     * Overrides default shader keywords.
     */
    _shaderKeywords?: ShaderKeywords[];
}

/** Chroma Material interface for Environment Enhancement. */
export type IChromaMaterial = IChromaMaterialStandard | IChromaMaterialOpaque | IChromaMaterialTransparent;

/** Chroma Geometry interface for Environment Enhancement. */
export interface IChromaGeometry {
    _type: GeometryType;
    _material: IChromaMaterial | string;
    _collision?: boolean;
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
    _id?: unknown;
    /** Look-up method to grab the object name.
     *
     * Regex is considered an advanced method and more powerful than other methods.
     */
    _lookupMethod?: unknown;
    _geometry?: unknown;
    /** Assign track to the object for animation use. */
    _track?: string;
    /** Duplicate the object by set amount.
     *
     * **WARNING:** You should always duplicate only one at a time unless you know what you are doing.
     */
    _duplicate?: number;
    _active?: boolean;
    _scale?: Vector3;
    _position?: Vector3;
    _rotation?: Vector3;
    _localPosition?: Vector3;
    _localRotation?: Vector3;
    /** Assign light ID for duplicated object. */
    _lightID?: number;
}

/** Chroma interface for Environment Enhancement ID.
 *
 * @extends IChromaEnvironmentBase
 */
export interface IChromaEnvironmentID extends IChromaEnvironmentBase {
    _id: string;
    _lookupMethod: LookupMethod;
    _geometry?: never;
}

/** Chroma interface for Environment Enhancement Geometry.
 *
 * @extends IChromaEnvironmentBase
 */
export interface IChromaEnvironmentGeometry extends IChromaEnvironmentBase {
    _id?: never;
    _lookupMethod?: never;
    _geometry: IChromaGeometry;
}

/** Chroma interface for Environment Enhancement. */
export type IChromaEnvironment = IChromaEnvironmentID | IChromaEnvironmentGeometry;

/** Chroma interface for Beatmap Object Animation Custom Data. */
export interface IChromaAnimation {
    _color?: string | ColorPointDefinition[];
}

/** Chroma interface for Beatmap Note Custom Data. */
export interface IChromaNote {
    _color?: ColorArray;
    _disableSpawnEffect?: boolean;
}

/** Chroma interface for Beatmap Obstacle Custom Data. */
export interface IChromaObstacle {
    _color?: ColorArray;
}

/** Chroma interface for Beatmap Event Light Custom Data. */
export interface IChromaEventLight extends ICustomDataBase {
    _color?: ColorArray;
    _lightID?: number | number[];
    _propID?: number;
    _lightGradient?: {
        _duration: number;
        _startColor: ColorArray;
        _endColor: ColorArray;
        _easing?: Easings;
    };
    _lerpType?: 'HSV' | 'RGB';
    _easing?: Easings;
}

/** Chroma interface for Beatmap Event Laser Rotation Custom Data. */
export interface IChromaEventLaser extends ICustomDataBase {
    _lockPosition?: boolean;
    _speed?: number;
    _preciseSpeed?: number;
    _direction?: number;
}

/** Chroma interface for Beatmap Event Ring Spin Custom Data. */
export interface IChromaEventRing extends ICustomDataBase {
    _nameFilter?: string;
    _reset?: boolean;
    _rotation?: number;
    _step?: number;
    _prop?: number;
    _speed?: number;
    _direction?: number;
    _counterSpin?: boolean;
    _stepMult?: number;
    _propMult?: number;
    _speedMult?: number;
}

/** Chroma interface for Beatmap Event Ring Zoom Custom Data. */
export interface IChromaEventZoom extends ICustomDataBase {
    _step?: number;
    _speed?: number;
}

/** AnimateComponent interface for Chroma Custom Event. */
export interface IChromaCustomEventDataAnimateTrack extends IHeckCustomEventDataBase {
    _color?: string | ColorPointDefinition[];
}

/** AnimateComponent interface for Chroma Custom Event. */
export interface IChromaCustomEventDataAssignPathAnimation extends IHeckCustomEventDataBase {
    _color?: string | ColorPointDefinition[];
}

/** AssignFogTrack interface for Chroma Custom Event. */
export interface IChromaCustomEventDataAssignFogTrack extends IHeckCustomEventDataBase {
    _track: string;
    _duration: number;
    _attenuation?: number | PercentPointDefinition[];
    _offset?: number | PercentPointDefinition[];
    _startY?: number | PercentPointDefinition[];
    _height?: number | PercentPointDefinition[];
}

/** Chroma Custom Data interface for difficulty custom data. */
export interface IChromaCustomData {
    _environment?: IChromaEnvironment[];
    _materials?: { [key: string]: IChromaMaterial };
}
