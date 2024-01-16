import { tr } from 'shared/translate';
import { useMemo } from 'react';
import { TabsNav } from 'shared/components/TabNav';
import { path } from 'shared/constants/path';

export const Nav = () => {
  const navItems = useMemo(() => {
    return [
      {
        label: tr('shared.preview'),
        path: path.bills.id.preview
      },
      {
        label: tr('shared.payments'),
        path: path.bills.id.payments
      },
      {
        label: tr('shared.installments'),
        path: path.bills.id.installments
      },
      {
        label: tr('shared.history'),
        path: path.bills.id.history
      },
      {
        label: tr('shared.comments'),
        path: path.bills.id.comments
      }
    ];
  }, []);

  return <TabsNav items={navItems} />;
};
