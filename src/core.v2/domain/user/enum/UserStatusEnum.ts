export enum UserStatusEnum {
  ACTIVE = '1',
  INACTIVE = '2',
  PENDING = '3'
}

export const UserStatusEnumLabels = {
  [UserStatusEnum.ACTIVE]: 'Active',
  [UserStatusEnum.INACTIVE]: 'Inactive',
  [UserStatusEnum.PENDING]: 'Pending'
};
