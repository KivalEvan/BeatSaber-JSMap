import { assertEquals, types, v1, v2, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Obstacle';
const classList = [v3.Obstacle, v2.Obstacle, v1.Obstacle];
const defaultValue = {
   time: 0,
   posX: 0,
   posY: 0,
   duration: 0,
   width: 0,
   height: 0,
   customData: {},
};

Deno.test(`${name} instantiation`, () => {
   let obj;

   for (const Class of classList) {
      obj = new Class();
      assertClassObjectMatch(
         obj,
         { ...defaultValue, height: obj instanceof v3.Obstacle ? 0 : 5 },
         `Unexpected default value for ${Class.name}`,
      );
      obj = Class.create()[0];
      assertClassObjectMatch(
         obj,
         { ...defaultValue, height: obj instanceof v3.Obstacle ? 0 : 5 },
         `Unexpected static create default value for ${Class.name}`,
      );
      obj = Class.create({}, {})[1];
      assertClassObjectMatch(
         obj,
         { ...defaultValue, height: obj instanceof v3.Obstacle ? 0 : 5 },
         `Unexpected static create from array default value for ${Class.name}`,
      );

      obj = new Class({
         time: 1,
         posX: 2,
         posY: 3,
         duration: 1,
         width: 2,
         height: 5,
         customData: { test: true },
      });
      if (obj instanceof v1.Obstacle) {
         assertClassObjectMatch(
            obj,
            {
               time: 1,
               posX: 2,
               posY: 0,
               duration: 1,
               width: 2,
               height: 5,
               customData: {},
            },
            `Unexpected instantiated value for ${Class.name}`,
         );
      }
      if (obj instanceof v2.Obstacle) {
         assertClassObjectMatch(
            obj,
            {
               time: 1,
               posX: 2,
               posY: 0,
               duration: 1,
               width: 2,
               height: 5,
               customData: {},
            },
            `Unexpected instantiated value for ${Class.name}`,
         );
      }
      if (obj instanceof v3.Obstacle) {
         assertClassObjectMatch(
            obj,
            {
               time: 1,
               posX: 2,
               posY: 3,
               duration: 1,
               width: 2,
               height: 5,
               customData: { test: true },
            },
            `Unexpected instantiated value for ${Class.name}`,
         );
      }

      obj = new Class({
         time: 1,
         posX: 2,
         width: 2,
      });
      assertClassObjectMatch(
         obj,
         {
            ...defaultValue,
            time: 1,
            posX: 2,
            width: 2,
            height: obj instanceof v3.Obstacle ? 0 : 5,
         },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v1.Obstacle) {
         obj = new Class({
            _time: 1,
            _lineIndex: 2,
            _type: 1,
            _duration: 1,
            _width: 2,
         });
         assertClassObjectMatch(
            obj,
            {
               time: 1,
               posX: 2,
               posY: 2,
               duration: 1,
               width: 2,
               height: 3,
            },
            `Unexpected instantiated value from JSON object for ${Class.name}`,
         );
         continue;
      }
      if (obj instanceof v2.Obstacle) {
         obj = new Class({
            _time: 1,
            _lineIndex: 2,
            _type: 1,
            _duration: 1,
            _width: 2,
            _customData: { test: true },
         });
      }
      if (obj instanceof v3.Obstacle) {
         obj = new Class({
            b: 1,
            x: 2,
            y: 2,
            d: 1,
            w: 2,
            h: 3,
            customData: { test: true },
         });
      }
      assertClassObjectMatch(
         obj,
         {
            time: 1,
            posX: 2,
            posY: 2,
            duration: 1,
            width: 2,
            height: 3,
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
      if (obj instanceof v3.Obstacle) {
         assertEquals(json, {
            b: 0,
            x: 0,
            y: 0,
            d: 0,
            w: 0,
            h: 0,
            customData: { test: true },
         });
      }
      if (obj instanceof v2.Obstacle) {
         assertEquals(json as types.v2.IObstacle, {
            _time: 0,
            _lineIndex: 0,
            _type: 0,
            _duration: 0,
            _width: 0,
            _customData: { test: true },
         });
      }
      if (obj instanceof v1.Obstacle) {
         assertEquals(json, {
            _time: 0,
            _lineIndex: 0,
            _type: 0,
            _duration: 0,
            _width: 0,
         });
      }
   }
});
