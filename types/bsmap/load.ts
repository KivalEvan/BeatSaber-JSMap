import { IBaseOptions } from './options.ts';

export interface ILoadOptionsInfo extends IBaseOptions {
    filePath?: string;
}

export interface ILoadOptionsDifficulty extends IBaseOptions {
    forceConvert?: boolean;
    dataCheck?: {
        enable: boolean;
        throwError?: boolean;
    };
}
