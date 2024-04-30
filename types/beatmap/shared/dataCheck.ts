import type { Version } from './version.ts';

interface DataCheckBase {
   readonly type: string | string[]; // string array because there'll soon be having to check both
   readonly version: Version;
   readonly array?: boolean;
   readonly optional?: boolean;
}

export interface DataCheckPrimitive extends DataCheckBase {
   readonly type: 'string' | 'boolean';
}

export interface DataCheckNumber extends DataCheckBase {
   readonly type: 'number';
   readonly int?: boolean;
   readonly unsigned?: boolean;
}

export interface DataCheckObject extends DataCheckBase {
   readonly type: 'object' | 'array';
   readonly check: { [key: string]: DataCheck };
}

export type DataCheck = DataCheckPrimitive | DataCheckNumber | DataCheckObject;

export interface IDataCheckOption {
   enabled?: boolean;
   throwError?: boolean;
}
