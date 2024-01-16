import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import NoAccountsTwoToneIcon from '@mui/icons-material/NoAccountsTwoTone';
import { Button, Stack } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { MoreOptions } from 'shared/components/MoreOptions';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { tr } from 'shared/translate';
import { ChangeRoleModal } from '../ChangeRoleModal';
import { DisableModal } from '../DisableModal';
import { EnableModal } from '../EnableModal';
import * as styles from './styles';
import { UserStatusEnum } from 'core.v2/domain/user/enum/UserStatusEnum';

type Props = CellRenderProps;

export const DataGridActionsCell = ({ data }: Props) => {
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const [openDisableModal, setOpenDisableModal] = useState(false);
  const [openEnableModal, setOpenEnableModal] = useState(false);

  const handleToggleChangeModal = useCallback(() => {
    setOpenChangeModal((prev) => !prev);
  }, []);

  const handleToggleDisableModal = useCallback(() => {
    setOpenDisableModal((prev) => !prev);
  }, []);

  const handleToggleEnableModal = useCallback(() => {
    setOpenEnableModal((prev) => !prev);
  }, []);

  const isUserDisabled = useMemo(
    () => data?.statusId === UserStatusEnum.INACTIVE,
    [data?.statusId]
  );

  const isUserEnabled = useMemo(
    () => data?.statusId === UserStatusEnum.ACTIVE,
    [data?.statusId]
  );

  return (
    <>
      {openChangeModal && (
        <ChangeRoleModal
          open={openChangeModal}
          onClose={handleToggleChangeModal}
          user={data}
        />
      )}
      <DisableModal
        open={openDisableModal}
        user={data}
        onClose={handleToggleDisableModal}
      />
      <EnableModal
        open={openEnableModal}
        user={data}
        onClose={handleToggleEnableModal}
      />
      <MoreOptions anchorOrigin={{ horizontal: -96, vertical: 'bottom' }}>
        <Stack spacing={0.5}>
          <Button
            startIcon={<EngineeringOutlinedIcon />}
            sx={styles.button}
            onClick={handleToggleChangeModal}
          >
            {tr('shared.changeRole')}
          </Button>
          {isUserEnabled && (
            <Button
              startIcon={<NoAccountsTwoToneIcon />}
              sx={styles.button}
              disabled={isUserDisabled}
              onClick={handleToggleDisableModal}
            >
              {tr('shared.disable')}
            </Button>
          )}
          {isUserDisabled && (
            <Button
              startIcon={<NoAccountsTwoToneIcon />}
              sx={styles.button}
              disabled={isUserEnabled}
              onClick={handleToggleEnableModal}
            >
              {tr('shared.enable')}
            </Button>
          )}
        </Stack>
      </MoreOptions>
    </>
  );
};
