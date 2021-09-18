function check(cursor, notes, events, walls, _, global, data) {
    let zoomed = false;
    for (obj of events) {
        if (obj._time > cursor) {
            break;
        }
        if (obj._type !== 9) {
            continue;
        }
        zoomed = !zoomed;
    }
    alert(`Ring zoom is ${zoomed} at time ${Math.round(cursor * 100) / 100}`);
}

module.exports = {
    name: 'Check Ring Zoomed',
    params: {},
    run: check,
    errorCheck: false,
};
