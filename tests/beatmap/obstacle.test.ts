import { assertEquals, types, v1, v2, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.Obstacle, 'V4 Obstacle'],
   [v3.Obstacle, 'V3 Obstacle'],
   [v2.Obstacle, 'V2 Obstacle'],
   [v1.Obstacle, 'V1 Obstacle'],
] as const;
const defaultValue = {
   time: 0,
   posX: 0,
   posY: 0,
   duration: 0,
   width: 0,
   height: 0,
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
         {
            ...defaultValue,
            height: Class === v3.Obstacle || Class === v4.Obstacle ? 0 : 5,
         },
         `Unexpected default value for ${nameTag}`,
      );

      obj = Class.create()[0];
      assertClassObjectMatch(
         obj,
         {
            ...defaultValue,
            height: Class === v3.Obstacle || Class === v4.Obstacle ? 0 : 5,
         },
         `Unexpected static create default value for ${nameTag}`,
      );

      obj = Class.create({}, {})[1];
      assertClassObjectMatch(
         obj,
         {
            ...defaultValue,
            height: Class === v3.Obstacle || Class === v4.Obstacle ? 0 : 5,
         },
         `Unexpected static create from array default value for ${nameTag}`,
      );

      obj = new Class({
         time: 1,
         posX: 2,
         posY: 1,
         duration: 1,
         width: 2,
         height: 5,
         laneRotation: 15,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            posX: 2,
            posY: Class === v2.Obstacle || Class === v1.Obstacle ? 0 : 1,
            duration: 1,
            width: 2,
            height: 5,
            laneRotation: Class === v4.Obstacle ? 15 : 0,
            customData: Class === v1.Obstacle ? {} : { test: true },
         },
         `Unexpected instantiated value for ${nameTag}`,
      );

      obj = new Class({
         time: 1,
         posX: 2,
         width: 2,
      });
      assertClassObjectMatch(
         obj,
         {
            ...defaultValue,
            time: 1,
            posX: 2,
            width: 2,
            height: Class === v3.Obstacle || Class === v4.Obstacle ? 0 : 5,
         },
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj;
      switch (Class) {
         case v4.Obstacle:
            obj = Class.fromJSON({}, {});
            break;
         case v3.Obstacle:
            obj = Class.fromJSON({});
            break;
         case v2.Obstacle:
            obj = Class.fromJSON({});
            break;
         case v1.Obstacle:
            obj = Class.fromJSON({});
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            ...defaultValue,
            height: Class === v3.Obstacle || Class === v4.Obstacle ? 0 : 5,
         },
         `Unexpected default value from empty JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.Obstacle:
            obj = Class.fromJSON(
               { b: 1, i: 0, r: 15 },
               { x: 2, y: 2, d: 1, w: 2, h: 3, customData: { test: true } },
            );
            break;
         case v3.Obstacle:
            obj = Class.fromJSON({
               b: 1,
               x: 2,
               y: 2,
               d: 1,
               w: 2,
               h: 3,
               customData: { test: true },
            });
            break;
         case v2.Obstacle:
            obj = Class.fromJSON({
               _time: 1,
               _lineIndex: 2,
               _type: 1,
               _duration: 1,
               _width: 2,
               _customData: { test: true },
            });
            break;
         case v1.Obstacle:
            obj = Class.fromJSON({
               _time: 1,
               _lineIndex: 2,
               _type: 1,
               _duration: 1,
               _width: 2,
            });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            time: 1,
            posX: 2,
            posY: 2,
            duration: 1,
            width: 2,
            height: 3,
            laneRotation: Class === v4.Obstacle ? 15 : 0,
            customData: Class === v1.Obstacle ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.Obstacle:
            obj = Class.fromJSON({ b: 1 }, { w: 2 });
            break;
         case v3.Obstacle:
            obj = Class.fromJSON({
               b: 1,
               w: 2,
            });
            break;
         case v2.Obstacle:
            obj = Class.fromJSON({
               _time: 1,
               _width: 2,
            });
            break;
         case v1.Obstacle:
            obj = Class.fromJSON({
               _time: 1,
               _width: 2,
            });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            ...defaultValue,
            time: 1,
            width: 2,
            height: Class === v3.Obstacle || Class === v4.Obstacle ? 0 : 5,
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v4.Obstacle:
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
         case v3.Obstacle:
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
         case v2.Obstacle:
            assertEquals(json as types.v2.IObstacle, {
               _time: 0,
               _lineIndex: 0,
               _type: 0,
               _duration: 0,
               _width: 0,
               _customData: { test: true },
            });
            break;
         case v1.Obstacle:
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _type: 0,
               _duration: 0,
               _width: 0,
            });
            break;
      }
   });
}
