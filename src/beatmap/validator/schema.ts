import type { StandardSchemaV1 } from '@standard-schema/spec';
import { getLogger } from '../../logger.ts';
import type { ISchemaCheckOptions } from '../mapping/types/schema.ts';
import type { ISchemaDeclaration } from '../schema/shared/types/schema.ts';
import type { Version } from '../schema/shared/types/version.ts';
import { isRecord } from '../../utils/misc/json.ts';
import { compareVersion } from '../helpers/version.ts';

function tag(vendor?: string): string[] {
   let tags = ['helpers', 'schemaCheck'];
   if (vendor) tags = tags.concat(vendor);
   return tags;
}

interface ErrorOptions {
   vendor?: string;
   doThrow?: boolean;
}

/** Categories used to classify Standard Schema issues. */
type ThrowCategory =
   | 'unused'
   | 'missing'
   | 'nullish'
   | 'wrongType'
   | 'notInt'
   | 'notUnsigned';

/** Vendor fields used during issue classification. */
interface VendorSchemaIssue extends StandardSchemaV1.Issue {
   readonly input?: unknown;
   readonly kind?: unknown;
   readonly received?: unknown;
   readonly requirement?: unknown;
   readonly type?: unknown;
}

/**
 * Map an observed Valibot issue shape to its `throwOn` category.
 *
 * @example A nested path with an `origin: 'key'` segment maps to `missing`.
 * @returns `undefined` for unknown shapes.
 */
function classifyIssue(issue: StandardSchemaV1.Issue): ThrowCategory | undefined {
   const vendor = issue as VendorSchemaIssue;
   const message = issue.message ?? '';

   if (/^Invalid integer/.test(message)) return 'notInt';
   if (
      (vendor.type === 'min_value' && vendor.requirement === 0) ||
      /^Invalid value: Expected >=0\b/.test(message)
   ) {
      return 'notUnsigned';
   }
   if (message.includes('Missing required value')) return 'missing';
   if (message.includes('Mismatched version')) return 'wrongType';

   if (
      issue.path?.some((segment) => (
         typeof segment === 'object' &&
         segment !== null &&
         'origin' in segment &&
         segment.origin === 'key'
      ))
   ) {
      return 'missing';
   }

   const received = typeof vendor.received === 'string' ? vendor.received : '';
   const inputIsNullish = 'input' in vendor &&
      (vendor.input === null || vendor.input === undefined);
   if (
      inputIsNullish ||
      received === 'NaN' ||
      message.includes('NaN')
   ) {
      return 'nullish';
   }
   if (vendor.kind === 'schema') return 'wrongType';
   return undefined;
}
function handleError(
   issue: StandardSchemaV1.Issue,
   options: Partial<ErrorOptions>,
   errors: StandardSchemaV1.Issue[],
): void {
   const logger = getLogger();

   const path = issue.path
      ?.map((segment) => {
         if (typeof segment === 'object' && 'key' in segment) {
            return segment.key;
         }
         return segment;
      })
      .map((x, i) => {
         if (i === 0) return x;
         if (typeof x === 'number') return `[${x}]`;
         return `.${x.toString()}`;
      })
      .join('');
   if (options.doThrow) {
      throw new Error(`${issue.message}${path ? ` at "${path}"` : ''}`);
   } else {
      logger?.tWarn(
         tag(options.vendor),
         `${issue.message}${path ? ` at "${path}"` : ''}`,
      );
      errors.push(issue);
   }
}

function isStandardSchema<T extends StandardSchemaV1>(
   schema: object,
): schema is T {
   return '~standard' in schema;
}

/**
 * Validate data against a declaration or Standard Schema.
 *
 * @example schemaCheck(data, schema, 'difficulty', 3, { missing: true });
 */
export function schemaCheck<
   Schema extends { [key: string]: ISchemaDeclaration } | StandardSchemaV1,
