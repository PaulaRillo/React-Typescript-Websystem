import {
  Box,
  Skeleton,
  Stack,
  SxProps,
  Theme,
  Typography,
  TypographyProps
} from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { Breadcrumb, Crumb } from 'shared/components/Breadcrumb';
import { Spacer } from '../Spacer';
import * as styles from './styles';

type Props = {
  title: string;
  titleProps?: TypographyProps;
  subTitle?: string;
  crumbs?: Crumb[];
  hideCrumbs?: boolean;
  end?: ReactNode;
  sx?: SxProps<Theme>;
};

export const Header = ({
  title,
  titleProps,
  subTitle,
  crumbs,
  hideCrumbs,
  end,
  sx
}: Props) => {
  const stylesContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);

  return (
    <Box component="header" sx={stylesContainer}>
      {end && (
        <Stack direction="row">
          <Stack>
            <Box sx={styles.header}>
              <Box sx={styles.titleContainer}>
                <Typography variant="h1" sx={styles.title} {...titleProps}>
                  {title || <Skeleton width={200} height={40} />}
                </Typography>
                {subTitle && (
                  <Typography variant="body2" color="text.secondary">
                    {subTitle}
                  </Typography>
                )}
              </Box>
            </Box>
            {!hideCrumbs && <Breadcrumb here={title} crumbs={crumbs} />}
          </Stack>
          <Spacer />
          {end}
        </Stack>
      )}
      {!end && (
        <>
          <Typography variant="h1" sx={styles.title} {...titleProps}>
            {title || <Skeleton width={200} height={40} />}
          </Typography>
          {subTitle && (
            <Typography variant="body2" color="text.secondary">
              {subTitle}
            </Typography>
          )}
          {!hideCrumbs && <Breadcrumb here={title} crumbs={crumbs} />}
        </>
      )}
    </Box>
  );
};
