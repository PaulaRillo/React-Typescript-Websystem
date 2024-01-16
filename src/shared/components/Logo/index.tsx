import { Box } from '@mui/material';
import BillTallyLogo from 'shared/assets/logo.svg';
import { StylesProps } from 'shared/types/styles-props';
import * as styles from './styles';

type Props = {
  sx?: StylesProps;
};

export const Logo = ({ sx }: Props) => {
  const sxProps = { ...styles.logo, ...sx };
  return (
    <Box
      component="img"
      alt="BillTally logo"
      src={BillTallyLogo}
      sx={sxProps}
    />
  );
};
