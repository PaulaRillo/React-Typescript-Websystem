import { Box, Typography } from '@mui/material';
import * as styles from '../PersonalRootView/styles';
import { tr } from 'shared/translate';
import { BasicInfoSection } from '../../components/BasicInfoSection';
import { ContactInfoSection } from '../../components/ContactInfoSection';
// import { ChangePasswordSection } from '../../components/ChangePasswordSection';
// import { GeneralPreferenceSection } from '../../components/GeneralPreferenceSection';
import { SecurityInfoSection } from '../../components/SecurityInfoSection';

import { useGetUserById } from 'shared/api/queries/useGetUserById';
import core from 'core.v2';

export const PersonalInfoView = () => {
  const { data } = useGetUserById(core.store.loggedUser?.id || '');
  return (
    <Box>
      <Box component="header" sx={styles.title}>
        <Typography variant="h5">{tr('settings.personal.title')}</Typography>
        <Typography color="text.secondary">
          {tr('settings.personal.subtitle')}
        </Typography>
      </Box>
      <BasicInfoSection user={data} />
      <ContactInfoSection user={data} />
      {/* <ChangePasswordSection /> */}
      {/* <GeneralPreferenceSection/> */}
      <SecurityInfoSection />
    </Box>
  );
};

export default PersonalInfoView;
