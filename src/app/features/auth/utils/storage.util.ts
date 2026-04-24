export const getBoolean = (key: string): boolean => {
  return sessionStorage.getItem(key) === 'true';
};

export const setBoolean = (key: string, value: boolean): void => {
  sessionStorage.setItem(key, String(value));
};
