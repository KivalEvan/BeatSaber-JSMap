import type { IWrapBeatmapSubset } from '../../types/beatmap/wrapper/beatmap.ts';
import { lerp, normalize } from '../../utils/math/helpers.ts';

type IScoreBeatmapSubset = IWrapBeatmapSubset<
   'colorNotes' | 'arcs' | 'chains',
   | 'time'
   | 'posX'
   | 'posY'
   | 'color'
   | 'tailTime'
   | 'tailPosX'
   | 'tailPosY'
   | 'sliceCount'
>;

/** Scoring type of note. */
export const enum ScoreType {
   NONE,
   NORMAL,
   ARC_HEAD,
   ARC_TAIL,
   CHAIN_HEAD,
   CHAIN_ELEMENT,
}

/** Score value given by each scoring type of note. */
export const ScoreValue: { readonly [key in ScoreType]: number } = {
   [ScoreType.NONE]: 0,
   [ScoreType.NORMAL]: 115,
   [ScoreType.ARC_HEAD]: 115,
   [ScoreType.ARC_TAIL]: 115,
   [ScoreType.CHAIN_HEAD]: 85,
   [ScoreType.CHAIN_ELEMENT]: 20,
};

/** Calculate max score from beatmap. */
export function calculateScore<T extends IScoreBeatmapSubset>(
   beatmap: T,
): number {
   let total = 0;
   let multiplier = 1;
   const elements = generateScoreElement(beatmap);
   for (let i = 0; i < elements.length; i++) {
      if (multiplier < 8 && i === -3 + multiplier * 4) {
         multiplier *= 2;
      }
      total += ScoreValue[elements[i].type] * multiplier;
   }
   return total;
}

function generateScoreElement<T extends IScoreBeatmapSubset>(beatmap: T) {
   return [
      createNoteElement(beatmap),
      createChainElement(beatmap.difficulty.chains),
   ]
      .flat()
      .sort((a, b) => a.time - b.time);
}

// for now I only care about arc head/tail and chain head, arc takes priority
// FIXME: use epsilon dammit
function createNoteElement<T extends IScoreBeatmapSubset>(beatmap: T) {
   const mapArcHead = new Map<number, T['difficulty']['arcs']>();
   const mapArcTail = new Map<number, T['difficulty']['arcs']>();
   const mapChainHead = new Map<number, T['difficulty']['chains']>();

   for (let i = 0; i < beatmap.difficulty.arcs.length; i++) {
      const arc = beatmap.difficulty.arcs[i];
      if (!mapArcHead.has(arc.time)) {
         mapArcHead.set(arc.time, []);
      }
      if (!mapArcTail.has(arc.tailTime)) {
         mapArcTail.set(arc.tailTime, []);
      }
      mapArcHead.get(arc.time)!.push(arc);
      mapArcTail.get(arc.tailTime)!.push(arc);
   }

   for (let i = 0; i < beatmap.difficulty.chains.length; i++) {
      const chain = beatmap.difficulty.chains[i];
      if (!mapChainHead.has(chain.time)) {
         mapChainHead.set(chain.time, []);
      }
      mapChainHead.get(chain.time)!.push(chain);
   }

   return beatmap.difficulty.colorNotes.map((n) => {
      const hasArc = mapArcHead
         .get(n.time)
         ?.some(
            (a) =>
               a.color === n.color &&
               a.tailPosX === n.posX &&
               a.tailPosY === n.posY,
         ) ||
         mapArcTail
            .get(n.time)
            ?.some(
               (a) =>
                  a.color === n.color &&
                  a.tailPosX === n.posX &&
                  a.tailPosY === n.posY,
            );
      if (hasArc) {
         return {
            type: ScoreType.ARC_HEAD,
            time: n.time,
         } as const;
      }

      const hasChain = mapChainHead
         .get(n.time)
         ?.some(
            (c) => c.color === n.color && c.posX === n.posX && c.posY === n.posY,
         );
      if (hasChain) {
         return {
            type: ScoreType.CHAIN_HEAD,
            time: n.time,
         } as const;
      }

      return {
         type: ScoreType.NORMAL,
         time: n.time,
      } as const;
   });
}

function createChainElement<
   T extends IScoreBeatmapSubset['difficulty']['chains'][number],
>(chains: T[]) {
   return chains.flatMap((c) => {
      if (c.sliceCount > 1) {
         return new Array(c.sliceCount - 1).map((_, i) => {
            return {
               type: ScoreType.CHAIN_ELEMENT,
               time: lerp(
                  normalize(i + 1, 0, c.sliceCount),
                  c.time,
                  c.tailTime,
               ),
            } as const;
         });
      }
      return [];
   });
}
