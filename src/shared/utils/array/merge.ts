export const merge = <T>(...arr: T[][]): T[] => {
  const cleaned = arr.filter(Boolean).flat();
  return cleaned.filter((item, index, self) => {
    const itemString = JSON.stringify(item);
    const itemIndex = self.findIndex((i) => JSON.stringify(i) === itemString);
    return itemIndex === index;
  });
};
