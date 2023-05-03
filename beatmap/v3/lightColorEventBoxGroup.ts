import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import { ILightColorEventBoxGroup } from '../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import { IWrapLightColorEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { DeepPartial, ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorEventBoxGroup } from '../wrapper/lightColorEventBoxGroup.ts';
import { LightColorEventBox } from './lightColorEventBox.ts';

/** Light color event box group beatmap v3 class object. */
export class LightColorEventBoxGroup extends WrapLightColorEventBoxGroup<
    Required<ILightColorEventBoxGroup>,
    Required<ILightColorEventBox>,
    Required<ILightColorBase>,
    Required<IIndexFilter>
> {
    static default: ObjectReturnFn<Required<ILightColorEventBoxGroup>> = {
        b: 0,
        g: 0,
        e: () => [],
        customData: () => {
            return {};
        },
    };

    private _e: LightColorEventBox[];

    constructor();
    constructor(
        data: DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
                Required<ILightColorEventBoxGroup>,
                Required<ILightColorEventBox>,
                Required<ILightColorBase>,
                Required<IIndexFilter>
            >
        >,
    );
    constructor(data: DeepPartial<ILightColorEventBoxGroup>);
    constructor(
        data:
            & DeepPartial<ILightColorEventBoxGroup>
            & DeepPartial<
                IWrapLightColorEventBoxGroupAttribute<
                    Required<ILightColorEventBoxGroup>,
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >,
    );
    constructor(
        data:
            & DeepPartial<ILightColorEventBoxGroup>
            & DeepPartial<
                IWrapLightColorEventBoxGroupAttribute<
                    Required<ILightColorEventBoxGroup>,
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            > = {},
    ) {
        super({
            b: data.time ?? data.b ?? LightColorEventBoxGroup.default.b,
            g: data.id ?? data.g ?? LightColorEventBoxGroup.default.g,
            e: (data.boxes as ILightColorEventBox[]) ??
                (data.e as unknown as ILightColorEventBox[]) ??
                LightColorEventBoxGroup.default.e(),
            customData: data.customData ?? LightColorEventBoxGroup.default.customData(),
        });
        this._e = this.data.e.map((obj) => new LightColorEventBox(obj));
    }

    static create(): LightColorEventBoxGroup[];
    static create(
        ...data: DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
                Required<ILightColorEventBoxGroup>,
                Required<ILightColorEventBox>,
                Required<ILightColorBase>,
                Required<IIndexFilter>
            >
        >[]
    ): LightColorEventBoxGroup[];
    static create(...data: DeepPartial<ILightColorEventBoxGroup>[]): LightColorEventBoxGroup[];
    static create(
        ...data: (
            & DeepPartial<ILightColorEventBoxGroup>
            & DeepPartial<
                IWrapLightColorEventBoxGroupAttribute<
                    Required<ILightColorEventBoxGroup>,
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightColorEventBoxGroup[];
    static create(
        ...data: (
            & DeepPartial<ILightColorEventBoxGroup>
            & DeepPartial<
                IWrapLightColorEventBoxGroupAttribute<
                    Required<ILightColorEventBoxGroup>,
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightColorEventBoxGroup[] {
        const result: LightColorEventBoxGroup[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightColorEventBoxGroup> {
        return {
            b: this.time,
            g: this.id,
            e: this.boxes.map((e) => e.toJSON()),
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: ILightColorEventBoxGroup['b']) {
        this.data.b = value;
    }

    get id() {
        return this.data.g;
    }
    set id(value: ILightColorEventBoxGroup['g']) {
        this.data.g = value;
    }

    get boxes(): LightColorEventBox[] {
        return this._e;
    }
    set boxes(value: LightColorEventBox[]) {
        this._e = value;
    }

    get customData(): NonNullable<ILightColorEventBoxGroup['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<ILightColorEventBoxGroup['customData']>) {
        this.data.customData = value;
    }

    isValid(): boolean {
        return this.id >= 0;
    }
}
