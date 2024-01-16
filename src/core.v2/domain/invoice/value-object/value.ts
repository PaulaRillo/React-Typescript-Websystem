type Input = {
  raw: number;
  formatted: string;
};
export class Value {
  public readonly raw: number;
  public readonly formatted: string;

  constructor(input: Input) {
    this.raw = input.raw;
    this.formatted = input.formatted;
  }
}
