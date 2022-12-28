import * as colors from '../../utils/colors.ts';
import { assertEquals } from '../deps.ts';

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
