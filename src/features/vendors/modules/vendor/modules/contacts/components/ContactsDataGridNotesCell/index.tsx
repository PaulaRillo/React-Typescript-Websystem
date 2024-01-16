import { Box, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { Popover } from 'shared/components/Popover';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const ContactsDataGridNotesCell = ({ value }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const moreThan20 = useMemo(() => value > 20, [value]);

  if (!value) {
    return <></>;
  }

  return (
    <>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        onClose={handleClose}
      >
        <Box sx={{ width: 240, p: 1 }}>
          <Typography variant="body2">{value}</Typography>
        </Box>
      </Popover>
      <Box
        sx={styles.container}
        onMouseOver={moreThan20 ? handleOpen : undefined}
      >
        <Typography noWrap variant="body2">
          {value}
        </Typography>
      </Box>
    </>
  );
};
