export class OriginAccount {
  constructor(
    public readonly id: string,
    public readonly externalId: string,
    public readonly bankId: string,
    public readonly bankCode: string,
    public readonly redactedAccountNumber: string,
    public readonly accountName: string,
    public readonly countryId: string,
    public readonly countryExternalId: string,
    public readonly county: string,
    public readonly state: string,
    public readonly iban: string,
    public readonly zipCode: string,
    public readonly city: string,
    public readonly block: string,
    public readonly branch: string,
    public readonly street: string,
    public readonly currencyId: string,
    public readonly generalLedgerAccountId: string,
    public readonly generalLedgerAccountExternalId: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly createdBy: string,
    public readonly updatedBy: string
  ) { }
}
