import type { UserMapperInterface } from './user-mapper.interface';

export class UserMapper implements UserMapperInterface {
  toDomain(userDTO: any) {
    return {
      id: userDTO.id?.toString(),
      accountId: userDTO.account_id?.toString(),
      username: userDTO.username?.toString(),
      email: userDTO.email?.toString(),
      phoneNumber: userDTO.phone_number?.toString(),
      firstName: userDTO.first_name?.toString(),
      middleName: userDTO.middle_name?.toString(),
      lastName: userDTO.last_name?.toString(),
      description: userDTO.description?.toString(),
      genderId: userDTO.gender_id?.toString(),
      statusId: userDTO.status_id?.toString(),
      countryCode: userDTO.country_code?.toString(),
      state: userDTO.state?.toString(),
      city: userDTO.city?.toString(),
      zipCode: userDTO.zip_code?.toString(),
      createdAt: userDTO.created_at?.toString(),
      updatedAt: userDTO.updated_at?.toString(),
      createdBy: userDTO.created_by?.toString(),
      updatedBy: userDTO.updated_by?.toString()
    };
  }
}
