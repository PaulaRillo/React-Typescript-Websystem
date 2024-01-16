import { hasExpired } from './hasExpired';

describe('hasExpired', () => {
  test('should return false if expiresIn is undefined', () => {
    const input = {
      date: new Date('2023-01-01'),
      expiresIn: undefined
    } as any;
    const result = hasExpired(input);
    expect(result).toBe(false);
  });

  test('should return false if expiresIn is 0', () => {
    const input = {
      date: new Date('2023-01-01'),
      expiresIn: 0
    };
    const result = hasExpired(input);
    expect(result).toBe(false);
  });

  test('should return true if expiresIn is a negative value', () => {
    const input = {
      date: new Date('2022-01-01'),
      expiresIn: -60 // expires in the past
    };
    const result = hasExpired(input);
    expect(result).toBe(true);
  });

  test('should return true if expiresIn is NaN', () => {
    const input = {
      date: new Date('2022-01-01'),
      expiresIn: NaN // Not a Number
    };
    const result = hasExpired(input);
    expect(result).toBe(false);
  });

  test('should throw an error if expiresIn is not a number', () => {
    const input = {
      date: new Date('2023-01-01'),
      expiresIn: 'dede' // invalid type
    } as any;
    expect(() => {
      hasExpired(input);
    }).toThrow('expiresIn must be a number');
  });
});
