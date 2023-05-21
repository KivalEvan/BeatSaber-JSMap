import * as helpers from '../../../beatmap/shared/helpers.ts';
import { EPSILON } from '../../constants.ts';
import { assertAlmostEquals } from '../../deps.ts';

Deno.test('Grid to Unity Unit', () => {
    assertAlmostEquals(helpers.gridToUnityUnit(0), 0, EPSILON);
    assertAlmostEquals(helpers.gridToUnityUnit(1), 0.6, EPSILON);
    assertAlmostEquals(helpers.gridToUnityUnit(-1), -0.6, EPSILON);
    assertAlmostEquals(helpers.gridToUnityUnit(3.5), 2.1, EPSILON);
});

Deno.test('Unity to Grid Unit', () => {
    assertAlmostEquals(helpers.unityToGridUnit(0), 0, EPSILON);
    assertAlmostEquals(helpers.unityToGridUnit(0.6), 1, EPSILON);
    assertAlmostEquals(helpers.unityToGridUnit(-0.6), -1, EPSILON);
    assertAlmostEquals(helpers.unityToGridUnit(1), 1.666667, EPSILON);
    assertAlmostEquals(helpers.unityToGridUnit(3.6), 6, EPSILON);
});
