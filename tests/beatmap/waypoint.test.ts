import { assertEquals, types, v2, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.Waypoint, 'V4 Waypoint'],
   [v3.Waypoint, 'V3 Waypoint'],
   [v2.Waypoint, 'V2 Waypoint'],
] as const;
const defaultValue: types.wrapper.IWrapWaypointAttribute = {
   time: 0,
   posX: 0,
   posY: 0,
   direction: 0,
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
         posX: 2,
         posY: 3,
         direction: 4,
         laneRotation: 15,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            posX: 2,
            posY: 3,
            direction: 4,
            laneRotation: Class === v4.Waypoint ? 15 : 0,
            customData: { test: true },
         },
         `Unexpected instantiated value for ${nameTag}`,
      );

      obj = new Class({
         time: 1,
         posY: 3,
      });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, time: 1, posY: 3 },
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj = Class.fromJSON();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from empty JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.Waypoint:
            obj = Class.fromJSON(
               { b: 2.5, i: 0, r: 15 },
               { x: 2, y: 1, d: 3, customData: { test: true } },
            );
            break;
         case v3.Waypoint:
            obj = Class.fromJSON({
               b: 2.5,
               x: 2,
               y: 1,
               d: 3,
               customData: { test: true },
            });
            break;
         case v2.Waypoint:
            obj = Class.fromJSON({
               _time: 2.5,
               _lineIndex: 2,
               _lineLayer: 1,
               _offsetDirection: 3,
               _customData: { test: true },
            });
            break;
      }
      assertClassObjectMatch(
         obj,
         {
            time: 2.5,
            posX: 2,
            posY: 1,
            direction: 3,
            laneRotation: Class === v4.Waypoint ? 15 : 0,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.Waypoint:
            obj = Class.fromJSON({}, { y: 1, d: 3 });
            break;
         case v3.Waypoint:
            obj = Class.fromJSON({
               y: 1,
               d: 3,
            });
            break;
         case v2.Waypoint:
            obj = Class.fromJSON({
               _lineLayer: 1,
               _offsetDirection: 3,
            });
            break;
      }
      assertClassObjectMatch(
         obj,
         {
            ...defaultValue,
            posY: 1,
            direction: 3,
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v4.Waypoint:
            assertEquals(json, {
               object: { b: 0, i: 0, r: 0, customData: {} },
               data: { x: 0, y: 0, d: 0, customData: { test: true } },
            });
            break;
         case v3.Waypoint:
            assertEquals(json, {
               b: 0,
               x: 0,
               y: 0,
               d: 0,
               customData: { test: true },
            });
            break;
         case v2.Waypoint:
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _lineLayer: 0,
               _offsetDirection: 0,
               _customData: { test: true },
            });
            break;
      }
   });
}
