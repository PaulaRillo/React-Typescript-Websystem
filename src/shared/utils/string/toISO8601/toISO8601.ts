export const toISO8601 = (dataString: string): Date => {
  const dataParts = dataString.split(/[-T:+]/g);
  return new Date(
    Date.UTC(
      Number(dataParts[0]),
      Number(dataParts[1]) - 1,
      Number(dataParts[2]),
      Number(dataParts[3]),
      Number(dataParts[4]),
      Number(dataParts[5])
    )
  );
};
