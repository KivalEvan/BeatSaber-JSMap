import * as convert from '../../../beatmap/helpers/convert.ts';
import { EPSILON } from '../../constants.ts';
import { assertAlmostEquals } from '../../deps.ts';

Deno.test('Grid to Unity Unit', () => {
   assertAlmostEquals(convert.gridToUnityUnit(0), 0, EPSILON);
   assertAlmostEquals(convert.gridToUnityUnit(1), 0.6, EPSILON);
   assertAlmostEquals(convert.gridToUnityUnit(-1), -0.6, EPSILON);
   assertAlmostEquals(convert.gridToUnityUnit(3.5), 2.1, EPSILON);
});

Deno.test('Unity to Grid Unit', () => {
   assertAlmostEquals(convert.unityToGridUnit(0), 0, EPSILON);
   assertAlmostEquals(convert.unityToGridUnit(0.6), 1, EPSILON);
   assertAlmostEquals(convert.unityToGridUnit(-0.6), -1, EPSILON);
   assertAlmostEquals(convert.unityToGridUnit(1), 1.666667, EPSILON);
   assertAlmostEquals(convert.unityToGridUnit(3.6), 6, EPSILON);
});
