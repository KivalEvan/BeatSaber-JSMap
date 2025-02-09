import type { Vector3 } from '../../types/vector.ts';

/** Convert degrees to radians. */
export function radToDeg(rad: number): number {
   return rad * (180 / Math.PI);
}

/** Convert radians to degrees. */
export function degToRad(deg: number): number {
   return deg * (Math.PI / 180);
}

/**
 * Convert cartesian coordinates to spherical coordinates.
 *
 * Return `[radius, theta, phi]`.
 */
export function cartesianCoordToSphericalCoord(
   x: number,
   y: number,
   z: number,
): Vector3 {
   const radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
   return [
      radius,
      Math.acos(z / radius),
      (Math.atan2(y, x) + 2 * Math.PI) % (2 * Math.PI),
   ];
}

/**
 * Convert spherical coordinates to cartesian coordinates.
 *
 * Return `[x, y, z]`
 */
export function sphericalCoordToCartesianCoord(
   radius: number,
   theta: number,
   phi: number,
): Vector3 {
   return [
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta),
   ];
}

// thanks Top_Cat#1961
/**
 * Modulo function that can handle negative numbers.
 */
export function mod(x: number, m: number): number {
   if (m < 0) {
      m = -m;
   }
   const r = x % m;
   return r < 0 ? r + m : r;
}

/**
 * Get the shortest distance between two angles.
 */
export function shortRotDistance(a: number, b: number, m: number): number {
   return Math.min(mod(a - b, m), mod(b - a, m));
}
