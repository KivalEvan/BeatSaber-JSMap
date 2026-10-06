// deno-lint-ignore-file no-explicit-any
import * as v from 'valibot';
import { getLogger } from '../../logger.ts';
import type { Version } from '../schema/shared/types/version.ts';
import { isRecord } from '../../utils/misc/json.ts';
import { compareVersion } from '../helpers/version.ts';

/** @internal Used to create the correct inferred types for a provided key/value record. */
export type InferObjectEntries<T> = {
   [key in NonNullable<keyof T>]: v.GenericSchema<T[key], T[key]>;
};

interface IFieldSchemaOptions {
   /** The semantic version used for comparison when performing versioning checks for entity schemas. */
   version: Version;
}
/** Helper function to augment a schema with the necessary context for validation within a top-level entity schema. */
// @__NO_SIDE_EFFECTS__
export function field<
   const TSchema extends v.GenericSchema,
   const TItems extends v.GenericPipeItem<
      v.InferInput<TSchema>,
      v.InferOutput<TSchema>
   >[],
>(
   schema: TSchema | v.SchemaWithPipe<readonly [TSchema, ...TItems]>,
   options?: IFieldSchemaOptions,
) {
   const [base, ...rest] = 'pipe' in schema ? schema.pipe : [schema];
   // hack: because valibot does not support preprocessing, it will assume all keys should be present and validated regardless of its supported version(s).
   // we need to optionalize the provided schema to bypass this quirk and allow the version checks to run without failing early
   return v.pipe(
      v.optional(base),
      ...rest,
      v.metadata({ version: options?.version }),
   ) as unknown as v.SchemaWithPipe<
      [
         TSchema,
         ...TItems,
         v.MetadataAction<v.InferInput<TSchema>, Readonly<IFieldMetadata>>,
      ]
   >;
}

interface IFieldMetadata {
   readonly version?: Version;
}

type AddVersionIssue = (
   info: Parameters<
      Parameters<Parameters<typeof v.rawCheck>[0]>[0]['addIssue']
   >[0],
) => void;
type VersionCheck = (
   input: unknown,
   addIssue: AddVersionIssue,
) => boolean | void;

