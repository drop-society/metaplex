import React from 'react';
import _ from 'lodash';
import { TextField } from '@mui/material';
import { Autocomplete, AutocompleteProps } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { FormHelperTextProps } from '@mui/material/FormHelperText';

export interface ComboBoxProps<T> extends Partial<AutocompleteProps> {
  options: Array<T>;
  textFieldProps?: Partial<TextFieldProps>;
  formHelperTextProps?: Partial<FormHelperTextProps>;
}

/**
 * An enhanced Combobox with autocomplete textfield
 */
const ComboBox: React.FC<ComboBoxProps<number | object | string>> = <T extends object>({
  textFieldProps,
  formHelperTextProps,
  ...props
}: ComboBoxProps<T>) => {
  return (
    <Autocomplete
      renderInput={(params: TextFieldProps): React.ReactNode => (
        <TextField
          {..._.merge(params, textFieldProps)}
          variant="filled"
          fullWidth
          FormHelperTextProps={{ ...formHelperTextProps }}
        />
      )}
      {...props}
    />
  );
};

export default ComboBox;
