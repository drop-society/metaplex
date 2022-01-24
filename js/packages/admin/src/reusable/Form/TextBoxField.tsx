import React from 'react';
import _ from 'lodash';
import { useForm, useField } from 'src/reusable/Form';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';

export interface TextBoxFieldProps<T> {
  fieldName: string;
  defaultValue?: string;
  preventValidationAction?: boolean;
  textFieldProps?: TextFieldProps;
}

const TextBoxField: React.FC<TextBoxFieldProps<number | object>> = <
  T extends object
>({
  fieldName,
  textFieldProps,
  defaultValue = null,
  preventValidationAction = false,
  ...props
}: TextBoxFieldProps<T>) => {
  const { value, error, touched } = useField({
    name: fieldName,
    value: defaultValue,
  });

  const {
    isValidating,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    setValidationActionReady,
  } = useForm();

  const textProps = {
    ...textFieldProps,
    error:
      (!isValidating && touched && !!error) ||
      _.get(textFieldProps, 'error', false),
    helperText: (!isValidating && error) || textFieldProps?.helperText,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldError(fieldName, null);
    if (textProps?.type === 'number') {
      const parsed = parseInt(e.target.value, 10);
      setFieldValue(fieldName, isNaN(parsed) ? null : parsed);
    } else {
      setFieldValue(fieldName, e.target.value);
    }
    if (preventValidationAction) {
      setValidationActionReady(false);
    }
    setFieldTouched(fieldName, true);
  };

  return (
    <TextField
      name={fieldName}
      value={value}
      onChange={handleChange}
      {...textProps}
      {...props}
    />
  );
};

export default TextBoxField;
