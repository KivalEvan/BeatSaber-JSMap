import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Rotation Event';
const classList = [v3.RotationEvent];
const defaultValue = { time: 0, executionTime: 0, rotation: 0, customData: {} };

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

      obj = new Class({
         time: 1,
         executionTime: 1,
         rotation: 15,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         { time: 1, executionTime: 1, rotation: 15, customData: { test: true } },
         `Unexpected instantiated value for ${Class.name}`,
      );

      obj = new Class({ rotation: 15 });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, rotation: 15 },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v3.RotationEvent) {
         obj = new Class({ b: 1, e: 1, r: 15, customData: { test: true } });
      }
      assertClassObjectMatch(
         obj,
         { time: 1, executionTime: 1, rotation: 15, customData: { test: true } },
         `Unexpected instantiated value from JSON object for ${Class.name}`,
      );
   }
});

Deno.test(`${name} to JSON object`, () => {
   for (const Class of classList) {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      if (obj instanceof v3.RotationEvent) {
         assertEquals(json, { b: 0, e: 0, r: 0, customData: { test: true } });
      }
   }
});
