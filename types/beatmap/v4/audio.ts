export interface IAudio {
   version: '4.0.0';
   contentChecksum: string;
   content: IAudioContent;
}

export interface IAudioContent {
   songSampleCount: number; // int
   songFrequency: number; // int
   bpmData: IAudioBPM[];
   integratedLufs: number; // float
   lufsData: IAudioLUFS[];
}

export interface IAudioBPM {
   si: number; // int
   ei: number; // int
   sb: number; // float
   eb: number; // float
}

export interface IAudioLUFS {
   si: number; // int
   ei: number; // int
   l: number; // float
}
