import { assertEquals, types, v1, v2, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.ColorNote, 'V4 Color Note'],
   [v3.ColorNote, 'V3 Color Note'],
   [v2.Note, 'V2 Note'],
   [v1.Note, 'V1 Note'],
] as const;
const defaultValue = {
   time: 0,
   color: 0,
   posX: 0,
   posY: 0,
   direction: 0,
   angleOffset: 0,
   laneRotation: 0,
   customData: {},
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

      obj = Class.create()[0];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create default value for ${nameTag}`,
      );

      obj = Class.create({}, {})[1];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create from array default value for ${nameTag}`,
      );

      obj = new Class({
         time: 4,
         color: 1,
         posX: 2,
         posY: 3,
         direction: 2,
         angleOffset: 15,
         laneRotation: 15,
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
         {
            time: 4,
            color: 1,
            posX: 2,
            posY: 3,
            direction: 2,
            angleOffset: Class === v1.Note || Class === v2.Note ? 0 : 15,
            laneRotation: Class === v1.Note || Class === v2.Note || Class === v3.ColorNote ? 0 : 15,
            customData: Class === v1.Note ? {} : { test: true },
         },
         `Unexpected instantiated value for ${nameTag}`,
      );

      obj = new Class({
         time: 4,
         color: 1,
         direction: 2,
      });
      assertClassObjectMatch(
         obj,
         { ...defaultValue, time: 4, color: 1, direction: 2 },
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj;
      switch (Class) {
         case v4.ColorNote:
            obj = Class.fromJSON();
            break;
         case v3.ColorNote:
            obj = Class.fromJSON();
            break;
         case v2.Note:
            obj = Class.fromJSON();
            break;
         case v1.Note:
            obj = Class.fromJSON();
            break;
      }
      assertClassObjectMatch(
         obj!,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.ColorNote:
            obj = Class.fromJSON(
               {
                  b: 1,
                  i: 0,
                  r: 15,
               },
               {
                  c: 1,
                  x: 2,
                  y: 3,
                  d: 2,
                  a: 15,
                  customData: { test: true },
               },
            );
            break;
         case v3.ColorNote:
            obj = Class.fromJSON({
               b: 1,
               c: 1,
               x: 2,
               y: 3,
               d: 2,
               a: 15,
               customData: { test: true },
            });
            break;
         case v2.Note:
            obj = Class.fromJSON({
               _time: 1,
               _lineIndex: 2,
               _lineLayer: 3,
               _type: 1,
               _cutDirection: 2,
               _customData: { test: true },
            });
            break;
         case v1.Note:
            obj = Class.fromJSON({
               _time: 1,
               _lineIndex: 2,
               _lineLayer: 3,
               _type: 1,
               _cutDirection: 2,
            });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            time: 1,
            color: 1,
            posX: 2,
            posY: 3,
            direction: 2,
            angleOffset: Class === v1.Note || Class === v2.Note ? 0 : 15,
            laneRotation: Class === v1.Note || Class === v2.Note || Class === v3.ColorNote ? 0 : 15,
            customData: Class === v1.Note ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.ColorNote:
            obj = Class.fromJSON(
               {
                  b: 1,
               },
               {
                  x: 2,
                  d: 2,
               },
            );
            break;
         case v3.ColorNote:
            obj = Class.fromJSON({
               b: 1,
               x: 2,
               d: 2,
            });
            break;
         case v2.Note:
            obj = Class.fromJSON({
               _time: 1,
               _lineIndex: 2,
               _cutDirection: 2,
            });
            break;
         case v1.Note:
            obj = Class.fromJSON({
               _time: 1,
               _lineIndex: 2,
               _cutDirection: 2,
            });
            break;
      }
      assertClassObjectMatch(
         obj!,
         {
            ...defaultValue,
            time: 1,
            posX: 2,
            direction: 2,
         },
         `Unexpected partially value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({ customData: { test: true } });
      const json = obj.toJSON();
      switch (Class) {
         case v4.ColorNote:
            assertEquals(json, {
               object: { b: 0, i: 0, r: 0, customData: {} },
               data: {
                  c: 0,
                  x: 0,
                  y: 0,
                  d: 0,
                  a: 0,
                  customData: { test: true },
               },
            });
            break;
         case v3.ColorNote:
            assertEquals(json, {
               b: 0,
               c: 0,
               x: 0,
               y: 0,
               d: 0,
               a: 0,
               customData: { test: true },
            });
            break;
         case v2.Note:
            assertEquals(json as types.v2.INote, {
               _time: 0,
               _lineIndex: 0,
               _lineLayer: 0,
               _type: 0,
               _cutDirection: 0,
               _customData: { test: true },
            });
            break;
         case v1.Note:
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _lineLayer: 0,
               _type: 0,
               _cutDirection: 0,
            });
            break;
      }
   });
}
