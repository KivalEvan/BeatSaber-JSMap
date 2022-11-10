import { IWrapBaseObject } from './baseObject.ts';

export interface IWrapColorBoostEvent<
    T extends Record<keyof T, unknown> = Record<string, unknown>,
> extends IWrapBaseObject<T> {
    /** Toggle `<boolean>` of boost event. */
    toggle: boolean;

    setToggle(value: boolean): this;
}
