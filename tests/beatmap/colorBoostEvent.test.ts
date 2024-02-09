import { assertEquals, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.ColorBoostEvent, 'V4 Color Boost Event'],
   [v3.ColorBoostEvent, 'V3 Color Boost Event'],
] as const;
const defaultValue = { time: 0, toggle: false, customData: {} };

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

      obj = Class.create()[0];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create default value for ${nameTag}`,
      );

      obj = Class.create({}, {})[1];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create from array default value for ${nameTag}`,
      );

      obj = new Class({ time: 1, toggle: true, customData: { test: true } });
      assertClassObjectMatch(
         obj,
         { time: 1, toggle: true, customData: { test: true } },
         `Unexpected instantiated value for ${nameTag}`,
      );

      obj = new Class({ toggle: true });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, toggle: true },
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj;
      switch (Class) {
         case v4.ColorBoostEvent:
            obj = Class.fromJSON();
            break;
         case v3.ColorBoostEvent:
            obj = Class.fromJSON();
            break;
      }
      assertClassObjectMatch(
         obj!,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.ColorBoostEvent:
            obj = Class.fromJSON(
               { b: 1 },
               { b: 1, customData: { test: true } },
            );
            break;
         case v3.ColorBoostEvent:
            obj = Class.fromJSON({ b: 1, o: true, customData: { test: true } });
            break;
      }
      assertClassObjectMatch(
         obj!,
         { time: 1, toggle: true, customData: { test: true } },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.ColorBoostEvent:
            obj = Class.fromJSON({ b: 1 }, {});
            break;
         case v3.ColorBoostEvent:
            obj = Class.fromJSON({ b: 1 });
            break;
      }
      assertClassObjectMatch(
         obj!,
         { ...defaultValue, time: 1 },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v4.ColorBoostEvent:
            assertEquals(json, {
               object: { b: 0, i: 0, customData: {} },
               data: { b: 0, customData: { test: true } },
            });
            break;
         case v3.ColorBoostEvent:
            assertEquals(json, { b: 0, o: false, customData: { test: true } });
            break;
      }
   });
}
