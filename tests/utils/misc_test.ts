import * as misc from '../../utils/misc.ts';
import { assert, assertEquals } from '../deps.ts';

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
