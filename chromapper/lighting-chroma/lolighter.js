// this is a better alternative to lightmap but why would i port lolighter to CM?
// eh.. why should i not be allowed to and why do i care
// it's also fun to see things happening immediately within editor
// kinda complicated so i made it more complicated, no full comment here so check lolighter repository for documentation i guess
// original by Loloppe
function heresy(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const allowBackStrobe = global.params[0] > 0;
    const allowNeonStrobe = global.params[1] > 0;
    const allowSideStrobe = global.params[2] > 0;
    const allowFade = global.params[3] > 0;
    const allowSpinZoom = global.params[4] > 0;
    const nerfStrobes = global.params[5] > 0;
    const colorOffset = global.params[6];
    const colorSwap = global.params[7] > 0 ? global.params[7] : 4;

    // remove all existing events
    events.length = 0;

    // initialise variable
    let last;
    let time = new Array(4).fill(0);
    let light = new Array(3).fill(0);
    let lastLight = 0;
    let offset;
    let firstNote = 0;
    let timer = 0;
    let count;
    let maximum = 2;
    let color;
    let lastCut = 0;
    let currentSpeed = 3;
    let lastSpeed = 0;
    let nextDouble = 0;
    let firstSlider = false;
    let nextSlider = { _time: 0, _lineIndex: 0, _lineLayer: 0, _type: 0, _cutDirection: 0 };
    let sliderLight = [0, 1, 4];
    let sliderIndex = 0;
    let sliderNoteCount = 0;
    let wasSlider = false;
    let pattern = [0, 1, 2, 3, 4];
    let patternIndex = 0;
    let patternCount = 0;

    // cool function
    function resetTimer() {
        if (allowFade) {
            color = 3;
        } else {
            color = 1;
        }
        firstNote = notes[notes.findIndex((n) => n._type === 0 || n._type === 1)]._time;
        offset = firstNote;
        count = 0;
        for (let i = 0; i < 2; i++) {
            time[i] = 0;
            light[i] = 0;
        }
        time[2] = 0;
        time[3] = 0;
    }
    function timerDuration() {
        timer = time[0];
        if (timer >= colorOffset + colorSwap + offset) {
            let swapTime = parseInt((time[0] - time[1]) / colorSwap) + 1;
            for (let i = 0; i < swapTime; i++) {
                color = inverse(color);
                offset += colorSwap;
            }
        }
    }
    function createGenericLight(speed) {
        if (time[0] === time[1]) {
            if (count < maximum) {
                count++;
            }
        } else {
            count = 0;
            for (let i = 0; i < 2; i++) {
                if (light[i] !== 0 && time[0] - time[1] <= 2.5) {
                    // events.push({ _time: time[0] - (time[0] - time[1]) / 2), _type: light[i], _value: 0 });
                }
                light[i] = 0;
            }
        }

        if (count === maximum) {
            return;
        }

        if (light[0] !== 0) {
            light[1] = light[0];
        }

        if (lastLight === 2) {
            light[0] = 3;
        } else {
            light[0] = 2;
        }

        switch (light[0]) {
            case 2:
                events.push({ _time: time[0], _type: 2, _value: color });
                events.push({ _time: time[0], _type: 12, _value: speed });
                break;
            case 3:
                events.push({ _time: time[0], _type: 3, _value: color });
                events.push({ _time: time[0], _type: 13, _value: speed });
                break;
        }

        lastLight = light[0];
    }

    resetTimer();

    notes.forEach((note) => {
        let now = note._time;
        time[0] = now;

        if (now === firstNote && time[1] === 0 && allowSpinZoom) {
            events.push({ _time: now, _type: 8, _value: 0 });
            events.push({ _time: now, _type: 9, _value: 0 });
        } else if (now >= colorOffset + colorSwap + offset && now > firstNote && allowSpinZoom) {
            events.push({ _time: offset, _type: 8, _value: 0 });
            if (count === 0) {
                events.push({ _time: offset, _type: 9, _value: 0 });
                count = 1;
            } else {
                count--;
            }
        } else if (
            time[1] - time[2] === 0.25 &&
            time[3] === time[2] &&
            time[1] === now &&
            timer < offset &&
            allowSpinZoom
        ) {
            events.push({ _time: now, _type: 8, _value: 0 });
        }

        timerDuration();

        if (
            (now === time[1] || (now - time[1] <= 0.02 && time[1] !== time[2])) &&
            time[1] !== 0 &&
            now !== last
        ) {
            if (!nerfStrobes) {
                if (now - last >= 0.5) {
                    if (allowBackStrobe) {
                        events.push({ _time: now + 0.25, _type: 0, _value: 0 });
                    }
                    if (allowNeonStrobe) {
                        events.push({ _time: now + 0.25, _type: 1, _value: 0 });
                    }
                    if (allowSideStrobe) {
                        events.push({ _time: now + 0.25, _type: 4, _value: 0 });
                    }
                } else {
                    if (allowBackStrobe) {
                        events.push({ _time: now - (now - last), _type: 0, _value: 0 });
                    }
                    if (allowNeonStrobe) {
                        events.push({ _time: now - (now - last), _type: 1, _value: 0 });
                    }
                    if (allowSideStrobe) {
                        events.push({ _time: now - (now - last), _type: 4, _value: 0 });
                    }
                }
            }
            events.push({ _time: now, _type: 0, _value: color });
            events.push({ _time: now, _type: 1, _value: color });
            events.push({ _time: now, _type: 4, _value: color });

            last = now;
        }
        for (let i = 3; i > 0; i--) {
            time[i] = time[i - 1];
        }
    });

    if (nerfStrobes) {
        let lastTimeTop = 100;
        let lastTimeNeon = 100;
        let lastTimeSide = 100;

        events.forEach((event) => {
            if (event._type === 0) {
                if (event._time - lastTimeTop <= 1) {
                    event._value = swap(event._value);
                }
                lastTimeTop = event._time;
            }
            if (event._type === 1) {
                if (event._time - lastTimeNeon <= 1) {
                    event._value = swap(event._value);
                }
                lastTimeNeon = event._time;
            }
            if (event._type === 4) {
                if (event._time - lastTimeSide <= 1) {
                    event._value = swap(event._value);
                }
                lastTimeSide = event._time;
            }
        });
    }

    resetTimer();

    for (let j = 1; j < 3; j++) {
        for (let i = notes.findIndex((n) => n === notes[j]); i < notes.length - 1; i++) {
            if (
                notes[i]._time - notes[i - 1]._time <= 0.125 &&
                notes[i]._time - notes[i - 1]._time > 0 &&
                (notes[i]._cutDirection === notes[i - 1]._cutDirection ||
                    notes[i]._cutDirection === 8)
            ) {
                if (sliderNoteCount === 0) {
                    nextSlider = notes[i - 1];
                }
                sliderNoteCount++;
            } else if (sliderNoteCount !== 0) {
                firstSlider = true;
                break;
            }
        }
    }

    if (firstSlider) {
        if (sliderIndex === -1) {
            let old = sliderLight[sliderIndex + 1];

            shuffle(sliderLight);
            if (sliderLight[2] === old) {
                sliderLight[2] = sliderLight[0];
                sliderLight[0] = old;
            }

            sliderIndex = 2;
        }

        if (allowFade) {
            events.push({
                _time: notes[0]._time,
                _type: sliderLight[sliderIndex],
                _value: color - 2,
            });
            events.push({
                _time: notes[0]._time + 0.125,
                _type: sliderLight[sliderIndex],
                _value: color - 1,
            });
            events.push({
                _time: notes[0]._time + 0.25,
                _type: sliderLight[sliderIndex],
                _value: color - 2,
            });
            events.push({
                _time: notes[0]._time + 0.375,
                _type: sliderLight[sliderIndex],
                _value: color - 1,
            });
        } else {
            events.push({ _time: notes[0]._time, _type: sliderLight[sliderIndex], _value: color });
            events.push({
                _time: notes[0]._time + 0.125,
                _type: sliderLight[sliderIndex],
                _value: color + 1,
            });
            events.push({
                _time: notes[0]._time + 0.25,
                _type: sliderLight[sliderIndex],
                _value: color,
            });
            events.push({
                _time: notes[0]._time + 0.375,
                _type: sliderLight[sliderIndex],
                _value: color + 1,
            });
        }

        events.push({ _time: notes[0]._time + 0.5, _type: sliderLight[sliderIndex], _value: 0 });

        sliderIndex--;

        if (allowSpinZoom) {
            events.push({ _time: notes[0]._time, _type: 8, _value: 0 });
            for (let i = 0; i < 8; i++) {
                events.push({ _time: notes[0]._time + 0.5 - (0.5 / 8) * i, _type: 8, _value: 0 });
            }
        }
    }
    for (const note of notes) {
        time[0] = note._time;

        timerDuration();

        if (wasSlider) {
            if (sliderNoteCount !== 0) {
                sliderNoteCount--;
                lastCut = note._cutDirection;

                for (let i = 3; i > 0; i--) {
                    time[i] = time[i - 1];
                }
                continue;
            } else {
                wasSlider = false;
            }
        }

        if (time[2] === 0) {
            if (time[1] === 0) {
                time[1] = time[0];
                continue;
            } else {
                if (!firstSlider) {
                    events.push({ _time: time[0], _type: 3, _value: color });
                    events.push({ _time: 0, _type: 13, _value: 1 });
                    events.push({ _time: time[1], _type: 2, _value: color });
                    events.push({ _time: 0, _type: 12, _value: 1 });
                }
                time[2] = time[1];
                time[1] = time[0];
                continue;
            }
        }

        if (firstSlider) {
            firstSlider = false;
            continue;
        }

        if (time[0] >= nextDouble) {
            for (let i = notes.findIndex((n) => n === note); i < notes.length - 1; i++) {
                if (notes[i]._time === notes[i - 1]._time) {
                    nextDouble = notes[i]._time;
                    break;
                }
            }
        }

        if (time[0] >= nextSlider._time) {
            sliderNoteCount = 0;

            for (let i = notes.findIndex((n) => n === note); i < notes.length - 1; i++) {
                if (
                    notes[i]._time - notes[i - 1]._time <= 0.125 &&
                    notes[i]._time - notes[i - 1]._time > 0 &&
                    (notes[i]._cutDirection === notes[i - 1]._cutDirection ||
                        notes[i]._cutDirection === 8)
                ) {
                    if (sliderNoteCount === 0) {
                        nextSlider = notes[i - 1];
                    }
                    sliderNoteCount++;
                } else if (sliderNoteCount !== 0) {
                    break;
                }
            }
        }

        if (nextSlider === note) {
            if (sliderIndex === -1) {
                let old = sliderLight[sliderIndex + 1];

                shuffle(sliderLight);
                if (sliderLight[2] === old) {
                    sliderLight[2] = sliderLight[0];
                    sliderLight[0] = old;
                }

                sliderIndex = 2;
            }

            if (allowFade) {
                events.push({
                    _time: time[0],
                    _type: sliderLight[sliderIndex],
                    _value: color - 2,
                });
                events.push({
                    _time: time[0] + 0.125,
                    _type: sliderLight[sliderIndex],
                    _value: color - 1,
                });
                events.push({
                    _time: time[0] + 0.25,
                    _type: sliderLight[sliderIndex],
                    _value: color - 2,
                });
                events.push({
                    _time: time[0] + 0.375,
                    _type: sliderLight[sliderIndex],
                    _value: color - 1,
                });
            } else {
                events.push({
                    _time: time[0],
                    _type: sliderLight[sliderIndex],
                    _value: color,
                });
                events.push({
                    _time: time[0] + 0.125,
                    _type: sliderLight[sliderIndex],
                    _value: color + 1,
                });
                events.push({
                    _time: time[0] + 0.25,
                    _type: sliderLight[sliderIndex],
                    _value: color,
                });
                events.push({
                    _time: time[0] + 0.375,
                    _type: sliderLight[sliderIndex],
                    _value: color + 1,
                });
            }
            events.push({
                _time: time[0] + 0.5,
                _type: sliderLight[sliderIndex],
                _value: 0,
            });

            sliderIndex--;

            if (allowSpinZoom) {
                events.push({
                    _time: time[0],
                    _type: 8,
                    _value: 0,
                });
                for (let i = 0; i < 8; i++) {
                    events.push({
                        _time: time[0] + 0.5 - (0.5 / 8) * i,
                        _type: 8,
                        _value: 0,
                    });
                }
            }
            wasSlider = true;
        } else if (time[0] !== nextDouble) {
            if (
                time[0] - time[1] >= lastSpeed + 0.02 ||
                time[0] - time[1] <= lastSpeed - 0.02 ||
                patternCount === 20
            ) {
                let old = 0;
                if (patternIndex !== 0) {
                    old = pattern[patternIndex - 1];
                } else {
                    old = pattern[4];
                }

                shuffle(pattern);
                if (pattern[0] === old) {
                    pattern[0] = pattern[1];
                    pattern[1] = old;
                }

                patternIndex = 0;
                patternCount = 0;
            }

            events.push({
                _time: time[0],
                _type: pattern[patternIndex],
                _value: color,
            });

            if (time[0] - time[1] < 0.25) {
                currentSpeed = 7;
            } else if (time[0] - time[1] >= 0.25 && time[0] - time[1] < 0.5) {
                currentSpeed = 5;
            } else if (time[0] - time[1] >= 0.5 && time[0] - time[1] < 1) {
                currentSpeed = 3;
            } else {
                currentSpeed = 1;
            }

            if (pattern[patternIndex] === 2) {
                events.push({
                    _time: time[0],
                    _type: 12,
                    _value: currentSpeed,
                });
            } else if (pattern[patternIndex] === 3) {
                events.push({
                    _time: time[0],
                    _type: 13,
                    _value: currentSpeed,
                });
            }

            if (notes[notes.length - 1] !== note) {
                if (notes[notes.findIndex((n) => n === note) + 1]._time === nextDouble) {
                    if (notes[notes.findIndex((n) => n === note) + 1]._time - time[0] <= 2) {
                        let value =
                            (notes[notes.findIndex((n) => n === note) + 1]._time -
                                notes[notes.findIndex((n) => n === note)]._time) /
                            2;
                        events.push({
                            _time: notes[notes.findIndex((n) => n === note)]._time + value,
                            _type: pattern[patternIndex],
                            _value: 0,
                        });
                    }
                } else {
                    events.push({
                        _time: notes[notes.findIndex((n) => n === note) + 1]._time,
                        _type: pattern[patternIndex],
                        _value: 0,
                    });
                }
            }

            if (patternIndex < 4) {
                patternIndex++;
            } else {
                patternIndex = 0;
            }

            patternCount++;
            lastSpeed = time[0] - time[1];
        } else if (time[0] - time[1] < 0.25) {
            if (
                time[0] !== last &&
                time[0] !== time[1] &&
                note._type !== 3 &&
                note._cutDirection !== 8 &&
                note._cutDirection !== lastCut &&
                allowSpinZoom &&
                !nerfStrobes
            ) {
                last = time[0];
                events.push({
                    _time: time[0],
                    _type: 8,
                    _value: 0,
                });
                for (let i = 0; i < 8; i++) {
                    events.push({
                        _time: time[0] - ((time[0] - time[1]) / 8) * i,
                        _type: 8,
                        _value: 0,
                    });
                }
            }

            if (time[0] === time[1]) {
                createGenericLight(currentSpeed);
            } else {
                createGenericLight((currentSpeed = 7));
            }
        } else if (time[0] - time[1] >= 0.25 && time[0] - time[1] < 0.5) {
            createGenericLight((currentSpeed = 5));
        } else if (time[0] - time[1] >= 0.5 && time[0] - time[1] < 1) {
            createGenericLight((currentSpeed = 3));
        } else if (time[0] - time[1] >= 1) {
            createGenericLight((currentSpeed = 1));
        }

        lastCut = note._cutDirection;
        for (let i = 3; i > 0; i--) {
            time[i] = time[i - 1];
        }
    }
    // this commented part is to remove dupe/event inside event, they are very slow of course
    // remove /* if you want to enable this feature
    /*
    for (let i = 1; i < events.length - 1; i++) {
        if (
            events.some(
                (ev) =>
                    ev._time === events[i]._time && ev._type === events[i]._type && ev !== events[i]
            )
        ) {
            if (events[i]._value === 0 || events[i]._value === 4) {
                events.splice(i, 1);
                i--;
            }
        }
    } // */
}

function inverse(temp) {
    if (temp > 3) {
        return temp - 4;
    } else {
        return temp + 4;
    }
}
function swap(temp) {
    if (temp === 3) {
        return 1;
    }
    if (temp === 7) {
        return 5;
    }
    if (temp === 1) {
        return 3;
    }
    if (temp === 5) {
        return 7;
    }
    return 0;
}
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

module.exports = {
    name: 'Lolighter',
    params: {
        BackStrobe: 1,
        NeonStrobe: 1,
        SideStrobe: 1,
        'Allow Fade': 1,
        'Spin Zoom': 1,
        'Nerf Strobes': 0,
        'Offset (beat)': 0,
        'Speed (beat)': 4,
    },
    run: heresy,
};
