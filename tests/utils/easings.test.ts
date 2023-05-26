import { EasingsFn } from '../../utils/easings.ts';
import { EPSILON } from '../constants.ts';
import { assert, assertAlmostEquals, assertEquals } from '../deps.ts';

Deno.test('Easing Linear', () => {
    assertEquals(EasingsFn.easeLinear(0), 0);
    assertAlmostEquals(EasingsFn.easeLinear(0.25), 0.25);
    assertAlmostEquals(EasingsFn.easeLinear(0.5), 0.5);
    assertAlmostEquals(EasingsFn.easeLinear(0.75), 0.75);
    assertEquals(EasingsFn.easeLinear(1), 1);
});

Deno.test('Easing In Quad', () => {
    assertEquals(EasingsFn.easeInQuad(0), 0);
    assertAlmostEquals(EasingsFn.easeInQuad(0.5), 0.25, EPSILON);
    assertEquals(EasingsFn.easeInQuad(1), 1);
});
Deno.test('Easing Out Quad', () => {
    assertEquals(EasingsFn.easeOutQuad(0), 0);
    assertAlmostEquals(EasingsFn.easeOutQuad(0.5), 0.75, EPSILON);
    assertEquals(EasingsFn.easeOutQuad(1), 1);
});
Deno.test('Easing In Out Quad', () => {
    assertEquals(EasingsFn.easeInOutQuad(0), 0);
    assertAlmostEquals(EasingsFn.easeInOutQuad(0.5), 0.5, EPSILON);
    assertEquals(EasingsFn.easeInOutQuad(1), 1);
});

Deno.test('Easing In Cubic', () => {
    assertEquals(EasingsFn.easeInCubic(0), 0);
    assertAlmostEquals(EasingsFn.easeInCubic(0.5), 0.125, EPSILON);
    assertEquals(EasingsFn.easeInCubic(1), 1);
});
Deno.test('Easing Out Cubic', () => {
    assertEquals(EasingsFn.easeOutCubic(0), 0);
    assertAlmostEquals(EasingsFn.easeOutCubic(0.5), 0.875, EPSILON);
    assertEquals(EasingsFn.easeOutCubic(1), 1);
});
Deno.test('Easing In Out Cubic', () => {
    assertEquals(EasingsFn.easeInOutCubic(0), 0);
    assertAlmostEquals(EasingsFn.easeInOutCubic(0.5), 0.5, EPSILON);
    assertEquals(EasingsFn.easeInOutCubic(1), 1);
});

Deno.test('Easing In Quart', () => {
    assertEquals(EasingsFn.easeInQuart(0), 0);
    assertAlmostEquals(EasingsFn.easeInQuart(0.5), 0.0625, EPSILON);
    assertEquals(EasingsFn.easeInQuart(1), 1);
});
Deno.test('Easing Out Quart', () => {
    assertEquals(EasingsFn.easeOutQuart(0), 0);
    assertAlmostEquals(EasingsFn.easeOutQuart(0.5), 0.9375, EPSILON);
    assertEquals(EasingsFn.easeOutQuart(1), 1);
});
Deno.test('Easing In Out Quart', () => {
    assertEquals(EasingsFn.easeInOutQuart(0), 0);
    assertAlmostEquals(EasingsFn.easeInOutQuart(0.5), 0.5, EPSILON);
    assertEquals(EasingsFn.easeInOutQuart(1), 1);
});

Deno.test('Easing In Quint', () => {
    assertEquals(EasingsFn.easeInQuint(0), 0);
    assertAlmostEquals(EasingsFn.easeInQuint(0.5), 0.03125, EPSILON);
    assertEquals(EasingsFn.easeInQuint(1), 1);
});
Deno.test('Easing Out Quint', () => {
    assertEquals(EasingsFn.easeOutQuint(0), 0);
    assertAlmostEquals(EasingsFn.easeOutQuint(0.5), 0.96875, EPSILON);
    assertEquals(EasingsFn.easeOutQuint(1), 1);
});
Deno.test('Easing In Out Quint', () => {
    assertEquals(EasingsFn.easeInOutQuint(0), 0);
    assertAlmostEquals(EasingsFn.easeInOutQuint(0.5), 0.5, EPSILON);
    assertEquals(EasingsFn.easeInOutQuint(1), 1);
});

Deno.test('Easing In Sine', () => {
    assertEquals(EasingsFn.easeInSine(0), 0);
    assertAlmostEquals(EasingsFn.easeInSine(0.5), 0.292893, EPSILON);
    assertEquals(EasingsFn.easeInSine(1), 1);
});
Deno.test('Easing Out Sine', () => {
    assertEquals(EasingsFn.easeOutSine(0), 0);
    assertAlmostEquals(EasingsFn.easeOutSine(0.5), 0.707107, EPSILON);
    assertEquals(EasingsFn.easeOutSine(1), 1);
});
Deno.test('Easing In Out Sine', () => {
    assertEquals(EasingsFn.easeInOutSine(0), 0);
    assertAlmostEquals(EasingsFn.easeInOutSine(0.5), 0.5, EPSILON);
    assertEquals(EasingsFn.easeInOutSine(1), 1);
});

