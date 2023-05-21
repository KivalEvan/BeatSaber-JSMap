import { IBPMChangeTime, IBPMTimeScale } from '../../types/beatmap/shared/custom/bpm.ts';
import {
    IBPMChange as IBPMChangeV2,
    IBPMChangeOld,
} from '../../types/beatmap/v2/custom/bpmChange.ts';
import { IBPMChange as IBPMChangeV3 } from '../../types/beatmap/v3/custom/bpmChange.ts';
import { IBPMEvent } from '../../types/beatmap/v3/bpmEvent.ts';
import { IWrapBPMEvent } from '../../types/beatmap/wrapper/bpmEvent.ts';

/** BPM class for various utility around adjusted beat time, JSON time, reaction time, etc. */
export class BeatPerMinute {
    private _bpm: number;
    private _bpmChange: IBPMChangeTime[];
    private _timeScale: IBPMTimeScale[];
    private _offset: number;

    constructor(
        bpm: number,
        bpmChange: (
            | IBPMChangeV2
            | IBPMChangeOld
            | IBPMChangeV3
            | IBPMEvent
            | IWrapBPMEvent
            | IBPMTimeScale
        )[] = [],
        offset: number = 0,
    ) {
        this._bpm = bpm;
        this._offset = offset / 1000;
        this._timeScale = this.getTimeScale(
            bpmChange.filter((bpmc) => {
                return ('m' in bpmc || 'bpm' in bpmc) && !('o' in bpmc);
            }) as IBPMEvent[],
        );
        this._bpmChange = this.getBpmChangeTime(
            bpmChange.filter(
                (bc) => (bc as IBPMChangeV2)._time != null || (bc as IBPMChangeV3).o != null,
            ) as (IBPMChangeV2 | IBPMChangeOld | IBPMChangeV3)[],
        );
    }

    /** Create and return an instance of BeatPerMinute class.
     * ```ts
     * const bpm = BeatPerMinute.create(bpm, bpmc, 0);
     * ```
     */
    static create = (
        bpm: number,
        bpmChange?: (IBPMChangeV2 | IBPMChangeOld | IBPMChangeV3 | IBPMEvent | IBPMTimeScale)[],
        offset?: number,
    ): BeatPerMinute => {
        return new BeatPerMinute(bpm, bpmChange, offset);
    };

    get value(): number {
        return this._bpm;
    }
    set value(val: number) {
        this._bpm = val;
    }
    get change(): IBPMChangeTime[] {
        return this._bpmChange;
    }
    set change(val: IBPMChangeTime[]) {
        this._bpmChange = val;
    }
    get timescale(): IBPMTimeScale[] {
        return this._timeScale;
    }
    set timescale(val: (IBPMTimeScale | IBPMEvent | IWrapBPMEvent)[]) {
        this._timeScale = this.getTimeScale(val);
    }
    get offset(): number {
        return this._offset * 1000;
    }
    set offset(val: number) {
        this._offset = val / 1000;
    }

    /** Create new BPM change object that allow time to be read according to editor.
     * ```ts
     * const newBpmChange = bpm.getBpmChangeTime(bpmc);
     * ```
     */
    private getBpmChangeTime(
        bpmc: (IBPMChangeV2 | IBPMChangeOld | IBPMChangeV3)[] = [],
    ): IBPMChangeTime[] {
        let temp!: IBPMChangeTime;
        const bpmChange: IBPMChangeTime[] = [];
        for (let i = 0; i < bpmc.length; i++) {
            const curBPMC: IBPMChangeTime = {
                time: (bpmc[i] as IBPMChangeV2)._time ?? (bpmc[i] as IBPMChangeV3).b,
                BPM: (bpmc[i] as IBPMChangeV2)._BPM ??
                    (bpmc[i] as IBPMChangeOld)._bpm ??
                    (bpmc[i] as IBPMChangeV3).m,
                beatsPerBar: (bpmc[i] as IBPMChangeV2)._beatsPerBar ?? (bpmc[i] as IBPMChangeV3).p,
                metronomeOffset: (bpmc[i] as IBPMChangeV2)._metronomeOffset ??
                    (bpmc[i] as IBPMChangeV3).o,
                newTime: 0,
            };
            if (temp) {
                curBPMC.newTime = Math.ceil(
                    ((curBPMC.time - temp.time) / this._bpm) * temp.BPM + temp.newTime - 0.01,
                );
            } else {
                curBPMC.newTime = Math.ceil(curBPMC.time - (this._offset * this._bpm) / 60 - 0.01);
            }
            bpmChange.push(curBPMC);
            temp = curBPMC;
        }
        return bpmChange;
    }

