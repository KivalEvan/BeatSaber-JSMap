import { WrapBaseObject } from './baseObject.ts';
import { IWrapRotationEvent } from '../../types/beatmap/wrapper/rotationEvent.ts';

/** Rotation event beatmap class object. */
export abstract class WrapRotationEvent<T extends Record<keyof T, unknown>>
    extends WrapBaseObject<T>
    implements IWrapRotationEvent<T> {
    abstract get executionTime(): IWrapRotationEvent['executionTime'];
    abstract set executionTime(value: IWrapRotationEvent['executionTime']);
    abstract get rotation(): IWrapRotationEvent['rotation'];
    abstract set rotation(value: IWrapRotationEvent['rotation']);

    setExecutionTime(value: IWrapRotationEvent['executionTime']) {
        this.executionTime = value;
        return this;
    }
    setRotation(value: IWrapRotationEvent['rotation']) {
        this.rotation = value;
        return this;
    }

    isValid(): boolean {
        return this.executionTime === 0 || this.executionTime === 1;
    }
}
