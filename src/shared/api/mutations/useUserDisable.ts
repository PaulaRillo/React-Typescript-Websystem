import core from 'core.v2';
import { useMutation } from 'react-query';

type Input = {
  userId: string;
  email: string;
};

export const useUserDisable = () => {
  return useMutation(({ userId, email }: Input) =>
    core.user.disable(userId, email)
  );
};
