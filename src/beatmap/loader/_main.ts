// deno-lint-ignore-file no-explicit-any
import { logger } from '../../logger.ts';
import type { ILoadOptions } from '../../types/beatmap/options/loader.ts';
import type { MirrorFn } from '../../types/beatmap/shared/functions.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../../types/beatmap/shared/infer.ts';
import type { BeatmapFileType } from '../../types/beatmap/shared/schema.ts';
import { implicitVersion, retrieveVersion } from '../helpers/version.ts';
import { convertBeatmap } from '../mapping/converter.ts';
import { deserializeBeatmap } from '../mapping/schema.ts';
import { validateJSON } from '../validator/json.ts';

export function tag(name: string): string[] {
   return ['loader', name];
}

const defaultOptions = {
   forceConvert: true,
   schemaCheck: {},
   sort: true,
   preprocess: [],
   postprocess: [],
} as const;

export function loadBeatmap<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends Record<string, any> = InferBeatmap<TFileType>,
   TSerial extends Record<string, any> = InferBeatmapSerial<TFileType, TVersion>,
>(
   type: TFileType,
   json: TSerial,
   version?: TVersion | null,
   options: ILoadOptions<TFileType, TVersion, TWrapper, TSerial> = {},
): TWrapper {
   const optD = (typeof version !== 'number' ? version : options) ?? options ?? {};
   const opt: Required<ILoadOptions<TFileType, TVersion, TWrapper, TSerial>> = {
      forceConvert: optD.forceConvert ?? defaultOptions.forceConvert,
      schemaCheck: { ...defaultOptions.schemaCheck, ...optD.schemaCheck },
      sort: optD.sort ?? defaultOptions.sort,
      preprocess: optD.preprocess ?? defaultOptions.preprocess as any,
      postprocess: optD.postprocess ?? defaultOptions.postprocess as any,
   };

   const [pretransformer, ...preprocesses] = opt.preprocess;
   let serial = pretransformer
      ? pretransformer(json, version)
      : json as InferBeatmapSerial<TFileType, TVersion>;
   preprocesses.forEach((fn, i) => {
      logger.tInfo(tag('loadBeatmap'), 'Running preprocess function #' + (i + 1));
      serial = fn(serial);
   });

   const jsonVerStr = retrieveVersion(serial)?.at(0);
   let jsonVer: TVersion;
   if (jsonVerStr) {
      jsonVer = parseInt(jsonVerStr) as TVersion;
   } else {
      jsonVer = +implicitVersion(type).at(0)! as TVersion;
      logger.tWarn(
         tag('loadBeatmap'),
         'Could not identify beatmap version from JSON, assume implicit version',
         jsonVer,
      );
   }

   let attribute: InferBeatmap<TFileType>;
   if (opt.schemaCheck.enabled) validateJSON(type, serial, jsonVer, opt.schemaCheck);
   attribute = deserializeBeatmap(type, jsonVer, serial);

   if (version && jsonVer !== version) {
      if (!opt.forceConvert) {
         throw new Error(
            `Beatmap version unmatched, expected ${version} but received ${jsonVer}`,
         );
      }
      logger.tWarn(
         tag('loadBeatmap'),
         'Beatmap version unmatched, expected',
         version,
         'but received',
         jsonVer,
         'for version; Converting to beatmap version',
         version,
      );
      attribute = convertBeatmap(
         type,
         version,
         attribute,
         attribute.version as InferBeatmapVersion<TFileType>,
      );
   }

   if (opt.sort && 'sort' in attribute && typeof attribute.sort === 'function') {
      attribute.sort();
   }

   const [posttransformer, ...postprocesses] = [...opt.postprocess].reverse() as [
      (data: InferBeatmap<TFileType>, version: TVersion | null) => TWrapper,
      ...MirrorFn<InferBeatmap<TFileType>>[],
   ];
   postprocesses.forEach((fn, i) => {
      logger.tInfo(tag('loadBeatmap'), 'Running postprocess function #' + (i + 1));
      attribute = fn(attribute);
   });

   const wrapper = posttransformer
      ? posttransformer(attribute, version ?? null)
      : attribute as TWrapper;
   return wrapper;
}
