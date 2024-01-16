import { useMemo } from 'react';
//material-ui
import { Box, Typography } from '@mui/material';
//core-components
import { Section } from 'features/settings/modules/shared/components/Section';
//translate
import { tr } from 'shared/translate';
//styles
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
import * as styles from './styles';

export const CompanyDetailsView = () => {
  const { data } = useGetTenantSettings();
  const address = data?.address?.replace(/\r/g, ', ');

  const aboutCompany = useMemo(() => {
    return [
      {
        title: tr('shared.name'),
        description: data?.companyName
      },
      {
        title: tr('shared.header'),
        description: data?.header
      },
      {
        title: tr('shared.address'),
        description: address
      },
      {
        title: tr('shared.state.province'),
        description: data?.state
      },
      {
        title: tr('shared.country'),
        description: data?.countryExternalCode
      }
    ];
  }, [
    address,
    data?.companyName,
    data?.countryExternalCode,
    data?.header,
    data?.state
  ]);

  const contactCompany = useMemo(() => {
    return [
      {
        title: tr('settings.section.item.email'),
        description: data?.primaryEmail
      },
      {
        title: tr('settings.section.item.phone'),
        description: data?.primaryPhoneNumber1
      },
      {
        title: tr('settings.section.item.phone2'),
        description: data?.primaryPhoneNumber2
      }
    ];
  }, [data]);

  return (
    <Box>
      <Box component="header" sx={styles.title}>
        <Typography variant="h5">{tr('settings.company.title')}</Typography>
        <Typography color="text.secondary">
          {tr('settings.company.information')}
        </Typography>
      </Box>
      <Section
        title={tr('settings.company.section.title')}
        subTitle={tr('settings.company.section.subtitle')}
      >
        {aboutCompany.map(({ title, description }) => {
          return (
            <Box key={title} sx={styles.container}>
              <Typography variant="overline" sx={styles.key}>
                {title}
              </Typography>
              <Typography variant="body2" sx={styles.value}>
                {description}
              </Typography>
            </Box>
          );
        })}
      </Section>
      <Section title={tr('settings.section.title.contact')}>
        {contactCompany.map(({ title, description }) => {
          return (
            <Box key={title} sx={styles.container}>
              <Typography variant="overline" sx={styles.key}>
                {title}
              </Typography>
              <Typography variant="body2" sx={styles.value}>
                {description}
              </Typography>
            </Box>
          );
        })}
      </Section>
    </Box>
  );
};
