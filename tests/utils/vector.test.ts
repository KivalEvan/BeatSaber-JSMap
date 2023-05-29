import * as vector from '../../utils/vector.ts';
import { assert, assertEquals } from '../deps.ts';

Deno.test('Is Vector 2', () => {
    assert(vector.isVector2([1, 2]));

    assert(!vector.isVector2(1));
    assert(!vector.isVector2(''));
    assert(!vector.isVector2(null));
    assert(!vector.isVector2(new Date()));
    assert(!vector.isVector2({}));
    assert(!vector.isVector2([]));
    assert(!vector.isVector2([1, 2, 3]));
    assert(!vector.isVector2([1, null]));
    assert(!vector.isVector2([1]));
});

Deno.test('Is Vector 3', () => {
    assert(vector.isVector3([1, 2, 3]));

    assert(!vector.isVector3(1));
    assert(!vector.isVector3(''));
    assert(!vector.isVector3(null));
    assert(!vector.isVector3(new Date()));
    assert(!vector.isVector3({}));
    assert(!vector.isVector3([]));
    assert(!vector.isVector3([1, 2]));
    assert(!vector.isVector2([1, null, 3]));
    assert(!vector.isVector3([1, 2, 3, 4]));
});

Deno.test('Is Vector 4', () => {
    assert(vector.isVector4([1, 2, 3, 4]));

    assert(!vector.isVector4(1));
    assert(!vector.isVector4(''));
    assert(!vector.isVector4(null));
    assert(!vector.isVector4(new Date()));
    assert(!vector.isVector4({}));
    assert(!vector.isVector4([]));
    assert(!vector.isVector4([1, 2, 3]));
    assert(!vector.isVector4([1, 2, null, 4]));
    assert(!vector.isVector4([1, 2, 3, 4, 5]));
});

Deno.test('Add Vector', () => {
    assertEquals(vector.vectorAdd(), undefined);
    assertEquals(vector.vectorAdd([1]), [1]);
    assertEquals(vector.vectorAdd([]), []);

    assertEquals(vector.vectorAdd([1, 2]), [1, 2]);
    assertEquals(vector.vectorAdd([1, 2, 3]), [1, 2, 3]);
    assertEquals(vector.vectorAdd([1, 2, 3, 4]), [1, 2, 3, 4]);

    assertEquals(vector.vectorAdd([1, 2], [-1, 0, 1, 0]), [0, 2]);
    assertEquals(vector.vectorAdd([1, 2, 3], [-1, 0, 1, 0]), [0, 2, 4]);
    assertEquals(vector.vectorAdd([1, 2, 3, 4], [-1, 0, 1, 0]), [0, 2, 4, 4]);

    assertEquals(vector.vectorAdd([1, 2], [-1, 0]), [0, 2]);
    assertEquals(vector.vectorAdd([1, 2, 3], [-1, 0]), [0, 2, 3]);
    assertEquals(vector.vectorAdd([1, 2, 3, 4], [-1, 0]), [0, 2, 3, 4]);

    assertEquals(vector.vectorAdd([1, 2], { x: -1, y: 0, z: 1, w: 0 }), [0, 2]);
    assertEquals(vector.vectorAdd([1, 2, 3], { x: -1, y: 0, z: 1, w: 0 }), [0, 2, 4]);
    assertEquals(vector.vectorAdd([1, 2, 3, 4], { x: -1, y: 0, z: 1, w: 0 }), [0, 2, 4, 4]);

    assertEquals(vector.vectorAdd([1, 2], { x: -1, y: 1 }), [0, 3]);
    assertEquals(vector.vectorAdd([1, 2, 3], { x: -1, y: 1 }), [0, 3, 3]);
    assertEquals(vector.vectorAdd([1, 2, 3, 4], { x: -1, y: 1 }), [0, 3, 3, 4]);
});

