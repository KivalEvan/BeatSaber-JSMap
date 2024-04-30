import type { IDifficulty } from '../../../types/beatmap/v1/difficulty.ts';
import type { IWrapBeatmapAttribute } from '../../../types/beatmap/wrapper/beatmap.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import type { IWrapEventAttribute } from '../../../types/beatmap/wrapper/event.ts';
import type { IWrapBPMEventAttribute } from '../../../types/beatmap/wrapper/bpmEvent.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import type { IWrapColorBoostEventAttribute } from '../../../types/beatmap/wrapper/colorBoostEvent.ts';
import { bombNote } from './bombNote.ts';
import { colorNote } from './colorNote.ts';
import { basicEvent } from './basicEvent.ts';
import { colorBoostEvent } from './colorBoostEvent.ts';
import { rotationEvent } from './rotationEvent.ts';
import { bpmEvent } from './bpmEvent.ts';
import { obstacle } from './obstacle.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';

export const difficulty: ISchemaContainer<IWrapBeatmapAttribute, IDifficulty> =
   {
      defaultValue: {
         _version: '1.5.0',
         _beatsPerMinute: 120,
         _beatsPerBar: 4,
         _shuffle: 0,
         _shufflePeriod: 0,
         _noteJumpSpeed: 0,
         _noteJumpStartBeatOffset: 0,
         _notes: [],
         _obstacles: [],
         _events: [],
         _time: 0,
         _BPMChanges: [],
         _bookmarks: [],
      },
      serialize(data: IWrapBeatmapAttribute): IDifficulty {
         return {
            _version: '1.5.0',
            _beatsPerMinute: data._deprData.beatsPerMinute as number,
            _beatsPerBar: data._deprData.beatsPerBar as number,
            _shuffle: data._deprData.shuffle as number,
            _shufflePeriod: data._deprData.shufflePeriod as number,
            _noteJumpSpeed: data._deprData.noteJumpSpeed as number,
            _noteJumpStartBeatOffset: data._deprData
               .noteJumpStartBeatOffset as number,
            _notes: [
               ...data.data.colorNotes.map(colorNote.serialize),
               ...data.data.bombNotes.map(bombNote.serialize),
            ],
            _obstacles: data.data.obstacles.map(obstacle.serialize),
            _events: [
               ...data.lightshow.basicEvents.map(basicEvent.serialize),
               ...data.lightshow.colorBoostEvents.map(
                  colorBoostEvent.serialize
               ),
               ...data.data.rotationEvents.map(rotationEvent.serialize),
               ...data.data.bpmEvents.map(bpmEvent.serialize),
            ],
            _time: data.customData._time,
            _BPMChanges: data.customData._BPMChanges,
            _bookmarks: data.customData._bookmarks,
         };
      },
      deserialize(
         data: DeepPartial<IDifficulty> = {}
      ): DeepPartial<IWrapBeatmapAttribute> {
         const colorNotes: Partial<IWrapColorNoteAttribute>[] = [];
         const bombNotes: Partial<IWrapBombNoteAttribute>[] = [];
         (data._notes ?? this.defaultValue._notes).forEach((obj) => {
            if (obj?._type === 3) {
               bombNotes.push(bombNote.deserialize(obj));
            } else {
               colorNotes.push(colorNote.deserialize(obj));
            }
         });

         const basicEvents: Partial<IWrapEventAttribute>[] = [];
         const colorBoostEvents: Partial<IWrapColorBoostEventAttribute>[] = [];
         const rotationEvents: Partial<IWrapRotationEventAttribute>[] = [];
         const bpmEvents: Partial<IWrapBPMEventAttribute>[] = [];
         (data._events ?? this.defaultValue._events).forEach((obj) => {
            switch (obj?._type) {
               case 5:
                  colorBoostEvents.push(colorBoostEvent.deserialize(obj));
                  break;
               case 14:
               case 15:
                  rotationEvents.push(rotationEvent.deserialize(obj));
                  break;
               case 100:
               case 10:
                  bpmEvents.push(bpmEvent.deserialize(obj));
                  break;
               default:
                  basicEvents.push(basicEvent.deserialize(obj));
            }
         });

         return {
            data: {
               colorNotes,
               bombNotes,
               obstacles: (data._obstacles ?? []).map(obstacle.deserialize),
               bpmEvents,
               rotationEvents,
               customData: {
                  _BPMChanges:
                     data._BPMChanges ?? this.defaultValue._BPMChanges,
                  _bookmarks: data._bookmarks ?? this.defaultValue._bookmarks,
                  _time: data._time ?? this.defaultValue._time,
               },
               _deprData: {
                  beatsPerMinute:
                     data._beatsPerMinute ?? this.defaultValue._beatsPerMinute,
                  beatsPerBar:
                     data._beatsPerBar ?? this.defaultValue._beatsPerBar,
                  shuffle: data._shuffle ?? this.defaultValue._shuffle,
                  shufflePeriod:
                     data._shufflePeriod ?? this.defaultValue._shufflePeriod,
                  noteJumpSpeed:
                     data._noteJumpSpeed ?? this.defaultValue._noteJumpSpeed,
                  noteJumpStartBeatOffset: data._noteJumpStartBeatOffset ?? 0,
               },
            },
            lightshow: {
               basicEvents,
               colorBoostEvents,
            },
         };
      },
      isValid(data: IWrapBeatmapAttribute): boolean {
         return (
            data.data.colorNotes.every(colorNote.isValid) &&
            data.data.bombNotes.every(bombNote.isValid) &&
            data.data.obstacles.every(obstacle.isValid) &&
            data.data.bpmEvents.every(bpmEvent.isValid) &&
            data.data.rotationEvents.every(rotationEvent.isValid) &&
            data.lightshow.basicEvents.every(basicEvent.isValid) &&
            data.lightshow.colorBoostEvents.every(colorBoostEvent.isValid)
         );
      },
      isChroma(_: IWrapBeatmapAttribute): boolean {
         return false;
      },
      isNoodleExtensions(_: IWrapBeatmapAttribute): boolean {
         return false;
      },
      isMappingExtensions(data: IWrapBeatmapAttribute): boolean {
         return (
            data.data.colorNotes.some(colorNote.isMappingExtensions) ||
            data.data.bombNotes.some(bombNote.isMappingExtensions) ||
            data.data.obstacles.some(obstacle.isMappingExtensions) ||
            data.data.bpmEvents.some(bpmEvent.isMappingExtensions) ||
            data.data.rotationEvents.some(rotationEvent.isMappingExtensions) ||
            data.lightshow.basicEvents.some(basicEvent.isMappingExtensions) ||
            data.lightshow.colorBoostEvents.some(
               colorBoostEvent.isMappingExtensions
            )
         );
      },
   };
