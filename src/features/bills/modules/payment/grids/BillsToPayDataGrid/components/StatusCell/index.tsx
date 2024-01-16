import { Box } from '@mui/material';
import { Tag } from 'shared/components/Tag';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = CellRenderProps;

const translations: { [key: string]: string } = {
  open: tr('shared.open'),
  'open & printed': tr('shared.openPrinted')
};

export const StatusCell = ({ value }: Props) => {
  const translatedValue = translations[value?.toLowerCase()] || value;

  return (
    <Box sx={styles.container}>
      <Tag label={translatedValue} type="info" />
    </Box>
  );
};
