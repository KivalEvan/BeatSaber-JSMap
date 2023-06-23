import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Light Translation Base';
const classList = [v3.LightTranslationBase];
const defaultValue = {
   time: 0,
   previous: 0,
   easing: 0,
   translation: 0,
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
         easing: 2,
         translation: 100,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            previous: 1,
            easing: 2,
            translation: 100,
            customData: { test: true },
         },
         `Unexpected instantiated value for ${Class.name}`,
      );

      obj = new Class({
         time: 2,
         translation: 200,
      });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, time: 2, translation: 200 },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v3.LightTranslationBase) {
         obj = new Class({
            b: 1,
            p: 1,
            e: 2,
            t: 100,
            customData: { test: true },
         });
      }
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            previous: 1,
            easing: 2,
            translation: 100,
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
      if (obj instanceof v3.LightTranslationBase) {
         assertEquals(json, {
            b: 0,
            p: 0,
            e: 0,
            t: 0,
            customData: { test: true },
         });
      }
   }
});
