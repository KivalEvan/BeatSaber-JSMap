import type { ColorArray } from '../../types/colors.ts';
import * as colors from '../../utils/colors.ts';
import { nearEqual } from '../../utils/math.ts';
import { EPSILON } from '../constants.ts';
import { assert, assertAlmostEquals, assertEquals, assertThrows } from '../deps.ts';

Deno.test('HSVA to RGBA', () => {
   const black = colors.hsvaToRgba(69, 0, 0);
   const gray = colors.hsvaToRgba(420, 0, 0.5);
   const white = colors.hsvaToRgba(42, 0, 1);
   const translucent = colors.hsvaToRgba(0, 0, 1, 0.5);
   const transparent = colors.hsvaToRgba(0, 0, 0, 0);

   const red = colors.hsvaToRgba(0, 1, 1);
   const yellow = colors.hsvaToRgba(420, 1, 1);
   const green = colors.hsvaToRgba(120, 1, 1);
   const cyan = colors.hsvaToRgba(180, 1, 1);
   const blue = colors.hsvaToRgba(240, 1, 1);
   const magenta = colors.hsvaToRgba(-60, 1, 1);

   assertEquals(black, [0, 0, 0]);
   assertEquals(gray, [0.5, 0.5, 0.5]);
   assertEquals(white, [1, 1, 1]);
   assertEquals(translucent, [1, 1, 1, 0.5]);
   assertEquals(transparent, [0, 0, 0, 0]);

   assertEquals(red, [1, 0, 0]);
   assertEquals(yellow, [1, 1, 0]);
   assertEquals(green, [0, 1, 0]);
   assertEquals(cyan, [0, 1, 1]);
   assertEquals(blue, [0, 0, 1]);
   assertEquals(magenta, [1, 0, 1]);
});

Deno.test('RGBA to HSVA', () => {
   const black = colors.rgbaToHsva(0, 0, 0);
   const gray = colors.rgbaToHsva(0.5, 0.5, 0.5);
   const white = colors.rgbaToHsva(1, 1, 1);
   const translucent = colors.rgbaToHsva(1, 0, 0, 0.5);
   const transparent = colors.rgbaToHsva(0, 0, 1, 0);

   const red = colors.rgbaToHsva(1, 0, 0);
   const yellow = colors.rgbaToHsva(1, 1, 0);
   const green = colors.rgbaToHsva(0, 1, 0);
   const cyan = colors.rgbaToHsva(0, 1, 1);
   const blue = colors.rgbaToHsva(0, 0, 1);
   const magenta = colors.rgbaToHsva(1, 0, 1);

   assertEquals(black, [0, 0, 0]);
   assertEquals(gray, [0, 0, 0.5]);
   assertEquals(white, [0, 0, 1]);
   assertEquals(translucent, [0, 1, 1, 0.5]);
   assertEquals(transparent, [240, 1, 1, 0]);

   assertEquals(red, [0, 1, 1]);
   assertEquals(yellow, [60, 1, 1]);
   assertEquals(green, [120, 1, 1]);
   assertEquals(cyan, [180, 1, 1]);
   assertEquals(blue, [240, 1, 1]);
   assertEquals(magenta, [300, 1, 1]);
});

