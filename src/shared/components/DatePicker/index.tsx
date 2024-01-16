import { useCallback, useState } from 'react';

import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

type Props = {
  label: string;
  onSetDate: (value: Date | undefined) => void;
  minDate?: Date;
};

type Change = (
  value: Date | null,
  keyboardInputValue?: string | undefined
) => void;

export const DatePicker = ({ label, onSetDate, minDate }: Props) => {
  const [value, setValue] = useState<Date>();

  const handleChange = useCallback<Change>(
    (value) => {
      if (!value) return;
      setValue(value);
      onSetDate(value);
    },
    [onSetDate]
  );

  return (
    <MuiDatePicker
      label={label}
      value={value}
      minDate={minDate}
      onChange={handleChange}
      renderInput={(params) => {
        return <TextField error={false} {...params} />;
      }}
    />
  );
};
