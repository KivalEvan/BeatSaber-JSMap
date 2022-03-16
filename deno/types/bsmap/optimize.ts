export interface OptimizeOptions {
    enabled: boolean;
    floatTrim?: number;
    stringTrim?: boolean;
    throwError?: boolean;
}

export interface OptimizeOptionsInfo extends OptimizeOptions {
    removeDuplicate?: boolean;
}

export interface OptimizeOptionsDifficulty extends OptimizeOptions {
    optimiseLight?: boolean;
    sort?: boolean;
}
