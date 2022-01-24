import React from 'react';
import MultiSelectCheckbox, {
  MultiSelectCheckboxProps,
} from 'src/reusable/MultiSelectCheckbox';
import { useForm, useField, FieldValidator } from 'src/reusable/Form';

export interface MultiSelectCheckboxFieldProps<T>
  extends MultiSelectCheckboxProps<T> {
  fieldName: string;
  preventValidationAction?: boolean;
  validate?: FieldValidator;
}

const MultiSelectCheckboxField: React.FC<MultiSelectCheckboxFieldProps<
  string | object
>> = <T extends string | object>({
  fieldName,
  validate,
  defaultValue = null,
  preventValidationAction = false,
  ...props
}: MultiSelectCheckboxFieldProps<T>) => {
  const { error, touched } = useField({
    name: fieldName,
    value: defaultValue,
    validate: validate,
  });
  const {
    values,
    isValidating,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    setValidationActionReady,
  } = useForm();
  const currentField = props.selectedValues
    ? props.selectedValues
    : values[fieldName];
  const textProps = {
    error: (!isValidating && touched && !!error) || (props?.error ?? false),
    helperText: !isValidating && touched ? (error ? error : '') : '',
  };

  return (
    <MultiSelectCheckbox
      selectedValues={currentField}
      onChangeHandler={(e: object, value: Array<object>): void => {
        setFieldError(fieldName, null);
        setFieldValue(fieldName, value);

        if (preventValidationAction) {
          setValidationActionReady(false);
        }

        setFieldTouched(fieldName, true);
      }}
      {...textProps}
      {...props}
    />
  );
};

export default MultiSelectCheckboxField;
