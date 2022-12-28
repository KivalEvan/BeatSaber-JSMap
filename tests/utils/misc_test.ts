import * as misc from '../../utils/misc.ts';
import { assert } from '../deps.ts';

Deno.test('Is Hex', () => {
    // acceptable
    assert(misc.isHex('')); // empty is still considered valid hex
    assert(misc.isHex('ff9'));
    assert(misc.isHex('AbCd8'));
    assert(misc.isHex('1234'));

    // unacceptable
    assert(!misc.isHex('#'));
    assert(!misc.isHex('#09aF'));
    assert(!misc.isHex('#beef'));
    assert(!misc.isHex('  feed'));
    assert(!misc.isHex('88  '));
    assert(!misc.isHex('abcdefg'));
    assert(!misc.isHex('Cyan is a furry'));
    assert(!misc.isHex('1234567890qwertyuio'));
});
