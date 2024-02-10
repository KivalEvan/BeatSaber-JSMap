import { assertEquals, types, v3, v4 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const classList = [
   [v4.LightRotationEventBoxGroup, 'V4 Light Rotation Event Box Group'],
   [v3.LightRotationEventBoxGroup, 'V3 Light Rotation Event Box Group'],
] as const;
const defaultValue: types.wrapper.IWrapLightRotationEventBoxGroupAttribute = {
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
               rotationDistribution: 1,
               rotationDistributionType: 2,
               axis: 2,
               flip: 1,
               affectFirst: 1,
               easing: 2,
               events: [
                  {
                     time: 1,
                     previous: 1,
                     easing: 3,
                     loop: 1,
                     rotation: 120,
                     direction: 1,
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
                  rotationDistribution: 1,
                  rotationDistributionType: 2,
                  axis: 2,
                  flip: 1,
                  affectFirst: 1,
                  easing: 2,
                  events: [
                     {
                        time: 1,
                        previous: 1,
                        easing: 3,
                        loop: 1,
                        rotation: 120,
                        direction: 1,
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
               beatDistributionType: 2,
               rotationDistribution: 1,
               rotationDistributionType: 2,
               axis: 2,
               flip: 1,
               affectFirst: 1,
               easing: 2,
               events: [
                  {
                     time: 1,
                     previous: 1,
                     rotation: 120,
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
                  affectFirst: 1,
                  easing: 2,
                  events: [
                     {
                        time: 1,
                        previous: 1,
                        easing: 0,
                        loop: 0,
                        rotation: 120,
                        direction: 0,
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
      let obj = Class.fromJSON();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.LightRotationEventBoxGroup:
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
                     a: 2,
                     f: 1,
                     customData: { test: true },
                  },
               ],
               [
                  {
                     p: 1,
                     e: 3,
                     r: 120,
                     d: 1,
                     l: 1,
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
         case v3.LightRotationEventBoxGroup:
            obj = Class.fromJSON({
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
                     a: 2,
                     r: 1,
                     b: 1,
                     i: 2,
                     l: [
                        {
                           b: 1,
                           p: 1,
                           e: 3,
                           l: 1,
                           r: 120,
                           o: 1,
                           customData: { test2: true },
                        },
                     ],
                     customData: { test: true },
                  },
               ],
            });
            break;
      }
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
                  rotationDistribution: 1,
                  rotationDistributionType: 2,
                  axis: 2,
                  flip: 1,
                  affectFirst: 1,
                  easing: 2,
                  events: [
                     {
                        time: 1,
                        previous: 1,
                        easing: 3,
                        loop: 1,
                        rotation: 120,
                        direction: 1,
                        customData: { test2: true },
                     },
                  ],
                  customData: { test: true },
               },
            ],
            customData: {},
         },
         `Unexpected instantiated value from JSON object for ${nameTag}`,
      );

      switch (Class) {
         case v4.LightRotationEventBoxGroup:
            obj = Class.fromJSON(
               {
                  t: types.EventBoxType.COLOR,
                  b: 1,
                  e: [
                     {
                        l: [{ b: 1 }],
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
                     e: 3,
                     r: 120,
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
         case v3.LightRotationEventBoxGroup:
            obj = Class.fromJSON({
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
                     l: [
                        {
                           b: 1,
                           e: 3,
                           r: 120,
                        },
                     ],
                  },
               ],
            });
            break;
      }
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
                  rotationDistribution: 0,
                  rotationDistributionType: 1,
                  affectFirst: 1,
                  easing: 2,
                  events: [
                     {
                        time: 1,
                        previous: 0,
                        easing: 3,
                        loop: 0,
                        rotation: 120,
                        direction: 0,
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
         case v4.LightRotationEventBoxGroup:
            assertEquals(json, {
               object: {
                  t: types.EventBoxType.ROTATION,
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
                        f: 0,
                        a: 0,
                        customData: {},
                     },
                     eventData: [
                        {
                           time: 0,
                           data: {
                              p: 0,
                              e: 0,
                              l: 0,
                              r: 0,
                              d: 0,
                              customData: {},
                           },
                        },
                     ],
                  },
               ],
            });
            break;
         case v3.LightRotationEventBoxGroup:
            assertEquals(json, {
               b: 0,
               g: 0,
               e: [
                  {
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
                     a: 0,
                     r: 0,
                     b: 0,
                     i: 0,
                     l: [
                        {
                           b: 0,
                           p: 0,
                           e: 0,
                           l: 0,
                           r: 0,
                           o: 0,
                           customData: {},
                        },
                     ],
                     customData: {},
                  },
               ],
               customData: { test: true },
            });
            break;
      }
   });
}
