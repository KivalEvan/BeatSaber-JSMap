import { assertEquals, v2, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.Arc, 'V4 Arc'],
   [v3.Arc, 'V3 Arc'],
   [v2.Arc, 'V2 Arc'],
] as const;
const defaultValue = {
   time: 0,
   color: 0,
   posX: 0,
   posY: 0,
   direction: 0,
   lengthMultiplier: 0,
   tailTime: 0,
   tailPosX: 0,
   tailPosY: 0,
   tailDirection: 0,
   tailLengthMultiplier: 0,
   midAnchor: 0,
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
         time: 2.5,
         color: 1,
         posX: 2,
         posY: 1,
         direction: 3,
         lengthMultiplier: 0.5,
         tailTime: 3,
         tailPosX: 2,
         tailPosY: 4,
         tailDirection: 6,
         tailLengthMultiplier: 0.5,
         midAnchor: 1,
         laneRotation: 15,
         tailLaneRotation: 30,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         {
            time: 2.5,
            color: 1,
            posX: 2,
            posY: 1,
            direction: 3,
            lengthMultiplier: 0.5,
            tailTime: 3,
            tailPosX: 2,
            tailPosY: 4,
            tailDirection: 6,
            tailLengthMultiplier: 0.5,
            midAnchor: 1,
            laneRotation: Class === v2.Arc || Class === v3.Arc ? 0 : 15,
            tailLaneRotation: Class === v2.Arc || Class === v3.Arc ? 0 : 30,
            customData: { test: true },
         },
         `Unexpected instantiated value for ${nameTag}`,
      );

      obj = new Class({
         time: 2.5,
         color: 1,
         lengthMultiplier: 0.5,
         tailTime: 3,
         tailPosX: 2,
      });
      assertClassObjectMatch(
         obj,
         {
            ...defaultValue,
            time: 2.5,
            color: 1,
            lengthMultiplier: 0.5,
            tailTime: 3,
            tailPosX: 2,
         },
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj;
      switch (Class) {
         case v4.Arc:
            obj = Class.fromJSON(
               {
                  ai: 0,
                  hb: 2.5,
                  hi: 0,
                  hr: 15,
                  tb: 3,
                  ti: 0,
                  tr: 30,
                  customData: {},
               },
               { m: 0.5, tm: 0.5, a: 1, customData: { test: true } },
               { x: 2, y: 1, c: 1, d: 3, a: 0, customData: {} },
               { x: 2, y: 4, c: 0, d: 6, a: 0, customData: {} },
            );
            break;
         case v3.Arc:
            obj = Class.fromJSON({
               b: 2.5,
               c: 1,
               x: 2,
               y: 1,
               d: 3,
               mu: 0.5,
               tb: 3,
               tx: 2,
               ty: 4,
               tc: 6,
               tmu: 0.5,
               m: 1,
               customData: { test: true },
            });
            break;
         case v2.Arc:
            obj = Class.fromJSON({
               _colorType: 1,
               _headTime: 2.5,
               _headLineIndex: 2,
               _headLineLayer: 1,
               _headCutDirection: 3,
               _headControlPointLengthMultiplier: 0.5,
               _tailTime: 3,
               _tailLineIndex: 2,
               _tailLineLayer: 4,
               _tailCutDirection: 6,
               _tailControlPointLengthMultiplier: 0.5,
               _sliderMidAnchorMode: 1,
               _customData: { test: true },
            });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            time: 2.5,
            color: 1,
            posX: 2,
            posY: 1,
            direction: 3,
            lengthMultiplier: 0.5,
            tailTime: 3,
            tailPosX: 2,
            tailPosY: 4,
            tailDirection: 6,
            tailLengthMultiplier: 0.5,
            midAnchor: 1,
            laneRotation: Class === v2.Arc || Class === v3.Arc ? 0 : 15,
            tailLaneRotation: Class === v2.Arc || Class === v3.Arc ? 0 : 30,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v4.Arc:
            assertEquals(json, {
               object: {
                  ai: 0,
                  hb: 0,
                  hi: 0,
                  hr: 0,
                  tb: 0,
                  ti: 0,
                  tr: 0,
                  customData: {},
               },
               data: { m: 0, tm: 0, a: 0, customData: { test: true } },
               headData: { x: 0, y: 0, c: 0, d: 0, a: 0, customData: {} },
               tailData: { x: 0, y: 0, c: 0, d: 0, a: 0, customData: {} },
            });
            break;
         case v3.Arc:
            assertEquals(json, {
               b: 0,
               c: 0,
               x: 0,
               y: 0,
               d: 0,
               mu: 0,
               tb: 0,
               tx: 0,
               ty: 0,
               tc: 0,
               tmu: 0,
               m: 0,
               customData: { test: true },
            });
            break;
         case v2.Arc:
            assertEquals(json, {
               _colorType: 0,
               _headTime: 0,
               _headLineIndex: 0,
               _headLineLayer: 0,
               _headCutDirection: 0,
               _headControlPointLengthMultiplier: 0,
               _tailTime: 0,
               _tailLineIndex: 0,
               _tailLineLayer: 0,
               _tailCutDirection: 0,
               _tailControlPointLengthMultiplier: 0,
               _sliderMidAnchorMode: 0,
               _customData: { test: true },
            });
            break;
      }
   });
}
