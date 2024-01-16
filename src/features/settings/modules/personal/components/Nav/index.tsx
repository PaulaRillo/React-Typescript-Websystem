//material-ui
import { PersonOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
//translate
import { tr } from 'shared/translate';
//core-components
import { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/constants/path';
import { useAppLocation } from 'shared/hooks/useAppLocation';
//styles
import * as styles from './styles';

export const Nav = () => {
  const { isActive } = useAppLocation();

  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (event: SyntheticEvent) => {
      navigate(event.currentTarget.getAttribute('data-path') as string);
    },
    [navigate]
  );

  return (
    <Box component="nav" sx={styles.aside}>
      <Button
        startIcon={<PersonOutlined />}
        size="large"
        sx={
          isActive('/settings/personal/info')
            ? styles.activeButton
            : styles.button
        }
        data-path={path.settings.personal.info}
        onClick={handleNavigate}
      >
        {tr('settings.personal.title')}
      </Button>
    </Box>
  );
};
