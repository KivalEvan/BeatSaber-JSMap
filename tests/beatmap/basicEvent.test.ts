import { assertObjectMatch } from '../assert.ts';
import { assertEquals, BasicEvent, v1, v2, v3, v4 } from '../deps.ts';

const schemaList = [
   [v4.basicEvent, 'V4 Basic Event'],
   [v3.basicEvent, 'V3 Basic Event'],
   [v2.basicEvent, 'V2 Event'],
   [v1.basicEvent, 'V1 Event'],
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
   const nameTag = tup[1];
   const schema = tup[0];
   Deno.test(`${nameTag} from JSON instantiation`, () => {
      // deno-lint-ignore no-explicit-any
      let obj = new BaseClass(schema.deserialize({} as any));
      assertObjectMatch(
         obj,
         { ...defaultValue, floatValue: schema === v1.basicEvent ? 1 : 0 },
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.basicEvent:
            obj = new BaseClass(
               (schema as typeof v4.basicEvent).deserialize({
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
         case v3.basicEvent:
            obj = new BaseClass(
               (schema as typeof v3.basicEvent).deserialize({
                  b: 1,
                  et: 4,
                  i: 2,
                  f: 0.5,
                  customData: { test: true },
               }),
            );
            break;
         case v2.basicEvent:
            obj = new BaseClass(
               (schema as typeof v2.basicEvent).deserialize({
                  _time: 1,
                  _type: 4,
                  _value: 2,
                  _floatValue: 0.5,
                  _customData: { test: true },
               }),
            );
            break;
         case v1.basicEvent:
            obj = new BaseClass(
               (schema as typeof v1.basicEvent).deserialize({
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
            floatValue: schema === v1.basicEvent ? 1 : 0.5,
            customData: schema === v1.basicEvent ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.basicEvent:
            obj = new BaseClass(
               (schema as typeof v4.basicEvent).deserialize({
                  object: {
                     b: 1,
                  },
                  data: {
                     t: 4,
                  },
               }),
            );
            break;
         case v3.basicEvent:
            obj = new BaseClass(
               (schema as typeof v3.basicEvent).deserialize({
                  b: 1,
                  et: 4,
               }),
            );
            break;
         case v2.basicEvent:
            obj = new BaseClass(
               (schema as typeof v2.basicEvent).deserialize({
                  _time: 1,
                  _type: 4,
               }),
            );
            break;
         case v1.basicEvent:
            obj = new BaseClass(
               // @ts-expect-error awaiting updated type definitions from outgoing pull request
               (schema as typeof v1.basicEvent).deserialize({
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
            floatValue: schema === v1.basicEvent ? 1 : 0,
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = schema.serialize(obj);
      switch (schema) {
         case v4.basicEvent:
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
         case v3.basicEvent:
            assertEquals(json, {
               b: 0,
               et: 0,
               i: 0,
               f: 0,
               customData: { test: true },
            });
            break;
         case v2.basicEvent:
            assertEquals(json, {
               _time: 0,
               _type: 0,
               _value: 0,
               _floatValue: 0,
               _customData: { test: true },
            });
            break;
         case v1.basicEvent:
            assertEquals(json, { _time: 0, _type: 0, _value: 0 });
            break;
      }
   });
}
