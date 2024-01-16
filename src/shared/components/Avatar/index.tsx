import {
  Avatar as MuiAvatar,
  Box,
  BoxProps,
  SxProps,
  Theme,
  Typography,
  TypographyProps
} from '@mui/material';
import { forwardRef, useMemo } from 'react';
import * as styles from './styles';

type Props = {
  user: {
    firstname: string;
    lastname: string;
  };
  fullName?: boolean;
  fullNameProps?: TypographyProps;
  sx?: SxProps<Theme>;
};

export const Avatar = forwardRef<BoxProps, Props>(function Avatar(
  { user, fullName, sx, fullNameProps, ...props },
  ref
) {
  const firstnameInitial = user.firstname ? user.firstname[0] : '';
  const lastnameInitial = user.lastname ? user.lastname[0] : '';

  const stylesAvatar = useMemo(() => ({ ...styles.avatar, ...sx }), [sx]);

  return (
    <Box {...props} ref={ref} sx={styles.container}>
      <MuiAvatar sx={stylesAvatar}>
        <Typography variant="caption" sx={styles.initials}>
          {`${firstnameInitial}${lastnameInitial}`}
        </Typography>
      </MuiAvatar>
      {fullName && (
        <Typography variant="body2" {...fullNameProps}>
          {`${user.firstname} ${user.lastname}`}
        </Typography>
      )}
    </Box>
  );
});
