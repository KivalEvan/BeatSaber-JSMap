import { fixFloat, fixString } from './helpers.ts';
import { IWrapInfo } from '../../types/beatmap/wrapper/info.ts';
import { EnvironmentRename } from '../../beatmap/shared/environment.ts';
import logger from '../../logger.ts';

function fixEnvironment(str: unknown): IWrapInfo['environmentName'] {
   if (typeof str === 'string') {
      if (str === 'Origins') return 'OriginsEnvironment';
      if (
         Object.keys(EnvironmentRename)
            .filter((env) => env !== 'GlassDesertEnvironment')
            .includes(str)
      ) {
         return str as IWrapInfo['environmentName'];
      }
   }
   return 'DefaultEnvironment';
}

export function info(data: IWrapInfo) {
   logger.tInfo(
      ['patch', 'dataCorrection', 'info'],
      'Verifying and correcting data type for beatmap info...',
   );

   data.version = fixString(data.version, '2.0.0');
   data.songName = fixString(data.songName, 'Unknown');
   data.songSubName = fixString(data.songSubName, 'Unknown');
   data.songAuthorName = fixString(data.songAuthorName, 'Unknown');
   data.levelAuthorName = fixString(data.levelAuthorName, 'Unknown');
   data.beatsPerMinute = fixFloat(data.beatsPerMinute, 120);
   data.shuffle = fixFloat(data.shuffle);
   data.shufflePeriod = fixFloat(data.shufflePeriod);
   data.previewStartTime = fixFloat(data.previewStartTime, 12);
   data.previewDuration = fixFloat(data.previewDuration, 10);
   data.songFilename = fixString(data.songFilename, 'song.ogg');
   data.coverImageFilename = fixString(data.coverImageFilename, 'cover.png');
   data.environmentName = fixEnvironment(data.environmentName);
   data.allDirectionsEnvironmentName = 'GlassDesertEnvironment';
   data.songTimeOffset = fixFloat(data.songTimeOffset, 0);
}
