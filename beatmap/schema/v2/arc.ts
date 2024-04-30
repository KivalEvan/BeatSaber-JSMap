import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IArc } from '../../../types/beatmap/v2/arc.ts';
import type { IWrapArcAttribute } from '../../../types/beatmap/wrapper/arc.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const arc: ISchemaContainer<IWrapArcAttribute, IArc> = {
   defaultValue: {
      _colorType: 0,
      _headTime: 0,
      _headLineIndex: 0,
      _headLineLayer: 0,
      _headCutDirection: 0,
      _headControlPointLengthMultiplier: 0,
      _tailTime: 0,
      _tailLineIndex: 0,
      _tailLineLayer: 0,
      _tailCutDirection: 0,
      _tailControlPointLengthMultiplier: 0,
      _sliderMidAnchorMode: 0,
      _customData: {},
   } as Required<IArc>,
   serialize(data: IWrapArcAttribute): IArc {
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
   deserialize(data: Partial<IArc> = {}): Partial<IWrapArcAttribute> {
      return {
         color: data._colorType ?? this.defaultValue._colorType,
         time: data._headTime ?? this.defaultValue._headTime,
         posX: data._headLineIndex ?? this.defaultValue._headLineIndex,
         posY: data._headLineLayer ?? this.defaultValue._headLineLayer,
         direction: data._headCutDirection ?? this.defaultValue._headCutDirection,
         lengthMultiplier: data._headControlPointLengthMultiplier ??
            this.defaultValue._headControlPointLengthMultiplier,
         tailTime: data._tailTime ?? this.defaultValue._tailTime,
         tailPosX: data._tailLineIndex ?? this.defaultValue._tailLineIndex,
         tailPosY: data._tailLineLayer ?? this.defaultValue._tailLineLayer,
         tailDirection: data._tailCutDirection ?? this.defaultValue._tailCutDirection,
         tailLengthMultiplier: data._tailControlPointLengthMultiplier ??
            this.defaultValue._tailControlPointLengthMultiplier,
         midAnchor: data._sliderMidAnchorMode ?? this.defaultValue._sliderMidAnchorMode,
         customData: deepCopy(data._customData ?? this.defaultValue._customData),
      };
   },
   isValid(_: IWrapArcAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapArcAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapArcAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapArcAttribute): boolean {
      return false;
   },
};
