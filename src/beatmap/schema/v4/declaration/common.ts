import * as v from 'valibot';
import type { IObject, IObjectArc, IObjectChain, IObjectLane } from '../types/object.ts';
import { field, type InferObjectEntries } from '../../helpers.ts';
import { CustomDataSchema } from '../../shared/declaration/mod.ts';

/**
 * Schema declaration for v4 `Object`.
 */
export const ObjectSchema: v.ObjectSchema<
   InferObjectEntries<IObject>,
   undefined
> = v.object<InferObjectEntries<IObject>>({
   b: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   i: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Object Lane`.
 */
export const ObjectLaneSchema: v.ObjectSchema<
   InferObjectEntries<IObjectLane>,
   undefined
> = v.object<InferObjectEntries<IObjectLane>>({
   b: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   i: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   r: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Object Chain`.
 */
export const ObjectChainSchema: v.ObjectSchema<
   InferObjectEntries<IObjectChain>,
   undefined
> = v.object<InferObjectEntries<IObjectChain>>({
   hb: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   hr: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   tb: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   tr: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   i: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   ci: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Object Arc`.
 */
export const ObjectArcSchema: v.ObjectSchema<
   InferObjectEntries<IObjectArc>,
   undefined
> = v.object<InferObjectEntries<IObjectArc>>({
   hb: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   hi: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   hr: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   tb: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   ti: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   tr: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   ai: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});
