/**
 * Converts file identifier to a number
 * @example
 * ```
 * // Returns 1
 * fileToNumber("a")
 *
 * // Returns 2
 * fileToNumber("b")
 * ```
 * @date 2022-11-23 - 6:16:34 p.m.
 *
 * @param {string} file - Chess board file letter
 * @returns {number} - Chess board file number
 */
export const fileToNumber = (file: string): number => file.charCodeAt(0) - 96;

/**
 * Converts file in number format to file letter
 * @example
 * ```
 * // Returns "a"
 * numberToFile(1)
 *
 * // Returns "b"
 * numberToFile(2)
 * ```
 * @date 2022-11-23 - 6:18:25 p.m.
 *
 * @param {number} numberFile - Chess board file number
 * @returns {string} - Chess board file letter
 */
export const numberToFile = (numberFile: number): string =>
  String.fromCharCode(numberFile + 96);

/**
 * Creates algebraic notation with rank and file
 * @example
 * ```
 * // Returns "a2"
 * createAlgebraic(2, "a")
 *
 * // Returns "a2"
 * createAlgebraic(2, 1)
 * ```
 * @date 2022-11-23 - 6:19:23 p.m.
 *
 * @param {number} rank - Chess board rank number
 * @param {(string | number)} file - Chess board file letter or number
 * @returns {string} - Chess board algebraic notation
 */
export const createAlgebraic = (
  rank: number,
  file: string | number
): string => {
  if (typeof file === "string") {
    return `${file}${rank}`;
  } else {
    return `${numberToFile(file)}${rank}`;
  }
};

/**
 * Creates algebraic interface from loop indices when looping over board matrix
 * @example
 * ```
 * for (let i = 0; i < board.matrix.length; i++){
 *   for (let j = 0; j < board.matrix[i].length; j++){
 *     // On first iteration, returns { rank: 8, file: "a" }
 *     indexToAlgebraic(i, j)
 *   }
 * }
 * ```
 * @date 2022-11-23 - 6:21:03 p.m.
 *
 * @param {number} i - Outer loop index
 * @param {number} j - Inner loop index
 * @returns {IAlgebraic} - Object containing rank number and file letter
 */
export const indexToAlgebraic = (i: number, j: number): IAlgebraic => {
  return {
    rank: 8 - i,
    file: String.fromCharCode(j + 97),
  };
};
