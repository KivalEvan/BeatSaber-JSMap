// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../../logger.ts';
import type { ISaveOptions } from './types.ts';
import type { MirrorFn } from '../schema/shared/types/functions.ts';
import type {
   InferBeatmapSerial,
   InferBeatmapVersion,
   InferBeatmapWrapper,
} from '../schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../schema/shared/types/schema.ts';
import { convertBeatmap } from '../mapping/converter.ts';
import { optimizeBeatmap } from '../mapping/optimizer.ts';
import { serializeBeatmap } from '../mapping/schema.ts';
import { compatibilityCheck } from '../mapping/compatibility.ts';
import { validateJSON } from '../mapping/validator.ts';

export function tag(name: string): string[] {
   return ['saver', name];
}

const defaultOptions = {
   format: 0,
   forceConvert: true,
   optimize: {
      enabled: true,
      deduplicate: true,
      floatTrim: 8,
      purgeZeros: true,
      stringTrim: true,
      throwNullish: true,
   },
   validate: { enabled: true },
   sort: true,
   preprocess: [],
   postprocess: [],
} as const;

export function saveBeatmap<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<TFileType>,
   TSerial extends Record<string, any> = InferBeatmapSerial<TFileType, TVersion>,
>(
   type: TFileType,
   data: TWrapper,
   version?: TVersion | null,
   options: ISaveOptions<TFileType, TVersion, TWrapper, TSerial> = {},
): TSerial {
   const logger = getLogger();

   const optD = (typeof version !== 'number' ? version : options) ?? options ?? {};
   const opt: Required<ISaveOptions<TFileType, TVersion, TWrapper, TSerial>> = {
      format: optD.format ?? defaultOptions.format,
      forceConvert: optD.forceConvert ?? defaultOptions.forceConvert,
      optimize: { ...defaultOptions.optimize, ...optD.optimize },
      validate: { ...defaultOptions.validate, ...optD.validate },
      sort: optD.sort ?? defaultOptions.sort,
      preprocess: optD.preprocess ?? defaultOptions.preprocess as any,
      postprocess: optD.postprocess ?? defaultOptions.postprocess as any,
   };

   const [pretransformer, ...preprocesses] = opt.preprocess;
   let attribute = pretransformer
      ? pretransformer(data, version)
      : data as InferBeatmapWrapper<TFileType>;
   preprocesses.forEach((fn, i) => {
      logger?.tInfo(
         tag('saveBeatmap'),
         'Running preprocess function #' + (i + 1),
      );
      attribute = fn(attribute);
   });

   let ver: TVersion;
   if (typeof version === 'number') {
      ver = version;
   } else {
      ver = data.version as TVersion;
      if (ver === -1) {
         throw new Error('Version is not set, prevented from saving.');
      }
      logger?.tInfo(
         tag('saveBeatmap'),
         'Implicitly saving ' + type + ' as version',
         ver,
      );
   }

   if (ver && attribute.version !== ver) {
      if (!opt.forceConvert) {
         throw new Error(
            `Beatmap version unmatched, expected ${ver} but received ${data.version}`,
         );
      }
      logger?.tWarn(
         tag('saveBeatmap'),
         'Beatmap version unmatched, expected',
         ver,
         'but received',
         data.version,
         'for version; Converting to beatmap version',
         ver,
      );
      attribute = convertBeatmap(
         type,
         ver,
         attribute,
         attribute.version as InferBeatmapVersion<TFileType>,
      );
   }

   // TODO: validate beatmap properly
   // if (opt.validate.enabled) {
   //    logger?.tInfo(tag('saveBeatmap'), 'Validating beatmap');
   //    if (!data.isValid()) {
   //       logger?.tWarn(tag('saveBeatmap'), 'Invalid data detected in beatmap');
   //    }
   // }

   if (opt.sort && 'sort' in attribute && typeof attribute.sort === 'function') {
      logger?.tInfo(tag('saveBeatmap'), 'Sorting beatmap objects');
      attribute.sort();
   }

   if (opt.validate.enabled) {
      compatibilityCheck(type, attribute, ver, opt.validate?.compatibility);
   }

   logger?.tInfo(tag('saveBeatmap'), 'Serializing beatmap ' + type + ' as JSON');

   let serial = serializeBeatmap(type, ver, attribute);
   if (!serial) {
      throw new Error(
         'Failed to serialize beatmap, version ' + ver + ' is not supported.',
      );
   }

   if (opt.optimize.enabled) {
      logger?.tInfo(tag('saveBeatmap'), 'Optimizing beatmap JSON');
      optimizeBeatmap(type, ver, serial, opt.optimize);
   }

   if (opt.validate.enabled) {
      validateJSON(type, serial, ver, opt.validate?.schemaCheck);
   }

   const [posttransformer, ...postprocesses] = [...opt.postprocess].reverse() as [
      (data: InferBeatmapSerial<TFileType, TVersion>, version: TVersion | null) => TSerial,
      ...MirrorFn<InferBeatmapSerial<TFileType, TVersion>>[],
   ];
   postprocesses.forEach((fn, i) => {
      logger?.tInfo(
         tag('saveBeatmap'),
         'Running postprocess function #' + (i + 1),
      );
      serial = fn(serial);
   });

   const json = posttransformer ? posttransformer(serial, ver) : serial as TSerial;
   return json;
}
