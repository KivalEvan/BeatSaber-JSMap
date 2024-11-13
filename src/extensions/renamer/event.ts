import type { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';

/**
 * Record of Event Type to Name.
 */
export const genericTypeMap: { [key: number]: string } = {
   0: 'Back Lasers',
   1: 'Ring Lights',
   2: 'Left Lasers',
   3: 'Right Lasers',
   4: 'Center Lights',
   5: 'Boost Colors',
   6: 'Extra Left Lights',
   7: 'Extra Right Lights',
   8: 'Ring Rotation',
   9: 'Ring Zoom',
   10: 'Extra Left Lasers',
   11: 'Extra Right Lasers',
   12: 'Left Laser Speed',
   13: 'Right Laser Speed',
   14: 'Early Lane Rotation',
   15: 'Late Lane Rotation',
   16: 'Utility Event 1',
   17: 'Utility Event 2',
   18: 'Utility Event 3',
   19: 'Utility Event 4',
   40: 'Special Event 1',
   41: 'Special Event 2',
   42: 'Special Event 3',
   43: 'Special Event 4',
};

/**
 * Record of Environment to Type to Name.
 */
export const environmentTypeMap: {
   [env in EnvironmentAllName]?: { [key: number]: string };
} = {
   LinkinParkEnvironment: {
      0: 'Lane Light',
      1: 'Ceiling Lights',
      8: 'Laser Mode',
   },
   BTSEnvironment: {
      0: 'Door Light',
      1: 'Vertical Pillar Lights',
      8: 'Distant Tower Spin',
      9: 'Raise/Lower Pillars',
      40: 'BTS Event 1',
      41: 'BTS Event 2',
      42: 'BTS Event 3',
      43: 'BTS Event 4',
   },
   KaleidoscopeEnvironment: {
      0: 'Spike Tip Lights',
      1: 'Spike Mid Lights',
      2: 'Spike Left Lights',
      3: 'Spike Right Lights',
      4: 'Distant Lasers and Spike Top Lights',
   },
   InterscopeEnvironment: {
      0: 'Gate 1',
      1: 'Gate 2',
      2: 'Gate 3',
      3: 'Gate 4',
      4: 'Gate 5',
      6: 'Extra 1',
      7: 'Extra 2',
   },
   SkrillexEnvironment: {
      0: 'Logo',
      1: 'Top Lanes and 1st Ring Set',
      4: 'Bottom Lanes and 2nd Ring Set',
      6: 'Left Panel',
      7: 'Right Panel',
      12: 'Left Laser & Panel Speed',
      13: 'Right Laser & Panel Speed',
   },
   BillieEnvironment: {
      0: 'Water 4',
      1: 'Water 1',
      2: 'Left Sun Beams',
      3: 'Right Sun Beams',
      4: 'Sun',
      6: 'Water 2',
      7: 'Water 3',
      8: 'Toggle Rain',
      9: 'Sunbeam Mode',
      10: 'Left Bottom Lasers',
      11: 'Right Bottom Lasers',
      12: 'Left Sun Beams Speed',
      13: 'Right Sun Beams Speed',
   },
   HalloweenEnvironment: {
      0: 'Sky Lasers',
      1: 'Moon',
      4: 'Lane + Castle Interior',
   },
   GagaEnvironment: {
      0: 'Aurora 1',
      1: 'Aurora 2',
      2: 'Tower 1',
      3: 'Tower 2',
      4: 'Logo',
      6: 'Tower 3',
      7: 'Tower 4',
      10: 'Tower 5',
      11: 'Tower 6',
      14: 'Tower 1 Height',
      15: 'Tower 2 Height',
      16: 'Tower 3 Height',
      17: 'Tower 4 Height',
      18: 'Tower 5 Height',
      19: 'Tower 6 Height',
   },
   WeaveEnvironment: {
      4: 'Player Space',
   },
   PyroEnvironment: {
      0: 'Video Alpha',
      1: 'Logo',
      2: 'Left Projectors',
      3: 'Right Projectors',
      4: 'Platform',
      6: 'Ambient',
      40: 'Video Projection',
   },
   EDMEnvironment: {
      0: 'Lane Lights Bottom',
      1: 'Lane Lights Top',
      4: 'Player Space & Spectrogram',
   },
   TheSecondEnvironment: {
      0: 'Logo',
      1: 'Runway',
      2: 'Left Flags',
      3: 'Right Flags',
      4: 'Buildings',
   },
   LizzoEnvironment: {
      0: 'Runway Left',
      1: 'Runway Right',
      2: 'Left Ring',
      3: 'Right Ring',
      4: 'Top Square',
      6: 'Ambient',
      7: 'Cherry Left',
      8: 'Cherry Right',
      9: 'LI Sign',
      10: 'Z Left Sign',
      11: 'Z Right Sign',
      12: 'O Sign',
      16: 'Left Balloon Particles',
      17: 'Right Balloon Particles',
   },
   TheWeekndEnvironment: {
      0: 'Runway Left',
      1: 'Runway Right',
      6: 'Ambient',
   },
   RockMixtapeEnvironment: {
      3: 'BG Bloom',
      4: 'Aurora',
      6: 'Ambient',
   },
   Dragons2Environment: {
      0: 'Inner Laser Left',
      1: 'Inner Laser Right',
      2: 'Outer Laser Left',
      3: 'Outer Laser Right',
      4: 'Logo',
      6: 'Ambient',
   },
   Panic2Environment: {
      3: 'Ambient',
   },
   QueenEnvironment: {
      6: 'Ambient',
      40: 'Silhouettes',
   },
   LinkinPark2Environment: {
      3: 'Ambient',
      40: 'Logos',
      41: 'Floor Logos',
   },
   TheRollingStonesEnvironment: {
      6: 'Ambient',
      40: 'Logo',
   },
   LatticeEnvironment: {
      6: 'Ambient',
   },
   DaftPunkEnvironment: {
      6: 'Ambient',
      40: 'Helmet 01 Switch',
      41: 'Helmet 02 Switch',
      42: 'Helmet 01 Text',
      43: 'Helmet 02 Text',
   },
   HipHopEnvironment: {
      6: 'Ambient',
   },
   ColliderEnvironment: {
      6: 'Ambient',
   },
   BritneyEnvironment: {
      6: 'Ambient',
      8: 'Player Place',
      9: 'Dust Particles',
      12: 'Icons',
   },
   Monstercat2Environment: {
      6: 'Ambient',
      8: 'Player Place',
   },
};

/**
 * Safely retrieve the name of an event type.
 */
export function eventTypeRename(
   type: number,
   environment?: EnvironmentAllName,
): string {
   return (
      environmentTypeMap[environment!]?.[type] ||
      genericTypeMap[type] ||
      'Unknown'
   );
}
