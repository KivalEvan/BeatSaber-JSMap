import { easings } from '../../utils/easings.ts';
import { assert, assertAlmostEquals, assertEquals } from '../deps.ts';

const EPSILON = 0.001;

Deno.test('Easing Linear', () => {
    assertEquals(easings.easeLinear(0), 0);
    assertAlmostEquals(easings.easeLinear(0.25), 0.25);
    assertAlmostEquals(easings.easeLinear(0.5), 0.5);
    assertAlmostEquals(easings.easeLinear(0.75), 0.75);
    assertEquals(easings.easeLinear(1), 1);
});

Deno.test('Easing In Quad', () => {
    assertEquals(easings.easeInQuad(0), 0);
    assertAlmostEquals(easings.easeInQuad(0.5), 0.25, EPSILON);
    assertEquals(easings.easeInQuad(1), 1);
});
Deno.test('Easing Out Quad', () => {
    assertEquals(easings.easeOutQuad(0), 0);
    assertAlmostEquals(easings.easeOutQuad(0.5), 0.75, EPSILON);
    assertEquals(easings.easeOutQuad(1), 1);
});
Deno.test('Easing In Out Quad', () => {
    assertEquals(easings.easeInOutQuad(0), 0);
    assertAlmostEquals(easings.easeInOutQuad(0.5), 0.5, EPSILON);
    assertEquals(easings.easeInOutQuad(1), 1);
});

Deno.test('Easing In Cubic', () => {
    assertEquals(easings.easeInCubic(0), 0);
    assertAlmostEquals(easings.easeInCubic(0.5), 0.125, EPSILON);
    assertEquals(easings.easeInCubic(1), 1);
});
Deno.test('Easing Out Cubic', () => {
    assertEquals(easings.easeOutCubic(0), 0);
    assertAlmostEquals(easings.easeOutCubic(0.5), 0.875, EPSILON);
    assertEquals(easings.easeOutCubic(1), 1);
});
Deno.test('Easing In Out Cubic', () => {
    assertEquals(easings.easeInOutCubic(0), 0);
    assertAlmostEquals(easings.easeInOutCubic(0.5), 0.5, EPSILON);
    assertEquals(easings.easeInOutCubic(1), 1);
});

Deno.test('Easing In Quart', () => {
    assertEquals(easings.easeInQuart(0), 0);
    assertAlmostEquals(easings.easeInQuart(0.5), 0.0625, EPSILON);
    assertEquals(easings.easeInQuart(1), 1);
});
Deno.test('Easing Out Quart', () => {
    assertEquals(easings.easeOutQuart(0), 0);
    assertAlmostEquals(easings.easeOutQuart(0.5), 0.9375, EPSILON);
    assertEquals(easings.easeOutQuart(1), 1);
});
Deno.test('Easing In Out Quart', () => {
    assertEquals(easings.easeInOutQuart(0), 0);
    assertAlmostEquals(easings.easeInOutQuart(0.5), 0.5, EPSILON);
    assertEquals(easings.easeInOutQuart(1), 1);
});

Deno.test('Easing In Quint', () => {
    assertEquals(easings.easeInQuint(0), 0);
    assertAlmostEquals(easings.easeInQuint(0.5), 0.03125, EPSILON);
    assertEquals(easings.easeInQuint(1), 1);
});
Deno.test('Easing Out Quint', () => {
    assertEquals(easings.easeOutQuint(0), 0);
    assertAlmostEquals(easings.easeOutQuint(0.5), 0.96875, EPSILON);
    assertEquals(easings.easeOutQuint(1), 1);
});
Deno.test('Easing In Out Quint', () => {
    assertEquals(easings.easeInOutQuint(0), 0);
    assertAlmostEquals(easings.easeInOutQuint(0.5), 0.5, EPSILON);
    assertEquals(easings.easeInOutQuint(1), 1);
});

Deno.test('Easing In Sine', () => {
    assertEquals(easings.easeInSine(0), 0);
    assertAlmostEquals(easings.easeInSine(0.5), 0.292893, EPSILON);
    assertEquals(easings.easeInSine(1), 1);
});
Deno.test('Easing Out Sine', () => {
    assertEquals(easings.easeOutSine(0), 0);
    assertAlmostEquals(easings.easeOutSine(0.5), 0.707107, EPSILON);
    assertEquals(easings.easeOutSine(1), 1);
});
Deno.test('Easing In Out Sine', () => {
    assertEquals(easings.easeInOutSine(0), 0);
    assertAlmostEquals(easings.easeInOutSine(0.5), 0.5, EPSILON);
    assertEquals(easings.easeInOutSine(1), 1);
});

