import { assertEquals, types, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.Chain, 'V4 Chain'],
   [v3.Chain, 'V3 Chain'],
] as const;
const defaultValue: types.wrapper.IWrapChainAttribute = {
   time: 0,
   color: 0,
   posX: 0,
   posY: 0,
   direction: 0,
   tailTime: 0,
   tailPosX: 0,
   tailPosY: 0,
   sliceCount: 0,
   squish: 0,
   laneRotation: 0,
   tailLaneRotation: 0,
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
         color: 1,
         posX: 2,
         posY: 3,
         direction: 1,
         tailTime: 2,
         tailPosX: 3,
         tailPosY: 2,
         sliceCount: 4,
         squish: 0.5,
         laneRotation: 15,
         tailLaneRotation: 30,
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
            laneRotation: Class === v3.Chain ? 0 : 15,
            tailLaneRotation: Class === v3.Chain ? 0 : 30,
            customData: { test: true },
         },
         `Unexpected instantiated value for ${nameTag}`,
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
         case v4.Chain:
            obj = Class.fromJSON(
               {
                  hb: 1,
                  hr: 15,
                  tb: 2,
                  tr: 30,
                  i: 0,
                  ci: 0,
                  customData: {},
               },
               {
                  x: 2,
                  y: 3,
                  c: 1,
                  d: 1,
                  a: 0,
                  customData: {},
               },
               {
                  tx: 3,
                  ty: 2,
                  c: 4,
                  s: 0.5,
                  customData: { test: true },
               },
            );
            break;
         case v3.Chain:
            obj = Class.fromJSON({
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
            break;
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
            laneRotation: Class === v3.Chain ? 0 : 15,
            tailLaneRotation: Class === v3.Chain ? 0 : 30,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.Chain:
            obj = Class.fromJSON(
               {
                  tb: 2,
               },
               {
                  x: 2,
                  y: 3,
               },
               {
                  tx: 3,
                  c: 2,
                  s: 0.5,
                  customData: { test: true },
               },
            );
            break;
         case v3.Chain:
            obj = Class.fromJSON({
               x: 2,
               y: 3,
               tb: 2,
               tx: 3,
               sc: 2,
               s: 0.5,
               customData: { test: true },
            });
            break;
      }
      assertClassObjectMatch(
         obj,
         {
            ...defaultValue,
            posX: 2,
            posY: 3,
            tailTime: 2,
            tailPosX: 3,
            sliceCount: 2,
            squish: 0.5,
            customData: { test: true },
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v4.Chain:
            assertEquals(json, {
               object: {
                  hb: 0,
                  hr: 0,
                  tb: 0,
                  tr: 0,
                  i: 0,
                  ci: 0,
                  customData: {},
               },
               data: {
                  x: 0,
                  y: 0,
                  c: 0,
                  d: 0,
                  a: 0,
                  customData: {},
               },
               chainData: {
                  tx: 0,
                  ty: 0,
                  c: 0,
                  s: 0,
                  customData: { test: true },
               },
            });
            break;
         case v3.Chain:
            assertEquals(json, {
               b: 0,
               c: 0,
               x: 0,
               y: 0,
               d: 0,
               tb: 0,
               tx: 0,
               ty: 0,
               sc: 0,
               s: 0,
               customData: { test: true },
            });
            break;
      }
   });
}
