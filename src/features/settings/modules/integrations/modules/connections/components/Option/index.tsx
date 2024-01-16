import { Box, Button } from '@mui/material';
import { SyntheticEvent, useMemo } from 'react';
import * as styles from './styles';

type Props = {
  selected: boolean;
  children: React.ReactNode;
  ['data-option']: string;
  onClick: (e: SyntheticEvent) => void;
};

export const Option = ({
  selected,
  children,
  ['data-option']: option,
  onClick
}: Props) => {
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
      <Button
        data-option={option}
        sx={{ height: 'fit-content' }}
        onClick={onClick}
      >
        {children}
      </Button>
    </Box>
  );
};
