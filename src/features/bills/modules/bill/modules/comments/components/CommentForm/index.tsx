import { yupResolver } from '@hookform/resolvers/yup';
import { Send } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import core from 'core.v2';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { postBillComment } from 'shared/api/requests/postBillComment';
import { useAlert } from 'shared/hooks/useAlert';
import { Permission, PermissionKey } from 'shared/modules/Permission';
import { tr } from 'shared/translate';
import * as yup from 'yup';
import * as styles from './styles';

type Inputs = {
  [x: string]: string;
};

type Props = {
  addingComment: (isLoading: boolean, id: string) => void;
};

export const CommentForm = ({ addingComment }: Props) => {
  const { id } = useParams();
  const billId = id || '';
  const loggedUser = core.store.loggedUser;
  const [characeteresCount, setCharaceteresCount] = useState<number>(250);
  const { alert } = useAlert();

  const queryClient = useQueryClient();
  const prevCache: any = queryClient.getQueryData(`@bill-${id}-comments`);

  const createComment = useMutation(
    (data: any) => {
      return postBillComment(billId, data.content);
    },
    {
      onMutate: (variables) => {
        addingComment(true, variables.id);
        queryClient.setQueryData(`@bill-${id}-comments`, [
          ...prevCache,
          variables
        ]);
      },
      onSuccess: () => {
        addingComment(false, '');
      },
      onError: () => {
        addingComment(false, '');
        queryClient.setQueryData(`@bill-${id}-comments`, [...prevCache]);
        alert({
          title: tr('bills.bill.root.nav.comments.errorAlert.Title'),
          message: tr('bills.bill.root.nav.comments.errorAlert.Message'),
          severity: 'error'
        });
      }
    }
  );

  const schema = yup
    .object({
      content: yup.string().required(
        tr('shared.form.validations.required', {
          value: tr('shared.comment')
        })
      )
    })
    .required('Empty comment')
    .typeError('Comment cannot be empty.');

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ content }) => {
    const [first_name, last_name] = loggedUser?.name.trim().split(' ') || [];

    const newComment: any = {
      id: Math.ceil(Math.random() * 100000).toString(),
      content,
      first_name,
      last_name,
      created_at: new Date().toString(),
      created_by: loggedUser?.id || ''
    };

    createComment.mutate(newComment);

    resetField('content');
    setCharaceteresCount(250);
  };

  const handleInputComment = useCallback((e) => {
    setTimeout(() => {
      setCharaceteresCount(e.target.maxLength - e.target.value.length);
    }, 500);
  }, []);

  return (
    <Permission matchAll={[PermissionKey.COMMENT_BILL]}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styles.write}>
        <TextField
          defaultValue=""
          label={tr('shared.leaveAComment')}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          error={!!errors.content}
          helperText={errors.content?.message}
          {...register('content')}
          inputProps={{ maxLength: 250 }}
          onInput={handleInputComment}
          InputProps={{
            endAdornment: (
              <IconButton color="primary" type="submit">
                <Send />
              </IconButton>
            )
          }}
        />
        <Typography sx={{ textAlign: 'right' }} variant="caption">
          {`${tr(
            'bills.bill.root.nav.comments.countCharacters'
          )} ${characeteresCount}`}
        </Typography>
      </Box>
    </Permission>
  );
};

export default CommentForm;
