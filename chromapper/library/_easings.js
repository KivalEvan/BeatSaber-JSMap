// you can add your own easings here
// visit https://easings.net/ for more info
// you may need to understand built-in Math function
const func = {
    Linear: (x) => x,
    InQuad: (x) => x * x,
    OutQuad: (x) => x * (2 - x),
    InOutQuad: (x) => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x),
    InCubic: (x) => x * x * x,
    OutCubic: (x) => --x * x * x + 1,
    InOutCubic: (x) =>
        x < 0.5 ? 4 * x * x * x : (x - 1) * (2 * x - 2) * (2 * x - 2) + 1,
    InQuart: (x) => x * x * x * x,
    OutQuart: (x) => 1 - --x * x * x * x,
    InOutQuart: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - 8 * --x * x * x * x),
    InQuint: (x) => x * x * x * x * x,
    OutQuint: (x) => 1 - --x * x * x * x * x,
    InOutQuint: (x) =>
        x < 0.5 ? 16 * x * x * x * x * x : 1 + 16 * --x * x * x * x * x,
};

// less scary
const list = Object.keys(func);

const message = () => {
    alert('Easings Library v1');
    return;
};

module.exports = {
    name: 'Easings Library v1',
    params: {},
    run: message,
    errorCheck: false,
    func,
    list,
};
