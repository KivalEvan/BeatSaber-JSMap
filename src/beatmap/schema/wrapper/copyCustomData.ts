import { deepCopy } from '../../../utils/misc/json.ts';
import { hasOwn } from '../../../utils/misc/hasOwn.ts';
import type { IDeserializationOptions } from '../shared/types/schema.ts';

function copyCustomDataValue<T extends object>(customData: T): T {
   const copiedCustomData: Record<string, unknown> = {};

   for (const key in customData) {
      if (hasOwn(customData, key)) {
         copiedCustomData[key] = deepCopy(customData[key as keyof T]);
      }
   }

   return copiedCustomData as T;
}

/** Copy plain-JSON custom data, or retain its reference in transfer mode. */
export function copyCustomData<T extends object>(
   customData: T | null | undefined,
   options?: IDeserializationOptions,
): T {
   if (customData === null || customData === undefined) {
      return {} as T;
   }

   return options?.customDataOwnership === 'transfer'
      ? customData
      : copyCustomDataValue(customData);
}
