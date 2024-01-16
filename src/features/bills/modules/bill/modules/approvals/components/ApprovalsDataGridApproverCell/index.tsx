import { Avatar } from 'shared/components/Avatar';
import { CellRenderProps } from 'shared/grids/DataGrid/types';

type Props = CellRenderProps;

export const ApprovalsDataGridApproverCell = ({ data }: Props) => {
  const firstname = data.approver.firstname;
  const lastname = data.approver.lastname;

  return (
    <Avatar
      user={{ firstname, lastname }}
      fullName
      fullNameProps={{ variant: 'caption', fontWeight: 500 }}
    />
  );
};
