// deno-lint-ignore-file no-explicit-any
import type { BaseItem } from '../../core/abstract/baseItem.ts';

export function reconcileClassObject<T extends Pick<BaseItem, 'reconcile'>>(
   data: any[],
   objectClass: new (obj: any) => T,
): T[];
export function reconcileClassObject<T extends Pick<BaseItem, 'reconcile'>>(
   data: any,
   objectClass: new (obj: any) => T,
): T;
export function reconcileClassObject<T extends Pick<BaseItem, 'reconcile'>>(
   data: any | any[],
   objectClass: new (obj: any) => T,
): T | T[] {
   if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
         data[i] = data[i] instanceof objectClass
            ? (data[i] as T).reconcile()
            : new objectClass(data[i]);
      }
      return data as T[];
   }
   return (
      data instanceof objectClass ? (data as T).reconcile() : new objectClass(data)
   ) as T;
}