// jfc
Deno.test('Interpolate color RGBA', () => {
   const black = colors.hsvaToRgba(69, 0, 0);
   const gray = colors.hsvaToRgba(420, 0, 0.5);
   const white = colors.hsvaToRgba(42, 0, 1);
   const translucent = colors.hsvaToRgba(0, 0, 1, 0.5);
   const transparent = colors.hsvaToRgba(0, 0, 0, 0);
   const red = colors.hsvaToRgba(0, 1, 1);
   const yellow = colors.hsvaToRgba(420, 1, 1);
   const green = colors.hsvaToRgba(120, 1, 1);
   const cyan = colors.hsvaToRgba(180, 1, 1);
   const blue = colors.hsvaToRgba(240, 1, 1);
   const magenta = colors.hsvaToRgba(-60, 1, 1);

   assertEquals(colors.lerpColor(white, black, 0, 'rgba'), white);
   assertEquals(colors.lerpColor(white, gray, 0, 'rgba'), white);
   assertEquals(colors.lerpColor(white, white, 0, 'rgba'), white);
   assertEquals(colors.lerpColor(white, translucent, 0, 'rgba'), [...white, 1]);
   assertEquals(colors.lerpColor(white, transparent, 0, 'rgba'), [...white, 1]);
   assertEquals(colors.lerpColor(white, red, 0, 'rgba'), white);
   assertEquals(colors.lerpColor(white, yellow, 0, 'rgba'), white);
   assertEquals(colors.lerpColor(white, green, 0, 'rgba'), white);
   assertEquals(colors.lerpColor(white, cyan, 0, 'rgba'), white);
   assertEquals(colors.lerpColor(white, blue, 0, 'rgba'), white);
   assertEquals(colors.lerpColor(white, magenta, 0, 'rgba'), white);

   assertEquals(colors.lerpColor(white, black, 0.25, 'rgba'), [0.75, 0.75, 0.75]);
   assertEquals(colors.lerpColor(white, gray, 0.25, 'rgba'), [0.875, 0.875, 0.875]);
   assertEquals(colors.lerpColor(white, white, 0.25, 'rgba'), [1, 1, 1]);
   assertEquals(colors.lerpColor(white, translucent, 0.25, 'rgba'), [1, 1, 1, 0.875]);
   assertEquals(colors.lerpColor(white, transparent, 0.25, 'rgba'), [0.75, 0.75, 0.75, 0.75]);
   assertEquals(colors.lerpColor(white, red, 0.25, 'rgba'), [1, 0.75, 0.75]);
   assertEquals(colors.lerpColor(white, yellow, 0.25, 'rgba'), [1, 1, 0.75]);
   assertEquals(colors.lerpColor(white, green, 0.25, 'rgba'), [0.75, 1, 0.75]);
   assertEquals(colors.lerpColor(white, cyan, 0.25, 'rgba'), [0.75, 1, 1]);
   assertEquals(colors.lerpColor(white, blue, 0.25, 'rgba'), [0.75, 0.75, 1]);
   assertEquals(colors.lerpColor(white, magenta, 0.25, 'rgba'), [1, 0.75, 1]);

   assertEquals(colors.lerpColor(white, black, 0.5, 'rgba'), [0.5, 0.5, 0.5]);
   assertEquals(colors.lerpColor(white, gray, 0.5, 'rgba'), [0.75, 0.75, 0.75]);
   assertEquals(colors.lerpColor(white, white, 0.5, 'rgba'), [1, 1, 1]);
   assertEquals(colors.lerpColor(white, translucent, 0.5, 'rgba'), [1, 1, 1, 0.75]);
   assertEquals(colors.lerpColor(white, transparent, 0.5, 'rgba'), [0.5, 0.5, 0.5, 0.5]);
   assertEquals(colors.lerpColor(white, red, 0.5, 'rgba'), [1, 0.5, 0.5]);
   assertEquals(colors.lerpColor(white, yellow, 0.5, 'rgba'), [1, 1, 0.5]);
   assertEquals(colors.lerpColor(white, green, 0.5, 'rgba'), [0.5, 1, 0.5]);
   assertEquals(colors.lerpColor(white, cyan, 0.5, 'rgba'), [0.5, 1, 1]);
   assertEquals(colors.lerpColor(white, blue, 0.5, 'rgba'), [0.5, 0.5, 1]);
   assertEquals(colors.lerpColor(white, magenta, 0.5, 'rgba'), [1, 0.5, 1]);

   assertEquals(colors.lerpColor(white, black, 0.75, 'rgba'), [0.25, 0.25, 0.25]);
   assertEquals(colors.lerpColor(white, gray, 0.75, 'rgba'), [0.625, 0.625, 0.625]);
   assertEquals(colors.lerpColor(white, white, 0.75, 'rgba'), [1, 1, 1]);
   assertEquals(colors.lerpColor(white, translucent, 0.75, 'rgba'), [1, 1, 1, 0.625]);
   assertEquals(colors.lerpColor(white, transparent, 0.75, 'rgba'), [0.25, 0.25, 0.25, 0.25]);
   assertEquals(colors.lerpColor(white, red, 0.75, 'rgba'), [1, 0.25, 0.25]);
   assertEquals(colors.lerpColor(white, yellow, 0.75, 'rgba'), [1, 1, 0.25]);
   assertEquals(colors.lerpColor(white, green, 0.75, 'rgba'), [0.25, 1, 0.25]);
   assertEquals(colors.lerpColor(white, cyan, 0.75, 'rgba'), [0.25, 1, 1]);
   assertEquals(colors.lerpColor(white, blue, 0.75, 'rgba'), [0.25, 0.25, 1]);
   assertEquals(colors.lerpColor(white, magenta, 0.75, 'rgba'), [1, 0.25, 1]);

   assertEquals(colors.lerpColor(white, black, 1, 'rgba'), black);
   assertEquals(colors.lerpColor(white, gray, 1, 'rgba'), gray);
   assertEquals(colors.lerpColor(white, white, 1, 'rgba'), white);
   assertEquals(colors.lerpColor(white, translucent, 1, 'rgba'), translucent);
   assertEquals(colors.lerpColor(white, transparent, 1, 'rgba'), transparent);
   assertEquals(colors.lerpColor(white, red, 1, 'rgba'), red);
   assertEquals(colors.lerpColor(white, yellow, 1, 'rgba'), yellow);
   assertEquals(colors.lerpColor(white, green, 1, 'rgba'), green);
   assertEquals(colors.lerpColor(white, cyan, 1, 'rgba'), cyan);
   assertEquals(colors.lerpColor(white, blue, 1, 'rgba'), blue);
   assertEquals(colors.lerpColor(white, magenta, 1, 'rgba'), magenta);
});

