import { User } from '../entity/user';
import { UserFactoryProps } from './user-factory.props';

export class UserFactory {
  public static create(props: UserFactoryProps): User {
    return new User(
      props.id,
      props.accountId,
      props.username,
      props.email,
      props.phoneNumber,
      props.firstName,
      props.middleName,
      props.lastName,
      props.genderId,
      props.statusId,
      props.countryCode,
      props.state,
      props.city,
      props.description,
      props.zipCode
    );
  }
}
