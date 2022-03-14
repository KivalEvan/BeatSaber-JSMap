import { ObjectToReturn } from '../../../utils.ts';
import { Serializable } from '../../shared/types/serializable.ts';
import {
    IBasicEventTypesForKeywords,
    BasicEventTypesForKeywords,
} from './basicEventTypesForKeywords.ts';

export interface IBasicEventTypesWithKeywords {
    /** Data list of basic event types with keywords. */
    d: IBasicEventTypesForKeywords[];
}

const defaultValue: ObjectToReturn<IBasicEventTypesWithKeywords> = {
    d: () => [],
};

/** Basic event types with keywords. */
export class BasicEventTypesWithKeywords extends Serializable<IBasicEventTypesWithKeywords> {
    private d: BasicEventTypesForKeywords[];
    constructor(basicEventTypesWithKeywords: Required<IBasicEventTypesWithKeywords>) {
        super();
        this.d = basicEventTypesWithKeywords.d.map(
            (d) => new BasicEventTypesForKeywords({ e: d.e, k: d.k })
        );
    }

    static create(
        basicEventTypesWithKeywords: Partial<IBasicEventTypesWithKeywords> = {}
    ): BasicEventTypesWithKeywords {
        return new BasicEventTypesWithKeywords({
            d: basicEventTypesWithKeywords.d ?? defaultValue.d(),
        });
    }

    toObject(): IBasicEventTypesWithKeywords {
        return {
            d: this.data.map((d) => d.toObject()),
        };
    }

    /** Data list of basic event types with keywords. */
    get data() {
        return this.d;
    }
    set data(value: BasicEventTypesWithKeywords['d']) {
        this.d = value;
    }

    setData(value: BasicEventTypesWithKeywords['d']) {
        this.data = value;
        return this;
    }
    addData(value: IBasicEventTypesForKeywords) {
        this.data.push(new BasicEventTypesForKeywords(value));
        return this;
    }
    removeData(value: string) {
        this.data = this.data.filter((d) => d.keyword !== value);
        return this;
    }
}
