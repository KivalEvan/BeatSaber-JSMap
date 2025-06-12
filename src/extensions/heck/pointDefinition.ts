import type {
   FloatPointDefinition,
   PointDefinition1Base,
   PointDefinition3Base,
   PointDefinition4Base,
   PointDefinitionAllOperand,
   Vector3PointDefinition,
   Vector4PointDefinition,
} from '../../types/beatmap/shared/custom/heck.ts';

export function isFloatPointDefinition(
   point: unknown,
): point is FloatPointDefinition {
   return isFloatPointDefinitionBase(point);
}

export function isVec3PointDefinition(
   point: unknown,
): point is Vector3PointDefinition {
   return isVec3PointDefinitionBase(point);
}

export function isVec4PointDefinition(
   point: unknown,
): point is Vector4PointDefinition {
   return isVec4PointDefinitionBase(point);
}

export function isFloatPointDefinitionBase(
   point: unknown,
): point is PointDefinition1Base {
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
): point is PointDefinition3Base {
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
): point is PointDefinition4Base {
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

export function isPointDefinitionOperand(
   point: unknown,
): point is PointDefinitionAllOperand {
   return (
      Array.isArray(point) &&
      point.some((x) => typeof x === 'string' && x.startsWith('op'))
   );
}
