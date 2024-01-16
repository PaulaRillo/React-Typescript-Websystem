export const isEmptyObject = (obj: object): boolean => {
  return JSON.stringify(obj) === '{}';
};
