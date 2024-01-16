//resources
import React, { useCallback, useMemo, useState, useRef } from 'react';
//core-components
import { ColumnDefProps, DataGrid } from 'shared/grids/DataGrid';
//translate
import { Box, CircularProgress } from '@mui/material';
import { tr } from 'shared/translate';
import * as styles from './styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AlertPopoverButton } from '../../../../../../../../shared/components/AlertPopoverButton';
import { useMutation, useQueryClient } from 'react-query';
import { useConfigureCurrency } from '../../queries/useConfigureCurrency';
import { useGetSystemManagedCurrencies } from '../../queries/useGetSystemManagedCurrencies';
import { useGetCurrencies } from '../../../../../../../../shared/api/queries/useGetCurrencies';
import { CurrencyType } from '../../../../../../../../core.v2/domain/@shared/types/currency.type';
import { DialogBox } from '../../../../../../../../shared/components/DialogBox';

export const CurrenciesGrid = () => {
  const { data, isLoading } = useGetCurrencies();
  const [blockedRowId, setBlockedRowId] = useState<string>('');
  const systemManagedCurrencies = useGetSystemManagedCurrencies();
  const queryClient = useQueryClient();
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const isoCode = useRef<any>({});

  const updateISOCodeMutation = useMutation(useConfigureCurrency, {
    onSuccess: () => {
      queryClient.invalidateQueries(`@currencies`);
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
    handleToggleChangeModal();
  }, []);

  const onChangeISOCode = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      currency: CurrencyType
    ) => {
      setBlockedRowId(currency?.id);
      const selectedCurrency = systemManagedCurrencies?.data?.find(
        (currency: CurrencyType) => currency.id === event?.target?.value
      );
      if (selectedCurrency) {
        updateISOCodeMutation.mutate({
          ...currency,
          iso4217Alpha3: selectedCurrency.iso4217Alpha3,
          iso4217Numeric3: selectedCurrency.iso4217Numeric3,
          name: selectedCurrency.name,
          symbol: selectedCurrency.symbol
        });
      }
    },
    [systemManagedCurrencies?.data, updateISOCodeMutation]
  );

  const isoCodeSelect = useCallback(
    ({ data }: any) => {
      return blockedRowId === data?.id ||
        queryClient.isFetching('@currencies') ? (
        <CircularProgress color="secondary" size={24} />
      ) : (
        <Box>
          <TextField
            hiddenLabel
            sx={styles.isoCodeTextfield}
            disabled={
              updateISOCodeMutation.isLoading ||
              systemManagedCurrencies?.isLoading ||
              systemManagedCurrencies?.isFetching ||
              data?.isConfigured
            }
            select
            variant="standard"
            InputProps={{ disableUnderline: true }}
            value={data?.iso4217Alpha3}
            onChange={(e) => setInfoOnModal(e, data)}
          >
            {systemManagedCurrencies?.data?.map((currency: any) => (
              <MenuItem key={currency.id} value={currency.id}>
                {currency.iso4217Alpha3} - {currency.name}
              </MenuItem>
            ))}
          </TextField>
          {!data?.isConfigured && (
            <AlertPopoverButton
              alert={{
                severity: 'error',
                title: tr('shared.missingISOCode.error.title'),
                message: tr('shared.missingISOCode.error.message')
              }}
            />
          )}
        </Box>
      );
    },
    [
      blockedRowId,
      queryClient,
      updateISOCodeMutation.isLoading,
      systemManagedCurrencies?.isLoading,
      systemManagedCurrencies?.isFetching,
      systemManagedCurrencies?.data,
      onChangeISOCode
    ]
  );

  const roundingTranslations: { [key: string]: string } = {
    'No Rounding': tr('settings.accounting.currencies.noRounding'),
    Rounding: tr('settings.accounting.currencies.rounding')
  };

  const decimalTranslations: { [id: string]: string } = {
    [-1]: tr('shared.default'),
    [0]: '0',
    [1]: '1',
    [2]: '2',
    [3]: '3',
    [4]: '4',
    [5]: '5',
    [6]: '6'
  };

  const columnDefsData: ColumnDefProps[] = useMemo(
    () => [
      {
        headerName: tr('settings.accounting.currencies.iso_code'),
        field: 'iso4217Alpha3',
        cellRenderer: isoCodeSelect,
        maxWidth: 150,
        minWidth: 50
      },
      {
        headerName: tr('settings.accounting.currencies.currency_name'),
        field: 'name',
        minWidth: 200
      },
      {
        headerName: tr('settings.accounting.currencies.symbol'),
        field: 'symbol'
      },
      {
        headerName: tr('shared.external_id'),
        field: 'externalId'
      },
      {
        headerName: tr('settings.accounting.currencies.rounding'),
        field: 'rounding.name',
        valueFormatter: ({ value }) => roundingTranslations[value] || value
      },
      {
        headerName: tr('settings.accounting.currencies.decimals'),
        field: 'decimals.name',
        valueGetter: (params) =>
          decimalTranslations[params.data.decimals.id] ||
          params.data.decimals.name
      },
      {
        headerName: tr('settings.accounting.currencies.payment_rounded'),
        field: 'isPaymentRounded',
        valueFormatter: (p: any) => {
          return p.value ? tr('shared.yes') : tr('shared.no');
        }
      },
      {
        headerName: tr('settings.accounting.currencies.configured'),
        field: 'isConfigured',
        valueFormatter: (p: any) => {
          return p.value ? tr('shared.yes') : tr('shared.no');
        }
      }
    ],
    [isoCodeSelect]
  );

  console.log('data', data);

  return (
    <Box component="section" sx={styles.container}>
      <DialogBox
        open={openChangeModal}
        isoCode={isoCode}
        onClose={handleToggleChangeModal}
        changeCurrency={onChangeISOCode}
        title={{
          key: 'modal.currencyTitle',
          isoCode: `${isoCode?.current?.event?.target?.value}`,
          currency: `${isoCode?.current?.data?.name}`
        }}
      />
      <DataGrid
        rowData={
          isLoading || systemManagedCurrencies?.isLoading || data === undefined
            ? undefined
            : data ?? []
        }
        columnDefs={columnDefsData}
        defaultColDef={{
          resizable: true,
          sortable: true,
          minWidth: 100,
          flex: 1
        }}
        domLayout="autoHeight"
        overlayNoRowsTemplate={tr(
          'settings.accounting.currencies.no_currencies_configured_overlay_message'
        )}
      />
    </Box>
  );
};

export default CurrenciesGrid;
