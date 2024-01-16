import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useGetAuthorizations } from 'shared/api/queries/useGetAuthorizations';
import { useGetRoles } from 'shared/api/queries/useGetRoles';
import { changeRole } from 'shared/api/requests/changeRole';
import { Message } from 'shared/components/Message';
import {
  ModalActions,
  ModalContainer,
  ModalHeader
} from 'shared/components/Modal';
import { Modal } from 'shared/components/Modal/components/Modal';
import { Loading } from 'shared/components/Loading';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = {
  open: boolean;
  user: any;
  onClose: () => void;
};

type Msg = {
  type: 'success' | 'error';
  value: string;
};

export const ChangeRoleModal = ({ open, user, onClose }: Props) => {
  const [message, setMessage] = useState<Msg | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useGetAuthorizations(user.id);
  const { data: roles } = useGetRoles();
  const [roleId, setRoleId] = useState(data?.role?.id);

  const name = useMemo(
    () => `${user.firstName} ${user.lastName}`,
    [user.firstName, user.lastName]
  );

  const handleChangeRole = useCallback(async () => {
    setMessage(undefined);
    setIsLoading(true);
    try {
      await changeRole({
        userId: user.id,
        roleId
      });
      setMessage({
        type: 'success',
        value: tr('shared.roleChanged')
      });
    } catch (error) {
      setMessage({
        type: 'error',
        value: tr('shared.error.generic')
      });
    } finally {
      setIsLoading(false);
    }
  }, [roleId, user.id]);

  const handleChange = useCallback((e: ChangeEvent) => {
    setMessage(undefined);
    setRoleId((e.target as HTMLInputElement).value);
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader
        divider
        title={`${tr('shared.changeRole')} ${tr('shared.of')} ${name}`}
        sx={{ bgcolor: 'grey.100' }}
        onClose={onClose}
      />
      <ModalContainer>
        {!data && <Loading sx={{ minHeight: 233, minWidth: 480, m: 2 }} />}{' '}
        {data && (
          <Box sx={styles.container}>
            {' '}
            <FormControl>
              {' '}
              <FormLabel id="userRoles">
                {tr('shared.userRoles')}
              </FormLabel>{' '}
              {roles && (
                <RadioGroup
                  defaultValue={data?.role?.id}
                  onChange={handleChange}
                >
                  {' '}
                  {roles.map((role: any, index: number) => {
                    return (
                      <FormControlLabel
                        key={`role-${index}`}
                        value={role.id}
                        control={<Radio />}
                        label={tr(`shared.${role.name.toLowerCase()}`)}
                      />
                    );
                  })}{' '}
                </RadioGroup>
              )}{' '}
            </FormControl>{' '}
          </Box>
        )}
      </ModalContainer>
      <ModalActions
        left={<Button onClick={onClose}>{tr('shared.cancel')}</Button>}
      >
        {isLoading && (
          <CircularProgress color="secondary" size={20} thickness={4} />
        )}
        {!!message && <Message type={message.type} value={message.value} />}
        <Button variant="contained" onClick={handleChangeRole}>
          {tr('shared.changeRole')}
        </Button>
      </ModalActions>
    </Modal>
  );
};
