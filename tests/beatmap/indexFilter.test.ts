import { assertEquals, types, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.IndexFilter, 'V4 Index Filter'],
   [v3.IndexFilter, 'V3 Index Filter'],
] as const;
const defaultValue: types.wrapper.IWrapIndexFilterAttribute = {
   type: 1,
   p0: 0,
   p1: 0,
   reverse: 0,
   chunks: 0,
   random: 0,
   seed: 0,
   limit: 0,
   limitAffectsType: 0,
   customData: {},
};

for (const tup of classList) {
   const nameTag = tup[1];
   const Class = tup[0];
   Deno.test(`${nameTag} constructor & create instantiation`, () => {
      let obj = new Class();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value for ${nameTag}`,
      );

      obj = Class.create();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create default value for ${nameTag}`,
      );

      obj = new Class({
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
      assertClassObjectMatch(
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

      obj = new Class({
         type: 2,
         reverse: 1,
         chunks: 4,
         limitAffectsType: 3,
      });
      assertClassObjectMatch(
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

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj = Class.fromJSON();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.IndexFilter:
         case v3.IndexFilter:
            obj = Class.fromJSON({
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
            });
            break;
      }
      assertClassObjectMatch(
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

      switch (Class) {
         case v4.IndexFilter:
         case v3.IndexFilter:
            obj = Class.fromJSON({
               f: 2,
               p: 1,
               n: 2,
            });
            break;
      }
      assertClassObjectMatch(
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
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v4.IndexFilter:
         case v3.IndexFilter:
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
