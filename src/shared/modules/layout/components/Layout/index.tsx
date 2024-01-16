import { Default } from '../../views/Default';
import { Fullframe } from '../../views/Fullframe';
import type { LayoutView } from 'shared/modules/layout/types/layout-view';

type Props = {
  variant?: LayoutView;
};

export const Layout = ({ variant = 'default' }: Props): JSX.Element => {
  const layout = {
    default: <Default />,
    fullframe: <Fullframe />
  };
  return layout[variant];
};
