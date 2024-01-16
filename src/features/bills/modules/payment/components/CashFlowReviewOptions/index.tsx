import { Autocomplete, TextField } from '@mui/material';
import core from 'core.v2';
import { CashFlowType } from 'core.v2/domain/@shared/types/cash-flow.type';
import { tr } from 'shared/translate';

export const CashFlowReviewOptions = () => {
  return (
    <Autocomplete
      disablePortal
      id="review-cash-flows"
      disabled
      value={core.store.paymentRequest.cashFlow}
      getOptionLabel={(option: CashFlowType) => option.name}
      options={[]}
      sx={{ width: '100%', maxWidth: 400, ml: 3 }}
      renderInput={(params) => (
        <TextField {...params} label={tr('shared.cashFlow')} />
      )}
    />
  );
};
