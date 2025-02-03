import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IArc } from '../../../types/beatmap/v2/arc.ts';
import type { IWrapArcAttribute } from '../../../types/beatmap/wrapper/arc.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v2 `Arc`.
 */
export const arc: ISchemaContainer<IWrapArcAttribute, IArc> = {
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
      return {
         color: data._colorType ?? 0,
         time: data._headTime ?? 0,
         posX: data._headLineIndex ?? 0,
         posY: data._headLineLayer ?? 0,
         direction: data._headCutDirection ?? 0,
         lengthMultiplier: data._headControlPointLengthMultiplier ?? 0,
         laneRotation: 0,
         tailTime: data._tailTime ?? 0,
         tailPosX: data._tailLineIndex ?? 0,
         tailPosY: data._tailLineLayer ?? 0,
         tailDirection: data._tailCutDirection ?? 0,
         tailLengthMultiplier: data._tailControlPointLengthMultiplier ?? 0,
         tailLaneRotation: 0,
         midAnchor: data._sliderMidAnchorMode ?? 0,
         customData: data._customData ?? {},
      };
   },
};
