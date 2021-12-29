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

export type Easings = `ease${Transition}${Curve}` | 'easeStep' | 'easeLinear';
export type EasingsExclude =
    | `ease${Transition}${'Sine' | 'Expo' | 'Circ' | 'Back' | 'Elastic' | 'Bounce'}`
    | 'easeStep';

// unfortunately, even if i wanted to include all easings algorithm from easings.net, license conflict may not allow it; they can however extend it
/**
 * Easings function methods, can define own function.
 *
 *     Call: method.name(number) => number
 *     Define: method.name = (x) => x
 */
export const method: {
    [easing in Exclude<Easings, EasingsExclude> | string]: (x: number) => number;
} = {
    easeLinear: (x) => x,
    easeInQuad: (x) => x * x,
    easeOutQuad: (x) => x * (2 - x),
    easeInOutQuad: (x) => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x),
    easeInCubic: (x) => x * x * x,
    easeOutCubic: (x) => --x * x * x + 1,
    easeInOutCubic: (x) =>
        x < 0.5 ? 4 * x * x * x : (x - 1) * (2 * x - 2) * (2 * x - 2) + 1,
    easeInQuart: (x) => x * x * x * x,
    easeOutQuart: (x) => 1 - --x * x * x * x,
    easeInOutQuart: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - 8 * --x * x * x * x),
    easeInQuint: (x) => x * x * x * x * x,
    easeOutQuint: (x) => 1 - --x * x * x * x * x,
    easeInOutQuint: (x) =>
        x < 0.5 ? 16 * x * x * x * x * x : 1 + 16 * --x * x * x * x * x,
};
