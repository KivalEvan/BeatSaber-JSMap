import logger from '../../logger.ts';
import type { IWrapAudio } from '../../types/beatmap/wrapper/audioData.ts';

function tag(name: string): string[] {
   return ['convert', 'toV4Audio', name];
}

export function toV4Audio(data: IWrapAudio, fromVersion: number): IWrapAudio {
   logger.tWarn(tag('main'), 'Converting to beatmap v4 may lose certain data!');

   switch (fromVersion) {
      case 1:
      case 2:
      case 3:
      case 4:
         break;
      default:
         logger.tWarn(
            tag('main'),
            'Unknown version: version not supported; misinput? Returning cloned original data.',
         );
   }

   return data;
}
