import core from 'core.v2';
import { useMutation } from 'react-query';

type Input = {
  userId: string;
  email: string;
};

export const useUserEnable = () => {
  return useMutation(({ userId, email }: Input) =>
    core.user.enable(userId, email)
  );
};
