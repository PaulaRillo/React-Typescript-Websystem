//material-ui
import { Box, Typography } from '@mui/material';
import { ApprovalPolicyApproversGrid } from '../../components/ApprovalPolicyApproversGrid';
import { ApprovalPolicyRulesGrid } from '../../components/ApprovalPolicyRulesGrid';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';

export const ApprovalPolicyView = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.title}>
          <Typography variant="h5">Bill Approval Policy 1</Typography>
          <Typography color="text.secondary">
            {tr('settings.accounting.billApprovalPolicy.subtitle')}
          </Typography>
        </Box>
      </Box>
      <ApprovalPolicyRulesGrid />
      <ApprovalPolicyApproversGrid />
    </Box>
  );
};

export default ApprovalPolicyView;
