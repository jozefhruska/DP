export const getDeviceMemoryValue = (): string => {
  const power = Math.max(Math.floor(Math.random() * 5), 1);

  return (2 ** power).toString();
};
