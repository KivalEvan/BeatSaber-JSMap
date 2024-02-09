import { assertEquals, types, v1, v2, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.BasicEvent, 'V4 Basic Event'],
   [v3.BasicEvent, 'V3 Basic Event'],
   [v2.Event, 'V2 Event'],
   [v1.Event, 'V1 Event'],
] as const;
const defaultValue = {
   time: 0,
   type: 0,
   value: 0,
   floatValue: 0,
   customData: {},
};

for (const tup of classList) {
   const nameTag = tup[1];
   const Class = tup[0];
   Deno.test(`${nameTag} constructor & create instantiation`, () => {
      let obj = new Class();
      assertClassObjectMatch(
         obj,
         { ...defaultValue, floatValue: obj instanceof v1.Event ? 1 : 0 },
         `Unexpected default value for ${nameTag}`,
      );

      obj = Class.create()[0];
      assertClassObjectMatch(
         obj,
         { ...defaultValue, floatValue: obj instanceof v1.Event ? 1 : 0 },
         `Unexpected static create default value for ${nameTag}`,
      );

      obj = Class.create({}, {})[1];
      assertClassObjectMatch(
         obj,
         { ...defaultValue, floatValue: obj instanceof v1.Event ? 1 : 0 },
         `Unexpected static create from array default value for ${nameTag}`,
      );

      obj = new Class({
         time: 1,
         type: 5,
         value: 1,
         floatValue: 0.5,
         customData: { test: true },
      });
      if (obj instanceof v1.Event) {
         assertClassObjectMatch(
            obj,
            { time: 1, type: 5, value: 1, floatValue: 1, customData: {} },
            `Unexpected instantiated value for ${nameTag}`,
         );
      } else {
         assertClassObjectMatch(
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
      }

      obj = new Class({ time: 4, type: 2 });
      assertClassObjectMatch(
         obj,
         {
            ...defaultValue,
            time: 4,
            type: 2,
            floatValue: Class === v1.Event ? 1 : 0,
         },
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj;
      switch (Class) {
         case v4.BasicEvent:
            obj = Class.fromJSON();
            break;
         case v3.BasicEvent:
            obj = Class.fromJSON();
            break;
         case v2.Event:
            obj = Class.fromJSON();
            break;
         case v1.Event:
            obj = Class.fromJSON();
            break;
      }
      assertClassObjectMatch(
         obj!,
         { ...defaultValue, floatValue: Class === v1.Event ? 1 : 0 },
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.BasicEvent:
            obj = Class.fromJSON(
               {
                  b: 1,
                  i: 0,
               },
               {
                  t: 4,
                  i: 2,
                  f: 0.5,
                  customData: { test: true },
               },
            );
            break;
         case v3.BasicEvent:
            obj = Class.fromJSON({
               b: 1,
               et: 4,
               i: 2,
               f: 0.5,
               customData: { test: true },
            });
            break;
         case v2.Event:
            obj = Class.fromJSON({
               _time: 1,
               _type: 4,
               _value: 2,
               _floatValue: 0.5,
               _customData: { test: true },
            });
            break;
         case v1.Event:
            obj = Class.fromJSON({ _time: 1, _type: 4, _value: 2 });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            time: 1,
            type: 4,
            value: 2,
            floatValue: Class === v1.Event ? 1 : 0.5,
            customData: Class === v1.Event ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.BasicEvent:
            obj = Class.fromJSON(
               {
                  b: 1,
               },
               {
                  t: 4,
               },
            );
            break;
         case v3.BasicEvent:
            obj = Class.fromJSON({
               b: 1,
               et: 4,
            });
            break;
         case v2.Event:
            obj = Class.fromJSON({
               _time: 1,
               _type: 4,
            });
            break;
         case v1.Event:
            obj = Class.fromJSON({ _time: 1, _type: 4 });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            ...defaultValue,
            time: 1,
            type: 4,
            floatValue: obj instanceof v1.Event ? 1 : 0,
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v4.BasicEvent:
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
         case v3.BasicEvent:
            assertEquals(json, {
               b: 0,
               et: 0,
               i: 0,
               f: 0,
               customData: { test: true },
            });
            break;
         case v2.Event:
            assertEquals(json as types.v2.IEvent, {
               _time: 0,
               _type: 0,
               _value: 0,
               _floatValue: 0,
               _customData: { test: true },
            });
            break;
         case v1.Event:
            assertEquals(json, { _time: 0, _type: 0, _value: 0 });
            break;
      }
   });
}
