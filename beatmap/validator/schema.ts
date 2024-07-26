import type { ISchemaDeclaration } from '../../types/beatmap/shared/schema.ts';
import { logger } from '../../logger.ts';
import type { Version } from '../../types/beatmap/shared/version.ts';
import { compareVersion } from '../helpers/version.ts';
import type { ISchemaCheckOptions } from '../../types/beatmap/options/schema.ts';

function tag(): string[] {
   return ['helpers', 'schemaCheck'];
}

function handleError(text: string, doThrow: boolean | undefined, errors: string[]): void {
   if (doThrow) {
      throw new Error(text);
   } else {
      logger.tWarn(tag(), text);
      errors.push(text);
   }
}

/**
 * Deeply check JSON schema given `Data Check` schema.
 *
 * Strict null policy. Return error logs as `string[]` for error inspection.
 */
export function schemaCheck(
   // deno-lint-ignore no-explicit-any
   data: { [key: string]: any },
   schema: { [key: string]: ISchemaDeclaration },
   label: string,
   version: Version,
   throwOn: ISchemaCheckOptions['throwOn'],
   _errors: string[] = [],
): string[] {
   logger.tDebug(tag(), `Looking up ${label}`);
   if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
         schemaCheck(data[i], schema, `${label}[${i}]`, version, throwOn, _errors);
      }
      return _errors;
   }

   // check for existing and/or unknown key
   const checkKeys = Object.keys(schema);
   if (!checkKeys.length) return _errors;

   for (const key in data) {
      if (!(key in schema)) {
         handleError(`Unused key ${key} found in ${label}`, throwOn.unused, _errors);
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
         if (compareVersion(version, ch.version) === -1) {
            continue;
         }
         handleError(`Missing ${key} in object ${label}!`, throwOn.missing, _errors);
         continue;
      }

      if (d === null) {
         handleError(`${key} contain null value in object ${label}!`, throwOn.nullish, _errors);
         continue;
      }

      if (ch.type === 'array') {
         if (!Array.isArray(d)) {
            handleError(`${key} is not an array in object ${label}!`, throwOn.wrongType, _errors);
         }
         schemaCheck(d, ch.check, `${label}.${key}`, version, throwOn, _errors);
         continue;
      }

      if (ch.type === 'object') {
         if (!Array.isArray(d) && !(typeof d === 'object')) {
            handleError(`${key} is not an object in object ${label}!`, throwOn.wrongType, _errors);
         } else {
            schemaCheck(d, ch.check, `${label}.${key}`, version, throwOn, _errors);
         }
         continue;
      }

      if (ch.array) {
         if (!Array.isArray(d)) {
            handleError(`${key} is not ${ch.type} in object ${label}!`, throwOn.wrongType, _errors);
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
            handleError(`${key} is not ${ch.type} in object ${label}!`, throwOn.wrongType, _errors);
         }
         continue;
      }

      if (!ch.array && typeof d !== ch.type) {
         handleError(`${key} is not ${ch.type} in object ${label}!`, throwOn.wrongType, _errors);
         continue;
      }

      if (ch.type === 'number') {
         if (isNaN(d)) {
            handleError(`${label}.${key} is NaN!`, throwOn.nullish, _errors);
            continue;
         }
         if (ch.int && d % 1 !== 0) {
            handleError(`${label}.${key} cannot be float!`, throwOn.notInt, _errors);
            continue;
         }
         if (ch.unsigned && d < 0) {
            handleError(`${label}.${key} cannot be negative!`, throwOn.notUnsigned, _errors);
            continue;
         }
      }
   }
   return _errors;
}
