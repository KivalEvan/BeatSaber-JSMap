import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   Chain,
   deserializeV3Chain,
   deserializeV4Chain,
   serializeV3Chain,
   serializeV4Chain,
} from '../deps.ts';

const schemaList = [
   [deserializeV4Chain, serializeV4Chain, 'V4 Chain'],
   [deserializeV3Chain, serializeV3Chain, 'V3 Chain'],
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
         case 'V4 Chain':
            obj = new BaseClass(
               schema({
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
         case 'V3 Chain':
            obj = new BaseClass(
               schema({
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
            laneRotation: nameTag === 'V3 Chain' ? 0 : 15,
            tailLaneRotation: nameTag === 'V3 Chain' ? 0 : 30,
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (nameTag) {
         case 'V4 Chain':
            obj = new BaseClass(
               schema({
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
         case 'V3 Chain':
            obj = new BaseClass(
               schema({
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
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Chain':
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
         case 'V3 Chain':
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