Deno.test('Interpolate color HSVA', () => {
   const black: ColorArray = [69, 0, 0];
   const gray: ColorArray = [420, 0, 0.5];
   const white: ColorArray = [42, 0, 1];
   const translucent: ColorArray = [0, 0, 1, 0.5];
   const transparent: ColorArray = [0, 0, 0, 0];
   const red: ColorArray = [0, 1, 1];
   const yellow: ColorArray = [420, 1, 1];
   const green: ColorArray = [120, 1, 1];
   const cyan: ColorArray = [180, 1, 1];
   const blue: ColorArray = [240, 1, 1];
   const magenta: ColorArray = [-60, 1, 1];

   assertEquals(colors.lerpColor(white, black, 0, 'hsva'), colors.hsvaToRgba(white));
   assertEquals(colors.lerpColor(white, gray, 0, 'hsva'), colors.hsvaToRgba(white));
   assertEquals(colors.lerpColor(white, white, 0, 'hsva'), colors.hsvaToRgba(white));
   assertEquals(colors.lerpColor(white, translucent, 0, 'hsva'), [...colors.hsvaToRgba(white), 1]);
   assertEquals(colors.lerpColor(white, transparent, 0, 'hsva'), [...colors.hsvaToRgba(white), 1]);
   assertEquals(colors.lerpColor(white, red, 0, 'hsva'), colors.hsvaToRgba(white));
   assertEquals(colors.lerpColor(white, yellow, 0, 'hsva'), colors.hsvaToRgba(white));
   assertEquals(colors.lerpColor(white, green, 0, 'hsva'), colors.hsvaToRgba(white));
   assertEquals(colors.lerpColor(white, cyan, 0, 'hsva'), colors.hsvaToRgba(white));
   assertEquals(colors.lerpColor(white, blue, 0, 'hsva'), colors.hsvaToRgba(white));
   assertEquals(colors.lerpColor(white, magenta, 0, 'hsva'), colors.hsvaToRgba(white));

   assertEquals(colors.lerpColor(white, black, 0.25, 'hsva'), [0.75, 0.75, 0.75]);
   assertEquals(colors.lerpColor(white, gray, 0.25, 'hsva'), [0.875, 0.875, 0.875]);
   assertEquals(colors.lerpColor(white, white, 0.25, 'hsva'), [1, 1, 1]);
   assertEquals(colors.lerpColor(white, translucent, 0.25, 'hsva'), [1, 1, 1, 0.875]);
   assertEquals(colors.lerpColor(white, transparent, 0.25, 'hsva'), [0.75, 0.75, 0.75, 0.75]);
   assertEquals(colors.lerpColor(white, red, 0.25, 'hsva'), [1, 0.88125, 0.75]);
   assertEquals(colors.lerpColor(white, yellow, 0.25, 'hsva'), [0.75, 1, 0.81875]);
   assertEquals(colors.lerpColor(white, green, 0.25, 'hsva'), [0.99375, 1, 0.75]);
   assertEquals(colors.lerpColor(white, cyan, 0.25, 'hsva'), [0.93125, 1, 0.75]);
   assertEquals(colors.lerpColor(white, blue, 0.25, 'hsva'), [0.86875, 1, 0.75]);
   assertEquals(colors.lerpColor(white, magenta, 0.25, 'hsva'), [1, 0.81875, 0.75]);

   assertEquals(colors.lerpColor(white, black, 0.5, 'hsva'), [0.5, 0.5, 0.5]);
   assertEquals(colors.lerpColor(white, gray, 0.5, 'hsva'), [0.75, 0.75, 0.75]);
   assertEquals(colors.lerpColor(white, white, 0.5, 'hsva'), [1, 1, 1]);
   assertEquals(colors.lerpColor(white, translucent, 0.5, 'hsva'), [1, 1, 1, 0.75]);
   assertEquals(colors.lerpColor(white, transparent, 0.5, 'hsva'), [0.5, 0.5, 0.5, 0.5]);
   assertEquals(colors.lerpColor(white, red, 0.5, 'hsva'), [1, 0.675, 0.5]);
   assertEquals(colors.lerpColor(white, yellow, 0.5, 'hsva'), [0.5, 0.5749999999999997, 1]);
   assertEquals(colors.lerpColor(white, green, 0.5, 'hsva'), [0.825, 1, 0.5]);
   assertEquals(colors.lerpColor(white, cyan, 0.5, 'hsva'), [0.575, 1, 0.5]);
   assertEquals(colors.lerpColor(white, blue, 0.5, 'hsva'), [0.5, 1, 0.675]);
   assertEquals(colors.lerpColor(white, magenta, 0.5, 'hsva'), [1, 0.5, 0.5750000000000002]);

   assertEquals(colors.lerpColor(white, black, 0.75, 'hsva'), [0.25, 0.25, 0.25]);
   assertEquals(colors.lerpColor(white, gray, 0.75, 'hsva'), [0.625, 0.625, 0.625]);
   assertEquals(colors.lerpColor(white, white, 0.75, 'hsva'), [1, 1, 1]);
   assertEquals(colors.lerpColor(white, translucent, 0.75, 'hsva'), [1, 1, 1, 0.625]);
   assertEquals(colors.lerpColor(white, transparent, 0.75, 'hsva'), [0.25, 0.25, 0.25, 0.25]);
   assertEquals(colors.lerpColor(white, red, 0.75, 'hsva'), [1, 0.3812500000000001, 0.25]);
   assertEquals(colors.lerpColor(white, yellow, 0.75, 'hsva'), [1, 0.25, 0.6812500000000001]);
   assertEquals(colors.lerpColor(white, green, 0.75, 'hsva'), [0.4937499999999999, 1, 0.25]);
   assertEquals(colors.lerpColor(white, cyan, 0.75, 'hsva'), [0.25, 1, 0.5687499999999999]);
   assertEquals(colors.lerpColor(white, blue, 0.75, 'hsva'), [0.25, 0.8687500000000001, 1]);
   assertEquals(colors.lerpColor(white, magenta, 0.75, 'hsva'), [1, 0.25, 0.6812500000000001]);

   assertEquals(colors.lerpColor(white, black, 1, 'hsva'), colors.hsvaToRgba(black));
   assertEquals(colors.lerpColor(white, gray, 1, 'hsva'), colors.hsvaToRgba(gray));
   assertEquals(colors.lerpColor(white, white, 1, 'hsva'), colors.hsvaToRgba(white));
   assertEquals(colors.lerpColor(white, translucent, 1, 'hsva'), colors.hsvaToRgba(translucent));
   assertEquals(colors.lerpColor(white, transparent, 1, 'hsva'), colors.hsvaToRgba(transparent));
   assertEquals(colors.lerpColor(white, red, 1, 'hsva'), colors.hsvaToRgba(red));
   assertEquals(colors.lerpColor(white, yellow, 1, 'hsva'), colors.hsvaToRgba(yellow));
   assertEquals(colors.lerpColor(white, green, 1, 'hsva'), colors.hsvaToRgba(green));
   assertEquals(colors.lerpColor(white, cyan, 1, 'hsva'), colors.hsvaToRgba(cyan));
   assertEquals(colors.lerpColor(white, blue, 1, 'hsva'), colors.hsvaToRgba(blue));
   assertEquals(colors.lerpColor(white, magenta, 1, 'hsva'), colors.hsvaToRgba(magenta));
});

