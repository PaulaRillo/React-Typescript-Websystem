import CloudSyncTwoToneIcon from '@mui/icons-material/CloudSyncTwoTone';
import SyncDisabledIcon from '@mui/icons-material/SyncDisabled';
import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Popover } from 'shared/components/Popover';
import { useConnectionStatus } from 'shared/hooks/useConnectionStatus';
import { tr } from 'shared/translate';
import { ConnectionStatus } from '../../components/ConnectionStatus';

export const SyncView = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { isStatusActive } = useConnectionStatus();

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
          vertical: 'bottom',
          horizontal: -280
        }}
        onClose={handleClose}
      >
        <ConnectionStatus />
      </Popover>
      <Tooltip arrow title={tr('shared.synchronize')}>
        <IconButton
          aria-label={tr('shared.synchronize')}
          color="primary"
          size="large"
          onClick={handleOpen}
        >
          {isStatusActive && <CloudSyncTwoToneIcon />}
          {!isStatusActive && <SyncDisabledIcon color="disabled" />}
        </IconButton>
      </Tooltip>
    </>
  );
};
