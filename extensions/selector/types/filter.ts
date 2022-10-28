export type FilterTypeChange<T extends Record<keyof T, unknown>> = {
    [P in keyof T]?: T[P] extends Record<keyof T, unknown> ? [keyof T[P]]
        : T[P] extends Array<T[P]> ? never
        : T[P] | T[P][];
};

export interface IFilter<T extends Record<keyof T, unknown>> {
    include?: FilterTypeChange<T>;
    exclude?: FilterTypeChange<T>;
}
