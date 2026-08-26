import * as v from 'valibot';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import { entity, field, mask } from '../src/beatmap/schema/helpers.ts';
import * as v4 from '../src/beatmap/schema/v4/declaration/mod.ts';
import type { ISchemaDeclaration } from '../src/beatmap/schema/shared/types/schema.ts';
import type { Version } from '../src/beatmap/schema/shared/types/version.ts';
import { assertEquals, schemaCheck } from './deps.ts';

function boolean(): StandardSchemaV1 {
   return {
      '~standard': {
         version: 1,
         vendor: 'custom',
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
         vendor: 'custom',
         validate: (data) => {
            if (typeof data !== 'object' || !data) {
               return { issues: [{ message: `Value is not an object` }] };
            }
            for (const key of Object.keys(shape)) {
               if (!Object.keys(data).includes(key)) {
                  return {
                     issues: [{ message: `Missing key for object: ${key}` }],
                  };
               }
            }
            const children = Object.keys(shape).reduce((acc, key) => {
               const result = shape[key]['~standard'].validate(
                  data[key as keyof object],
               );
               if (!('issues' in result) || !result.issues) return acc;
               return acc.concat(
                  ...result.issues.map((x) => {
                     return { ...x, path: [key, ...(x.path ?? [])] };
                  }),
               );
            }, [] as StandardSchemaV1.Issue[]);
            return { issues: children };
         },
      },
   };
}

function issueSchema(issue: StandardSchemaV1.Issue): StandardSchemaV1 {
   return {
      '~standard': {
         version: 1,
         vendor: 'custom',
         validate: () => ({ issues: [issue] }),
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
      await ctx.step('custom implementation', () => {
         const issues = schemaCheck({}, schema, 'sample');
         assertEquals(issues.length, 1);
      });
      const versioned = entity(() => '1.0.0', {
         foo: field(v.boolean(), { version: '1.2.0' }),
      });
      await ctx.step('resolve version from dataset', () => {
         const issues = schemaCheck({}, versioned, 'sample');
         assertEquals(issues.length, 0);
      });
   });
   await ctx.step('classifies nested missing keys', () => {
      const issue = {
         message: 'Invalid key',
         path: [
            { type: 'object', origin: 'value', key: 'outer' },
            { type: 'object', origin: 'key', key: 'inner' },
         ],
      } as unknown as StandardSchemaV1.Issue;
      const issues = schemaCheck(
         {},
         issueSchema(issue),
         'sample',
         undefined,
         { missing: false, nullish: true, wrongType: false },
      );
      assertEquals(issues.length, 1);
   });
   await ctx.step('does not classify absent vendor input as nullish', () => {
      const issue = {
         kind: 'schema',
         type: 'object',
         message: 'Invalid value',
      } as StandardSchemaV1.Issue;
      const issues = schemaCheck(
         {},
         issueSchema(issue),
         'sample',
         undefined,
         { nullish: true, wrongType: false },
      );
      assertEquals(issues.length, 1);
   });
});

Deno.test('entity serialization tests', async (ctx) => {
   await ctx.step('basic form', async (ctx) => {
      const schema = entity((x) => x.version, {
         version: mask<Version>(v.string()),
         foo: v.array(
            v.object({
               bar: field(v.boolean(), { version: '1.2.0' }),
            }),
         ),
      });
      await ctx.step('all supported fields present', () => {
         const result = schema['~standard'].validate({
            version: '1.2.0',
            foo: [{ bar: true }],
         });
         assertEquals(
            'issues' in result && result.issues && result.issues.length > 0,
            false,
         );
      });
      await ctx.step('missing field for version', () => {
         const result = schema['~standard'].validate({
            version: '1.2.0',
            foo: [{}],
         });
         assertEquals(
            'issues' in result && result.issues && result.issues.length > 0,
            true,
         );
      });
      await ctx.step('version mismatch', () => {
         const result = schema['~standard'].validate({
            version: '1.0.0',
            foo: [{ bar: true }],
         });
         assertEquals(
            'issues' in result && result.issues && result.issues.length > 0,
            true,
         );
      });
      await ctx.step('valid for unsupported fields', () => {
         const result = schema['~standard'].validate({
            version: '1.0.0',
            foo: [{}],
         });
         assertEquals(
            'issues' in result && result.issues && result.issues.length > 0,
            false,
         );
      });
   });
});

Deno.test('beatmap serialization tests', async (ctx) => {
   await ctx.step('difficulty v4', () => {
      const data = {
         version: '4.0.0',
         colorNotes: [{ foo: 'bar' }],
      };
      const result = v4.DifficultySchema['~standard'].validate(data);
      assertEquals(
         'issues' in result && result.issues && result.issues.length > 0,
         false,
      );
   });
});