Deno.test('To Color Object', () => {
   assertEquals(colors.toColorObject('#ff00ff'), { r: 1, g: 0, b: 1 });
   assertEquals(colors.toColorObject('#ffff00ff'), { r: 1, g: 1, b: 0, a: 1 });
   assertEquals(colors.toColorObject([2, 1, 3]), { r: 2, g: 1, b: 3 });
   assertEquals(colors.toColorObject([2, 1, 3, 4]), { r: 2, g: 1, b: 3, a: 4 });
   assertEquals(colors.toColorObject({ value: [2, 1, 3], type: 'rgba' }), {
      r: 2,
      g: 1,
      b: 3,
   });
   assertEquals(colors.toColorObject({ value: [2, 1, 3, 4], type: 'rgba' }), {
      r: 2,
      g: 1,
      b: 3,
      a: 4,
   });
   assertEquals(colors.toColorObject({ value: [255, 0, 255], type: 'rgba255' }), {
      r: 1,
      g: 0,
      b: 1,
   });
   assertEquals(colors.toColorObject({ value: [0, 255, 0, 255], type: 'rgba255' }), {
      r: 0,
      g: 1,
      b: 0,
      a: 1,
   });
   assertEquals(colors.toColorObject({ value: [120, 1, 1], type: 'hsva' }), {
      r: 0,
      g: 1,
      b: 0,
   });
   assertEquals(colors.toColorObject({ value: [0, 1, 0.5, 1], type: 'hsva' }), {
      r: 0.5,
      g: 0,
      b: 0,
      a: 1,
   });
   assertEquals(colors.toColorObject({ r: 2, g: 1, b: 3 }), { r: 2, g: 1, b: 3 });
   assertEquals(colors.toColorObject({ r: 2, g: 1, b: 3 }, true), { r: 2, g: 1, b: 3, a: 1 });
   assertEquals(colors.toColorObject({ r: 2, g: 1, b: 3, a: 4 }), {
      r: 2,
      g: 1,
      b: 3,
      a: 4,
   });
});

