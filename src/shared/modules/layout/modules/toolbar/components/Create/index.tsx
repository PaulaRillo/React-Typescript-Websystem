//material-ui
import { Button, IconButton, Tooltip } from '@mui/material';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
//resources
import { useState } from 'react';
//core-components
import { Popover } from 'shared/components/Popover';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';

export const Create = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const translate = {
    create: tr('app.toolbar.actions.create'),
    vendor: tr('shared.vendor')
  };
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Popover
        id="create.menu"
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: -72
        }}
        onClose={handleClose}
      >
        <Button
          data-testid="create-menu-item-01"
          startIcon={<StorefrontTwoToneIcon />}
          sx={styles.button}
        >
          {translate.vendor}
        </Button>
      </Popover>
      <Tooltip arrow title={translate.create}>
        <IconButton
          data-testid="create-button"
          aria-label={translate.create}
          aria-describedby="create-menu"
          color="primary"
          size="large"
          onClick={handleOpen}
        >
          <AddCircleTwoToneIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
