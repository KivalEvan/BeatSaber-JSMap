import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   deserializeV2Waypoint,
   deserializeV3Waypoint,
   deserializeV4Waypoint,
   serializeV2Waypoint,
   serializeV3Waypoint,
   serializeV4Waypoint,
   Waypoint,
} from '../deps.ts';

const schemaList = [
   [deserializeV4Waypoint, serializeV4Waypoint, 'V4 Waypoint'],
   [deserializeV3Waypoint, serializeV3Waypoint, 'V3 Waypoint'],
   [deserializeV2Waypoint, serializeV2Waypoint, 'V2 Waypoint'],
] as const;
const BaseClass = Waypoint;
const defaultValue = Waypoint.defaultValue;
const nameTag = 'Waypoint';

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
      posY: 3,
      direction: 4,
      laneRotation: 15,
      customData: { test: true },
   });
   assertObjectMatch(
      obj,
      {
         time: 1,
         posX: 2,
         posY: 3,
         direction: 4,
         laneRotation: 15,
         customData: { test: true },
      },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({
      time: 1,
      posY: 3,
   });
   assertObjectMatch(
      obj,
      { ...defaultValue, time: 1, posY: 3 },
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
         `Unexpected default value from empty JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Waypoint':
            obj = new BaseClass(
               schema({
                  object: { b: 2.5, i: 0, r: 15 },
                  data: {
                     x: 2,
                     y: 1,
                     d: 3,
                     customData: { test: true },
                  },
               }),
            );
            break;
         case 'V3 Waypoint':
            obj = new BaseClass(
               schema({
                  b: 2.5,
                  x: 2,
                  y: 1,
                  d: 3,
                  customData: { test: true },
               }),
            );
            break;
         case 'V2 Waypoint':
            obj = new BaseClass(
               schema({
                  _time: 2.5,
                  _lineIndex: 2,
                  _lineLayer: 1,
                  _offsetDirection: 3,
                  _customData: { test: true },
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            time: 2.5,
            posX: 2,
            posY: 1,
            direction: 3,
            laneRotation: nameTag === 'V4 Waypoint' ? 15 : 0,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Waypoint':
            obj = new BaseClass(
               schema({
                  object: {},
                  data: { y: 1, d: 3 },
               }),
            );
            break;
         case 'V3 Waypoint':
            obj = new BaseClass(
               schema({
                  y: 1,
                  d: 3,
               }),
            );
            break;
         case 'V2 Waypoint':
            obj = new BaseClass(
               schema({
                  _lineLayer: 1,
                  _offsetDirection: 3,
               }),
            );
            break;
      }
      assertObjectMatch(
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
      const obj = new BaseClass({ customData: { test: true } });
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Waypoint':
            assertEquals(json, {
               object: { b: 0, i: 0, r: 0, customData: {} },
               data: { x: 0, y: 0, d: 0, customData: { test: true } },
            });
            break;
         case 'V3 Waypoint':
            assertEquals(json, {
               b: 0,
               x: 0,
               y: 0,
               d: 0,
               customData: { test: true },
            });
            break;
         case 'V2 Waypoint':
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
