import { assertEquals, types, v1, v2, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Event';
const classList = [v3.BasicEvent, v2.Event, v1.Event];
const defaultValue = { time: 0, type: 0, value: 0, floatValue: 0, customData: {} };

Deno.test(`${name} instantiation`, () => {
   let obj;

   for (const Class of classList) {
      obj = new Class();
      assertClassObjectMatch(
         obj,
         { ...defaultValue, floatValue: obj instanceof v1.Event ? 1 : 0 },
         `Unexpected default value for ${Class.name}`,
      );
      obj = Class.create()[0];
      assertClassObjectMatch(
         obj,
         { ...defaultValue, floatValue: obj instanceof v1.Event ? 1 : 0 },
         `Unexpected static create default value for ${Class.name}`,
      );
      obj = Class.create({}, {})[1];
      assertClassObjectMatch(
         obj,
         { ...defaultValue, floatValue: obj instanceof v1.Event ? 1 : 0 },
         `Unexpected static create from array default value for ${Class.name}`,
      );

      obj = new Class({
         time: 1,
         type: 5,
         value: 1,
         floatValue: 0.5,
         customData: { test: true },
      });
      if (obj instanceof v1.Event) {
         assertClassObjectMatch(
            obj,
            { time: 1, type: 5, value: 1, floatValue: 1, customData: {} },
            `Unexpected instantiated value for ${Class.name}`,
         );
      } else {
         assertClassObjectMatch(
            obj,
            { time: 1, type: 5, value: 1, floatValue: 0.5, customData: { test: true } },
            `Unexpected instantiated value for ${Class.name}`,
         );
      }

      obj = new Class({ time: 4, type: 2 });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, time: 4, type: 2, floatValue: obj instanceof v1.Event ? 1 : 0 },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v1.Event) {
         obj = new Class({ _time: 1, _type: 4, _value: 2 });
         assertClassObjectMatch(
            obj,
            { time: 1, type: 4, value: 2, floatValue: 1 },
            `Unexpected instantiated value from JSON object for ${Class.name}`,
         );
         continue;
      }
      if (obj instanceof v2.Event) {
         obj = new Class({
            _time: 1,
            _type: 4,
            _value: 2,
            _floatValue: 0.5,
            _customData: { test: true },
         });
      }
      if (obj instanceof v3.BasicEvent) {
         obj = new Class({ b: 1, et: 4, i: 2, f: 0.5, customData: { test: true } });
      }
      assertClassObjectMatch(
         obj,
         { time: 1, type: 4, value: 2, floatValue: 0.5, customData: { test: true } },
         `Unexpected instantiated value from JSON object for ${Class.name}`,
      );
   }
});

Deno.test(`${name} to JSON object`, () => {
   for (const Class of classList) {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      if (obj instanceof v3.BasicEvent) {
         assertEquals(json, { b: 0, et: 0, i: 0, f: 0, customData: { test: true } });
      }
      if (obj instanceof v2.Event) {
         assertEquals(json as types.v2.IEvent, {
            _time: 0,
            _type: 0,
            _value: 0,
            _floatValue: 0,
            _customData: { test: true },
         });
      }
      if (obj instanceof v1.Event) {
         assertEquals(json, { _time: 0, _type: 0, _value: 0 });
      }
   }
});
