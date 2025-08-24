export interface IBaseOptions {
   /**
    * Resolved to absolute path when passed into IO function.
    * Remains unchanged in options.
    * ```ts
    * // CWD: C:\Users\user\Scripts
    * options.directory = '.\\Maps'; // C:\Users\user\Scripts\Maps
    * options.directory = 'C:\\Maps'; // C:\Maps
    * ```
    * **For Windows user:** use `\\` instead of `\` in input as it is an escape character.
    *
    * Overrides globals directory.
    */
   directory?: string;
}
