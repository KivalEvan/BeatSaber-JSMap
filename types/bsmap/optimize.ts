export interface IOptimizeOptions {
   enabled: boolean;
   floatTrim?: number;
   stringTrim?: boolean;
   throwError?: boolean;
}

export interface IOptimizeOptionsInfo extends IOptimizeOptions {
   removeDuplicate?: boolean;
}

export interface IOptimizeOptionsDifficulty extends IOptimizeOptions {
   sort?: boolean;
}
