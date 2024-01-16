//material-ui
import { Box, Typography } from '@mui/material';
//core-components
import { Section } from 'features/settings/modules/shared/components/Section';
import { SectionItem } from 'features/settings/modules/shared/components/SectionItem';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';

export const ChangePasswordSection = () => {
  return (
    <Section
      title={tr('settings.section.title.password')}
      subTitle={tr('settings.section.subtitle.password')}
    >
      <>
        <SectionItem
          title={tr('settings.section.item.password')}
          description="*****************"
        />
        <Box sx={styles.footer}>
          <Typography variant="caption" color="text.secondary">
            Last changed Feb 21, 2022
          </Typography>
        </Box>
      </>
    </Section>
  );
};
