import { Box, CircularProgress, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { VendorsDataGrid } from 'features/vendors/modules/vendor/modules/shared/components/VendorsDataGrid';
import { useGetVendor } from 'features/vendors/modules/vendor/queries/useGetVendor';
import React, { useCallback, useMemo, useState, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { IVendorBankingInfo } from '../../../../../../../../../../core/domain/vendor/IVendorBankingInfo';
import { Loading } from '../../../../../../../../../../shared/components/Loading';
import { useGetConfiguredCurrencies } from '../../../../../../../../../../shared/api/queries/useGetConfiguredCurrencies';
import { usePatchVendorBankingInfo } from '../../queries/usePatchVendorBankingInfo';
import { AlertPopoverButton } from 'shared/components/AlertPopoverButton';
import { tr } from 'shared/translate';
import * as styles from './styles';
import { DialogBox } from '../../../../../../../../../../shared/components/DialogBox';

export const BanksView = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetVendor();
  const [blockedRowId, setBlockedRowId] = useState<string>('');
  const configuredCurrencies = useGetConfiguredCurrencies();
  const queryClient = useQueryClient();
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const isoCode = useRef<any>({})

  const updateCurrencyMutation = useMutation(usePatchVendorBankingInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(`@vendor${id}`);
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
      bankingInfo: IVendorBankingInfo
    ) => {
      setBlockedRowId(bankingInfo?.id);
      updateCurrencyMutation.mutate({
        ...bankingInfo,
        currencyId: event?.target?.value
      });
    },
    [updateCurrencyMutation]
  );

  const currencySelect = useCallback(
    ({ data }: any) => {
      return blockedRowId === data?.id ? (
        <CircularProgress color="secondary" size={24} />
      ) : (
        <Box>
          <TextField
            hiddenLabel
            sx={styles.currencyTextfield}
            disabled={
              updateCurrencyMutation.isLoading ||
              configuredCurrencies?.isLoading ||
              configuredCurrencies?.isFetching ||
              data?.currencyId
            }
            select
            variant="standard"
            InputProps={{ disableUnderline: true }}
            value={data?.currencyId}
            onChange={(e) => setInfoOnModal(e, data)}
          >
            {configuredCurrencies.data ? configuredCurrencies?.data?.map((option: any) => (
              <MenuItem key={option.id} value={option.id}>
                {option.id} - {option.name}
              </MenuItem>)) :
              <MenuItem disabled>
                {tr('settings.accounting.currencies.no_currencies_configured_overlay_message')}
              </MenuItem>
            }
          </TextField>
          {!data?.currencyId && (
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
      configuredCurrencies?.isLoading,
      configuredCurrencies?.isFetching,
      configuredCurrencies?.data,
      onChangeCurrency,
    ]
  );

  const columnDefsData = useMemo(
    () => [
      {
        field: 'accountName',
        headerName: tr('account_name'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 2
      },
      {
        field: 'bankCode',
        headerName: tr('bank'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 1
      },
      {
        field: 'countryId',
        headerName: tr('country'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 1
      },
      {
        field: 'currencyId',
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
        field: 'accountNumber',
        headerName: tr('account_number'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 1
      }
    ],
    [currencySelect]
  );

  return (
    <Box sx={styles.container}>
      <DialogBox
        open={openChangeModal}
        isoCode={isoCode}
        onClose={handleToggleChangeModal}
        changeCurrency={onChangeCurrency}
        title={{
          key: 'modal.vendorTitle',
          isoCode: `${configuredCurrencies.data?.find((option) => option.id === isoCode?.current?.event?.target?.value)?.name}`,
          bankName: `${isoCode?.current?.data?.accountName}`
        }}
      />
      <Box sx={styles.header}>
        <Typography variant="h5">{tr('shared.bankAccounts')}</Typography>
      </Box>
      <VendorsDataGrid
        rowData={
          isLoading || configuredCurrencies?.isLoading || data === undefined
            ? undefined
            : data?.bankingInfo ?? []
        }
        columnDefs={columnDefsData}
        overlayLoadingTemplate={ReactDOMServer.renderToString(<Loading />)}
      />
    </Box>
  );
};
