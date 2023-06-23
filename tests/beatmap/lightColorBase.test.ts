import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Light Color Base';
const classList = [v3.LightColorBase];
const defaultValue = {
   time: 0,
   transition: 0,
   color: 0,
   brightness: 1,
   frequency: 0,
   customData: {},
};

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
         transition: 1,
         color: 2,
         brightness: 0.5,
         frequency: 4,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            transition: 1,
            color: 2,
            brightness: 0.5,
            frequency: 4,
            customData: { test: true },
         },
         `Unexpected instantiated value for ${Class.name}`,
      );

      obj = new Class({
         transition: 2,
         frequency: 8,
      });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, transition: 2, frequency: 8 },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v3.LightColorBase) {
         obj = new Class({
            b: 1,
            i: 1,
            c: 2,
            s: 0.5,
            f: 4,
            customData: { test: true },
         });
      }
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            transition: 1,
            color: 2,
            brightness: 0.5,
            frequency: 4,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${Class.name}`,
      );
   }
});

Deno.test(`${name} to JSON object`, () => {
   for (const Class of classList) {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      if (obj instanceof v3.LightColorBase) {
         assertEquals(json, {
            b: 0,
            i: 0,
            c: 0,
            s: 1,
            f: 0,
            customData: { test: true },
         });
      }
   }
});
