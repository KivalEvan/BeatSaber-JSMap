import type { IArc } from '../../schema/v2/types/arc.ts';
import type { IWrapArc } from '../wrapper/types/arc.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createArc } from '../wrapper/arc.ts';

/** Serialize beatmap v2 `Arc` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeArc(data: IWrapArc): IArc {
   return {
      _colorType: data.color,
      _headTime: data.time,
      _headLineIndex: data.posX,
      _headLineLayer: data.posY,
      _headCutDirection: data.direction,
      _headControlPointLengthMultiplier: data.lengthMultiplier,
      _tailTime: data.tailTime,
      _tailLineIndex: data.tailPosX,
      _tailLineLayer: data.tailPosY,
      _tailCutDirection: data.tailDirection,
      _tailControlPointLengthMultiplier: data.tailLengthMultiplier,
      _sliderMidAnchorMode: data.midAnchor,
      _customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v2 `Arc` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeArc(data: IArc): IWrapArc {
   return createArc({
      color: data._colorType,
      time: data._headTime,
      posX: data._headLineIndex,
      posY: data._headLineLayer,
      direction: data._headCutDirection,
      lengthMultiplier: data._headControlPointLengthMultiplier,
      tailTime: data._tailTime,
      tailPosX: data._tailLineIndex,
      tailPosY: data._tailLineLayer,
      tailDirection: data._tailCutDirection,
      tailLengthMultiplier: data._tailControlPointLengthMultiplier,
      midAnchor: data._sliderMidAnchorMode,
      customData: data._customData,
   });
}
