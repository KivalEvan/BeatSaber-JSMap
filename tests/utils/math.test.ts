import * as math from '../../utils/math.ts';
import { EPSILON } from '../constants.ts';
import { assert, assertAlmostEquals, assertEquals } from '../deps.ts';

Deno.test('Format number helper', () => {
   assertEquals(math.formatNumber(123456789), '123,456,789');
   assertEquals(math.formatNumber(-1999), '-1,999');
   assertEquals(math.formatNumber(1234.5678), '1,234.5678');
   assertEquals(math.formatNumber(-98765.4321), '-98,765.4321');
   assertEquals(math.formatNumber(999.99), '999.99');
   assertEquals(math.formatNumber(0), '0');
});

Deno.test('Rounding helper', () => {
   assertAlmostEquals(math.round(1234.05), 1234, 0);
   assertAlmostEquals(math.round(1234.5), 1235, 0);
   assertAlmostEquals(math.round(4321), 4321, 0);
   assertAlmostEquals(math.round(1234.56789, 2), 1234.57, EPSILON);
   assertAlmostEquals(math.round(-1234.56789, 3), -1234.568, EPSILON);
});

Deno.test('Global pseudorandom number generator', async (t) => {
   await t.step('Seeding global pseudorandom number generator', () => {
      math.pRandomSeed('tEsT');
   });

   assertAlmostEquals(math.pRandom(), 0.970629, EPSILON);
   assertAlmostEquals(math.pRandom(true), 0, EPSILON);
   assertAlmostEquals(math.pRandom(10, true), 2, EPSILON);
   assertAlmostEquals(math.pRandom(0, 5, false), 2.837599, EPSILON);
   assertAlmostEquals(math.pRandom(-5, 0, 3), -0.533, EPSILON);
   assertAlmostEquals(math.pRandom(0, 5, true), 1, EPSILON);

   await t.step('Re-seeding global pseudorandom number generator', () => {
      math.pRandomSeed('tEsT');
   });

   assertAlmostEquals(math.pRandom(), 0.970629, EPSILON);
   assertAlmostEquals(math.pRandom(true), 0, EPSILON);
   assertAlmostEquals(math.pRandom(10, true), 2, EPSILON);
   assertAlmostEquals(math.pRandom(0, 5, false), 2.837599, EPSILON);
   assertAlmostEquals(math.pRandom(-5, 0, 3), -0.533, EPSILON);
   assertAlmostEquals(math.pRandom(0, 5, true), 1, EPSILON);

   await t.step(
      'Re-seeding global pseudorandom number generator with different numbered seed',
      () => {
         math.pRandomSeed(1234);
      },
   );

   assertAlmostEquals(math.pRandom(), 0.22365, EPSILON);
   assertAlmostEquals(math.pRandom(true), 1, EPSILON);
   assertAlmostEquals(math.pRandom(10, true), 3, EPSILON);
   assertAlmostEquals(math.pRandom(0, 5, false), 4.53964, EPSILON);
   assertAlmostEquals(math.pRandom(-5, 0, 3), -0.055, EPSILON);
   assertAlmostEquals(math.pRandom(0, 5, true), 3, EPSILON);

   await t.step(
      'Re-seeding global pseudorandom number generator with different bigint seed',
      () => {
         math.pRandomSeed(12345678901234567890123456789n);
      },
   );

   assertAlmostEquals(math.pRandom(), 0.401839, EPSILON);
   assertAlmostEquals(math.pRandom(true), 1, EPSILON);
   assertAlmostEquals(math.pRandom(10, true), 3, EPSILON);
   assertAlmostEquals(math.pRandom(0, 5, false), 0.803033, EPSILON);
   assertAlmostEquals(math.pRandom(-5, 0, 3), -2.679, EPSILON);
   assertAlmostEquals(math.pRandom(0, 5, true), 4, EPSILON);
});

Deno.test('Pseudorandom number generator function', () => {
   const pRandom = math.pRandomFn('tEsT');

   assertAlmostEquals(pRandom(), 0.970629, EPSILON);
   assertAlmostEquals(pRandom(true), 0, EPSILON);
   assertAlmostEquals(pRandom(10, true), 2, EPSILON);
   assertAlmostEquals(pRandom(0, 5, false), 2.837599, EPSILON);
   assertAlmostEquals(pRandom(-5, 0, 3), -0.533, EPSILON);
   assertAlmostEquals(pRandom(0, 5, true), 1, EPSILON);

   const pRandom2 = math.pRandomFn('tEsT');

   assertAlmostEquals(pRandom2(), 0.970629, EPSILON);
   assertAlmostEquals(pRandom2(true), 0, EPSILON);
   assertAlmostEquals(pRandom2(10, true), 2, EPSILON);
   assertAlmostEquals(pRandom2(0, 5, false), 2.837599, EPSILON);
   assertAlmostEquals(pRandom2(-5, 0, 3), -0.533, EPSILON);
   assertAlmostEquals(pRandom2(0, 5, true), 1, EPSILON);

   assertAlmostEquals(pRandom(0, 10), pRandom2(0, 10), EPSILON);
});

// helper cannot be tested due to unpredictable value
Deno.test('Random number generator helper', () => {
   assert(typeof math.random() === 'number');
   assert(typeof math.random(true) === 'number');
   assert(typeof math.random(10, true) === 'number');
   assert(typeof math.random(0, 5, false) === 'number');
   assert(typeof math.random(-5, 0, 3) === 'number');
   assert(typeof math.random(0, 5, true) === 'number');
});

