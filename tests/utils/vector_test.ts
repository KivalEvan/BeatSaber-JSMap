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

Deno.test('Translate Vector', () => {
    assertEquals(vector.vectorTranslate(), undefined);
    assertEquals(vector.vectorTranslate([1]), [1]);
    assertEquals(vector.vectorTranslate([]), []);

    assertEquals(vector.vectorTranslate([1, 2]), [1, 2]);
    assertEquals(vector.vectorTranslate([1, 2, 3]), [1, 2, 3]);
    assertEquals(vector.vectorTranslate([1, 2, 3, 4]), [1, 2, 3, 4]);

    assertEquals(vector.vectorTranslate([1, 2], [-1, 0, 1, 0]), [0, 2]);
    assertEquals(vector.vectorTranslate([1, 2, 3], [-1, 0, 1, 0]), [0, 2, 4]);
    assertEquals(vector.vectorTranslate([1, 2, 3, 4], [-1, 0, 1, 0]), [0, 2, 4, 4]);

    assertEquals(vector.vectorTranslate([1, 2], [-1, 0]), [0, 2]);
    assertEquals(vector.vectorTranslate([1, 2, 3], [-1, 0]), [0, 2, 3]);
    assertEquals(vector.vectorTranslate([1, 2, 3, 4], [-1, 0]), [0, 2, 3, 4]);

    assertEquals(vector.vectorTranslate([1, 2], { x: -1, y: 0, z: 1, w: 0 }), [0, 2]);
    assertEquals(vector.vectorTranslate([1, 2, 3], { x: -1, y: 0, z: 1, w: 0 }), [0, 2, 4]);
    assertEquals(vector.vectorTranslate([1, 2, 3, 4], { x: -1, y: 0, z: 1, w: 0 }), [0, 2, 4, 4]);

    assertEquals(vector.vectorTranslate([1, 2], { x: -1, y: 1 }), [0, 3]);
    assertEquals(vector.vectorTranslate([1, 2, 3], { x: -1, y: 1 }), [0, 3, 3]);
    assertEquals(vector.vectorTranslate([1, 2, 3, 4], { x: -1, y: 1 }), [0, 3, 3, 4]);
});

Deno.test('Rotate Vector', () => {
    assertEquals(vector.vectorRotate(), undefined);
    assertEquals(vector.vectorRotate([1]), [1]);
    assertEquals(vector.vectorRotate([]), []);

    assertEquals(vector.vectorRotate([0, 30]), [0, 30]);
    assertEquals(vector.vectorRotate([0, 30, 45]), [0, 30, 45]);
    assertEquals(vector.vectorRotate([0, 30, 45, 90]), [0, 30, 45, 90]);

    assertEquals(vector.vectorRotate([0, 30], [-90, 45, -30, 0]), [-90, 75]);
    assertEquals(vector.vectorRotate([0, 30, 45], [-90, 45, -30, 0]), [-90, 75, 15]);
    assertEquals(vector.vectorRotate([0, 30, 45, 90], [-90, 45, -30, 0]), [-90, 75, 15, 90]);

    assertEquals(vector.vectorRotate([0, 30], { x: -90, y: 45, z: -30, w: 0 }), [-90, 75]);
    assertEquals(vector.vectorRotate([0, 30, 45], { x: -90, y: 45, z: -30, w: 0 }), [-90, 75, 15]);
    assertEquals(
        vector.vectorRotate([0, 30, 45, 90], { x: -90, y: 45, z: -30, w: 0 }),
        [-90, 75, 15, 90],
    );

    assertEquals(vector.vectorRotate([0, 30], { x: -90, y: 45 }), [-90, 75]);
    assertEquals(vector.vectorRotate([0, 30, 45], { x: -90, y: 45 }), [-90, 75, 45]);
    assertEquals(vector.vectorRotate([0, 30, 45, 90], { x: -90, y: 45 }), [-90, 75, 45, 90]);
});

Deno.test('Scale Vector', () => {
    assertEquals(vector.vectorScale(), undefined);
    assertEquals(vector.vectorScale([1]), [1]);
    assertEquals(vector.vectorScale([]), []);

    assertEquals(vector.vectorScale([1, 2]), [1, 2]);
    assertEquals(vector.vectorScale([1, 2, 3]), [1, 2, 3]);
    assertEquals(vector.vectorScale([1, 2, 3, 4]), [1, 2, 3, 4]);

    assertEquals(vector.vectorScale([1, 2], 2), [2, 4]);
    assertEquals(vector.vectorScale([1, 2, 3], 2), [2, 4, 6]);
    assertEquals(vector.vectorScale([1, 2, 3, 4], 2), [2, 4, 6, 8]);

    assertEquals(vector.vectorScale([2, 2], [1, 2, -3, 5.5]), [2, 4]);
    assertEquals(vector.vectorScale([2, 2, 2], [1, 2, -3, 5.5]), [2, 4, -6]);
    assertEquals(vector.vectorScale([2, 2, 2, 2], [1, 2, -3, 5.5]), [2, 4, -6, 11]);

    assertEquals(vector.vectorScale([2, 2], { x: 1, y: 2, z: -3, w: 5.5 }), [2, 4]);
    assertEquals(vector.vectorScale([2, 2, 2], { x: 1, y: 2, z: -3, w: 5.5 }), [2, 4, -6]);
    assertEquals(vector.vectorScale([2, 2, 2, 2], { x: 1, y: 2, z: -3, w: 5.5 }), [2, 4, -6, 11]);

    assertEquals(vector.vectorScale([2, 2], { x: 1, y: 2 }), [2, 4]);
    assertEquals(vector.vectorScale([2, 2, 2], { x: 1, y: 2 }), [2, 4, 2]);
    assertEquals(vector.vectorScale([2, 2, 2, 2], { x: 1, y: 2 }), [2, 4, 2, 2]);
});
