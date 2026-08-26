import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   BasicEvent,
   deserializeV1BasicEvent,
   deserializeV2BasicEvent,
   deserializeV3BasicEvent,
   deserializeV4BasicEvent,
   serializeV1BasicEvent,
   serializeV2BasicEvent,
   serializeV3BasicEvent,
   serializeV4BasicEvent,
} from '../deps.ts';

const schemaList = [
   [deserializeV4BasicEvent, serializeV4BasicEvent, 'V4 Basic Event'],
   [deserializeV3BasicEvent, serializeV3BasicEvent, 'V3 Basic Event'],
   [deserializeV2BasicEvent, serializeV2BasicEvent, 'V2 Event'],
   [deserializeV1BasicEvent, serializeV1BasicEvent, 'V1 Event'],
] as const;
const BaseClass = BasicEvent;
const defaultValue = BasicEvent.defaultValue;
const nameTag = 'Basic Event';

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
      type: 5,
      value: 1,
      floatValue: 0.5,
      customData: { test: true },
   });
   assertObjectMatch(
      obj,
      {
         time: 1,
         type: 5,
         value: 1,
         floatValue: 0.5,
         customData: { test: true },
      },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({ time: 4, type: 2 });
   assertObjectMatch(
      obj,
      {
         ...defaultValue,
         time: 4,
         type: 2,
         floatValue: 0,
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
         { ...defaultValue, floatValue: nameTag === 'V1 Event' ? 1 : 0 },
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Basic Event':
            obj = new BaseClass(
               schema({
                  object: { b: 1, i: 0 },
                  data: {
                     t: 4,
                     i: 2,
                     f: 0.5,
                     customData: { test: true },
                  },
               }),
            );
            break;
         case 'V3 Basic Event':
            obj = new BaseClass(
               schema({
                  b: 1,
                  et: 4,
                  i: 2,
                  f: 0.5,
                  customData: { test: true },
               }),
            );
            break;
         case 'V2 Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _type: 4,
                  _value: 2,
                  _floatValue: 0.5,
                  _customData: { test: true },
               }),
            );
            break;
         case 'V1 Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _type: 4,
                  _value: 2,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            time: 1,
            type: 4,
            value: 2,
            floatValue: nameTag === 'V1 Event' ? 1 : 0.5,
            customData: nameTag === 'V1 Event' ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Basic Event':
            obj = new BaseClass(
               schema({
                  object: {
                     b: 1,
                  },
                  data: {
                     t: 4,
                  },
               }),
            );
            break;
         case 'V3 Basic Event':
            obj = new BaseClass(
               schema({
                  b: 1,
                  et: 4,
               }),
            );
            break;
         case 'V2 Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _type: 4,
               }),
            );
            break;
         case 'V1 Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _type: 4,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            ...defaultValue,
            time: 1,
            type: 4,
            floatValue: nameTag === 'V1 Event' ? 1 : 0,
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Basic Event':
            assertEquals(json, {
               object: { b: 0, i: 0, customData: {} },
               data: {
                  t: 0,
                  i: 0,
                  f: 0,
                  customData: { test: true },
               },
            });
            break;
         case 'V3 Basic Event':
            assertEquals(json, {
               b: 0,
               et: 0,
               i: 0,
               f: 0,
               customData: { test: true },
            });
            break;
         case 'V2 Event':
            assertEquals(json, {
               _time: 0,
               _type: 0,
               _value: 0,
               _floatValue: 0,
               _customData: { test: true },
            });
            break;
         case 'V1 Event':
            assertEquals(json, { _time: 0, _type: 0, _value: 0 });
            break;
      }
   });
}
