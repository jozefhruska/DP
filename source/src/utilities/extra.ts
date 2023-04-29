/**
 * Generates a random UUID value for a custom Extra HTTP header.
 *
 * @returns {string} A randomly generated UUID as a string.
 */
export const getExtraValue = (): string => {
  return self.crypto.randomUUID();
};