Deno.test('Color to Hex', () => {
   const black = colors.hsvaToRgba(69, 0, 0);
   const gray = colors.hsvaToRgba(420, 0, 0.5);
   const white = colors.hsvaToRgba(42, 0, 1);
   const translucent = colors.hsvaToRgba(0, 0, 1, 0.5);
   const transparent = colors.hsvaToRgba(0, 0, 0, 0);

   const red = colors.hsvaToRgba(0, 1, 1);
   const yellow = colors.hsvaToRgba(420, 1, 1);
   const green = colors.hsvaToRgba(120, 1, 1);
   const cyan = colors.hsvaToRgba(180, 1, 1);
   const blue = colors.hsvaToRgba(240, 1, 1);
   const magenta = colors.hsvaToRgba(-60, 1, 1);

   assertEquals(colors.colorToHex({ r: 0, g: 0, b: 0 }), '#000000');
   assertEquals(colors.colorToHex({ r: 255, g: 0, b: 128 }), '#ff0080');
   assertEquals(colors.colorToHex({ r: 0, g: 0, b: 0, a: undefined }), '#000000');
   assertEquals(colors.colorToHex(black), '#000000');
   assertEquals(colors.colorToHex(gray), '#808080');
   assertEquals(colors.colorToHex(white), '#ffffff');
   assertEquals(colors.colorToHex(translucent), '#ffffff80');
   assertEquals(colors.colorToHex(transparent), '#00000000');
   assertEquals(colors.colorToHex(red), '#ff0000');
   assertEquals(colors.colorToHex(yellow), '#ffff00');
   assertEquals(colors.colorToHex(green), '#00ff00');
   assertEquals(colors.colorToHex(cyan), '#00ffff');
   assertEquals(colors.colorToHex(blue), '#0000ff');
   assertEquals(colors.colorToHex(magenta), '#ff00ff');
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

   assertEquals(colors.colorFrom(120, 1, 1, 'hsva'), [0, 1, 0]);
   assertEquals(colors.colorFrom(0, 1, 0.5, 1, 'hsva'), [0.5, 0, 0, 1]);
   assertEquals(colors.colorFrom([120, 1, 1], 'hsva'), [0, 1, 0]);
   assertEquals(colors.colorFrom([0, 1, 0.5, 1], 'hsva'), [0.5, 0, 0, 1]);
   assertEquals(colors.colorFrom({ value: [120, 1, 1], type: 'hsva' }), [0, 1, 0]);
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
   assertThrows(() => colors.colorFrom('f'));
   assertThrows(() => colors.colorFrom('   '));
   assertThrows(() => colors.colorFrom('not color'));

   assertEquals(colors.colorFrom([3, 2, 1]), [3, 2, 1]);
   assertEquals(colors.colorFrom([3, 2, 1, 1]), [3, 2, 1, 1]);
   assertEquals(colors.colorFrom([3, 2, 1, 2, 3, 4]), [3, 2, 1, 2]);
   assertThrows(() => colors.colorFrom([3]));
});

