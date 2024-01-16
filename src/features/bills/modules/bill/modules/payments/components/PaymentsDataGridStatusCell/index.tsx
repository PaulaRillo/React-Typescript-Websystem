import { Tag } from 'shared/components/Tag';
import { CellRenderProps } from 'shared/grids/DataGrid/types';

type Props = CellRenderProps;

export const PaymentsDataGridStatusCell = ({ data }: Props) => {
  const type = data.status.type;
  const title = data.status.title;

  return <Tag type={type} label={title} />;
};
