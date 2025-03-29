import type {
   FloatPointDefinition,
   FloatPointDefinitionBase,
   PointDefinitionAllOperand,
   PointDefinitionModifier,
   Vector3PointDefinition,
   Vector3PointDefinitionBase,
   Vector4PointDefinition,
   Vector4PointDefinitionBase,
} from '../../types/beatmap/shared/custom/heck.ts';

export function isFloatPointDefinition(
   point: unknown,
): point is FloatPointDefinition {
   return isFloatPointDefinitionBase(point) || isPointDefinitionModifier(point);
}

export function isVec3PointDefinition(
   point: unknown,
): point is Vector3PointDefinition {
   return isVec3PointDefinitionBase(point) || isPointDefinitionModifier(point);
}

export function isVec4PointDefinition(
   point: unknown,
): point is Vector4PointDefinition {
   return isVec4PointDefinitionBase(point) || isPointDefinitionModifier(point);
}

export function isFloatPointDefinitionBase(
   point: unknown,
): point is FloatPointDefinitionBase {
   return (
      Array.isArray(point) &&
      point.every(
         (x) =>
            Array.isArray(x) &&
            (x.length > 2
               ? typeof x[1] === 'number' && typeof x[2] === 'string'
               : x.length === 2 && typeof x[1] === 'number'),
      )
   );
}

export function isVec3PointDefinitionBase(
   point: unknown,
): point is Vector3PointDefinitionBase {
   return (
      Array.isArray(point) &&
      point.every(
         (x) =>
            Array.isArray(x) &&
            (x.length > 4
               ? typeof x[3] === 'number' && typeof x[4] === 'string'
               : x.length === 4 && typeof x[3] === 'number'),
      )
   );
}

export function isVec4PointDefinitionBase(
   point: unknown,
): point is Vector4PointDefinitionBase {
   return (
      Array.isArray(point) &&
      point.every(
         (x) =>
            Array.isArray(x) &&
            (x.length > 5
               ? typeof x[4] === 'number' && typeof x[5] === 'string'
               : x.length === 5 && typeof x[4] === 'number'),
      )
   );
}

export function isPointDefinitionModifier(
   point: unknown,
): point is PointDefinitionModifier {
   return (
      Array.isArray(point) &&
      typeof point.at(0) === 'string' &&
      point.slice(1).every((x) => isPointDefinitionOperand(x))
   );
}

export function isPointDefinitionOperand(
   point: unknown,
): point is PointDefinitionAllOperand {
   return (
      Array.isArray(point) &&
      point.some((x) => typeof x === 'string' && x.startsWith('op'))
   );
}
