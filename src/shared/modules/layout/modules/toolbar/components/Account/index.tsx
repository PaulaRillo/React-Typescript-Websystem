//material-ui
import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  Tooltip,
  Typography
} from '@mui/material';
//styles
import * as styles from './styles';
//translate
import { tr } from 'shared/translate';

import core from 'core.v2';
import { LoggedUser } from 'core.v2/domain/logged-user/entity/logged-user';
import React, { useCallback, useEffect, useState } from 'react';
import { useSignOut } from 'shared/hooks/useSignOut';
import { PrivacyPolicy } from '../PrivacyPolicy';
import { TermsOfUse } from '../TermsOfUse';

export const Account = () => {
  const signOut = useSignOut();
  const [user, setUser] = useState<LoggedUser | undefined>(undefined);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    core.auth.getAuthUser().then((user) => {
      setUser(user.attributes);
    });
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip arrow title={user?.name || ''} placement="bottom-start">
        <Avatar sx={styles.avatar} onClick={handleOpen} />
      </Tooltip>
      <Menu
        onClose={handleClose}
        anchorEl={anchorEl}
        open={!!anchorEl}
        PaperProps={{
          elevation: 0,
          sx: styles.menu
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={styles.menuAvatar}>
          <Avatar />
          <Box>
            <Typography variant="body2" color="text.primary">
              {user?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Divider variant="fullWidth" light />
        <Box sx={styles.menuLogout}>
          <Button
            variant="outlined"
            size="small"
            sx={styles.signOutButton}
            onClick={handleSignOut}
          >
            <Typography>{tr('auth.signOut.button')}</Typography>
          </Button>
        </Box>
        <Divider variant="fullWidth" light />
        <Box sx={styles.menuFooter}>
          <PrivacyPolicy />
          <Divider orientation="vertical" flexItem light />
          <TermsOfUse />
        </Box>
      </Menu>
    </>
  );
};
