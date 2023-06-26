import { CharacteristicName } from '../../types/beatmap/shared/characteristic.ts';
import { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';
import { IWrapInfo } from '../../types/beatmap/wrapper/info.ts';
import { LANE_SIZE } from './constants.ts';

/** Convert grid lane size unit to unity unit */
export function gridToUnityUnit(value: number) {
   return value * LANE_SIZE;
}

/** Convert unity unit to grid lane size unit */
export function unityToGridUnit(value: number) {
   return value / LANE_SIZE;
}

export function currentEnvironment(
   info: IWrapInfo,
   characteristic?: CharacteristicName,
): EnvironmentAllName {
   if (characteristic === '360Degree' || characteristic === '90Degree') {
      return info.allDirectionsEnvironmentName;
   }
   return info.environmentName;
}
