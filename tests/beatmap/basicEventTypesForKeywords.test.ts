import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   BasicEventTypesForKeywords,
   deserializeV2BasicEventTypesForKeywords,
   deserializeV3BasicEventTypesForKeywords,
   serializeV2BasicEventTypesForKeywords,
   serializeV3BasicEventTypesForKeywords,
} from '../deps.ts';

const schemaList = [
   [
      deserializeV3BasicEventTypesForKeywords,
      serializeV3BasicEventTypesForKeywords,
      'V3 Basic Event Types For Keywords',
   ],
   [
      deserializeV2BasicEventTypesForKeywords,
      serializeV2BasicEventTypesForKeywords,
      'V2 Special Events Keyword Filters',
   ],
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
         case 'V3 Basic Event Types For Keywords':
            obj = new BaseClass(
               schema({
                  k: 'test',
                  e: [1, 2],
               }),
            );
            break;
         case 'V2 Special Events Keyword Filters':
            obj = new BaseClass(
               schema({
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

      switch (nameTag) {
         case 'V3 Basic Event Types For Keywords':
            obj = new BaseClass(
               schema({
                  e: [1, 2],
               }),
            );
            break;
         case 'V2 Special Events Keyword Filters':
            obj = new BaseClass(
               schema({
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
      const json = serializer(obj);
      switch (nameTag) {
         case 'V3 Basic Event Types For Keywords':
            assertEquals(json, { k: '', e: [] });
            break;
         case 'V2 Special Events Keyword Filters':
            assertEquals(json, {
               _keyword: '',
               _specialEvents: [],
            });
            break;
      }
   });
}
