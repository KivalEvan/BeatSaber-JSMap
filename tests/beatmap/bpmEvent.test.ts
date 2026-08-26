import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   BPMEvent,
   deserializeV1BPMEvent,
   deserializeV2BPMEvent,
   deserializeV3BPMEvent,
   serializeV1BPMEvent,
   serializeV2BPMEvent,
   serializeV3BPMEvent,
} from '../deps.ts';

const schemaList = [
   [deserializeV3BPMEvent, serializeV3BPMEvent, 'V3 BPM Event'],
   [deserializeV2BPMEvent, serializeV2BPMEvent, 'V2 BPM Event'],
   [deserializeV1BPMEvent, serializeV1BPMEvent, 'V1 BPM Event'],
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
         case 'V3 BPM Event':
            obj = new BaseClass(
               schema({
                  b: 1,
                  m: 120,
                  customData: { test: true },
               }),
            );
            break;
         case 'V2 BPM Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _floatValue: 120,
                  _customData: { test: true },
               }),
            );
            break;
         case 'V1 BPM Event':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _type: 100,
                  _value: 120,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         { time: 1, bpm: 120, customData: nameTag === 'V1 BPM Event' ? {} : { test: true } },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V3 BPM Event':
            obj = new BaseClass(
               schema({
                  m: 120,
               }),
            );
            break;
         case 'V2 BPM Event':
            obj = new BaseClass(
               schema({
                  _floatValue: 120,
               }),
            );
            break;
         case 'V1 BPM Event':
            obj = new BaseClass(
               schema({
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
      const json = serializer(obj);
      switch (nameTag) {
         case 'V3 BPM Event':
            assertEquals(json, { b: 0, m: 0, customData: { test: true } });
            break;
         case 'V2 BPM Event':
            assertEquals(json, {
               _time: 0,
               _type: 100,
               _value: 0,
               _floatValue: 0,
               _customData: { test: true },
            });
            break;
         case 'V1 BPM Event':
            assertEquals(json, { _time: 0, _type: 100, _value: 0 });
            break;
      }
   });
}
