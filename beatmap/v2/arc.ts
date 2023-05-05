import { IArc } from '../../types/beatmap/v2/arc.ts';
import { IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapArc } from '../wrapper/arc.ts';

/** Arc beatmap v2 class object. */
export class Arc extends WrapArc<Required<IArc>> {
    static default: ObjectReturnFn<Required<IArc>> = {
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
    constructor(data: Partial<IWrapArcAttribute<Required<IArc>>>);
    constructor(data: Partial<IArc>);
    constructor(data: Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>>);
    constructor(data: Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>> = {}) {
        super({
            _colorType: data.color ?? data._colorType ?? Arc.default._colorType,
            _headTime: data.time ?? data._headTime ?? data._tailTime ?? Arc.default._headTime,
            _headLineIndex: data.posX ?? data._headLineIndex ?? Arc.default._headLineIndex,
            _headLineLayer: data.posY ?? data._headLineLayer ?? Arc.default._headLineLayer,
            _headCutDirection: (data.direction as 0) ?? data._headCutDirection ??
                Arc.default._headCutDirection,
            _headControlPointLengthMultiplier: data.lengthMultiplier ??
                data._headControlPointLengthMultiplier ??
                Arc.default._headControlPointLengthMultiplier,
            _tailTime: data.tailTime ?? data._tailTime ?? data._headTime ?? Arc.default._tailTime,
            _tailLineIndex: data.tailPosX ?? data._tailLineIndex ?? Arc.default._tailLineIndex,
            _tailLineLayer: data.tailPosY ?? data._tailLineLayer ?? Arc.default._tailLineLayer,
            _tailCutDirection: (data.tailDirection as 0) ??
                data._tailCutDirection ??
                Arc.default._tailCutDirection,
            _tailControlPointLengthMultiplier: data.tailLengthMultiplier ??
                data._tailControlPointLengthMultiplier ??
                Arc.default._tailControlPointLengthMultiplier,
            _sliderMidAnchorMode: data.midAnchor ?? data._sliderMidAnchorMode ??
                Arc.default._sliderMidAnchorMode,
            _customData: data.customData ?? data._customData ?? Arc.default._customData(),
        });
    }

    static create(): Arc[];
    static create(...data: Partial<IWrapArcAttribute<Required<IArc>>>[]): Arc[];
    static create(...data: Partial<IArc>[]): Arc[];
    static create(...data: (Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>>)[]): Arc[];
    static create(...data: (Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>>)[]): Arc[] {
        const result: Arc[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<IArc> {
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
    set color(value: IArc['_colorType']) {
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
    set posX(value: IArc['_headLineIndex']) {
        this.data._headLineIndex = value;
    }

    get posY() {
        return this.data._headLineLayer;
    }
    set posY(value: IArc['_headLineLayer']) {
        this.data._headLineLayer = value;
    }

    get direction() {
        return this.data._headCutDirection;
    }
    set direction(value: IArc['_headCutDirection']) {
        this.data._headCutDirection = value;
    }

    get lengthMultiplier() {
        return this.data._headControlPointLengthMultiplier;
    }
    set lengthMultiplier(value: IArc['_headControlPointLengthMultiplier']) {
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
    set tailPosX(value: IArc['_tailLineIndex']) {
        this.data._tailLineIndex = value;
    }

    get tailPosY() {
        return this.data._tailLineLayer;
    }
    set tailPosY(value: IArc['_tailLineLayer']) {
        this.data._tailLineLayer = value;
    }

    get tailDirection() {
        return this.data._tailCutDirection;
    }
    set tailDirection(value: IArc['_tailCutDirection']) {
        this.data._tailCutDirection = value;
    }

    get tailLengthMultiplier() {
        return this.data._tailControlPointLengthMultiplier;
    }
    set tailLengthMultiplier(value: IArc['_tailControlPointLengthMultiplier']) {
        this.data._tailControlPointLengthMultiplier = value;
    }

    get midAnchor() {
        return this.data._sliderMidAnchorMode;
    }
    set midAnchor(value: IArc['_sliderMidAnchorMode']) {
        this.data._sliderMidAnchorMode = value;
    }

    get customData(): NonNullable<IArc['_customData']> {
        return this.data._customData;
    }
    set customData(value: NonNullable<IArc['_customData']>) {
        this.data._customData = value;
    }
}