Deno.test('Subtract Vector', () => {
    assertEquals(vector.vectorSub(), undefined);
    assertEquals(vector.vectorSub([1]), [1]);
    assertEquals(vector.vectorSub([]), []);

    assertEquals(vector.vectorSub([1, 2]), [1, 2]);
    assertEquals(vector.vectorSub([1, 2, 3]), [1, 2, 3]);
    assertEquals(vector.vectorSub([1, 2, 3, 4]), [1, 2, 3, 4]);

    assertEquals(vector.vectorSub([1, 2], [-1, 0, 1, 0]), [2, 2]);
    assertEquals(vector.vectorSub([1, 2, 3], [-1, 0, 1, 0]), [2, 2, 2]);
    assertEquals(vector.vectorSub([1, 2, 3, 4], [-1, 0, 1, 0]), [2, 2, 2, 4]);

    assertEquals(vector.vectorSub([1, 2], [-1, 0]), [2, 2]);
    assertEquals(vector.vectorSub([1, 2, 3], [-1, 0]), [2, 2, 3]);
    assertEquals(vector.vectorSub([1, 2, 3, 4], [-1, 0]), [2, 2, 3, 4]);

    assertEquals(vector.vectorSub([1, 2], { x: -1, y: 0, z: 1, w: 0 }), [2, 2]);
    assertEquals(vector.vectorSub([1, 2, 3], { x: -1, y: 0, z: 1, w: 0 }), [2, 2, 2]);
    assertEquals(vector.vectorSub([1, 2, 3, 4], { x: -1, y: 0, z: 1, w: 0 }), [2, 2, 2, 4]);

    assertEquals(vector.vectorSub([1, 2], { x: -1, y: 1 }), [2, 1]);
    assertEquals(vector.vectorSub([1, 2, 3], { x: -1, y: 1 }), [2, 1, 3]);
    assertEquals(vector.vectorSub([1, 2, 3, 4], { x: -1, y: 1 }), [2, 1, 3, 4]);
});

Deno.test('Multiply Vector', () => {
    assertEquals(vector.vectorMul(), undefined);
    assertEquals(vector.vectorMul([1]), [1]);
    assertEquals(vector.vectorMul([]), []);

    assertEquals(vector.vectorMul([1, 2]), [1, 2]);
    assertEquals(vector.vectorMul([1, 2, 3]), [1, 2, 3]);
    assertEquals(vector.vectorMul([1, 2, 3, 4]), [1, 2, 3, 4]);

    assertEquals(vector.vectorMul([1, 2], 2), [2, 4]);
    assertEquals(vector.vectorMul([1, 2, 3], 2), [2, 4, 6]);
    assertEquals(vector.vectorMul([1, 2, 3, 4], 2), [2, 4, 6, 8]);

    assertEquals(vector.vectorMul([2, 2], [1, 2, -3, 5.5]), [2, 4]);
    assertEquals(vector.vectorMul([2, 2, 2], [1, 2, -3, 5.5]), [2, 4, -6]);
    assertEquals(vector.vectorMul([2, 2, 2, 2], [1, 2, -3, 5.5]), [2, 4, -6, 11]);

    assertEquals(vector.vectorMul([2, 2], { x: 1, y: 2, z: -3, w: 5.5 }), [2, 4]);
    assertEquals(vector.vectorMul([2, 2, 2], { x: 1, y: 2, z: -3, w: 5.5 }), [2, 4, -6]);
    assertEquals(vector.vectorMul([2, 2, 2, 2], { x: 1, y: 2, z: -3, w: 5.5 }), [2, 4, -6, 11]);

    assertEquals(vector.vectorMul([2, 2], { x: 1, y: 2 }), [2, 4]);
    assertEquals(vector.vectorMul([2, 2, 2], { x: 1, y: 2 }), [2, 4, 2]);
    assertEquals(vector.vectorMul([2, 2, 2, 2], { x: 1, y: 2 }), [2, 4, 2, 2]);
});
