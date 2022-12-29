import * as colors from '../../utils/colors.ts';
import { assertEquals, assertThrows } from '../deps.ts';

Deno.test('HSVA to RGBA', () => {
    const black = colors.HsvaToRgba(69, 0, 0);
    const gray = colors.HsvaToRgba(420, 0, 0.5);
    const white = colors.HsvaToRgba(42, 0, 1);
    const translucent = colors.HsvaToRgba(0, 0, 1, 0.5);
    const transparent = colors.HsvaToRgba(0, 0, 0, 0);

    const red = colors.HsvaToRgba(0, 1, 1);
    const yellow = colors.HsvaToRgba(420, 1, 1);
    const green = colors.HsvaToRgba(120, 1, 1);
    const cyan = colors.HsvaToRgba(180, 1, 1);
    const blue = colors.HsvaToRgba(240, 1, 1);
    const magenta = colors.HsvaToRgba(-60, 1, 1);

    assertEquals(black, [0, 0, 0, 1]);
    assertEquals(gray, [0.5, 0.5, 0.5, 1]);
    assertEquals(white, [1, 1, 1, 1]);
    assertEquals(translucent, [1, 1, 1, 0.5]);
    assertEquals(transparent, [0, 0, 0, 0]);

    assertEquals(red, [1, 0, 0, 1]);
    assertEquals(yellow, [1, 1, 0, 1]);
    assertEquals(green, [0, 1, 0, 1]);
    assertEquals(cyan, [0, 1, 1, 1]);
    assertEquals(blue, [0, 0, 1, 1]);
    assertEquals(magenta, [1, 0, 1, 1]);
});

Deno.test('RGBA to HSVA', () => {
    const black = colors.RgbaToHsva(0, 0, 0);
    const gray = colors.RgbaToHsva(0.5, 0.5, 0.5);
    const white = colors.RgbaToHsva(1, 1, 1);
    const translucent = colors.RgbaToHsva(1, 0, 0, 0.5);
    const transparent = colors.RgbaToHsva(0, 0, 1, 0);

    const red = colors.RgbaToHsva(1, 0, 0);
    const yellow = colors.RgbaToHsva(1, 1, 0);
    const green = colors.RgbaToHsva(0, 1, 0);
    const cyan = colors.RgbaToHsva(0, 1, 1);
    const blue = colors.RgbaToHsva(0, 0, 1);
    const magenta = colors.RgbaToHsva(1, 0, 1);

    assertEquals(black, [0, 0, 0, 1]);
    assertEquals(gray, [0, 0, 0.5, 1]);
    assertEquals(white, [0, 0, 1, 1]);
    assertEquals(translucent, [0, 1, 1, 0.5]);
    assertEquals(transparent, [240, 1, 1, 0]);

    assertEquals(red, [0, 1, 1, 1]);
    assertEquals(yellow, [60, 1, 1, 1]);
    assertEquals(green, [120, 1, 1, 1]);
    assertEquals(cyan, [180, 1, 1, 1]);
    assertEquals(blue, [240, 1, 1, 1]);
    assertEquals(magenta, [300, 1, 1, 1]);
});

Deno.test('Color from input', () => {
    assertEquals(colors.colorFrom(2, 1, 3), [2, 1, 3]);
    assertEquals(colors.colorFrom(2, 1, 3, 4), [2, 1, 3, 4]);
    assertEquals(colors.colorFrom(2, 1, 3, 'rgba'), [2, 1, 3]);
    assertEquals(colors.colorFrom(2, 1, 3, 4, 'rgba'), [2, 1, 3, 4]);
    assertEquals(colors.colorFrom([2, 1, 3]), [2, 1, 3]);
    assertEquals(colors.colorFrom([2, 1, 3, 4]), [2, 1, 3, 4]);
    assertEquals(colors.colorFrom([2, 1, 3], 'rgba'), [2, 1, 3]);
    assertEquals(colors.colorFrom([2, 1, 3, 4], 'rgba'), [2, 1, 3, 4]);
    assertEquals(colors.colorFrom({ value: [2, 1, 3], type: 'rgba' }), [2, 1, 3]);
    assertEquals(colors.colorFrom({ value: [2, 1, 3, 4], type: 'rgba' }), [2, 1, 3, 4]);
    assertEquals(colors.colorFrom({ r: 2, g: 1, b: 3 }), [2, 1, 3]);
    assertEquals(colors.colorFrom({ r: 2, g: 1, b: 3, a: 4 }), [2, 1, 3, 4]);

    assertEquals(colors.colorFrom(255, 0, 255, 'rgba255'), [1, 0, 1]);
    assertEquals(colors.colorFrom(0, 255, 0, 255, 'rgba255'), [0, 1, 0, 1]);
    assertEquals(colors.colorFrom([255, 0, 255], 'rgba255'), [1, 0, 1]);
    assertEquals(colors.colorFrom([0, 255, 0, 255], 'rgba255'), [0, 1, 0, 1]);
    assertEquals(colors.colorFrom({ value: [255, 0, 255], type: 'rgba255' }), [1, 0, 1]);
    assertEquals(colors.colorFrom({ value: [0, 255, 0, 255], type: 'rgba255' }), [0, 1, 0, 1]);

    assertEquals(colors.colorFrom(120, 1, 1, 'hsva'), [0, 1, 0, 1]);
    assertEquals(colors.colorFrom(0, 1, 0.5, 1, 'hsva'), [0.5, 0, 0, 1]);
    assertEquals(colors.colorFrom([120, 1, 1], 'hsva'), [0, 1, 0, 1]);
    assertEquals(colors.colorFrom([0, 1, 0.5, 1], 'hsva'), [0.5, 0, 0, 1]);
    assertEquals(colors.colorFrom({ value: [120, 1, 1], type: 'hsva' }), [0, 1, 0, 1]);
    assertEquals(colors.colorFrom({ value: [0, 1, 0.5, 1], type: 'hsva' }), [0.5, 0, 0, 1]);

    assertEquals(colors.colorFrom(0.5), [0.5, 0.5, 0.5]);
    assertEquals(colors.colorFrom(1), [1, 1, 1]);
    assertEquals(colors.colorFrom(255, true), [1, 1, 1]);
    assertEquals(colors.colorFrom(1, 0.5), [1, 1, 1, 0.5]);

    assertEquals(colors.colorFrom('#f0f'), [1, 0, 1]);
    assertEquals(colors.colorFrom('#ff0f'), [1, 1, 0, 1]);
    assertEquals(colors.colorFrom('00f'), [0, 0, 1]);
    assertEquals(colors.colorFrom('f00f'), [1, 0, 0, 1]);
    assertEquals(colors.colorFrom('#ff00ff'), [1, 0, 1]);
    assertEquals(colors.colorFrom('#ffff00ff'), [1, 1, 0, 1]);
    assertEquals(colors.colorFrom('0000ff'), [0, 0, 1]);
    assertEquals(colors.colorFrom('ff0000ff'), [1, 0, 0, 1]);
    assertEquals(colors.colorFrom('f'), [0, 0, 0]);
    assertThrows(() => colors.colorFrom('   '));
    assertThrows(() => colors.colorFrom('not color'));

    assertEquals(colors.colorFrom([3, 2, 1]), [3, 2, 1]);
    assertEquals(colors.colorFrom([3, 2, 1, 1]), [3, 2, 1, 1]);
    assertEquals(colors.colorFrom([3, 2, 1, 2, 3, 4]), [3, 2, 1, 2]);
    assertThrows(() => colors.colorFrom([3]));
});
