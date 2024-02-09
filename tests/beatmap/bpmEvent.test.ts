import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [[v3.BPMEvent, 'V3 BPM Event']] as const;
const defaultValue = { time: 0, bpm: 0, customData: {} };

for (const tup of classList) {
   const nameTag = tup[1];
   const Class = tup[0];
   Deno.test(`${nameTag} constructor & create instantiation`, () => {
      let obj = new Class();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value for ${nameTag}`,
      );

      obj = Class.create()[0];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create default value for ${nameTag}`,
      );

      obj = Class.create({}, {})[1];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create from array default value for ${nameTag}`,
      );

      obj = new Class({ time: 1, bpm: 120, customData: { test: true } });
      assertClassObjectMatch(
         obj,
         { time: 1, bpm: 120, customData: { test: true } },
         `Unexpected instantiated value for ${nameTag}`,
      );

      obj = new Class({ bpm: 200 });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, bpm: 200 },
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj;
      switch (Class) {
         case v3.BPMEvent:
            obj = Class.fromJSON();
            break;
      }
      assertClassObjectMatch(
         obj!,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v3.BPMEvent:
            obj = Class.fromJSON({ b: 1, m: 120, customData: { test: true } });
            break;
      }
      assertClassObjectMatch(
         obj!,
         { time: 1, bpm: 120, customData: { test: true } },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v3.BPMEvent:
            obj = Class.fromJSON({ m: 120 });
            break;
      }
      assertClassObjectMatch(
         obj!,
         { ...defaultValue, bpm: 120 },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v3.BPMEvent:
            assertEquals(json, { b: 0, m: 0, customData: { test: true } });
            break;
      }
   });
}
