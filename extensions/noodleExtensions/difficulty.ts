import { BombNote } from '../../beatmap/v3/bombNote.ts';
import { Chain } from '../../beatmap/v3/chain.ts';
import { ColorNote } from '../../beatmap/v3/colorNote.ts';
import { Obstacle } from '../../beatmap/v3/obstacle.ts';
import type { Difficulty } from '../../beatmap/v3/difficulty.ts';
import type { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import type { IChain } from '../../types/beatmap/v3/chain.ts';
import type { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import type { IObstacle } from '../../types/beatmap/v3/obstacle.ts';
import type { IWrapDifficulty } from '../../types/beatmap/wrapper/difficulty.ts';

export class NoodleDifficulty {
   fakeColorNotes: ColorNote[];
   fakeBombNotes: BombNote[];
   fakeObstacles: Obstacle[];
   fakeChains: Chain[];
   readonly base: IWrapDifficulty;

   constructor(base: Difficulty) {
      this.base = base;
      this.fakeColorNotes = [];
      this.fakeBombNotes = [];
      this.fakeObstacles = [];
      this.fakeChains = [];
      if (base.customData.fakeColorNotes) {
         this.addFakeColorNotes(...base.customData.fakeColorNotes);
      }
      if (base.customData.fakeBombNotes) {
         this.addFakeBombNotes(...base.customData.fakeBombNotes);
      }
      if (base.customData.fakeChains) {
         this.addFakeChains(...base.customData.fakeChains);
      }
      if (base.customData.fakeObstacles) {
         this.addFakeObstacles(...base.customData.fakeObstacles);
      }
   }

   // deno-lint-ignore no-explicit-any
   toJSON(): Required<Record<string, any>> {
      this.base.customData.fakeColorNotes = this.fakeColorNotes.map((n) => n.toJSON());
      this.base.customData.fakeBombNotes = this.fakeBombNotes.map((b) => b.toJSON());
      this.base.customData.fakeChains = this.fakeChains.map((bs) => bs.toJSON());
      this.base.customData.fakeObstacles = this.fakeObstacles.map((o) => o.toJSON());
      return this.base.toJSON();
   }

   addFakeColorNotes = (...colorNotes: Partial<IColorNote>[]) => {
      colorNotes.forEach((obj) => {
         this.fakeColorNotes.push(new ColorNote(obj));
      });
   };
   addFakeBombNotes = (...bombNotes: Partial<IBombNote>[]) => {
      bombNotes.forEach((obj) => {
         this.fakeBombNotes.push(new BombNote(obj));
      });
   };
   addFakeObstacles = (...obstacles: Partial<IObstacle>[]) => {
      obstacles.forEach((obj) => {
         this.fakeObstacles.push(new Obstacle(obj));
      });
   };
   addFakeChains = (...chains: Partial<IChain>[]) => {
      chains.forEach((obj) => {
         this.fakeChains.push(new Chain(obj));
      });
   };
}
