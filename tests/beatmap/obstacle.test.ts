import { assertEquals, Obstacle, v1, v2, v3, v4 } from '../deps.ts';
import { assertObjectMatch } from '../assert.ts';

const schemaList = [
   [v4.obstacle, 'V4 Obstacle'],
   [v3.obstacle, 'V3 Obstacle'],
   [v2.obstacle, 'V2 Obstacle'],
   [v1.obstacle, 'V1 Obstacle'],
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
   const nameTag = tup[1];
   const schema = tup[0];
   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj = new BaseClass(schema.deserialize());
      assertObjectMatch(
         obj,
         {
            ...defaultValue,
            height: schema === v3.obstacle || schema === v4.obstacle ? 0 : 5,
         },
         `Unexpected default value from empty JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.obstacle:
            obj = new BaseClass(
               schema.deserialize({
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
         case v3.obstacle:
            obj = new BaseClass(
               schema.deserialize({
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
         case v2.obstacle:
            obj = new BaseClass(
               schema.deserialize({
                  _time: 1,
                  _lineIndex: 2,
                  _type: 1,
                  _duration: 1,
                  _width: 2,
                  _customData: { test: true },
               }),
            );
            break;
         case v1.obstacle:
            obj = new BaseClass(
               schema.deserialize({
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
            laneRotation: schema === v4.obstacle ? 15 : 0,
            customData: schema === v1.obstacle ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.obstacle:
            obj = new BaseClass(
               schema.deserialize({ object: { b: 1 }, data: { w: 2 } }),
            );
            break;
         case v3.obstacle:
            obj = new BaseClass(
               schema.deserialize({
                  b: 1,
                  w: 2,
               }),
            );
            break;
         case v2.obstacle:
            obj = new BaseClass(
               schema.deserialize({
                  _time: 1,
                  _width: 2,
               }),
            );
            break;
         case v1.obstacle:
            obj = new BaseClass(
               schema.deserialize({
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
            height: schema === v3.obstacle || schema === v4.obstacle ? 0 : 5,
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = schema.serialize(obj);
      switch (schema) {
         case v4.obstacle:
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
         case v3.obstacle:
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
         case v2.obstacle:
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _type: 4001,
               _duration: 0,
               _width: 0,
               _customData: { test: true },
            });
            break;
         case v1.obstacle:
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
