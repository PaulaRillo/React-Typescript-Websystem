import { Box } from '@mui/material';
import { Tag } from 'shared/components/Tag';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';
import { tr } from 'shared/translate';

type Props = CellRenderProps;

type StatusCellType = {
  status: string;
  type: Partial<'info' | 'success' | 'warning' | 'error' | 'neutral'>;
};

const getStatus = (statusId: number): StatusCellType => {
  const Status: StatusCellType[] = [
    { status: tr('shared.unknown'), type: 'neutral' },
    { status: tr('shared.pending_settlement'), type: 'warning' },
    { status: tr('shared.settled'), type: 'success' },
    { status: tr('shared.declined'), type: 'error' },
    { status: tr('shared.authorized'), type: 'info' },
    { status: tr('shared.voided'), type: 'info' },
    { status: tr('shared.reversed'), type: 'info' },
    { status: tr('shared.refunded'), type: 'info' }
  ];

  return Status[statusId] || Status[0];
};

export const StatusCell = ({ value }: Props) => {
  const { status, type } = getStatus(value);

  return <Box sx={styles.container}>{<Tag label={status} type={type} />}</Box>;
};
