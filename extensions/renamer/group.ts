import { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';

const environmentGroup: { [env in EnvironmentAllName]?: { [key: number]: string } } = {
    WeaveEnvironment: {
        0: 'Outer Square Bottom Left Laser',
        1: 'Outer Square Bottom Right Laser',
        2: 'Outer Square Top Left Laser',
        3: 'Outer Square Top Right Laser',
        4: 'Inner Square Bottom Left Laser',
        5: 'Inner Square Bottom Right Laser',
        6: 'Inner Square Top Left Laser',
        7: 'Inner Square Top Right Laser',
        8: 'Side Square Bottom Left Laser',
        9: 'Side Square Bottom Right Laser',
        10: 'Side Square Top Left Laser',
        11: 'Side Square Top Right Laser',
        12: 'Distant Square Top Laser',
        13: 'Distant Square Bottom Laser',
        14: 'Distant Square Left Laser',
        15: 'Distant Square Right Laser',
    },
    PyroEnvironment: {
        0: 'Stage Left Platform',
        1: 'Stage Right Platform',
        2: 'Top Stage Left Laser',
        3: 'Top Stage Right Laser',
        4: 'Top Stage Middle Laser',
        5: 'Top Stage Light',
        6: 'Side Panels Left Tower',
        7: 'Side Panels Right Tower',
        8: 'Stage Left Laser',
        9: 'Stage Right Laser',
        10: 'Side Panels Left Laser',
        11: 'Side Panels Right Laser',
        12: 'Fire Left',
        13: 'Fire Right',
    },
    EDMEnvironment: {
        0: 'Circles Top',
        1: 'Circles Close',
        2: 'Circles Distant',
        3: 'Circles Distant 2',
        4: 'Single Source Circles Left',
        5: 'Single Source Circles Right',
        6: 'Single Source Lasers Left (Up)',
        7: 'Single Source Lasers Left (Out)',
        8: 'Single Source Lasers Right (Up)',
        9: 'Single Source Lasers Right (Out)',
        10: 'Single Source Lasers Left (Down)',
        11: 'Single Source Lasers Right (Down)',
        12: 'Single Source Lasers Left (Down) / Circle Rotations Top',
        13: 'Single Source Lasers Right (Up) / Circle Rotations Close',
        14: 'Circle Rotations Distant',
        15: 'Circle Rotations Distant 2',
        16: 'Circle Rotations Single Source Left',
        17: 'Circle Rotations Single Source Right',
    },
    TheSecondEnvironment: {
        0: 'Rings Big',
        1: 'Rings Small',
        2: 'Runway Left',
        3: 'Runway Right',
        4: 'Spotlight Left',
        5: 'Spotlight Right',
        6: 'Top Lasers Left Bottom',
        7: 'Top Lasers Right Bottom',
        8: 'Top Lasers Left Top',
        9: 'Top Lasers Right Top',
        10: 'Bottom Lasers Left Bottom',
        11: 'Bottom Lasers Right Bottom',
        12: 'Bottom Lasers Left Top',
        13: 'Bottom Lasers Right Top',
    },
    LizzoEnvironment: {
        0: 'Main Floor',
        1: 'Rainbow Arcs Inner',
        2: 'Rainbow Arcs 2',
        3: 'Rainbow Arcs 3',
        4: 'Rainbow Arcs 4',
        5: 'Rainbow Arcs Outer',
        6: 'Rainbow Rings Left',
        7: 'Rainbow Rings Right',
        8: 'Rainbow Rings Lasers Left',
        9: 'Rainbow Rings Lasers Right',
        10: 'Main Top Lasers',
        11: 'Environment Stands Left',
        12: 'Environment Stands Right',
        13: 'Environment Clouds Left',
        14: 'Environment Clouds Right',
        15: 'Main Left Lasers',
        16: 'Main Right Lasers',
        17: 'Environment Stand Lasers Left',
        18: 'Environment Stand Lasers Right',
        19: 'Rainbow Arcs Laser',
    },
    TheWeekndEnvironment: {
        0: 'Lamps Poles Left',
        1: 'Lamps Poles Right',
        2: 'Lamps Rings Left',
        3: 'Lamps Rings Right',
        4: 'Environment Arrows',
        5: 'Environment Side Lasers Left',
        6: 'Environment Side Lasers Right',
        7: 'Environment Runway Lane',
        8: 'Environment Center Ring',
        9: 'Environment Center Ring Lasers',
        10: 'Windows Left 1 Front',
        11: 'Windows Left 1 Side',
        12: 'Windows Left 2 Side',
        13: 'Windows Left 3 Front',
        14: 'Windows Left 3 Side',
        15: 'Windows Right 1 Front',
        16: 'Windows Right 1 Side',
        17: 'Windows Right 2 Side',
        18: 'Windows Right 3 Front',
        19: 'Windows Right 3 Side',
        20: 'Buildings Left',
        21: 'Buildings Right',
        22: 'Buildings Roof Left',
        23: 'Buildings Roof Right',
        29: 'Lamp Rings Left 1',
        30: 'Lamp Rings Left 2',
        31: 'Lamp Rings Left 3',
        32: 'Lamp Rings Left 4',
        33: 'Lamp Rings Right 1',
        34: 'Lamp Rings Right 2',
        35: 'Lamp Rings Right 3',
        36: 'Lamp Rings Right 4',
        37: 'Buildings Background Left',
        38: 'Buildings Background Right',
        40: 'Buildings Side Buildings',
    },
    RockMixtapeEnvironment: {
        0: 'Lasers Far Left',
        1: 'Lasers Far Right',
        2: 'Mountain 1',
        3: 'Mountain 2',
        4: 'Mountain 3',
        5: 'Mountain 4',
        6: 'Mountain 5',
        7: 'Mountain 6',
        8: 'Mountain 7',
        9: 'Mountain 8',
        10: 'Mountain 9',
        11: 'Mountain 10',
        12: 'Mountain 11',
        13: 'Mountain 12',
        14: 'Face Eyes',
        15: 'Runway Frets',
        16: 'Runway Strings',
        17: 'Runway Tunnel',
        18: 'Lasers Side Left',
        19: 'Lasers Side Right',
        20: 'Lasers Side Left Rotation',
        21: 'Lasers Side Right Rotation',
        22: 'Face Left',
        23: 'Face Right',
        24: 'Spikes Left',
        25: 'Spikes Left Movement',
        26: 'Spikes Right',
        27: 'Spikes Right Movement',
        28: 'Runway Dots',
        29: 'Face Movement',
        30: 'Runway Equilizer',
        31: 'Screens Left 1',
        32: 'Screens Left 2',
        33: 'Screens Right 1',
        34: 'Screens Right 2',
        35: 'Screens Left Movement',
        36: 'Screens Right Movement',
        37: 'Lasers Side Z Translation',
    },
    Dragons2Environment: {
        0: 'Small Rings (R/T)',
        1: 'Small Rings (Colors)',
        2: 'Underground',
        3: 'Big Rings',
        4: 'Top Spotlights',
        5: 'Runway Left',
        6: 'Runway Right',
        7: 'Particles Left',
        8: 'Particles Right',
        9: 'Main Lasers Bottom Left',
        10: 'Main Lasers Top Left',
        11: 'Main Lasers Top Right',
        12: 'Main Lasers Bottom Right',
    },
    Panic2Environment: {
        0: 'Left Cones Local',
        1: 'Right Cones Local',
        2: 'Left Cones Global',
        3: 'Right Cones Global',
        4: 'Center Cones Local',
        5: 'Center Cones Global',
        6: 'Diamond Rings Local Left',
        7: 'Diamond Rings Local Right',
        8: 'Diamond Rings Global',
        9: 'Lasers Bottom Left',
        10: 'Lasers Bottom Right',
        11: 'Lasers Top Left',
        12: 'Lasers Top Right',
        13: 'Runway Lasers Left',
        14: 'Runway Lasers Right',
        15: 'Runway Inner Laser',
        16: 'Spectrogram Left',
        17: 'Spectrogram Right',
        18: 'Runway Lasers Left Transform Z',
        19: 'Runway Lasers Right Transform Z',
        20: 'Window Left Pirces',
        21: 'Window Left Aura',
        22: 'Window Right Pieces',
        23: 'Window Right Aura',
    },
    QueenEnvironment: {
        0: 'Vinyls Left',
        1: 'Vinyl Left 1',
        2: 'Vinyl Left 2',
        3: 'Vinyl Left 3',
        4: 'Vinyl Left 4',
        5: 'Vinyls Right',
        6: 'Vinyl Right 1',
        7: 'Vinyl Right 2',
        8: 'Vinyl Right 3',
        9: 'Vinyl Right 4',
        10: 'Tunnel Rings Wrapper',
        11: 'Distant Circular Lasers Z',
        12: 'Distant Circular Lasers',
        13: 'Top Circular Lasers Rot Y',
        14: 'Top Circular Lasers',
        15: 'Platform Lane Left',
        16: 'Platform Lane Right',
        17: 'Silhouette Contour',
    },
};

export function eventGroupRename(id: number, environment?: EnvironmentAllName): string {
    return environmentGroup[environment!]?.[id] || 'Unknown';
}
