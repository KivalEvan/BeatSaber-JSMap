import { ILightTranslationEventBoxGroup } from '../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import { DeepPartial, ObjectReturnFn } from '../../types/utils.ts';
import { LightTranslationEventBox } from './lightTranslationEventBox.ts';
import { WrapLightTranslationEventBoxGroup } from '../wrapper/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';
import { IWrapLightTranslationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';

/** Light translation event box group beatmap v3 class object. */
export class LightTranslationEventBoxGroup extends WrapLightTranslationEventBoxGroup<
    Required<ILightTranslationEventBoxGroup>,
    Required<ILightTranslationEventBox>,
    Required<ILightTranslationBase>,
    Required<IIndexFilter>
> {
    static default: ObjectReturnFn<Required<ILightTranslationEventBoxGroup>> = {
        b: 0,
        g: 0,
        e: () => [],
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(
        data: DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
                Required<ILightTranslationEventBoxGroup>,
                Required<ILightTranslationEventBox>,
                Required<ILightTranslationBase>,
                Required<IIndexFilter>
            >
        >,
    );
    constructor(data: DeepPartial<ILightTranslationEventBoxGroup>);
    constructor(
        data:
            & DeepPartial<ILightTranslationEventBoxGroup>
            & DeepPartial<
                IWrapLightTranslationEventBoxGroupAttribute<
                    Required<ILightTranslationEventBoxGroup>,
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >,
    );
    constructor(
        data:
            & DeepPartial<ILightTranslationEventBoxGroup>
            & DeepPartial<
                IWrapLightTranslationEventBoxGroupAttribute<
                    Required<ILightTranslationEventBoxGroup>,
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            > = {},
    ) {
        super();

        this._time = data.time ?? data.b ?? LightTranslationEventBoxGroup.default.b;
        this._id = data.id ?? data.g ?? LightTranslationEventBoxGroup.default.g;
        this._boxes = (
            (data.boxes as ILightTranslationEventBox[]) ??
                (data.e as unknown as ILightTranslationEventBox[]) ??
                LightTranslationEventBoxGroup.default.e()
        ).map((obj) => new LightTranslationEventBox(obj));
        this._customData = data.customData ?? LightTranslationEventBoxGroup.default.customData();
    }

    static create(): LightTranslationEventBoxGroup[];
    static create(
        ...data: DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
                Required<ILightTranslationEventBoxGroup>,
                Required<ILightTranslationEventBox>,
                Required<ILightTranslationBase>,
                Required<IIndexFilter>
            >
        >[]
    ): LightTranslationEventBoxGroup[];
    static create(
        ...data: DeepPartial<ILightTranslationEventBoxGroup>[]
    ): LightTranslationEventBoxGroup[];
    static create(
        ...data: (
            & DeepPartial<ILightTranslationEventBoxGroup>
            & DeepPartial<
                IWrapLightTranslationEventBoxGroupAttribute<
                    Required<ILightTranslationEventBoxGroup>,
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightTranslationEventBoxGroup[];
    static create(
        ...data: (
            & DeepPartial<ILightTranslationEventBoxGroup>
            & DeepPartial<
                IWrapLightTranslationEventBoxGroupAttribute<
                    Required<ILightTranslationEventBoxGroup>,
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightTranslationEventBoxGroup[] {
        const result: LightTranslationEventBoxGroup[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightTranslationEventBoxGroup> {
        return {
            b: this.time,
            g: this.id,
            e: this.boxes.map((e) => e.toJSON()),
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this._time;
    }
    set time(value: ILightTranslationEventBoxGroup['b']) {
        this._time = value;
    }

    get id() {
        return this._id;
    }
    set id(value: ILightTranslationEventBoxGroup['g']) {
        this._id = value;
    }

    get boxes() {
        return this._boxes as LightTranslationEventBox[];
    }
    set boxes(value: LightTranslationEventBox[]) {
        this._boxes = value;
    }

    get customData(): NonNullable<ILightTranslationEventBoxGroup['customData']> {
        return this.customData;
    }
    set customData(value: NonNullable<ILightTranslationEventBoxGroup['customData']>) {
        this.customData = value;
    }

    setCustomData(value: NonNullable<ILightTranslationEventBoxGroup['customData']>): this {
        this.customData = value;
        return this;
    }
    addCustomData(object: ILightTranslationEventBoxGroup['customData']): this {
        this.customData = { ...this.customData, object };
        return this;
    }

    isValid(): boolean {
        return this.id >= 0;
    }
}
