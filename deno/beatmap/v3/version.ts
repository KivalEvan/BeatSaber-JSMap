export const CurrentVersion = '3.0.0';

export const compareVersion = (version: string) => {
    const verArray = getArray(version);
    const verLatest = getArray(CurrentVersion);
    for (const num in verArray) {
        if (verArray[num] < verLatest[num]) {
            return 'old';
        }
        if (verArray[num] > verLatest[num]) {
            return 'new';
        }
    }
    return 'current';
};

export const getArray = (version: string): number[] => {
    return version
        .replace('v', '')
        .split('.')
        .map((el) => parseInt(el));
};
