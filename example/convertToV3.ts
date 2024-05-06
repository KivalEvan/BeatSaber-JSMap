/* Convert the map to beatmap V3
 * Command-line flag:
 * -d | --directory : map folder directory
 * -s | --single : single difficulty conversion
 * -q | --quite : reduced log output (overridden by verbose)
 * -v | --verbose : enable debug log output
 * -x | --no-backup : disable backup
 * -y | --no-prompt : auto-complete prompt
 * example run command:
 * deno run --allow-read --allow-write convertToV3.ts -d "./Folder/Path"
 */
import { copySync } from 'https://deno.land/std@0.192.0/fs/mod.ts';
import { parse } from 'https://deno.land/std@0.192.0/flags/mod.ts';
import {
   convert,
   globals,
   isV1,
   isV3,
   load,
   logger,
   parse as beatmapParser,
   save,
   types,
   wrapper,
} from '../mod.ts';

const args = parse(Deno.args, {
   string: 'd',
   boolean: ['v', 'q', 'x', 'y', 's'],
   alias: {
      d: 'directory',
      q: 'quite',
      v: 'verbose',
      x: 'no-backup',
      y: 'no-prompt',
      s: 'single',
   },
});

logger.info('Beat Saber beatmap to v3 conversion build 4');
logger.info(
   'Source code available at https://github.com/KivalEvan/BeatSaber-Deno/blob/main/example/convertToV3.ts',
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

let isConverted = false;
let oldChromaConvert = false;
let oldChromaConfirm = false;
let gradientChromaConvert = false;
let gradientChromaConfirm = false;
try {
   if (args.s) {
      if (!args._[0]) {
         logger.warn('Unspecified difficulty file to convert.');
      }

      if (typeof args._[0] === 'number') {
         logger.error('Number is not acceptable value for file path.');
      }

      const diffFilePath = typeof args._[0] === 'string'
         ? args._[0]
         : prompt('Enter difficulty file name (must include extension):')?.trim();

      if (!diffFilePath) {
         throw new Error('Received empty file path.');
      }

      const diffJSON = JSON.parse(
         Deno.readTextFileSync(globals.directory + diffFilePath),
      ) as Record<string, unknown>;
      const diffVersion = parseInt(
         typeof diffJSON._version === 'string'
            ? diffJSON._version.at(0)!
            : typeof diffJSON.version === 'string'
            ? diffJSON.version?.at(0)!
            : '2',
      );

      let diff!: wrapper.WrapDifficulty<{}>;
      if (diffVersion === 2) {
         let skipped = false;
         if (!args.x) {
            logger.info('Backing up beatmap');
            try {
               copySync(
                  globals.directory + diffFilePath,
                  globals.directory + diffFilePath + '.old',
               );
            } catch (_) {
               const confirmation = args.y
                  ? 'n'
                  : prompt('Old backup file detected, do you want to overwrite? (y/N):', 'n');
               if (confirmation![0].toLowerCase() === 'y') {
                  copySync(
                     globals.directory + diffFilePath,
                     globals.directory + diffFilePath + '.old',
                     {
                        overwrite: true,
                     },
                  );
               } else {
                  logger.info('Skipping overwrite...');
                  skipped = true;
               }
            }
         }
         if (!skipped) {
            diff = beatmapParser.v2Difficulty(diffJSON).setFileName(diffFilePath);
            if (diff.basicEvents.some((e) => e.isOldChroma())) {
               const confirmation = args.y ? 'n' : prompt(
                  'Old Chroma detected, do you want to convert this (apply to all)? (y/N):',
                  'n',
               );
               if (confirmation![0].toLowerCase() === 'y') {
                  convert.ogChromaToV2Chroma(diff);
               }
            }
            if (diff.basicEvents.some((e) => e.customData._lightGradient)) {
               const confirmation = args.y ? 'n' : prompt(
                  'Chroma light gradient detected, do you want to convert this (apply to all)? (y/N):',
                  'n',
               );
               if (confirmation![0].toLowerCase() === 'y') {
                  convert.chromaLightGradientToVanillaGradient(diff);
               }
            }
            logger.info('Converting beatmap to v3');
            save.difficultySync(convert.toV3Beatmap(diff));
            isConverted = true;
         }
      }
      if (diffVersion === 1) {
         let skipped = false;
         if (!args.x) {
            logger.info('Backing up beatmap');
            try {
               copySync(
                  globals.directory + diffFilePath,
                  globals.directory + diffFilePath + '.old',
               );
            } catch (_) {
               const confirmation = args.y
                  ? 'n'
                  : prompt('Old backup file detected, do you want to overwrite? (y/N):', 'n');
               if (confirmation![0].toLowerCase() === 'y') {
                  copySync(
                     globals.directory + diffFilePath,
                     globals.directory + diffFilePath + '.old',
                     {
                        overwrite: true,
                     },
                  );
               } else {
                  logger.info('Skipping overwrite...');
                  skipped = true;
               }
            }
         }
         if (!skipped) {
            diff = convert.toV2Beatmap(
               beatmapParser.v1Difficulty(diffJSON).setFileName(diffFilePath),
            );
            if (diff.basicEvents.some((e) => e.isOldChroma())) {
               const confirmation = args.y ? 'n' : prompt(
                  'Old Chroma detected, do you want to convert this (apply to all)? (y/N):',
                  'n',
               );
               if (confirmation![0].toLowerCase() === 'y') {
                  convert.ogChromaToV2Chroma(diff);
               }
            }
            if (diff.basicEvents.some((e) => e.customData._lightGradient)) {
               const confirmation = args.y ? 'n' : prompt(
                  'Chroma light gradient detected, do you want to convert this (apply to all)? (y/N):',
                  'n',
               );
               if (confirmation![0].toLowerCase() === 'y') {
                  convert.chromaLightGradientToVanillaGradient(diff);
               }
            }
            logger.info('Converting beatmap to v3');
            save.difficultySync(convert.toV3Beatmap(diff));
            isConverted = true;
         }
      }
   } else {
      let info: types.wrapper.IWrapInfo;
      try {
         info = load.infoSync();
      } catch {
         logger.warn('Could not load Info.dat from folder, retrying with info.dat...');
         info = load.infoSync(null, { filePath: 'info.dat' });
      }

      const diffList = load.difficultyFromInfoSync(info);

      diffList.forEach((dl) => {
         if (!isV3(dl.data)) {
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
            if (isV1(dl.data)) {
               dl.data = convert.toV2Beatmap(dl.data);
            }
            if (dl.data.basicEvents.some((e) => e.isOldChroma())) {
               if (!oldChromaConfirm) {
                  const confirmation = args.y ? 'n' : prompt(
                     'Old Chroma detected, do you want to convert this (apply to all)? (y/N):',
                     'n',
                  );
                  if (confirmation![0].toLowerCase() === 'y') {
                     oldChromaConvert = true;
                  }
                  oldChromaConfirm = true;
               }
               if (oldChromaConvert) {
                  convert.ogChromaToV2Chroma(dl.data, info.environmentName);
               }
            }
            if (dl.data.basicEvents.some((e) => e.customData._lightGradient)) {
               if (!gradientChromaConfirm) {
                  const confirmation = args.y ? 'n' : prompt(
                     'Chroma light gradient detected, do you want to convert this (apply to all)? (y/N):',
                     'n',
                  );
                  if (confirmation![0].toLowerCase() === 'y') {
                     gradientChromaConvert = true;
                  }
                  gradientChromaConfirm = true;
               }
               if (gradientChromaConvert) {
                  convert.chromaLightGradientToVanillaGradient(dl.data);
               }
            }
            logger.info('Converting beatmap', dl.characteristic, dl.difficulty, 'to v3');
            dl.data = convert.toV3Beatmap(dl.data);
            save.difficultySync(dl.data);
            isConverted = true;
         }
      });
   }
   if (isConverted) {
      logger.info('Conversion completed!');
   } else {
      logger.info('Nothing was converted.');
   }

   if (!args.d) {
      args.y || prompt('Enter any key to exit...');
   }
} catch (e) {
   logger.error(e.message);
   logger.error('If this is an unexpected or unknown error');
   logger.error('Please report this to Kival Evan#5480 on Discord');
   args.y || prompt('!! Enter any key to exit...');
}
