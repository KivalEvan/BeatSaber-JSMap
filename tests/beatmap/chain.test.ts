import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Chain';
const classList = [v3.Chain];
const defaultValue = {
   time: 0,
   color: 0,
   posX: 0,
   posY: 0,
   direction: 0,
   tailTime: 0,
   tailPosX: 0,
   tailPosY: 0,
   sliceCount: 1,
   squish: 1,
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
         color: 1,
         posX: 2,
         posY: 3,
         direction: 1,
         tailTime: 2,
         tailPosX: 3,
         tailPosY: 2,
         sliceCount: 4,
         squish: 0.5,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            color: 1,
            posX: 2,
            posY: 3,
            direction: 1,
            tailTime: 2,
            tailPosX: 3,
            tailPosY: 2,
            sliceCount: 4,
            squish: 0.5,
            customData: { test: true },
         },
         `Unexpected instantiated value for ${Class.name}`,
      );

      obj = new Class({
         time: 1,
         posX: 2,
         direction: 1,
         tailPosY: 2,
         sliceCount: 4,
         squish: 0.5,
      });
      assertClassObjectMatch(
         obj,
         {
            ...defaultValue,
            time: 1,
            posX: 2,
            direction: 1,
            tailPosY: 2,
            sliceCount: 4,
            squish: 0.5,
         },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v3.Chain) {
         obj = new Class({
            b: 1,
            c: 1,
            x: 2,
            y: 3,
            d: 1,
            tb: 2,
            tx: 3,
            ty: 2,
            sc: 4,
            s: 0.5,
            customData: { test: true },
         });
      }
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            color: 1,
            posX: 2,
            posY: 3,
            direction: 1,
            tailTime: 2,
            tailPosX: 3,
            tailPosY: 2,
            sliceCount: 4,
            squish: 0.5,
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
      if (obj instanceof v3.Chain) {
         assertEquals(json, {
            b: 0,
            c: 0,
            x: 0,
            y: 0,
            d: 0,
            tb: 0,
            tx: 0,
            ty: 0,
            sc: 1,
            s: 1,
            customData: { test: true },
         });
      }
   }
});
