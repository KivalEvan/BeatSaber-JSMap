import type { StandardSchemaV1 } from '../../deps.ts';
import type { IBaseFactoryBuilder } from '../../types/factory/builder.ts';
import type { IValidateOptions } from '../../types/factory/options.ts';

const DEFAULT_OPTIONS: IValidateOptions = {
   throwable: true,
};

/** A processor that ensures the contents of a serial data type matches the provided schema. */
export function validateContents<T>(
   builder: IBaseFactoryBuilder,
   data: unknown,
   schema: StandardSchemaV1<T>,
   userOptions?: Partial<IValidateOptions>,
) {
   const { name, logger } = builder;
   const log = logger({ tags: [name, 'validator'] });
   const options = { ...DEFAULT_OPTIONS, ...userOptions };

   const result = schema['~standard'].validate(data) as StandardSchemaV1.Result<T>;

   if (!result.issues || result.issues?.length === 0) return;

   const buffer = (result.issues ?? []).filter((_, i) => i < 100);
   for (const issue of buffer) {
      log.error(issue.message);
      if (options?.throwable) {
         throw new Error(issue.message, { cause: issue.path });
      }
   }
}
