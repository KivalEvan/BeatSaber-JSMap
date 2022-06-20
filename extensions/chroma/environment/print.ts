export function printChromaEnvironment(d: DifficultyData) {
    const envEnh = d.customData.environment ?? [];
    const uniqueID: string[] = [];
    let hasTrack = 0;
    for (const ce of envEnh) {
        if (!uniqueID.includes(ce.id)) {
            uniqueID.push(ce.id);
        }
        if (ce.track) {
            hasTrack++;
        }
    }
    console.log('Environment Enhancement\nTotal:', envEnh.length);
    console.log('Unique ID:', uniqueID.length);
    if (hasTrack) {
        console.log('Track Count:', hasTrack);
    }
}
