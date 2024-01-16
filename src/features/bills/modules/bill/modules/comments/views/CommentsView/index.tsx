import { Box, Container } from '@mui/material';
import core from 'core.v2';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Loading } from 'shared/components/Loading';
import { Spacer } from 'shared/components/Spacer';
import { useGetBillComments } from '../../../../queries/useGetBillComments';
import { Comment } from '../../components/Comment';
import { CommentForm } from '../../components/CommentForm';
import * as styles from './styles';

export const CommentsView = () => {
  const [comments, setComments] = useState<any>([]);
  const [addingNewComment, setAddingNewComment] = useState<any>({
    isLoading: false,
    id: ''
  });
  const hasComments = comments && comments.length > 0;
  const bottomRef = useRef<null | any>(null);
  const loggedUser = core.store.loggedUser;
  const { data, isLoading } = useGetBillComments();

  useEffect(() => {
    setComments(data);
  }, [data]);

  useEffect(() => {
    bottomRef.current?.lastChild?.scrollIntoView({ behavior: 'auto' });
  }, [comments]);

  const handleAddingComment = useCallback((isLoading: boolean, id: string) => {
    setAddingNewComment({
      isLoading,
      id
    });
  }, []);

  return (
    <Container sx={styles.container}>
      {isLoading && <Loading sx={{ height: '100%' }} />}
      <Box sx={styles.comments} ref={bottomRef}>
        {hasComments &&
          comments.map((newComment: any) => {
            return (
              <Comment
                key={newComment.id}
                data={newComment}
                isLoggedUser={loggedUser?.id === newComment.created_by}
                addingNewComment={addingNewComment}
              />
            );
          })}
      </Box>
      <Spacer />
      <CommentForm addingComment={handleAddingComment} />
    </Container>
  );
};

export default CommentsView;
