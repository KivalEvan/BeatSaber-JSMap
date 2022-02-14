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
    orderNote?: boolean;
}

export interface SaveOptions {
    path?: string;
}

export interface SaveOptionsInfo extends SaveOptions {
    optimise?: OptimizeOptionsInfo;
}

export interface SaveOptionsDifficulty extends SaveOptions {
    path: string;
    optimise?: OptimizeOptionsDifficulty;
}
