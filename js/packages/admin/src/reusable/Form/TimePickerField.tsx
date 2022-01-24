import React from 'react';
import _ from 'lodash';
import { useForm, useField } from 'src/reusable/Form';
import { TextFieldProps } from '@mui/material/TextField';
import TimePicker from 'src/reusable/TimePicker';
import { DateTime } from 'luxon';

export interface TimePickerFieldProps<T> {
  fieldName: string;
  defaultValue?: string;
  textFieldProps?: TextFieldProps;
  saveAsDate?: boolean;
}

const TimePickerField: React.FC<TimePickerFieldProps<number | object>> = <
  T extends object
>({
  fieldName,
  textFieldProps,
  defaultValue = null,
  saveAsDate = false,
  ...props
}: TimePickerFieldProps<T>) => {
  const { value, error, touched } = useField({
    name: fieldName,
    value: defaultValue,
  });

  const {
    isValidating,
    setFieldValue,
    setFieldTouched,
    setFieldError,
  } = useForm();

  const textProps = {
    ...textFieldProps,
    error:
      (!isValidating && touched && !!error) || _.get(props, 'error', false),
    helperText: !isValidating && touched ? (error ? error : '') : '',
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let eventValue: string | Date = event.target.value;

    if (eventValue?.length === 0) {
      setFieldValue(fieldName, null);
      setFieldTouched(fieldName, true);
      return;
    }

    if (saveAsDate) {
      const timeLocalized = DateTime.fromISO(event.target.value);
      eventValue = timeLocalized.toJSDate();
    }
    setFieldError(fieldName, null);
    setFieldValue(fieldName, eventValue);
    setFieldTouched(fieldName, true);
  };

  return (
    <TimePicker
      textFieldProps={{
        value: value,
        name: fieldName,
        onBlur: (): void => setFieldTouched(fieldName, true, true),
        ...textProps,
      }}
      onChange={handleChange}
      {...props}
    />
  );
};

export default TimePickerField;
