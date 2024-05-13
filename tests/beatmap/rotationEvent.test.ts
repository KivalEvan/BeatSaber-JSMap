import { assertEquals, RotationEvent, v1, v2, v3, v4 } from '../deps.ts';
import { assertObjectMatch } from '../assert.ts';

const schemaList = [
   [v4.rotationEvent, 'V4 Rotation Event'],
   [v3.rotationEvent, 'V3 Rotation Event'],
   [v2.rotationEvent, 'V2 Rotation Event'],
   [v1.rotationEvent, 'V1 Rotation Event'],
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
   const nameTag = tup[1];
   const schema = tup[0];
   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj = new BaseClass(schema.deserialize());
      assertObjectMatch(
         obj,
         {
            ...defaultValue,
            rotation: schema === v1.rotationEvent || schema === v2.rotationEvent ? -60 : 0,
         },
         `Unexpected default value from empty JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.rotationEvent:
            obj = new BaseClass(
               schema.deserialize({
                  object: { b: 1 },
                  data: { e: 1, r: 15, customData: { test: true } },
               }),
            );
            break;
         case v3.rotationEvent:
            obj = new BaseClass(
               schema.deserialize({
                  b: 1,
                  e: 1,
                  r: 15,
                  customData: { test: true },
               }),
            );
            break;
         case v2.rotationEvent:
            obj = new BaseClass(
               schema.deserialize({
                  _time: 1,
                  _type: 15,
                  _value: 4,
                  _customData: { test: true },
               }),
            );
            break;
         case v1.rotationEvent:
            obj = new BaseClass(
               schema.deserialize({
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
            customData: schema === v1.rotationEvent ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.rotationEvent:
            obj = new BaseClass(
               schema.deserialize({
                  data: { r: 15 },
               }),
            );
            break;
         case v3.rotationEvent:
            obj = new BaseClass(
               schema.deserialize({
                  r: 15,
               }),
            );
            break;
         case v2.rotationEvent:
            obj = new BaseClass(
               schema.deserialize({
                  _value: 4,
               }),
            );
            break;
         case v1.rotationEvent:
            obj = new BaseClass(
               schema.deserialize({
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
      const json = schema.serialize(obj);
      switch (schema) {
         case v4.rotationEvent:
            assertEquals(json, {
               object: { b: 0 },
               data: {
                  e: 0,
                  r: 0,
                  customData: { test: true },
               },
            });
            break;
         case v3.rotationEvent:
            assertEquals(json, {
               b: 0,
               e: 0,
               r: 0,
               customData: { test: true },
            });
            break;
         case v2.rotationEvent:
            assertEquals(json, {
               _time: 0,
               _type: 14,
               _value: 1360,
               _floatValue: 0,
               _customData: { test: true },
            });
            break;
         case v1.rotationEvent:
            assertEquals(json, {
               _time: 0,
               _type: 14,
               _value: 1360,
            });
      }
   });
}
