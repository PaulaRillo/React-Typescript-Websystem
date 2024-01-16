import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import { Vendor } from 'core.v2/domain/vendor/entity/vendor';
import { useCallback, useState } from 'react';
import { Info } from 'shared/components/Info';
import { Popover } from 'shared/components/Popover';
import { Spacer } from 'shared/components/Spacer';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const VendorsDataGridProjectCell = ({ value, data }: Props) => {
  const vendor: Vendor = data;
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
        <Box sx={styles.container}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Info title="Account name">
              <Typography variant="caption">
                {vendor?.project?.generalLedgerAccountName || ''}
              </Typography>
            </Info>
            <Info title="External ID">
              <Typography variant="caption">
                {vendor?.project?.externalId || ''}
              </Typography>
            </Info>
          </Box>
        </Box>
      </Popover>
      {value && (
        <Box sx={styles.cellContainer} onClick={handleOpen}>
          {value}
          <Spacer />
          <IconButton size="small">
            <InfoOutlinedIcon sx={{ color: 'grey.500' }} />
          </IconButton>
        </Box>
      )}
    </>
  );
};
