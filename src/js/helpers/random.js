/**
 * Select one number between two values.
 *
 * @param {number} min - The minimum number
 * @param {number} max - The maximum number
 * @returns {number} The random number
 */
export const getRandomInt = (min, max) => Math.random() * (max - min + 1) + min
