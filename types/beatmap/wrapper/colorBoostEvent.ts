import { IWrapBaseObject } from './baseObject.ts';

export interface IWrapColorBoostEvent extends IWrapBaseObject {
    /** Toggle `<boolean>` of boost event. */
    toggle: boolean;

    setToggle(value: boolean): this;
}
