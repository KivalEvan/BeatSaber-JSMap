export type FilterTypeChange<T extends Record<string, unknown>> = {
    [P in keyof T]?: T[P] extends Record<string, unknown> ? [keyof T[P]]
        : T[P] extends Array<T[P]> ? never
        : T[P] | T[P][];
};

export interface IFilter<T extends Record<string, unknown>> {
    include?: FilterTypeChange<T>;
    exclude?: FilterTypeChange<T>;
}
