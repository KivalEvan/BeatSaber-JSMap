/**
 * Contains version-specific mapping functions for the supported built-in beatmap versions.
 *
 * Built-in dispatch supports info v1/v2/v4, audio data v2/v4, difficulty v1/v2/v3/v4,
 * and lightshow v3/v4. Entries in the exported maps may be replaced with compatible
 * implementations when custom behavior is required.
 *
 * Replacements can introduce breaking changes or incompatible data.
 *
 * @module
 */

export * from './types/mod.ts';

export * from './compatibility.ts';
export * from './converter.ts';
export * from './deserialize.ts';
export * from './optimizer.ts';
export * from './serialize.ts';
export * from './validator.ts';
