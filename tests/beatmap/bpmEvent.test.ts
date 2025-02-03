import { assertObjectMatch } from '../assert.ts';
import { assertEquals, BPMEvent, v1, v2, v3 } from '../deps.ts';

const schemaList = [
   [v3.bpmEvent, 'V3 BPM Event'],
   [v2.bpmEvent, 'V2 BPM Event'],
   [v1.bpmEvent, 'V1 BPM Event'],
] as const;
const BaseClass = BPMEvent;
const defaultValue = BPMEvent.defaultValue;
const nameTag = 'BPM Event';

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

   obj = new BaseClass({ time: 1, bpm: 120, customData: { test: true } });
   assertObjectMatch(
      obj,
      { time: 1, bpm: 120, customData: { test: true } },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({ bpm: 200 });
   assertObjectMatch(
      obj,
      { ...defaultValue, bpm: 200 },
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
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v3.bpmEvent:
            obj = new BaseClass(
               (schema as typeof v3.bpmEvent).deserialize({
                  b: 1,
                  m: 120,
                  customData: { test: true },
               }),
            );
            break;
         case v2.bpmEvent:
            obj = new BaseClass(
               (schema as typeof v2.bpmEvent).deserialize({
                  _time: 1,
                  _floatValue: 120,
                  _customData: { test: true },
               }),
            );
            break;
         case v1.bpmEvent:
            obj = new BaseClass(
               (schema as typeof v1.bpmEvent).deserialize({
                  _time: 1,
                  _type: 100,
                  _value: 120,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         { time: 1, bpm: 120, customData: schema === v1.bpmEvent ? {} : { test: true } },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v3.bpmEvent:
            obj = new BaseClass(
               (schema as typeof v3.bpmEvent).deserialize({
                  m: 120,
               }),
            );
            break;
         case v2.bpmEvent:
            obj = new BaseClass(
               (schema as typeof v2.bpmEvent).deserialize({
                  _floatValue: 120,
               }),
            );
            break;
         case v1.bpmEvent:
            obj = new BaseClass(
               // @ts-expect-error awaiting updated type definitions from outgoing pull request
               (schema as typeof v1.bpmEvent).deserialize({
                  _value: 120,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         { ...defaultValue, bpm: 120 },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = schema.serialize(obj);
      switch (schema) {
         case v3.bpmEvent:
            assertEquals(json, { b: 0, m: 0, customData: { test: true } });
            break;
         case v2.bpmEvent:
            assertEquals(json, {
               _time: 0,
               _type: 100,
               _value: 0,
               _floatValue: 0,
               _customData: { test: true },
            });
            break;
         case v1.bpmEvent:
            assertEquals(json, { _time: 0, _type: 100, _value: 0 });
            break;
      }
   });
}
