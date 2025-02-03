import { assertObjectMatch } from '../assert.ts';
import { assertEquals, Chain, v3, v4 } from '../deps.ts';

const schemaList = [
   [v4.chain, 'V4 Chain'],
   [v3.chain, 'V3 Chain'],
] as const;
const BaseClass = Chain;
const defaultValue = Chain.defaultValue;
const nameTag = 'Chain';

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
      color: 1,
      posX: 2,
      posY: 3,
      direction: 1,
      tailTime: 2,
      tailPosX: 3,
      tailPosY: 2,
      sliceCount: 4,
      squish: 0.5,
      laneRotation: 15,
      tailLaneRotation: 30,
      customData: { test: true },
   });
   assertObjectMatch(
      obj,
      {
         time: 1,
         color: 1,
         posX: 2,
         posY: 3,
         direction: 1,
         tailTime: 2,
         tailPosX: 3,
         tailPosY: 2,
         sliceCount: 4,
         squish: 0.5,
         laneRotation: 15,
         tailLaneRotation: 30,
         customData: { test: true },
      },
      `Unexpected instantiated value for ${nameTag}`,
   );

   obj = new BaseClass({
      time: 1,
      posX: 2,
      direction: 1,
      tailPosY: 2,
      sliceCount: 4,
      squish: 0.5,
   });
   assertObjectMatch(
      obj,
      {
         ...defaultValue,
         time: 1,
         posX: 2,
         direction: 1,
         tailPosY: 2,
         sliceCount: 4,
         squish: 0.5,
      },
      `Unexpected partially instantiated value for ${nameTag}`,
   );
});

for (const tup of schemaList) {
   const nameTag = tup[1];
   const schema = tup[0];
   Deno.test(`${nameTag} from JSON instantiation`, () => {
      // deno-lint-ignore no-explicit-any
      let obj = new BaseClass(schema.deserialize({} as any));
      assertObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.chain:
            obj = new BaseClass(
               (schema as typeof v4.chain).deserialize({
                  object: {
                     hb: 1,
                     hr: 15,
                     tb: 2,
                     tr: 30,
                     i: 0,
                     ci: 0,
                     customData: {},
                  },
                  data: {
                     x: 2,
                     y: 3,
                     c: 1,
                     d: 1,
                     a: 0,
                     customData: {},
                  },
                  chainData: {
                     tx: 3,
                     ty: 2,
                     c: 4,
                     s: 0.5,
                     customData: { test: true },
                  },
               }),
            );
            break;
         case v3.chain:
            obj = new BaseClass(
               (schema as typeof v3.chain).deserialize({
                  b: 1,
                  c: 1,
                  x: 2,
                  y: 3,
                  d: 1,
                  tb: 2,
                  tx: 3,
                  ty: 2,
                  sc: 4,
                  s: 0.5,
                  customData: { test: true },
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
            direction: 1,
            tailTime: 2,
            tailPosX: 3,
            tailPosY: 2,
            sliceCount: 4,
            squish: 0.5,
            laneRotation: schema === v3.chain ? 0 : 15,
            tailLaneRotation: schema === v3.chain ? 0 : 30,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (schema) {
         case v4.chain:
            obj = new BaseClass(
               (schema as typeof v4.chain).deserialize({
                  object: {
                     tb: 2,
                  },
                  data: {
                     x: 2,
                     y: 3,
                  },
                  chainData: {
                     tx: 3,
                     c: 2,
                     s: 0.5,
                     customData: { test: true },
                  },
               }),
            );
            break;
         case v3.chain:
            obj = new BaseClass(
               (schema as typeof v3.chain).deserialize({
                  x: 2,
                  y: 3,
                  tb: 2,
                  tx: 3,
                  sc: 2,
                  s: 0.5,
                  customData: { test: true },
               }),
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            ...defaultValue,
            posX: 2,
            posY: 3,
            tailTime: 2,
            tailPosX: 3,
            sliceCount: 2,
            squish: 0.5,
            customData: { test: true },
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({ customData: { test: true } });
      const json = schema.serialize(obj);
      switch (schema) {
         case v4.chain:
            assertEquals(json, {
               object: {
                  hb: 0,
                  hr: 0,
                  tb: 0,
                  tr: 0,
                  i: 0,
                  ci: 0,
                  customData: {},
               },
               data: {
                  x: 0,
                  y: 0,
                  c: 0,
                  d: 0,
                  a: 0,
                  customData: {},
               },
               chainData: {
                  tx: 0,
                  ty: 0,
                  c: 0,
                  s: 0,
                  customData: { test: true },
               },
            });
            break;
         case v3.chain:
            assertEquals(json, {
               b: 0,
               c: 0,
               x: 0,
               y: 0,
               d: 0,
               tb: 0,
               tx: 0,
               ty: 0,
               sc: 0,
               s: 0,
               customData: { test: true },
            });
            break;
      }
   });
}
