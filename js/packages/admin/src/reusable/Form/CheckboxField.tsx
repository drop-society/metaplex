import React from 'react';
import { styled } from '@mui/material/styles';
import { useForm, useField, FieldConfig } from 'src/reusable/Form';
import { Checkbox, makeStyles, Theme } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const PREFIX = 'CheckboxField';

const classes = {
  checkbox: `${PREFIX}-checkbox`
};

const Root = styled(
  'heckbox\n      icon={icon}\n      checkedIcon={checkedIcon}\n      color="primary"\n      onChange={(e, value): void ='
)((
  {
    theme: Theme
  }
) => ({
  [`& .${classes.checkbox}`]: {
    marginRight: theme.spacing(1),
  }
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export interface CheckBoxFieldProps {
  fieldName?: string;
  defaultValue?: boolean;
  preventValidationAction?: boolean;
}

export const CheckboxField: React.FC<CheckBoxFieldProps> = ({
  fieldName,
  defaultValue = false,
  preventValidationAction = false,
}) => {


  const fieldConfig: FieldConfig<boolean> = {
    name: fieldName,
    value: defaultValue,
  };

  const { value } = useField(fieldConfig);
  const {
    setFieldValue,
    setFieldTouched,
    setFieldError,
    setValidationActionReady,
  } = useForm();

  return (
    <Checkbox
      icon={icon}
      checkedIcon={checkedIcon}
      color="primary"
      onChange={(e, value): void => {
        setFieldError(fieldName, null);
        setFieldValue(fieldName, value);

        if (preventValidationAction) {
          setValidationActionReady(false);
        }

        setFieldTouched(fieldName, true);
      }}
      name={fieldName}
      checked={value}
      className={classes.checkbox}
    />
  );
};
