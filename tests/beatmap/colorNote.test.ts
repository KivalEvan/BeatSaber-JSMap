import { assertEquals, types, v1, v2, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Note';
const classList = [v3.ColorNote, v2.Note, v1.Note];
const defaultValue = {
   time: 0,
   color: 0,
   posX: 0,
   posY: 0,
   direction: 0,
   angleOffset: 0,
   customData: {},
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

      obj = new Class({
         time: 4,
         color: 1,
         posX: 2,
         posY: 3,
         direction: 2,
         angleOffset: 15,
         customData: { test: true },
      });
      if (obj instanceof v1.Note) {
         assertClassObjectMatch(
            obj,
            {
               time: 4,
               color: 1,
               posX: 2,
               posY: 3,
               direction: 2,
               angleOffset: 0,
               customData: {},
            },
            `Unexpected instantiated value for ${Class.name}`,
         );
      }
      if (obj instanceof v2.Note) {
         assertClassObjectMatch(
            obj,
            {
               time: 4,
               color: 1,
               posX: 2,
               posY: 3,
               direction: 2,
               angleOffset: 0,
               customData: { test: true },
            },
            `Unexpected instantiated value for ${Class.name}`,
         );
      }
      if (obj instanceof v3.ColorNote) {
         assertClassObjectMatch(
            obj,
            {
               time: 4,
               color: 1,
               posX: 2,
               posY: 3,
               direction: 2,
               angleOffset: 15,
               customData: { test: true },
            },
            `Unexpected instantiated value for ${Class.name}`,
         );
      }

      obj = new Class({
         time: 4,
         color: 1,
         direction: 2,
      });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, time: 4, color: 1, direction: 2 },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v3.ColorNote) {
         obj = new Class({
            b: 1,
            c: 1,
            x: 2,
            y: 3,
            d: 2,
            a: 15,
            customData: { test: true },
         });
         assertClassObjectMatch(
            obj,
            {
               time: 1,
               color: 1,
               posX: 2,
               posY: 3,
               direction: 2,
               angleOffset: 15,
               customData: { test: true },
            },
            `Unexpected instantiated value from JSON object for ${Class.name}`,
         );
         continue;
      }
      if (obj instanceof v2.Note) {
         obj = new Class({
            _time: 1,
            _lineIndex: 2,
            _lineLayer: 3,
            _type: 1,
            _cutDirection: 2,
            _customData: { test: true },
         });
         assertClassObjectMatch(
            obj,
            {
               time: 1,
               color: 1,
               posX: 2,
               posY: 3,
               direction: 2,
               customData: { test: true },
            },
            `Unexpected instantiated value from JSON object for ${Class.name}`,
         );
         continue;
      }
      if (obj instanceof v1.Note) {
         obj = new Class({
            _time: 1,
            _lineIndex: 2,
            _lineLayer: 3,
            _type: 1,
            _cutDirection: 2,
         });
         assertClassObjectMatch(
            obj,
            {
               time: 1,
               color: 1,
               posX: 2,
               posY: 3,
               direction: 2,
            },
            `Unexpected instantiated value from JSON object for ${Class.name}`,
         );
         continue;
      }
   }
});

Deno.test(`${name} to JSON object`, () => {
   for (const Class of classList) {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      if (obj instanceof v3.ColorNote) {
         assertEquals(json, {
            b: 0,
            c: 0,
            x: 0,
            y: 0,
            d: 0,
            a: 0,
            customData: { test: true },
         });
      }
      if (obj instanceof v2.Note) {
         assertEquals(json as types.v2.INote, {
            _time: 0,
            _lineIndex: 0,
            _lineLayer: 0,
            _type: 0,
            _cutDirection: 0,
            _customData: { test: true },
         });
      }
      if (obj instanceof v1.Note) {
         assertEquals(json, {
            _time: 0,
            _lineIndex: 0,
            _lineLayer: 0,
            _type: 0,
            _cutDirection: 0,
         });
      }
   }
});
