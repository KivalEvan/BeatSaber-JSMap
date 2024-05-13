import { assertEquals, ColorNote, v1, v2, v3, v4 } from '../deps.ts';
import { assertObjectMatch } from '../assert.ts';

const schemaList = [
   [v4.colorNote, 'V4 Color Note'],
   [v3.colorNote, 'V3 Color Note'],
   [v2.colorNote, 'V2 Note'],
   [v1.colorNote, 'V1 Note'],
] as const;
const BaseClass = ColorNote;
const defaultValue = ColorNote.defaultValue;
const nameTag = 'Color Note';

Deno.test(`${nameTag} constructor & create instantiation`, () => {
   let obj = new BaseClass();
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected default value for ${nameTag}`,
   );

   obj = BaseClass.create()[0];
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected static create default value for ${nameTag}`,
   );

   obj = BaseClass.create({}, {})[1];
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected static create from array default value for ${nameTag}`,
   );

   obj = new BaseClass({
      time: 4,
      color: 1,
      posX: 2,
      posY: 3,
      direction: 2,
      angleOffset: 15,
      laneRotation: 15,
      customData: { test: true },
   });
   assertObjectMatch(
      obj,
      {
         time: 4,
         color: 1,
         posX: 2,
         posY: 3,
         direction: 2,
         angleOffset: 15,
         laneRotation: 15,
         customData: { test: true },
      },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({
      time: 4,
      color: 1,
      direction: 2,
   });
   assertObjectMatch(
      obj,
      { ...defaultValue, time: 4, color: 1, direction: 2 },
      `Unexpected partially instantiated value for ${nameTag}`,
   );
});

for (const tup of schemaList) {
   const nameTag = tup[1];
   const schema = tup[0];
   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj = new BaseClass(schema.deserialize());
      assertObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.colorNote:
            obj = new BaseClass(
               schema.deserialize({
                  object: {
                     b: 1,
                     i: 0,
                     r: 15,
                  },
                  data: {
                     c: 1,
                     x: 2,
                     y: 3,
                     d: 2,
                     a: 15,
                     customData: { test: true },
                  },
               }),
            );
            break;
         case v3.colorNote:
            obj = new BaseClass(
               schema.deserialize({
                  b: 1,
                  c: 1,
                  x: 2,
                  y: 3,
                  d: 2,
                  a: 15,
                  customData: { test: true },
               }),
            );
            break;
         case v2.colorNote:
            obj = new BaseClass(
               schema.deserialize({
                  _time: 1,
                  _lineIndex: 2,
                  _lineLayer: 3,
                  _type: 1,
                  _cutDirection: 2,
                  _customData: { test: true },
               }),
            );
            break;
         case v1.colorNote:
            obj = new BaseClass(
               schema.deserialize({
                  _time: 1,
                  _lineIndex: 2,
                  _lineLayer: 3,
                  _type: 1,
                  _cutDirection: 2,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            time: 1,
            color: 1,
            posX: 2,
            posY: 3,
            direction: 2,
            angleOffset: schema === v1.colorNote || schema === v2.colorNote ? 0 : 15,
            laneRotation: schema === v1.colorNote ||
                  schema === v2.colorNote ||
                  schema === v3.colorNote
               ? 0
               : 15,
            customData: schema === v1.colorNote ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.colorNote:
            obj = new BaseClass(
               schema.deserialize({
                  object: {
                     b: 1,
                  },
                  data: {
                     x: 2,
                     d: 2,
                  },
               }),
            );
            break;
         case v3.colorNote:
            obj = new BaseClass(
               schema.deserialize({
                  b: 1,
                  x: 2,
                  d: 2,
               }),
            );
            break;
         case v2.colorNote:
            obj = new BaseClass(
               schema.deserialize({
                  _time: 1,
                  _lineIndex: 2,
                  _cutDirection: 2,
               }),
            );
            break;
         case v1.colorNote:
            obj = new BaseClass(
               schema.deserialize({
                  _time: 1,
                  _lineIndex: 2,
                  _cutDirection: 2,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
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
      const obj = new BaseClass({ customData: { test: true } });
      const json = schema.serialize(obj);
      switch (schema) {
         case v4.colorNote:
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
         case v3.colorNote:
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
         case v2.colorNote:
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _lineLayer: 0,
               _type: 0,
               _cutDirection: 0,
               _customData: { test: true },
            });
            break;
         case v1.colorNote:
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
