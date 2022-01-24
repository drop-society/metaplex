import React from 'react';
import _ from 'lodash';
import ComboBox, { ComboBoxProps } from 'src/reusable/ComboBox';
import { useForm, useField, FieldValidator } from 'src/reusable/Form';

export interface ComboBoxFieldProps<T> extends ComboBoxProps<T> {
  fieldName: string;
  preventValidationAction?: boolean;
  validate?: FieldValidator;
}

const ComboBoxField: React.FC<ComboBoxFieldProps<number | object | boolean>> = <
  T extends object
>({
  fieldName,
  textFieldProps,
  validate,
  defaultValue = null,
  preventValidationAction = false,
  ...props
}: ComboBoxFieldProps<T>) => {
  const { value, error, touched } = useField({
    name: fieldName,
    value: defaultValue,
    validate: validate,
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

  return (
    <ComboBox
      value={value}
      onChange={(e, value): void => {
        setFieldError(fieldName, null);
        setFieldValue(fieldName, value);

        if (preventValidationAction) {
          setValidationActionReady(false);
        }

        setFieldTouched(fieldName, true);
      }}
      textFieldProps={textProps}
      {...props}
    />
  );
};

export default ComboBoxField;
