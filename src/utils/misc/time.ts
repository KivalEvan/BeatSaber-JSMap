/**
 * Convert number value of second to MM:SS string.
 */
export function secToMmss(seconds: number): string {
   if (!seconds) {
      return '0:00';
   }
   const numr = Math.floor(seconds);
   const temp = numr / 60;
   const min = temp < 0 ? `-${Math.ceil(temp).toString()}` : Math.floor(temp).toString();
   const sec = Math.abs(numr % 60)
      .toString()
      .padStart(2, '0');
   return `${min}:${sec}`;
}

/**
 * Convert number value of minute to HH:MM:SS string.
 */
export function minToHhmmss(minutes: number): string {
   if (!minutes) {
      return '0:00:00';
   }
   const sec = Math.abs(Math.round((minutes * 60) % 60))
      .toString()
      .padStart(2, '0');
   return `${secToMmss(minutes > 0 ? Math.floor(minutes) : Math.ceil(minutes))}:${sec}`;
}

/**
 * Convert number value of second to MM:SS.SSS string.
 */
export function secToMmssms(seconds: number): string {
   if (!seconds) {
      return '0:00.000';
   }
   const dec = (seconds % 1).toString().split('.')[1]?.padEnd(3, '0').slice(0, 3) || '000';
   return `${secToMmss(seconds > 0 ? Math.floor(seconds) : Math.ceil(seconds))}.${dec}`;
}

/**
 * Convert MM:SS string to number value of second.
 */
export function mmssToSec(mmss: string): number {
   const [m, s] = mmss.split(':').map((el) => Math.abs(parseInt(el)));
   const sign = mmss.trim().startsWith('-');
   return (sign ? -1 : 1) * (m * 60 + s);
}
