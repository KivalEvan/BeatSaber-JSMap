import type { StandardSchemaV1 } from '@standard-schema/spec';
import type { ISchemaDeclaration } from '../src/types/beatmap/shared/schema.ts';
import { assertEquals, schemaCheck } from './deps.ts';

function boolean(): StandardSchemaV1 {
   return {
      '~standard': {
         version: 1,
         vendor: 'bsmap',
         validate: (data) => {
            if (typeof data !== 'boolean') {
               return { issues: [{ message: 'Value must be a boolean.' }] };
            }
            return { value: data };
         },
      },
   };
}
function object(shape: { [key: string]: StandardSchemaV1 }): StandardSchemaV1 {
   return {
      '~standard': {
         version: 1,
         vendor: 'bsmap',
         validate: (data) => {
            if (typeof data !== 'object' || !data) {
               return { issues: [{ message: `Value is not an object` }] };
            }
            for (const key of Object.keys(shape)) {
               if (!Object.keys(data).includes(key)) {
                  return { issues: [{ message: `Missing key for object: ${key}` }] };
               }
            }
            const children = Object.keys(shape).reduce((acc, key) => {
               const result = shape[key]['~standard'].validate(data[key as keyof object]);
               if (!('issues' in result) || !result.issues) return acc;
               return acc.concat(
                  ...result.issues.map((x) => {
                     return ({ ...x, path: [key, ...x.path ?? []] });
                  }),
               );
            }, [] as StandardSchemaV1.Issue[]);
            return { issues: children };
         },
      },
   };
}

Deno.test('schemaCheck', async (ctx) => {
   await ctx.step('legacy schema format', async (ctx) => {
      const schema: { [key: string]: ISchemaDeclaration } = {
         foo: { type: 'boolean' },
      };
      await ctx.step('unversioned schema + versioned data', () => {
         const issues = schemaCheck({}, schema, 'sample', '1.0.0');
         assertEquals(issues.length, 1);
      });
      await ctx.step('unversioned schema + unversioned data', () => {
         const issues = schemaCheck({}, schema, 'sample');
         assertEquals(issues.length, 1);
      });
      const versioned: { [key: string]: ISchemaDeclaration } = {
         foo: { type: 'boolean', version: '1.2.0' },
      };
      await ctx.step('versioned schema + unversioned data', () => {
         const issues = schemaCheck({}, versioned, 'sample');
         assertEquals(issues.length, 1);
      });
      await ctx.step('versioned schema + versioned data', () => {
         const issues = schemaCheck({}, versioned, 'sample', '1.0.0');
         assertEquals(issues.length, 0);
      });
   });
   await ctx.step('standard schema format', async (ctx) => {
      const schema = object({ foo: boolean() });
      await ctx.step('unversioned schema + versioned data', () => {
         const issues = schemaCheck({}, schema, 'sample', '1.0.0');
         assertEquals(issues.length, 1);
      });
      await ctx.step('unversioned schema + unversioned data', () => {
         const issues = schemaCheck({}, schema, 'sample');
         assertEquals(issues.length, 1);
      });
   });
});
