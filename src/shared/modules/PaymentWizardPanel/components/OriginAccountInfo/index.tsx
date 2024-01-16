import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import { OriginAccount } from 'core.v2/domain/origin-account/entity/origin-account';
import { tr } from 'shared/translate';
import { useCallback, useState } from 'react';
import { Info } from 'shared/components/Info';
import { Popover } from 'shared/components/Popover';
import { useNumbers } from '../../../../hooks/useNumbers';
import * as styles from './styles';

type Props = {
  origin: OriginAccount;
};

export const OriginAccountInfo = ({ origin }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { displayTotal } = useNumbers();

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
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{ p: 0 }}
        onClose={handleClose}
      >
        <Box sx={styles.infoContainer}>
          <Typography variant="body2" sx={styles.title}>
            {origin.accountAlias}
          </Typography>
          <Box sx={styles.infos}>
            <Info title={tr('shared.bankName')}>
              <Typography variant="caption">{origin.bankName}</Typography>
            </Info>
            <Info title={tr('shared.balance')}>
              <Typography variant="caption">
                {`${origin.currencyCode} ${displayTotal(
                  origin.balanceInLocalCurrency
                )}`}
              </Typography>
            </Info>
          </Box>
        </Box>
      </Popover>
      <IconButton color="primary" sx={styles.button} onClick={handleOpen}>
        <KeyboardArrowRightOutlinedIcon />
      </IconButton>
    </>
  );
};
