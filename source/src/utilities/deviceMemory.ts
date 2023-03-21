export const getDeviceMemoryValue = ([min, max]: [
  number,
  number
]): string => {
  const power = Math.max(Math.floor(Math.random() * max), min);

  return (2 ** power).toString();
};
