import { assertObjectMatch } from '../assert.ts';
import { assertEquals, IndexFilter, v3, v4 } from '../deps.ts';

const schemaList = [
   [v4.indexFilter, 'V4 Index Filter'],
   [v3.indexFilter, 'V3 Index Filter'],
] as const;
const BaseClass = IndexFilter;
const defaultValue = IndexFilter.defaultValue;
const nameTag = 'Index Filter';

Deno.test(`${nameTag} constructor & create instantiation`, () => {
   let obj = new BaseClass();
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected default value for ${nameTag}`,
   );

   obj = BaseClass.create()[0];
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected static create default value for ${nameTag}`,
   );

   obj = new BaseClass({
      type: 2,
      p0: 1,
      p1: 2,
      reverse: 1,
      chunks: 4,
      random: 2,
      seed: 12345,
      limit: 1,
      limitAffectsType: 3,
      customData: { test: true },
   });
   assertObjectMatch(
      obj,
      {
         type: 2,
         p0: 1,
         p1: 2,
         reverse: 1,
         chunks: 4,
         random: 2,
         seed: 12345,
         limit: 1,
         limitAffectsType: 3,
         customData: { test: true },
      },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({
      type: 2,
      reverse: 1,
      chunks: 4,
      limitAffectsType: 3,
   });
   assertObjectMatch(
      obj,
      {
         ...defaultValue,
         type: 2,
         reverse: 1,
         chunks: 4,
         limitAffectsType: 3,
      },
      `Unexpected partially instantiated value for ${nameTag}`,
   );
});

for (const tup of schemaList) {
   const nameTag = tup[1];
   const schema = tup[0];
   Deno.test(`${nameTag} from JSON instantiation`, () => {
      // deno-lint-ignore no-explicit-any
      let obj = new BaseClass(schema.deserialize({} as any));
      assertObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.indexFilter:
            obj = new BaseClass(
               (schema as typeof v4.indexFilter).deserialize({
                  f: 2,
                  p: 1,
                  t: 2,
                  r: 1,
                  c: 4,
                  n: 2,
                  s: 12345,
                  l: 1,
                  d: 3,
                  customData: { test: true },
               }),
            );
            break;
         case v3.indexFilter:
            obj = new BaseClass(
               (schema as typeof v3.indexFilter).deserialize({
                  f: 2,
                  p: 1,
                  t: 2,
                  r: 1,
                  c: 4,
                  n: 2,
                  s: 12345,
                  l: 1,
                  d: 3,
                  customData: { test: true },
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            type: 2,
            p0: 1,
            p1: 2,
            reverse: 1,
            chunks: 4,
            random: 2,
            seed: 12345,
            limit: 1,
            limitAffectsType: 3,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.indexFilter:
            obj = new BaseClass(
               (schema as typeof v4.indexFilter).deserialize({
                  f: 2,
                  p: 1,
                  n: 2,
               }),
            );
            break;
         case v3.indexFilter:
            obj = new BaseClass(
               (schema as typeof v3.indexFilter).deserialize({
                  f: 2,
                  p: 1,
                  n: 2,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            ...defaultValue,
            type: 2,
            p0: 1,
            random: 2,
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = schema.serialize(obj);
      switch (schema) {
         case v4.indexFilter:
         case v3.indexFilter:
            assertEquals(json, {
               f: 1,
               p: 0,
               t: 0,
               r: 0,
               c: 0,
               n: 0,
               s: 0,
               l: 0,
               d: 0,
               customData: { test: true },
            });
            break;
      }
   });
}
