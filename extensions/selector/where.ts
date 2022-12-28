// i know what im doing shut up
// deno-lint-ignore-file no-explicit-any
import { IFilter } from './types/filter.ts';
import { WrapBaseObject } from '../../beatmap/wrapper/baseObject.ts';

/** Query function on class object array.
 * ```ts
 * const notesFilter = where(notes, { include: { x: 2, y: [1, 0] }, exclude: { customData: ['color'] } });
 * console.log(...notesFilter);
 * ```
 */
export function where<
    T extends WrapBaseObject<Record<keyof T['data'], unknown>>,
    U extends T['data'],
>(
    objects: T[],
    filter: IFilter<U> = {},
): T[] {
    return objects
        .filter((o) => {
            let result = false;
            for (const key in filter.include) {
                const value = filter.include[key];
                if (key === 'customData' || key === '_customData') {
                    if ((o.data as any)[key]) {
                        result = (value as string[]).some((p) =>
                            Object.keys((o.data as any)[key]).includes(p)
                        );
                        if (result) {
                            break;
                        }
                    } else {
                        continue;
                    }
                }
                if (Array.isArray(value)) {
                    result = value.some((p) => (o.data as any)[key] === p);
                } else {
                    result = (o.data as any)[key] === value;
                }
                if (result) {
                    break;
                }
            }
            return result;
        })
        .filter((o) => {
            let result = false;
            for (const key in filter.exclude) {
                const value = filter.exclude[key];
                if (key === 'customData' || key === '_customData') {
                    if ((o.data as any)[key]) {
                        result = (value as string[]).some((p) =>
                            Object.keys((o.data as any)[key]).includes(p)
                        );
                        if (result) {
                            break;
                        }
                    } else {
                        continue;
                    }
                }
                if (Array.isArray(value)) {
                    result = value.some((p) => (o.data as any)[key] === p);
                } else {
                    result = (o.data as any)[key] === value;
                }
                if (result) {
                    break;
                }
            }
            return !result;
        });
}
