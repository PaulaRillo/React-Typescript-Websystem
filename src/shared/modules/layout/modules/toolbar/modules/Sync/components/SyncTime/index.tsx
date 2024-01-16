import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Spacer } from 'shared/components/Spacer';
import { Tag } from 'shared/components/Tag';
import * as styles from './styles';

type Props = {
  title: string;
  date: string;
};

export const SyncTime = ({ title, date }: Props) => {
  const dateFormatted = useMemo(() => new Date(date).toLocaleString(), [date]);

  return (
    <Box sx={styles.container}>
      <Tag type="neutral" label={title} />
      <Spacer />
      <Typography variant="caption">{dateFormatted}</Typography>
    </Box>
  );
};
