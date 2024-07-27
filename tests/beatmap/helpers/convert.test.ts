import { EPSILON } from '../../constants.ts';
import { assertAlmostEquals, gridToUnityUnit, unityToGridUnit } from '../../deps.ts';

Deno.test('Grid to Unity Unit', () => {
   assertAlmostEquals(gridToUnityUnit(0), 0, EPSILON);
   assertAlmostEquals(gridToUnityUnit(1), 0.6, EPSILON);
   assertAlmostEquals(gridToUnityUnit(-1), -0.6, EPSILON);
   assertAlmostEquals(gridToUnityUnit(3.5), 2.1, EPSILON);
});

Deno.test('Unity to Grid Unit', () => {
   assertAlmostEquals(unityToGridUnit(0), 0, EPSILON);
   assertAlmostEquals(unityToGridUnit(0.6), 1, EPSILON);
   assertAlmostEquals(unityToGridUnit(-0.6), -1, EPSILON);
   assertAlmostEquals(unityToGridUnit(1), 1.666667, EPSILON);
   assertAlmostEquals(unityToGridUnit(3.6), 6, EPSILON);
});
