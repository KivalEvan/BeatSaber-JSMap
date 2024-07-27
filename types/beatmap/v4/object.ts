import type { IItem } from './item.ts';

/**
 * Schema for v4 `Object`.
 */
export interface IObject extends IItem {
   /**
    * **Type:** `f32`
    */
   b?: number;
   /**
    * **Type:** `i32`
    */
   i?: number;
}

/**
 * Schema for v4 `Object Lane`.
 */
export interface IObjectLane extends IObject {
   /**
    * **Type:** `f32`
    */
   r?: number;
}

/**
 * Schema for v4 `Object Chain`.
 */
export interface IObjectChain extends IItem {
   /**
    * **Type:** `f32`
    */
   hb?: number;
   /**
    * **Type:** `f32`
    */
   hr?: number;
   /**
    * **Type:** `f32`
    */
   tb?: number;
   /**
    * **Type:** `f32`
    */
   tr?: number;
   /**
    * **Type:** `i32`
    */
   i?: number;
   /**
    * **Type:** `i32`
    */
   ci?: number;
}

/**
 * Schema for v4 `Object Arc`.
 */
export interface IObjectArc extends IItem {
   /**
    * **Type:** `f32`
    */
   hb?: number;
   /**
    * **Type:** `i32`
    */
   hi?: number;
   /**
    * **Type:** `f32`
    */
   hr?: number;
   /**
    * **Type:** `f32`
    */
   tb?: number;
   /**
    * **Type:** `i32`
    */
   ti?: number;
   /**
    * **Type:** `f32`
    */
   tr?: number;
   /**
    * **Type:** `i32`
    */
   ai?: number;
}
