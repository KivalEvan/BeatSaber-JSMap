import { WrapBaseSlider } from './baseSlider.ts';
import { NoteDirectionAngle } from '../shared/constants.ts';
import { IWrapArc } from '../../types/beatmap/wrapper/arc.ts';
import { ModType } from '../../types/beatmap/shared/modCheck.ts';

/** Arc beatmap class object.
 *
 * Also known as arc.
 */
export abstract class WrapArc<T extends { [P in keyof T]: T[P] }> extends WrapBaseSlider<T>
    implements IWrapArc<T> {
    protected _lengthMultiplier!: IWrapArc['lengthMultiplier'];
    protected _tailLengthMultiplier!: IWrapArc['tailLengthMultiplier'];
    protected _tailDirection!: IWrapArc['tailDirection'];
    protected _midAnchor!: IWrapArc['midAnchor'];

    abstract get lengthMultiplier(): IWrapArc['lengthMultiplier'];
    abstract set lengthMultiplier(value: IWrapArc['lengthMultiplier']);
    abstract get tailLengthMultiplier(): IWrapArc['tailLengthMultiplier'];
    abstract set tailLengthMultiplier(value: IWrapArc['tailLengthMultiplier']);
    abstract get tailDirection(): IWrapArc['tailDirection'];
    abstract set tailDirection(value: IWrapArc['tailDirection']);
    abstract get midAnchor(): IWrapArc['midAnchor'];
    abstract set midAnchor(value: IWrapArc['midAnchor']);

    setLengthMultiplier(value: IWrapArc['lengthMultiplier']) {
        this.lengthMultiplier = value;
        return this;
    }
    setTailLengthMultiplier(value: IWrapArc['tailLengthMultiplier']) {
        this.tailLengthMultiplier = value;
        return this;
    }
    setTailDirection(value: IWrapArc['tailDirection']) {
        this.tailDirection = value;
        return this;
    }
    setMidAnchor(value: IWrapArc['midAnchor']) {
        this.midAnchor = value;
        return this;
    }

    mirror(flipColor = true) {
        switch (this.tailDirection) {
            case 2:
                this.tailDirection = 3;
                break;
            case 3:
                this.tailDirection = 2;
                break;
            case 6:
                this.tailDirection = 7;
                break;
            case 7:
                this.tailDirection = 6;
                break;
            case 4:
                this.tailDirection = 5;
                break;
            case 5:
                this.tailDirection = 4;
                break;
        }
        if (this.midAnchor) {
            this.midAnchor = this.midAnchor === 1 ? 2 : 1;
        }
        return super.mirror(flipColor);
    }

    getTailAngle(_type?: ModType) {
        return NoteDirectionAngle[this.tailDirection as keyof typeof NoteDirectionAngle] || 0;
    }

    isMappingExtensions() {
        return (
            this.posY > 2 ||
            this.posY < 0 ||
            this.posX <= -1000 ||
            this.posX >= 1000 ||
            (this.direction >= 1000 && this.direction <= 1360) ||
            (this.tailDirection >= 1000 && this.tailDirection <= 1360)
        );
    }

    isValid() {
        return !(
            this.isMappingExtensions() ||
            this.isInverse() ||
            this.posX < 0 ||
            this.posX > 3 ||
            this.tailPosX < 0 ||
            this.tailPosX > 3 ||
            (this.posX === this.tailPosX &&
                this.posY === this.tailPosY &&
                this.time === this.tailTime)
        );
    }
}