Deno.test('Easing In Circle', () => {
    assertEquals(EasingsFn.easeInCirc(0), 0);
    assertAlmostEquals(EasingsFn.easeInCirc(0.5), 0.133975, EPSILON);
    assertEquals(EasingsFn.easeInCirc(1), 1);
});
Deno.test('Easing Out Circle', () => {
    assertEquals(EasingsFn.easeOutCirc(0), 0);
    assertAlmostEquals(EasingsFn.easeOutCirc(0.5), 0.866025, EPSILON);
    assertEquals(EasingsFn.easeOutCirc(1), 1);
});
Deno.test('Easing In Out Circle', () => {
    assertEquals(EasingsFn.easeInOutCirc(0), 0);
    assertAlmostEquals(EasingsFn.easeInOutCirc(0.5), 0.5, EPSILON);
    assertEquals(EasingsFn.easeInOutCirc(1), 1);
});

Deno.test('Easing In Exponential', () => {
    assertEquals(EasingsFn.easeInExpo(0), 0);
    assertAlmostEquals(EasingsFn.easeInExpo(0.5), 0.03125, EPSILON);
    assertEquals(EasingsFn.easeInExpo(1), 1);
});
Deno.test('Easing Out Exponential', () => {
    assertEquals(EasingsFn.easeOutExpo(0), 0);
    assertAlmostEquals(EasingsFn.easeOutExpo(0.5), 0.96875, EPSILON);
    assertEquals(EasingsFn.easeOutExpo(1), 1);
});
Deno.test('Easing In Out Exponential', () => {
    assertEquals(EasingsFn.easeInOutExpo(0), 0);
    assertAlmostEquals(EasingsFn.easeInOutExpo(0.25), 0.015625, EPSILON);
    assertAlmostEquals(EasingsFn.easeInOutExpo(0.5), 0.5, EPSILON);
    assertAlmostEquals(EasingsFn.easeInOutExpo(0.75), 0.984375, EPSILON);
    assertEquals(EasingsFn.easeInOutExpo(1), 1);
});

Deno.test('Easing In Elastic', () => {
    assertEquals(EasingsFn.easeInElastic(0), 0);
    assertAlmostEquals(EasingsFn.easeInElastic(0.5), -0.022097, EPSILON);
    assertEquals(EasingsFn.easeInElastic(1), 1);
});
Deno.test('Easing Out Elastic', () => {
    assertEquals(EasingsFn.easeOutElastic(0), 0);
    assertAlmostEquals(EasingsFn.easeOutElastic(0.5), 1.022097, EPSILON);
    assertEquals(EasingsFn.easeOutElastic(1), 1);
});
Deno.test('Easing In Out Elastic', () => {
    assertEquals(EasingsFn.easeInOutElastic(0), 0);
    assertAlmostEquals(EasingsFn.easeInOutElastic(0.5), 0.5, EPSILON);
    assertEquals(EasingsFn.easeInOutElastic(1), 1);
});

Deno.test('Easing In Back', () => {
    assert(EasingsFn.easeInBack(0) >= 0);
    assertAlmostEquals(EasingsFn.easeInBack(0.5), -0.375, EPSILON);
    assert(EasingsFn.easeInBack(1) <= 1);
});
Deno.test('Easing Out Back', () => {
    assert(EasingsFn.easeOutBack(0) >= 0);
    assertAlmostEquals(EasingsFn.easeOutBack(0.5), 1.375, EPSILON);
    assert(EasingsFn.easeOutBack(1) <= 1);
});
Deno.test('Easing In Out Back', () => {
    assert(EasingsFn.easeInOutBack(0) >= 0);
    assertAlmostEquals(EasingsFn.easeInOutBack(0.5), 0.5, EPSILON);
    assert(EasingsFn.easeInOutBack(1) <= 1);
});

Deno.test('Easing In Bounce', () => {
    assertAlmostEquals(EasingsFn.easeInBounce(0), 0, EPSILON);
    assertAlmostEquals(EasingsFn.easeInBounce(0.5), 0.28125, EPSILON);
    assertAlmostEquals(EasingsFn.easeInBounce(1), 1, EPSILON);
});
Deno.test('Easing Out Bounce', () => {
    assertAlmostEquals(EasingsFn.easeOutBounce(0), 0, EPSILON);
    assertAlmostEquals(EasingsFn.easeOutBounce(0.5), 0.71875, EPSILON);
    assertAlmostEquals(EasingsFn.easeOutBounce(1), 1, EPSILON);
});
Deno.test('Easing In Out Bounce', () => {
    assertAlmostEquals(EasingsFn.easeInOutBounce(0), 0, EPSILON);
    assertAlmostEquals(EasingsFn.easeInOutBounce(0.125), 0.020569, EPSILON);
    assertAlmostEquals(EasingsFn.easeInOutBounce(0.25), 0.140625, EPSILON);
    assertAlmostEquals(EasingsFn.easeInOutBounce(0.375), 0.263672, EPSILON);
    assertAlmostEquals(EasingsFn.easeInOutBounce(0.5), 0.5, EPSILON);
    assertAlmostEquals(EasingsFn.easeInOutBounce(0.625), 0.736328, EPSILON);
    assertAlmostEquals(EasingsFn.easeInOutBounce(0.75), 0.859375, EPSILON);
    assertAlmostEquals(EasingsFn.easeInOutBounce(0.875), 0.979432, EPSILON);
    assertAlmostEquals(EasingsFn.easeInOutBounce(1), 1, EPSILON);
});
