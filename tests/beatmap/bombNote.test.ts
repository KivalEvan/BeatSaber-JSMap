import { assertEquals, BombNote, v1, v2, v3, v4 } from '../deps.ts';
import { assertObjectMatch } from '../assert.ts';

const schemaList = [
   [v4.bombNote, 'V4 Bomb Note'],
   [v3.bombNote, 'V3 Bomb Note'],
   [v2.bombNote, 'V2 Bomb Note'],
   [v1.bombNote, 'V1 Bomb Note'],
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
         case v4.bombNote:
            obj = new BaseClass(
               schema.deserialize({
                  object: { b: 1, i: 0, r: 15 },
                  data: { x: 3, y: 4, customData: { test: true } },
               }),
            );
            break;
         case v3.bombNote:
            obj = new BaseClass(
               schema.deserialize({
                  b: 1,
                  x: 3,
                  y: 4,
                  customData: { test: true },
               }),
            );
            break;
         case v2.bombNote:
         case v1.bombNote:
            obj = new BaseClass(
               schema.deserialize({
                  _time: 1,
                  _lineIndex: 3,
                  _lineLayer: 4,
                  _customData: { test: true },
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
            laneRotation: schema === v4.bombNote ? 15 : 0,
            customData: schema === v1.bombNote ? {} : { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.bombNote:
            obj = new BaseClass(
               schema.deserialize({ object: { b: 1 }, data: { x: 3 } }),
            );
            break;
         case v3.bombNote:
            obj = new BaseClass(
               schema.deserialize({
                  b: 1,
                  x: 3,
               }),
            );
            break;
         case v2.bombNote:
         case v1.bombNote:
            obj = new BaseClass(
               schema.deserialize({
                  _time: 1,
                  _lineIndex: 3,
               }),
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
      const json = schema.serialize(obj);
      switch (schema) {
         case v4.bombNote:
            assertEquals(json, {
               object: { b: 0, i: 0, r: 0, customData: {} },
               data: { x: 0, y: 0, customData: { test: true } },
            });
            break;
         case v3.bombNote:
            assertEquals(json, {
               b: 0,
               x: 0,
               y: 0,
               customData: { test: true },
            });
            break;
         case v2.bombNote:
            assertEquals(json, {
               _time: 0,
               _lineIndex: 0,
               _lineLayer: 0,
               _type: 3,
               _cutDirection: 0,
               _customData: { test: true },
            });
            break;
         case v1.bombNote:
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