    /** Create new time scale object that adjust to real time.
     * ```ts
     * const newTimeScale = bpm.getTimeScale(bpmc);
     * ```
     */
    private getTimeScale(
        bpmc: (IBPMTimeScale | IBPMEvent | IWrapBPMEvent)[] = [],
    ): IBPMTimeScale[] {
        return bpmc.map((el) => {
            if ('scale' in el) return el;
            if ('bpm' in el) return { time: el.time, scale: this._bpm / el.bpm };
            return { time: el.b, scale: this._bpm / el.m };
        });
    }

    /** Adjust beat time by offset.
     * ```ts
     * const removedOffset = bpm.offsetBegone(beat);
     * ```
     */
    private offsetBegone(beat: number): number {
        return this.toBeatTime(this.toRealTime(beat, false) - this._offset);
    }

    /** Convert beat time to real-time in second.
     * ```ts
     * const realTime = bpm.toRealTime(beat);
     * ```
     */
    // this is stupid
    toRealTime(beat: number, timescale = true): number {
        if (!timescale) {
            return (beat / this._bpm) * 60;
        }
        let calculatedBeat = 0;
        for (let i = this._timeScale.length - 1; i >= 0; i--) {
            if (beat > this._timeScale[i].time) {
                calculatedBeat += (beat - this._timeScale[i].time) * this._timeScale[i].scale;
                beat = this._timeScale[i].time;
            }
        }
        return ((beat + calculatedBeat) / this._bpm) * 60;
    }

    /** Convert real-time in second to beat time.
     * ```ts
     * const beatTime = bpm.toBeatTime(rt);
     * ```
     */
    // this is stupid 2 electric boogaloo
    toBeatTime(seconds: number, timescale = false): number {
        if (!timescale) {
            return (seconds * this._bpm) / 60;
        }
        let calculatedSecond = 0;
        for (let i = this._timeScale.length - 1; i >= 0; i--) {
            const currentSeconds = this.toRealTime(this._timeScale[i].time);
            if (seconds > currentSeconds) {
                calculatedSecond += (seconds - currentSeconds) / this._timeScale[i].scale;
                seconds = currentSeconds;
            }
        }
        return this.toBeatTime(seconds + calculatedSecond);
    }

    /** Convert editor beat time to actual JSON time.
     * ```ts
     * const JsonTime = bpm.toJsonTime(beat);
     * ```
     */
    toJsonTime(beat: number): number {
        for (let i = this._bpmChange.length - 1; i >= 0; i--) {
            if (beat > this._bpmChange[i].newTime) {
                return (
                    ((beat - this._bpmChange[i].newTime) / this._bpmChange[i].BPM) * this._bpm +
                    this._bpmChange[i].time
                );
            }
        }
        return this.toBeatTime(this.toRealTime(beat, false) + this._offset);
    }

    /** Adjust beat time from BPM changes and offset.
     * ```ts
     * const adjustedBeat = bpm.adjustTime(beat);
     * ```
     */
    adjustTime(beat: number): number {
        for (let i = this._bpmChange.length - 1; i >= 0; i--) {
            if (beat > this._bpmChange[i].time) {
                return (
                    ((beat - this._bpmChange[i].time) / this._bpm) * this._bpmChange[i].BPM +
                    this._bpmChange[i].newTime
                );
            }
        }
        return this.offsetBegone(beat);
    }
}
