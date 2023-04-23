import { ALLOWED_DEVICE_MEMORY_VALUES } from '~/constants';

export const getDeviceMemoryValue = ([min, max]: [
  number,
  number
]): string => {
  const index = Math.max(Math.round(Math.random() * max), min);

  return ALLOWED_DEVICE_MEMORY_VALUES[index].toString();
};
