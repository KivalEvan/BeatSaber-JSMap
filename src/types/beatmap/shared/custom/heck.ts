import type { Easings } from '../../../easings.ts';
import type { LooseAutocomplete } from '../../../utils.ts';
import type { Vector3, Vector4 } from '../../../vector.ts';

export type FloatPointDefinition =
   | [
      LooseAutocomplete<BaseModifier>,
      ...[
         ...(number | LooseAutocomplete<BaseModifier>)[],
         options: PointModifier,
      ],
   ][]
   | [percent: number, time: number, ...options: (Easings | PointFlag)[]][];
export type Vector3PointDefinition =
   | [
      LooseAutocomplete<BaseModifier>,
      ...[
         ...(number | LooseAutocomplete<BaseModifier>)[],
         options: PointModifier,
      ],
   ][]
   | [...vector3: Vector3, time: number, ...options: (Easings | PointFlag)[]][];
export type Vector4PointDefinition =
   | [
      LooseAutocomplete<BaseModifier>,
      ...[
         ...(number | LooseAutocomplete<BaseModifier>)[],
         options: PointModifier,
      ],
   ][]
   | [
      ...vector4: Vector4,
      time: number,
      ...options: ('lerpHSV' | Easings | PointFlag)[],
   ][];

export type PointModifier = `op${'None' | 'Add' | 'Sub' | 'Mul' | 'Div'}`;
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
