import { Avatar, AvatarGroup, Box, Tooltip, Typography } from '@mui/material';
import * as styles from './styles';

type User = {
  firstname: string;
  lastname: string;
};

type Props = {
  users: User[];
};

export const AvatarStack = ({ users }: Props) => {
  const hasUsers = users && users.length > 0;

  return (
    <Box sx={styles.container}>
      <AvatarGroup
        max={4}
        componentsProps={{
          additionalAvatar: {
            sx: styles.additionalAvatar
          }
        }}
      >
        {hasUsers &&
          users.map((user, idx) => (
            <Tooltip
              key={`${user.firstname}-${idx}`}
              title={`${user.firstname} ${user.lastname}`}
            >
              <Avatar
                alt={`${user.firstname} ${user.lastname}`}
                sx={styles.avatar}
              >
                <Typography
                  variant="caption"
                  fontSize={10}
                  fontWeight={700}
                  color="text.primary"
                >{`${user.firstname[0]}${user.lastname[0]}`}</Typography>
              </Avatar>
            </Tooltip>
          ))}
      </AvatarGroup>
    </Box>
  );
};
