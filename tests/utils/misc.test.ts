import * as misc from '../../utils/misc.ts';
import * as math from '../../utils/math.ts';
import { assert, assertEquals, assertThrows } from '../deps.ts';

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

Deno.test('Deep Copy', () => {
    // acceptable
    assertEquals(misc.deepCopy([]), []);
    assertEquals(misc.deepCopy({}), {});
    assertEquals(misc.deepCopy([{}, 0]), [{}, 0]);
    assertEquals(misc.deepCopy([0, 'lol']), [0, 'lol']);
    assertEquals(misc.deepCopy([{ yes: '' }]), [{ yes: '' }]);
    assertEquals(
        misc.deepCopy({
            string: 'abc',
            number: 123.05,
            boolean: true,
            array: ['hi'],
            object: { nested: 'hi' },
        }),
        { string: 'abc', number: 123.05, boolean: true, array: ['hi'], object: { nested: 'hi' } },
    );
    assertEquals(misc.deepCopy(null), null); // i mean yea it works and expected

    // non object stuff
    assertEquals(misc.deepCopy(''), '');
    assertEquals(misc.deepCopy(0), 0);
    assertEquals(misc.deepCopy(false), false);
    assertEquals(misc.deepCopy(Boolean()), Boolean());
    assertEquals(misc.deepCopy(undefined), undefined);
    const fn = () => {};
    assertEquals(misc.deepCopy(fn), fn);
    const date = new Date();
    // assertEquals(misc.deepCopy(date)); // FIXME: figure out if this is even valid
    const boolean = new Boolean();
    // assertEquals(misc.deepCopy(boolean), boolean);
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
