import { logger } from '../../logger.ts';
import type { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';
import type { IWrapBasicEventAttribute } from '../../types/beatmap/wrapper/basicEvent.ts';
import type { IWrapBeatmapAttributeSubset } from '../../types/beatmap/wrapper/beatmap.ts';
import type { ColorArray } from '../../types/colors.ts';
import { ColorScheme, EnvironmentSchemeName } from '../shared/colorScheme.ts';

function tag(name: string): string[] {
   return ['convert', name];
}

/**
 * Convert old Chroma color value to Chroma 2 custom data.
 * ```ts
 * const newData = convert.ogChromaToV2Chroma(oldData);
 * ```
 */
export function ogChromaToV2Chroma<
   T extends IWrapBeatmapAttributeSubset<'basicEvents'>,
>(data: T, environment: EnvironmentAllName = 'DefaultEnvironment'): T {
   logger.tInfo(
      tag('ogChromaToV2Chroma'),
      'Converting old Chroma event value to Chroma event customData',
   );
   const events: IWrapBasicEventAttribute[] = data.lightshow.basicEvents;
   const newEvents: IWrapBasicEventAttribute[] = [];
   const colorScheme = ColorScheme[EnvironmentSchemeName[environment]];
   const defaultLeftLight: ColorArray = [
      colorScheme._envColorLeft!.r,
      colorScheme._envColorLeft!.g,
      colorScheme._envColorLeft!.b,
   ];
   const defaultRightLight: ColorArray = [
      colorScheme._envColorRight!.r,
      colorScheme._envColorRight!.g,
      colorScheme._envColorRight!.b,
   ];
   const oldChromaColorConvert = (rgb: number): ColorArray => {
      rgb = rgb - 2000000000;
      const red = (rgb >> 16) & 0x0ff;
      const green = (rgb >> 8) & 0x0ff;
      const blue = rgb & 0x0ff;
      return [red / 255, green / 255, blue / 255];
   };
   const currentColor: { [key: number]: ColorArray | null } = {};
   for (const ev of events) {
      let noChromaColor = false;
      if (ev.value >= 2000000000) {
         currentColor[ev.type] = oldChromaColorConvert(ev.value);
      }
      if (!currentColor[ev.type]) {
         noChromaColor = true;
         currentColor[ev.type] = ev.value >= 1 && ev.value <= 4
            ? defaultRightLight
            : ev.value >= 5 && ev.value <= 8
            ? defaultLeftLight
            : [1, 1, 1];
      }
      if (ev.value === 4) {
         ev.value = 0;
      }
      if (ev.value !== 0 && !(ev.value >= 2000000000)) {
         if (ev.customData && !ev.customData._color) {
            ev.customData.color = currentColor[ev.type]!;
         }
         if (!ev.customData) {
            ev.customData = { color: currentColor[ev.type]! };
         }
      }
      if (!(ev.value >= 2000000000)) {
         newEvents.push(ev);
         if (noChromaColor) {
            currentColor[ev.type] = null;
         }
      }
   }
   data.lightshow.basicEvents = newEvents;

   return data;
}
