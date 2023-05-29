import { assertEquals, v2, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Arc';
const classList = [v3.Arc, v2.Arc];
const defaultValue = {
    time: 0,
    color: 0,
    posX: 0,
    posY: 0,
    direction: 0,
    lengthMultiplier: 1,
    tailTime: 0,
    tailPosX: 0,
    tailPosY: 0,
    tailDirection: 0,
    tailLengthMultiplier: 1,
    midAnchor: 0,
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
            time: 2.5,
            color: 1,
            posX: 2,
            posY: 1,
            direction: 3,
            lengthMultiplier: 0.5,
            tailTime: 3,
            tailPosX: 2,
            tailPosY: 4,
            tailDirection: 6,
            tailLengthMultiplier: 0.5,
            midAnchor: 1,
            customData: { test: true },
        });
        assertClassObjectMatch(
            obj,
            {
                time: 2.5,
                color: 1,
                posX: 2,
                posY: 1,
                direction: 3,
                lengthMultiplier: 0.5,
                tailTime: 3,
                tailPosX: 2,
                tailPosY: 4,
                tailDirection: 6,
                tailLengthMultiplier: 0.5,
                midAnchor: 1,
                customData: { test: true },
            },
            `Unexpected instantiated value for ${Class.name}`,
        );

        obj = new Class({
            time: 2.5,
            color: 1,
            lengthMultiplier: 0.5,
            tailTime: 3,
            tailPosX: 2,
        });
        assertClassObjectMatch(
            obj,
            {
                ...defaultValue,
                time: 2.5,
                color: 1,
                lengthMultiplier: 0.5,
                tailTime: 3,
                tailPosX: 2,
            },
            `Unexpected partially instantiated value for ${Class.name}`,
        );

        if (obj instanceof v3.Arc) {
            obj = new Class({
                b: 2.5,
                c: 1,
                x: 2,
                y: 1,
                d: 3,
                mu: 0.5,
                tb: 3,
                tx: 2,
                ty: 4,
                tc: 6,
                tmu: 0.5,
                m: 1,
                customData: { test: true },
            });
        }
        if (obj instanceof v2.Arc) {
            obj = new Class({
                _colorType: 1,
                _headTime: 2.5,
                _headLineIndex: 2,
                _headLineLayer: 1,
                _headCutDirection: 3,
                _headControlPointLengthMultiplier: 0.5,
                _tailTime: 3,
                _tailLineIndex: 2,
                _tailLineLayer: 4,
                _tailCutDirection: 6,
                _tailControlPointLengthMultiplier: 0.5,
                _sliderMidAnchorMode: 1,
                _customData: { test: true },
            });
        }
        assertClassObjectMatch(
            obj,
            {
                time: 2.5,
                color: 1,
                posX: 2,
                posY: 1,
                direction: 3,
                lengthMultiplier: 0.5,
                tailTime: 3,
                tailPosX: 2,
                tailPosY: 4,
                tailDirection: 6,
                tailLengthMultiplier: 0.5,
                midAnchor: 1,
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
        if (obj instanceof v3.Arc) {
            assertEquals(json, {
                b: 0,
                c: 0,
                x: 0,
                y: 0,
                d: 0,
                mu: 1,
                tb: 0,
                tx: 0,
                ty: 0,
                tc: 0,
                tmu: 1,
                m: 0,
                customData: { test: true },
            });
        }
        if (obj instanceof v2.Arc) {
            assertEquals(json, {
                _colorType: 0,
                _headTime: 0,
                _headLineIndex: 0,
                _headLineLayer: 0,
                _headCutDirection: 0,
                _headControlPointLengthMultiplier: 1,
                _tailTime: 0,
                _tailLineIndex: 0,
                _tailLineLayer: 0,
                _tailCutDirection: 0,
                _tailControlPointLengthMultiplier: 1,
                _sliderMidAnchorMode: 0,
                _customData: { test: true },
            });
        }
    }
});
