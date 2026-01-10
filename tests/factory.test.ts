import {
   assertEquals,
   assertThrows,
   clamp,
   createBeatmap,
   logger,
   type types,
   v2,
} from './deps.ts';
import { maxValue, minValue, number, picklist, pipe, union } from 'jsr:@valibot/valibot@^1.0.0';
import { PosXSchema } from '../src/beatmap/schema/shared/declaration/common.ts';
import {
   createDataFactory,
   createEntityFactory,
   createEntityProcessor,
} from '../src/factory/mod.ts';
import type { ILoggerOptions } from '../src/types/factory/options.ts';

function createLogger(ctx: ILoggerOptions) {
   return {
      trace: (message: string) => logger.tTrace(ctx.tags, message),
      debug: (message: string) => logger.tDebug(ctx.tags, message),
      info: (message: string) => logger.tInfo(ctx.tags, message),
      warn: (message: string) => logger.tWarn(ctx.tags, message),
      error: (message: string) => logger.tError(ctx.tags, message),
   };
}

Deno.test('custom data factory', async (t) => {
   type EventData = {
      effect: 'off' | 'on' | 'flash' | 'fade' | 'transition' | 'trigger' | 'value';
      color?: 'red' | 'blue' | 'white' | null;
      value?: number;
   };
   function resolveEventEffect(value: number, type: 'light' | 'trigger' | 'value') {
      switch (type) {
         case 'light': {
            if (value === 0) return 'off';
            if (value % 4 === 1) return 'on';
            if (value % 4 === 2) return 'flash';
            if (value % 4 === 3) return 'fade';
            if (value % 4 === 0) return 'transition';
            return 'off';
         }
         case 'trigger': {
            return 'trigger';
         }
         case 'value': {
            return 'value';
         }
      }
   }
   function resolveEventColor(value: number) {
      if (value > 8) return 'white';
      if (value > 4) return 'red';
      if (value > 0) return 'blue';
      return null;
   }
   const { serialize, deserialize, validate } = createDataFactory({
      name: 'basic-event-type',
      logger: createLogger,
      container: {
         serialize: (data: EventData, context: { type: 'light' | 'trigger' | 'value' }) => {
            switch (context.type) {
               case 'light': {
                  if (!data.color || data.effect === 'off') return 0;
                  const color = ['blue', 'red', 'white'].indexOf(data.color);
                  const effect = ['on', 'flash', 'fade', 'transition'].indexOf(data.effect);
                  return 4 * color + (effect + 1);
               }
               case 'trigger': {
                  return 0;
               }
               case 'value': {
                  if (data.value) return data.value;
                  return 0;
               }
            }
         },
         deserialize: (value: number, context: { type: 'light' | 'trigger' | 'value' }) => {
            switch (context.type) {
               case 'light': {
                  return {
                     effect: resolveEventEffect(value, context.type),
                     color: resolveEventColor(value),
                  };
               }
               case 'trigger': {
                  return { effect: resolveEventEffect(value, context.type) };
               }
               case 'value': {
                  return { effect: resolveEventEffect(value, context.type), value: value };
               }
            }
         },
      },
      validator: {
         constructor: () => picklist([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
      },
   });
   await t.step('serialization', () => {
      assertEquals(serialize({ effect: 'off', color: null }, { type: 'light' }), 0);
      assertEquals(serialize({ effect: 'on', color: 'red' }, { type: 'light' }), 5);
      assertEquals(serialize({ effect: 'fade', color: 'blue' }, { type: 'light' }), 3);
      assertEquals(serialize({ effect: 'trigger' }, { type: 'trigger' }), 0);
      assertEquals(serialize({ effect: 'value', value: 2 }, { type: 'value' }), 2);
   });
   await t.step('deserialization', () => {
      assertEquals(deserialize(0, { type: 'light' }), { effect: 'off', color: null });
      assertEquals(deserialize(5, { type: 'light' }), { effect: 'on', color: 'red' });
      assertEquals(deserialize(3, { type: 'light' }), { effect: 'fade', color: 'blue' });
      assertEquals(deserialize(0, { type: 'trigger' }), { effect: 'trigger' });
      assertEquals(deserialize(2, { type: 'value' }), { effect: 'value', value: 2 });
   });
   await t.step('validation', () => {
      validate(0, null);
      validate(12, null);
      assertThrows(() => validate(100, null, { throwable: true }));
      validate(100, null, { throwable: false });
   });
});

Deno.test('custom entity factory', async (t) => {
   const { serialize, deserialize, validate } = createEntityFactory({
      name: 'line-index',
      logger: createLogger,
      resolveKey: (index) => {
         if (index >= 1000 || index <= -1000) return 'extensions';
         if ([0, 1, 2, 3].includes(index)) return 'vanilla';
         throw new Error(`Could not resolve version for: ${index}`);
      },
      container: {
         'vanilla': {
            serialize: (index: number) => clamp(Math.round(index), 0, 3),
            deserialize: (index: number) => index,
         },
         'extensions': {
            serialize: (index: number) => (index < 0 ? index * 1000 - 1000 : index * 1000 + 1000),
            deserialize: (index: number) => (index < 0 ? index / 1000 + 1 : index / 1000 - 1),
         },
      },
      validator: {
         'vanilla': {
            constructor: () => PosXSchema,
         },
         'extensions': {
            constructor: () => {
               return union([pipe(number(), maxValue(-1000)), pipe(number(), minValue(1000))]);
            },
         },
      },
   });

   await t.step('serialization', () => {
      assertEquals(serialize(1.25, 'vanilla', null), 1);
      assertEquals(serialize(1.25, 'extensions', null), 2250);
   });
   await t.step('deserialization', () => {
      assertEquals(deserialize(1, 'vanilla', null), 1);
      assertEquals(deserialize(2250, 'extensions', null), 1.25);
   });
   await t.step('validation', () => {
      validate(1, 'vanilla', null);
      validate(2250, 'extensions', null);
      assertThrows(() => validate(100, 'vanilla', null));
      assertThrows(() => validate(100, 'extensions', null));
   });
});

Deno.test('custom processor', async (t) => {
   const { loadSync: loadDifficulty, saveSync: saveDifficulty } = createEntityProcessor({
      name: 'difficulty',
      logger: createLogger,
      resolveKey: (data) => {
         if (data._version) return Number.parseInt(data._version[0]) as 2;
         throw new Error(`Could not resolve version for: ${data}`);
      },
      container: {
         [2]: {
            serialize: (data: types.wrapper.IWrapBeatmap) => v2.difficulty.serialize(data),
            deserialize: (data: types.v2.IDifficulty) => v2.difficulty.deserialize(data),
         },
      },
      validator: {
         [2]: {
            constructor: () => v2.DifficultySchema,
         },
      },
   });

   const wrapper = createBeatmap({
      version: 2,
      lightshow: { useNormalEventsAsCompatibleEvents: true },
   });
   const serial: Required<types.v2.IDifficulty> = {
      _version: '2.6.0',
      _notes: [],
      _obstacles: [],
      _events: [],
      _sliders: [],
      _waypoints: [],
      _specialEventsKeywordFilters: { _keywords: [] },
      _customData: {},
   };

   await t.step('load', () => {
      const actual = loadDifficulty(serial, 2, {
         context: null,
         validator: { context: null },
      });
      assertEquals(actual, wrapper);
   });
   await t.step('save', () => {
      const actual = saveDifficulty(wrapper, 2, {
         context: null,
         validator: { context: null },
      });
      assertEquals(actual, serial);
   });
});
