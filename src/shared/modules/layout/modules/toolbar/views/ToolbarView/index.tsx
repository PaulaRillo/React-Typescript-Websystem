//material-ui
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Account } from '../../components/Account';
//translate
import { tr } from 'shared/translate';
//styles
import { path } from 'shared/constants/path';
import { useNav } from 'shared/hooks/useNav';
import { PaymentWizardPanelView } from 'shared/modules/PaymentWizardPanel';
import { SyncView } from '../../modules/Sync';
import * as styles from './styles';

export const ToolbarView = () => {
  const handleNavigate = useNav('data-path');

  return (
    <Box sx={styles.container}>
      <PaymentWizardPanelView />
      <Box sx={styles.actions}>
        <SyncView />
        <Tooltip arrow title={tr('app.toolbar.actions.settings')}>
          <IconButton
            aria-label={tr('app.toolbar.actions.settings')}
            color="primary"
            size="large"
            data-path={path.settings.root}
            onClick={handleNavigate}
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Account />
      </Box>
    </Box>
  );
};
