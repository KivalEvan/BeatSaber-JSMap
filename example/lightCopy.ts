/* Copy lightshow from specific difficulty file to all within Info.dat.
 * This includes both v2 and v3 beatmap, and can be made compatible given constraint.
 * Command-line flag:
 * -d | --directory : map folder directory
 * -f | --force : force copy to same file
 * -e | --environment : copy environment enhancement
 * -c | --event : copy custom event (does not copy track from any objects)
 * -m | --merge : merge instead of overriding the event property
 * -q | --quite : reduced log output (overridden by verbose)
 * -v | --verbose : enable debug log output
 * -x | --no-backup : disable backup
 * -y | --no-prompt : auto-complete prompt
 * example run command:
 * deno run --allow-read --allow-write lightCopy.ts -d "./Folder/Path" SourceLightshow.dat
 */
import {
   convert,
   globals,
   isV3,
   load,
   logger,
   parse as beatmapParser,
   save,
   types,
   v2,
   v3,
} from '../mod.ts';
import { parse } from 'https://deno.land/std@0.192.0/flags/mod.ts';
import { copySync } from 'https://deno.land/std@0.192.0/fs/mod.ts';

const args = parse(Deno.args, {
   string: ['d'],
   boolean: ['e', 'f', 'm', 'v', 'q', 'x', 'y'],
   alias: {
      d: 'directory',
      e: 'environment',
      c: 'event',
      f: 'force',
      m: 'merge',
      q: 'quite',
      v: 'verbose',
      x: 'no-backup',
      y: 'no-prompt',
   },
});

logger.info('Beat Saber beatmap light copy build 1');
logger.info(
   'Source code available at https://github.com/KivalEvan/BeatSaber-Deno/blob/main/example/lightCopy.ts',
);
logger.info('Send any feedback to Kival Evan#5480 on Discord');

if (args.x) {
   logger.warn('No backup flagged, any changes done by this script is irreversible');
}

globals.directory = (args.d as string) ??
   (args.y
      ? './'
      : prompt('Enter map folder path (leave blank for current folder):')?.trim() || './');

if (args.q) {
   logger.setLevel(4);
}

if (args.v) {
   logger.setLevel(1);
}

let copyEnvironment = args.e ?? false;
let copyCustomEvent = args.c ?? false;
let hasChroma = false;

