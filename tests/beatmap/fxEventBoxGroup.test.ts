import { FxEventBoxGroup, assertEquals, types, v3, v4 } from '../deps.ts';
import { assertObjectMatch } from '../assert.ts';

const schemaList = [
   [v4.fxEventBoxGroup, 'V4 Fx Event Event Box Group'],
   [v3.fxEventBoxGroup, 'V3 Fx Event Event Box Group'],
] as const;
const BaseClass = FxEventBoxGroup;
const defaultValue = FxEventBoxGroup.defaultValue;
const nameTag = 'Fx Event Event Box Group';

Deno.test(`${nameTag} constructor & create instantiation`, () => {
   let obj = new BaseClass();
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected default value for ${nameTag}`
   );

   obj = BaseClass.create()[0];
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected static create default value for ${nameTag}`
   );

   obj = BaseClass.create({}, {})[1];
   assertObjectMatch(
      obj,
      defaultValue,
      `Unexpected static create from array default value for ${nameTag}`
   );

   obj = new BaseClass({
      time: 1,
      id: 2,
      boxes: [
         {
            filter: {
               type: 2,
               p0: 1,
               p1: 2,
               reverse: 1,
               chunks: 4,
               random: 2,
               seed: 12345,
               limit: 1,
               limitAffectsType: 3,
               customData: { test1: true },
            },
            beatDistribution: 1,
            beatDistributionType: 2,
            fxDistribution: 1,
            fxDistributionType: 2,
            affectFirst: 1,
            easing: 2,
            events: [
               {
                  time: 1,
                  easing: 1,
                  previous: 0,
                  value: 420,
                  customData: { test2: true },
               },
            ],
            customData: { test3: true },
         },
      ],
      customData: { test: true },
   });
   assertObjectMatch(
      obj,
      {
         time: 1,
         id: 2,
         boxes: [
            {
               filter: {
                  type: 2,
                  p0: 1,
                  p1: 2,
                  reverse: 1,
                  chunks: 4,
                  random: 2,
                  seed: 12345,
                  limit: 1,
                  limitAffectsType: 3,
                  customData: { test1: true },
               },
               beatDistribution: 1,
               beatDistributionType: 2,
               fxDistribution: 1,
               fxDistributionType: 2,
               affectFirst: 1,
               easing: 2,
               events: [
                  {
                     time: 1,
                     easing: 1,
                     previous: 0,
                     value: 420,
                     customData: { test2: true },
                  },
               ],
               customData: { test3: true },
            },
         ],
         customData: { test: true },
      },
      `Unexpected instantiated value for ${nameTag}`
   );

   obj = new BaseClass({
      time: 1,
      boxes: [
         {
            filter: {
               type: 2,
               reverse: 1,
               chunks: 4,
               limitAffectsType: 3,
            },
            beatDistribution: 1,
            affectFirst: 1,
            easing: 2,
            events: [
               {
                  value: 420,
               },
            ],
         },
      ],
   });
   assertObjectMatch(
      obj,
      {
         time: 1,
         id: 0,
         boxes: [
            {
               filter: {
                  type: 2,
                  p0: 0,
                  p1: 0,
                  reverse: 1,
                  chunks: 4,
                  random: 0,
                  seed: 0,
                  limit: 0,
                  limitAffectsType: 3,
                  customData: {},
               },
               beatDistribution: 1,
               beatDistributionType: 1,
               fxDistribution: 0,
               fxDistributionType: 1,
               affectFirst: 1,
               easing: 2,
               events: [
                  {
                     time: 0,
                     easing: 0,
                     previous: 0,
                     value: 420,
                     customData: {},
                  },
               ],
               customData: {},
            },
         ],
         customData: {},
      },
      `Unexpected partially instantiated value for ${nameTag}`
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
         `Unexpected default value from JSON object for ${nameTag}`
      );

      switch (schema) {
         case v4.fxEventBoxGroup:
            obj = new BaseClass(
               (schema as typeof v4.fxEventBoxGroup).deserialize({
                  object: {
                     t: types.EventBoxType.FX_FLOAT,
                     b: 1,
                     g: 2,
                     e: [
                        {
                           e: 0,
                           f: 0,
                           l: [{ b: 1, i: 0, customData: {} }],
                           customData: {},
                        },
                     ],
                     customData: { test: true },
                  },
                  boxData: [
                     {
                        data: {
                           w: 1,
                           d: 2,
                           s: 1,
                           t: 2,
                           b: 1,
                           e: 2,
                           customData: { test3: true },
                        },
                        eventData: [
                           {
                              time: 1,
                              data: {
                                 e: 1,
                                 p: 1,
                                 v: 420,
                                 customData: { test2: true },
                              },
                           },
                        ],
                        filterData: {
                           f: 2,
                           p: 1,
                           t: 2,
                           r: 1,
                           c: 4,
                           n: 2,
                           s: 12345,
                           l: 1,
                           d: 3,
                           customData: { test1: true },
                        },
                     },
                  ],
               })
            );
            break;
         case v3.fxEventBoxGroup:
            obj = new BaseClass(
               (schema as typeof v3.fxEventBoxGroup).deserialize({
                  object: {
                     b: 1,
                     g: 2,
                     e: [],
                  },
                  boxData: [
                     {
                        data: {
                           f: {
                              f: 2,
                              p: 1,
                              t: 2,
                              r: 1,
                              c: 4,
                              n: 2,
                              s: 12345,
                              l: 1,
                              d: 3,
                              customData: { test1: true },
                           },
                           w: 1,
                           d: 2,
                           s: 1,
                           t: 2,
                           b: 1,
                           i: 2,
                           l: [0],
                           customData: { test3: true },
                        },
                        eventData: [
                           {
                              b: 1,
                              i: 1,
                              p: 1,
                              v: 420,
                              customData: { test2: true },
                           },
                        ],
                     },
                  ],
               })
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            time: 1,
            id: 2,
            boxes: [
               {
                  filter: {
                     type: 2,
                     p0: 1,
                     p1: 2,
                     reverse: 1,
                     chunks: 4,
                     random: 2,
                     seed: 12345,
                     limit: 1,
                     limitAffectsType: 3,
                     customData: { test1: true },
                  },
                  beatDistribution: 1,
                  beatDistributionType: 2,
                  fxDistribution: 1,
                  fxDistributionType: 2,
                  affectFirst: 1,
                  easing: 2,
                  events: [
                     {
                        time: 1,
                        easing: 1,
                        previous: 1,
                        value: 420,
                        customData: { test2: true },
                     },
                  ],
                  customData: { test3: true },
               },
            ],
            customData: {},
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`
      );

      switch (schema) {
         case v4.fxEventBoxGroup:
            obj = new BaseClass(
               (schema as typeof v4.fxEventBoxGroup).deserialize({
                  object: {
                     t: types.EventBoxType.FX_FLOAT,
                     b: 1,
                  },
                  boxData: [
                     {
                        data: {
                           w: 1,
                           b: 1,
                           e: 2,
                        },
                        eventData: [
                           {
                              data: { v: 420 },
                           },
                        ],
                        filterData: {
                           f: 2,
                           r: 1,
                           c: 4,
                           d: 3,
                        },
                     },
                  ],
               })
            );
            break;
         case v3.fxEventBoxGroup:
            obj = new BaseClass(
               (schema as typeof v3.fxEventBoxGroup).deserialize({
                  object: {
                     b: 1,
                     e: [],
                  },
                  boxData: [
                     {
                        data: {
                           f: {
                              f: 2,
                              r: 1,
                              c: 4,
                              d: 3,
                           },
                           w: 1,
                           b: 1,
                           i: 2,
                           l: [0],
                        },
                        eventData: [
                           {
                              v: 420,
                           },
                        ],
                     },
                  ],
               })
            );
            break;
      }
      assertObjectMatch(
         obj,
         {
            time: 1,
            id: 0,
            boxes: [
               {
                  filter: {
                     type: 2,
                     p0: 0,
                     p1: 0,
                     reverse: 1,
                     chunks: 4,
                     random: 0,
                     seed: 0,
                     limit: 0,
                     limitAffectsType: 3,
                     customData: {},
                  },
                  beatDistribution: 1,
                  beatDistributionType: 1,
                  fxDistribution: 0,
                  fxDistributionType: 1,
                  affectFirst: 1,
                  easing: 2,
                  events: [
                     {
                        time: 0,
                        easing: 0,
                        previous: 0,
                        value: 420,
                        customData: {},
                     },
                  ],
                  customData: {},
               },
            ],
            customData: {},
         },
         `Unexpected partially instantiated value from JSON object for ${nameTag}`
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new BaseClass({
         boxes: [{ events: [{}] }],
         customData: { test: true },
      });
      const json = schema.serialize(obj);
      switch (schema) {
         case v4.fxEventBoxGroup:
            assertEquals(json, {
               object: {
                  t: types.EventBoxType.FX_FLOAT,
                  b: 0,
                  g: 0,
                  e: [],
                  customData: { test: true },
               },
               boxData: [
                  {
                     filterData: {
                        f: 1,
                        p: 0,
                        t: 0,
                        r: 0,
                        c: 0,
                        n: 0,
                        s: 0,
                        l: 0,
                        d: 0,
                        customData: {},
                     },
                     data: {
                        w: 0,
                        d: 1,
                        s: 0,
                        t: 1,
                        b: 0,
                        e: 0,
                        customData: {},
                     },
                     eventData: [
                        {
                           time: 0,
                           data: {
                              e: 0,
                              p: 0,
                              v: 0,
                              customData: {},
                           },
                        },
                     ],
                  },
               ],
            });
            break;
         case v3.fxEventBoxGroup:
            assertEquals(json, {
               object: {
                  t: types.FxType.FLOAT,
                  b: 0,
                  g: 0,
                  e: [],
                  customData: { test: true },
               },
               boxData: [
                  {
                     data: {
                        f: {
                           f: 1,
                           p: 0,
                           t: 0,
                           r: 0,
                           c: 0,
                           n: 0,
                           s: 0,
                           l: 0,
                           d: 0,
                           customData: {},
                        },
                        w: 0,
                        d: 1,
                        s: 0,
                        t: 1,
                        b: 0,
                        i: 0,
                        l: [],
                        customData: {},
                     },
                     eventData: [
                        {
                           b: 0,
                           i: 0,
                           p: 0,
                           v: 0,
                           customData: {},
                        },
                     ],
                  },
               ],
            });
            break;
      }
   });
}
