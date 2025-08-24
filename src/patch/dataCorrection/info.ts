import { is360Environment } from '../../beatmap/helpers/environment.ts';
import { EnvironmentRename } from '../../beatmap/misc/environment.ts';
import { logger } from '../../logger.ts';
import type { EnvironmentName } from '../../beatmap/schema/shared/types/environment.ts';
import type { IWrapInfo } from '../../beatmap/schema/wrapper/types/info.ts';
import type { IColor } from '../../types/colors.ts';
import { clamp } from '../../utils/math/helpers.ts';
import { fixBoolean, fixFloat, fixInt, fixString } from './helpers.ts';

function fixEnvironment(str: unknown, all = false): EnvironmentName {
   if (typeof str === 'string') {
      if (str === 'Origins') return 'OriginsEnvironment';
      if (
         Object.keys(EnvironmentRename)
            .filter((env) => all || !is360Environment(env as EnvironmentName))
            .includes(str)
      ) {
         return str as EnvironmentName;
      }
   }
   return 'DefaultEnvironment';
}

function fixColorObject(val: unknown, req?: boolean): IColor;
function fixColorObject(val: unknown, req: false): NonNullable<IColor>;
function fixColorObject(val: unknown, req: true): Required<IColor>;
function fixColorObject(val: unknown, req?: boolean) {
   if (typeof val === 'object' && !Array.isArray(val) && val) {
      if (req) {
         return {
            r: fixFloat((val as IColor).r, 0),
            g: fixFloat((val as IColor).g, 0),
            b: fixFloat((val as IColor).b, 0),
            a: fixFloat((val as IColor).a, 1),
         };
      } else {
         return {
            r: fixFloat((val as IColor).r, 0),
            g: fixFloat((val as IColor).g, 0),
            b: fixFloat((val as IColor).b, 0),
         };
      }
   }
   return req ? { r: 0, g: 0, b: 0, a: 1 } : { r: 0, g: 0, b: 0 };
}

/**
 * Verifies and corrects data type for beatmap info.
 */
export function info<T extends IWrapInfo>(data: T): void {
   logger.tInfo(
      ['patch', 'dataCorrection', 'info'],
      'Verifying and correcting data type for beatmap info...',
   );
   data.song.title = fixString(data.song.title, 'Unknown');
   data.song.subTitle = fixString(data.song.subTitle, 'Unknown');
   data.song.author = fixString(data.song.author, 'Unknown');
   data.audio.bpm = fixFloat(data.audio.bpm, 120);
   data.audio.audioOffset = fixFloat(data.audio.audioOffset, 0);
   data.audio.shuffle = fixFloat(data.audio.shuffle);
   data.audio.shufflePeriod = fixFloat(data.audio.shufflePeriod);
   data.audio.previewStartTime = fixFloat(data.audio.previewStartTime, 12);
   data.audio.previewDuration = fixFloat(data.audio.previewDuration, 10);
   data.audio.filename = fixString(data.audio.filename, 'song.ogg');
   data.coverImageFilename = fixString(data.coverImageFilename, 'cover.png');
   data.environmentNames = data.environmentNames.map((n) => fixEnvironment(n, true));
   if (Array.isArray(data.environmentNames)) {
      data.environmentNames = data.environmentNames
         .filter((v) => v)
         .map((v) => fixEnvironment(v, true));
   } else data.environmentNames = [];
   if (Array.isArray(data.colorSchemes)) {
      data.colorSchemes = data.colorSchemes
         .filter((v) => v)
         .map((v) => {
            v.overrideNotes = fixBoolean(v.overrideNotes);
            v.overrideLights = fixBoolean(v.overrideLights);
            v.name = fixString(v.name, 'Unknown');
            v.saberLeftColor = fixColorObject(v.saberLeftColor, true);
            v.saberRightColor = fixColorObject(v.saberRightColor, true);
            v.environment0Color = fixColorObject(v.environment0Color, true);
            v.environment1Color = fixColorObject(v.environment1Color, true);
            v.obstaclesColor = fixColorObject(v.obstaclesColor, true);
            v.environment0ColorBoost = fixColorObject(
               v.environment0ColorBoost,
               true,
            );
            v.environment1ColorBoost = fixColorObject(
               v.environment1ColorBoost,
               true,
            );
            return v;
         });
   } else data.colorSchemes = [];
   for (const d of data.difficulties) {
      d.colorSchemeId = clamp(
         fixInt(d.colorSchemeId, 0),
         0,
         data.environmentNames.length - 1,
      );
      d.environmentId = clamp(
         fixInt(d.environmentId, 0),
         0,
         data.colorSchemes.length - 1,
      );
      d.njs = fixFloat(d.njs, 0);
      d.njsOffset = fixFloat(d.njsOffset, 0);
   }
}
