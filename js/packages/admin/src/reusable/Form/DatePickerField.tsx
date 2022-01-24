import React, { useEffect } from 'react';
import _ from 'lodash';
import { useForm, useField } from 'src/reusable/Form';

import LuxonUtils from '@date-io/luxon';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { DateTime } from 'luxon';

export interface DatePickerFieldProps<T> {
  fieldName: string;
  preventValidationAction?: boolean;
  textFieldProps?: object;
}

const DatePickerField: React.FC<DatePickerFieldProps<number | object>> = <
  T extends object
>({
  fieldName,
  textFieldProps,
  preventValidationAction = false,
  ...props
}: DatePickerFieldProps<T>) => {
  const { error, touched } = useField({
    name: fieldName,
  });

  const {
    isValidating,
    values: { [fieldName]: value },
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
    helperText:
      !isValidating && touched
        ? error
          ? error
          : _.get(textFieldProps, 'helperText', '')
        : '',
  };

  useEffect(() => {
    // If value is undefined, the datepicker would default to today's date
    // This breaks validation as the formik data is not set
    // To fix this issue, we replace an undefined field with an explicit field set to null
    if (value === undefined) {
      setFieldValue(fieldName, null);
    }
  }, [fieldName, setFieldError, setFieldValue, value]);

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="filled"
        format="MM/dd/yyyy"
        value={value}
        {...textProps}
        onChange={(date: DateTime | null): void => {
          setFieldError(fieldName, null);
          setFieldValue(fieldName, date.toJSDate());
          if (preventValidationAction) {
            setValidationActionReady(false);
          }
          setFieldTouched(fieldName, true);
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerField;
