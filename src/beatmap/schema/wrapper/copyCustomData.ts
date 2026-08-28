import { deepCopy } from '../../../utils/misc/json.ts';

export function copyCustomData<T extends object>(
   customData: T | null | undefined,
): T {
   const copiedCustomData: Record<string, unknown> = {};

   if (customData === null || customData === undefined) {
      return copiedCustomData as T;
   }

   // Stage string values before cloning to retain source getter access order.
   for (const key in customData) {
      if (Object.hasOwn(customData, key)) {
         const value = customData[key as keyof T];
         if (key === '__proto__') {
            Object.defineProperty(copiedCustomData, key, {
               configurable: true,
               enumerable: true,
               value,
               writable: true,
            });
         } else {
            copiedCustomData[key] = value;
         }
      }
   }

   const symbols = Object.getOwnPropertySymbols(customData);
   for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (Object.getOwnPropertyDescriptor(customData, symbol)?.enumerable) {
         void customData[symbol as keyof T];
      }
   }

   for (const key in copiedCustomData) {
      if (Object.hasOwn(copiedCustomData, key)) {
         const value = copiedCustomData[key];
         if (key === '__proto__') {
            // Restore the legacy assignment behavior after staging its value.
            delete copiedCustomData[key];
         }
         copiedCustomData[key] = deepCopy(value);
      }
   }

   return copiedCustomData as T;
}
