import { tr } from 'shared/translate';
import { useEffect, useState } from 'react';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
import { GlobalErrorPage } from 'shared/components/GlobalErrorPage';
import { GlobalLoader } from 'shared/components/GlobalLoader';
import * as yup from 'yup';

type Props = {
  redirectTo?: string;
  children: JSX.Element;
};

export const TenantSettingsVerify = ({ children }: Props) => {
  const [isValid, setIsValid] = useState(true);
  const { data, isLoading, isError } = useGetTenantSettings();

  const tenantSettingsSchema = yup.object().shape({
    totalsAccuracyDigits: yup.number().required(),
    quantitiesAccuracyDigits: yup.number().required(),
    ratesAccuracyDigits: yup.number().required(),
    percentagesAccuracyDigits: yup.number().required(),
    measuringUnitsAccuracyDigits: yup.number().required(),
    queryAccuracyDigits: yup.number().required(),
    decimalSeparator: yup.string().required(),
    thousandsSeparator: yup.string().required(),
    displayCurrencyOnTheRight: yup.boolean().required(),
    roundingMethod: yup.boolean().required(),
    localCurrencyId: yup.string().required(),
    systemCurrencyId: yup.string().required()
  });

  useEffect(() => {
    (async () => {
      if (data) {
        try {
          await tenantSettingsSchema.validate(data);
          setIsValid(true);
        } catch (error) {
          setIsValid(false);
        }
      }
    })();
  }, [data, tenantSettingsSchema]);

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (isError) {
    return (
      <GlobalErrorPage
        errorMessage={tr('global.company_settings_error_message')}
      />
    );
  }

  if (!isValid) {
    return (
      <GlobalErrorPage
        errorMessage={tr('global.company_settings_error_message')}
      />
    );
  }

  return children;
};
