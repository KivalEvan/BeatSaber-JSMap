import { integer, number, object, optional, pipe } from '@valibot/valibot';
import type {
   IObject,
   IObjectArc,
   IObjectChain,
   IObjectLane,
} from '../../../../types/beatmap/v4/object.ts';
import { field, type InferObjectEntries } from '../../helpers.ts';
import { CustomDataSchema } from '../../shared/declaration/mod.ts';

/**
 * Schema declaration for v4 `Object`.
 */
export const ObjectSchema = object<InferObjectEntries<IObject>>({
   b: field(optional(number()), {
      version: '4.0.0',
   }),
   i: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Object Lane`.
 */
export const ObjectLaneSchema = object<InferObjectEntries<IObjectLane>>({
   b: field(optional(number()), {
      version: '4.0.0',
   }),
   i: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   r: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Object Chain`.
 */
export const ObjectChainSchema = object<InferObjectEntries<IObjectChain>>({
   hb: field(optional(number()), {
      version: '4.0.0',
   }),
   hr: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   tb: field(optional(number()), {
      version: '4.0.0',
   }),
   tr: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   i: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   ci: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Object Arc`.
 */
export const ObjectArcSchema = object<InferObjectEntries<IObjectArc>>({
   hb: field(optional(number()), {
      version: '4.0.0',
   }),
   hi: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   hr: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   tb: field(optional(number()), {
      version: '4.0.0',
   }),
   ti: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   tr: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   ai: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});
