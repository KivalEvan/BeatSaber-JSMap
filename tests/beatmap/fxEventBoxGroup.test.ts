import { assertEquals, types, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.FxEventBoxGroup, 'V4 Fx Event Event Box Group'],
   [v3.FxEventBoxGroup, 'V3 Fx Event Event Box Group'],
] as const;
const defaultValue = {
   time: 0,
   id: 0,
   boxes: [],
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
      assertClassObjectMatch(
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
         `Unexpected instantiated value for ${nameTag}`,
      );

      obj = new Class({
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
      assertClassObjectMatch(
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
         `Unexpected partially instantiated value for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} from JSON instantiation`, () => {
      let obj;
      switch (Class) {
         case v4.FxEventBoxGroup:
            obj = Class.fromJSON();
            break;
         case v3.FxEventBoxGroup:
            obj = Class.fromJSON();
            break;
      }
      assertClassObjectMatch(
         obj!,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.FxEventBoxGroup:
            obj = Class.fromJSON(
               {
                  t: types.EventBoxType.COLOR,
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
               [
                  {
                     w: 1,
                     d: 2,
                     s: 1,
                     t: 2,
                     b: 1,
                     e: 2,
                     customData: { test3: true },
                  },
               ],
               [
                  {
                     e: 1,
                     p: 1,
                     v: 420,
                     customData: { test2: true },
                  },
               ],
               [
                  {
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
               ],
            );
            break;
         case v3.FxEventBoxGroup:
            obj = Class.fromJSON(
               {
                  b: 1,
                  g: 2,
                  e: [
                     {
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
                  ],
               },
               [
                  {
                     b: 1,
                     i: 1,
                     p: 1,
                     v: 420,
                     customData: { test2: true },
                  },
               ],
            );
            break;
      }
      assertClassObjectMatch(
         obj!,
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
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.FxEventBoxGroup:
            obj = Class.fromJSON(
               {
                  t: types.EventBoxType.COLOR,
                  b: 1,
                  e: [
                     {
                        l: [{}],
                     },
                  ],
               },
               [
                  {
                     w: 1,
                     b: 1,
                     e: 2,
                  },
               ],
               [
                  {
                     v: 420,
                  },
               ],
               [
                  {
                     f: 2,
                     r: 1,
                     c: 4,
                     d: 3,
                  },
               ],
            );
            break;
         case v3.FxEventBoxGroup:
            obj = Class.fromJSON(
               {
                  b: 1,
                  e: [
                     {
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
                  ],
               },
               [
                  {
                     v: 420,
                  },
               ],
            );
            break;
      }
      assertClassObjectMatch(
         obj!,
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
         `Unexpected partially instantiated value from JSON object for ${nameTag}`,
      );
   });

   Deno.test(`${nameTag} to JSON object`, () => {
      const obj = new Class({
         boxes: [{ events: [{}] }],
         customData: { test: true },
      });
      const json = obj.toJSON();
      switch (Class) {
         case v4.FxEventBoxGroup:
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
         case v3.FxEventBoxGroup:
            assertEquals(json, {
               object: {
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
