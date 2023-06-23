import { assertEquals, v2, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Index Filter';
const classList = [
   v3.BasicEventTypesForKeywords,
   v2.SpecialEventsKeywordFiltersKeywords,
];
const defaultValue = {
   keyword: '',
   events: [],
};

Deno.test(`${name} instantiation`, () => {
   let obj;

   for (const Class of classList) {
      obj = new Class();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value for ${Class.name}`,
      );
      obj = Class.create()[0];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create default value for ${Class.name}`,
      );
      obj = Class.create({}, {})[1];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create from array default value for ${Class.name}`,
      );

      obj = new Class({ keyword: 'test', events: [1, 2] });
      assertClassObjectMatch(
         obj,
         { keyword: 'test', events: [1, 2] },
         `Unexpected instantiated value for ${Class.name}`,
      );

      obj = new Class({ keyword: 'test' });
      assertClassObjectMatch(
         obj,
         { keyword: 'test', events: [] },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v3.BasicEventTypesForKeywords) {
         obj = new Class({ k: 'test', e: [1, 2] });
      }
      if (obj instanceof v2.SpecialEventsKeywordFiltersKeywords) {
         obj = new Class({ _keyword: 'test', _specialEvents: [1, 2] });
      }
      assertClassObjectMatch(
         obj,
         { keyword: 'test', events: [1, 2] },
         `Unexpected instantiated value from JSON object for ${Class.name}`,
      );
   }
});

Deno.test(`${name} to JSON object`, () => {
   for (const Class of classList) {
      const obj = new Class();
      const json = obj.toJSON();
      if (obj instanceof v3.BasicEventTypesForKeywords) {
         assertEquals(json, { k: '', e: [] });
      }
      if (obj instanceof v2.SpecialEventsKeywordFiltersKeywords) {
         assertEquals(json, { _keyword: '', _specialEvents: [] });
      }
   }
});
