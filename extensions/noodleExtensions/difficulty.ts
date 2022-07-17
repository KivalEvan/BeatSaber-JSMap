import { BombNote } from '../../beatmap/v3/bombNote.ts';
import { BurstSlider } from '../../beatmap/v3/burstSlider.ts';
import { ColorNote } from '../../beatmap/v3/colorNote.ts';
import { Obstacle } from '../../beatmap/v3/obstacle.ts';
import { DifficultyData } from '../../beatmap/v3/difficulty.ts';
import { IDifficultyData } from '../../types/beatmap/v3/difficulty.ts';
import { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import { IBurstSlider } from '../../types/beatmap/v3/burstSlider.ts';
import { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import { IObstacle } from '../../types/beatmap/v3/obstacle.ts';

export class NoodleDifficultyData extends DifficultyData {
    fakeColorNotes: ColorNote[];
    fakeBombNotes: BombNote[];
    fakeObstacles: Obstacle[];
    fakeBurstSliders: BurstSlider[];

    constructor(data: Required<IDifficultyData>) {
        super(data);
        this.fakeColorNotes = [];
        this.fakeBombNotes = [];
        this.fakeObstacles = [];
        this.fakeBurstSliders = [];
        if (data.customData.fakeColorNotes) {
            this.addFakeColorNotes(...data.customData.fakeColorNotes);
        }
        if (data.customData.fakeBombNotes) {
            this.addFakeBombNotes(...data.customData.fakeBombNotes);
        }
        if (data.customData.fakeBurstSliders) {
            this.addFakeBurstSliders(...data.customData.fakeBurstSliders);
        }
        if (data.customData.fakeObstacles) {
            this.addFakeObstacles(...data.customData.fakeObstacles);
        }
    }

    static create(data: Partial<IDifficultyData>): NoodleDifficultyData {
        return new this({
            version: data.version || '3.0.0',
            bpmEvents: data.bpmEvents ?? [],
            rotationEvents: data.rotationEvents ?? [],
            colorNotes: data.colorNotes ?? [],
            bombNotes: data.bombNotes ?? [],
            obstacles: data.obstacles ?? [],
            sliders: data.sliders ?? [],
            burstSliders: data.burstSliders ?? [],
            waypoints: data.waypoints ?? [],
            basicBeatmapEvents: data.basicBeatmapEvents ?? [],
            colorBoostBeatmapEvents: data.colorBoostBeatmapEvents ?? [],
            lightColorEventBoxGroups: data.lightColorEventBoxGroups ?? [],
            lightRotationEventBoxGroups: data.lightRotationEventBoxGroups ?? [],
            basicEventTypesWithKeywords: data.basicEventTypesWithKeywords ?? {
                d: [],
            },
            useNormalEventsAsCompatibleEvents: data.useNormalEventsAsCompatibleEvents ?? false,
            customData: data.customData ?? {},
        });
    }

    static use(data: DifficultyData): NoodleDifficultyData {
        return new this(data.toObject()).setFileName(data.fileName);
    }

    toObject(): Required<IDifficultyData> {
        const obj = super.toObject();
        obj.customData.fakeColorNotes = this.fakeColorNotes.map((n) => n.toObject());
        obj.customData.fakeBombNotes = this.fakeBombNotes.map((b) => b.toObject());
        obj.customData.fakeBurstSliders = this.fakeBurstSliders.map((bs) => bs.toObject());
        obj.customData.fakeObstacles = this.fakeObstacles.map((o) => o.toObject());
        return obj;
    }

    addFakeColorNotes = (...colorNotes: Partial<IColorNote>[]) => {
        colorNotes.forEach((cn) => {
            this.fakeColorNotes.push(ColorNote.create(cn));
        });
    };
    addFakeBombNotes = (...bombNotes: Partial<IBombNote>[]) => {
        bombNotes.forEach((bn) => {
            this.fakeBombNotes.push(BombNote.create(bn));
        });
    };
    addFakeObstacles = (...obstacles: Partial<IObstacle>[]) => {
        obstacles.forEach((o) => {
            this.fakeObstacles.push(Obstacle.create(o));
        });
    };
    addFakeBurstSliders = (...burstSliders: Partial<IBurstSlider>[]) => {
        burstSliders.forEach((bs) => {
            this.fakeBurstSliders.push(BurstSlider.create(bs));
        });
    };
}
