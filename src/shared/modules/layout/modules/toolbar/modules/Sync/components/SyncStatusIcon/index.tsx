import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import RotateLeftTwoToneIcon from '@mui/icons-material/RotateLeftTwoTone';
import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';
import { Loading } from 'shared/components/Loading';

type Props = {
  syncState: SyncStatusEnum;
};

export const SyncStatusIcon = ({ syncState }: Props) => {
  return {
    [SyncStatusEnum.FULFILLED]: <CheckCircleTwoToneIcon color="success" />,
    [SyncStatusEnum.REJECTED]: <CancelTwoToneIcon color="error" />,
    [SyncStatusEnum.IDLE]: <RotateLeftTwoToneIcon color="disabled" />,
    [SyncStatusEnum.PROCESSING]: <Loading size={16} sx={{width: 'fit-content' }} /> //prettier-ignore
  }[syncState];
};