Deno.test('Convert color input', () => {
   assertEquals(colors.convertColorType('#ff00ff'), [1, 0, 1]);
   assertEquals(colors.convertColorType('#ffff00ff'), [1, 1, 0, 1]);
   assertEquals(colors.convertColorType([2, 1, 3]), [2, 1, 3]);
   assertEquals(colors.convertColorType([2, 1, 3, 4]), [2, 1, 3, 4]);
   assertEquals(colors.convertColorType({ value: [2, 1, 3], type: 'rgba' }), [2, 1, 3]);
   assertEquals(colors.convertColorType({ value: [2, 1, 3, 4], type: 'rgba' }), [2, 1, 3, 4]);
   assertEquals(colors.convertColorType({ value: [255, 0, 255], type: 'rgba255' }), [1, 0, 1]);
   assertEquals(
      colors.convertColorType({ value: [0, 255, 0, 255], type: 'rgba255' }),
      [0, 1, 0, 1],
   );
   assertEquals(colors.convertColorType({ value: [120, 1, 1], type: 'hsva' }), [0, 1, 0]);
   assertEquals(colors.convertColorType({ value: [0, 1, 0.5, 1], type: 'hsva' }), [0.5, 0, 0, 1]);
   assertEquals(colors.convertColorType({ r: 2, g: 1, b: 3 }), [2, 1, 3]);
   assertEquals(colors.convertColorType({ r: 2, g: 1, b: 3, a: 4 }), [2, 1, 3, 4]);
   assertEquals(colors.convertColorType([2, 1, 3], 'rgba'), [2, 1, 3]);
   assertEquals(colors.convertColorType([2, 1, 3, 4], 'rgba'), [2, 1, 3, 4]);
   assertEquals(colors.convertColorType([255, 0, 255], 'rgba255'), [1, 0, 1]);
   assertEquals(colors.convertColorType([0, 255, 0, 255], 'rgba255'), [0, 1, 0, 1]);
   assertEquals(colors.convertColorType([120, 1, 1], 'hsva'), [0, 1, 0]);
   assertEquals(colors.convertColorType([0, 1, 0.5, 1], 'hsva'), [0.5, 0, 0, 1]);

   assertEquals(
      colors.convertColorType('#ff00ff', 'rgba', 'hsva'),
      colors.convertColorType([1, 0, 1], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType('#ffff00ff', 'rgba', 'hsva'),
      colors.convertColorType([1, 1, 0, 1], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType([2, 1, 3], 'rgba', 'hsva'),
      colors.convertColorType([2, 1, 3], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType([2, 1, 3, 4], 'rgba', 'hsva'),
      colors.convertColorType([2, 1, 3, 4], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType({ value: [2, 1, 3], type: 'rgba' }, 'rgba', 'hsva'),
      colors.convertColorType([2, 1, 3], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType({ value: [2, 1, 3, 4], type: 'rgba' }, 'rgba', 'hsva'),
      colors.convertColorType([2, 1, 3, 4], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType({ value: [255, 0, 255], type: 'rgba255' }, 'rgba', 'hsva'),
      colors.convertColorType([1, 0, 1], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType({ value: [0, 255, 0, 255], type: 'rgba255' }, 'rgba', 'hsva'),
      colors.convertColorType([0, 1, 0, 1], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType({ value: [120, 1, 1], type: 'hsva' }, 'rgba', 'hsva'),
      colors.convertColorType([0, 1, 0], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType({ value: [0, 1, 0.5, 1], type: 'hsva' }, 'rgba', 'hsva'),
      colors.convertColorType([0.5, 0, 0, 1], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType({ r: 2, g: 1, b: 3 }, 'rgba', 'hsva'),
      colors.convertColorType([2, 1, 3], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType({ r: 2, g: 1, b: 3, a: 4 }, 'rgba', 'hsva'),
      colors.convertColorType([2, 1, 3, 4], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType([2, 1, 3], 'rgba', 'hsva'),
      colors.convertColorType([2, 1, 3], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType([2, 1, 3, 4], 'rgba', 'hsva'),
      colors.convertColorType([2, 1, 3, 4], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType([255, 0, 255], 'rgba255', 'hsva'),
      colors.convertColorType([1, 0, 1], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType([0, 255, 0, 255], 'rgba255', 'hsva'),
      colors.convertColorType([0, 1, 0, 1], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType([120, 1, 1], 'hsva', 'hsva'),
      colors.convertColorType([0, 1, 0], 'rgba', 'hsva'),
   );
   assertEquals(
      colors.convertColorType([0, 1, 0.5, 1], 'hsva', 'hsva'),
      colors.convertColorType([0.5, 0, 0, 1], 'rgba', 'hsva'),
   );
});

Deno.test('Color to Lab', () => {
   const black = colors.hsvaToRgba(69, 0, 0);
   const gray = colors.hsvaToRgba(420, 0, 0.5);
   const white = colors.hsvaToRgba(42, 0, 1);
   const translucent = colors.hsvaToRgba(0, 0, 1, 0.5);
   const transparent = colors.hsvaToRgba(0, 0, 0, 0);
   const red = colors.hsvaToRgba(0, 1, 1);
   const yellow = colors.hsvaToRgba(420, 1, 1);
   const green = colors.hsvaToRgba(120, 1, 1);
   const cyan = colors.hsvaToRgba(180, 1, 1);
   const blue = colors.hsvaToRgba(240, 1, 1);
   const magenta = colors.hsvaToRgba(-60, 1, 1);

   const blackLab = [0, 0, 0, 1];
   const grayLab = [53.38896474111432, 0.0031467297079701417, -0.00622597542279113];
   const whiteLab = [100, 0.00526049995830391, -0.010408184525267927];
   const translucentLab = [100, 0.00526049995830391, -0.010408184525267927, 0.5];
   const transparentLab = [0, 0, 0, 0];
   const redLab = [53.23288178584245, 80.10930952982204, 67.22006831026425];
   const yellowLab = [97.13824698129729, -21.555908334832285, 94.48248544644461];
   const greenLab = [87.73703347354422, -86.1846364976253, 83.18116474777854];
   const cyanLab = [91.11652110946342, -48.079618466228766, -14.138127754846131];
   const blueLab = [32.302586667249486, 79.19666178930935, -107.8636810449517];
   const magentaLab = [60.319933664076004, 98.25421868616108, -60.84298422386232];

   assert(colors.rgbaToLabA(black).every((v, idx) => nearEqual(v!, blackLab[idx], EPSILON)));
   assert(colors.rgbaToLabA(gray).every((v, idx) => nearEqual(v!, grayLab[idx], EPSILON)));
   assert(colors.rgbaToLabA(white).every((v, idx) => nearEqual(v!, whiteLab[idx], EPSILON)));
   assert(
      colors.rgbaToLabA(translucent).every((v, idx) => nearEqual(v!, translucentLab[idx], EPSILON)),
   );
   assert(
      colors.rgbaToLabA(transparent).every((v, idx) => nearEqual(v!, transparentLab[idx], EPSILON)),
   );
   assert(colors.rgbaToLabA(red).every((v, idx) => nearEqual(v!, redLab[idx], EPSILON)));
   assert(colors.rgbaToLabA(yellow).every((v, idx) => nearEqual(v!, yellowLab[idx], EPSILON)));
   assert(colors.rgbaToLabA(green).every((v, idx) => nearEqual(v!, greenLab[idx], EPSILON)));
   assert(colors.rgbaToLabA(cyan).every((v, idx) => nearEqual(v!, cyanLab[idx], EPSILON)));
   assert(colors.rgbaToLabA(blue).every((v, idx) => nearEqual(v!, blueLab[idx], EPSILON)));
   assert(colors.rgbaToLabA(magenta).every((v, idx) => nearEqual(v!, magentaLab[idx], EPSILON)));
});

Deno.test('Color to Lab', () => {
   const black = colors.hsvaToRgba(69, 0, 0);
   const gray = colors.hsvaToRgba(420, 0, 0.5);
   const white = colors.hsvaToRgba(42, 0, 1);
   const translucent = colors.hsvaToRgba(0, 0, 1, 0.5);
   const transparent = colors.hsvaToRgba(0, 0, 0, 0);
   const red = colors.hsvaToRgba(0, 1, 1);
   const yellow = colors.hsvaToRgba(420, 1, 1);
   const green = colors.hsvaToRgba(120, 1, 1);
   const cyan = colors.hsvaToRgba(180, 1, 1);
   const blue = colors.hsvaToRgba(240, 1, 1);
   const magenta = colors.hsvaToRgba(-60, 1, 1);

   assertAlmostEquals(colors.deltaE00(white, black), 100.00000076881211, EPSILON);
   assertAlmostEquals(colors.deltaE00(white, gray), 33.41499656712586, EPSILON);
   assertAlmostEquals(colors.deltaE00(white, white), 0, EPSILON);
   assertAlmostEquals(colors.deltaE00(white, translucent), 0, EPSILON);
   assertAlmostEquals(colors.deltaE00(white, transparent), 100.00000076881211, EPSILON);
   assertAlmostEquals(colors.deltaE00(white, red), 46.191448932477726, EPSILON);
   assertAlmostEquals(colors.deltaE00(white, yellow), 30.583851351643776, EPSILON);
   assertAlmostEquals(colors.deltaE00(white, green), 33.669627509736785, EPSILON);
   assertAlmostEquals(colors.deltaE00(white, cyan), 25.678486607847386, EPSILON);
   assertAlmostEquals(colors.deltaE00(white, blue), 64.33437137421264, EPSILON);
   assertAlmostEquals(colors.deltaE00(white, magenta), 42.615120425199414, EPSILON);
});
