import { fixFloat, fixString } from './helpers.ts';
import { IInfo } from '../../types/beatmap/shared/info.ts';
import { EnvironmentRename } from '../../beatmap/shared/environment.ts';
import logger from '../../logger.ts';

function fixEnvironment(str: unknown): IInfo['_environmentName'] {
    if (typeof str === 'string') {
        if (str === 'Origins') return 'OriginsEnvironment';
        if (
            Object.keys(EnvironmentRename)
                .filter((env) => env !== 'GlassDesertEnvironment')
                .includes(str)
        ) {
            return str as IInfo['_environmentName'];
        }
    }
    return 'DefaultEnvironment';
}

export function info(data: IInfo) {
    logger.tInfo(
        ['patch', 'dataCorrection', 'info'],
        'Verifying and correcting data type for beatmap info...',
    );

    data._version = fixString(data._version, '2.0.0');
    data._songName = fixString(data._songName, 'Unknown');
    data._songSubName = fixString(data._songSubName, 'Unknown');
    data._songAuthorName = fixString(data._songAuthorName, 'Unknown');
    data._levelAuthorName = fixString(data._levelAuthorName, 'Unknown');
    data._beatsPerMinute = fixFloat(data._beatsPerMinute, 120);
    data._shuffle = fixFloat(data._shuffle);
    data._shufflePeriod = fixFloat(data._shufflePeriod);
    data._previewStartTime = fixFloat(data._previewStartTime, 12);
    data._previewDuration = fixFloat(data._previewDuration, 10);
    data._songFilename = fixString(data._songFilename, 'song.ogg');
    data._coverImageFilename = fixString(data._coverImageFilename, 'cover.png');
    data._environmentName = fixEnvironment(data._environmentName);
    data._allDirectionsEnvironmentName = 'GlassDesertEnvironment';
    data._songTimeOffset = fixFloat(data._songTimeOffset, 0);
}
