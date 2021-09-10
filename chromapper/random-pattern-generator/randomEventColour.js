function rainbow(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const minValue = global.params[0];
    const maxValue = global.params[1];
    const multiplier = global.params[2];
    const doAlpha = global.params[3] > 0;
    events.forEach((ev) => {
        if (ev._type >= 0 && ev._type <= 4 && ev._value !== 0 && ev._value !== 4) {
            const r = Math.max(minValue, Math.min(Math.random() * multiplier, maxValue));
            const g = Math.max(minValue, Math.min(Math.random() * multiplier, maxValue));
            const b = Math.max(minValue, Math.min(Math.random() * multiplier, maxValue));
            const a = doAlpha
                ? Math.max(minValue, Math.min(Math.random() * multiplier, maxValue))
                : 1;
            ev['_customData'] = { _color: [r, g, b, a] };
        }
    });
}

module.exports = {
    name: 'Random Event Colour',
    params: { 'Min Value': 0.25, 'Max Value': 1, Multiplier: 1, 'Rand Alpha': 0 },
    run: rainbow,
};
