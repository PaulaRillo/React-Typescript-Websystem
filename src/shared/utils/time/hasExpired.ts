type HasExpired = {
  date: Date;
  expiresIn: number; // in minutes
};
/**
 * This function checks if a date has expired based on a given expiration time.
 * @param {Date} input.date - The date to check.
 * @param {number} input.expiresIn - The time in minutes to verify if already expired.
 * @returns {boolean}
 */
export const hasExpired = (input: HasExpired): boolean => {
  if (!input.date) {
    throw new Error('Missing required parameter: date');
  }
  if (!(input.date instanceof Date)) {
    throw new Error('date must be a Date');
  }
  if (!input.expiresIn) {
    return false;
  }
  if (isNaN(Number(input.expiresIn))) {
    throw new Error('expiresIn must be a number');
  }
  const now = new Date();
  const expiresIn = new Date(input.date.getTime() + Number(input.expiresIn) * 60 * 1000); //prettier-ignore

  return now.getTime() >= expiresIn.getTime();
};
