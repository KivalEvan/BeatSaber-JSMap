import type {
   FloatPointDefinition,
   Vector3PointDefinition,
   Vector4PointDefinition,
} from '../../types/beatmap/shared/custom/heck.ts';
import type { ColorArray } from '../../types/colors.ts';
import type { Easings } from '../../types/easings.ts';
import type { PointModifier } from '../../types/beatmap/shared/custom/heck.ts';
import type { Vector2, Vector3, Vector4 } from '../../types/vector.ts';
import { EasingsFn } from '../../utils/math/easings.ts';
import { clamp } from '../../utils/math/helpers.ts';
import type { BaseModifierNE } from '../../types/beatmap/shared/custom/noodleExtensions.ts';
import type { BaseModifierChroma } from '../../types/beatmap/shared/custom/chroma.ts';

/**
 * Fix boolean value by interpreting unknown value as boolean or return default value.
 */
export function fixBoolean(value: unknown): boolean;
export function fixBoolean(value: unknown, defaultValue: boolean): boolean;
export function fixBoolean(value: unknown, defaultValue?: boolean): boolean {
   switch (typeof value) {
      case 'boolean':
         return value;
      case 'number':
         if (value) return true;
         return false;
      case 'string': {
         if (value.toLowerCase() === 'true') return true;
         if (value.toLowerCase() === 'false') return false;
         if (typeof defaultValue === 'boolean') return defaultValue;
         throw new TypeError(`Could not evaluate boolean for ${value}`);
      }
      default:
         throw new TypeError(`Could not determine type of value ${value}`);
   }
}

/**
 * Fix integer value by interpreting unknown value as integer or return default value.
 */
export function fixInt<T extends number>(value: unknown): T;
export function fixInt<T extends number>(value: unknown, defaultValue: T): T;
export function fixInt<T extends number>(
   value: unknown,
   defaultValue: T | [T, T],
   range: T[],
): T;
export function fixInt<T extends number>(
   value: unknown,
   defaultValue?: T | [T, T],
   range?: T[],
): T {
   if (typeof defaultValue === 'number' && !Number.isInteger(defaultValue)) {
      throw new TypeError(`Default value must be integer; received ${value}`);
   }
   if (
      Array.isArray(defaultValue) &&
      defaultValue.some((dv) => !Number.isInteger(dv))
   ) {
      throw new TypeError(
         `Default value in array must be integer; received ${defaultValue}`,
      );
   }
   if (range && range.some((n) => !Number.isInteger(n))) {
      throw new TypeError(`Range value must be integer; received ${range}`);
   }
   switch (typeof value) {
      case 'number':
         if (isNaN(value)) {
            if (range && !range.includes(value as T)) {
               if (typeof defaultValue === 'number') {
                  value = defaultValue;
               } else if (Array.isArray(defaultValue)) {
                  value = clamp(value as T, defaultValue[0], defaultValue[1]);
               } else {
                  value = clamp(
                     value as T,
                     range.at(0) ?? 0,
                     range.at(-1) ?? 0,
                  );
               }
               return value as T;
            }
            throw new TypeError(`Could not evaluate number for ${value}`);
         }
         value = Math.round(value);
         if (range && !range.includes(value as T)) {
            if (typeof defaultValue === 'number') {
               value = defaultValue;
            } else if (Array.isArray(defaultValue)) {
               value = clamp(value as T, defaultValue[0], defaultValue[1]);
            } else {
               value = clamp(value as T, range.at(0) ?? 0, range.at(-1) ?? 0);
            }
         }
         return value as T;
      case 'string': {
         const val = parseInt(value);
         if (isNaN(val)) {
            throw new TypeError(`Could not evaluate number for ${value}`);
         }
         if (range && !range.includes(val as T)) {
            if (typeof defaultValue === 'number') {
               value = defaultValue;
            } else if (Array.isArray(defaultValue)) {
               value = clamp(val as T, defaultValue[0], defaultValue[1]);
            } else {
               value = clamp(val, range.at(0) ?? 0, range.at(-1) ?? 0);
            }
         }
         return val as T;
      }
      case 'boolean':
         if (typeof defaultValue === 'number') {
            value = defaultValue;
         } else if (Array.isArray(defaultValue)) {
            value = defaultValue[0];
         } else if (range) {
            value = range.at(0) ?? 0;
         }
         throw new TypeError('Could not evaluate float value from boolean');
      default:
         if (typeof defaultValue === 'number') {
            value = defaultValue;
         } else if (Array.isArray(defaultValue)) {
            value = defaultValue[0];
         } else if (range) {
            value = range.at(0) ?? 0;
         }
         throw new TypeError(`Could not determine type of value ${value}`);
   }
}

