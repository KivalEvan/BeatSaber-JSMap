import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   deserializeV1Obstacle,
   deserializeV2Obstacle,
   deserializeV3Obstacle,
   deserializeV4Obstacle,
   Obstacle,
   serializeV1Obstacle,
   serializeV2Obstacle,
   serializeV3Obstacle,
   serializeV4Obstacle,
} from '../deps.ts';

const schemaList = [
   [deserializeV4Obstacle, serializeV4Obstacle, 'V4 Obstacle'],
   [deserializeV3Obstacle, serializeV3Obstacle, 'V3 Obstacle'],
   [deserializeV2Obstacle, serializeV2Obstacle, 'V2 Obstacle'],
   [deserializeV1Obstacle, serializeV1Obstacle, 'V1 Obstacle'],
] as const;
const BaseClass = Obstacle;
const defaultValue = Obstacle.defaultValue;
const nameTag = 'Obstacle';

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
      time: 1,
      posX: 2,
      posY: 1,
      duration: 1,
      width: 2,
      height: 5,
      laneRotation: 15,
      customData: { test: true },
   });
   assertObjectMatch(
      obj,
      {
         time: 1,
         posX: 2,
         posY: 1,
         duration: 1,
         width: 2,
         height: 5,
         laneRotation: 15,
         customData: { test: true },
      },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({
      time: 1,
      posX: 2,
      width: 2,
   });
   assertObjectMatch(
      obj,
      {
         ...defaultValue,
         time: 1,
         posX: 2,
         width: 2,
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
         {
            ...defaultValue,
            height: nameTag === 'V3 Obstacle' || nameTag === 'V4 Obstacle' ? 0 : 5,
         },
         `Unexpected default value from empty JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Obstacle':
            obj = new BaseClass(
               schema({
                  object: { b: 1, i: 0, r: 15 },
                  data: {
                     x: 2,
                     y: 2,
                     d: 1,
                     w: 2,
                     h: 3,
                     customData: { test: true },
                  },
               }),
            );
            break;
         case 'V3 Obstacle':
            obj = new BaseClass(
               schema({
                  b: 1,
                  x: 2,
                  y: 2,
                  d: 1,
                  w: 2,
                  h: 3,
                  customData: { test: true },
               }),
            );
            break;
         case 'V2 Obstacle':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _lineIndex: 2,
                  _type: 1,
                  _duration: 1,
                  _width: 2,
                  _customData: { test: true },
               }),
            );
            break;
         case 'V1 Obstacle':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _lineIndex: 2,
                  _type: 1,
                  _duration: 1,
                  _width: 2,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            time: 1,
            posX: 2,
            posY: 2,
            duration: 1,
            width: 2,
            height: 3,
            laneRotation: nameTag === 'V4 Obstacle' ? 15 : 0,
            customData: nameTag === 'V1 Obstacle' ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Obstacle':
            obj = new BaseClass(
               schema({
                  object: { b: 1 },
                  data: {
                     w: 2,
                  },
               }),
            );
            break;
         case 'V3 Obstacle':
            obj = new BaseClass(
               schema({
                  b: 1,
                  w: 2,
               }),
            );
            break;
         case 'V2 Obstacle':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _width: 2,
               }),
            );
            break;
         case 'V1 Obstacle':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _width: 2,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            ...defaultValue,
            time: 1,
            width: 2,
            height: nameTag === 'V3 Obstacle' || nameTag === 'V4 Obstacle' ? 0 : 5,
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Obstacle':
            assertEquals(json, {
               object: { b: 0, i: 0, r: 0, customData: {} },
               data: {
                  x: 0,
                  y: 0,
                  d: 0,
                  w: 0,
                  h: 0,
                  customData: { test: true },
               },
            });
            break;
         case 'V3 Obstacle':
            assertEquals(json, {
               b: 0,
               x: 0,
               y: 0,
               d: 0,
               w: 0,
               h: 0,
               customData: { test: true },
            });
            break;
         case 'V2 Obstacle':
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _type: 4001,
               _duration: 0,
               _width: 0,
               _customData: { test: true },
            });
            break;
         case 'V1 Obstacle':
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _type: 4001,
               _duration: 0,
               _width: 0,
            });
            break;
      }
   });
}
