import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   ColorNote,
   deserializeV1ColorNote,
   deserializeV2ColorNote,
   deserializeV3ColorNote,
   deserializeV4ColorNote,
   serializeV1ColorNote,
   serializeV2ColorNote,
   serializeV3ColorNote,
   serializeV4ColorNote,
} from '../deps.ts';

const schemaList = [
   [deserializeV4ColorNote, serializeV4ColorNote, 'V4 Color Note'],
   [deserializeV3ColorNote, serializeV3ColorNote, 'V3 Color Note'],
   [deserializeV2ColorNote, serializeV2ColorNote, 'V2 Note'],
   [deserializeV1ColorNote, serializeV1ColorNote, 'V1 Note'],
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
   const nameTag = tup[2];
   // deno-lint-ignore no-explicit-any
   const schema = tup[0] as any;
   // deno-lint-ignore no-explicit-any
   const serializer = tup[1] as any;
   Deno.test(`${nameTag} from JSON instantiation`, () => {
      // deno-lint-ignore no-explicit-any
      let obj = new BaseClass(schema({} as any));
      assertObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Color Note':
            obj = new BaseClass(
               schema({
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
         case 'V3 Color Note':
            obj = new BaseClass(
               schema({
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
         case 'V2 Note':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _lineIndex: 2,
                  _lineLayer: 3,
                  _type: 1,
                  _cutDirection: 2,
                  _customData: { test: true },
               }),
            );
            break;
         case 'V1 Note':
            obj = new BaseClass(
               schema({
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
            angleOffset: nameTag === 'V1 Note' || nameTag === 'V2 Note' ? 0 : 15,
            laneRotation: nameTag === 'V1 Note' ||
                  nameTag === 'V2 Note' ||
                  nameTag === 'V3 Color Note'
               ? 0
               : 15,
            customData: nameTag === 'V1 Note' ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Color Note':
            obj = new BaseClass(
               schema({
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
         case 'V3 Color Note':
            obj = new BaseClass(
               schema({
                  b: 1,
                  x: 2,
                  d: 2,
               }),
            );
            break;
         case 'V2 Note':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _lineIndex: 2,
                  _cutDirection: 2,
               }),
            );
            break;
         case 'V1 Note':
            obj = new BaseClass(
               schema({
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
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Color Note':
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
         case 'V3 Color Note':
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
         case 'V2 Note':
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _lineLayer: 0,
               _type: 0,
               _cutDirection: 0,
               _customData: { test: true },
            });
            break;
         case 'V1 Note':
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
