import { UserDTO } from './UserDTO';

export class User {
  private readonly _id: string;
  private readonly _username: string;
  private readonly _firstName: string;
  private readonly _middleName: string | null;
  private readonly _lastName: string;
  private readonly _email: string;
  private readonly _phoneNumber: string | null;

  constructor(input: UserDTO) {
    this._id = input.id;
    this._username = input.username;
    this._firstName = input.first_name;
    this._middleName = input.middle_name;
    this._lastName = input.last_name;
    this._email = input.email;
    this._phoneNumber = input.phone_number;
  }

  get id(): string {
    return this._id;
  }
  get username(): string {
    return this._username;
  }
  get firstName(): string {
    return this._firstName;
  }
  get middleName(): string {
    return this._middleName || '';
  }
  get lastName(): string {
    return this._lastName;
  }
  get email(): string {
    return this._email;
  }
  get phoneNumber(): string {
    return this._phoneNumber || '';
  }
}
