export class Currency {
  constructor(
    public readonly id: string,
    public readonly externalId: string,
    public readonly iso4217Alpha3: string,
    public readonly name: string,
    public readonly symbol: string
  ) {}
}
