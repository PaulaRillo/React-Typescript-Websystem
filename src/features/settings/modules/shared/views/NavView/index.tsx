//material-ui
import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ButtonNav } from 'shared/components/ButtonNav';
import { PermissionKey } from 'shared/modules/Permission';
//styles

type NavItem = {
  icon: React.ReactElement;
  label: string;
  path: string;
  permissions?: PermissionKey[];
};

type Props = {
  rootPath: string;
  items: NavItem[];
};

export const NavView = ({ rootPath, items }: Props) => {
  return (
    <Stack
      component="main"
      direction="row"
      spacing={2}
      sx={{ height: '100%', bgcolor: 'background.paper' }}
    >
      <ButtonNav rootPath={rootPath} items={items} />
      <Outlet />
    </Stack>
  );
};

export default NavView;
