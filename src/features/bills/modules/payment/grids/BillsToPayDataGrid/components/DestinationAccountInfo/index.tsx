import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import { VendorDestinationAccount } from 'core/domain/vendor/VendorDestinationAccount';
import { tr } from 'shared/translate';
import { useCallback, useState } from 'react';
import { Info } from 'shared/components/Info';
import { Popover } from 'shared/components/Popover';
import * as styles from './styles';

type Props = {
  destination: VendorDestinationAccount;
};

export const DestinationAccountInfo = ({ destination }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
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
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{ p: 0 }}
        onClose={handleClose}
      >
        <Box sx={styles.infoContainer}>
          <Typography variant="body2" sx={styles.title}>
            {destination.accountAlias}
          </Typography>
          <Box sx={styles.infos}>
            <Info title={tr('shared.bankName')}>
              <Typography variant="caption">{destination.bankName}</Typography>
            </Info>
            <Info title={tr('shared.currency')}>
              <Typography variant="caption">
                {destination.currencyCode}
              </Typography>
            </Info>
          </Box>
        </Box>
      </Popover>
      <IconButton color="primary" sx={styles.button} onClick={handleOpen}>
        <KeyboardArrowLeftOutlinedIcon />
      </IconButton>
    </>
  );
};
