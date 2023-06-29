import { fixBoolean, fixFloat, fixString } from './helpers.ts';
import { IWrapInfo } from '../../types/beatmap/wrapper/info.ts';
import { EnvironmentRename } from '../../beatmap/shared/environment.ts';
import { IColor } from '../../types/colors.ts';
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

function fixColorObject(val: unknown): Required<IColor> {
   if (typeof val === 'object' && !Array.isArray(val) && val) {
      return {
         r: fixFloat((val as IColor).r, 0),
         g: fixFloat((val as IColor).g, 0),
         b: fixFloat((val as IColor).b, 0),
         a: fixFloat((val as IColor).a, 1),
      };
   }
   return { r: 0, g: 0, b: 0, a: 1 };
}

export function info(data: IWrapInfo) {
   logger.tInfo(
      ['patch', 'dataCorrection', 'info'],
      'Verifying and correcting data type for beatmap info...',
   );

   data.version = fixString(data.version, '2.1.0');
   data.songName = fixString(data.songName, 'Unknown');
   data.songSubName = fixString(data.songSubName, 'Unknown');
   data.songAuthorName = fixString(data.songAuthorName, 'Unknown');
   data.levelAuthorName = fixString(data.levelAuthorName, 'Unknown');
   data.beatsPerMinute = fixFloat(data.beatsPerMinute, 120);
   data.songTimeOffset = fixFloat(data.songTimeOffset, 0);
   data.shuffle = fixFloat(data.shuffle);
   data.shufflePeriod = fixFloat(data.shufflePeriod);
   data.previewStartTime = fixFloat(data.previewStartTime, 12);
   data.previewDuration = fixFloat(data.previewDuration, 10);
   data.songFilename = fixString(data.songFilename, 'song.ogg');
   data.coverImageFilename = fixString(data.coverImageFilename, 'cover.png');
   data.environmentName = fixEnvironment(data.environmentName);
   data.allDirectionsEnvironmentName = 'GlassDesertEnvironment';
   if (Array.isArray(data.environmentNames)) {
      data.environmentNames.forEach((v) => fixEnvironment(v));
   } else data.environmentNames = [];
   if (Array.isArray(data.colorSchemes)) {
      data.colorSchemes.forEach((v) => {
         v.useOverride = fixBoolean(v.useOverride);
         v.colorScheme.name = fixString(v.colorScheme.name, 'Unknown');
         v.colorScheme.saberLeftColor = fixColorObject(v.colorScheme.saberLeftColor);
         v.colorScheme.saberRightColor = fixColorObject(v.colorScheme.saberRightColor);
         v.colorScheme.environment0Color = fixColorObject(v.colorScheme.environment0Color);
         v.colorScheme.environment1Color = fixColorObject(v.colorScheme.environment1Color);
         v.colorScheme.obstaclesColor = fixColorObject(v.colorScheme.obstaclesColor);
         v.colorScheme.environment0ColorBoost = fixColorObject(
            v.colorScheme.environment0ColorBoost,
         );
         v.colorScheme.environment1ColorBoost = fixColorObject(
            v.colorScheme.environment1ColorBoost,
         );
      });
   } else data.colorSchemes = [];
}
