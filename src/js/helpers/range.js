/**
 * Convert a percentage into a number between two values.
 *
 * @param {number} value - The raw value in percent
 * @param {number} min - The minimum value in the range
 * @param {number} max - The maximum value in the range
 * @returns {number} The number between two values
 */
export const getValueInRange = (value, min, max) => (value * (max - min) / 100) + min
