import { Avatar } from 'shared/components/Avatar';
import { CellRenderProps } from 'shared/grids/DataGrid/types';

type Props = CellRenderProps;

export const HistoryDataGridUserCell = ({ data }: Props) => {
  const firstname = data.user.firstname;
  const lastname = data.user.lastname;

  return (
    <Avatar
      user={{ firstname, lastname }}
      fullName
      fullNameProps={{ variant: 'caption', fontWeight: 500 }}
    />
  );
};
