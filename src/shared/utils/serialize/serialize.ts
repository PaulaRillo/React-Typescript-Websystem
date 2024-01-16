export const serialize = (input: any): any => {
  return JSON.parse(JSON.stringify(input));
};
