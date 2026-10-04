import { isEmpty } from '../../utils/misc/json.ts';
import type { IOptimizeOptions } from '../mapping/types/optimize.ts';

/** Keep shared schema data in place, including references from custom data. */
export function sharedData(root: object): WeakSet<object> {
   const seenSchemaData = new WeakSet<object>();
   const shared = new WeakSet<object>();
   const customRoots: object[] = [];
   const seenCustomData = new WeakSet<object>();
   function visitSchemaData(value: object): void {
      if (seenSchemaData.has(value)) {
         shared.add(value);
         return;
      }
      seenSchemaData.add(value);
      if (Array.isArray(value)) {
         for (let index = 0; index < value.length; index++) {
            const child = value[index];
            if (child !== null && typeof child === 'object') visitSchemaData(child);
         }
         return;
      }
      for (const key in value) {
         const child = (value as Record<string, unknown>)[key];
         if (child === null || typeof child !== 'object') continue;
         if (key === 'customData') customRoots.push(child);
         else visitSchemaData(child);
      }
   }
   function visitCustomData(value: object): void {
      if (seenSchemaData.has(value)) {
         shared.add(value);
         return;
      }
      // Scalar-only custom data cannot reference schema data and needs no visited-set entry.
      let tracked = false;
      for (const key in value) {
         const child = (value as Record<string, unknown>)[key];
         if (child === null || typeof child !== 'object') continue;
         if (!tracked) {
            if (seenCustomData.has(value)) return;
            seenCustomData.add(value);
            tracked = true;
         }
         visitCustomData(child);
      }
   }
   // Collect schema data first so references from custom data can be recognized without tracking leaves.
   visitSchemaData(root);
   for (const value of customRoots) visitCustomData(value);
   return shared;
}

/** Rebuild unshared schema data in its existing enumeration order. */
export function compactData<T extends object>(
   data: T,
   options: IOptimizeOptions,
   colorBoost = false,
   cleanCustomData = true,
): T {
   const d = data as Record<string, unknown>;
   const result: Record<string, unknown> = {};
   const emptyCustomData = cleanCustomData && isEmpty(d.customData as Record<string, unknown>);
   for (const key in d) {
      const value = d[key];
      if (key === 'customData' && emptyCustomData) continue;
      if (colorBoost && key === 'o' && !value) continue;
      if (
         options.purgeZeros &&
         (typeof value === 'number' || typeof value === 'boolean') && !value
      ) continue;
      result[key] = value;
   }
   return result as T;
}
