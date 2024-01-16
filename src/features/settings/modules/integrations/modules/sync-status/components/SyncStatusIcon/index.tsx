import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import RotateLeftTwoToneIcon from '@mui/icons-material/RotateLeftTwoTone';
import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';
import { Loading } from 'shared/components/Loading';

type Props = {
  syncState: SyncStatusEnum;
  size?: 'small' | 'inherit' | 'large' | 'medium';
};

export const SyncStatusIcon = ({ syncState, size = 'medium' }: Props) => {
  return {
    [SyncStatusEnum.FULFILLED]: (
      <CheckCircleTwoToneIcon color="success" fontSize={size} />
    ),
    [SyncStatusEnum.REJECTED]: (
      <CancelTwoToneIcon color="error" fontSize={size} />
    ),
    [SyncStatusEnum.IDLE]: (
      <RotateLeftTwoToneIcon color="disabled" fontSize={size} />
    ),
    [SyncStatusEnum.PROCESSING]: <Loading size={16} sx={{width: 'fit-content' }} /> //prettier-ignore
  }[syncState];
};
