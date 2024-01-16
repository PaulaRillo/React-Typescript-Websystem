import { useMemo } from 'react';
//material-ui
import { Box, Popover as MuiPopover, PopoverProps } from '@mui/material';
import { StylesProps } from 'shared/types/styles-props';
//styles
import * as styles from './styles';

type Props = PopoverProps & {
  children: React.ReactNode | React.ReactNode[];
  sx?: StylesProps;
};

export const Popover = ({ children, sx, ...props }: Props) => {
  const stylesContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);

  return (
    <MuiPopover PaperProps={{ sx: styles.paper }} {...props}>
      <Box sx={stylesContainer}>{children}</Box>
    </MuiPopover>
  );
};

/*

  Example::

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      onClose={handleClose}
    >

    children

    </Popover>

*/
