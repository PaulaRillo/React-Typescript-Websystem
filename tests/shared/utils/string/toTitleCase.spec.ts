import { toTitleCase } from '../../../../src/shared/utils/string/toTitleCase';

describe('toTitleCase', () => {
  test('Should convert 2 lowercase words to titlecase', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
  });

  test('Should convert 1 lowercase word to titlecase', () => {
    expect(toTitleCase('hello')).toBe('Hello');
  });

  test('Should return empty string when value is undefined', () => {
    expect(toTitleCase(undefined)).toBe('');
  });

  test('Should return title case sentence', () => {
    expect(toTitleCase('lorem ipsum dolor summet')).toBe(
      'Lorem Ipsum Dolor Summet'
    );
  });
});
