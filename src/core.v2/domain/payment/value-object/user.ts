export class User {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly username: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly firstName: string,
    public readonly middleName: string,
    public readonly lastName: string,
    public readonly genderId: number,
    public readonly countryCode: string,
    public readonly state: string,
    public readonly city: string,
    public readonly zipCode: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly createdBy: string,
    public readonly updatedBy: string
  ) { }
}
