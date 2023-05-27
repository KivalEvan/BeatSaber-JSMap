import { WrapBaseObject } from './baseObject.ts';
import { IWrapColorBoostEvent } from '../../types/beatmap/wrapper/colorBoostEvent.ts';

/** Boost event beatmap class object. */
export abstract class WrapColorBoostEvent<T extends { [P in keyof T]: T[P] }>
    extends WrapBaseObject<T>
    implements IWrapColorBoostEvent<T> {
    protected _toggle!: IWrapColorBoostEvent['toggle'];

    abstract get toggle(): IWrapColorBoostEvent['toggle'];
    abstract set toggle(value: IWrapColorBoostEvent['toggle']);

    setToggle(value: boolean): this {
        this.toggle = value;
        return this;
    }

    isValid(): boolean {
        return true;
    }
}
