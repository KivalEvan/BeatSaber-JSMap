export type FilterTypeChange<T> = {
    // deno-lint-ignore ban-types
    [P in keyof T]?: T[P] extends object ? [keyof T[P]] : T[P] extends Array<T[P]> ? never : T[P] | T[P][];
};

export interface IFilter<T> {
    include?: FilterTypeChange<T>;
    exclude?: FilterTypeChange<T>;
}
