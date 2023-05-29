import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Index Filter';
const classList = [v3.IndexFilter];
const defaultValue = {
    type: 1,
    p0: 0,
    p1: 0,
    reverse: 0,
    chunks: 0,
    random: 0,
    seed: 0,
    limit: 0,
    limitAffectsType: 0,
    customData: {},
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

        obj = new Class({
            type: 2,
            p0: 1,
            p1: 2,
            reverse: 1,
            chunks: 4,
            random: 2,
            seed: 12345,
            limit: 1,
            limitAffectsType: 3,
            customData: { test: true },
        });
        assertClassObjectMatch(
            obj,
            {
                type: 2,
                p0: 1,
                p1: 2,
                reverse: 1,
                chunks: 4,
                random: 2,
                seed: 12345,
                limit: 1,
                limitAffectsType: 3,
                customData: { test: true },
            },
            `Unexpected instantiated value for ${Class.name}`,
        );

        obj = new Class({
            type: 2,
            reverse: 1,
            chunks: 4,
            limitAffectsType: 3,
        });
        assertClassObjectMatch(
            obj,
            { ...defaultValue, type: 2, reverse: 1, chunks: 4, limitAffectsType: 3 },
            `Unexpected partially instantiated value for ${Class.name}`,
        );

        if (obj instanceof v3.IndexFilter) {
            obj = new Class({
                f: 2,
                p: 1,
                t: 2,
                r: 1,
                c: 4,
                n: 2,
                s: 12345,
                l: 1,
                d: 3,
                customData: { test: true },
            });
        }
        assertClassObjectMatch(
            obj,
            {
                type: 2,
                p0: 1,
                p1: 2,
                reverse: 1,
                chunks: 4,
                random: 2,
                seed: 12345,
                limit: 1,
                limitAffectsType: 3,
                customData: { test: true },
            },
            `Unexpected instantiated value from JSON object for ${Class.name}`,
        );
    }
});

Deno.test(`${name} to JSON object`, () => {
    for (const Class of classList) {
        const obj = new Class({ customData: { test: true } });
        const json = obj.toJSON();
        if (obj instanceof v3.IndexFilter) {
            assertEquals(json, {
                f: 1,
                p: 0,
                t: 0,
                r: 0,
                c: 0,
                n: 0,
                s: 0,
                l: 0,
                d: 0,
                customData: { test: true },
            });
        }
    }
});
