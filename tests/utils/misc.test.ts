import * as misc from '../../src/utils/misc/mod.ts';
import * as math from '../../src/utils/math/mod.ts';
import { assert, assertEquals } from '../deps.ts';

Deno.test('Format number helper', () => {
   assertEquals(misc.formatNumber(123456789), '123,456,789');
   assertEquals(misc.formatNumber(-1999), '-1,999');
   assertEquals(misc.formatNumber(1234.5678), '1,234.5678');
   assertEquals(misc.formatNumber(-98765.4321), '-98,765.4321');
   assertEquals(misc.formatNumber(999.99), '999.99');
   assertEquals(misc.formatNumber(0), '0');
});

Deno.test('Range helper', () => {
   assertEquals(misc.range(0), []);
   assertEquals(misc.range(1), [0]);
   assertEquals(misc.range(0, true), [0]);
   assertEquals(misc.range(10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
   assertEquals(misc.range(-10), [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]);
   assertEquals(misc.range(0, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
   assertEquals(misc.range(0, 10, true), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
   assertEquals(misc.range(0, -10), [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]);
   assertEquals(
      misc.range(0, -10, true),
      [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10],
   );
   assertEquals(
      misc.range(-10, 10),
      [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
   );
   assertEquals(misc.range(10, 0), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
   assertEquals(misc.range(-10, 0), [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1]);
   assertEquals(misc.range(0, 10, 2), [0, 2, 4, 6, 8]);
   assertEquals(misc.range(0, 10, -2), [0, -2, -4, -6, -8]);
   assertEquals(misc.range(-1, -1), []);
   assertEquals(misc.range(-1, 1, 2), [-1]);
   assertEquals(misc.range(-1, 2, 2), [-1, 1]);
   assertEquals(misc.range(-1, 1, 2, true), [-1, 1]);
});

Deno.test('Shuffle', () => {
   const rand = math.pRandomFn('shuffle');
   const ary = [1, 2, 3, 4, 5];

   misc.shuffle(ary, rand);
   assertEquals(ary, [3, 1, 2, 4, 5]);

   misc.shuffle(ary, rand);
   assertEquals(ary, [2, 4, 5, 1, 3]);
});

Deno.test('Interleave', () => {
   assertEquals(misc.interleave([1, 2, 3], [4, 5, 6]), [1, 4, 2, 5, 3, 6]);
});

Deno.test('Pick Random', () => {
   const rand = math.pRandomFn('pickRandom');
   const ary = [1, 2, 3, 4, 5];

   assertEquals(misc.pickRandom(ary, rand), 4);
   assertEquals(misc.pickRandom(ary, rand), 5);
   assertEquals(misc.pickRandom(ary, rand), 3);
});

Deno.test('Shallow Copy', () => {
   // acceptable
   // deno-lint-ignore no-explicit-any
   let testCopy: any;
   testCopy = [];
   assertEquals(misc.shallowCopy(testCopy), testCopy);
   assert(misc.shallowCopy(testCopy) !== testCopy);
   testCopy = {};
   assertEquals(misc.shallowCopy(testCopy), testCopy);
   assert(misc.shallowCopy(testCopy) !== testCopy);
   testCopy = [{}, 0];
   assertEquals(misc.shallowCopy(testCopy), testCopy);
   assert(misc.shallowCopy(testCopy) !== testCopy);
   testCopy = [0, 'lol'];
   assertEquals(misc.shallowCopy(testCopy), testCopy);
   assert(misc.shallowCopy(testCopy) !== testCopy);
   testCopy = [{ yes: '' }];
   assertEquals(misc.shallowCopy(testCopy), testCopy);
   assert(misc.shallowCopy(testCopy) !== testCopy);
   testCopy = {
      string: 'abc',
      number: 123.05,
      boolean: true,
      array: ['hi'],
      object: { nested: 'hi' },
   };
   assertEquals(misc.shallowCopy(testCopy), testCopy);
   assert(misc.shallowCopy(testCopy) !== testCopy);
   testCopy = () => {};
   assertEquals(misc.shallowCopy(testCopy), testCopy); // function returns as function

   // non object stuff
   assertEquals(misc.shallowCopy(''), '');
   assertEquals(misc.shallowCopy(0), 0);
   assertEquals(misc.shallowCopy(false), false);
   assertEquals(misc.shallowCopy(Boolean()), Boolean());
   assertEquals(misc.shallowCopy(undefined), undefined);
   assertEquals(misc.shallowCopy(null), null);
});

Deno.test('Deep Copy', () => {
   // acceptable
   // deno-lint-ignore no-explicit-any
   let testCopy: any;
   testCopy = [];
   assertEquals(misc.deepCopy(testCopy), testCopy);
   assert(misc.deepCopy(testCopy) !== testCopy);
   testCopy = {};
   assertEquals(misc.deepCopy(testCopy), testCopy);
   assert(misc.deepCopy(testCopy) !== testCopy);
   testCopy = [{}, 0];
   assertEquals(misc.deepCopy(testCopy), testCopy);
   assert(misc.deepCopy(testCopy) !== testCopy);
   testCopy = [0, 'lol'];
   assertEquals(misc.deepCopy(testCopy), testCopy);
   assert(misc.deepCopy(testCopy) !== testCopy);
   testCopy = [{ yes: '' }];
   assertEquals(misc.deepCopy(testCopy), testCopy);
   assert(misc.deepCopy(testCopy) !== testCopy);
   testCopy = {
      string: 'abc',
      number: 123.05,
      boolean: true,
      array: ['hi'],
      object: { nested: 'hi' },
   };
   assertEquals(misc.deepCopy(testCopy), testCopy);
   assert(misc.deepCopy(testCopy) !== testCopy);
   testCopy = () => {};
   assertEquals(misc.deepCopy(testCopy), testCopy); // function returns as function

   // non object stuff
   assertEquals(misc.deepCopy(''), '');
   assertEquals(misc.deepCopy(0), 0);
   assertEquals(misc.deepCopy(false), false);
   assertEquals(misc.deepCopy(Boolean()), Boolean());
   assertEquals(misc.deepCopy(undefined), undefined);
   assertEquals(misc.deepCopy(null), null);
});

Deno.test('JSON Copy', () => {
   // acceptable
   // deno-lint-ignore no-explicit-any
   let testCopy: any;
   testCopy = [];
   assertEquals(misc.jsonCopy(testCopy), testCopy);
   assert(misc.jsonCopy(testCopy) !== testCopy);
   testCopy = {};
   assertEquals(misc.jsonCopy(testCopy), testCopy);
   assert(misc.jsonCopy(testCopy) !== testCopy);
   testCopy = [{}, 0];
   assertEquals(misc.jsonCopy(testCopy), testCopy);
   assert(misc.jsonCopy(testCopy) !== testCopy);
   testCopy = [0, 'lol'];
   assertEquals(misc.jsonCopy(testCopy), testCopy);
   assert(misc.jsonCopy(testCopy) !== testCopy);
   testCopy = [{ yes: '' }];
   assertEquals(misc.jsonCopy(testCopy), testCopy);
   assert(misc.jsonCopy(testCopy) !== testCopy);
   testCopy = {
      string: 'abc',
      number: 123.05,
      boolean: true,
      array: ['hi'],
      object: { nested: 'hi' },
   };
   assertEquals(misc.jsonCopy(testCopy), testCopy);
   assert(misc.jsonCopy(testCopy) !== testCopy);

   // non object stuff
   assertEquals(misc.jsonCopy(''), '');
   assertEquals(misc.jsonCopy(0), 0);
   assertEquals(misc.jsonCopy(false), false);
   assertEquals(misc.jsonCopy(Boolean()), Boolean());
   assertEquals(misc.jsonCopy(null), null);
});

Deno.test('Is Hexadecimal', () => {
   // acceptable
   assert(misc.isHex('ff9'));
   assert(misc.isHex('AbCd8'));
   assert(misc.isHex('1234'));

   // unacceptable
   assert(!misc.isHex('')); // empty is still considered invalid hex
   assert(!misc.isHex('#'));
   assert(!misc.isHex('#09aF'));
   assert(!misc.isHex('#beef'));
   assert(!misc.isHex('  feed'));
   assert(!misc.isHex('88  '));
   assert(!misc.isHex('abcdefg'));
   assert(!misc.isHex('Cyan is a furry'));
   assert(!misc.isHex('1234567890qwertyuio'));
});

Deno.test('Hexadecimal to Decimal', () => {
   assertEquals(misc.hexToDec('ff'), 255);
   assertEquals(misc.hexToDec('0'), 0);
   assertEquals(misc.hexToDec('a'), 10);
});

Deno.test('Decimal to Hexadecimal', () => {
   assertEquals(misc.decToHex(255), 'ff');
   assertEquals(misc.decToHex(0), '0');
   assertEquals(misc.decToHex(10), 'a');
});
