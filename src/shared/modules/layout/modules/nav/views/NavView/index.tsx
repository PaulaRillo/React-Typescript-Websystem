//material-ui
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import LineAxisTwoToneIcon from '@mui/icons-material/LineAxisTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { Divider, MenuList, Typography } from '@mui/material';
//core-components
import { NavItem } from '../../components/NavItem';
//styles
import * as styles from './styles';
//resources
import { path } from 'shared/constants/path';
import { Permission, PermissionKey } from 'shared/modules/Permission';
import { tr } from 'shared/translate';

export const NavView = () => {
  return (
    <>
      <MenuList>
        <NavItem
          id="nav-item-1"
          icon={<SpeedTwoToneIcon />}
          label={tr('app.nav.dashboard')}
          path={path.dashboard}
        />
      </MenuList>
      <MenuList sx={styles.group}>
        <Typography variant="caption" color="text.secondary" sx={styles.title}>
          {tr('app.nav.workspace.payables')}
        </Typography>
        <Permission matchAll={[PermissionKey.VIEW_BILL]}>
          <NavItem
            id="nav-item-3"
            icon={<AccountBalanceWalletTwoToneIcon />}
            label={tr('app.nav.workspace.bills')}
            path={path.bills.root}
          />
        </Permission>
        <Permission matchAll={[PermissionKey.VIEW_VENDOR]}>
          <NavItem
            id="nav-item-4"
            icon={<StorefrontTwoToneIcon />}
            label={tr('app.nav.workspace.vendors')}
            path={path.vendors.root}
          />
        </Permission>
        <NavItem
          id="nav-item-4"
          icon={<PaymentsTwoToneIcon />}
          label={tr('app.nav.workspace.payments')}
          path={path.outgoingPayments}
        />
      </MenuList>
      <Divider variant="middle" />
      <MenuList>
        <Permission
          matchAll={[PermissionKey.VIEW_REPORT, PermissionKey.CREATE_REPORT]}
        >
          <NavItem
            id="nav-item-2"
            icon={<LineAxisTwoToneIcon />}
            label={tr('app.nav.reports')}
            path={path.reports}
          />
        </Permission>
      </MenuList>
    </>
  );
};
