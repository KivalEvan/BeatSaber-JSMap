import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Bomb Note';
const classList = [v3.BombNote];
const defaultValue = { time: 0, posX: 0, posY: 0, customData: {} };

Deno.test(`${name} instantiation`, () => {
    let obj;

    for (const Class of classList) {
        obj = new Class();
        assertClassObjectMatch(obj, defaultValue, `Unexpected default value for ${Class.name}`);
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

        obj = new Class({ time: 1, posX: 3, posY: 4, customData: { test: true } });
        assertClassObjectMatch(
            obj,
            { time: 1, posX: 3, posY: 4, customData: { test: true } },
            `Unexpected instantiated value for ${Class.name}`,
        );

        obj = new Class({ time: 4, posY: 2 });
        assertClassObjectMatch(
            obj,
            { ...defaultValue, time: 4, posY: 2 },
            `Unexpected partially instantiated value for ${Class.name}`,
        );

        if (obj instanceof v3.BombNote) {
            obj = new Class({ b: 1, x: 3, y: 4, customData: { test: true } });
        }
        assertClassObjectMatch(
            obj,
            { time: 1, posX: 3, posY: 4, customData: { test: true } },
            `Unexpected instantiated value from JSON object for ${Class.name}`,
        );
    }
});

Deno.test(`${name} to JSON object`, () => {
    for (const Class of classList) {
        const obj = new Class({ customData: { test: true } });
        const json = obj.toJSON();
        if (obj instanceof v3.BombNote) {
            assertEquals(json, { b: 0, x: 0, y: 0, customData: { test: true } });
        }
    }
});
