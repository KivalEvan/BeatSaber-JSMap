// deno-lint-ignore-file no-explicit-any
import { v } from '../../deps.ts';
import { logger } from '../../logger.ts';
import type { Version } from '../../types/beatmap/shared/version.ts';
import { isRecord } from '../../utils/misc/json.ts';
import { compareVersion } from '../helpers/version.ts';

/** @internal Used to create the correct inferred types for a provided key/value record. */
export type InferObjectEntries<T> = {
   [key in NonNullable<keyof T>]: v.GenericSchema<T[key], T[key]>;
};

interface FieldSchemaOptions {
   /** The semantic version used for comparison when performing versioning checks for entity schemas. */
   version: Version;
}
/** Helper function to augment a schema with the necessary context for validation within a top-level entity schema. */
export function field<
   const TSchema extends v.GenericSchema,
   const TItems extends v.GenericPipeItem<
      v.InferInput<TSchema>,
      v.InferOutput<TSchema>
   >[],
>(
   schema: TSchema | v.SchemaWithPipe<readonly [TSchema, ...TItems]>,
   options?: FieldSchemaOptions,
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
         v.MetadataAction<v.InferInput<TSchema>, Readonly<FieldMetadata>>,
      ]
   >;
}

interface FieldMetadata {
   readonly version?: Version;
}

type VersionCheckContext<T extends v.GenericSchema> = {
   dataset: v.OutputDataset<v.InferInput<T>, v.BaseIssue<unknown>>;
   addIssue: (
      info: Parameters<
         Parameters<Parameters<typeof v.rawCheck>[0]>[0]['addIssue']
      >[0],
   ) => void;
};
function checkVersion<
   const TSchema extends v.GenericSchema,
   const TItems extends (
      | v.GenericPipeItem<v.InferInput<TSchema>, v.InferOutput<TSchema>>
      | v.MetadataAction<v.InferInput<TSchema>, Readonly<FieldMetadata>>
   )[],
>(
   schema: TSchema | v.SchemaWithPipe<[TSchema, ...TItems]>,
   {
      version,
      dataset,
      addIssue,
   }: VersionCheckContext<TSchema> & FieldSchemaOptions,
) {
   const [base, ...pipeline] = 'pipe' in schema ? schema.pipe : [schema];
   let unwrapped = base;
   // unwrap the schema from its optionalized parent
   if ('wrapped' in unwrapped) {
      unwrapped = v.unwrap(
         unwrapped as unknown as v.OptionalSchema<
            TSchema,
            v.Default<TSchema, undefined>
         >,
      );
   }
   // extract the metadata from the pipeline to get the required context for versioning checks
   const ctx = pipeline.find((x) => x.kind === 'metadata') as v.MetadataAction<
      v.InferInput<TSchema>,
      Readonly<FieldMetadata>
   >;

   logger.tDebug(
      ['schema', 'checkVersion'],
      `for ${unwrapped.type}:\n  schema version: \t${
         ctx?.metadata.version ?? 'undefined'
      }\n  dataset version: \t${version}`,
   );

   const input = dataset.value;

   if (ctx && ctx.metadata.version) {
      // if metadata is present, check for version mismatches on existing fields
      const { version: schemaVersion } = ctx.metadata;
      const comparator = compareVersion(version, schemaVersion);
      // if the field has an unsupported version and a value is present...
      if (comparator < 0 && input !== undefined) {
         return addIssue({
            message: 'Mismatched version for field',
            input: input,
            received: version,
            expected: schemaVersion,
         });
      }
      // if the field has a supported version and a value is missing for the field...
      const isOptionalizedSchema = ['optional', 'undefinedable'].includes(
         unwrapped.type,
      );
      if (comparator >= 0 && input === undefined && !isOptionalizedSchema) {
         return addIssue({
            message: 'Missing required value for versioned field',
            input: input,
            received: typeof input,
            expected: unwrapped.type,
         });
      }
   } else {
      // if metadata is not present, skip the version checks entirely and run the original validation flow
      const { issues } = v.safeParse(unwrapped, dataset.value);
      for (const issue of issues ?? []) {
         return addIssue(issue as any);
      }
   }
   // for array data, cascade checks to all items
   if (v.isOfType('array', unwrapped) && Array.isArray(input)) {
      const schema = (
         unwrapped as unknown as v.ArraySchema<v.GenericSchema, undefined>
      ).item;
      for (let i = 0; i < input.length; i++) {
         const value = input[i];
         checkVersion(schema, {
            version,
            addIssue: (info) => {
               const path: v.IssuePathItem = {
                  type: 'array',
                  origin: 'value',
                  input: input as any,
                  key: i,
                  value: value,
               };
               return addIssue({
                  ...info,
                  path: [path, ...(info?.path ?? [])],
               });
            },
            dataset: { ...dataset, value: value },
         });
      }
   }
   // for object data, cascade checks to all key/value entries
   if (v.isOfType('object', unwrapped) && isRecord(input)) {
      const entries = (
         unwrapped as unknown as v.ObjectSchema<v.ObjectEntries, undefined>
      ).entries;
      for (const key in entries) {
         const value = input[key];
         checkVersion(entries[key], {
            version,
            addIssue: (info) => {
               const path: v.IssuePathItem = {
                  type: 'object',
                  origin: 'value',
                  input: input,
                  key: key,
                  value: value,
               };
               return addIssue({
                  ...info,
                  path: [path, ...(info?.path ?? [])],
               });
            },
            dataset: { ...dataset, value: value },
         });
      }
   }
}

/** Helper function to create an "entity" (object-like) schema, which recursively performs version checks on all nested entries. */
export function entity<
   const TEntries extends InferObjectEntries<Record<string, unknown>>,
>(
   resolveVersion: (data: v.InferOutput<v.ObjectSchema<TEntries, undefined>>) => Version,
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
         // run version checks for all key/value entries defined within the schema
         for (const key of Object.keys(entries)) {
            const value = dataset.value[key as keyof typeof dataset.value];
            checkVersion(entries[key], {
               version,
               dataset: { ...dataset, value },
               addIssue: (info) => {
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
               },
            });
         }
      }),
   );
}

/** Helper function to cast the inferred input of a schema to a different type. */
export function mask<
   TMask,
   const TSchema extends v.GenericSchema = v.GenericSchema,
>(schema: TSchema) {
   type TInferMask = TMask extends v.InferInput<TSchema> ? TMask : never;
   return schema as v.GenericSchema<TInferMask, TInferMask>;
}
