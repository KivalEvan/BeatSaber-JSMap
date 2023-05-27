import { IArc } from '../../types/beatmap/v2/arc.ts';
import { IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapArc } from '../wrapper/arc.ts';

/** Arc beatmap v2 class object. */
export class Arc extends WrapArc<IArc> {
    static default: ObjectReturnFn<IArc> = {
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
    constructor(data: Partial<IWrapArcAttribute<IArc>>);
    constructor(data: Partial<IArc>);
    constructor(data: Partial<IArc> & Partial<IWrapArcAttribute<IArc>>);
    constructor(data: Partial<IArc> & Partial<IWrapArcAttribute<IArc>> = {}) {
        super();

        this._color = data.color ?? data._colorType ?? Arc.default._colorType;
        this._time = data.time ?? data._headTime ?? data._tailTime ?? Arc.default._headTime;
        this._posX = data.posX ?? data._headLineIndex ?? Arc.default._headLineIndex;
        this._posY = data.posY ?? data._headLineLayer ?? Arc.default._headLineLayer;
        this._direction = (data.direction as 0) ?? data._headCutDirection ??
            Arc.default._headCutDirection;
        this._lengthMultiplier = data.lengthMultiplier ??
            data._headControlPointLengthMultiplier ??
            Arc.default._headControlPointLengthMultiplier;
        this._tailTime = data.tailTime ?? data._tailTime ?? data._headTime ?? Arc.default._tailTime;
        this._tailPosX = data.tailPosX ?? data._tailLineIndex ?? Arc.default._tailLineIndex;
        this._tailPosY = data.tailPosY ?? data._tailLineLayer ?? Arc.default._tailLineLayer;
        this._tailDirection = (data.tailDirection as 0) ?? data._tailCutDirection ??
            Arc.default._tailCutDirection;
        this._tailLengthMultiplier = data.tailLengthMultiplier ??
            data._tailControlPointLengthMultiplier ??
            Arc.default._tailControlPointLengthMultiplier;
        this._midAnchor = data.midAnchor ?? data._sliderMidAnchorMode ??
            Arc.default._sliderMidAnchorMode;
        this._customData = data.customData ?? data._customData ?? Arc.default._customData();
    }

    static create(): Arc[];
    static create(...data: Partial<IWrapArcAttribute<IArc>>[]): Arc[];
    static create(...data: Partial<IArc>[]): Arc[];
    static create(...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]): Arc[];
    static create(...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]): Arc[] {
        const result: Arc[] = [];
        data.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): IArc {
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
        return this._color;
    }
    set color(value: IArc['_colorType']) {
        this._color = value;
    }

    get time() {
        return this._time;
    }
    set time(value: number) {
        this._time = value;
    }

    get posX() {
        return this._posX;
    }
    set posX(value: IArc['_headLineIndex']) {
        this._posX = value;
    }

    get posY() {
        return this._posY;
    }
    set posY(value: IArc['_headLineLayer']) {
        this._posY = value;
    }

    get direction() {
        return this._direction as IArc['_headCutDirection'];
    }
    set direction(value: IArc['_headCutDirection']) {
        this._direction = value;
    }

    get lengthMultiplier() {
        return this._lengthMultiplier;
    }
    set lengthMultiplier(value: IArc['_headControlPointLengthMultiplier']) {
        this._lengthMultiplier = value;
    }

    get tailTime() {
        return this._tailTime;
    }
    set tailTime(value: number) {
        this._tailTime = value;
    }

    get tailPosX() {
        return this._tailPosX;
    }
    set tailPosX(value: IArc['_tailLineIndex']) {
        this._tailPosX = value;
    }

    get tailPosY() {
        return this._tailPosY;
    }
    set tailPosY(value: IArc['_tailLineLayer']) {
        this._tailPosY = value;
    }

    get tailDirection() {
        return this._tailDirection as IArc['_tailCutDirection'];
    }
    set tailDirection(value: IArc['_tailCutDirection']) {
        this._tailDirection = value;
    }

    get tailLengthMultiplier() {
        return this._tailLengthMultiplier;
    }
    set tailLengthMultiplier(value: IArc['_tailControlPointLengthMultiplier']) {
        this._tailLengthMultiplier = value;
    }

    get midAnchor() {
        return this._midAnchor;
    }
    set midAnchor(value: IArc['_sliderMidAnchorMode']) {
        this._midAnchor = value;
    }

    get customData(): NonNullable<IArc['_customData']> {
        return this._customData;
    }
    set customData(value: NonNullable<IArc['_customData']>) {
        this._customData = value;
    }
}
