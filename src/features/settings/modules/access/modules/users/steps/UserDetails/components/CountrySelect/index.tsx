import { Autocomplete, Box, TextField, TextFieldProps } from '@mui/material';
import { countriesOptions } from 'core.v2/domain/@shared/settings/countries-options';
import { forwardRef } from 'react';
import { tr } from 'shared/translate';

export const CountrySelect = forwardRef(function CountrySelect(
  props: TextFieldProps,
  ref
) {
  return (
    <Autocomplete
      ref={ref}
      id="country-select"
      fullWidth
      options={countriesOptions}
      autoHighlight
      getOptionLabel={(option) => {
        return `+${option.phone}`;
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
          key={`${option.label}-${option.code}`}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...props}
          {...params}
          label={tr('shared.countryCode')}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'country'
          }}
        />
      )}
    />
  );
});
