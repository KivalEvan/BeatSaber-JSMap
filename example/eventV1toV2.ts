/* Auto-fix beatmap to latest schema, including custom data related item.
 * Command-line flag:
 * -d | --directory : map folder directory
 * -q | --quite : reduced log output (overridden by verbose)
 * -v | --verbose : enable debug log output
 * -x | --no-backup : disable backup
 * -y | --no-prompt : auto-complete prompt
 * -t | --duration : fade duration
 * example run command:
 * deno run --allow-read --allow-write autoFixer.ts -d "./Folder/Path"
 */
import { copySync } from 'https://deno.land/std@0.192.0/fs/mod.ts';
import { parse } from 'https://deno.land/std@0.192.0/flags/mod.ts';
import {
   BeatPerMinute,
   clamp,
   convert,
   globals,
   isV2,
   lerp,
   load,
   logger,
   normalize,
   save,
   types,
} from '../mod.ts';

const args = parse(Deno.args, {
   string: ['d', 't'],
   boolean: ['v', 'q', 'x', 'y'],
   alias: {
      d: 'directory',
      q: 'quite',
      v: 'verbose',
      x: 'no-backup',
      y: 'no-prompt',
      t: 'duration',
   },
});

logger.info('Beat Saber v1 to v2 event converter build 1');
logger.info('Does not work with Chroma Light ID');
logger.info(
   'Source code available at https://github.com/KivalEvan/BeatSaber-Deno/blob/main/example/eventV1toV2.ts',
);
logger.info('Send any feedback to Kival Evan#5480 on Discord');

if (args.x) {
   logger.warn('No backup flagged, any changes done by this script is irreversible');
}

globals.directory = (args.d as string) ??
   (args.y ? './' : prompt('Enter map folder path (blank for current folder):')?.trim() || './');

const fadeDuration = parseFloat(
   args.t ?? args.y
      ? '1'
      : prompt('Fade duration in seconds (blank for default 1s):')?.trim() ?? '1',
) || 1;

const flashMultiplier = parseFloat(
   args.t ?? args.y
      ? '1.2'
      : prompt('Flash brightness multiplier (blank for default 1.2):')?.trim() ?? '1.2',
) || 1.2;

if (args.q) {
   logger.setLevel(4);
}

if (args.v) {
   logger.setLevel(1);
}

