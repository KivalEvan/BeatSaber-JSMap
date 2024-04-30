import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IObstacle } from '../../../types/beatmap/v1/obstacle.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';
export const obstacle: ISchemaContainer<IWrapObstacleAttribute, IObstacle> = {
   defaultValue: {
      _time: 0,
      _type: 0,
      _lineIndex: 0,
      _width: 0,
      _duration: 0,
   } as Required<IObstacle>,
   serialize(data: IWrapObstacleAttribute): IObstacle {
      return {
         _time: data.time,
         _type: data.posY === 2 && data.height === 3
            ? 1
            : data.posY === 0 && data.height === 5
            ? 0
            : (data._deprData._type as number) ?? 0,
         _lineIndex: data.posX,
         _duration: data.duration,
         _width: data.width,
      };
   },
   // TODO: convert mapping extensions _type to respective pos Y and height
   deserialize(data: Partial<IObstacle> = {}): Partial<IWrapObstacleAttribute> {
      const type = data._type ?? this.defaultValue._type;
      return {
         time: data._time ?? this.defaultValue._time,
         posY: type === 1 ? 2 : 0,
         posX: data._lineIndex ?? this.defaultValue._lineIndex,
         duration: data._duration ?? this.defaultValue._duration,
         width: data._width ?? this.defaultValue._width,
         height: type === 1 ? 3 : 5,
         _deprData: {
            _isMappingExtensions: type !== 0 && type !== 1,
            _type: type,
         },
      };
   },
   isValid(_: IWrapObstacleAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapObstacleAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapObstacleAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapObstacleAttribute): boolean {
      return false;
   },
};
