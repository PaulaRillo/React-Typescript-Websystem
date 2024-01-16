import core from 'core.v2';
import { useQuery } from 'react-query';

type Props = {
  enabled: boolean;
};

export const useGetLoggedUser = ({ enabled }: Props) => {
  return useQuery('@loggedUser', () => core.user.getLoggedUser(), {
    staleTime: 0,
    enabled
  });
};
