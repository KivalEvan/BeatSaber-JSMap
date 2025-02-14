import type { Easings } from '../../../easings.ts';
import type { LooseAutocomplete } from '../../../utils.ts';
import type { Vector3, Vector4 } from '../../../vector.ts';

export type FloatPointDefinitionBase = [
   percent: number,
   time: number,
   ...options: (Easings | PointFlag)[]
][];
export type Vector3PointDefinitionBase = [
   ...vector3: Vector3,
   time: number,
   ...options: (Easings | PointFlag)[]
][];
export type Vector4PointDefinitionBase = [
   ...vector4: Vector4,
   time: number,
   ...options: ('lerpHSV' | Easings | PointFlag)[]
][];

export type PointDefinition1Modifier = [
   mod1: number | LooseAutocomplete<BaseModifier>,
   op: PointOperation,
   chain?: PointDefinitionModifierBase
];

export type PointDefinition2Modifier = [
   mod1: number | LooseAutocomplete<BaseModifier>,
   mod2: number | LooseAutocomplete<BaseModifier>,
   op: PointOperation,
   chain?: PointDefinitionModifierBase
];

export type PointDefinition3Modifier = [
   mod1: number | LooseAutocomplete<BaseModifier>,
   mod2: number | LooseAutocomplete<BaseModifier>,
   mod3: number | LooseAutocomplete<BaseModifier>,
   op: PointOperation,
   chain?: PointDefinitionModifierBase
];

export type PointDefinition4Modifier = [
   mod1: number | LooseAutocomplete<BaseModifier>,
   mod2: number | LooseAutocomplete<BaseModifier>,
   mod3: number | LooseAutocomplete<BaseModifier>,
   mod4: number | LooseAutocomplete<BaseModifier>,
   op: PointOperation,
   chain?: PointDefinitionModifierBase
];

export type PointDefinitionModifierBase =
   | PointDefinition1Modifier
   | PointDefinition2Modifier
   | PointDefinition3Modifier
   | PointDefinition4Modifier;

export type PointDefinitionModifier = [
   base: BaseModifier,
   ...PointDefinitionModifierBase[]
];

export type FloatPointDefinition =
   | FloatPointDefinitionBase
   | PointDefinitionModifier;
export type Vector3PointDefinition =
   | Vector3PointDefinitionBase
   | PointDefinitionModifier;
export type Vector4PointDefinition =
   | Vector4PointDefinitionBase
   | PointDefinitionModifier;

export type PointOperation = `op${'None' | 'Add' | 'Sub' | 'Mul' | 'Div'}`;
export type PointFlag = 'splineCatmullRom';

export type BaseModifierTransform =
   | 'baseHeadPosition' // [x, y, z]
   | 'baseHeadLocalPosition' // [x, y, z]
   | 'baseHeadRotation' // [x, y, z]
   | 'baseHeadLocalRotation' // [x, y, z]
   | 'baseHeadLocalScale' // [x, y, z]
   | 'baseLeftHandPosition' // [x, y, z]
   | 'baseLeftHandLocalPosition' // [x, y, z]
   | 'baseLeftHandRotation' // [x, y, z]
   | 'baseLeftHandLocalRotation' // [x, y, z]
   | 'baseLeftHandLocalScale' // [x, y, z]
   | 'baseRightHandPosition' // [x, y, z]
   | 'baseRightHandLocalPosition' // [x, y, z]
   | 'baseRightHandRotation' // [x, y, z]
   | 'baseRightHandLocalRotation' // [x, y, z]
   | 'baseRightHandLocalScale'; // [x, y, z]

export type BaseModifierColor =
   | 'baseNote0Color' // [x, y, z, w]
   | 'baseNote1Color' // [x, y, z, w]
   | 'baseObstaclesColor' // [x, y, z, w]
   | 'baseSaberAColor' // [x, y, z, w]
   | 'baseSaberBColor' // [x, y, z, w]
   | 'baseEnvironmentColor0' // [x, y, z, w]
   | 'baseEnvironmentColor1' // [x, y, z, w]
   | 'baseEnvironmentColorW' // [x, y, z, w]
   | 'baseEnvironmentColor0Boost' // [x, y, z, w]
   | 'baseEnvironmentColor1Boost' // [x, y, z, w]
   | 'baseEnvironmentColorWBoost'; // [x, y, z, w]

export type BaseModifierScoring =
   | 'baseCombo' // [x]
   | 'baseMultipliedScore' // [x]
   | 'baseImmediateMaxPossibleMultipliedScore' // [x]
   | 'baseModifiedScore' // [x]
   | 'baseImmediateMaxPossibleModifiedScore' // [x]
   | 'baseRelativeScore' // [x]
   | 'baseMultiplier' // [x]
   | 'baseEnergy' // [x]
   | 'baseSongTime' // [x]
   | 'baseSongLength'; // [x]

export type BaseModifier =
   | BaseModifierTransform
   | BaseModifierColor
   | BaseModifierScoring;
