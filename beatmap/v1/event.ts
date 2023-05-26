import { IEvent } from '../../types/beatmap/v1/event.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { WrapEvent } from '../wrapper/event.ts';
import { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import logger from '../../logger.ts';

function tag(name: string): string[] {
    return ['beatmap', 'v1', 'event', name];
}

/** Event beatmap v1 class object. */
export class Event extends WrapEvent<Required<IEvent>> {
    static default: ObjectReturnFn<Required<IEvent>> = {
        _time: 0,
        _type: 0,
        _value: 0,
    };

    constructor();
    constructor(data: Partial<IWrapEventAttribute<Required<IEvent>>>);
    constructor(data: Partial<IEvent>);
    constructor(data: Partial<IEvent> & Partial<IWrapEventAttribute<Required<IEvent>>>);
    constructor(data: Partial<IEvent> & Partial<IWrapEventAttribute<Required<IEvent>>> = {}) {
        super();

        this._time = data.time ?? data._time ?? Event.default._time;
        this._type = data.type ?? data._type ?? Event.default._type;
        this._value = data.value ?? data._value ?? Event.default._value;
    }

    static create(): Event[];
    static create(...data: Partial<IWrapEventAttribute<Required<IEvent>>>[]): Event[];
    static create(...data: Partial<IEvent>[]): Event[];
    static create(
        ...data: (Partial<IEvent> & Partial<IWrapEventAttribute<Required<IEvent>>>)[]
    ): Event[];
    static create(
        ...data: (Partial<IEvent> & Partial<IWrapEventAttribute<Required<IEvent>>>)[]
    ): Event[] {
        const result: Event[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<IEvent> {
        return {
            _time: this.time,
            _type: this.type,
            _value: this.value,
        };
    }

    get time() {
        return this._time;
    }
    set time(value: IEvent['_time']) {
        this._time = value;
    }

    get type() {
        return this._type;
    }
    set type(value: IEvent['_type']) {
        this._type = value;
    }

    get value() {
        return this._value;
    }
    set value(value: IEvent['_value']) {
        this._value = value;
    }

    get floatValue() {
        return 1;
    }
    set floatValue(value: number) {
        logger.tWarn(tag('floatValue'), 'Event float value does not exist in beatmap V1');
    }

    get customData(): Record<string, never> {
        return {};
    }
    set customData(_: Record<string, never>) {
        logger.tWarn(tag('customData'), 'Event custom data does not exist in beatmap V1');
    }

    isMappingExtensions(): boolean {
        return this.isLaneRotationEvent() && this.value >= 1000 && this.value <= 1720;
    }
}
