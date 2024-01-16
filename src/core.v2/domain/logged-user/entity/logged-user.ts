import { Entity } from '../../../../../src/core.v2/domain/@shared/entity/entity';
import { Role } from '../types/role';

export class LoggedUser extends Entity {
  private constructor(
    public id: string,
    public name: string,
    public email: string,
    public sub: string,
    public role: Role,
    public mfaEnabled: boolean
  ) {
    super();
    Object.freeze(this);
  }

  static instance: LoggedUser | undefined;
  static getInstance(
    id: string,
    name: string,
    email: string,
    sub: string,
    role: Role,
    mfaEnabled: boolean
  ) {
    if (!this.instance) {
      this.instance = new LoggedUser(id, name, email, sub, role, mfaEnabled);
    }
    return this.instance;
  }

  reset() {
    LoggedUser.instance = undefined;
  }
}
