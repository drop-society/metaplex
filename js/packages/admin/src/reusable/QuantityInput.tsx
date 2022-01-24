import * as React from 'react';
import { styled } from '@mui/material/styles';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
  Grid,
  TextField,
  makeStyles,
  Theme,
  createStyles,
} from '@mui/material';
import { InputLabelProps } from '@mui/material/InputLabel';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { InputBaseComponentProps } from '@mui/material/InputBase';

const PREFIX = 'QuantityInput';

const classes = {
  container: `${PREFIX}-container`,
  label: `${PREFIX}-label`,
  button: `${PREFIX}-button`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme: Theme
  }
) => ({
  [`& .${classes.container}`]: {
    padding: theme.spacing(1),
  },

  [`& .${classes.label}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.button}`]: {
    cursor: 'pointer',
  }
}));

export interface Props {
  limit: number;
  value: number;
  disabled?: boolean;
  onChange: (val: number | string) => void;
  error?: boolean;
  helperText?: string | React.ReactElement;
  label?: string;
  textfieldClassname?: string;
  inputProps?: InputBaseComponentProps;
  inputLabelProps?: InputLabelProps;
  helperTextProps?: FormHelperTextProps;
  buttonClassname?: string;
}

const QuantityInput: React.FC<Props> = ({
  limit,
  value,
  disabled = false,
  onChange,
  label,
  error,
  helperText,
  textfieldClassname,
  inputProps,
  inputLabelProps,
  helperTextProps,
  buttonClassname,
}) => {


  const handleChange = (e): void => {
    const val =
      e.target.value === '' ? '' : Math.min(limit, parseInt(e.target.value));
    onChange(val);
  };

  return (
    (<Root>
      <Grid className={buttonClassname}>
        <RemoveIcon
          data-testid={'quantityDecrease'}
          className={value > 0 ? classes.button : ''}
          color={value <= 0 || disabled ? 'disabled' : 'inherit'}
          onClick={(): void => onChange(Math.max(0, value - 1))}
        />
      </Grid>
      <Grid item className={textfieldClassname}>
        <TextField
          data-testid={'quantityField'}
          value={value}
          disabled={disabled}
          type={'number'}
          variant={'filled'}
          label={label}
          inputProps={{ ...inputProps }}
          onChange={handleChange}
          error={error}
          helperText={helperText}
          FormHelperTextProps={{ ...helperTextProps }}
          InputLabelProps={{ ...inputLabelProps }}
        />
      </Grid>
      <Grid className={buttonClassname}>
        <AddIcon
          data-testid={'quantityIncrease'}
          className={value < limit && classes.button}
          color={value >= limit || disabled ? 'disabled' : 'inherit'}
          onClick={(): void => onChange(Math.min(limit, value + 1))}
        />
      </Grid>
    </Root>)
  );
};

export default QuantityInput;
