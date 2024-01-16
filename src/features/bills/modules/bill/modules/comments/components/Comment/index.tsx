import { Box, Typography } from '@mui/material';
import { InvoiceComment } from 'core/domain/invoice/InvoiceComment';
import { Loading } from 'shared/components/Loading';

import { getLocaleDateTime } from 'shared/utils/string/getLocaleDate';

import * as styles from './styles';

type Props = {
  data: InvoiceComment;
  isLoggedUser?: boolean;
  addingNewComment?: any;
};

const LoggedUserComment = ({ data, addingNewComment }: Props) => {
  const { id, content, first_name, last_name, created_at } = data;
  return (
    <Box key={id} sx={styles.loggedUsercomment}>
      <Box sx={styles.loggedUsermessageContainer}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}
        >
          <Box sx={styles.loggedUsermessage}>
            <Typography
              variant="caption"
              sx={styles.loggedUserName}
            >{`${first_name} ${last_name}`}</Typography>
            <Typography variant="body1">{content}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Typography variant="caption" sx={styles.loggedUserDateTime}>
              {addingNewComment.isLoading && id === addingNewComment.id ? (
                <Loading size={8} sx={{ justifyContent: 'end' }} />
              ) : (
                getLocaleDateTime(created_at)
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const NonLoggedUserComment = ({ data }: Props) => {
  const { id, content, first_name, last_name, created_at } = data;
  return (
    <Box key={id} sx={styles.comment}>
      <Box sx={styles.messageContainer}>
        <Box sx={{ maxWidth: '75%' }}>
          <Box sx={styles.message}>
            <Typography
              variant="caption"
              sx={styles.name}
            >{`${first_name} ${last_name}`}</Typography>
            <Typography variant="body1">{content}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={styles.dateTime}>
              {getLocaleDateTime(created_at)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const Comment = ({ data, isLoggedUser, addingNewComment }: Props) => {
  return isLoggedUser ? (
    <LoggedUserComment data={data} addingNewComment={addingNewComment} />
  ) : (
    <NonLoggedUserComment data={data} />
  );
};

export default Comment;
