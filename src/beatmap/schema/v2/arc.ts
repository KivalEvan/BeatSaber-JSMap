import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IArc } from '../../../types/beatmap/v2/arc.ts';
import type { IWrapArc } from '../../../types/beatmap/wrapper/arc.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createArc } from '../../core/arc.ts';

/**
 * Schema serialization for v2 `Arc`.
 */
export const arc: ISchemaContainer<IWrapArc, IArc> = {
   serialize(data) {
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
   },
   deserialize(data) {
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
   },
};
