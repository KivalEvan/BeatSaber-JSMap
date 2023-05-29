import { assertEquals, v2, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Waypoint';
const classList = [v3.Waypoint, v2.Waypoint];
const defaultValue = {
    time: 0,
    posX: 0,
    posY: 0,
    direction: 0,
    customData: {},
};

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

        obj = new Class({
            time: 1,
            posX: 2,
            posY: 3,
            direction: 4,
            customData: { test: true },
        });
        assertClassObjectMatch(
            obj,
            {
                time: 1,
                posX: 2,
                posY: 3,
                direction: 4,
                customData: { test: true },
            },
            `Unexpected instantiated value for ${Class.name}`,
        );

        obj = new Class({
            time: 1,
            posY: 3,
        });
        assertClassObjectMatch(
            obj,
            { ...defaultValue, time: 1, posY: 3 },
            `Unexpected partially instantiated value for ${Class.name}`,
        );

        if (obj instanceof v3.Waypoint) {
            obj = new Class({
                b: 2.5,
                x: 2,
                y: 1,
                d: 3,
                customData: { test: true },
            });
        }
        if (obj instanceof v2.Waypoint) {
            obj = new Class({
                _time: 2.5,
                _lineIndex: 2,
                _lineLayer: 1,
                _offsetDirection: 3,
                _customData: { test: true },
            });
        }
        assertClassObjectMatch(
            obj,
            {
                time: 2.5,
                posX: 2,
                posY: 1,
                direction: 3,
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
        if (obj instanceof v3.Waypoint) {
            assertEquals(json, {
                b: 0,
                x: 0,
                y: 0,
                d: 0,
                customData: { test: true },
            });
        }
        if (obj instanceof v2.Waypoint) {
            assertEquals(json, {
                _time: 0,
                _lineIndex: 0,
                _lineLayer: 0,
                _offsetDirection: 0,
                _customData: { test: true },
            });
        }
    }
});
