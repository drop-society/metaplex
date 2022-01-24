import React from 'react';
import { useField, useForm } from 'src/reusable/Form';
import {
  createStyles,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  Typography,
} from '@mui/material';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    validationErrorColor: {
      color: theme.palette.error.main,
    },
    validationErrorMsg: {
      fontColor: theme.palette.error.main,
      color: theme.palette.error.main,
      paddingLeft: theme.spacing(1),
      fontStyle: 'italic',
      fontSize: '95%',
    },
    commentLabel: {
      marginBottom: theme.spacing(1),
      fontSize: '85%',
      color: theme.colors.font.lightGrey,
      marginLeft: theme.spacing(4.375),
      marginRight: theme.spacing(4.375),
      marginTop: -theme.spacing(0.625),
    },
    greyColor: {
      color: theme.colors.font.lightGrey,
    },
    capitalize: {
      textTransform: 'capitalize',
    },
    bottomMargin: {
      marginBottom: theme.spacing(2.5),
    },
    hintText: {
      fontSize: '85%',
    },
  });
});

export interface RadioGroupProps<T> {
  selectableOptions: T[];
  optionLabelName: string;
  fieldName: string;
  preventValidationAction?: boolean;
  formInputLabel: string;
  defaultValue?: string;
  commentLabelName?: string;
  formHint?: string;
  capitalizeLabels?: boolean;
  hasError?: boolean;
}

const RadioGroupField: React.FC<RadioGroupProps<number | object>> = <
  T extends object
>({
  selectableOptions,
  optionLabelName,
  commentLabelName,
  fieldName,
  defaultValue = null,
  preventValidationAction = false,
  formInputLabel,
  formHint,
  capitalizeLabels = false,
  hasError = false,
}: RadioGroupProps<T>) => {
  const classes = useStyles({});

  const { value, error } = useField({
    name: fieldName,
    value: defaultValue,
  });

  const {
    setFieldValue,
    setFieldTouched,
    setFieldError,
    setValidationActionReady,
  } = useForm();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    const selectedOption = selectableOptions.find(
      (option) => option[optionLabelName] === value
    );
    setFieldError(fieldName, null);
    setFieldValue(fieldName, selectedOption);

    if (preventValidationAction) {
      setValidationActionReady(false);
    }

    setFieldTouched(fieldName, true);
  };

  return (
    <>
      <InputLabel className={classes.bottomMargin}>{formInputLabel}</InputLabel>
      {formHint && (
        <InputLabel className={`${classes.bottomMargin} ${classes.hintText}`}>
          {formHint}
        </InputLabel>
      )}
      {selectableOptions.length > 0 && (
        <FormControl variant="filled" fullWidth component="fieldset">
          <RadioGroup
            aria-label="position"
            name={fieldName}
            value={value?.[optionLabelName]}
            onChange={handleChange}
          >
            {selectableOptions.map((option, index) => {
              return (
                <div key={index}>
                  <FormControlLabel
                    disabled={option?.['disabled'] ?? false}
                    value={option[optionLabelName]}
                    control={
                      <Radio
                        color="primary"
                        className={
                          error || hasError ? classes.validationErrorColor : ''
                        }
                      />
                    }
                    label={
                      <Typography
                        classes={{
                          root:
                            'disabled' in option && option['disabled']
                              ? classes.greyColor
                              : '',
                        }}
                        className={`${
                          error || hasError ? classes.validationErrorColor : ''
                        } ${capitalizeLabels ? classes.capitalize : ''}`}
                      >
                        {option[optionLabelName]}
                      </Typography>
                    }
                    labelPlacement="end"
                  />

                  {commentLabelName && (
                    <div className={classes.commentLabel}>
                      {option[commentLabelName]}
                    </div>
                  )}
                </div>
              );
            })}
          </RadioGroup>
          {error && (
            <FormHelperText className={classes.validationErrorMsg}>
              {error}
            </FormHelperText>
          )}
        </FormControl>
      )}
    </>
  );
};

export default RadioGroupField;
