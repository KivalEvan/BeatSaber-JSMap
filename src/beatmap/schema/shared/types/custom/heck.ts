import type { Easings } from '../../../../../types/easings.ts';
import type { LooseAutocomplete } from '../../../../../types/utils.ts';

export type PointDefinition1Base =
   | [
      base1: number | LooseAutocomplete<BaseModifier>,
      time?: number,
      ...options: PointOption[],
   ]
   | [
      base1: number | LooseAutocomplete<BaseModifier>,
      operand?: PointDefinitionAllOperand,
      time?: number,
      ...options: PointOption[],
   ];

export type PointDefinition2Base =
   | [
      base1: number | LooseAutocomplete<BaseModifier>,
      base2: number | LooseAutocomplete<BaseModifier>,
      time?: number,
      ...options: PointOption[],
   ]
   | [
      base1: number | LooseAutocomplete<BaseModifier>,
      base2: number | LooseAutocomplete<BaseModifier>,
      operand?: PointDefinitionAllOperand,
      time?: number,
      ...options: PointOption[],
   ];

export type PointDefinition3Base =
   | [
      base1: number | LooseAutocomplete<BaseModifier>,
      base2: number | LooseAutocomplete<BaseModifier>,
      base3: number | LooseAutocomplete<BaseModifier>,
      time?: number,
      ...options: PointOption[],
   ]
   | [
      base1: number | LooseAutocomplete<BaseModifier>,
      base2: number | LooseAutocomplete<BaseModifier>,
      base3: number | LooseAutocomplete<BaseModifier>,
      operand?: PointDefinitionAllOperand,
      time?: number,
      ...options: PointOption[],
   ];

export type PointDefinition4Base =
   | [
      base1: number | LooseAutocomplete<BaseModifier>,
      base2: number | LooseAutocomplete<BaseModifier>,
      base3: number | LooseAutocomplete<BaseModifier>,
      base4: number | LooseAutocomplete<BaseModifier>,
      time?: number,
      ...options: PointOption[],
   ]
   | [
      base1: number | LooseAutocomplete<BaseModifier>,
      base2: number | LooseAutocomplete<BaseModifier>,
      base3: number | LooseAutocomplete<BaseModifier>,
      base4: number | LooseAutocomplete<BaseModifier>,
      operand?: PointDefinitionAllOperand,
      time?: number,
      ...options: PointOption[],
   ];

export type PointDefinition1Operand = [
   operand1: number | LooseAutocomplete<BaseModifier>,
   op: PointOperation,
   chain?: PointDefinitionAllOperand,
];

export type PointDefinition2Operand = [
   operand1: number | LooseAutocomplete<BaseModifier>,
   operand2: number | LooseAutocomplete<BaseModifier>,
   op: PointOperation,
   chain?: PointDefinitionAllOperand,
];

export type PointDefinition3Operand = [
   operand1: number | LooseAutocomplete<BaseModifier>,
   operand2: number | LooseAutocomplete<BaseModifier>,
   operand3: number | LooseAutocomplete<BaseModifier>,
   op: PointOperation,
   chain?: PointDefinitionAllOperand,
];

export type PointDefinition4Operand = [
   operand1: number | LooseAutocomplete<BaseModifier>,
   operand2: number | LooseAutocomplete<BaseModifier>,
   operand3: number | LooseAutocomplete<BaseModifier>,
   operand4: number | LooseAutocomplete<BaseModifier>,
   op: PointOperation,
   chain?: PointDefinitionAllOperand,
];

export type PointDefinitionAllOperand =
   | PointDefinition1Operand
   | PointDefinition2Operand
   | PointDefinition3Operand
   | PointDefinition4Operand;

export type PointDefinition1Modifier = [
   base1: number | LooseAutocomplete<BaseModifier>,
   ...PointDefinitionAllOperand[],
];

export type PointDefinition2Modifier = [
   base1: number | LooseAutocomplete<BaseModifier>,
   base2: number | LooseAutocomplete<BaseModifier>,
   ...PointDefinitionAllOperand[],
];

export type PointDefinition3Modifier = [
   base1: number | LooseAutocomplete<BaseModifier>,
   base2: number | LooseAutocomplete<BaseModifier>,
   base3: number | LooseAutocomplete<BaseModifier>,
   ...PointDefinitionAllOperand[],
];

export type PointDefinition4Modifier = [
   base1: number | LooseAutocomplete<BaseModifier>,
   base2: number | LooseAutocomplete<BaseModifier>,
   base3: number | LooseAutocomplete<BaseModifier>,
   base4: number | LooseAutocomplete<BaseModifier>,
   ...PointDefinitionAllOperand[],
];

export type FloatPointDefinition =
   | PointDefinition1Base[]
   | PointDefinition1Modifier;
export type Vector3PointDefinition =
   | (PointDefinition1Base | PointDefinition2Base | PointDefinition3Base)[]
   | PointDefinition1Modifier
   | PointDefinition2Modifier
   | PointDefinition3Modifier;
export type Vector4PointDefinition =
   | (
      | PointDefinition1Base
      | PointDefinition2Base
      | PointDefinition3Base
      | PointDefinition4Base
   )[]
   | PointDefinition1Modifier
   | PointDefinition2Modifier
   | PointDefinition3Modifier
   | PointDefinition4Modifier;

export type PointOperation = `op${'None' | 'Add' | 'Sub' | 'Mul' | 'Div'}`;
export type PointFlag = 'splineCatmullRom';
export type PointOption = 'lerpHSV' | Easings | PointFlag;

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
