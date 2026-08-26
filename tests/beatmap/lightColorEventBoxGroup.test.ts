import { assertObjectMatch } from '../assert.ts';
import {
   assertEquals,
   deserializeV3LightColorEventBoxGroup,
   deserializeV4LightColorEventBoxGroup,
   EventBoxType,
   LightColorEventBoxGroup,
   serializeV3LightColorEventBoxGroup,
   serializeV4LightColorEventBoxGroup,
} from '../deps.ts';

const schemaList = [
   [
      deserializeV4LightColorEventBoxGroup,
      serializeV4LightColorEventBoxGroup,
      'V4 Light Color Event Box Group',
   ],
   [
      deserializeV3LightColorEventBoxGroup,
      serializeV3LightColorEventBoxGroup,
      'V3 Light Color Event Box Group',
   ],
] as const;
const BaseClass = LightColorEventBoxGroup;
const defaultValue = LightColorEventBoxGroup.defaultValue;
const nameTag = 'Light Color Event Box Group';

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
            brightnessDistribution: 1,
            brightnessDistributionType: 2,
            affectFirst: 1,
            easing: 2,
            events: [
               {
                  time: 1,
                  color: 2,
                  brightness: 0.5,
                  frequency: 4,
                  strobeBrightness: 1,
                  strobeFade: 1,
                  easing: 1,
                  previous: 0,
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
               brightnessDistribution: 1,
               brightnessDistributionType: 2,
               affectFirst: 1,
               easing: 2,
               events: [
                  {
                     time: 1,
                     color: 2,
                     brightness: 0.5,
                     frequency: 4,
                     strobeBrightness: 1,
                     strobeFade: 1,
                     easing: 1,
                     previous: 0,
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
                  previous: 1,
                  frequency: 8,
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
               brightnessDistribution: 0,
               brightnessDistributionType: 1,
               affectFirst: 1,
               easing: 2,
               events: [
                  {
                     time: 0,
                     color: 0,
                     brightness: 0,
                     frequency: 8,
                     strobeBrightness: 0,
                     strobeFade: 0,
                     easing: 0,
                     previous: 1,
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
         case 'V4 Light Color Event Box Group':
            obj = new BaseClass(
               schema({
                  object: {
                     t: EventBoxType.COLOR,
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
                                 p: 0,
                                 c: 2,
                                 e: -1,
                                 b: 0.5,
                                 f: 4,
                                 sb: 1,
                                 sf: 1,
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
               }),
            );
            break;
         case 'V3 Light Color Event Box Group':
            obj = new BaseClass(
               schema({
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
                        r: 1,
                        t: 2,
                        b: 1,
                        i: 2,
                        e: [
                           {
                              b: 1,
                              i: 0,
                              c: 2,
                              s: 0.5,
                              f: 4,
                              sb: 1,
                              sf: 1,
                              customData: { test2: true },
                           },
                        ],
                        customData: { test3: true },
                     },
                  ],
               }),
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
                  brightnessDistribution: 1,
                  brightnessDistributionType: 2,
                  affectFirst: 1,
                  easing: 2,
                  events: [
                     {
                        time: 1,
                        color: 2,
                        brightness: 0.5,
                        frequency: 4,
                        strobeBrightness: 1,
                        strobeFade: 1,
                        easing: -1,
                        previous: 0,
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

      switch (nameTag) {
         case 'V4 Light Color Event Box Group':
            obj = new BaseClass(
               schema({
                  object: {
                     t: EventBoxType.COLOR,
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
                              time: 0,
                              data: {
                                 e: -1,
                                 p: 1,
                                 f: 8,
                              },
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
               }),
            );
            break;
         case 'V3 Light Color Event Box Group':
            obj = new BaseClass(
               schema({
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
                        e: [
                           {
                              i: 2,
                              f: 8,
                           },
                        ],
                     },
                  ],
               }),
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
                  brightnessDistribution: 0,
                  brightnessDistributionType: 1,
                  affectFirst: 1,
                  easing: 2,
                  events: [
                     {
                        time: 0,
                        color: 0,
                        brightness: 0,
                        frequency: 8,
                        strobeBrightness: 0,
                        strobeFade: 0,
                        easing: -1,
                        previous: 1,
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
      const obj = new BaseClass({
         boxes: [{ events: [{}] }],
         customData: { test: true },
      });
      const json = serializer(obj);
      switch (nameTag) {
         case 'V4 Light Color Event Box Group':
            assertEquals(json, {
               object: {
                  t: EventBoxType.COLOR,
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
                              p: 0,
                              c: 0,
                              e: 0,
                              b: 0,
                              f: 0,
                              sb: 0,
                              sf: 0,
                              customData: {},
                           },
                        },
                     ],
                  },
               ],
            });
            break;
         case 'V3 Light Color Event Box Group':
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
                     r: 0,
                     t: 1,
                     b: 0,
                     i: 0,
                     e: [
                        {
                           b: 0,
                           i: 1,
                           c: 0,
                           s: 0,
                           f: 0,
                           sb: 0,
                           sf: 0,
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
