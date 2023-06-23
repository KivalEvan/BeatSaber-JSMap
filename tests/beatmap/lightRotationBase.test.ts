import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Light Rotation Base';
const classList = [v3.LightRotationBase];
const defaultValue = {
   time: 0,
   previous: 0,
   easing: 0,
   loop: 0,
   rotation: 0,
   direction: 0,
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
         previous: 1,
         easing: 3,
         loop: 1,
         rotation: 120,
         direction: 1,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            previous: 1,
            easing: 3,
            loop: 1,
            rotation: 120,
            direction: 1,
            customData: { test: true },
         },
         `Unexpected instantiated value for ${Class.name}`,
      );

      obj = new Class({
         time: 1,
         previous: 1,
         rotation: 120,
      });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, time: 1, previous: 1, rotation: 120 },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v3.LightRotationBase) {
         obj = new Class({
            b: 1,
            p: 1,
            e: 3,
            l: 1,
            r: 120,
            o: 1,
            customData: { test: true },
         });
      }
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            previous: 1,
            easing: 3,
            loop: 1,
            rotation: 120,
            direction: 1,
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
      if (obj instanceof v3.LightRotationBase) {
         assertEquals(json, {
            b: 0,
            p: 0,
            e: 0,
            l: 0,
            r: 0,
            o: 0,
            customData: { test: true },
         });
      }
   }
});
