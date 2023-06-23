import { assertEquals, v3 } from '../deps.ts';
import { assertClassObjectMatch } from '../assert.ts';

const name = 'Light Translation Event Box';
const classList = [v3.LightTranslationEventBox];
const defaultValue = {
   filter: {
      type: 1,
      p0: 0,
      p1: 0,
      reverse: 0,
      chunks: 0,
      random: 0,
      seed: 0,
      limit: 0,
      limitAffectsType: 0,
      customData: {},
   },
   beatDistribution: 0,
   beatDistributionType: 1,
   translationDistribution: 0,
   translationDistributionType: 1,
   axis: 0,
   flip: 0,
   affectFirst: 0,
   easing: 0,
   events: [],
   customData: {},
};

Deno.test(`${name} instantiation`, () => {
   let obj;

   for (const Class of classList) {
      obj = new Class();
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected default value for ${Class.name}`,
      );
      obj = Class.create()[0];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create default value for ${Class.name}`,
      );
      obj = Class.create({}, {})[1];
      assertClassObjectMatch(
         obj,
         defaultValue,
         `Unexpected static create from array default value for ${Class.name}`,
      );

      obj = new Class({
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
         translationDistribution: 1,
         translationDistributionType: 2,
         axis: 2,
         flip: 1,
         affectFirst: 1,
         easing: 2,
         events: [
            {
               time: 1,
               previous: 1,
               easing: 2,
               translation: 100,
               customData: { test: true },
            },
         ],
         customData: { test: true },
      });
      assertClassObjectMatch(
         obj,
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
            translationDistribution: 1,
            translationDistributionType: 2,
            axis: 2,
            flip: 1,
            affectFirst: 1,
            easing: 2,
            events: [
               {
                  time: 1,
                  previous: 1,
                  easing: 2,
                  translation: 100,
                  customData: { test: true },
               },
            ],
            customData: { test: true },
         },
         `Unexpected instantiated value for ${Class.name}`,
      );

      obj = new Class({
         filter: {
            type: 2,
            reverse: 1,
            chunks: 4,
            limitAffectsType: 3,
         },
         beatDistribution: 100,
         affectFirst: 1,
         easing: 2,
         events: [
            {
               time: 2,
               translation: 200,
            },
         ],
      });
      assertClassObjectMatch(
         obj,
         {
            ...defaultValue,
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
            beatDistribution: 100,
            affectFirst: 1,
            easing: 2,
            events: [
               {
                  time: 2,
                  previous: 0,
                  easing: 0,
                  translation: 200,
                  customData: {},
               },
            ],
         },
         `Unexpected partially instantiated value for ${Class.name}`,
      );

      if (obj instanceof v3.LightTranslationEventBox) {
         obj = new Class({
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
                  e: 2,
                  t: 100,
                  customData: { test2: true },
               },
            ],
            customData: { test: true },
         });
      }
      assertClassObjectMatch(
         obj,
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
            translationDistribution: 1,
            translationDistributionType: 2,
            axis: 2,
            flip: 1,
            affectFirst: 1,
            easing: 2,
            events: [
               {
                  time: 1,
                  previous: 1,
                  easing: 2,
                  translation: 100,
                  customData: { test2: true },
               },
            ],
            customData: { test: true },
         },
         `Unexpected instantiated value from JSON object for ${Class.name}`,
      );
   }
});

Deno.test(`${name} to JSON object`, () => {
   for (const Class of classList) {
      const obj = new Class({ events: [{}], customData: { test: true } });
      const json = obj.toJSON();
      if (obj instanceof v3.LightTranslationEventBox) {
         assertEquals(json, {
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
                  t: 0,
                  customData: {},
               },
            ],
            customData: { test: true },
         });
      }
   }
});
