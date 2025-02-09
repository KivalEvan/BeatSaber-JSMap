/**
 * Return number in formatted number string.
 *
 * ```ts
 * console.log(formatNumber(12345678)); // 12,345,678
 * ```
 */
export function formatNumber(num: number): string {
   return num
      .toString()
      .split('.')
      .map((str, i) => (i ? str : str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')))
      .join('.');
}

/** Check if string is valid hexadecimal. */
export function isHex(hex: string): boolean {
   return /^[a-fA-F0-9]+$/g.test(hex);
}

/** Convert hexadecimal to decimal. */
export function hexToDec(hex: string): number {
   return parseInt(hex, 16);
}

/** Convert decimal to hexadecimal.*/
export function decToHex(val: number): string {
   const hex = val.toString(16);
   return hex;
}

/** Bitmask boolean helper. */
export function hasFlag(val: number, flag: number): boolean {
   return (val & flag) === flag;
}
