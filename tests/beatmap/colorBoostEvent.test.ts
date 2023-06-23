import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Color Boost Event';
const classList = [v3.ColorBoostEvent];
const defaultValue = { time: 0, toggle: false, customData: {} };

Deno.test(`${name} instantiation`, () => {
   let obj;

   for (const Class of classList) {
      obj = new Class();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value for ${Class.name}`,
      );
      obj = Class.create()[0];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create default value for ${Class.name}`,
      );
      obj = Class.create({}, {})[1];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create from array default value for ${Class.name}`,
      );

      obj = new Class({ time: 1, toggle: true, customData: { test: true } });
      assertClassObjectMatch(
         obj,
         { time: 1, toggle: true, customData: { test: true } },
         `Unexpected instantiated value for ${Class.name}`,
      );

      obj = new Class({ toggle: true });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, toggle: true },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v3.ColorBoostEvent) {
         obj = new Class({ b: 1, o: true, customData: { test: true } });
      }
      assertClassObjectMatch(
         obj,
         { time: 1, toggle: true, customData: { test: true } },
         `Unexpected instantiated value from JSON object for ${Class.name}`,
      );
   }
});

Deno.test(`${name} to JSON object`, () => {
   for (const Class of classList) {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      if (obj instanceof v3.ColorBoostEvent) {
         assertEquals(json, { b: 0, o: false, customData: { test: true } });
      }
   }
});