/**
 * Fix float value by interpreting unknown value as float or return default value.
 */
export function fixFloat(value: unknown): number;
export function fixFloat(value: unknown, defaultValue: number): number;
export function fixFloat(
   value: unknown,
   defaultValue: number,
   min: number,
   max: number,
): number;
export function fixFloat(
   value: unknown,
   defaultValue?: number,
   min?: number,
   max?: number,
): number {
   if (typeof defaultValue === 'number' && isNaN(defaultValue)) {
      throw new TypeError(`Default value must not be NaN`);
   }
   switch (typeof value) {
      case 'number':
         if (typeof min === 'number' && typeof max === 'number') {
            return clamp(value, min, max);
         }
         return value;
      case 'string': {
         const val = parseFloat(value);
         if (isNaN(val)) {
            throw new TypeError(`Could not evaluate number for ${value}`);
         }
         if (typeof min === 'number' && typeof max === 'number') {
            return clamp(val, min, max);
         }
         return val;
      }
      case 'boolean':
         if (typeof defaultValue === 'number') {
            return defaultValue;
         }
         throw new TypeError('Could not evaluate float value from boolean');
      default:
         if (typeof defaultValue === 'number') {
            return defaultValue;
         }
         throw new TypeError(`Could not determine type of value ${value}`);
   }
}

/**
 * Fix string value by interpreting unknown value as string or return default value.
 */
export function fixString<T extends string>(value: unknown): T;
export function fixString<T extends string>(value: unknown, defaultValue: T): T;
export function fixString<T extends string>(
   value: unknown,
   defaultValue?: T,
): T {
   if (typeof defaultValue === 'string' && !defaultValue.trim()) {
      throw new TypeError(`Default string cannot be empty`);
   }
   switch (typeof value) {
      case 'string':
         return value as T;
      case 'number':
         return value.toString() as T;
      case 'boolean':
         if (typeof defaultValue === 'string') {
            return defaultValue;
         }
         throw new TypeError('Could not evaluate string value from boolean');
      default:
         if (typeof defaultValue === 'string') {
            return defaultValue;
         }
         throw new TypeError(`Could not determine type of value ${value}`);
   }
}

/**
 * Fix string array value by interpreting unknown value as string array or return default value.
 */
export function fixStringAry(value: unknown[], defaultValue: string): string[] {
   return value.map((v) => fixString(v, defaultValue));
}

const easingsList = Object.keys(EasingsFn) as Easings[];
const modifiersList: PointModifier[] = [
   'opNone',
   'opAdd',
   'opSub',
   'opMul',
   'opMul',
];

/**
 * Fix vector value by interpreting unknown value as vector or return default value.
 */
export function fixVector2(value: unknown, defaultValue: Vector2): Vector2 {
   return Array.isArray(value)
      ? [
         fixFloat(value.at(0), defaultValue[0]),
         fixFloat(value.at(1), defaultValue[1]),
      ]
      : defaultValue;
}

/**
 * Fix vector value by interpreting unknown value as vector or return default value.
 */
export function fixVector3(value: unknown, defaultValue: Vector3): Vector3 {
   return Array.isArray(value)
      ? [
         fixFloat(value.at(0), defaultValue[0]),
         fixFloat(value.at(1), defaultValue[1]),
         fixFloat(value.at(2), defaultValue[2]),
      ]
      : defaultValue;
}

/**
 * Fix vector value by interpreting unknown value as vector or return default value.
 */
export function fixVector4(value: unknown, defaultValue: Vector4): Vector4 {
   return Array.isArray(value)
      ? [
         fixFloat(value.at(0), defaultValue[0]),
         fixFloat(value.at(1), defaultValue[1]),
         fixFloat(value.at(2), defaultValue[2]),
         fixFloat(value.at(3), defaultValue[3]),
      ]
      : defaultValue;
}

/**
 * Fix color value by interpreting unknown value as color or return default value.
 */
