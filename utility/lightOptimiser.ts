import * as bsmap from '../deno/mod.ts';

export default (
    d: bsmap.v2.DifficultyData,
    environment: bsmap.types.EnvironmentAllName
) => {
    // you can modify these variable as you prefer
    // uses beat time instead of real time
    const eventStackTol = 0.001;
    const ringStackTol = 0.05; // 1/20 precision

    // beyond you're on your own
    let events = d.events;

    // constant variable, best to not touch unless you know what you're doing
    // light value for static event such as OFF and ON event
    const maxLightID = 127; // highest existing lightID
    const lightStatic = [0, 1, 5];
    const lightEvent = [0, 1, 2, 3, 4, 6, 7];

    const convertLightID = false;
    const reduceRingStack = false;
    const reduceLightId = true;

    const matchColor = (
        c1: bsmap.types.ColorArray | null,
        c2: bsmap.types.ColorArray | null
    ) => {
        if (c1 == null || c2 == null) {
            return false;
        }
        if (c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2]) {
            if (
                (c1.length > 3 && c2.length > 3 && c1[3] !== c2[3]) ||
                (c1.length === 3 && c2.length > 3 && c2[3] !== 1) ||
                (c1.length > 3 && c2.length === 3 && c1[3] !== 1)
            ) {
                return false;
            }
            return true;
        }
        return false;
    };

    const matchLightID = (
        ev: bsmap.v2.Event,
        lightIDList: {
            [key: number]: { value: number; color: bsmap.types.ColorArray | null };
        }
    ) => {
        if (Array.isArray(ev.customData?._lightID)) {
            for (const id of ev.customData!._lightID) {
                if (
                    lightIDList[id].value !== ev.value ||
                    !matchColor(lightIDList[id].color, ev.customData?._color)
                ) {
                    return false;
                }
            }
        }
        if (!isNaN(ev.customData?._lightID)) {
            if (
                lightIDList[ev.customData?._lightID].value !== ev.value ||
                !matchColor(
                    lightIDList[ev.customData?._lightID].color,
                    ev.customData?._color
                )
            ) {
                return false;
            }
        }
        return true;
    };

    console.log(`Initiating light optimisation script`);

    const prevEvent: { [key: number]: bsmap.v2.Event } = {};
    for (
        let i = bsmap.EventList[environment][0].sort((a, b) => a - b).at(-1)!;
        i >= 0;
        i--
    ) {
        prevEvent[i] = bsmap.v2.Event.create();
    }

    // not to be confused as above, this keep index of any same type event at same time
    const eventAtTime: { [key: number]: number[] } = {};
    for (
        let i = bsmap.EventList[environment][0].sort((a, b) => a - b).at(-1)!;
        i >= 0;
        i--
    ) {
        eventAtTime[i] = [];
    }

    // this stores lightID
    const eventLightID: {
        [key: number]: {
            [key: number]: { value: number; color: bsmap.types.ColorArray | null };
        };
    } = {};
    for (let i = 0; i < lightEvent.length; i++) {
        eventLightID[lightEvent[i]] = {};
        for (let j = maxLightID; j >= 0; j--) {
            eventLightID[lightEvent[i]][j] = { value: 0, color: null };
        }
    }

    const ringID: { [key: number]: number[] } = {};
    for (let i = 0; i < 31; i++) {
        ringID[i] = [1, 2].map((el) => el + i * 2);
    }

    for (let i = 0, len = events.length; i < len; i++) {
        if (events[i].type !== 1) {
            continue;
        }
        if (typeof events[i].customData?._propID === 'number') {
            events[i].customData!._lightID = ringID[events[i].customData!._propID];
            delete events[i].customData?._propID;
        }
    }

    let countRedundant = 0;
    let countChroma = 0;
    let flagRemove = false;
    let flagChroma = false;
    let evType = 0;
    for (let i = 0, len = events.length; i < len; i++) {
        flagRemove = false;
        flagChroma = false;
        evType = events[i].type;

        // skip old chroma event
        if (events[i].value > 2000000000) {
            continue;
        }

        // LIGHTING EVENT
        if ((evType >= 0 && evType <= 4) || evType === 6 || evType === 7) {
            // convert value 4 to standard 0 as off event
            if (events[i].value === 4) {
                events[i].value = 0;
            }

            // for current event that does not have customData
            if (typeof events[i].customData === undefined) {
                if (events[i].time - prevEvent[evType].time < eventStackTol) {
                    flagRemove = true;
                }
                if (
                    lightStatic.includes(events[i].value) &&
                    events[i].value === prevEvent[evType].value
                ) {
                    // check if previous event had no customData
                    if (prevEvent[evType].customData == null) {
                        flagRemove = true;
                    }
                }
                // do funny for lightID
                if (!flagRemove) {
                    for (let j = maxLightID; j >= 0; j--) {
                        eventLightID[evType][j] = {
                            value: events[i].value,
                            color: null,
                        };
                    }
                }
            }

            // Chroma customData is tricky
            if (events[i].customData) {
                // god help me
                // optimise lightID
                if (events[i].customData?._lightID) {
                    // yeet the redundant lightID event
                    if (
                        reduceLightId &&
                        matchLightID(events[i], eventLightID[evType])
                    ) {
                        flagRemove = true;
                    }
                    if (!flagRemove && Array.isArray(events[i].customData!._lightID)) {
                        events[i].customData!._lightID.forEach((id: number) => {
                            eventLightID[evType][id].value = events[i].value;
                            eventLightID[evType][id].color =
                                events[i].customData?._color || null;
                        });
                    }
                    if (!flagRemove && !isNaN(events[i].customData?._lightID)) {
                        eventLightID[evType][events[i].customData?._lightID].value =
                            events[i].value;
                        eventLightID[evType][events[i].customData?._lightID].color =
                            events[i].customData?._color || null;
                    }
                }
                for (let j = 0; j < eventAtTime[evType].length; j++) {
                    let lookupIndex = eventAtTime[evType][j];
                    if (
                        events[i].time - events[lookupIndex].time < eventStackTol &&
                        events[i].customData?._lightID &&
                        events[lookupIndex].customData &&
                        events[lookupIndex].customData?._lightID
                    ) {
                        // merge into one event
                        // honestly what the fuck?
                        if (
                            (matchColor(
                                events[i].customData?._color,
                                events[lookupIndex].customData?._color
                            ) &&
                                events[i].value === events[lookupIndex].value) ||
                            (events[i].value === events[lookupIndex].value &&
                                events[i].customData?._color == null &&
                                events[lookupIndex].customData?._color == null)
                        ) {
                            let temp;
                            if (Array.isArray(events[i].customData?._lightID)) {
                                temp = events[i].customData?._lightID;
                            }
                            if (!isNaN(events[i].customData?._lightID)) {
                                temp = [events[i].customData?._lightID];
                            }

                            // insert temp into eventAtTime
                            if (
                                Array.isArray(events[lookupIndex].customData?._lightID)
                            ) {
                                events[lookupIndex].customData!._lightID =
                                    events[lookupIndex].customData?._lightID.concat(
                                        temp
                                    );
                            }
                            if (!isNaN(events[lookupIndex].customData?._lightID)) {
                                events[lookupIndex].customData!._lightID = [
                                    events[lookupIndex].customData?._lightID,
                                ].concat(temp);
                            }

                            // sort the lightID
                            events[lookupIndex].customData?._lightID.sort(
                                (a: number, b: number) => a - b
                            );

                            // console.log(
                            //     `Merging event ${
                            //         Math.round(events[i].time * 1000) / 1000
                            //     } type ${evType} ${
                            //         events[i].customData?._color
                            //             ? `colour [${events[i].customData?._color.join()}]`
                            //             : `value ${events[i].value}`
                            //     }: ${
                            //         Array.isArray(events[i].customData?._lightID)
                            //             ? `[${events[i].customData?._lightID.join()}]`
                            //             : events[i].customData?._lightID
                            //     } => [${events[lookupIndex].customData?._lightID.join()}]`
                            // );
                            flagChroma = true;
                            break;
                        }
                    }
                }

                // remove redundancy
                if (
                    events[i].customData?._color &&
                    !events[i].customData?._lightID &&
                    !events[i].customData?._propID
                ) {
                    if (
                        lightStatic.includes(events[i].value) &&
                        prevEvent[evType].customData &&
                        prevEvent[evType].customData?._lightID == null &&
                        prevEvent[evType].customData?._propID == null &&
                        events[i].value === prevEvent[evType].value &&
                        matchColor(
                            events[i].customData?._color,
                            prevEvent[evType].customData?._color
                        )
                    ) {
                        flagRemove = true;
                    }
                    if (!flagRemove) {
                        for (let j = maxLightID; j >= 0; j--) {
                            eventLightID[evType][j] = {
                                value: events[i].value,
                                color: events[i].customData?._color,
                            };
                        }
                    }
                }
            }
        }

        // LIGHT BOOST EVENT
        if (evType === 5) {
            if (events[i].time - prevEvent[evType].time < eventStackTol) {
                flagRemove = true;
            }
            if (events[i].value === prevEvent[evType].value) {
                flagRemove = true;
            }
        }

        // RING EVENT
        if (evType === 8) {
            if (events[i].time - prevEvent[evType].time < eventStackTol) {
                flagRemove = true;
            }
            if (
                reduceRingStack &&
                events[i].customData == null &&
                events[i].time - prevEvent[evType].time < ringStackTol
            ) {
                flagRemove = true;
            }
            // convert the value to 0 regardless as there is no difference
            events[i].value = 0;
        }
        if (evType === 9) {
            events[i].value = 0;
        }

        // LASER ROTATION EVENT
        if (evType === 12 || evType === 13) {
            if (
                events[i].customData == null &&
                events[i].time - prevEvent[evType].time < eventStackTol
            ) {
                flagRemove = true;
            }
            if (
                events[i].customData == null &&
                events[i].value === 0 &&
                prevEvent[evType].value === 0
            ) {
                flagRemove = true;
            }
        }

        // REMOVE EVENT
        if (flagRemove) {
            // console.log(
            //     `${i} iteration: Removing event ${
            //         Math.round(events[i].time * 1000) / 1000
            //     } type ${evType} value ${events[i].value}${
            //         events[i].customData ? ` customData ${events[i].customData}` : ''
            //     }`
            // );
            delete events[i];
            countRedundant++;
            continue; // continue before save to prevent null
        }
        if (flagChroma) {
            delete events[i];
            countChroma++;
            continue;
        }

        // SAVE PREVIOUS EVENT & ITERATION INDEX
        prevEvent[evType] = events[i];
        for (let j = 0; j < eventAtTime[evType].length; j++) {
            if (events[i].time - events[eventAtTime[evType][j]].time >= eventStackTol) {
                eventAtTime[evType].splice(j, 1);
                j--;
            }
        }
        eventAtTime[evType].push(i);
    }

    d.events = d.events.filter((el) => typeof el != null);

    // do the funny message
    let message = `Light Optimiser`;
    if (!countRedundant && !countChroma) {
        message += `\nNo optimisation initiated`;
    }
    if (countRedundant) {
        message += `\nRemoved ${countRedundant} redundant event(s)`;
    }
    if (countChroma) {
        message += `\nOptimised ${countChroma} Chroma event(s)`;
    }
};
