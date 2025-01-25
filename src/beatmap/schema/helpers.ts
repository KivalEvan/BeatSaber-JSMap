// deno-lint-ignore-file no-explicit-any
import type {
   ArraySchema,
   BaseIssue,
   Default,
   GenericSchema,
   InferInput,
   InferObjectOutput,
   InferOutput,
   IssuePathItem,
   MetadataAction,
   ObjectEntries,
   ObjectSchema,
   OptionalSchema,
   OutputDataset,
   PipeItem,
   SchemaWithPipe,
} from '@valibot/valibot';
import {
   isOfType,
   metadata,
   object,
   optional,
   pipe,
   rawCheck,
   safeParse,
   unwrap,
} from '@valibot/valibot';
import { logger } from '../../logger.ts';
import type { Version } from '../../types/beatmap/shared/version.ts';
import { compareVersion } from '../helpers/version.ts';

type GenericItem<
   TInput = unknown,
   TOutput = TInput,
   TIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
> = PipeItem<TInput, TOutput, TIssue>;

/** @internal Used to create the correct inferred types for a provided key/value record. */
export type InferObjectEntries<T> = {
   [key in NonNullable<keyof T>]: GenericSchema<T[key], T[key]>;
};

interface FieldSchemaOptions {
   /** The semantic version used for comparison when performing versioning checks for entity schemas. */
   version: Version;
}
/** Helper function to augment a schema with the necessary context for validation within a top-level entity schema. */
export function field<
   const TSchema extends GenericSchema,
   const TItems extends GenericItem<InferInput<TSchema>, InferOutput<TSchema>>[],
>(
   schema: TSchema | SchemaWithPipe<[TSchema, ...TItems]>,
   options?: FieldSchemaOptions,
) {
   const [base, ...rest] = 'pipe' in schema ? schema.pipe : [schema];
   // hack: because valibot does not support preprocessing, it will assume all keys should be present and validated regardless of its supported version(s).
   // we need to optionalize the provided schema to bypass this quirk and allow the version checks to run without failing early
   return pipe(
      optional(base),
      ...rest,
      metadata({ version: options?.version }),
   ) as unknown as SchemaWithPipe<
      [TSchema, ...TItems, MetadataAction<InferInput<TSchema>, Readonly<FieldMetadata>>]
   >;
}

interface FieldMetadata {
   readonly version?: Version;
}

type VersionCheckContext<T extends GenericSchema> = {
   dataset: OutputDataset<InferInput<T>, BaseIssue<unknown>>;
   addIssue: (
      info: Parameters<Parameters<Parameters<typeof rawCheck>[0]>[0]['addIssue']>[0],
   ) => void;
};
function checkVersion<
   const TSchema extends GenericSchema,
   const TItems extends (
      | GenericItem<InferInput<TSchema>, InferOutput<TSchema>>
      | MetadataAction<InferInput<TSchema>, Readonly<FieldMetadata>>
   )[],
>(
   schema: TSchema | SchemaWithPipe<[TSchema, ...TItems]>,
   { version, dataset, addIssue }: VersionCheckContext<TSchema> & FieldSchemaOptions,
) {
   const [base, ...pipeline] = 'pipe' in schema ? schema.pipe : [schema];
   let unwrapped = base;
   // unwrap the schema from its optionalized parent
   if ('wrapped' in unwrapped) {
      unwrapped = unwrap(
         unwrapped as unknown as OptionalSchema<TSchema, Default<TSchema, undefined>>,
      );
   }
   // extract the metadata from the pipeline to get the required context for versioning checks
   const ctx = pipeline.find((x) => x.kind === 'metadata') as MetadataAction<
      InferInput<TSchema>,
      Readonly<FieldMetadata>
   >;

   logger.tDebug(
      ['schema', 'checkVersion'],
      [
         `for ${unwrapped.type}:`,
         `  schema version: \t${ctx?.metadata.version ?? 'undefined'}`,
         `  dataset version: \t${version}`,
      ].join('\n'),
   );

   if (ctx && ctx.metadata.version) {
      // if metadata is present, check for version mismatches on existing fields
      const { version: schemaVersion } = ctx.metadata;
      const comparator = compareVersion(version, schemaVersion);
      // if the field has an unsupported version and a value is present...
      if (comparator < 0 && dataset.value !== undefined) {
         return addIssue({
            message: 'Mismatched version for field',
            input: dataset.value,
            received: version,
            expected: schemaVersion,
         });
      }
      // if the field has a supported version and a value is missing for the field...
      const isOptionalizedSchema = ['optional', 'undefinedable'].includes(unwrapped.type);
      if (comparator >= 0 && dataset.value === undefined && !isOptionalizedSchema) {
         return addIssue({
            message: 'Missing required value for versioned field',
            input: dataset.value,
            received: typeof dataset.value,
            expected: unwrapped.type,
         });
      }
   } else {
      // if metadata is not present, skip the version checks entirely and run the original validation flow
      const { issues } = safeParse(unwrapped, dataset.value);
      for (const issue of issues ?? []) {
         return addIssue(issue as any);
      }
   }
   // for array data, cascade checks to all items
   if (isOfType('array', unwrapped) && Array.isArray(dataset.value)) {
      const schema = (unwrapped as unknown as ArraySchema<GenericSchema, undefined>).item;
      for (const [key, value] of dataset.value.entries()) {
         checkVersion(schema, {
            version,
            addIssue: (info) => {
               const path: IssuePathItem = {
                  type: 'array',
                  origin: 'value',
                  input: dataset.value as unknown[],
                  key: key,
                  value: value,
               };
               return addIssue({ ...info, path: [path, ...(info?.path ?? [])] });
            },
            dataset: { ...dataset, value: value },
         });
      }
   }
   // for object data, cascade checks to all key/value entries
   if (isOfType('object', unwrapped)) {
      const entries = (unwrapped as unknown as ObjectSchema<ObjectEntries, undefined>).entries;
      for (const [key, schema] of Object.entries(entries)) {
         const value = (dataset.value as Record<string, unknown>)?.[key];
         checkVersion(schema, {
            version,
            addIssue: (info) => {
               const path: IssuePathItem = {
                  type: 'object',
                  origin: 'value',
                  input: dataset.value as Record<string, unknown>,
                  key: key,
                  value: value,
               };
               return addIssue({ ...info, path: [path, ...(info?.path ?? [])] });
            },
            dataset: { ...dataset, value: value },
         });
      }
   }
}

/** Helper function to create an "entity" (object-like) schema, which recursively performs version checks on all nested entries. */
export function entity<const TEntries extends InferObjectEntries<Record<string, unknown>>>(
   resolveVersion: (data: InferObjectOutput<TEntries>) => Version,
   entries: TEntries,
) {
   return pipe(
      // we assume no additional fields are present other than what is supported by the schema.
      // if we have unknown entries, we'll simply omit them from the validation output and pass validation as normal.
      // that way, future updates that introduce new fields won't break existing validation flows.
      object<TEntries>(entries),
      rawCheck(({ dataset, addIssue }) => {
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
                  const path: IssuePathItem = {
                     type: 'object',
                     origin: 'value',
                     input: dataset.value,
                     key: key,
                     value: value,
                  };
                  return addIssue({ ...info, path: [path, ...(info?.path ?? [])] });
               },
            });
         }
      }),
   );
}

/** Helper function to cast the inferred input of a schema to a different type. */
export function mask<TMask, const TSchema extends GenericSchema = GenericSchema>(schema: TSchema) {
   type TInferMask = TMask extends InferInput<TSchema> ? TMask : never;
   return schema as GenericSchema<TInferMask, TInferMask>;
}
