import { Tag } from '../Tag';

type Props = {
  action: 'CREATED' | 'UPDATED' | 'DELETED';
};

export const Action = ({ action }: Props) => {
  const type = {
    CREATED: 'success',
    UPDATED: 'info',
    DELETED: 'error'
  };

  return (
    <Tag label={action} type={type[action] as 'success' | 'info' | 'error'} />
  );
};
