import { useMemo } from 'react';
//core-components
import { TabsNav } from 'shared/components/TabNav';
//translate
import { tr } from 'shared/translate';
//styles
import { path } from 'shared/constants/path';
import { PermissionKey } from 'shared/modules/Permission';

export const Nav = () => {
  const navItems = useMemo(() => {
    return [
      {
        label: tr('settings.root.nav.personal'),
        path: path.settings.personal.root
      },
      {
        label: tr('settings.root.nav.company'),
        path: path.settings.company.root,
        matchAll: [PermissionKey.VIEW_COMPANY]
      },
      {
        label: tr('shared.integrations'),
        path: path.settings.integrations.root,
        matchAll: [PermissionKey.VIEW_INTEGRATION]
      },
      {
        label: tr('shared.access'),
        path: path.settings.access.root,
        matchOne: [
          PermissionKey.VIEW_USER,
          PermissionKey.MANAGE_USER,
          PermissionKey.VIEW_ROLE,
          PermissionKey.MANAGE_ROLE,
          PermissionKey.VIEW_GROUP,
          PermissionKey.MANAGE_GROUP
        ]
      }
    ];
  }, []);

  return <TabsNav items={navItems} />;
};
