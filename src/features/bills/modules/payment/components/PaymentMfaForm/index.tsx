//material-ui
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material';
//resources
import { SubmitHandler, useForm } from 'react-hook-form';
import core from 'core.v2';
import { MfaRequestDataType } from 'core.v2/domain/@shared/types/mfa.type';
import Countdown from '../Countdown';
//validator
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//translate
import { tr } from 'shared/translate';
//styles
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSubmitPaymentRequestGroupUser } from 'shared/api/mutations/useSubmitPaymentRequestGroup';
import { useCreationWizard } from 'shared/modules/CreationWizard';
import * as styles from './styles';

type Inputs = {
  [x: string]: string;
};

export const PaymentMfaForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [validationsSent, setValidationsSent] = useState<number>(0);
  const [codesSent, setCodesSent] = useState<number>(0);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [resendCodeButtonDisabled, setResendCodeButtonDisabled] =
    useState<boolean>(false);
  const [seconds, setSeconds] = useState(
    import.meta.env.VITE_BILLTALLY_PINPOINT_MFA_VALIDITY_PERIOD
  );
  const [countdownKey, setCountdownKey] = useState(0);
  const { setActiveStep } = useCreationWizard();
  const { mutate, isLoading, isSuccess, isError } =
    useSubmitPaymentRequestGroupUser();
  const mfaInput: MfaRequestDataType = useMemo(
    () => ({
      data: {}
    }),
    []
  );

  const schema = yup
    .object({
      mfaCode: yup.string().required(
        tr('shared.form.validations.required', {
          value: tr('auth.mfa.mfaCode')
        })
      )
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = ({ mfaCode }) => {
    if (!isLoading) {
      core.store.paymentRequest.addMfa(mfaCode);
      mutate();
    }
  };

  useEffect(() => {
    mfaInput.data = {
      payment_origin: {
        payment_method_id:
          core.store.paymentRequest.originAccount?.paymentMethodId,
        processor_id: core.store.paymentRequest.originAccount?.processorId,
        currency_id: core.store.paymentRequest.originAccount?.currencyCode
      },
      payments: core.store.paymentRequest.invoices.map((invoice: any) => ({
        invoice_id: invoice.id,
        visual_id: invoice.visualId,
        vendor_id: invoice.invoiceFrom.id,
        vendor_name: invoice.invoiceFrom.name,
        cash_flow_id: core.store.paymentRequest.cashFlow?.id,
        reference_number: invoice.referenceNumberExternal,
        currency_iso4217_alpha3: invoice.currency.iso4217Alpha3,
        amount: invoice.paymentAmount.toString(),
        description: invoice.description || 'some description',
        payment_method: {
          vault_id: invoice.destinationAccount.vaultId,
          vault_payment_method_id:
            invoice.destinationAccount.vaultPaymentMethodId,
          vault_payment_method_type: invoice.destinationAccount.vaultPaymentMethodType // prettier-ignore
        }
      }))
    };
    core.mfa.sendMfa(mfaInput);
  }, []);

  const handleReset = () => {
    setCountdownKey((prevKey) => prevKey + 1);
  };

  const handleResendCode = useCallback(() => {
    if (codesSent >= 3) {
      setError('resendLimitReached');
      setResendCodeButtonDisabled(true);      
    } else {
      mfaInput.data = {
        payment_origin: {
          payment_method_id:
            core.store.paymentRequest.originAccount?.paymentMethodId,
          processor_id: core.store.paymentRequest.originAccount?.processorId,
          currency_id: core.store.paymentRequest.originAccount?.currencyCode
        },
        payments: core.store.paymentRequest.invoices.map((invoice: any) => ({
          invoice_id: invoice.id,
          visual_id: invoice.visualId,
          vendor_id: invoice.invoiceFrom.id,
          vendor_name: invoice.invoiceFrom.name,
          cash_flow_id: core.store.paymentRequest.cashFlow?.id,
          reference_number: invoice.referenceNumberExternal,
          currency_iso4217_alpha3: invoice.currency.iso4217Alpha3,
          amount: invoice.paymentAmount.toString(),
          description: invoice.description || 'some description',
          payment_method: {
            vault_id: invoice.destinationAccount.vaultId,
            vault_payment_method_id:
              invoice.destinationAccount.vaultPaymentMethodId,
            vault_payment_method_type: invoice.destinationAccount.vaultPaymentMethodType // prettier-ignore
          }
        }))
      };
      core.mfa.sendMfa(mfaInput);
      setCodesSent((prevState) => prevState + 1);
      handleReset();
    }
  }, [codesSent]);

  useEffect(() => {
    if (isSuccess) {
      setError(null);
    }

    if (isError) {
      setError('wrongCode');
      setValidationsSent((prevState) => prevState + 1);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccess) {
      setActiveStep((prev) => prev + 1);
    }
  }, [isSuccess, setActiveStep]);

  useEffect(() => {
    if (validationsSent >= 3) {
      setError('attemptLimitReached');
      setButtonDisabled(true);
    }
  }, [validationsSent]);

  return (
    <Box
      component="form"
      noValidate
      sx={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && (
        <Box sx={styles.error}>
          <Typography variant="body2" color="error">
            {tr(`shared.mfa.${error}`)}
          </Typography>
        </Box>
      )}
      <Box sx={styles.sendCode}>
        <TextField
          autoFocus
          required
          autoComplete='off'
          key={countdownKey}
          fullWidth
          error={!!errors.mfaCode}
          helperText={tr('auth.mfa.validityWarning') + Countdown({seconds, countdownKey})}
          label={tr('auth.mfa.mfaCode')}
          {...register('mfaCode')}
        />
      </Box>
      <Box sx={styles.actions}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={buttonDisabled || isLoading}
          type="submit"
        >
          {!isLoading && tr('auth.mfa.authenticate')}
          {isLoading && <CircularProgress color="secondary" size={24} />}
        </Button>
        <Button
          variant="text"
          color="primary"
          size="large"
          disabled={resendCodeButtonDisabled || isLoading}
          onClick={handleResendCode}
        >
          {tr('shared.resendCode')}
        </Button>
      </Box>
    </Box>
  );
};
