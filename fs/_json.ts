// deno-lint-ignore-file no-explicit-any
import logger from '../logger.ts';
import fs from './main.ts';

function tag(name: string): string[] {
   return ['fs', name];
}

export function readJSONFile(path: string): Promise<Record<string, any>> {
   logger.tInfo(tag('readJSONFile'), `Async reading JSON file from ${path}`);
   return fs.readTextFile(path).then(JSON.parse);
}

export function readJSONFileSync(path: string): Record<string, any> {
   logger.tInfo(tag('readJSONFileSync'), `Sync reading JSON file from ${path}`);
   return JSON.parse(fs.readTextFileSync(path));
}

export function writeJSONFile(
   path: string,
   json: Record<string, unknown>,
   format?: number,
): Promise<void> {
   logger.tInfo(tag('writeJSONFile'), `Async writing JSON file to ${path}`);
   return fs.writeTextFile(path, JSON.stringify(json, null, format));
}

export function writeJSONFileSync(
   path: string,
   json: Record<string, unknown>,
   format?: number,
): void {
   logger.tInfo(tag('writeJSONFileSync'), `Sync writing JSON file to ${path}`);
   fs.writeTextFileSync(path, JSON.stringify(json, null, format));
}
