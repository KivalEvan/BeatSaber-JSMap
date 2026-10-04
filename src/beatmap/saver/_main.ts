// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../../logger.ts';
import type { ISaveOptions } from './types.ts';
import type { MirrorFn } from '../schema/shared/types/functions.ts';
import type {
   InferBeatmapSerial,
   InferBeatmapSourceVersion,
   InferBeatmapVersion,
   InferBeatmapWrapper,
} from '../schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../schema/shared/types/schema.ts';
import { convertBeatmap } from '../mapping/converter.ts';
import { resolveBeatmapOptimizer } from '../mapping/optimizer.ts';
import { compatibilityCheck } from '../mapping/compatibility.ts';
import { validateJSON } from '../mapping/validator.ts';
import { isSupportedMajorVersion } from '../helpers/version.ts';
import { isRecord, jsonTypeName } from '../../utils/misc/json.ts';
import { resolveBeatmapSerializer } from '../mapping/serialize.ts';

export function tag(name: string): string[] {
   return ['saver', name];
}

function assertObject(
   type: BeatmapFileType,
   stage: string,
   representation: 'wrapper' | 'JSON',
   data: unknown,
): void {
   if (!isRecord(data) || Array.isArray(data)) {
      throw new TypeError(
         `${stage} for ${type} beatmap ${representation}: expected object but received ${
            jsonTypeName(data)
         }`,
      );
   }
}

const defaultOptions = {
   format: 0,
   forceConvert: true,
   optimize: {
      enabled: true,
      fastMode: true,
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

   const opt: Required<ISaveOptions<TFileType, TVersion, TWrapper, TSerial>> = {
      format: options.format ?? defaultOptions.format,
      forceConvert: options.forceConvert ?? defaultOptions.forceConvert,
      optimize: { ...defaultOptions.optimize, ...options.optimize },
      validate: { ...defaultOptions.validate, ...options.validate },
      sort: options.sort ?? defaultOptions.sort,
      preprocess: options.preprocess ?? defaultOptions.preprocess as any,
      postprocess: options.postprocess ?? defaultOptions.postprocess as any,
   };

   const [pretransformer, ...preprocesses] = opt.preprocess;
   let attribute = pretransformer
      ? pretransformer(data, version)
      : data as InferBeatmapWrapper<TFileType>;
   assertObject(type, 'Invalid output from pretransform function', 'wrapper', attribute);
   preprocesses.forEach((fn, i) => {
      logger?.tInfo(
         tag('saveBeatmap'),
         'Running preprocess function #' + (i + 1),
      );
      attribute = fn(attribute);
      assertObject(type, `Invalid output from preprocess function #${i + 1}`, 'wrapper', attribute);
   });

   let ver: TVersion;
   if (typeof version === 'number') {
      ver = version;
   } else {
      ver = data.version as TVersion;
      if (typeof ver !== 'number' || ver === -1) {
         throw new Error(
            'Beatmap version is not set or invalid, prevented from saving.',
         );
      }
      logger?.tInfo(
         tag('saveBeatmap'),
         'Implicitly saving ' + type + ' as version',
         ver,
      );
   }
   if (!isSupportedMajorVersion(type, ver)) {
      throw new Error(
         `Unsupported ${type} beatmap version ${ver}, prevented from saving.`,
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
         attribute.version as InferBeatmapSourceVersion<TFileType>,
      );
   }

   if (opt.sort && 'sort' in attribute && typeof attribute.sort === 'function') {
      logger?.tInfo(tag('saveBeatmap'), 'Sorting beatmap objects');
      attribute.sort();
   }

   if (opt.validate.enabled) {
      compatibilityCheck(type, attribute, ver, opt.validate?.compatibility);
   }

   logger?.tInfo(tag('saveBeatmap'), 'Serializing beatmap ' + type + ' as JSON');

   const serializer = resolveBeatmapSerializer(type, ver);
   const serialize = serializer.serialize;
   let serial = Reflect.apply(serialize, serializer, [attribute]) as InferBeatmapSerial<
      TFileType,
      TVersion
   >;
   if (!serial) {
      throw new Error(
         'Failed to serialize beatmap, version ' + ver + ' is not supported.',
      );
   }

   if (opt.optimize.enabled) {
      logger?.tInfo(tag('saveBeatmap'), 'Optimizing beatmap JSON');
      const optimize = resolveBeatmapOptimizer(type, ver);
      if (optimize !== null) {
         optimize(serial, opt.optimize);
      }
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
      assertObject(type, `Invalid output from postprocess function #${i + 1}`, 'JSON', serial);
   });

   const json = posttransformer ? posttransformer(serial, ver) : serial as TSerial;
   assertObject(type, 'Invalid output from posttransform function', 'JSON', json);
   return json;
}