try {
   if (!args._[0]) {
      logger.warn('Unspecified source lightshow file to copy light.');
   }

   if (typeof args._[0] === 'number') {
      logger.error('Number is not acceptable value for source file path.');
   }

   const lightToCopy = typeof args._[0] === 'string'
      ? args._[0]
      : prompt('Enter source lightshow file name (must include extension):')?.trim();

   if (!lightToCopy) {
      throw new Error('Received empty file path.');
   }

   let info: types.wrapper.IWrapInfo;
   let infoFileName = 'Info.dat';
   try {
      info = load.infoSync();
   } catch {
      logger.warn('Could not load Info.dat from folder, retrying with info.dat...');
      infoFileName = 'info.dat';
      info = load.infoSync(null, { filePath: infoFileName });
   }

   const diffJSON = JSON.parse(
      Deno.readTextFileSync(globals.directory + lightToCopy),
   ) as types.Either<types.v2.IDifficulty, types.v3.IDifficulty>;
   const diffVersion = parseInt(
      diffJSON._version?.at(0)! ?? parseInt(diffJSON.version?.at(0)! ?? '2'),
   );

   let V3light!: v3.Difficulty, V2light!: v2.Difficulty;
   if (diffVersion === 3) {
      V3light = beatmapParser
         .v3Difficulty(diffJSON as types.v3.IDifficulty)
         .setFileName(lightToCopy);
   } else {
      V2light = beatmapParser
         .v2Difficulty(diffJSON as types.v2.IDifficulty)
         .setFileName(lightToCopy);
      if (V2light.basicEvents.some((e) => e.isOldChroma())) {
         const confirmation = args.y ? 'n' : prompt(
            'Old Chroma detected, do you want to convert this (apply to all)? (y/N):',
            'n',
         );
         if (confirmation![0].toLowerCase() === 'y') {
            convert.ogChromaToV2Chroma(V2light, info.environmentName);
         }
      }
      if (V2light.basicEvents.some((e) => e.customData._lightGradient)) {
         const confirmation = args.y ? 'n' : prompt(
            'Chroma light gradient detected, do you want to convert this (apply to all)? (y/N):',
            'n',
         );
         if (confirmation![0].toLowerCase() === 'y') {
            convert.chromaLightGradientToVanillaGradient(V2light);
         }
      }
   }
   if (V3light! && !V2light!) {
      V2light = convert.toV2Beatmap(V3light);
   }
   if (V2light! && !V3light!) {
      V3light = convert.toV3Beatmap(V2light);
   }

   if (
      V2light.basicEvents.some((ev) => ev.isChroma()) ||
      V3light.basicEvents.some((ev) => ev.isChroma())
   ) {
      hasChroma = true;
   }

   if (copyEnvironment && !V3light.customData.environment && !V2light.customData._environment) {
      logger.warn('Selected lightshow has no environment enhancement; skipping environment copy');
      copyEnvironment = false;
   }

   if (copyCustomEvent && !V3light.customData.customEvents && !V2light.customData._customEvents) {
      logger.warn('Selected lightshow has no custom event; skipping custom event copy');
      copyCustomEvent = false;
   }

   if (!copyEnvironment && V3light.customData.environment && V2light.customData._environment) {
      copyEnvironment = (args.y ? 'n' : prompt(
         'Environment enhancement found in lightshow, would you like to include into copy? (y/N)',
         'n',
      )
         ?.trim()
         .toLowerCase()) === 'y';
   }
   if (!copyCustomEvent && V3light.customData.customEvents && V2light.customData._customEvents) {
      copyCustomEvent = (args.y ? 'n' : prompt(
         'Custom event found in lightshow, would you like to include into copy? (y/N)',
         'n',
      )
         ?.trim()
         .toLowerCase()) === 'y';
   }

   const diffList = load.difficultyFromInfoSync(info);

   let hasCopied = false;
   diffList.forEach((dl) => {
      if (!args.f && lightToCopy === dl.settings.filename) {
         return;
      }

      if (!args.x) {
         logger.info('Backing up beatmap', dl.characteristic, dl.difficulty);
         try {
            copySync(
               globals.directory + dl.settings.filename,
               globals.directory + dl.settings.filename + '.old',
            );
         } catch (_) {
            const confirmation = args.y
               ? 'n'
               : prompt('Old backup file detected, do you want to overwrite? (y/N):', 'n');
            if (confirmation![0].toLowerCase() === 'y') {
               copySync(
                  globals.directory + dl.settings.filename,
                  globals.directory + dl.settings.filename + '.old',
                  { overwrite: true },
               );
            } else {
               logger.info('Skipping overwrite...');
               return;
            }
         }
      }
      logger.info('Copying lightshow to', dl.characteristic, dl.difficulty);
      if (hasChroma) {
         if (
            dl.settings.customData._suggestions &&
            !dl.settings.customData._requirements?.includes('Chroma')
         ) {
            if (!dl.settings.customData._suggestions.includes('Chroma')) {
               logger.info('Applying Chroma suggestions to', dl.characteristic, dl.difficulty);
               dl.settings.customData._suggestions.push('Chroma');
            }
         } else if (!dl.settings.customData._requirements?.includes('Chroma')) {
            logger.info('Creating Chroma suggestions to', dl.characteristic, dl.difficulty);
            dl.settings.customData._suggestions = ['Chroma'];
         }
      }
      if (isV3(dl.data)) {
         if (copyEnvironment) {
            dl.data.customData.environment = V3light.customData.environment;
         }
         if (copyCustomEvent && V3light.customData.customEvents) {
            if (dl.data.customData.customEvents) {
               dl.data.customData.customEvents.push(...V3light.customData.customEvents);
            } else {
               dl.data.customData.customEvents = V3light.customData.customEvents;
            }
            if (V3light.customData.pointDefinitions) {
               if (dl.data.customData.pointDefinitions) {
                  dl.data.customData.pointDefinitions = {
                     ...dl.data.customData.pointDefinitions,
                     ...V3light.customData.pointDefinitions,
                  };
               } else {
                  dl.data.customData.pointDefinitions = V3light.customData.pointDefinitions;
               }
            }
         }
         if (args.m) {
            dl.data.basicEvents.push(...V3light.basicEvents);
            dl.data.colorBoostEvents.push(...V3light.colorBoostEvents);
            dl.data.lightColorEventBoxGroups.push(...V3light.lightColorEventBoxGroups);
            dl.data.lightRotationEventBoxGroups.push(...V3light.lightRotationEventBoxGroups);
            dl.data.lightTranslationEventBoxGroups.push(...V3light.lightTranslationEventBoxGroups);
         } else {
            dl.data.basicEvents = V3light.basicEvents;
            dl.data.colorBoostEvents = V3light.colorBoostEvents;
            dl.data.lightColorEventBoxGroups = V3light.lightColorEventBoxGroups;
            dl.data.lightRotationEventBoxGroups = V3light.lightRotationEventBoxGroups;
            dl.data.lightTranslationEventBoxGroups = V3light.lightTranslationEventBoxGroups;
         }
      } else {
         if (copyEnvironment) {
            dl.data.customData._environment = V2light.customData._environment;
         }
         if (copyCustomEvent && V2light.customData._customEvents) {
            if (dl.data.customData._customEvents) {
               dl.data.customData._customEvents.push(...V2light.customData._customEvents);
            } else {
               dl.data.customData._customEvents = V2light.customData._customEvents;
            }
            if (V2light.customData._pointDefinitions) {
               if (dl.data.customData._pointDefinitions) {
                  dl.data.customData._pointDefinitions.push(
                     ...V2light.customData._pointDefinitions,
                  );
               } else {
                  dl.data.customData._pointDefinitions = V2light.customData._pointDefinitions;
               }
            }
         }
         if (args.m) {
            dl.data.addBasicEvents(...V2light.basicEvents);
         } else {
            const rotationEvent = dl.data.basicEvents
               .map((ev) => ev)
               .filter((ev) => ev.isLaneRotationEvent());
            dl.data.basicEvents = [];
            dl.data.addBasicEvents(...V2light.basicEvents, ...rotationEvent);
         }
      }

      save.difficultySync(dl.data);
      hasCopied = true;
   });

   if (hasChroma) {
      try {
         copySync(globals.directory + infoFileName, globals.directory + infoFileName + '.old');
      } catch (_) {
         const confirmation = args.y
            ? 'n'
            : prompt('Old info backup file detected, do you want to overwrite? (y/N):', 'n');
         if (confirmation![0].toLowerCase() === 'y') {
            copySync(globals.directory + infoFileName, globals.directory + infoFileName + '.old', {
               overwrite: true,
            });
         } else {
            logger.info('Skipping info overwrite...');
         }
      }
      save.infoSync(info);
   }

   if (hasCopied) {
      logger.info('Copying done!');
   } else {
      logger.info('No lightshow were copied.');
   }

   if (!args.d && !args.y) {
      args.y || prompt('Enter any key to exit...');
   }
} catch (e) {
   logger.error(e.message);
   logger.error('If this is an unexpected or unknown error');
   logger.error('Please report this to Kival Evan#5480 on Discord');
   args.y || prompt('!! Enter any key to exit...');
}
