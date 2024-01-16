import { Box, Button, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Trans } from 'react-i18next';
import {
  ModalActions,
  ModalContainer,
  ModalHeader
} from 'shared/components/Modal';
import { Modal } from 'shared/components/Modal/components/Modal';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Current = {
  event?: any;
  data?: any;
};

type isoCode = {
  current?: Current;
};
type Title = {
  key: string;
  isoCode: string;
  currency?: string;
  bankName?: string;
};
type Props = {
  open: boolean;
  isoCode: isoCode;
  onClose: () => void;
  changeCurrency: (event: Current['event'], data: Current['data']) => void;
  title: Title;
};

export const DialogBox = ({
  open,
  isoCode,
  onClose,
  changeCurrency,
  title
}: Props) => {
  const handleChangeCurrency = useCallback(() => {
    changeCurrency(isoCode?.current?.event, isoCode?.current?.data);
    onClose();
  }, [changeCurrency, isoCode, onClose]);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader
        divider
        title={tr('shared.confirmation')}
        sx={styles.header}
        onClose={onClose}
      />
      <ModalContainer>
        <Stack spacing={4} sx={styles.stack}>
          <Box>
            <Typography textAlign="center">
              <Trans
                defaults={tr(title.key, {
                  isoCode: title.isoCode,
                  bankName: title.bankName,
                  currency: title.currency
                })}
                components={{ bold: <strong /> }}
              />
            </Typography>
          </Box>
        </Stack>
      </ModalContainer>
      <ModalActions>
        <Button onClick={onClose}>{tr('shared.cancel')}</Button>
        <Button variant="contained" onClick={handleChangeCurrency}>
          {tr('shared.confirm')}
        </Button>
      </ModalActions>
    </Modal>
  );
};
