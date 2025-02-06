import { assertObjectMatch } from '../assert.ts';
import { assertEquals, BasicEventTypesForKeywords, v2, v3 } from '../deps.ts';

const schemaList = [
   [v3.basicEventTypesForKeywords, 'V3 Basic Event Types For Keywords'],
   [v2.basicEventTypesForKeywords, 'V2 Special Events Keyword Filters'],
] as const;
const BaseClass = BasicEventTypesForKeywords;
const defaultValue = BasicEventTypesForKeywords.defaultValue;
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
      // deno-lint-ignore no-explicit-any
      let obj = new BaseClass(schema.deserialize({} as any));
      assertObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v3.basicEventTypesForKeywords:
            obj = new BaseClass(
               (schema as typeof v3.basicEventTypesForKeywords).deserialize({
                  k: 'test',
                  e: [1, 2],
               }),
            );
            break;
         case v2.basicEventTypesForKeywords:
            obj = new BaseClass(
               (schema as typeof v2.basicEventTypesForKeywords).deserialize({
                  _keyword: 'test',
                  _specialEvents: [1, 2],
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         { keyword: 'test', events: [1, 2] },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v3.basicEventTypesForKeywords:
            obj = new BaseClass(
               (schema as typeof v3.basicEventTypesForKeywords).deserialize({
                  e: [1, 2],
               }),
            );
            break;
         case v2.basicEventTypesForKeywords:
            obj = new BaseClass(
               (schema as typeof v2.basicEventTypesForKeywords).deserialize({
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
         case v3.basicEventTypesForKeywords:
            assertEquals(json, { k: '', e: [] });
            break;
         case v2.basicEventTypesForKeywords:
            assertEquals(json, {
               _keyword: '',
               _specialEvents: [],
            });
            break;
      }
   });
}
