import { ISlider } from '../../types/beatmap/v2/slider.ts';
import { IWrapSliderAttribute } from '../../types/beatmap/wrapper/slider.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapSlider } from '../wrapper/slider.ts';

/** Slider beatmap v2 class object. */
export class Slider extends WrapSlider<Required<ISlider>> {
    static default: ObjectReturnFn<Required<ISlider>> = {
        _colorType: 0,
        _headTime: 0,
        _headLineIndex: 0,
        _headLineLayer: 0,
        _headCutDirection: 0,
        _headControlPointLengthMultiplier: 1,
        _tailTime: 0,
        _tailLineIndex: 0,
        _tailLineLayer: 0,
        _tailCutDirection: 0,
        _tailControlPointLengthMultiplier: 1,
        _sliderMidAnchorMode: 0,
        _customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapSliderAttribute<Required<ISlider>>>);
    constructor(data: Partial<ISlider>);
    constructor(data: Partial<ISlider> & Partial<IWrapSliderAttribute<Required<ISlider>>>);
    constructor(data: Partial<ISlider> & Partial<IWrapSliderAttribute<Required<ISlider>>> = {}) {
        super({
            _colorType: data.color ?? data._colorType ?? Slider.default._colorType,
            _headTime: data.time ?? data._headTime ?? data._tailTime ?? Slider.default._headTime,
            _headLineIndex: data.posX ?? data._headLineIndex ?? Slider.default._headLineIndex,
            _headLineLayer: data.posY ?? data._headLineLayer ?? Slider.default._headLineLayer,
            _headCutDirection: (data.direction as 0) ?? data._headCutDirection ??
                Slider.default._headCutDirection,
            _headControlPointLengthMultiplier: data.lengthMultiplier ??
                data._headControlPointLengthMultiplier ??
                Slider.default._headControlPointLengthMultiplier,
            _tailTime: data.tailTime ?? data._tailTime ?? data._headTime ??
                Slider.default._tailTime,
            _tailLineIndex: data.tailPosX ?? data._tailLineIndex ?? Slider.default._tailLineIndex,
            _tailLineLayer: data.tailPosY ?? data._tailLineLayer ?? Slider.default._tailLineLayer,
            _tailCutDirection: (data.tailDirection as 0) ??
                data._tailCutDirection ??
                Slider.default._tailCutDirection,
            _tailControlPointLengthMultiplier: data.tailLengthMultiplier ??
                data._tailControlPointLengthMultiplier ??
                Slider.default._tailControlPointLengthMultiplier,
            _sliderMidAnchorMode: data.midAnchor ?? data._sliderMidAnchorMode ??
                Slider.default._sliderMidAnchorMode,
            _customData: data.customData ?? data._customData ?? Slider.default._customData(),
        });
    }

    static create(): Slider[];
    static create(...data: Partial<IWrapSliderAttribute<Required<ISlider>>>[]): Slider[];
    static create(...data: Partial<ISlider>[]): Slider[];
    static create(
        ...data: (Partial<ISlider> & Partial<IWrapSliderAttribute<Required<ISlider>>>)[]
    ): Slider[];
    static create(
        ...data: (Partial<ISlider> & Partial<IWrapSliderAttribute<Required<ISlider>>>)[]
    ): Slider[] {
        const result: Slider[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ISlider> {
        return {
            _colorType: this.color,
            _headTime: this.time,
            _headLineIndex: this.posX,
            _headLineLayer: this.posY,
            _headCutDirection: this.direction,
            _headControlPointLengthMultiplier: this.lengthMultiplier,
            _tailTime: this.tailTime,
            _tailLineIndex: this.tailPosX,
            _tailLineLayer: this.tailPosY,
            _tailCutDirection: this.tailDirection,
            _tailControlPointLengthMultiplier: this.tailLengthMultiplier,
            _sliderMidAnchorMode: this.midAnchor,
            _customData: deepCopy(this.customData),
        };
    }

    get color() {
        return this.data._colorType;
    }
    set color(value: ISlider['_colorType']) {
        this.data._colorType = value;
    }

    get time() {
        return this.data._headTime;
    }
    set time(value: number) {
        this.data._headTime = value;
    }

    get posX() {
        return this.data._headLineIndex;
    }
    set posX(value: ISlider['_headLineIndex']) {
        this.data._headLineIndex = value;
    }

    get posY() {
        return this.data._headLineLayer;
    }
    set posY(value: ISlider['_headLineLayer']) {
        this.data._headLineLayer = value;
    }

    get direction() {
        return this.data._headCutDirection;
    }
    set direction(value: ISlider['_headCutDirection']) {
        this.data._headCutDirection = value;
    }

    get lengthMultiplier() {
        return this.data._headControlPointLengthMultiplier;
    }
    set lengthMultiplier(value: ISlider['_headControlPointLengthMultiplier']) {
        this.data._headControlPointLengthMultiplier = value;
    }

    get tailTime() {
        return this.data._tailTime;
    }
    set tailTime(value: number) {
        this.data._tailTime = value;
    }

    get tailPosX() {
        return this.data._tailLineIndex;
    }
    set tailPosX(value: ISlider['_tailLineIndex']) {
        this.data._tailLineIndex = value;
    }

    get tailPosY() {
        return this.data._tailLineLayer;
    }
    set tailPosY(value: ISlider['_tailLineLayer']) {
        this.data._tailLineLayer = value;
    }

    get tailDirection() {
        return this.data._tailCutDirection;
    }
    set tailDirection(value: ISlider['_tailCutDirection']) {
        this.data._tailCutDirection = value;
    }

    get tailLengthMultiplier() {
        return this.data._tailControlPointLengthMultiplier;
    }
    set tailLengthMultiplier(value: ISlider['_tailControlPointLengthMultiplier']) {
        this.data._tailControlPointLengthMultiplier = value;
    }

    get midAnchor() {
        return this.data._sliderMidAnchorMode;
    }
    set midAnchor(value: ISlider['_sliderMidAnchorMode']) {
        this.data._sliderMidAnchorMode = value;
    }

    get customData(): NonNullable<ISlider['_customData']> {
        return this.data._customData;
    }
    set customData(value: NonNullable<ISlider['_customData']>) {
        this.data._customData = value;
    }
}