Deno.test('Modulo helper', () => {
   assertEquals(math.mod(0, 100), 0);
   assertEquals(math.mod(10, 100), 10);
   assertEquals(math.mod(110, 100), 10);
   assertEquals(math.mod(110, -100), 10);
   assertEquals(math.mod(-110, 100), 90);
   assertEquals(math.mod(-110, -100), 90);
});

Deno.test('Short rotation distance helper', () => {
   assertEquals(math.shortRotDistance(0, 180, 360), 180);
   assertEquals(math.shortRotDistance(180, 0, 360), 180);
   assertEquals(math.shortRotDistance(60, 180, 360), 120);
   assertEquals(math.shortRotDistance(180, 60, 360), 120);
   assertEquals(math.shortRotDistance(180, 180, 360), 0);
   assertEquals(math.shortRotDistance(-180, 180, 360), 0);
   assertEquals(math.shortRotDistance(-180, -180, 360), 0);
   assertEquals(math.shortRotDistance(-180, 0, 360), 180);
   assertEquals(math.shortRotDistance(0, -180, 360), 180);
   assertEquals(math.shortRotDistance(-180, -180, -360), 0);
});

Deno.test('Median helper', () => {
   const rand = math.pRandomFn('pickRandom');

   assertEquals(math.median([]), 0);
   assertEquals(math.median([-2, 1, 5, 2, 2, 3, 6]), 2);
   assertAlmostEquals(
      math.median(new Array(100).fill(0).map((_) => rand(-1000, 1000))),
      -116.0512797,
      EPSILON,
   );
});

Deno.test('Number clamp helper', () => {
   assertAlmostEquals(math.clamp(0, -10, 10), 0, EPSILON);
   assertAlmostEquals(math.clamp(5, -10, 10), 5, EPSILON);
   assertAlmostEquals(math.clamp(10, -10, 10), 10, EPSILON);
   assertAlmostEquals(math.clamp(20, -10, 10), 10, EPSILON);
   assertAlmostEquals(math.clamp(-10, -10, 10), -10, EPSILON);
   assertAlmostEquals(math.clamp(-20, -10, 10), -10, EPSILON);
   assertAlmostEquals(math.clamp(0, 10, -10), -10, EPSILON);
});

Deno.test('Normalize helper', () => {
   assertAlmostEquals(math.normalize(0, 0, 10), 0, EPSILON);
   assertAlmostEquals(math.normalize(5, 0, 10), 0.5, EPSILON);
   assertAlmostEquals(math.normalize(10, 0, 10), 1, EPSILON);
   assertAlmostEquals(math.normalize(20, 0, 10), 2, EPSILON);
   assertAlmostEquals(math.normalize(0, 10, 0), 1, EPSILON);
   assertAlmostEquals(math.normalize(0, 10, 10), 1, EPSILON);
});

Deno.test('Lerp helper', () => {
   assertAlmostEquals(math.lerp(0.5, 0, 420), 210, EPSILON);
   assertAlmostEquals(math.lerp(0.25, -10, 10), -5, EPSILON);
   assertAlmostEquals(math.lerp(0, 6.9, 420), 6.9, EPSILON);
   assertAlmostEquals(math.lerp(1, 6.9, 420), 420, EPSILON);
   assertAlmostEquals(math.lerp(-1, 0, 1), -1, EPSILON);
   assertAlmostEquals(math.lerp(2, 0, 1), 2, EPSILON);
});

Deno.test('Fix range helper', () => {
   assertEquals(math.fixRange(10, 0), [0, 10]);
   assertEquals(math.fixRange(10, -10), [-10, 10]);
   assertEquals(math.fixRange(0, 420), [0, 420]);
   assertEquals(math.fixRange(420, 0), [0, 420]);
   assertEquals(math.fixRange(420, 6.9, false), [6.9, 420]);
   assertEquals(math.fixRange(420, 6.9, true), [420, 6.9]);
   assertEquals(math.fixRange(6.9, 420, false), [6.9, 420]);
   assertEquals(math.fixRange(6.9, 420, true), [420, 6.9]);
});

Deno.test('Near Equality', () => {
   assert(math.equalNear(0, 0));
   assert(math.equalNear(Number.EPSILON, Number.EPSILON));
   assert(math.equalNear(0, Number.EPSILON));
   assert(math.equalNear(0.001, Number.EPSILON, 0.001));
   assert(!math.equalNear(0, 10));
   assert(!math.equalNear(-10, 10));
   assert(math.equalNear(-10, 10, 20));
});

Deno.test('Radian to Degree', () => {
   assertAlmostEquals(math.radToDeg(0), 0, EPSILON);
   assertAlmostEquals(math.radToDeg(3.14159), 180, EPSILON);
   assertAlmostEquals(math.radToDeg(3.14159 * 2), 360, EPSILON);
   assertAlmostEquals(math.radToDeg(-3.14159), -180, EPSILON);
   assertAlmostEquals(math.radToDeg(-3.14159 * 2), -360, EPSILON);
});

Deno.test('Degree to Radian', () => {
   assertAlmostEquals(math.degToRad(0), 0, EPSILON);
   assertAlmostEquals(math.degToRad(180), 3.14159, EPSILON);
   assertAlmostEquals(math.degToRad(360), 3.14159 * 2, EPSILON);
   assertAlmostEquals(math.degToRad(-180), -3.14159, EPSILON);
   assertAlmostEquals(math.degToRad(-360), -3.14159 * 2, EPSILON);
});
