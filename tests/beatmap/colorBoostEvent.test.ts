import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   ColorBoostEvent,
   deserializeV1ColorBoostEvent,
   deserializeV2ColorBoostEvent,
   deserializeV3ColorBoostEvent,
   deserializeV4ColorBoostEvent,
   serializeV1ColorBoostEvent,
   serializeV2ColorBoostEvent,
   serializeV3ColorBoostEvent,
   serializeV4ColorBoostEvent,
} from '../deps.ts';

const schemaList = [
   [deserializeV4ColorBoostEvent, serializeV4ColorBoostEvent, 'V4 Color Boost Event'],
   [deserializeV3ColorBoostEvent, serializeV3ColorBoostEvent, 'V3 Color Boost Event'],
   [deserializeV2ColorBoostEvent, serializeV2ColorBoostEvent, 'V2 Color Boost Event'],
   [deserializeV1ColorBoostEvent, serializeV1ColorBoostEvent, 'V1 Color Boost Event'],
] as const;
const BaseClass = ColorBoostEvent;
const defaultValue = ColorBoostEvent.defaultValue;
const nameTag = 'Color Boost Event';

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

   obj = new BaseClass({ time: 1, toggle: true, customData: { test: true } });
   assertObjectMatch(
      obj,
      { time: 1, toggle: true, customData: { test: true } },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({ toggle: true });
   assertObjectMatch(
      obj,
      { ...defaultValue, toggle: true },
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
         case 'V4 Color Boost Event':
            obj = new BaseClass(
               schema({
                  object: {
                     b: 1,
                  },
                  data: {
                     b: 1,
                     customData: { test: true },
                  },
               }),
            );
            break;
         case 'V3 Color Boost Event':
            obj = new BaseClass(
               schema({
                  b: 1,
                  o: true,
                  customData: { test: true },
               }),
            );
            break;
         case 'V2 Color Boost Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _type: 5,
                  _value: 1,
                  _floatValue: 0,
                  _customData: { test: true },
               }),
            );
            break;
         case 'V1 Color Boost Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _type: 5,
                  _value: 1,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            time: 1,
            toggle: true,
            customData: nameTag === 'V1 Color Boost Event' ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Color Boost Event':
            obj = new BaseClass(
               schema({
                  object: {
                     b: 1,
                  },
                  data: {},
               }),
            );
            break;
         case 'V3 Color Boost Event':
            obj = new BaseClass(
               schema({
                  b: 1,
               }),
            );
            break;
         case 'V2 Color Boost Event':
            obj = new BaseClass(schema({
               _time: 1,
            }));
            break;
         case 'V1 Color Boost Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         { ...defaultValue, time: 1 },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Color Boost Event':
            assertEquals(json, {
               object: { b: 0, i: 0, customData: {} },
               data: { b: 0, customData: { test: true } },
            });
            break;
         case 'V3 Color Boost Event':
            assertEquals(json, { b: 0, o: false, customData: { test: true } });
            break;
      }
   });
}
