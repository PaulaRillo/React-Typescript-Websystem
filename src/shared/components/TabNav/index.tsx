import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Permission, PermissionKey } from 'shared/modules/Permission';
import * as styles from './styles';

type NavItem = {
  label: string;
  path: string;
  matchAll?: PermissionKey[];
  matchOne?: PermissionKey[];
};

type Props = {
  items: NavItem[];
};

export const TabsNav = ({ items }: Props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const activeRouteVerify = useCallback(
    (path: string) => {
      const item = items.find((item) => item.path === path);
      if (item) setValue(items.indexOf(item));
    },
    [items]
  );

  const handleNavigate = useCallback(
    (e: SyntheticEvent) => {
      const path = e.currentTarget.getAttribute('data-path') as string;
      if (path) activeRouteVerify(path);
      navigate(path);
    },
    [activeRouteVerify, navigate]
  );

  const handleChange = useCallback((_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }, []);

  useEffect(
    function verifyActiveRoute() {
      const path = window.location.pathname.split('/').pop();
      if (path) activeRouteVerify(path);
    },
    [activeRouteVerify, items]
  );

  return (
    <Box component="nav" sx={styles.container}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="navigation"
        sx={styles.tabs}
      >
        {items.map(({ label, path, matchAll, matchOne }, idx) => {
          return (
            <Permission
              key={`${idx}-${path}`}
              matchAll={matchAll}
              matchOne={matchOne}
            >
              <Tab
                label={label}
                data-path={path}
                onClick={handleNavigate}
                sx={styles.tab}
              />
            </Permission>
          );
        })}
      </Tabs>
    </Box>
  );
};
