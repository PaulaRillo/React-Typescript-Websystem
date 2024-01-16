import { useMemo } from 'react';
//material-ui
import { Box, Divider, Typography } from '@mui/material';
//core-components
import { Section } from 'features/settings/modules/shared/components/Section';
//translate
import { tr } from 'shared/translate';
//styles
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
import { useNumbers } from 'shared/hooks/useNumbers';
import * as styles from './styles';

export const GeneralView = () => {
  const { data } = useGetTenantSettings();
  const { n, displayDecimal } = useNumbers();

  const generatePreview = n('0');
  const amountsPreview = displayDecimal(
    generatePreview,
    data?.totalsAccuracyDigits ?? 0
  );

  const pricesPreview = displayDecimal(
    generatePreview,
    data?.pricesAccuracyDigits ?? 0
  );

  const ratesPreview = displayDecimal(
    generatePreview,
    data?.ratesAccuracyDigits ?? 0
  );

  const quantitiesPreview = displayDecimal(
    generatePreview,
    data?.quantitiesAccuracyDigits ?? 0
  );

  const percentPreview = displayDecimal(
    generatePreview,
    data?.percentagesAccuracyDigits ?? 0
  );

  const unitsPreview = displayDecimal(
    generatePreview,
    data?.measuringUnitsAccuracyDigits ?? 0
  );

  const decimalsPreview = displayDecimal(
    generatePreview,
    data?.queryAccuracyDigits ?? 0
  );

  const isRight = data?.displayCurrencyOnTheRight;
  const generalSettings = useMemo(() => {
    return [
      {
        title: tr('shared.amounts'),
        description: data?.totalsAccuracyDigits,
        preview: amountsPreview
      },
      {
        title: tr('shared.prices'),
        description: data?.pricesAccuracyDigits,
        preview: pricesPreview
      },
      {
        title: tr('shared.rates'),
        description: data?.ratesAccuracyDigits,
        preview: ratesPreview
      },
      {
        title: tr('shared.quantities'),
        description: data?.quantitiesAccuracyDigits,
        preview: quantitiesPreview
      },
      {
        title: tr('shared.percent'),
        description: data?.percentagesAccuracyDigits,
        preview: percentPreview
      },
      {
        title: tr('shared.units'),
        description: data?.measuringUnitsAccuracyDigits,
        preview: unitsPreview
      },
      {
        title: tr('shared.decimalsQuery'),
        description: data?.queryAccuracyDigits,
        preview: decimalsPreview
      },
      {
        title: tr('shared.decimalSeparator'),
        description: data?.decimalSeparator,
        preview: '0' + data?.decimalSeparator + '0'
      },
      {
        title: tr('shared.thousandsSeparator'),
        description: data?.thousandsSeparator,
        preview: '0' + data?.thousandsSeparator + '000'
      },
      {
        title: tr('shared.displayCurrency'),
        description: isRight ? tr('shared.right') : tr('shared.left'),
        preview: isRight
          ? '00' + data?.localCurrencyId
          : data?.localCurrencyId + '00'
      }
    ];
  }, [
    amountsPreview,
    decimalsPreview,
    isRight,
    percentPreview,
    pricesPreview,
    quantitiesPreview,
    ratesPreview,
    data?.decimalSeparator,
    data?.localCurrencyId,
    data?.measuringUnitsAccuracyDigits,
    data?.percentagesAccuracyDigits,
    data?.pricesAccuracyDigits,
    data?.quantitiesAccuracyDigits,
    data?.queryAccuracyDigits,
    data?.ratesAccuracyDigits,
    data?.thousandsSeparator,
    data?.totalsAccuracyDigits,
    unitsPreview
  ]);

  return (
    <Box sx={{ width: '100%', maxWidth: 480 }}>
      <Box component="header" sx={styles.title}>
        <Typography variant="h5">
          {tr('settings.company.general.title')}
        </Typography>
        <Typography color="text.secondary">
          {tr('settings.company.general.information')}
        </Typography>
      </Box>
      <Section
        title={tr('settings.company.general.section.title')}
        subTitle={tr('settings.company.general.subtitle')}
      >
        <Typography variant="subtitle2" sx={styles.subInfo}>
          {tr('settings.company.general.subInfo')}
        </Typography>
        {generalSettings.map(({ title, description, preview }) => {
          return (
            <Box key={title} sx={styles.container}>
              <Typography variant="overline" sx={styles.key}>
                {title}
              </Typography>
              <Divider orientation="vertical" flexItem light />
              <Typography variant="body2" sx={styles.value}>
                {description}
              </Typography>
              <Divider orientation="vertical" flexItem light />
              <Typography variant="body2" sx={styles.preview}>
                {preview}
              </Typography>
            </Box>
          );
        })}
      </Section>
    </Box>
  );
};
