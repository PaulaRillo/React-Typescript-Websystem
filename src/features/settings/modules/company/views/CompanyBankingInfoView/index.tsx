import React, { useCallback, useMemo, useState, useRef } from 'react';
//material-ui
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
//core-components
import { tenant_banking_info } from 'core/domain/company/tenant_banking_info';
import ReactDOMServer from 'react-dom/server';
import { useMutation, useQueryClient } from 'react-query';
import { useGetHouseBanks } from 'shared/api/queries/useGetHouseBanks';
import { Loading } from 'shared/components/Loading';
import { DialogBox } from '../../../../../../shared/components/DialogBox';
import { useGetConfiguredCurrencies } from '../../../../../../shared/api/queries/useGetConfiguredCurrencies';
import { usePatchBankingInfo } from '../../queries/usePatchBankingInfo';
//translate
import { tr } from 'shared/translate';
//styles
import { DataGrid } from 'shared/grids/DataGrid';
import { AlertPopoverButton } from '../../../../../../shared/components/AlertPopoverButton';
import * as styles from './styles';

export const CompanyBankingInfoView = () => {
  const queryClient = useQueryClient();
  const banks = useGetHouseBanks();
  const configuredCurrencies = useGetConfiguredCurrencies();
  const [blockedRowId, setBlockedRowId] = useState<string>('');
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const isoCode = useRef<any>({})


  const updateCurrencyMutation = useMutation(usePatchBankingInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(`@house-banks`);
      queryClient.invalidateQueries(`@Origins`);
    },
    onSettled: () => {
      setBlockedRowId('');
    }
  });

  const handleToggleChangeModal = useCallback(() => {
    setOpenChangeModal((prev) => !prev);
  }, []);

  const setInfoOnModal = useCallback((event, data) => {
    isoCode.current = { event, data };
    handleToggleChangeModal()
  }, []);

  const onChangeCurrency = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      bankingInfo: tenant_banking_info
    ) => {
      if (bankingInfo?.id) {
        setBlockedRowId(bankingInfo?.id);
        updateCurrencyMutation.mutate({
          ...bankingInfo,
          currency_id: event?.target?.value
        });
      }
    },
    [updateCurrencyMutation]
  );

  const currencySelect = useCallback(
    ({ data }: any) => {
      return blockedRowId === data?.id ? (
        <CircularProgress color="secondary" size={16} />
      ) : (
        <Box>
          <TextField
            hiddenLabel
            sx={styles.currencyTextfield}
            fullWidth
            disabled={
              updateCurrencyMutation.isLoading ||
              banks?.isLoading ||
              banks?.isFetching ||
              configuredCurrencies?.isLoading ||
              configuredCurrencies?.isFetching ||
              data?.currency_id
            }
            select
            variant="standard"
            InputProps={{ disableUnderline: true }}
            value={data?.currency_id}
            name={data?.currency_name}
            onChange={(e) => setInfoOnModal(e, data)}
          >
            {configuredCurrencies.data ? (
              configuredCurrencies?.data?.map((option: any) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.id} - {option.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                {tr(
                  'settings.accounting.currencies.no_currencies_configured_overlay_message'
                )}
              </MenuItem>
            )}
          </TextField>
          {!data?.currency_id && (
            <AlertPopoverButton
              alert={{
                severity: 'error',
                title: tr('shared.missingCurrency.error.title'),
                message: tr('shared.missingCurrency.error.message')
              }}
            />
          )}
        </Box>
      );
    },
    [
      blockedRowId,
      updateCurrencyMutation.isLoading,
      banks?.isLoading,
      banks?.isFetching,
      configuredCurrencies?.isLoading,
      configuredCurrencies?.isFetching,
      configuredCurrencies?.data,
      onChangeCurrency,
    ]
  );

  const columnDefsData = useMemo(
    () => [
      {
        field: 'account_name',
        headerName: tr('account_name'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 2
      },
      {
        field: 'bank_code',
        headerName: tr('bank'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 1
      },
      {
        field: 'country_id',
        headerName: tr('country'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 1
      },
      {
        field: 'currency_id',
        headerName: tr('currency'),
        cellRenderer: currencySelect,
        filter: 'agTextColumnFilter',
        flex: 1
      },
      {
        field: 'iban',
        headerName: tr('iban'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 1
      },
      {
        field: 'redacted_account_number',
        headerName: tr('account_number'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 1
      }
    ],
    [currencySelect]
  );

  return (
    <Stack
      component="section"
      id="banks"
      spacing={2}
      sx={{ width: '100%', p: 2, pl: 0 }}
    >
      <DialogBox
        open={openChangeModal}
        isoCode={isoCode}
        onClose={handleToggleChangeModal}
        changeCurrency={onChangeCurrency}
        title={{
          key: 'modal.companyTitle',
          isoCode: `${configuredCurrencies.data?.find((option) => option.id === isoCode?.current?.event?.target?.value)?.name}`,
          bankName: `${isoCode?.current?.data?.account_name}`
        }} />
      <Typography variant="h5">{tr('shared.bankAccounts')}</Typography>
      <Box sx={styles.dataGrid}>
        <DataGrid
          rowData={banks?.data}
          columnDefs={columnDefsData}
          overlayLoadingTemplate={ReactDOMServer.renderToString(<Loading />)}
          overlayNoRowsTemplate={tr('shared.error.originAccounts.noAccount')}
        />
      </Box>
    </Stack >
  );
};
