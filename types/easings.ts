type Curve =
   | 'Sine'
   | 'Quad'
   | 'Cubic'
   | 'Quart'
   | 'Quint'
   | 'Expo'
   | 'Circ'
   | 'Back'
   | 'Elastic'
   | 'Bounce';

type Transition = 'In' | 'Out' | 'InOut';

/**
 * Easings value type.
 */
export type Easings = `ease${Transition}${Curve}` | 'easeLinear' | 'easeStep';

/**
 * Easing function type.
 *
 * @param {number} x - range `[0, 1]`
 * @returns {number} range `[0, 1]`
 */
export type EasingFunction = (x: number) => number;
