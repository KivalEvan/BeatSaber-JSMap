import { assertEquals, EventTypesForKeywords, v2, v3 } from '../deps.ts';
import { assertObjectMatch } from '../assert.ts';

const schemaList = [
   [v3.eventTypesForKeywords, 'V3 Basic Event Types For Keywords'],
   [v2.eventTypesForKeywords, 'V2 Special Events Keyword Filters'],
] as const;
const BaseClass = EventTypesForKeywords;
const defaultValue = EventTypesForKeywords.defaultValue;
const nameTag = 'Event Types For Keywords';

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

   obj = new BaseClass({ keyword: 'test', events: [1, 2] });
   assertObjectMatch(
      obj,
      { keyword: 'test', events: [1, 2] },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({ keyword: 'test' });
   assertObjectMatch(
      obj,
      { keyword: 'test', events: [] },
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
         case v3.eventTypesForKeywords:
            obj = new BaseClass(schema.deserialize({ k: 'test', e: [1, 2] }));
            break;
         case v2.eventTypesForKeywords:
            obj = new BaseClass(
               schema.deserialize({ _keyword: 'test', _specialEvents: [1, 2] }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         { keyword: 'test', events: [1, 2] },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v3.eventTypesForKeywords:
            obj = new BaseClass(schema.deserialize({ e: [1, 2] }));
            break;
         case v2.eventTypesForKeywords:
            obj = new BaseClass(
               schema.deserialize({
                  _specialEvents: [1, 2],
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         { keyword: '', events: [1, 2] },
         `Unexpected partially value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass();
      const json = schema.serialize(obj);
      switch (schema) {
         case v3.eventTypesForKeywords:
            assertEquals(json, { k: '', e: [] });
            break;
         case v2.eventTypesForKeywords:
            assertEquals(json, {
               _keyword: '',
               _specialEvents: [],
            });
            break;
      }
   });
}
