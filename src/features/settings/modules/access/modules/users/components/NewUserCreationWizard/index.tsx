import { Box, Button } from '@mui/material';
import core from 'core.v2';
import { useCallback, useMemo, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRemoteSubmit } from 'shared/hooks/useRemoteSubmit';
import { Action, CreationWizard, Step } from 'shared/modules/CreationWizard';
import { ActionRenderProps } from 'shared/modules/CreationWizard/types/Action';
import { tr } from 'shared/translate';
import { useNewUser } from '../../hooks/useNewUser';
import { UserDetails } from '../../steps/UserDetails';
import { UserInvitationResponse } from '../../steps/UserInvitationResponse';
import { UserInvitations } from '../../steps/UserInvitations';
import { UserRoles } from '../../steps/UserRoles';
import * as styles from './styles';

type RemoteSubmitActionProps = ActionRenderProps & {
  formRef: React.RefObject<HTMLFormElement>;
};

type ErrorResponse = {
  data: string;
};

type Error = {
  response: ErrorResponse;
};

function RemoteSubmitAction({ formRef }: RemoteSubmitActionProps): JSX.Element {
  const { submit } = useRemoteSubmit();

  const handleClick = useCallback(() => {
    submit(formRef);
  }, [formRef, submit]);

  return (
    <Button variant="contained" onClick={handleClick} sx={{ mt: 4 }}>
      {tr('shared.next')}
    </Button>
  );
}

function UserInvitationsAction({
  setActiveStep
}: ActionRenderProps): JSX.Element {
  const { data, setIsLoading, setIsSuccess, setIsError, setMessage } =
    useNewUser();

  const queryClient = useQueryClient();
  const prevCache: any = queryClient.getQueryData('@users');

  const createUser = useMutation(
    async (data) => {
      await core.user.create(data);
    },
    {
      onMutate: () => {
        setIsError(false);
        setIsSuccess(false);
        setIsLoading(true);
      },
      onSuccess: (data, variables: any) => {
        const { first_name, last_name, email } = variables;
        const newUser = {
          firstName: first_name,
          lastName: last_name,
          email,
          username: email,
          statusId: 3
        };
        setIsLoading(false);
        setIsSuccess(true);
        setIsError(false);
        setMessage(tr('settings.access.users.lastStep.success'));
        queryClient.setQueryData('@users', [...prevCache, newUser]);
        queryClient.invalidateQueries('@users');
      },
      onError: (error: Error) => {
        setIsLoading(false);
        setIsSuccess(false);
        setIsError(true);
        setMessage(
          error?.response?.data ?? tr('settings.access.users.lastStep.fail')
        );
      }
    }
  );

  const handleClick = useCallback(() => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setMessage('');
    setActiveStep((prev) => prev + 1);
    createUser.mutate({
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      email: data.email,
      role: data.role
    } as any);
  }, [
    createUser,
    data.email,
    data.first_name,
    data.last_name,
    data.middle_name,
    data.role,
    setActiveStep,
    setIsError,
    setIsLoading,
    setIsSuccess,
    setMessage
  ]);

  return (
    <Button variant="contained" onClick={handleClick}>
      {tr('shared.addUser')}
    </Button>
  );
}

type Props = {
  onClose: () => void;
};

export const NewUserCreationWizard = ({ onClose }: Props) => {
  const { isError } = useNewUser();
  const userDetailsForm = useRef<HTMLFormElement>(null);
  const userRolesForm = useRef<HTMLFormElement>(null);

  const steps = useMemo<Step[]>(
    () => [
      {
        label: tr('settings.access.users.step1.title')
      },
      {
        label: tr('settings.access.users.step2.title')
      },
      {
        label: tr('settings.access.users.step3.title')
      },
      {
        label: tr('settings.access.users.lastStep')
      }
    ],
    []
  );

  const actions = useMemo<Action[]>(
    () => [
      {
        forward: {
          render: (props) => (
            <RemoteSubmitAction formRef={userDetailsForm} {...props} />
          )
        },
        backward: {
          defaultProps: {
            disabled: true
          }
        }
      },
      {
        forward: {
          render: (props) => (
            <RemoteSubmitAction formRef={userRolesForm} {...props} />
          )
        }
      },
      {
        forward: {
          render: (props) => <UserInvitationsAction {...props} />
        }
      },
      {
        forward: {
          render: () => (
            <Button variant="contained" onClick={onClose}>
              {tr('button.close')}
            </Button>
          )
        },
        backward: {
          defaultProps: {
            disabled: !isError
          }
        }
      }
    ],
    [isError, onClose]
  );

  return (
    <Box sx={styles.response}>
      <CreationWizard steps={steps} actions={actions}>
        <UserDetails ref={userDetailsForm} />
        <UserRoles ref={userRolesForm} />
        <UserInvitations />
        <UserInvitationResponse />
      </CreationWizard>
    </Box>
  );
};
