/**
 * FS shims interface for use in `read` and `write`.
 */
export interface IShimsFileSystem {
   /**
    * Asynchronously read text file.
    */
   readTextFile: (path: string) => Promise<string>;
   /**
    * Synchronously read text file.
    */
   readTextFileSync: (path: string) => string;
   /**
    * Asynchronously write text file.
    */
   writeTextFile: (path: string, content: string) => Promise<void>;
   /**
    * Synchronously write text file.
    */
   writeTextFileSync: (path: string, content: string) => void;
}

/**
 * Path shims interface for use in `read` and `write`.
 */
export interface IShimsPath {
   /**
    * Resolve path segments.
    */
   resolve: (...pathSegments: string[]) => string;
   /**
    * Get basename of string path.
    */
   basename: (path: string, suffix?: string) => string;
}
