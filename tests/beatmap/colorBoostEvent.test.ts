import { assertEquals, ColorBoostEvent, v1, v2, v3, v4 } from '../deps.ts';
import { assertObjectMatch } from '../assert.ts';

const schemaList = [
   [v4.colorBoostEvent, 'V4 Color Boost Event'],
   [v3.colorBoostEvent, 'V3 Color Boost Event'],
   [v2.colorBoostEvent, 'V2 Color Boost Event'],
   [v1.colorBoostEvent, 'V1 Color Boost Event'],
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
   const nameTag = tup[1];
   const schema = tup[0];
   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj = new BaseClass(schema.deserialize());
      assertObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.colorBoostEvent:
            obj = new BaseClass(
               schema.deserialize({
                  object: { b: 1 },
                  data: { b: 1, customData: { test: true } },
               }),
            );
            break;
         case v3.colorBoostEvent:
            obj = new BaseClass(
               schema.deserialize({ b: 1, o: true, customData: { test: true } }),
            );
            break;
         case v2.colorBoostEvent:
            obj = new BaseClass(
               schema.deserialize({
                  _time: 1,
                  _type: 5,
                  _value: 1,
                  _floatValue: 0,
                  _customData: { test: true },
               }),
            );
            break;
         case v1.colorBoostEvent:
            obj = new BaseClass(
               schema.deserialize({ _time: 1, _type: 5, _value: 1 }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            time: 1,
            toggle: true,
            customData: schema === v1.colorBoostEvent ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.colorBoostEvent:
            obj = new BaseClass(schema.deserialize({ object: { b: 1 } }));
            break;
         case v3.colorBoostEvent:
            obj = new BaseClass(schema.deserialize({ b: 1 }));
            break;
         case v2.colorBoostEvent:
            obj = new BaseClass(schema.deserialize({ _time: 1 }));
            break;
         case v1.colorBoostEvent:
            obj = new BaseClass(schema.deserialize({ _time: 1 }));
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
      const json = schema.serialize(obj);
      switch (schema) {
         case v4.colorBoostEvent:
            assertEquals(json, {
               object: { b: 0, i: 0, customData: {} },
               data: { b: 0, customData: { test: true } },
            });
            break;
         case v3.colorBoostEvent:
            assertEquals(json, { b: 0, o: false, customData: { test: true } });
            break;
      }
   });
}
