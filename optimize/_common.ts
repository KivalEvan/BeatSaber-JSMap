export function tag(name: string): string[] {
   return ['optimize', name];
}

export function remapDedupe<T>(data: T[]): [T[], Map<number, number>] {
   const newData: string[] = [];
   const remapIdx = new Map<number, number>();
   for (let i = 0; i < data.length; i++) {
      const str = JSON.stringify(data[i]);
      let idx = newData.indexOf(str);
      if (idx === -1) {
         idx = newData.length;
         newData.push(str);
      }
      remapIdx.set(i, idx);
   }
   return [newData.map((d) => JSON.parse(d)), remapIdx];
}
