import { assertEquals, v2, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Index Filter';
const classList = [v3.BasicEventTypesWithKeywords, v2.SpecialEventsKeywordFilters];
const defaultValue = {
    list: [],
};

Deno.test(`${name} instantiation`, () => {
    let obj;

    for (const Class of classList) {
        obj = new Class();
        assertClassObjectMatch(obj, defaultValue, `Unexpected default value for ${Class.name}`);
        obj = Class.create();
        assertClassObjectMatch(
            obj,
            defaultValue,
            `Unexpected static create default value for ${Class.name}`,
        );

        obj = new Class({ list: [{ keyword: 'test', events: [1, 2] }] });
        assertClassObjectMatch(
            obj,
            { list: [{ keyword: 'test', events: [1, 2] }] },
            `Unexpected instantiated value for ${Class.name}`,
        );

        obj = new Class({ list: [{ keyword: 'test' }] });
        assertClassObjectMatch(
            obj,
            { list: [{ keyword: 'test', events: [] }] },
            `Unexpected partially instantiated value for ${Class.name}`,
        );

        if (obj instanceof v3.BasicEventTypesWithKeywords) {
            obj = new Class({ d: [{ k: 'test', e: [1, 2] }] });
        }
        if (obj instanceof v2.SpecialEventsKeywordFilters) {
            obj = new Class({ _keywords: [{ _keyword: 'test', _specialEvents: [1, 2] }] });
        }
        assertClassObjectMatch(
            obj,
            { list: [{ keyword: 'test', events: [1, 2] }] },
            `Unexpected instantiated value from JSON object for ${Class.name}`,
        );
    }
});

Deno.test(`${name} to JSON object`, () => {
    for (const Class of classList) {
        const obj = new Class({ list: [{}] });
        const json = obj.toJSON();
        if (obj instanceof v3.BasicEventTypesWithKeywords) {
            assertEquals(json, { d: [{ k: '', e: [] }] });
        }
        if (obj instanceof v2.SpecialEventsKeywordFilters) {
            assertEquals(json, { _keywords: [{ _keyword: '', _specialEvents: [] }] });
        }
    }
});
