import { Box } from '@mui/material';
import { SettingsNav } from '../../components/SettingsNav';
import { Content } from '../../components/Content';
import * as styles from './styles';

export const SettingsView = () => {
  return (
    <Box sx={styles.container}>
      <SettingsNav />
      <Content />
    </Box>
  );
};

export default SettingsView;
