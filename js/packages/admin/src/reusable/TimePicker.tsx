import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { DateTime } from 'luxon';

export interface TimePickerProps<T> {
  onChange?: (event) => void;
  textFieldProps?: TextFieldProps;
}

export const dateToHHMM = (date: string | Date): string => {
  // Note: This function expects that Date or ISO string is in the user's local timezone
  // Takes in a ISO string like "2020-12-04T14:37:00-05:00"
  // or a Date object and return a string formatted like HH:MM
  if (!date) {
    return null;
  }
  if (typeof date === 'string' && date.length > 5) {
    date = new Date(date);
  }

  if (date instanceof Date) {
    // 'T' is the 24-hr format HH:MM
    date = DateTime.fromJSDate(date).toLocaleString(DateTime.TIME_24_SIMPLE);
  }

  if (date.startsWith('24')) {
    // Hacky fix for when the string is like 24:30, but TimePicker requires it to be 0:30
    date = '00' + date.substring(2);
  }

  return date;
};

const TimePicker: React.FC<TimePickerProps<number | object>> = <
  T extends object
>({
  onChange,
  textFieldProps,
}: TimePickerProps<T>) => {
  // TextFields can only accept times formatted as strings with 5 characters "HH:MM".
  // However, this TimePicker component can accept date objects and date strings.
  textFieldProps.value = dateToHHMM(textFieldProps.value as string | Date);

  return (
    <TextField
      type="time"
      onChange={onChange}
      inputProps={{
        step: 300, // 5 min (300 seconds)
      }}
      variant="filled"
      {...textFieldProps}
    />
  );
};

export default TimePicker;
