import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   BombNote,
   deserializeV1BombNote,
   deserializeV2BombNote,
   deserializeV3BombNote,
   deserializeV4BombNote,
   serializeV1BombNote,
   serializeV2BombNote,
   serializeV3BombNote,
   serializeV4BombNote,
} from '../deps.ts';

const schemaList = [
   [deserializeV4BombNote, serializeV4BombNote, 'V4 Bomb Note'],
   [deserializeV3BombNote, serializeV3BombNote, 'V3 Bomb Note'],
   [deserializeV2BombNote, serializeV2BombNote, 'V2 Bomb Note'],
   [deserializeV1BombNote, serializeV1BombNote, 'V1 Bomb Note'],
] as const;
const BaseClass = BombNote;
const defaultValue = BombNote.defaultValue;
const nameTag = 'Bomb Note';

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
      time: 1,
      posX: 3,
      posY: 4,
      customData: { test: true },
   });
   assertObjectMatch(
      obj,
      { time: 1, posX: 3, posY: 4, customData: { test: true } },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({ time: 4, posY: 2 });
   assertObjectMatch(
      obj,
      { ...defaultValue, time: 4, posY: 2 },
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
         case 'V4 Bomb Note':
            obj = new BaseClass(
               schema({
                  object: { b: 1, i: 0, r: 15 },
                  data: { x: 3, y: 4, customData: { test: true } },
               }),
            );
            break;
         case 'V3 Bomb Note':
            obj = new BaseClass(
               schema({
                  b: 1,
                  x: 3,
                  y: 4,
                  customData: { test: true },
               }),
            );
            break;
         case 'V2 Bomb Note':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _lineIndex: 3,
                  _lineLayer: 4,
                  _customData: { test: true },
               }),
            );
            break;
         case 'V1 Bomb Note':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _lineIndex: 3,
                  _lineLayer: 4,
                  _type: 3,
                  _cutDirection: 0,
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            time: 1,
            posX: 3,
            posY: 4,
            laneRotation: nameTag === 'V4 Bomb Note' ? 15 : 0,
            customData: nameTag === 'V1 Bomb Note' ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Bomb Note':
            obj = new BaseClass(
               schema({
                  object: {
                     b: 1,
                  },
                  data: {
                     x: 3,
                  },
               }),
            );
            break;
         case 'V3 Bomb Note':
            obj = new BaseClass(
               schema({
                  b: 1,
                  x: 3,
               }),
            );
            break;
         case 'V2 Bomb Note':
            obj = new BaseClass(
               schema({
                  _time: 1,
                  _lineIndex: 3,
               }),
            );
            break;
         case 'V1 Bomb Note':
            obj = new BaseClass(
               schema({ _time: 1, _lineIndex: 3 }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            ...defaultValue,
            time: 1,
            posX: 3,
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Bomb Note':
            assertEquals(json, {
               object: { b: 0, i: 0, r: 0, customData: {} },
               data: { x: 0, y: 0, customData: { test: true } },
            });
            break;
         case 'V3 Bomb Note':
            assertEquals(json, {
               b: 0,
               x: 0,
               y: 0,
               customData: { test: true },
            });
            break;
         case 'V2 Bomb Note':
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _lineLayer: 0,
               _type: 3,
               _cutDirection: 0,
               _customData: { test: true },
            });
            break;
         case 'V1 Bomb Note':
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _lineLayer: 0,
               _type: 3,
               _cutDirection: 0,
            });
            break;
      }
   });
}
