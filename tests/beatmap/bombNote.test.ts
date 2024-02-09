import { assertEquals, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.BombNote, 'V4 Bomb Note'],
   [v3.BombNote, 'V3 Bomb Note'],
] as const;
const defaultValue = {
   time: 0,
   posX: 0,
   posY: 0,
   laneRotation: 0,
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
         posX: 3,
         posY: 4,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         { time: 1, posX: 3, posY: 4, customData: { test: true } },
         `Unexpected instantiated value for ${nameTag}`,
      );

      obj = new Class({ time: 4, posY: 2 });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, time: 4, posY: 2 },
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj;
      switch (Class) {
         case v4.BombNote:
            obj = Class.fromJSON();
            break;
         case v3.BombNote:
            obj = Class.fromJSON();
            break;
      }
      assertClassObjectMatch(
         obj!,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.BombNote:
            obj = Class.fromJSON(
               { b: 1, i: 0, r: 15 },
               { x: 3, y: 4, customData: { test: true } },
            );
            break;
         case v3.BombNote:
            obj = Class.fromJSON({
               b: 1,
               x: 3,
               y: 4,
               customData: { test: true },
            });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            time: 1,
            posX: 3,
            posY: 4,
            laneRotation: Class === v3.BombNote ? 0 : 15,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.BombNote:
            obj = Class.fromJSON({ b: 1 }, { x: 3 });
            break;
         case v3.BombNote:
            obj = Class.fromJSON({
               b: 1,
               x: 3,
               customData: { test: true },
            });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            ...defaultValue,
            time: 1,
            posX: 3,
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v4.BombNote:
            assertEquals(json, {
               object: { b: 0, i: 0, r: 0, customData: {} },
               data: { x: 0, y: 0, customData: { test: true } },
            });
            break;
         case v3.BombNote:
            assertEquals(json, {
               b: 0,
               x: 0,
               y: 0,
               customData: { test: true },
            });
            break;
      }
   });
}
