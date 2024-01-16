export const getValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, c) => acc && acc[c], obj);
};
