import type { StandardSchemaV1 } from '@standard-schema/spec';
import { logger } from '../../logger.ts';
import type { ISchemaCheckOptions } from '../../types/beatmap/options/schema.ts';
import type { ISchemaDeclaration } from '../../types/beatmap/shared/schema.ts';
import type { Version } from '../../types/beatmap/shared/version.ts';
import { compareVersion } from '../helpers/version.ts';

function tag(vendor?: string): string[] {
   let tags = ['helpers', 'schemaCheck'];
   if (vendor) tags = tags.concat(vendor);
   return tags;
}

function handleError(
   vendor: string | undefined,
   text: string,
   doThrow: boolean | undefined,
   errors: StandardSchemaV1.Issue[],
): void {
   if (doThrow) {
      throw new Error(text);
   } else {
      logger.tWarn(tag(vendor), text);
      errors.push({ message: text });
   }
}

function isObject<T extends Record<string, unknown>>(data: unknown): data is T {
   return !!data && typeof data === "object";
}
function isStandardSchema<T extends StandardSchemaV1>(schema: object): schema is T {
   return '~standard' in schema;
}

/**
 * Deeply check JSON schema given `Data Check` or `StandardSchemaV1` schema.
 *
 * Strict null policy. Return error logs as `StandardSchemaV1.Issue[]` for error inspection.
 */
export function schemaCheck<Schema extends { [key: string]: ISchemaDeclaration }>(
   data: unknown,
   schema: Schema,
   label: string,
   version?: Version,
   throwOn?: Partial<ISchemaCheckOptions['throwOn']>,
): StandardSchemaV1.Issue[];
export function schemaCheck<Schema extends StandardSchemaV1>(
   data: unknown,
   schema: Schema,
   label: string,
   version?: Version,
   throwOn?: never,
): StandardSchemaV1.Issue[];
export function schemaCheck<Schema extends { [key: string]: ISchemaDeclaration } | StandardSchemaV1>(
   data: unknown,
   schema: Schema,
   label: string,
   version: Version | undefined = undefined,
   throwOn: Partial<ISchemaCheckOptions['throwOn']> = {},
   _errors: StandardSchemaV1.Issue[] = [],
): StandardSchemaV1.Issue[] {
   if (isStandardSchema(schema)) {
      const result = schema['~standard'].validate(data);
      if ('issues' in result) {
         for (const issue of result.issues ?? []) {
            handleError(schema['~standard'].vendor, issue.message, Object.keys(throwOn).length > 0, _errors);
         }
         return [...result.issues ?? []];
      }
      return [];
   }

   if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
         schemaCheck(data[i], schema, `${label}[${i}]`, version, throwOn);
      }
      return _errors;
   }

   // check for existing and/or unknown key
   const checkKeys = Object.keys(schema);
   if (!checkKeys.length) return _errors;

   if (!isObject(data)) {
      return _errors;
   }

   for (const key in data) {
      if (!(key in schema)) {
         handleError(undefined, `Unused key ${key} found in ${label}`, throwOn.unused, _errors);
      }
   }

   for (let i = 0; i < checkKeys.length; i++) {
      const key = checkKeys[i];
      const ch = schema[key];
      const d = data[key];

      if (d === undefined) {
         if (!throwOn.ignoreOptional && schema[key].optional) {
            continue;
         }
         if (ch.version && version) {
            if (compareVersion(version, ch.version) === -1) {
               continue;
            }            
         }
         handleError(undefined, `Missing ${key} in object ${label}!`, throwOn.missing, _errors);
         continue;
      }

      if (d === null) {
         handleError(undefined, `${key} contain null value in object ${label}!`, throwOn.nullish, _errors);
         continue;
      }

      if (ch.type === 'array') {
         if (!Array.isArray(d)) {
            handleError(undefined, `${key} is not an array in object ${label}!`, throwOn.wrongType, _errors);
         }
         schemaCheck(d, ch.check, `${label}.${key}`, version, throwOn);
         continue;
      }

      if (ch.type === 'object') {
         if (!Array.isArray(d) && !(typeof d === 'object')) {
            handleError(undefined, `${key} is not an object in object ${label}!`, throwOn.wrongType, _errors);
         } else {
            schemaCheck(d, ch.check, `${label}.${key}`, version, throwOn);
         }
         continue;
      }

      if (ch.array) {
         if (!Array.isArray(d)) {
            handleError(undefined, `${key} is not ${ch.type} in object ${label}!`, throwOn.wrongType, _errors);
            continue;
         }
         if (
            !d.every(
               (n: unknown) =>
                  typeof n === ch.type ||
                  (ch.type === 'number' &&
                     typeof n === 'number' &&
                     (isNaN(n) || ((ch.int ? n % 1 !== 0 : true) && (ch.unsigned ? n < 0 : true)))),
            )
         ) {
            handleError(undefined, `${key} is not ${ch.type} in object ${label}!`, throwOn.wrongType, _errors);
         }
         continue;
      }

      if (!ch.array && typeof d !== ch.type) {
         handleError(undefined, `${key} is not ${ch.type} in object ${label}!`, throwOn.wrongType, _errors);
         continue;
      }

      if (ch.type === 'number' && typeof d === "number") {
         if (isNaN(d)) {
            handleError(undefined, `${label}.${key} is NaN!`, throwOn.nullish, _errors);
            continue;
         }
         if (ch.int && d % 1 !== 0) {
            handleError(undefined, `${label}.${key} cannot be float!`, throwOn.notInt, _errors);
            continue;
         }
         if (ch.unsigned && d < 0) {
            handleError(undefined, `${label}.${key} cannot be negative!`, throwOn.notUnsigned, _errors);
            continue;
         }
      }
   }
   return _errors;
}
