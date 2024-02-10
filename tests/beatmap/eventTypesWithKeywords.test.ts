import { assertEquals, types, v2, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v3.BasicEventTypesWithKeywords, 'V3 Basic Event Types With Keywords'],
   [v2.SpecialEventsKeywordFilters, 'V2 Special Events Keyword Filters'],
] as const;
const defaultValue: types.wrapper.IWrapEventTypesWithKeywordsAttribute = {
   list: [],
};

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

      obj = Class.create();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create default value for ${nameTag}`,
      );

      obj = new Class({ list: [{ keyword: 'test', events: [1, 2] }] });
      assertClassObjectMatch(
         obj,
         { list: [{ keyword: 'test', events: [1, 2] }] },
         `Unexpected instantiated value for ${nameTag}`,
      );

      obj = new Class({ list: [{ keyword: 'test' }] });
      assertClassObjectMatch(
         obj,
         { list: [{ keyword: 'test', events: [] }] },
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj = Class.fromJSON();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v3.BasicEventTypesWithKeywords:
            obj = Class.fromJSON({ d: [{ k: 'test', e: [1, 2] }] });
            break;
         case v2.SpecialEventsKeywordFilters:
            obj = Class.fromJSON({
               _keywords: [{ _keyword: 'test', _specialEvents: [1, 2] }],
            });
            break;
      }
      assertClassObjectMatch(
         obj,
         { list: [{ keyword: 'test', events: [1, 2] }] },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v3.BasicEventTypesWithKeywords:
            obj = Class.fromJSON({ d: [{ e: [1, 2] }] });
            break;
         case v2.SpecialEventsKeywordFilters:
            obj = Class.fromJSON({
               _keywords: [{ _specialEvents: [1, 2] }],
            });
            break;
      }
      assertClassObjectMatch(
         obj,
         { list: [{ keyword: '', events: [1, 2] }] },
         `Unexpected partially value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ list: [{}] });
      const json = obj.toJSON();
      switch (Class) {
         case v3.BasicEventTypesWithKeywords:
            assertEquals(json, { d: [{ k: '', e: [] }] });
            break;
         case v2.SpecialEventsKeywordFilters:
            assertEquals(json, {
               _keywords: [{ _keyword: '', _specialEvents: [] }],
            });
            break;
      }
   });
}
