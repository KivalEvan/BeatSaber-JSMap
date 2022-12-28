import * as math from '../../utils/math.ts';
import { assert, assertAlmostEquals, assertEquals } from '../deps.ts';

const EPSILON = 0.001;

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
});

Deno.test('Pseudorandom number generator function', () => {
    const pRandom = math.pRandomFn('tEsT');

    assertAlmostEquals(pRandom(), 0.970629, EPSILON);
    assertAlmostEquals(pRandom(true), 0, EPSILON);
    assertAlmostEquals(pRandom(10, true), 2, EPSILON);
    assertAlmostEquals(pRandom(0, 5, false), 2.837599, EPSILON);
    assertAlmostEquals(pRandom(-5, 0, 3), -0.533, EPSILON);
    assertAlmostEquals(pRandom(0, 5, true), 1, EPSILON);
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