function createVersionCheck(
   schema: v.GenericSchema,
   version: Version,
   comparisons: Map<Version, -1 | 0 | 1>,
   validated = false,
): VersionCheck | undefined {
   const logger = getLogger();

   const [base, ...pipeline] = 'pipe' in schema
      ? (
         schema as v.SchemaWithPipe<
            [v.GenericSchema, ...v.GenericPipeItem[]]
         >
      ).pipe
      : [schema];
   let unwrapped: v.GenericSchema = base;
   // unwrap the schema from its optionalized parent
   if ('wrapped' in unwrapped) {
      unwrapped = v.unwrap(
         unwrapped as v.OptionalSchema<v.GenericSchema, undefined>,
      );
   }
   // extract the metadata from the pipeline to get the required context for versioning checks
   let ctx: v.MetadataAction<unknown, Readonly<IFieldMetadata>> | undefined;
   for (let i = 0; i < pipeline.length; i++) {
      if (pipeline[i].kind === 'metadata') {
         ctx = pipeline[i] as v.MetadataAction<
            unknown,
            Readonly<IFieldMetadata>
         >;
         break;
      }
   }

   logger?.tDebug(
      ['schema', 'checkVersion'],
      `for ${unwrapped.type}:\n  schema version: \t${
         ctx?.metadata.version ?? 'undefined'
      }\n  dataset version: \t${version}`,
   );

   const isOptional = unwrapped.type === 'optional' || unwrapped.type === 'undefinedable';
   let checkValue: VersionCheck | undefined;
   if (ctx?.metadata.version) {
      const { version: schemaVersion } = ctx.metadata;
      let comparator = comparisons.get(schemaVersion);
      if (comparator === undefined) {
         comparator = compareVersion(version, schemaVersion);
         comparisons.set(schemaVersion, comparator);
      }
      if (comparator < 0) {
         return (input, addIssue) => {
            if (input !== undefined) {
               addIssue({
                  message: 'Mismatched version for field',
                  input,
                  received: version,
                  expected: schemaVersion,
               });
               return true;
            }
         };
      }
      if (!isOptional) {
         const expected = unwrapped.type;
         checkValue = (input, addIssue) => {
            if (input === undefined) {
               addIssue({
                  message: 'Missing required value for versioned field',
                  input,
                  received: typeof input,
                  expected,
               });
               return true;
            }
         };
      }
   } else {
      // A successful parent reparse already validated present child values.
      // Absence still needs checking because field() optionalizes required fields.
      // Without a parent reparse, preserve validation and its early return for
      // action issues or transformed values in the initially typed dataset.
      const original = unwrapped;
      checkValue = (input, addIssue) => {
         if (validated && input !== undefined) return;
         const { issues } = v.safeParse(original, input);
         if (issues?.length) {
            addIssue(issues[0] as any);
            return true;
         }
      };
   }
   // Versioned optional containers still need version checks for their present children.
   if (ctx?.metadata.version && isOptional && 'wrapped' in unwrapped) {
      unwrapped = unwrapped.wrapped as v.GenericSchema;
   }
   const childrenValidated = validated || !ctx?.metadata.version;
   if (unwrapped.type === 'array') {
      const { item } = unwrapped as v.ArraySchema<v.GenericSchema, undefined>;
      const checkItem = createVersionCheck(
         item,
         version,
         comparisons,
         childrenValidated,
      );
      if (!checkItem) return checkValue;
      return (input, addIssue) => {
         if (checkValue?.(input, addIssue)) return;
         if (!Array.isArray(input)) return;
         for (let i = 0; i < input.length; i++) {
            const value = input[i];
            checkItem(value, (info) => {
               addIssue({
                  ...info,
                  path: [
                     { type: 'array', origin: 'value', input, key: i, value },
                     ...(info?.path ?? []),
                  ],
               });
            });
         }
      };
   }
   if (unwrapped.type === 'object') {
      const { entries } = unwrapped as v.ObjectSchema<
         v.ObjectEntries,
         undefined
      >;
      const checks: [string, VersionCheck][] = [];
      for (const key in entries) {
         const check = createVersionCheck(
            entries[key],
            version,
            comparisons,
            childrenValidated,
         );
         if (check) checks.push([key, check]);
      }
      if (!checks.length) return checkValue;
      return (input, addIssue) => {
         if (checkValue?.(input, addIssue)) return;
         if (!isRecord(input)) return;
         for (let i = 0; i < checks.length; i++) {
            const [key, check] = checks[i];
            const value = input[key];
            check(value, (info) => {
               addIssue({
                  ...info,
                  path: [
                     { type: 'object', origin: 'value', input, key, value },
                     ...(info?.path ?? []),
                  ],
               });
            });
         }
      };
   }
   return checkValue;
}

/** Helper function to create an "entity" (object-like) schema, which recursively performs version checks on all nested entries. */
// @__NO_SIDE_EFFECTS__
export function entity<
   const TEntries extends InferObjectEntries<Record<string, unknown>>,
>(
   resolveVersion: (
      data: v.InferOutput<v.ObjectSchema<TEntries, undefined>>,
   ) => Version,
   entries: TEntries,
) {
   return v.pipe(
      // we assume no additional fields are present other than what is supported by the schema.
      // if we have unknown entries, we'll simply omit them from the validation output and pass validation as normal.
      // that way, future updates that introduce new fields won't break existing validation flows.
      v.object<TEntries>(entries),
      v.rawCheck(({ dataset, addIssue }) => {
         if (!dataset.typed) return;
         // pull the entity version directly from the entity data using a resolver
         const version = resolveVersion(dataset.value);
         const comparisons = new Map<Version, -1 | 0 | 1>();
         // Resolve checks once per schema, not once per array item. Supported
         // optional subtrees need no second traversal after object validation.
         // run version checks for all key/value entries defined within the schema
         for (const key in entries) {
            const check = createVersionCheck(
               entries[key],
               version,
               comparisons,
            );
            if (!check) continue;
            const value = dataset.value[key as keyof typeof dataset.value];
            check(value, (info) => {
               const path: v.IssuePathItem = {
                  type: 'object',
                  origin: 'value',
                  input: dataset.value,
                  key: key,
                  value: value,
               };
               return addIssue({
                  ...info,
                  path: [path, ...(info?.path ?? [])],
               });
            });
         }
      }),
   );
}

/** Helper function to cast the inferred input of a schema to a different type. */
// @__NO_SIDE_EFFECTS__
export function mask<
   TMask,
   const TSchema extends v.GenericSchema = v.GenericSchema,
>(schema: TSchema) {
   type TInferMask = TMask extends v.InferInput<TSchema> ? TMask : never;
   return schema as v.GenericSchema<TInferMask, TInferMask>;
}
