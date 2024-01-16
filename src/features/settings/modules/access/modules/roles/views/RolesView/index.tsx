import { Box } from '@mui/material';
import { tr } from 'shared/translate';
import { ModuleHeader } from 'features/settings/modules/shared/components/ModuleHeader';
import { RolesDataGrid } from '../../components/RolesDataGrid';
import { RolesProvider } from '../../context/RolesContext';
import { RoleModalView } from '../RoleModalView';
import * as styles from './styles';

export const RolesView = () => {
  return (
    <Box sx={styles.container}>
      <ModuleHeader
        title={tr('shared.roles')}
        description={tr('settings.access.roles.description')}
      />
      <RolesProvider>
        <RoleModalView />
        <RolesDataGrid />
      </RolesProvider>
    </Box>
  );
};

export default RolesView;
