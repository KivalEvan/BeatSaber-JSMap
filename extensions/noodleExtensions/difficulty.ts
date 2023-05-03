import { BombNote } from '../../beatmap/v3/bombNote.ts';
import { BurstSlider } from '../../beatmap/v3/burstSlider.ts';
import { ColorNote } from '../../beatmap/v3/colorNote.ts';
import { Obstacle } from '../../beatmap/v3/obstacle.ts';
import { Difficulty } from '../../beatmap/v3/difficulty.ts';
import { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import { IBurstSlider } from '../../types/beatmap/v3/burstSlider.ts';
import { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import { IObstacle } from '../../types/beatmap/v3/obstacle.ts';
import { IDifficulty } from '../../types/beatmap/v3/difficulty.ts';

export class NoodleDifficulty {
    fakeColorNotes: ColorNote[];
    fakeBombNotes: BombNote[];
    fakeObstacles: Obstacle[];
    fakeBurstSliders: BurstSlider[];
    readonly base;

    constructor(base: Difficulty) {
        this.base = base;
        this.fakeColorNotes = [];
        this.fakeBombNotes = [];
        this.fakeObstacles = [];
        this.fakeBurstSliders = [];
        if (base.customData.fakeColorNotes) {
            this.addFakeColorNotes(...base.customData.fakeColorNotes);
        }
        if (base.customData.fakeBombNotes) {
            this.addFakeBombNotes(...base.customData.fakeBombNotes);
        }
        if (base.customData.fakeBurstSliders) {
            this.addFakeBurstSliders(...base.customData.fakeBurstSliders);
        }
        if (base.customData.fakeObstacles) {
            this.addFakeObstacles(...base.customData.fakeObstacles);
        }
    }

    toJSON(): Required<IDifficulty> {
        this.base.customData.fakeColorNotes = this.fakeColorNotes.map((n) => n.toJSON());
        this.base.customData.fakeBombNotes = this.fakeBombNotes.map((b) => b.toJSON());
        this.base.customData.fakeBurstSliders = this.fakeBurstSliders.map((bs) => bs.toJSON());
        this.base.customData.fakeObstacles = this.fakeObstacles.map((o) => o.toJSON());
        return this.base.toJSON();
    }

    addFakeColorNotes = (...colorNotes: Partial<IColorNote>[]) => {
        colorNotes.forEach((cn) => {
            this.fakeColorNotes.push(new ColorNote(obj));
        });
    };
    addFakeBombNotes = (...bombNotes: Partial<IBombNote>[]) => {
        bombNotes.forEach((bn) => {
            this.fakeBombNotes.push(new BombNote(obj));
        });
    };
    addFakeObstacles = (...obstacles: Partial<IObstacle>[]) => {
        obstacles.forEach((o) => {
            this.fakeObstacles.push(new Obstacle(obj));
        });
    };
    addFakeBurstSliders = (...burstSliders: Partial<IBurstSlider>[]) => {
        burstSliders.forEach((bs) => {
            this.fakeBurstSliders.push(new BurstSlider(obj));
        });
    };
}
