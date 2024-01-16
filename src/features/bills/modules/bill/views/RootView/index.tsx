import PostAddIcon from '@mui/icons-material/PostAdd';
import { Box, Button, Tooltip } from '@mui/material';
import core from 'core.v2';
import { DetailsSectionView } from 'features/bills/modules/bill/modules/details';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import { Header } from 'shared/components/Header';
import { path } from 'shared/constants/path';
import { useAlert } from 'shared/hooks/useAlert';
import { Permission, PermissionKey } from 'shared/modules/Permission';
import { tr } from 'shared/translate';
import { Container } from '../../components/Container';
import { Content } from '../../components/Content';
import { Nav } from '../../components/Nav';
import * as styles from './styles';

export const RootView = () => {
  const { data, isError } = useGetInvoice();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setIsEditable(core.store.paymentRequest.getIsEditable());
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setIsEditable(data.isEditable);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  const navigate = useNavigate();
  const { alert } = useAlert();

  if (isError) {
    alert({
      title: tr('bills.bill.root.error.notFound.title'),
      message: tr('bills.bill.root.error.notFound.message'),
      severity: 'error'
    });
    navigate(-1);
  }

  const handleAddToPay = useCallback(() => {
    if (!data) return;
    core.store.paymentRequest.addInvoices([data]);
  }, [data]);

  return (
    <Container>
      <Box sx={styles.header}>
        <Header
          title={data?.externalId || ''}
          crumbs={[{ to: path.bills.root, label: tr('bills.title') }]}
          sx={{ m: 2 }}
        />
        <Permission matchAll={[PermissionKey.PAY_BILL]}>
          <Tooltip title={isEditable ? '' : tr('shared.payNotEnabled')}>
            <span>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PostAddIcon />}
                disabled={!isEditable}
                onClick={handleAddToPay}
              >
                {tr('shared.addToPay')}
              </Button>
            </span>
          </Tooltip>
        </Permission>
      </Box>
      <Nav />
      <Content>
        <DetailsSectionView />
      </Content>
    </Container>
  );
};

export default RootView;
