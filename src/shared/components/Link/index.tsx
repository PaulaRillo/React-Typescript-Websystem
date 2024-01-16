import { Box, BoxProps } from '@mui/material';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';
import * as styles from './styles';

type Props = BoxProps & LinkProps;

export const Link = ({ sx, ...props }: Props) => {
  const sxProps = { ...styles.link, ...sx };
  return <Box component={ReactRouterLink} {...props} sx={sxProps} />;
};
