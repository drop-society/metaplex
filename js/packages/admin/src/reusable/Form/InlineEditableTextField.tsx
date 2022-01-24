import React from 'react';
import { useForm, useField } from 'src/reusable/Form';
import { TextFieldProps } from '@mui/material/TextField';
import InlineEditableText from 'src/reusable/InlineEditableText';

export interface InlineEditableTextFieldProps {
  fieldName: string;
  textFieldProps?: TextFieldProps;
  customValidate?: (value: string) => string | null;
}

const InlineEditableTextField: React.FC<InlineEditableTextFieldProps> = ({
  fieldName,
  textFieldProps,
  customValidate,
}: InlineEditableTextFieldProps) => {
  const {
    value,
    error: fieldError,
    touched,
    setError: setFieldError,
  } = useField<string>({
    name: fieldName,
  });

  const {
    isValidating,
    setFieldValue,
    errors: formErrors,
    setErrors: setFormErrors,
  } = useForm();

  const textProps = {
    ...textFieldProps,
    error:
      (!isValidating && touched && !!fieldError) ||
      (textFieldProps?.error ?? false),
    helperText: (!isValidating && fieldError) || textFieldProps?.helperText,
  };
  const handleSetValue = (value: string): void => {
    setFieldValue(fieldName, value, true);
  };

  const customValidateWrapper = (
    testValue: string,
    clearError?: boolean
  ): string => {
    const errorMsg = customValidate?.(testValue);
    if (errorMsg) {
      setFieldError(errorMsg);
    }

    if (clearError) {
      // Only clears current field's error, not all errors
      const errorsWithoutCurrentField = { ...formErrors };
      delete errorsWithoutCurrentField[fieldName];
      setFormErrors(errorsWithoutCurrentField);
    }

    return errorMsg;
  };

  return (
    <InlineEditableText
      {...textProps}
      value={value}
      setValue={handleSetValue}
      validate={customValidateWrapper}
    />
  );
};

export default InlineEditableTextField;
