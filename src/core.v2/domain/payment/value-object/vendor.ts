export class Vendor {
  constructor(
    public readonly id: string,
    public readonly externalId: string,
    public readonly visualId: string,
    public readonly tradeName: string,
    public readonly legalName: string
  ) { }
}
