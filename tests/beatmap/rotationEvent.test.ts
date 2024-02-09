import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [[v3.RotationEvent, 'V3 Rotation Event']] as const;
const defaultValue = { time: 0, executionTime: 0, rotation: 0, customData: {} };

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

      obj = new Class({
         time: 1,
         executionTime: 1,
         rotation: 15,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            executionTime: 1,
            rotation: 15,
            customData: { test: true },
         },
         `Unexpected instantiated value for ${nameTag}`,
      );

      obj = new Class({ rotation: 15 });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, rotation: 15 },
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj;
      switch (Class) {
         case v3.RotationEvent:
            obj = Class.fromJSON({});
            break;
      }
      assertClassObjectMatch(
         obj!,
         defaultValue,
         `Unexpected default value from empty JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v3.RotationEvent:
            obj = Class.fromJSON({
               b: 1,
               e: 1,
               r: 15,
               customData: { test: true },
            });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            time: 1,
            executionTime: 1,
            rotation: 15,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v3.RotationEvent:
            obj = Class.fromJSON({
               r: 15,
            });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            ...defaultValue,
            rotation: 15,
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v3.RotationEvent:
            assertEquals(json, {
               b: 0,
               e: 0,
               r: 0,
               customData: { test: true },
            });
      }
   });
}
