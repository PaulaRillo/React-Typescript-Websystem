import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
  provider: ({ children }: { children: ReactNode }) => JSX.Element;
};

export const ContextRoute = ({ provider: Provider }: Props) => {
  return (
    <Provider>
      <Outlet />
    </Provider>
  );
};
