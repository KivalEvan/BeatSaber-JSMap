import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   deserializeV1RotationEvent,
   deserializeV2RotationEvent,
   deserializeV3RotationEvent,
   deserializeV4RotationEvent,
   RotationEvent,
   serializeV1RotationEvent,
   serializeV2RotationEvent,
   serializeV3RotationEvent,
   serializeV4RotationEvent,
} from '../deps.ts';

const schemaList = [
   [deserializeV4RotationEvent, serializeV4RotationEvent, 'V4 Rotation Event'],
   [deserializeV3RotationEvent, serializeV3RotationEvent, 'V3 Rotation Event'],
   [deserializeV2RotationEvent, serializeV2RotationEvent, 'V2 Rotation Event'],
   [deserializeV1RotationEvent, serializeV1RotationEvent, 'V1 Rotation Event'],
] as const;
const BaseClass = RotationEvent;
const defaultValue = RotationEvent.defaultValue;
const nameTag = 'Rotation Event';

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
      executionTime: 1,
      rotation: 15,
      customData: { test: true },
   });
   assertObjectMatch(
      obj,
      {
         time: 1,
         executionTime: 1,
         rotation: 15,
         customData: { test: true },
      },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({ rotation: 15 });
   assertObjectMatch(
      obj,
      { ...defaultValue, rotation: 15 },
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
            rotation: nameTag === 'V1 Rotation Event' || nameTag === 'V2 Rotation Event' ? -60 : 0,
         },
         `Unexpected default value from empty JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Rotation Event':
            obj = new BaseClass(
               schema({
                  object: { b: 1 },
                  data: {
                     e: 1,
                     r: 15,
                     customData: { test: true },
                  },
               }),
            );
            break;
         case 'V3 Rotation Event':
            obj = new BaseClass(
               schema({
                  b: 1,
                  e: 1,
                  r: 15,
                  customData: { test: true },
               }),
            );
            break;
         case 'V2 Rotation Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _type: 15,
                  _value: 4,
                  _customData: { test: true },
               }),
            );
            break;
         case 'V1 Rotation Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _type: 15,
                  _value: 4,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            time: 1,
            executionTime: 1,
            rotation: 15,
            customData: nameTag === 'V1 Rotation Event' ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Rotation Event':
            obj = new BaseClass(
               schema({
                  object: {},
                  data: { r: 15 },
               }),
            );
            break;
         case 'V3 Rotation Event':
            obj = new BaseClass(
               schema({
                  r: 15,
               }),
            );
            break;
         case 'V2 Rotation Event':
            obj = new BaseClass(
               schema({
                  _value: 4,
               }),
            );
            break;
         case 'V1 Rotation Event':
            obj = new BaseClass(
               schema({
                  _value: 4,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            ...defaultValue,
            rotation: 15,
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Rotation Event':
            assertEquals(json, {
               object: { b: 0 },
               data: {
                  e: 0,
                  r: 0,
                  customData: { test: true },
               },
            });
            break;
         case 'V3 Rotation Event':
            assertEquals(json, {
               b: 0,
               e: 0,
               r: 0,
               customData: { test: true },
            });
            break;
         case 'V2 Rotation Event':
            assertEquals(json, {
               _time: 0,
               _type: 14,
               _value: 1360,
               _floatValue: 0,
               _customData: { test: true, _rotation: 0 },
            });
            break;
         case 'V1 Rotation Event':
            assertEquals(json, {
               _time: 0,
               _type: 14,
               _value: 1360,
            });
      }
   });
}