export function fixColor(value: unknown, defaultValue: ColorArray): ColorArray {
   return Array.isArray(value)
      ? [
         fixFloat(value.at(0), defaultValue[0]),
         fixFloat(value.at(1), defaultValue[1]),
         fixFloat(value.at(2), defaultValue[2]),
         fixFloat(value.at(3), defaultValue.at(3) ?? 1),
      ]
      : defaultValue;
}

/**
 * Fix float point definition value by interpreting unknown value as float point definition or return default value.
 */
export function fixFloatPointDefinition(
   value: unknown,
   defaultValue: number,
): FloatPointDefinition[] {
   return Array.isArray(value)
      ? value
         .filter((ary) => Array.isArray(ary))
         .map((elm: unknown[]) => {
            const temp = [
               fixFloat(elm.at(0), defaultValue),
               fixFloat(elm.at(1), 1, 0, 1),
            ] as FloatPointDefinition;
            if (elm.length > 2) {
               const attr = elm.slice(3).filter((e) => typeof e === 'string');
               const ease = attr.find((e) => easingsList.includes(e as Easings));
               const spline = attr.find((e) => e === 'splineCatmullRom');
               const modifier = attr.find((e) => modifiersList.includes(e as PointModifier));
               let idx = 2;
               if (ease) {
                  temp[idx++] = ease as Easings;
               }
               if (spline) {
                  temp[idx++] = spline as 'splineCatmullRom';
               }
               if (modifier) {
                  temp[idx++] = modifier as PointModifier;
               }
            }
            return temp as FloatPointDefinition;
         })
      : [];
}

/**
 * Fix vector point definition value by interpreting unknown value as vector point definition or return default value.
 */
export function fixVector3PointDefinition(
   value: unknown,
   defaultValue: Vector3,
): Vector3PointDefinition[] {
   return Array.isArray(value)
      ? value
         .filter((ary) => Array.isArray(ary) || typeof ary === 'string')
         .map((elm: unknown[] | string) => {
            if (typeof elm === 'string') return elm as BaseModifierNE;
            const temp = [
               fixFloat(elm.at(0), defaultValue[0]),
               fixFloat(elm.at(1), defaultValue[1]),
               fixFloat(elm.at(2), defaultValue[2]),
               fixFloat(elm.at(3), 1, 0, 1),
            ] as Exclude<Vector3PointDefinition, string>;
            if (elm.length > 4) {
               const attr = elm.slice(4).filter((e) => typeof e === 'string');
               const ease = attr.find((e) => easingsList.includes(e as Easings));
               const spline = attr.find((e) => e === 'splineCatmullRom');
               const modifier = attr.find((e) => modifiersList.includes(e as PointModifier));
               let idx = 4;
               if (ease) {
                  temp[idx++] = ease as Easings;
               }
               if (spline) {
                  temp[idx++] = spline as 'splineCatmullRom';
               }
               if (modifier) {
                  temp[idx++] = modifier as PointModifier;
               }
            }
            return temp as Vector3PointDefinition;
         })
      : [];
}

/**
 * Fix vector point definition value by interpreting unknown value as vector point definition or return default value.
 */
export function fixVector4PointDefinition(
   value: unknown,
   defaultValue: Vector4,
): Vector4PointDefinition[] {
   return Array.isArray(value)
      ? value
         .filter((ary) => Array.isArray(ary) || typeof ary === 'string')
         .map((elm: unknown[] | string) => {
            if (typeof elm === 'string') return elm as BaseModifierChroma;
            const temp = [
               fixFloat(value.at(0), defaultValue[0]),
               fixFloat(value.at(1), defaultValue[1]),
               fixFloat(value.at(2), defaultValue[2]),
               fixFloat(value.at(3), defaultValue[3]),
               fixFloat(elm.at(4), 1, 0, 1),
            ] as Exclude<Vector4PointDefinition, string>;
            if (elm.length > 5) {
               const attr = elm.slice(5).filter((e) => typeof e === 'string');
               const ease = attr.find((e) => easingsList.includes(e as Easings));
               const lerp = attr.find((e) => e === 'lerpHSV');
               const modifier = attr.find((e) => modifiersList.includes(e as PointModifier));
               let idx = 5;
               if (ease) {
                  temp[idx++] = ease as Easings;
               }
               if (lerp) {
                  temp[idx++] = lerp as 'lerpHSV';
               }
               if (modifier) {
                  temp[idx++] = modifier as PointModifier;
               }
            }
            return temp as Vector4PointDefinition;
         })
      : [];
}
