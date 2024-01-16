import { LoggedUserProps } from 'core.v2/domain/logged-user/types/logged-user.props';
import { LoggedUserMapperInterface } from './logged-user-mapper.interface';

export class LoggedUserMapper implements LoggedUserMapperInterface {
  toDomain(dto: any): LoggedUserProps {
    return {
      id: dto.username,
      name: dto.attributes.name,
      email: dto.attributes.email,
      sub: dto.attributes.sub
    };
  }
}
