function light(
    cursor,
    notes,
    events,
    walls,
    _,
    global,
    data,
    customEvents,
    bpmChanges
) {
    const rotation = global.params[0];
    const step = global.params[1];
    const prop = global.params[2];
    const speed = global.params[3];
    const direction = Math.min(Math.floor(Math.abs(global.params[4])), 1);
    const counterSpin = global.params[5] > 0;
    const reset = global.params[6] > 0;
    const snapImmediately = global.params[7] > 0;
    const snapOffset = global.params[8];

    const customData = {
        _rotation: rotation,
        _step: step,
        _prop: prop,
        _speed: speed,
        _direction: direction,
    };
    if (counterSpin) {
        customData._counterSpin = counterSpin;
    }
    if (reset) {
        customData._reset = reset;
    }

    events.push({
        _time: cursor,
        _type: 8,
        _value: 0,
        _customData: customData,
    });

    if (snapImmediately && !reset) {
        const customDataSnap = {
            _step: step,
            _prop: 255,
            _speed: 255,
            _direction: direction,
        };
        if (counterSpin) {
            customDataSnap._counterSpin = counterSpin;
        }

        events.push({
            _time: cursor - snapOffset,
            _type: 8,
            _value: 0,
            _customData: customDataSnap,
        });
    }
}

module.exports = {
    name: 'Ring Spin Creator',
    params: {
        rotation: 90,
        step: 7.5,
        prop: 1,
        speed: 1,
        direction: -1,
        counterSpin: 0,
        reset: 0,
        snapImmediately: 0,
        snapOffset: 0.0625,
    },
    run: light,
};
