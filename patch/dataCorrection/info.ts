import { fixFloat, fixString } from './helpers.ts';
import { IInfo } from '../../types/mod.ts';
import { EnvironmentRename } from '../../beatmap/shared/environment.ts';

function fixEnvironment(str: unknown): IInfo['_environmentName'] {
    if (
        typeof str === 'string' &&
        Object.keys(EnvironmentRename)
            .filter((env) => env !== 'GlassDesertEnvironment')
            .includes(str)
    ) {
        return str as IInfo['_environmentName'];
    } else {
        return 'DefaultEnvironment';
    }
}

export function patchInfo(data: IInfo) {
    data._songName = fixString(data._songName);
    data._songSubName = fixString(data._songSubName);
    data._songAuthorName = fixString(data._songAuthorName);
    data._levelAuthorName = fixString(data._levelAuthorName);
    data._beatsPerMinute = fixFloat(data._beatsPerMinute);
    data._shuffle = fixFloat(data._shuffle);
    data._shufflePeriod = fixFloat(data._shufflePeriod);
    data._previewStartTime = fixFloat(data._previewStartTime);
    data._previewDuration = fixFloat(data._previewDuration);
    data._songFilename = fixString(data._songFilename);
    data._coverImageFilename = fixString(data._coverImageFilename);
    data._environmentName = fixEnvironment(data._environmentName);
    data._allDirectionsEnvironmentName = 'GlassDesertEnvironment';
    data._songTimeOffset = fixFloat(data._songTimeOffset);
}
