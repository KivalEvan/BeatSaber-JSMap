import { IBasicEventTypesForKeywords } from '../../types/beatmap/v3/basicEventTypesForKeywords.ts';
import { IBasicEventTypesWithKeywords } from '../../types/beatmap/v3/basicEventTypesWithKeywords.ts';
import { IWrapEventTypesWithKeywordsAttribute } from '../../types/beatmap/wrapper/eventTypesWithKeywords.ts';
import { DeepPartial, ObjectReturnFn } from '../../types/utils.ts';
import { WrapEventTypesWithKeywords } from '../wrapper/eventTypesWithKeywords.ts';
import { BasicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';

/** Basic event types with keywords beatmap v3 class object. */
export class BasicEventTypesWithKeywords extends WrapEventTypesWithKeywords<
    Required<IBasicEventTypesWithKeywords>,
    Required<IBasicEventTypesForKeywords>
> {
    static default: ObjectReturnFn<Required<IBasicEventTypesWithKeywords>> = {
        d: () => [],
    };

    constructor();
    constructor(
        data: DeepPartial<
            IWrapEventTypesWithKeywordsAttribute<Required<IBasicEventTypesWithKeywords>>
        >,
    );
    constructor(data: DeepPartial<IBasicEventTypesWithKeywords>);
    constructor(
        data:
            & DeepPartial<IBasicEventTypesWithKeywords>
            & DeepPartial<
                IWrapEventTypesWithKeywordsAttribute<Required<IBasicEventTypesWithKeywords>>
            >,
    );
    constructor(
        data:
            & DeepPartial<IBasicEventTypesWithKeywords>
            & DeepPartial<
                IWrapEventTypesWithKeywordsAttribute<Required<IBasicEventTypesWithKeywords>>
            > = {},
    ) {
        super();

        this._list = (
            (data.list?.map((k) => {
                return { k: k?.keyword, e: k?.events };
            }) as IBasicEventTypesForKeywords[]) ??
                data.d ??
                BasicEventTypesWithKeywords.default.d()
        ).map((d) => new BasicEventTypesForKeywords({ e: d.e, k: d.k }));
    }

    static create(): BasicEventTypesWithKeywords;
    static create(
        data: DeepPartial<
            IWrapEventTypesWithKeywordsAttribute<Required<IBasicEventTypesWithKeywords>>
        >,
    ): BasicEventTypesWithKeywords;
    static create(data: DeepPartial<IBasicEventTypesWithKeywords>): BasicEventTypesWithKeywords;
    static create(
        data:
            & DeepPartial<IBasicEventTypesWithKeywords>
            & DeepPartial<
                IWrapEventTypesWithKeywordsAttribute<Required<IBasicEventTypesWithKeywords>>
            >,
    ): BasicEventTypesWithKeywords;
    static create(
        data:
            & DeepPartial<IBasicEventTypesWithKeywords>
            & DeepPartial<
                IWrapEventTypesWithKeywordsAttribute<Required<IBasicEventTypesWithKeywords>>
            > = {},
    ): BasicEventTypesWithKeywords {
        return new this(data);
    }

    toJSON(): IBasicEventTypesWithKeywords {
        return {
            d: this.list.map((d) => d.toJSON()),
        };
    }

    get list() {
        return this._list as BasicEventTypesForKeywords[];
    }
    set list(value: BasicEventTypesForKeywords[]) {
        this._list = value;
    }

    addData(value: BasicEventTypesForKeywords) {
        this.list.push(value);
        return this;
    }
}
