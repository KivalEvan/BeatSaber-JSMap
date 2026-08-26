import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   deserializeV3IndexFilter,
   deserializeV4IndexFilter,
   IndexFilter,
   serializeV3IndexFilter,
   serializeV4IndexFilter,
} from '../deps.ts';

const schemaList = [
   [deserializeV4IndexFilter, serializeV4IndexFilter, 'V4 Index Filter'],
   [deserializeV3IndexFilter, serializeV3IndexFilter, 'V3 Index Filter'],
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
   const nameTag = tup[2];
   // deno-lint-ignore no-explicit-any
   const schema = tup[0] as any;
   // deno-lint-ignore no-explicit-any
   const serializer = tup[1] as any;
   Deno.test(`${nameTag} from JSON instantiation`, () => {
      // deno-lint-ignore no-explicit-any
      let obj = new BaseClass(schema({} as any));
      assertObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Index Filter':
            obj = new BaseClass(
               schema({
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
         case 'V3 Index Filter':
            obj = new BaseClass(
               schema({
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

      switch (nameTag) {
         case 'V4 Index Filter':
            obj = new BaseClass(
               schema({
                  f: 2,
                  p: 1,
                  n: 2,
               }),
            );
            break;
         case 'V3 Index Filter':
            obj = new BaseClass(
               schema({
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
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Index Filter':
         case 'V3 Index Filter':
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