try {
   let info: types.wrapper.IWrapInfo;
   try {
      info = load.infoSync();
   } catch {
      logger.warn('Could not load Info.dat from folder, retrying with info.dat...');
      info = load.infoSync(null, { filePath: 'info.dat' });
   }

   const bpm = BeatPerMinute.create(info.beatsPerMinute);

   const diffList = load.difficultyFromInfoSync(info);

   let oldChromaConvert = false;
   let oldChromaConfirm = false;
   let gradientChromaConvert = false;
   let gradientChromaConfirm = false;
   diffList.forEach((dl) => {
      bpm.timescale = [];
      if (!args.x) {
         logger.info('Backing up beatmap', dl.characteristic, dl.difficulty);
         try {
            copySync(
               globals.directory + dl.settings.filename,
               globals.directory + dl.settings.filename + '.old',
            );
         } catch (_) {
            const confirmation = args.y ? 'n' : prompt(
               `Old ${dl.characteristic} ${dl.difficulty} difficulty backup file detected, do you want to overwrite? (y/N):`,
               'n',
            );
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
      if (isV2(dl.data)) {
         logger.info('Checking event in beatmap v2', dl.characteristic, dl.difficulty);
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
      } else {
         logger.info('Checking event in beatmap v3', dl.characteristic, dl.difficulty);
         bpm.timescale = dl.data.bpmEvents.map((bpme) => bpme.toJSON());

         logger.info('Temporarily converting beatmap v2 copy', dl.characteristic, dl.difficulty);
         const temp = convert.toV2Difficulty(dl.data);
         if (temp.basicEvents.some((e) => e.isOldChroma())) {
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
               convert.ogChromaToV2Chroma(temp, info.environmentName);
            }
         }
         if (temp.basicEvents.some((e) => e.customData._lightGradient)) {
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
               convert.chromaLightGradientToVanillaGradient(temp);
            }
         }

         logger.info(
            'Reconverting temporary beatmap v2 copy to v3',
            dl.characteristic,
            dl.difficulty,
         );
         const temp2 = convert.toV3Difficulty(temp);

         logger.info(
            'Re-inserting events from temporary beatmap',
            dl.characteristic,
            dl.difficulty,
         );
         dl.data.basicEvents = temp2.basicEvents;
      }

      dl.data.basicEvents.forEach((e) => e);

      if (dl.data.basicEvents.some((e) => e.isFade() || e.isFlash())) {
         logger.info('V1 event found in beatmap');
         logger.info('Sorting event');
         dl.data.basicEvents.sort((a, b) => a.type - b.type).sort((a, b) => a.time - b.time);
         const mappedEvent = dl.data.basicEvents
            .map((ev) => ev)
            .filter((ev) => ev.isLightEvent(info.environmentName))
            .reduce((obj: { [key: number]: types.wrapper.IWrapEvent[] }, ev) => {
               obj[ev.type] ??= [];
               obj[ev.type].push(ev);
               return obj;
            }, {});

         for (const id in mappedEvent) {
            const events = mappedEvent[id];
            for (const i in events) {
               const current = events[i];
               const next = events[parseInt(i) + 1];
               if (next) {
                  const duration = clamp(
                     bpm.toRealTime(next.time) - bpm.toRealTime(current.time) - 0.001,
                     0,
                     current.isFlash() ? fadeDuration / 10 : fadeDuration,
                  );
                  const alpha = normalize(
                     duration,
                     0,
                     current.isFlash() ? fadeDuration / 10 : fadeDuration,
                  );
                  if (!alpha) {
                     continue;
                  }
                  if (current.isFade()) {
                     current.value -= 2;
                     current.floatValue *= flashMultiplier;
                     dl.data.addBasicEvents({
                        ...current.toJSON(),
                        time: bpm.toBeatTime(bpm.toRealTime(current.time) + duration, true),
                        value: current.value + 3,
                        floatValue: lerp(alpha, current.floatValue, 0),
                     });
                  }
                  if (current.isFlash()) {
                     current.value -= 1;
                     const prev = current.floatValue;
                     current.floatValue *= flashMultiplier;
                     dl.data.addBasicEvents({
                        ...current.toJSON(),
                        time: bpm.toBeatTime(bpm.toRealTime(current.time) + duration, true),
                        value: current.value + 3,
                        floatValue: lerp(alpha, current.floatValue, prev),
                     });
                  }
               } else {
                  if (current.isFade()) {
                     current.value -= 2;
                     current.floatValue *= flashMultiplier;
                     dl.data.addBasicEvents({
                        ...current.toJSON(),
                        time: bpm.toBeatTime(bpm.toRealTime(current.time) + fadeDuration, true),
                        value: current.value + 3,
                        floatValue: 0,
                     });
                  }
                  if (current.isFlash()) {
                     current.value -= 1;
                     const prev = current.floatValue;
                     current.floatValue *= flashMultiplier;
                     dl.data.addBasicEvents({
                        ...current.toJSON(),
                        time: bpm.toBeatTime(
                           bpm.toRealTime(current.time) + fadeDuration / 10,
                           true,
                        ),
                        value: current.value + 3,
                        floatValue: prev,
                     });
                  }
               }
            }
         }
         logger.info('Conversion to V2 event completed');
      }

      logger.info('Applying 0 float value to off events');
      dl.data.basicEvents
         .map((ev) => ev)
         .filter((ev) => ev.isLightEvent(info.environmentName) && ev.isOff())
         .forEach((ev) => (ev.floatValue = 0));

      save.difficultySync(dl.data);
   });

   logger.info('Event convert process completed');
   if (!args.d) {
      args.y || prompt('Enter any key to exit...');
   }
} catch (e) {
   logger.error(e.message);
   logger.error('If this is an unexpected or unknown error');
   logger.error('Please report this to Kival Evan#5480 on Discord');
   args.y || prompt('!! Enter any key to exit...');
}