Deno.test('Easing In Circle', () => {
    assertEquals(easings.easeInCirc(0), 0);
    assertAlmostEquals(easings.easeInCirc(0.5), 0.133975, EPSILON);
    assertEquals(easings.easeInCirc(1), 1);
});
Deno.test('Easing Out Circle', () => {
    assertEquals(easings.easeOutCirc(0), 0);
    assertAlmostEquals(easings.easeOutCirc(0.5), 0.866025, EPSILON);
    assertEquals(easings.easeOutCirc(1), 1);
});
Deno.test('Easing In Out Circle', () => {
    assertEquals(easings.easeInOutCirc(0), 0);
    assertAlmostEquals(easings.easeInOutCirc(0.5), 0.5, EPSILON);
    assertEquals(easings.easeInOutCirc(1), 1);
});

Deno.test('Easing In Exponential', () => {
    assertEquals(easings.easeInExpo(0), 0);
    assertAlmostEquals(easings.easeInExpo(0.5), 0.03125, EPSILON);
    assertEquals(easings.easeInExpo(1), 1);
});
Deno.test('Easing Out Exponential', () => {
    assertEquals(easings.easeOutExpo(0), 0);
    assertAlmostEquals(easings.easeOutExpo(0.5), 0.96875, EPSILON);
    assertEquals(easings.easeOutExpo(1), 1);
});
Deno.test('Easing In Out Exponential', () => {
    assertEquals(easings.easeInOutExpo(0), 0);
    assertAlmostEquals(easings.easeInOutExpo(0.25), 0.015625, EPSILON);
    assertAlmostEquals(easings.easeInOutExpo(0.5), 0.5, EPSILON);
    assertAlmostEquals(easings.easeInOutExpo(0.75), 0.984375, EPSILON);
    assertEquals(easings.easeInOutExpo(1), 1);
});

Deno.test('Easing In Elastic', () => {
    assertEquals(easings.easeInElastic(0), 0);
    assertAlmostEquals(easings.easeInElastic(0.5), -0.022097, EPSILON);
    assertEquals(easings.easeInElastic(1), 1);
});
Deno.test('Easing Out Elastic', () => {
    assertEquals(easings.easeOutElastic(0), 0);
    assertAlmostEquals(easings.easeOutElastic(0.5), 1.022097, EPSILON);
    assertEquals(easings.easeOutElastic(1), 1);
});
Deno.test('Easing In Out Elastic', () => {
    assertEquals(easings.easeInOutElastic(0), 0);
    assertAlmostEquals(easings.easeInOutElastic(0.5), 0.5, EPSILON);
    assertEquals(easings.easeInOutElastic(1), 1);
});

Deno.test('Easing In Back', () => {
    assert(easings.easeInBack(0) >= 0);
    assertAlmostEquals(easings.easeInBack(0.5), -0.375, EPSILON);
    assert(easings.easeInBack(1) <= 1);
});
Deno.test('Easing Out Back', () => {
    assert(easings.easeOutBack(0) >= 0);
    assertAlmostEquals(easings.easeOutBack(0.5), 1.375, EPSILON);
    assert(easings.easeOutBack(1) <= 1);
});
Deno.test('Easing In Out Back', () => {
    assert(easings.easeInOutBack(0) >= 0);
    assertAlmostEquals(easings.easeInOutBack(0.5), 0.5, EPSILON);
    assert(easings.easeInOutBack(1) <= 1);
});

Deno.test('Easing In Bounce', () => {
    assertAlmostEquals(easings.easeInBounce(0), 0, EPSILON);
    assertAlmostEquals(easings.easeInBounce(0.5), 0.28125, EPSILON);
    assertAlmostEquals(easings.easeInBounce(1), 1, EPSILON);
});
Deno.test('Easing Out Bounce', () => {
    assertAlmostEquals(easings.easeOutBounce(0), 0, EPSILON);
    assertAlmostEquals(easings.easeOutBounce(0.5), 0.71875, EPSILON);
    assertAlmostEquals(easings.easeOutBounce(1), 1, EPSILON);
});
Deno.test('Easing In Out Bounce', () => {
    assertAlmostEquals(easings.easeInOutBounce(0), 0, EPSILON);
    assertAlmostEquals(easings.easeInOutBounce(0.125), 0.020569, EPSILON);
    assertAlmostEquals(easings.easeInOutBounce(0.25), 0.140625, EPSILON);
    assertAlmostEquals(easings.easeInOutBounce(0.375), 0.263672, EPSILON);
    assertAlmostEquals(easings.easeInOutBounce(0.5), 0.5, EPSILON);
    assertAlmostEquals(easings.easeInOutBounce(0.625), 0.736328, EPSILON);
    assertAlmostEquals(easings.easeInOutBounce(0.75), 0.859375, EPSILON);
    assertAlmostEquals(easings.easeInOutBounce(0.875), 0.979432, EPSILON);
    assertAlmostEquals(easings.easeInOutBounce(1), 1, EPSILON);
});
