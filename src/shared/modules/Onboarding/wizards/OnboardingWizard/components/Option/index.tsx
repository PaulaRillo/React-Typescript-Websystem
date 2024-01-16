import { Box, Button } from '@mui/material';
import { useMemo } from 'react';
import * as styles from './styles';

type Props = {
  selected: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Option = ({ selected, children, onClick }: Props) => {
  const optionStyle = useMemo(
    () => ({
      ...styles.option,
      ...(selected
        ? { borderColor: 'primary.main' }
        : { borderColor: 'grey.100' })
    }),
    [selected]
  );
  return (
    <Box sx={optionStyle}>
      <Button sx={{ height: 'fit-content' }} onClick={onClick}>
        {children}
      </Button>
    </Box>
  );
};
