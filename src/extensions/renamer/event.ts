import type { EnvironmentName } from '../../beatmap/schema/shared/types/environment.ts';

/**
 * Record of Event Type to Name.
 */
export const genericTypeMap: { [key: number]: string } = {
   0: 'Accent Lights',
   1: 'Ring Lights',
   2: 'Left Lasers',
   3: 'Right Lasers',
   4: 'Primary Lights',
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
   [env in EnvironmentName]?: { [key: number]: string };
} = {
   DefaultEnvironment: {
      0: 'Under Track X',
      1: 'Big Ring Lights',
      4: 'Above Track X',
   },
   OriginsEnvironment: {
      0: 'Under Track X',
      2: 'Left Lasers and Left Lane Light',
      3: 'Right Lasers and Right Lane Light',
      4: 'Chevron',
   },
   TriangleEnvironment: {
      0: 'Under Track X',
      1: 'Big Ring Lights',
      4: 'Above Track X',
   },
   NiceEnvironment: {
      0: 'Under Track X',
      1: 'Big Ring Lights',
      2: 'Bottom Laser and Left Tower',
      3: 'Top Laser and Right Tower',
      4: 'Lane and Above Track X Lights',
   },
   BigMirrorEnvironment: {
      0: 'Above Track X',
      4: 'Lane and Under Track X Lights',
   },
   DragonsEnvironment: {
      0: 'Wide Lights',
      1: 'Close Lights',
      2: 'Left Lasers and Galaxy',
      3: 'Right Lasers and Galaxy',
      4: 'Lane Lights',
   },
   KDAEnvironment: {
      0: 'Under Track',
      1: 'Ceiling Lasers',
      3: 'Right Lasers and Lashers',
      4: 'Lane and Field Lights',
   },
   MonstercatEnvironment: {
      0: 'Under Track',
      1: 'Ceiling Lights',
      4: 'Lane and Wide Lights',
   },
   CrabRaveEnvironment: {
      0: 'Under Track',
      1: 'Ceiling Lights',
      4: 'Lane and Wide Lights',
   },
   PanicEnvironment: {
      0: 'Under Track X',
      1: 'Ring and Wide Lights',
      4: 'Lane and Window Lights',
   },
   RocketEnvironment: {
      0: 'Wide Goal and Ceiling Lights',
      1: 'Under Track Lights',
      4: 'Lane and Small Goal Lights',
   },
   GreenDayEnvironment: {
      0: 'Under Track Pillars',
      4: 'Lane Lights',
   },
   GreenDayGrenadeEnvironment: {
      0: 'Under Track Pillars',
      1: 'Area Lights',
      4: 'Lane and Grenade Lights',
   },
   TimbalandEnvironment: {
      0: 'Perpendicular External Ring Lasers',
      1: 'Internal Ring Lights',
      2: 'Left Parallel Ring Lights',
      3: 'Right Parallel Ring Lights',
      4: 'Lane and Chevron Lights',
   },
   FitBeatEnvironment: {
      0: 'Ring Emitter Lights',
      1: 'Large Woven Ring Lights',
      4: 'Chevron',
   },
   LinkinParkEnvironment: {
      0: 'Lane Lights',
      1: 'Ceiling Lights',
      2: 'Left Lasers and Lights',
      3: 'Right Lasers and Lights',
      4: 'LP Logo',
      8: 'Laser Mode',
   },
   BTSEnvironment: {
      0: 'Door Light',
      1: 'Vertical Pillar Lights',
      4: 'Lane Lights',
      8: 'Distant Tower Spin',
      9: 'Raise/Lower Pillars',
      40: 'BTS Character',
   },
   KaleidoscopeEnvironment: {
      0: 'Spike Tip Lights',
      1: 'Spike Mid Lights',
      2: 'Spike Left Lights',
      3: 'Spike Right Lights',
      4: 'Distant Lasers and Spike Top Lights',
   },
   InterscopeEnvironment: {
      0: 'Gate 4',
      1: 'Gate 1',
      2: 'Gate 3',
      3: 'Gate 2',
      4: 'Gate 5',
      6: 'Left Lasers',
      7: 'Right Lasers',
      8: 'Bounce Cars',
      9: 'Laser Mode',
      16: 'Lower Hydraulics',
      17: 'Raise Hydraulics',
   },
   SkrillexEnvironment: {
      0: 'Logo',
      1: 'Top Lanes and 1st Ring Set',
      4: 'Bottom Lanes and 2nd Ring Set',
      6: 'Left Panel',
      7: 'Right Panel',
      9: 'Laser Mode',
      12: 'Left Laser & Panel Speed',
      13: 'Right Laser & Panel Speed',
   },
   BillieEnvironment: {
      0: 'Water 4',
      1: 'Water 1',
      2: 'Left Sun Beams',
      3: 'Right Sun Beams',
      4: 'Sun',
      5: 'Moon + Boost Colors',
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
      2: 'Tower 3 Lights',
      3: 'Tower 4 Lights',
      4: 'Logo',
      6: 'Tower 2 Lights',
      7: 'Tower 5 Lights',
      10: 'Tower 1 Lights',
      11: 'Tower 6 Lights',
      12: 'Tower 3 Height',
      13: 'Tower 4 Height',
      16: 'Tower 2 Height',
      17: 'Tower 5 Height',
      18: 'Tower 1 Height',
      19: 'Tower 6 Height',
   },
   WeaveEnvironment: {
      4: 'Player Place',
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
      4: 'Player Place & Spectrogram',
   },
   TheSecondEnvironment: {
      0: 'Buildings',
      1: 'Logo',
      2: 'Left Flags',
      3: 'Right Flags',
      4: 'Runway',
      9: 'Ring Zoom',
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
   MetallicaEnvironment: {
      6: 'Ambient',
      8: 'Player Place',
      13: 'Pillar Switch',
   },
   Halloween2Environment: {
      0: 'Sky Lasers',
      1: 'Moon',
      2: 'Left Lasers',
      3: 'Right Lasers',
      4: 'Lane + Castle Interior',
      12: 'Left Laser Speed',
      13: 'Right Laser Speed',
   },
   GridEnvironment: {
      4: 'Player Place',
      6: 'Ambient',
   },
   ColdplayEnvironment: {
      6: 'Ambient',
      8: 'Player Place',
   },
};

/**
 * Safely retrieve the name of an event type.
 */
export function eventTypeRename(
   type: number,
   environment?: EnvironmentName,
): string {
   return (
      environmentTypeMap[environment!]?.[type] ||
      genericTypeMap[type] ||
      'Unknown'
   );
}
