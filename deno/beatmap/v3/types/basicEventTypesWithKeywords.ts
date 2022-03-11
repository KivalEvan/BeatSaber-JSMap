import { Serializable } from '../../shared/types/serializable.ts';
import {
    IBasicEventTypesForKeywords,
    BasicEventTypesForKeywords,
} from './basicEventTypesForKeywords.ts';

/** Basic event types with keywords. */
export interface IBasicEventTypesWithKeywords {
    /** Data list of basic event types with keywords. */
    d: IBasicEventTypesForKeywords[];
}

/** Basic event types with keywords. */
export class BasicEventTypesWithKeywords extends Serializable<IBasicEventTypesWithKeywords> {
    private d: BasicEventTypesForKeywords[];
    constructor(basicEventTypesWithKeywords: IBasicEventTypesWithKeywords) {
        super();
        this.d = basicEventTypesWithKeywords.d.map(
            (d) => new BasicEventTypesForKeywords({ e: d.e, k: d.k })
        );
    }

    public toObject(): IBasicEventTypesWithKeywords {
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
}
