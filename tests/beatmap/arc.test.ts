import { assertObjectMatch } from '../assert.ts';
import {
   Arc,
   assertEquals,
   deserializeV2Arc,
   deserializeV3Arc,
   deserializeV4Arc,
   serializeV2Arc,
   serializeV3Arc,
   serializeV4Arc,
} from '../deps.ts';

const schemaList = [
   [deserializeV4Arc, serializeV4Arc, 'V4 Arc'],
   [deserializeV3Arc, serializeV3Arc, 'V3 Arc'],
   [deserializeV2Arc, serializeV2Arc, 'V2 Arc'],
] as const;
const BaseClass = Arc;
const defaultValue = Arc.defaultValue;
const nameTag = 'Arc';

Deno.test(`${nameTag} constructor & create instantiation`, () => {
   let obj = new BaseClass();
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected default value for ${nameTag}`,
   );

   obj = BaseClass.create()[0];
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected static create default value for ${nameTag}`,
   );

   obj = BaseClass.create({}, {})[1];
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected static create from array default value for ${nameTag}`,
   );

   obj = new BaseClass({
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
   assertObjectMatch(
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
         laneRotation: 15,
         tailLaneRotation: 30,
         customData: { test: true },
      },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({
      time: 2.5,
      color: 1,
      lengthMultiplier: 0.5,
      tailTime: 3,
      tailPosX: 2,
   });
   assertObjectMatch(
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

for (const tup of schemaList) {
   const nameTag = tup[2];
   // deno-lint-ignore no-explicit-any
   const schema = tup[0] as any;
   // deno-lint-ignore no-explicit-any
   const serializer = tup[1] as any;
   Deno.test(`${nameTag} from JSON instantiation`, () => {
      // deno-lint-ignore no-explicit-any
      let obj = new BaseClass(schema({} as any));
      assertObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Arc':
            obj = new BaseClass(
               schema({
                  object: {
                     ai: 0,
                     hb: 2.5,
                     hi: 0,
                     hr: 15,
                     tb: 3,
                     ti: 0,
                     tr: 30,
                     customData: {},
                  },
                  data: { m: 0.5, tm: 0.5, a: 1, customData: { test: true } },
                  headData: { x: 2, y: 1, c: 1, d: 3, a: 0, customData: {} },
                  tailData: { x: 2, y: 4, c: 0, d: 6, a: 0, customData: {} },
               }),
            );
            break;
         case 'V3 Arc':
            obj = new BaseClass(
               schema({
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
               }),
            );
            break;
         case 'V2 Arc':
            obj = new BaseClass(
               schema({
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
               }),
            );
            break;
      }
      assertObjectMatch(
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
            laneRotation: nameTag === 'V2 Arc' || nameTag === 'V3 Arc' ? 0 : 15,
            tailLaneRotation: nameTag === 'V2 Arc' || nameTag === 'V3 Arc' ? 0 : 30,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Arc':
            obj = new BaseClass(
               schema({
                  object: {
                     hb: 2.5,
                     tb: 3,
                  },
                  data: { m: 0.5 },
                  headData: { c: 1 },
                  tailData: { x: 2 },
               }),
            );
            break;
         case 'V3 Arc':
            obj = new BaseClass(
               schema({
                  b: 2.5,
                  c: 1,
                  mu: 0.5,
                  tb: 3,
                  tx: 2,
               }),
            );
            break;
         case 'V2 Arc':
            obj = new BaseClass(
               schema({
                  _colorType: 1,
                  _headTime: 2.5,
                  _headControlPointLengthMultiplier: 0.5,
                  _tailTime: 3,
                  _tailLineIndex: 2,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            ...defaultValue,
            time: 2.5,
            color: 1,
            lengthMultiplier: 0.5,
            tailTime: 3,
            tailPosX: 2,
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Arc':
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
         case 'V3 Arc':
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
         case 'V2 Arc':
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
