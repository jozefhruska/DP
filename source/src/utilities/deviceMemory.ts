import { ALLOWED_DEVICE_MEMORY_VALUES } from '~/constants';

/**
 * Generates a random Device-Memory value within the provided range [min, max],
 * using the pre-defined range of allowed values.
 *
 * @param {[number, number]} minMax A tuple with two elements: the minimum and maximum allowed indices.
 * @returns {string} The randomly selected device memory value as a string.
 */
export const getDeviceMemoryValue = ([min, max]: [
  number,
  number
]): string => {
  const index = Math.max(Math.round(Math.random() * max), min);

  return ALLOWED_DEVICE_MEMORY_VALUES[index].toString();
};
