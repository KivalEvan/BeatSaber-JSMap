import type { GetPositionFn, MirrorFn } from '../../schema/shared/types/functions.ts';
import type { IWrapBaseSlider } from '../../schema/wrapper/types/baseSlider.ts';
import type { Vector2 } from '../../../types/vector.ts';
import { vectorAdd } from '../../../utils/math/vector.ts';
import { isInverseSlider } from '../../helpers/core/baseSlider.ts';
import { mirrorCoordinate, resolveGridPosition } from '../../helpers/core/gridObject.ts';
import { LINE_COUNT } from '../../misc/remaps.ts';
import { BaseNote } from './baseNote.ts';

/**
 * Base slider beatmap object.
 *
 * @abstract
 */
export abstract class BaseSlider extends BaseNote implements IWrapBaseSlider {
   tailTime: IWrapBaseSlider['tailTime'] = 0;
   tailPosX: IWrapBaseSlider['tailPosX'] = 0;
   tailPosY: IWrapBaseSlider['tailPosY'] = 0;
   tailLaneRotation: IWrapBaseSlider['tailLaneRotation'] = 0;

   setTailTime(value: this['tailTime']): this {
      this.tailTime = value;
      return this;
   }
   setTailPosX(value: this['tailPosX']): this {
      this.tailPosX = value;
      return this;
   }
   setTailPosY(value: this['tailPosY']): this {
      this.tailPosY = value;
      return this;
   }
   setTailLaneRotation(value: this['tailLaneRotation']): this {
      this.tailLaneRotation = value;
      return this;
   }

   override mirror(flipColor = true, fn?: MirrorFn<this>): this {
      fn?.(this);
      this.tailPosX = mirrorCoordinate(this.tailPosX, LINE_COUNT);
      return super.mirror(flipColor);
   }

   getTailPosition(fn?: GetPositionFn<this>): Vector2 {
      return fn?.(this) ??
         vectorAdd(resolveGridPosition({ posX: this.tailPosX, posY: this.tailPosY }), [-2]);
   }

   isInverse(): boolean {
      return isInverseSlider(this);
   }
}