>(
   data: unknown,
   schema: Schema,
   label: string,
   version: Version | undefined = undefined,
   throwOn: Partial<ISchemaCheckOptions['throwOn']> = {},
   _errors: StandardSchemaV1.Issue[] = [],
): StandardSchemaV1.Issue[] {
   const logger = getLogger();

   if (isStandardSchema(schema)) {
      let buffer: StandardSchemaV1.Issue[] = [];
      const result = schema['~standard'].validate(data);
      if ('issues' in result && result.issues) {
         // hack: adding a manual buffer since too many issues being processed at once can cause validation to hang
         buffer = result.issues.filter((_, i) => i < 100) ?? [];
         // Unknown issue shapes throw if any issue category is enabled.
         const anyThrow = (
            ['unused', 'missing', 'nullish', 'wrongType', 'notInt', 'notUnsigned'] as const
         ).some((category) => throwOn[category]);
         for (const issue of buffer) {
            const category = classifyIssue(issue);
            handleError(
               issue,
               {
                  vendor: schema['~standard'].vendor,
                  doThrow: category ? Boolean(throwOn[category]) : anyThrow,
               },
               _errors,
            );
         }
         if (result.issues.length > buffer.length) {
            logger?.tWarn(
               tag(schema['~standard'].vendor),
               'Max issue buffer has been reached.',
            );
         }
      }
      return [...buffer];
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

   if (!isRecord(data)) {
      return _errors;
   }

   for (const key in data) {
      if (!(key in schema)) {
         handleError(
            { message: `Unused key ${key} found in ${label}` },
            {
               vendor: 'bsmap',
               doThrow: throwOn.unused,
            },
            _errors,
         );
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
         handleError(
            { message: `Missing ${key} in object ${label}!` },
            {
               vendor: 'bsmap',
               doThrow: throwOn.missing,
            },
            _errors,
         );
         continue;
      }

      if (d === null) {
         handleError(
            { message: `${key} contain null value in object ${label}!` },
            {
               vendor: 'bsmap',
               doThrow: throwOn.nullish,
            },
            _errors,
         );
         continue;
      }

      if (ch.type === 'array') {
         if (!Array.isArray(d)) {
            handleError(
               { message: `${key} is not an array in object ${label}!` },
               {
                  vendor: 'bsmap',
                  doThrow: throwOn.wrongType,
               },
               _errors,
            );
         }
         schemaCheck(d, ch.check, `${label}.${key}`, version, throwOn);
         continue;
      }

      if (ch.type === 'object') {
         if (!Array.isArray(d) && !(typeof d === 'object')) {
            handleError(
               { message: `${key} is not an object in object ${label}!` },
               {
                  vendor: 'bsmap',
                  doThrow: throwOn.wrongType,
               },
               _errors,
            );
         } else {
            schemaCheck(d, ch.check, `${label}.${key}`, version, throwOn);
         }
         continue;
      }

      if (ch.array) {
         if (!Array.isArray(d)) {
            handleError(
               { message: `${key} is not ${ch.type} in object ${label}!` },
               {
                  vendor: 'bsmap',
                  doThrow: throwOn.wrongType,
               },
               _errors,
            );
            continue;
         }
         if (
            !d.every(
               (n: unknown) =>
                  typeof n === ch.type ||
                  (ch.type === 'number' &&
                     typeof n === 'number' &&
                     (isNaN(n) ||
                        ((ch.int ? n % 1 !== 0 : true) &&
                           (ch.unsigned ? n < 0 : true)))),
            )
         ) {
            handleError(
               { message: `${key} is not ${ch.type} in object ${label}!` },
               {
                  vendor: 'bsmap',
                  doThrow: throwOn.wrongType,
               },
               _errors,
            );
         }
         continue;
      }

      if (!ch.array && typeof d !== ch.type) {
         handleError(
            { message: `${key} is not ${ch.type} in object ${label}!` },
            {
               vendor: 'bsmap',
               doThrow: throwOn.wrongType,
            },
            _errors,
         );
         continue;
      }

      if (ch.type === 'number' && typeof d === 'number') {
         if (isNaN(d)) {
            handleError(
               { message: `${label}.${key} is NaN!` },
               {
                  vendor: 'bsmap',
                  doThrow: throwOn.nullish,
               },
               _errors,
            );
            continue;
         }
         if (ch.int && d % 1 !== 0) {
            handleError(
               { message: `${label}.${key} cannot be float!` },
               {
                  vendor: 'bsmap',
                  doThrow: throwOn.notInt,
               },
               _errors,
            );
            continue;
         }
         if (ch.unsigned && d < 0) {
            handleError(
               { message: `${label}.${key} cannot be negative!` },
               {
                  vendor: 'bsmap',
                  doThrow: throwOn.notUnsigned,
               },
               _errors,
            );
            continue;
         }
      }
   }
   return _errors;
}
